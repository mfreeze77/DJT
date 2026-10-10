#!/usr/bin/env node
// Referential/category integrity only, never historical authentication.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';
import { auditRinfo } from './audit_rinfo.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const folder = 'research/veb_a7_2026/';
export function validateFollowup(root = resolve(here, '../..')) {
  const text = name => readFileSync(resolve(root, folder + name), 'utf8');
  const table = name => parseCsv(text(name), name);
  const index = (name, key) => {
    const map = new Map();
    for (const row of table(name)) {
      assert(row[key]?.trim(), `${name}: missing ${key}`);
      assert(!map.has(row[key]), `${name}: duplicate ${key}`);
      map.set(row[key], row);
    }
    return map;
  };
  const sources = index('sources.csv','source_id');
  const claims = index('claims.csv','claim_id');
  const entities = index('entity_crosswalk.csv','entity_id');
  const tx = index('transaction_crosswalk.csv','transaction_id');
  const notes = index('a7_note_inventory.csv','instrument_serial');
  const manifest = index('acquisition_manifest.csv','manifest_id');
  const refs = (value, target, label) => {
    assert(value?.trim(), `${label}: empty reference`);
    const ids = value.split(';').map(x => x.trim());
    assert.equal(ids.length, new Set(ids).size, `${label}: duplicate reference`);
    for (const id of ids) assert(target.has(id), `${label}: unknown reference ${id}`);
  };
  const uint = (s,label) => {
    assert(/^\d+$/.test(s), `${label}: expected nonnegative integer`);
    const n = Number(s); assert(Number.isSafeInteger(n), `${label}: unsafe integer`); return n;
  };
  for (const row of entities.values()) {
    refs(row.source_ids,sources,row.entity_id);
    assert(row.identity_limit?.trim() && row.original_name?.trim(), 'entity needs identity boundary and original name');
  }
  const categories = new Set(['sale_contract','reported_payment','reported_refund','reported_break_fee',
    'sale_price','reported_buyer_financing','reported_debt_assignment','disputed_project_contribution',
    'security_face','reported_debt_balance','reported_guarantee_fee_due','license_contract',
    'management_contract','reported_equity_pledge','reported_credit','described_credit_channel',
    'reported_instrument_holding','programme_ceiling']);
  for (const row of tx.values()) {
    assert(['toronto','a7'].includes(row.chain), 'policy must not enter financial crosswalk');
    assert(categories.has(row.category), 'unknown transaction category');
    assert(entities.has(row.from_entity_id) && entities.has(row.to_entity_id), 'unknown transaction entity');
    refs(row.source_ids,sources,row.transaction_id); refs(row.claim_ids,claims,row.transaction_id);
    assert.equal(row.include_in_totals,'no','research crosswalk must not silently change totals');
    assert(row.status?.trim() && row.date_or_period?.trim(), 'transaction missing limitation or period');
    if (row.amount !== '') { assert(uint(row.amount,row.transaction_id)>0,'unknown amount must be blank not zero'); assert(['USD','CAD','RUB'].includes(row.currency),'missing currency'); }
  }
  // Wave3: later priority recognition is not a cash advance; named contracts are not receipts.
  assert.equal(tx.get('T07')?.category,'reported_debt_assignment','assignment must not become cash');
  assert.equal(tx.get('T07')?.amount,'','assignment amount remains unknown');
  for (const [id,payer] of [['T20','N23'],['T21','N24']]) {
    const row=tx.get(id);
    assert(row && row.category==='management_contract' && row.from_entity_id===payer && row.to_entity_id==='N15','management counterparties require contract evidence');
    assert.equal(row.amount,'','contract listing is not a paid fee');
  }
  assert.equal(tx.get('T18')?.category,'reported_instrument_holding','instrument holding is not payment');
  assert.equal(tx.get('T18')?.currency,'RUB','carrying currency must not become face denomination');
  const disputed = tx.get('T08');
  assert(disputed && disputed.category === 'disputed_project_contribution' && disputed.amount === '15000000' && disputed.source_ids.split(';').includes('S07'),'RF014 crosswalk drift requires review');
  assert.equal(entities.get('N22')?.kind,'unresolved_issuer','do not merge name-only note issuer into A7');
  let face=0, initial=0, interest=0;
  for (const row of notes.values()) {
    assert(/^A7R\d{7}$/.test(row.instrument_serial),'invalid note serial');
    refs(row.source_ids,sources,row.instrument_serial);
    assert.equal(row.holder_entity_id,'N18'); assert.equal(row.issuer_entity_id,'N22');
    assert.equal(row.include_in_totals,'no'); assert.equal(row.annual_rate_percent,'10');
    assert(/^\d{4}-\d{2}-\d{2}$/.test(row.issue_date) && /^\d{4}-\d{2}-\d{2}$/.test(row.present_not_before),'invalid note date');
    face += uint(row.face_usd,'face'); initial += uint(row.initial_value_rub,'initial'); interest += uint(row.accrued_interest_rub,'interest');
  }
  assert.equal(notes.size,13); assert.equal(face,8800000); assert.equal(initial,688764000); assert.equal(interest,4974000);
  assert.equal(tx.get('T18')?.amount,String(initial+interest),'carrying-value reconciliation');
  const covered = new Set();
  for (const row of manifest.values()) {
    refs(row.source_ids,sources,row.manifest_id);
    for (const id of row.source_ids.split(';')) covered.add(id);
    assert(['bytes_obtained','web_retrieved','not_obtained'].includes(row.acquisition_status),'invalid acquisition state');
    assert(row.locator?.trim() && row.review_scope?.trim() && row.limitation?.trim(),'missing acquisition boundary');
    assert(/^\d{4}-\d{2}-\d{2}/.test(row.retrieved_at),'missing retrieval date');
    if (row.acquisition_status === 'bytes_obtained') {
      assert(/^[a-f0-9]{64}$/.test(row.sha256),'obtained bytes require SHA256'); assert(uint(row.bytes,'source bytes')>0);
    } else { assert.equal(row.sha256,'','no fabricated hash'); assert.equal(row.bytes,'','no fabricated byte count'); }
  }
  for (const id of sources.keys()) if (Number(id.slice(1))>=17) assert(covered.has(id),`new source missing acquisition entry ${id}`);
  const stored = JSON.parse(text('rinfo_audit.json'));
  assert.deepEqual(stored,auditRinfo(root),'rinfo audit drift requires review');
  assert.equal(stored.sha256,'6ecd7c7c9e7673b7599750611813dce754cb9e84d91fc001ffb05ca0a6093ba4');
  assert.equal(stored.leaf_values.file,44496);
  return {entities:entities.size,transactions:tx.size,instruments:notes.size,acquisitions:manifest.size};
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Follow-up structural validation passed (not historical proof): '+JSON.stringify(validateFollowup())); }
  catch(error) { console.error(error.message); process.exitCode=1; }
}
