// Narrow review-boundary tests. CI checks committed extracts, not original HTML acquisition.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const read = n => readFileSync(resolve(here, n), 'utf8');
const table = n => parseCsv(read(n), n);
const index = (n, k) => new Map(table(n).map(r => [r[k], r]));
const digest = b => createHash('sha256').update(b).digest('hex');
const rows = table('quinira_charge_index.csv');
const companies = table('quinira_company_review.csv');
const audit = JSON.parse(read('quinira_source_review.json'));
const sources = index('sources.csv', 'source_id');
const claims = index('claims.csv', 'claim_id');
const snapshot = () => structuredClone({ rows, companies, audit });
function check({ rows: rr, companies: cc, audit: aa }) {
  assert.equal(rr.length, 21);
  assert.equal(new Set(rr.map(r => r.record_id)).size, 21);
  assert.equal(cc.length, 5);
  for (const [entity, number, count] of [['N28','HE251868',2],['N29','HE251695',2],['N30','HE187745',7],['N32','HE286910',7],['N36','HE286456',3]]) {
    const c = cc.find(r => r.entity_id === entity); assert(c);
    assert.equal(c.registration_search_key, number);
    assert.equal(c.full_history_verified, 'no');
    assert.equal(c.historical_shareholders_verified, 'no');
    assert.equal(c.display_cap, '20 most recent document entries');
    assert.equal(c.current_page, '1'); assert.equal(c.total_displayed_pages, '1');
    assert.equal(c.source_category, 'Charges and Mortgages');
    const own = rr.filter(r => r.entity_id === entity);
    assert.equal(own.length, count); assert.equal(c.displayed_rows, String(count));
    own.forEach((r, i) => { assert.equal(r.company_number, number); assert.equal(r.source_id, c.source_id); assert.equal(r.table_row, String(i + 1)); });
  }
  for (const r of rr) {
    assert.equal(r.date_type, 'registry_Order_Date_not_instrument_date');
    assert.equal(r.underlying_document_status, 'not_obtained');
    assert.equal(r.include_in_totals, 'no');
    for (const f of ['lender', 'facility_amount', 'advance_amount', 'debt_outstanding', 'secured_asset']) assert.equal(r[f], '');
    assert(['HE24','HE50','X00F'].includes(r.form_number));
    assert(['YES','NO'].includes(r.scanned));
    assert.match(r.order_date_literal, /^\d{2}\/\d{2}\/\d{4}$/);
    assert.match(r.source_raw_sha256, /^[a-f0-9]{64}$/);
  }
  assert.deepEqual(rr.filter(r => r.entity_id === 'N32' && r.file_page === '4').map(r => r.scanned), ['NO','YES']);
  assert.equal(rr.filter(r => r.form_number === 'X00F').length, 4);
  for (const value of Object.values(aa.restrictions)) assert.equal(value, false);
}
test('five-company committed index validates without rewriting any reviewed file', () => {
  const names = ['quinira_charge_index.csv','quinira_company_review.csv','quinira_source_review.json'];
  const before = names.map(n => digest(read(n))); check(snapshot());
  assert.deepEqual(names.map(n => digest(read(n))), before);
});
test('rejects VEB name promoted from other evidence to indexed lender', () => {
  const s = snapshot(); s.rows[0].lender = 'VEB'; assert.throws(() => check(s));
});
test('rejects commitments or zero values filling unknown amounts', () => {
  for (const field of ['facility_amount','advance_amount','debt_outstanding']) for (const value of ['0','940000000']) {
    const s = snapshot(); s.rows[0][field] = value; assert.throws(() => check(s));
  }
});
test('rejects Order Date relabeled as instrument date or payment date', () => {
  for (const v of ['loan_execution_date','cash_payment_date']) { const s = snapshot(); s.rows[0].date_type = v; assert.throws(() => check(s)); }
});
test('rejects silent deduplication of Quinira certificate scan observations', () => {
  const s = snapshot(); s.rows = s.rows.filter(r => !(r.entity_id === 'N32' && r.scanned === 'NO')); assert.throws(() => check(s));
});
test('rejects dropped company or altered numbered identity', () => {
  const s = snapshot(); s.companies.pop(); assert.throws(() => check(s));
  const t = snapshot(); t.companies[0].registration_search_key = 'HE286910'; assert.throws(() => check(t));
});
test('rejects complete-history promotion from a capped display', () => {
  for (const field of ['full_history_verified','historical_shareholders_verified']) {
    const s = snapshot(); s.companies[0][field] = 'yes'; assert.throws(() => check(s));
  }
});
test('rejects scanned flag treated as possession of an instrument', () => {
  const s = snapshot(); s.rows[0].underlying_document_status = 'executed_instrument_obtained'; assert.throws(() => check(s));
});
test('rejects strengthened buyer, completion, cash or tax-referent finding without reviewed evidence', () => {
  for (const key of ['three_unnamed_buyers_mapped','purchase_completed_proven','new_toronto_cash_leg_proven','tax_return_referent_resolved']) {
    const s = snapshot(); s.audit.restrictions[key] = true; assert.throws(() => check(s));
  }
});
test('all published source excerpts are hash-identified as derivatives', () => {
  for (const r of audit.company_sources) {
    assert.equal(digest(readFileSync(resolve(here,r.derived_excerpt_path))), r.derived_excerpt_sha256);
    assert.match(r.derivation, /not original response bytes/);
    assert.equal(r.method, 'POST-free-navigation');
    assert.equal(r.display_limit, 20);
  }
});
test('2011 registrations and notice versus dissolution remain literal and distinct', () => {
  const c = new Map(companies.map(r => [r.entity_id, r]));
  assert.equal(c.get('N32').registration_date_literal,'13/05/2011');
  assert.equal(c.get('N36').registration_date_literal,'06/05/2011');
  assert.equal(c.get('N29').status_literal,'Dissolved');
  assert.equal(c.get('N29').status_date_literal,'19/07/2024');
  for (const id of ['N28','N30','N32','N36']) assert.equal(c.get(id).status_literal,'Three month notice published');
  assert.match(claims.get('C89').counterevidence_or_limit, /predecessor/);
});
test('Quinira is prospective buyer and agency/payment ledger is unchanged', () => {
  const r = index('relationships.csv','edge_id').get('E41');
  assert.match(r.to_entity, /Quinira purchase of Parborio and Atinia/);
  assert.match(r.limitations, /prospective buyer not departing shareholder/);
  const t = index('transaction_crosswalk.csv','transaction_id').get('T22');
  assert.equal(t.from_entity_id,'N31'); assert.equal(t.to_entity_id,'N26'); assert.equal(t.amount,'105825000'); assert.equal(t.include_in_totals,'no');
});
test('costs recognition is not an acquisition payment or merits appeal', () => {
  const a = audit.document_reviews.find(r => r.source_id === 'S111');
  assert.equal(a.appellate_merits_of_gorlane_decided,false); assert.equal(a.certificate_obtained,false);
  assert.equal(a.costs_initial_GBP,'190000'); assert.equal(a.costs_reported_satisfied_GBP,'110000'); assert.equal(a.costs_remaining_GBP,'80000');
  assert.equal(a.include_in_totals,'no');
  assert.match(claims.get('C91').counterevidence_or_limit, /litigation costs not acquisition proceeds/);
  assert.equal(table('transaction_crosswalk.csv').length,22);
});
test('successful historical instruction review does not erase earlier access failure', () => {
  assert.equal(sources.get('S105').url, sources.get('S112').url);
  assert.match(sources.get('S105').locator, /404/); assert.match(sources.get('S112').independence_note, /Same URL as prior failedS105/);
  const m = table('acquisition_manifest.csv').find(r => r.source_ids === 'S112');
  assert.equal(m.acquisition_status,'web_retrieved'); assert.equal(m.sha256,''); assert.equal(m.bytes,'');
});
test('actual return referent, pre-election interval and OGE reconciliation remain unpromoted', () => {
  const q = index('tax_oge_reconciliation.csv','reconciliation_id');
  assert.equal(q.get('Q12').source_ids,'S63'); assert.equal(q.get('Q12').amount,'2219431');
  assert.equal(q.get('Q12').measure,'reported_QSub_NYC3L_taxable_income_exclusion_statement');
  assert.match(q.get('Q12').locator,/field blank/); assert.equal(q.get('Q12').actual_bank_match,'not_obtained');
  assert.equal(q.get('Q01').amount,'2273297'); assert.equal(q.get('Q02').period_start,'2017-01-19');
  for (const id of ['Q10','Q11']) assert.equal(q.get(id).amount,'');
});
test('source references resolve and no five-company role row invents amounts or lender', () => {
  for (const r of table('quinira_financing_roles.csv')) {
    for (const id of r.source_ids.split(';')) assert(sources.has(id));
    for (const f of ['credit_available','money_advanced','debt_outstanding','lender_under_executed_facility']) assert.equal(r[f],'');
    assert.equal(r.include_in_totals,'no');
  }
});
