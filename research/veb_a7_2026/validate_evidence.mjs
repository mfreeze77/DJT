#!/usr/bin/env node
// Read-only integrity checks; a pass verifies data structure, not historical truth.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const folder = 'research/veb_a7_2026/';
const protectedEvents = {
  '2010:event-081': { amount: 15000000, status: 'reported_then_withdrawn' },
  '2011:event-076': { amount: 100000000, status: 'unsupported_legacy_amount' },
};

// Handles quoted commas/newlines, escaped quotes, BOM and CRLF. Fail closed.
export function parseCsv(text, label = 'CSV') {
  const rows = [];
  let row = [], field = '', quoted = false, closed = false, started = false;
  const cell = () => { row.push(field); field = ''; closed = false; started = false; };
  text = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { quoted = false; closed = true; }
      } else field += c;
    } else if (c === ',') cell();
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      cell(); rows.push(row); row = [];
    } else {
      assert(!closed, `${label}: characters after closing quote`);
      if (c === '"') {
        assert(!started, `${label}: quote inside unquoted field`);
        quoted = true; started = true;
      } else { field += c; started = true; }
    }
  }
  assert(!quoted, `${label}: unterminated quoted field`);
  if (row.length || started || closed || field.length) { cell(); rows.push(row); }
  assert(rows.length >= 2, `${label}: empty table`);
  const [headers, ...values] = rows;
  assert(headers.every(h => h.length > 0), `${label}: empty header`);
  assert.equal(new Set(headers).size, headers.length, `${label}: duplicate header`);
  return values.map((cells, i) => {
    assert.equal(cells.length, headers.length, `${label}: row ${i + 2} column count`);
    return Object.fromEntries(headers.map((h, j) => [h, cells[j]]));
  });
}

function uniqueIndex(rows, id, required, label) {
  const index = new Map();
  for (const row of rows) {
    for (const key of [id, ...required]) {
      assert(Object.hasOwn(row, key), `${label}: missing column ${key}`);
    }
    assert(row[id]?.trim(), `${label}: empty ${id}`);
    assert(!index.has(row[id]), `${label}: duplicate ${id} ${row[id]}`);
    index.set(row[id], row);
  }
  return index;
}

export function validateEvidence(root = resolve(here, '../..')) {
  root = resolve(root);
  const read = path => {
    const target = resolve(root, path);
    assert(!isAbsolute(path) && target.startsWith(root + sep), `unsafe path: ${path}`);
    return readFileSync(target, 'utf8');
  };
  const table = name => parseCsv(read(folder + name), name);
  const sources = uniqueIndex(table('sources.csv'), 'source_id',
    ['date', 'publisher', 'title', 'url', 'locator', 'independence_note'], 'sources');
  for (const [id, row] of sources) {
    assert(/^S\d{2,}$/.test(id), `invalid source ID: ${id}`);
    const url = new URL(row.url);
    assert.equal(url.protocol, 'https:', `source must use HTTPS: ${id}`);
    assert(row.locator.trim() && row.independence_note.trim(), `missing source provenance: ${id}`);
  }
  const sourceRefs = (ids, label) => {
    assert(Array.isArray(ids) && ids.length > 0, `${label}: missing source references`);
    assert.equal(new Set(ids).size, ids.length, `${label}: duplicate source reference`);
    for (const id of ids) assert(sources.has(id), `${label}: unknown source ${id}`);
  };
  const claims = uniqueIndex(table('claims.csv'), 'claim_id',
    ['claim', 'status', 'source_ids', 'counterevidence_or_limit', 'proof_needed'], 'claims');
  const edges = uniqueIndex(table('relationships.csv'), 'edge_id',
    ['from_entity', 'relationship', 'to_entity', 'classification', 'source_ids', 'limitations'], 'relationships');
  for (const [id, row] of [...claims, ...edges]) {
    sourceRefs(row.source_ids.split(';').map(s => s.trim()), id);
    assert((row.status ?? row.classification).trim(), `${id}: missing evidence status`);
    assert((row.counterevidence_or_limit ?? row.limitations).trim(), `${id}: missing limitation`);
  }
  const review = uniqueIndex(table('legacy_event_review.csv'), 'canonical_key',
    ['source_path', 'local_id', 'original_amount', 'original_direction', 'controlling_status',
      'financial_totals', 'source_ids'], 'crosswalk');
  const sidecar = JSON.parse(read(folder + 'legacy_event_interpretations.json'));
  assert.equal(sidecar.schema_version, 1);
  assert.equal(sidecar.source_of_truth, 'Tmanch_Russian_Linked_Financial_Flows.csv#RF-014');
  assert(Array.isArray(sidecar.entries) && sidecar.entries.length >= 4, 'sidecar: required entries missing');
  const entries = new Map(), datasets = new Map();
  for (const entry of sidecar.entries) {
    assert(!entries.has(entry.canonical_key), `duplicate canonical key: ${entry.canonical_key}`);
    entries.set(entry.canonical_key, entry);
    const match = /^trump-russia-timeline\/data\/processed\/by-year\/(\d{4})\.json$/.exec(entry.path);
    assert(match, `unexpected legacy path: ${entry.path}`);
    assert.equal(entry.canonical_key, `${match[1]}:${entry.local_id}`);
    if (!datasets.has(entry.path)) datasets.set(entry.path, JSON.parse(read(entry.path)));
    const events = datasets.get(entry.path).events.filter(e => e.id === entry.local_id);
    assert.equal(events.length, 1, `missing or ambiguous local event: ${entry.canonical_key}`);
    const event = events[0], row = review.get(entry.canonical_key);
    assert(row, `crosswalk missing ${entry.canonical_key}`);
    assert.equal(row.source_path, entry.path);
    assert.equal(row.local_id, entry.local_id);
    assert.equal(row.controlling_status, entry.status);
    assert.equal(row.original_amount, event.moneyFlow?.amount == null ? '' : String(event.moneyFlow.amount));
    assert.equal(row.original_direction, event.moneyFlow?.direction ?? 'none');
    sourceRefs(row.source_ids.split(';').map(s => s.trim()), entry.canonical_key);
    const rule = protectedEvents[entry.canonical_key];
    if (rule) {
      const snapshot = { amount: rule.amount, direction: 'to-trump', isDirectFlow: false };
      assert.deepEqual(entry.legacy_money_flow, snapshot, 'protected legacy snapshot missing or changed');
      assert.deepEqual({ amount: event.moneyFlow?.amount, direction: event.moneyFlow?.direction,
        isDirectFlow: event.moneyFlow?.isDirectFlow }, snapshot, 'legacy drift requires evidence review');
      assert.equal(entry.status, rule.status);
      assert.equal(entry.use_in_financial_totals, false, 'protected flow must remain excluded');
      assert.equal(row.financial_totals, 'exclude', 'crosswalk must exclude protected flow');
      sourceRefs(entry.source_ids, entry.canonical_key);
      assert(entry.source_ids.includes('S07'), 'protected entry must cite controlling ledger');
    } else {
      assert.equal(entry.status, 'outside_scope');
      assert.equal(entry.use_in_financial_totals, null);
      assert.equal(row.financial_totals, 'no_change');
    }
  }
  for (const key of [...Object.keys(protectedEvents), '2010:event-074', '2011:event-074']) {
    assert(entries.has(key), `required entry missing: ${key}`);
  }
  assert.deepEqual(new Set(review.keys()), new Set(entries.keys()), 'crosswalk/sidecar mismatch');
  const getYear = year => datasets.get(`trump-russia-timeline/data/processed/by-year/${year}.json`);
  assert(/Chicago/i.test(getYear(2010).events.find(e => e.id === 'event-074').title));
  assert(/Arif/i.test(getYear(2011).events.find(e => e.id === 'event-074').title));
  assert(getYear(2010).relationships.some(r => r.id === 'relationship-veb-shnaider-trump'
    && r.evidenceStrength === 'confirmed'), 'legacy relationship drift requires review; not an endorsement');
  const ledger = parseCsv(read('Tmanch_Russian_Linked_Financial_Flows.csv'), 'financial ledger');
  const flows = ledger.filter(r => r.Flow_ID === 'RF-014');
  assert.equal(flows.length, 1, 'RF-014 missing or duplicated');
  assert.equal(flows[0].Amount_USD, '15000000');
  assert.equal(flows[0].Included_in_Direct_Receipt_Floor, 'no');
  assert.equal(flows[0].Included_in_Branded_Ecosystem_Total, 'no');
  assert(/withdrawn or disputed/.test(flows[0].Evidence_Status), 'RF-014 status changed: review needed');
  const markdown = read(folder + 'README.md');
  assert(!/\[S\d{2,}\]\[S\d{2,}\]/.test(markdown), 'adjacent source labels create a misdirected Markdown link');
  const definitions = new Map();
  for (const match of markdown.matchAll(/^\[(S\d{2,})\]:\s*(\S+)\s*$/gm)) {
    assert(!definitions.has(match[1]), `duplicate Markdown definition: ${match[1]}`);
    definitions.set(match[1], match[2]);
  }
  for (const match of markdown.matchAll(/\[(S\d{2,})\]/g)) {
    assert(sources.has(match[1]) && definitions.has(match[1]), `unresolved Markdown source: ${match[1]}`);
  }
  return { sources: sources.size, claims: claims.size, relationships: edges.size, legacy_events: entries.size };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = validateEvidence();
    console.log('VEB/A7 structural validation passed (not historical proof): ' + JSON.stringify(result));
  } catch (error) {
    console.error('VEB/A7 validation failed: ' + error.message);
    process.exitCode = 1;
  }
}
