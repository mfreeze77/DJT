// Checks evidence categories and transcription. A pass is not historical authentication.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';
const directory = 'research/veb_a7_2026/';
export function validateAccounting(root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')) {
  const table = name => parseCsv(readFileSync(resolve(root, directory + name), 'utf8'), name);
  const sources = new Set(table('sources.csv').map(r => r.source_id));
  const entities = new Set(table('entity_crosswalk.csv').map(r => r.entity_id));
  const notes = new Map(table('a7_note_inventory.csv').map(r => [r.instrument_serial, r]));
  const rows = new Map();
  const measures = new Set(['self_reported_income','unknown_debt_component','reported_debt_balance',
    'reported_fee_due','reported_note_face','reported_book_value','derived_book_value',
    'portfolio_cash_flow','aggregate_book_movement']);
  for (const row of table('accounting_reconciliation.csv')) {
    assert(/^R\d{2}$/.test(row.record_id) && !rows.has(row.record_id), 'invalid or duplicate accounting ID');
    rows.set(row.record_id, row);
    assert(['a7','toronto'].includes(row.track) && entities.has(row.subject_entity_id), 'unknown accounting subject');
    assert(measures.has(row.measure), 'unknown accounting measure');
    assert(row.period && row.component && row.evidence_status && row.unknown_record && row.locator, 'missing accounting boundary');
    const refs = row.source_ids.split(';');
    assert(refs.length === new Set(refs).size && refs.every(s => sources.has(s)), 'unknown accounting source');
    assert.equal(row.include_in_totals, 'no');
    assert.equal(row.bank_match, 'not_obtained', 'no bank reconciliation has been obtained');
    for (const key of ['actual_remitter','actual_recipient','traced_payment_amount','traced_payment_currency']) {
      assert.equal(row[key], '', 'do not manufacture a traced payment or counterparty');
    }
    assert(['USD','CAD','RUB'].includes(row.currency), 'unknown measurement currency');
    if (row.amount) assert(/^\d+$/.test(row.amount) && Number.isSafeInteger(Number(row.amount)) && Number(row.amount)>0, 'invalid accounting amount');
    if (row.instrument_serial) {
      assert(notes.has(row.instrument_serial), 'unknown instrument');
      assert.equal(row.subject_entity_id,'N18');
      assert.equal(row.evidence_status,'issuer_unresolved_not_settled');
      assert.equal(row.counterparty_named,'N22 unresolved A7-named issuer; not N07');
    }
  }
  assert.equal(rows.size,31,'accounting record set changed; review needed');
  for (const id of ['R04','R05','R06','R07','R10','R11']) {
    const r=rows.get(id); assert(r && r.amount==='' && r.measure==='unknown_debt_component' && r.evidence_status==='not_obtained', 'unknown debt components must stay unknown');
  }
  for (const [id,amount] of [['R01','611864'],['R02','559904'],['R03','2273297']]) {
    const r=rows.get(id); assert(r && r.measure==='self_reported_income' && r.amount===amount && r.currency==='USD' && r.subject_entity_id==='N15', 'disclosure is not a bank receipt');
  }
  assert.equal(rows.get('R03').period,'2017-01-01/2017-12-31','calendar2017 must not shift to filing year');
  assert.equal(rows.get('R03').component,'management_fees_and_other_contract_payments','mixed income category must not become all management fees');
  for (const [start,serial] of [[12,'A7R0004947'],[16,'A7R0010382']]) {
    const n=notes.get(serial); const values=[n.face_usd,n.initial_value_rub,n.accrued_interest_rub,String(Number(n.initial_value_rub)+Number(n.accrued_interest_rub))];
    for (let i=0;i<4;i++) {
      const r=rows.get('R'+(start+i)); assert.equal(r.instrument_serial,serial); assert.equal(r.amount,values[i]);
      assert.equal(r.currency,i===0?'USD':'RUB');
      assert.equal(r.measure,['reported_note_face','reported_book_value','reported_book_value','derived_book_value'][i]);
    }
  }
  for (const id of ['R20','R21','R22','R23','R24','R25','R26','R27','R28','R29','R30','R31']) assert.equal(rows.get(id).instrument_serial,'','aggregate accounting is not a serial-specific payment');
  for (const id of ['R20','R21','R23','R25']) assert.equal(rows.get(id).measure,'portfolio_cash_flow');
  const value=id=>Number(rows.get(id).amount);
  assert.equal(value('R22')-value('R23'),value('R24'),'2025 separate loan rollforward');
  assert.equal(value('R24')-value('R25'),value('R26'),'H1 separate loan rollforward');
  assert.equal(value('R30'),514411000,'retain reported closing value, not an invented repair');
  assert.equal(value('R27')+value('R28')-value('R29')-value('R30'),1000,'retain observed rounding/transcription discrepancy');
  return {accounting_rows:rows.size};
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(validateAccounting())); }
  catch (error) { console.error(error.message); process.exitCode=1; }
}
