// Read-only integration checks against committed extracts, not raw-export authentication.
import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const files = ['panama_papers_findings.md', 'gorlane_ownership_timeline.csv', 'gorlane_neighborhood_relationships.csv'];
const read = name => readFileSync(join(here, name), 'utf8');
const note = read(files[0]);
const timeline = parseCsv(read(files[1]), files[1]);
const relationships = parseCsv(read(files[2]), files[2]);

function table(text, tag) {
  const begin = `<!-- BEGIN ${tag} -->`;
  const end = `<!-- END ${tag} -->`;
  assert.equal(text.split(begin).length, 2, 'missing or duplicate table start');
  assert.equal(text.split(end).length, 2, 'missing or duplicate table end');
  const start = text.indexOf(begin) + begin.length;
  const stop = text.indexOf(end);
  assert(stop > start, 'table markers out of order');
  return text.slice(start, stop).split(/\r?\n/)
    .filter(line => /^\|\s*\d+\s*\|/.test(line))
    .map(line => line.split('|').slice(1, -1).map(value => value.trim()));
}

function validateSummary(text) {
  const edges = new Map(relationships.map(row => [row.csv_row, row]));
  assert.equal(edges.size, relationships.length, 'duplicate underlying relationship row');
  assert.equal(timeline.length, 11, 'ownership scope changed; review the summary');
  assert.equal(new Set(timeline.map(row => row.csv_row)).size, 11);
  const recovered = timeline.filter(row => row.old_selected_edge === 'omitted_from_old_selection');
  assert.deepEqual(recovered.map(row => row.csv_row).sort(), ['336663', '336664', '466882']);
  const expected = timeline.map(row => {
    const edge = edges.get(row.csv_row);
    assert(edge, 'ownership row missing from scoped extract');
    assert.equal(row.owned_raw_node_id, '10210594');
    assert.equal(row.source_id, 'S59');
    assert.equal(row.source_dataset, 'Panama Papers');
    assert.equal(row.percentage, '');
    assert.equal(row.present_ownership_proven, 'no');
    assert.equal(row.replacement_proven, 'no');
    assert.deepEqual([edge.node_id_start, edge.node_id_end, edge.start_date, edge.end_date],
      [row.owner_raw_node_id, row.owned_raw_node_id, row.source_start_date, row.source_end_date]);
    assert.equal(edge.include_in_financial_totals, 'no');
    const status = row.old_selected_edge === 'omitted_from_old_selection'
      ? 'recovered from same snapshot' : `already selected (${row.old_selected_edge})`;
    return [row.csv_row, row.owner_raw_node_id, row.owner_original_name,
      row.source_start_date || 'not stated', row.source_end_date || 'not stated', status];
  });
  assert.deepEqual(table(text, 'PANAMA_SHAREHOLDERS'), expected,
    'displayed shareholder table must exactly preserve all existing observations');
  const related = ['431838', '1289949', '70807', '70808'].map(id => {
    const edge = edges.get(id);
    assert(edge, 'related pointer missing from scoped extract');
    assert.equal(edge.source_id, 'S59');
    assert.equal(edge.include_in_financial_totals, 'no');
    return [edge.csv_row, edge.node_id_start, edge.node_id_end, edge.link,
      edge.start_date || 'not stated', edge.sourceID];
  });
  assert.deepEqual(table(text, 'PANAMA_RELATED'), related,
    'related pointers must preserve node IDs, direction, role, date and dataset');
}

test('Panama integration tables match existing records and leave files unchanged', () => {
  const before = files.map(read);
  validateSummary(note);
  assert.deepEqual(files.map(read), before);
});

const mutations = [
  ['missing Freegain record', text => text.replace(/^\| 466882 \|.*\r?\n/m, '')],
  ['duplicate Freegain record', text => text.replace(/^\| 466882 \|.*\r?\n/m, row => row + row)],
  ['Equalchance nodes collapsed', text => text.replaceAll('| 12099846 |', '| 12163340 |')],
  ['old Atinia record claimed newly recovered', text => text.replace('already selected (OE08)', 'recovered from same snapshot')],
  ['payment date substituted for ownership date', text => text.replaceAll('| 23-MAY-2010 |', '| 19-MAY-2010 |')],
  ['Bahamas identity row relabeled Panama Papers', text => text.replace('| not stated | Bahamas Leaks |', '| not stated | Panama Papers |')],
  ['Gorlane officer automatically merged with entity', text => text.replace('| 431838 | 12133896 |', '| 431838 | 10210594 |')],
];
for (const [label, mutate] of mutations) {
  test(`Panama integration rejects ${label}`, () => {
    const changed = mutate(note);
    assert.notEqual(changed, note, 'mutation must change the fixture');
    assert.throws(() => validateSummary(changed));
  });
}
