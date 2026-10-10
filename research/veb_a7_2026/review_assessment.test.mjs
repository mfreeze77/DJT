// Additional PR27 interpretation checks; not authentication of historical transactions.
// Run with the inherited suite: node --test research/veb_a7_2026/validate_evidence.test.mjs research/veb_a7_2026/review_assessment.test.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const taxText = readFileSync(resolve(here, 'tax_oge_reconciliation.csv'), 'utf8');
const txText = readFileSync(resolve(here, 'transaction_crosswalk.csv'), 'utf8');
const fixture = {
  tax: parseCsv(taxText, 'tax_oge_reconciliation.csv'),
  transactions: parseCsv(txText, 'transaction_crosswalk.csv'),
};

function record(rows, key, id) {
  const selected = rows.filter(row => row[key] === id);
  assert.equal(selected.length, 1, `review: ${id} must resolve to exactly one record`);
  return selected[0];
}
const q = (data, id) => record(data.tax, 'reconciliation_id', id);
const tx = (data, id) => record(data.transactions, 'transaction_id', id);

function checkReviewBoundaries(data) {
  for (const id of ['Q03', 'Q04']) {
    assert.equal(q(data, id).entity_id, 'N33', 'review: parent totals must not become Toronto-only income');
  }
  assert.equal(q(data, 'Q05').entity_id, 'N14', 'review: retain the LP allocation entity');
  assert.equal(q(data, 'Q06').entity_id, 'N34', 'review: retain the separate LLC allocation entity');
  for (const id of ['Q02', 'Q07']) {
    const row = q(data, id);
    assert.equal(row.entity_id, 'N15', 'review: election applies to the identified manager');
    assert.equal(row.measure, 'reported_QSub_election', 'review: reported election is not IRS acceptance');
    assert.equal(row.amount, '', 'review: an election is not a monetary transaction');
    assert.equal(row.currency, '', 'review: an election has no measured currency');
    assert.equal(row.period_start, '2017-01-19', 'review: preserve the reported within-year election date');
    assert.equal(row.period_end, '', 'review: no election end date has been established');
  }
  const oge = q(data, 'Q01');
  assert.equal(oge.entity_id, 'N15', 'review: disclosed benefit belongs to the identified manager');
  assert.equal(oge.period_start, '2017-01-01', 'review: preserve calendar-2017 disclosure interval');
  assert.equal(oge.period_end, '2017-12-31', 'review: preserve calendar-2017 disclosure interval');

  const payment = tx(data, 'T22');
  assert.equal(payment.from_entity_id, 'N31', 'review: Etmor payer is not automatically VEB');
  assert.equal(payment.to_entity_id, 'N26', 'review: preserve Parborio benefited-obligor role');
  assert.match(payment.status, /benefited obligor NOT confirmed bank payee/, 'review: obligor is not identified receiving account');
  assert.equal(payment.currency, 'USD', 'review: retain judicially described payment currency');
  assert.equal(payment.date_or_period, '2010-05-19', 'review: payment date is not shareholder-record date');
  assert(payment.source_ids.split(';').includes('S71'), 'review: payment finding requires the judgment source, not the graph alone');
}

test('review assessment boundaries match production records without modifying files', () => {
  const before = structuredClone(fixture);
  checkReviewBoundaries(fixture);
  assert.deepEqual(fixture, before);
  assert.equal(readFileSync(resolve(here, 'tax_oge_reconciliation.csv'), 'utf8'), taxText);
  assert.equal(readFileSync(resolve(here, 'transaction_crosswalk.csv'), 'utf8'), txText);
});

const mutations = [
  ['parent gross receipts assigned to manager', data => { q(data, 'Q03').entity_id = 'N15'; }],
  ['parent net income assigned to manager', data => { q(data, 'Q04').entity_id = 'N15'; }],
  ['LLC allocation merged into LP', data => { q(data, 'Q06').entity_id = 'N14'; }],
  ['reported election assigned a dollar amount', data => { q(data, 'Q02').amount = '100'; q(data, 'Q02').currency = 'USD'; }],
  ['election date moved to start of calendar year', data => { q(data, 'Q02').period_start = '2017-01-01'; }],
  ['taxpayer election entry called IRS accepted', data => { q(data, 'Q02').measure = 'accepted_QSub_election'; }],
  ['OGE income interval shifted to filing year', data => { q(data, 'Q01').period_start = '2018-01-01'; }],
  ['Etmor payment changed to CAD', data => { tx(data, 'T22').currency = 'CAD'; }],
  ['payment dated from shareholder graph', data => { tx(data, 'T22').date_or_period = '2010-05-23'; }],
  ['VEB substituted for actual recorded payer', data => { tx(data, 'T22').from_entity_id = 'N05'; }],
  ['graph substituted for judicial payment source', data => { tx(data, 'T22').source_ids = 'S59'; }],
];
for (const [label, mutate] of mutations) {
  test(`review rejects ${label}`, () => {
    const changed = structuredClone(fixture);
    mutate(changed);
    assert.notDeepEqual(changed, fixture, 'mutation must alter the tested input');
    assert.throws(() => checkReviewBoundaries(changed), /review:/);
  });
}
