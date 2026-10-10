#!/usr/bin/env node
// Read-only metadata controls. These checks do not authenticate a return or a transaction.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';
const here = dirname(fileURLToPath(import.meta.url));
const folder = 'research/veb_a7_2026/';
export function validateCorpusTax(root = resolve(here, '../..')) {
  const read = n => readFileSync(resolve(root, folder + n), 'utf8');
  const index = (name, key) => {
    const out = new Map();
    for (const row of parseCsv(read(name), name)) {
      assert(row[key]?.trim() && !out.has(row[key]), `${name}: missing/duplicate ${key}`);
      out.set(row[key], row);
    }
    return out;
  };
  const sources = index('sources.csv', 'source_id');
  const manifest = index('acquisition_manifest.csv', 'manifest_id');
  const entities = index('entity_crosswalk.csv', 'entity_id');
  const transactions = index('transaction_crosswalk.csv', 'transaction_id');
  const returns = index('return_inventory.csv', 'return_id');
  const coverage = index('corpus_coverage.csv', 'coverage_id');
  const nodes = index('offshore_node_review.csv', 'node_id');
  const edges = index('offshore_relationship_review.csv', 'review_id');
  const reconciliation = index('tax_oge_reconciliation.csv', 'reconciliation_id');
  const refs = (s, label) => {
    assert(s?.trim(), `${label}: missing source`);
    const ids = s.split(';');
    assert.equal(ids.length, new Set(ids).size, `${label}: duplicate source`);
    ids.forEach(id => assert(sources.has(id), `${label}: unknown source ${id}`));
  };
  const positive = (s, label) => {
    assert(/^\d+$/.test(s) && Number.isSafeInteger(Number(s)) && Number(s) > 0, `${label}: invalid positive integer`);
    return Number(s);
  };
  for (const r of returns.values()) {
    refs(r.source_ids, r.return_id);
    const m = manifest.get(r.manifest_id);
    assert(m && m.acquisition_status === 'bytes_obtained', 'return must link acquired bytes');
    assert.equal(r.sha256, m.sha256, 'return/manifest hash mismatch');
    assert.equal(r.bytes, m.bytes, 'return/manifest size mismatch');
    assert(/^[a-f0-9]{64}$/.test(r.sha256));
    positive(r.page_count, r.return_id);
    assert.equal(r.native_text_pages, '0', 'new native extraction requires explicit coverage review');
    assert.equal(r.negative_search_permitted, 'no', 'empty text cannot authorize no-hit conclusion');
    assert.equal(r.corpus_complete, 'no', 'acquired payload is not complete tax corpus');
    assert.equal(r.include_in_totals, 'no', 'return parts must not be summed');
    assert(r.review_scope?.trim() && r.limit?.trim());
  }
  const r31 = returns.get('TR31');
  assert(r31 && r31.verified_tax_year === '2017' && r31.verified_form === '1120S');
  assert.equal(r31.revision_status, 'amended_checkbox_marked', 'original/amended distinction lost');
  assert.equal(returns.get('TR32')?.verified_tax_year, '2018');
  assert.equal(returns.get('TR09')?.verified_tax_year, '2017', 'filename year must not override document year');
  for (const id of ['TR09', 'TR13', 'TR14', 'TR52']) {
    assert.equal(returns.get(id)?.overlap_group, '2017-part3', 'overlapping parts must remain grouped');
  }
  for (const r of coverage.values()) {
    refs(r.source_ids, r.coverage_id);
    assert(r.review_scope?.trim() && r.provenance_class?.trim() && r.limit?.trim());
    if (r.accessibility === 'bytes_obtained') {
      assert(/^[a-f0-9]{64}$/.test(r.sha256)); positive(r.bytes, r.coverage_id);
    }
  }
  for (const r of nodes.values()) {
    refs(r.source_id, r.node_id);
    assert.equal(r.automatic_merge, 'no', 'name match must not automatically merge identities');
    assert(r.source_dataset?.trim() && r.identity_status?.trim() && r.limit?.trim());
    if (r.candidate_entity_id) assert(entities.has(r.candidate_entity_id));
    assert(['entities','officers','intermediaries','others','addresses'].includes(r.node_type));
    assert(positive(r.csv_row, r.node_id) >= 2);
  }
  assert.equal(nodes.get('10088926')?.identity_status, 'unresolved_same_name');
  assert.equal(nodes.get('120001148')?.node_type, 'addresses', 'address is not a lender');
  const rawEdgeKeys = new Set();
  for (const r of edges.values()) {
    refs(r.source_id, r.review_id);
    assert(nodes.has(r.node_id_start) && nodes.has(r.node_id_end), 'missing endpoint');
    assert(r.source_dataset?.trim());
    assert.equal(r.cash_proven, 'no');
    const k = `${r.csv_member}:${r.csv_row}`;
    assert(!rawEdgeKeys.has(k), 'duplicate underlying relationship record'); rawEdgeKeys.add(k);
  }
  for (const r of reconciliation.values()) {
    refs(r.source_ids, r.reconciliation_id);
    assert(entities.has(r.entity_id));
    assert.equal(r.reference_accounting_id, 'R03');
    assert.equal(r.include_in_totals, 'no');
    assert.equal(r.actual_bank_match, 'not_obtained', 'tax item is not bank settlement');
    if (r.return_id) {
      const tr = returns.get(r.return_id); assert(tr, 'unknown return');
      assert.equal(r.tax_year, tr.verified_tax_year, 'tax year/filing year confused');
      assert.equal(r.revision_status, tr.revision_status, 'amended/original mismatch');
    }
    if (r.amount !== '') { assert(/^-?\d+$/.test(r.amount)); assert.equal(r.currency, 'USD'); }
    assert(r.limit?.trim() && r.locator?.trim());
  }
  const q = id => reconciliation.get(id);
  assert.equal(q('Q01')?.form, 'OGE278e');
  assert.equal(q('Q01')?.revision_status, 'not_a_tax_return');
  assert.equal(q('Q01')?.amount, '2273297');
  assert.equal(q('Q01')?.measure, 'existing_mixed_OGE_income');
  for (const [id, amount, measure] of [
    ['Q03','23021014','parent_aggregate_gross_receipts'],
    ['Q04','4425095','parent_aggregate_ordinary_income'],
    ['Q05','-47','allocated_ordinary_loss'], ['Q06','-25','allocated_ordinary_loss'],
  ]) { assert.equal(q(id)?.amount, amount); assert.equal(q(id)?.measure, measure, 'gross/net/allocation distinction lost'); }
  for (const id of ['Q10','Q11']) assert.equal(q(id)?.amount, '', 'unallocated component is not zero');
  assert.equal(q('Q07')?.tax_year, '2018');
  assert.equal(q('Q07')?.period_start, '2017-01-19', 'repeated election date not new event');
  assert.equal(entities.get('N15')?.kind, 'legal_entity', 'QSub is not legal dissolution');
  const payment = transactions.get('T22');
  assert(payment && payment.category === 'reported_payment' && payment.amount === '105825000');
  assert.equal(payment.from_entity_id, 'N31'); assert.equal(payment.to_entity_id, 'N26');
  assert(/benefited obligor NOT confirmed bank payee/.test(payment.status), 'obligor must not become bank beneficiary');
  assert.equal(payment.include_in_totals, 'no');
  const audit = JSON.parse(read('offshore_export_audit.json'));
  assert.equal(audit.source_id, 'S59'); assert.equal(audit.generated_marker, 'GENERATED_ON_20260909.txt');
  assert.equal(audit.members.length, 6);
  let nodeCount = 0, edgeCount = 0;
  for (const member of audit.members) {
    assert(/^[a-f0-9]{64}$/.test(member.sha256));
    assert.equal(Object.values(member.source_counts).reduce((a,b)=>a+b,0), member.rows);
    if (member.file === 'relationships.csv') edgeCount += member.rows; else nodeCount += member.rows;
  }
  assert.equal(nodeCount, audit.node_rows); assert.equal(edgeCount, audit.relationship_rows);
  assert.equal(nodeCount, 2017662); assert.equal(edgeCount, 3339267);
  const boundary = JSON.parse(read('tax_mirror_boundary_checks.json'));
  assert.equal(boundary.schema_version, 1); assert.equal(boundary.samples.length, 8);
  assert(/sampled boundaries only/.test(boundary.method), 'sample comparison must not become full equivalence');
  Object.values(boundary.aliases).forEach(id => assert(returns.has(id)));
  assert.equal(boundary.aliases['2016badpart'], 'TR09');
  assert.equal(boundary.aliases['2016part1'], 'TR07');
  return {returns:returns.size, collections:coverage.size, nodes:nodes.size,
    relationships:edges.size, reconciliation:reconciliation.size};
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Corpus/tax metadata validation passed (not historical proof): '+JSON.stringify(validateCorpusTax())); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
