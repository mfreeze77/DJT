#!/usr/bin/env node
// Read-only check for the research/veb_a7_2026 sidecar against legacy DJT data.
// Run from any working directory: node research/veb_a7_2026/validate_evidence.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(dir, '../..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const sidecar = JSON.parse(read('research/veb_a7_2026/legacy_event_interpretations.json'));
const sourceIds = new Set(read('research/veb_a7_2026/sources.csv').trim().split(/\r?\n/).slice(1).map(s => s.split(',')[0]));
const keys = new Set();

assert.equal(sidecar.schema_version, 1);
assert.equal(sidecar.source_of_truth, 'Tmanch_Russian_Linked_Financial_Flows.csv#RF-014');

for (const entry of sidecar.entries) {
  assert(!keys.has(entry.canonical_key), 'duplicate canonical key: ' + entry.canonical_key);
  keys.add(entry.canonical_key);
  assert.equal(entry.canonical_key, entry.path.match(/(20\d{2})\.json$/)?.[1] + ':' + entry.local_id);
  const data = JSON.parse(read(entry.path));
  const event = data.events.find(e => e.id === entry.local_id);
  assert(event, 'missing event: ' + entry.canonical_key);
  if (entry.legacy_money_flow) {
    assert.deepEqual({
      amount: event.moneyFlow?.amount,
      direction: event.moneyFlow?.direction,
      isDirectFlow: event.moneyFlow?.isDirectFlow
    }, entry.legacy_money_flow, 'legacy data changed; review annotation: ' + entry.canonical_key);
    assert.equal(entry.use_in_financial_totals, false);
  }
  for (const id of entry.source_ids ?? []) assert(sourceIds.has(id), 'unknown source: ' + id);
}

const first = JSON.parse(read('trump-russia-timeline/data/processed/by-year/2010.json'));
const second = JSON.parse(read('trump-russia-timeline/data/processed/by-year/2011.json'));
assert(first.events.some(e => e.id === 'event-074' && /Chicago/i.test(e.title)));
assert(second.events.some(e => e.id === 'event-074' && /Arif/i.test(e.title)));
assert.notEqual(
  first.events.find(e => e.id === 'event-074').title,
  second.events.find(e => e.id === 'event-074').title
);
assert(first.relationships.some(r => r.id === 'relationship-veb-shnaider-trump' && r.evidenceStrength === 'confirmed'));

const ledger = read('Tmanch_Russian_Linked_Financial_Flows.csv').split(/\r?\n/);
const row = ledger.find(line => line.startsWith('RF-014,'));
assert(row, 'RF-014 missing');
const fields = row.split(',');
assert.equal(fields[5], '15000000');
assert.equal(fields[10], 'no', 'RF-014 must remain outside direct-receipt floor');
assert.equal(fields[11], 'no', 'RF-014 must remain outside ecosystem total');
assert(/withdrawn or disputed/.test(fields[9]), 'RF-014 status changed: review needed');

const review = read('research/veb_a7_2026/legacy_event_review.csv').trim().split(/\r?\n/).slice(1);
const reviewKeys = review.map(line => line.split(',')[0]);
assert.deepEqual(new Set(reviewKeys), keys, 'crosswalk and sidecar keys differ');

console.log('VEB/A7 evidence validation passed: 4 legacy event keys; RF-014 excluded; source references resolved.');
