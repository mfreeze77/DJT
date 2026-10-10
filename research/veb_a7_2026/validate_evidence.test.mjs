// Synthetic fixtures test integrity rules only; they are not research evidence.
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import test from 'node:test';
import { parseCsv, validateEvidence } from './validate_evidence.mjs';

const f = 'research/veb_a7_2026/';
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'djt-evidence-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (path, value) => {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), typeof value === 'string' ? value : JSON.stringify(value));
  };
  const get = path => readFileSync(join(root, path), 'utf8');
  const editJson = (path, fn) => { const data = JSON.parse(get(path)); fn(data); put(path, data); };
  const entries = [], cross = [];
  for (const year of [2010, 2011]) {
    const id = year === 2010 ? 'event-081' : 'event-076';
    const amount = year === 2010 ? 15000000 : 100000000;
    const status = year === 2010 ? 'reported_then_withdrawn' : 'unsupported_legacy_amount';
    const path = `trump-russia-timeline/data/processed/by-year/${year}.json`;
    const flow = { amount, direction: 'to-trump', isDirectFlow: false };
    put(path, { events: [{ id, moneyFlow: flow }, { id: 'event-074',
      title: year === 2010 ? 'Chicago fixture' : 'Arif fixture', moneyFlow: null }],
      relationships: [{ id: 'relationship-veb-shnaider-trump', evidenceStrength: 'confirmed' }] });
    entries.push({ canonical_key: `${year}:${id}`, path, local_id: id,
      legacy_money_flow: flow, status, use_in_financial_totals: false, source_ids: ['S07'] });
    entries.push({ canonical_key: `${year}:event-074`, path, local_id: 'event-074',
      status: 'outside_scope', use_in_financial_totals: null });
    cross.push(`${year}:${id},${path},${id},${amount},to-trump,${status},exclude,S07`);
    cross.push(`${year}:event-074,${path},event-074,,none,outside_scope,no_change,S07`);
  }
  put(f + 'sources.csv', 'source_id,date,publisher,title,url,locator,independence_note\nS07,2026,TEST,TEST,https://example.org/test,fixture,synthetic\n');
  put(f + 'claims.csv', 'claim_id,claim,status,source_ids,counterevidence_or_limit,proof_needed\nC01,fixture,unresolved,S07,synthetic,none\n');
  put(f + 'relationships.csv', 'edge_id,from_entity,relationship,to_entity,classification,source_ids,limitations\nE01,fixture,fixture,fixture,unresolved,S07,synthetic\n');
  put(f + 'legacy_event_review.csv', 'canonical_key,source_path,local_id,original_amount,original_direction,controlling_status,financial_totals,source_ids\n' + cross.join('\n') + '\n');
  put(f + 'legacy_event_interpretations.json', { schema_version: 1,
    source_of_truth: 'Tmanch_Russian_Linked_Financial_Flows.csv#RF-014', entries });
  put('Tmanch_Russian_Linked_Financial_Flows.csv', 'Flow_ID,Amount_USD,Evidence_Status,Included_in_Direct_Receipt_Floor,Included_in_Branded_Ecosystem_Total,Note\nRF-014,15000000,withdrawn or disputed,no,no,"synthetic, fixture"\n');
  put(f + 'README.md', '# Synthetic fixture\n[S07]\n\n[S07]: https://example.org/test\n');
  return { root, put, get, editJson };
}

test('CSV supports BOM, CRLF, quoted commas, newlines and escaped quotes', () => {
  assert.deepEqual(parseCsv('\uFEFFid,note\r\na,"a,b\n""quoted"""\r\n'),
    [{ id: 'a', note: 'a,b\n"quoted"' }]);
});
for (const [label, value] of [
  ['empty', ''], ['header only', 'id,note\n'], ['unterminated quote', 'id,note\na,"x'],
  ['duplicate header', 'id,id\na,b\n'], ['short row', 'id,note\na\n'],
  ['long row', 'id,note\na,b,c\n'], ['trailing quoted text', 'id,note\na,"b"c\n'],
  ['unescaped quote', 'id,note\na,b"c\n'],
]) test(`CSV rejects ${label}`, () => assert.throws(() => parseCsv(value)));

test('valid fixture passes and validator is read-only', t => {
  const x = fixture(t), before = x.get(f + 'legacy_event_interpretations.json');
  assert.deepEqual(validateEvidence(x.root), { sources: 1, claims: 1, relationships: 1, legacy_events: 4 });
  assert.equal(x.get(f + 'legacy_event_interpretations.json'), before);
});

const cases = [
  ['duplicate sources', x => x.put(f+'sources.csv', x.get(f+'sources.csv') + x.get(f+'sources.csv').split('\n')[1]+'\n')],
  ['unknown claim source', x => x.put(f+'claims.csv', x.get(f+'claims.csv').replace(',S07,', ',S99,'))],
  ['unknown relationship source', x => x.put(f+'relationships.csv', x.get(f+'relationships.csv').replace(',S07,', ',S99,'))],
  ['duplicate claim', x => x.put(f+'claims.csv', x.get(f+'claims.csv') + x.get(f+'claims.csv').split('\n')[1]+'\n')],
  ['duplicate edge', x => x.put(f+'relationships.csv', x.get(f+'relationships.csv') + x.get(f+'relationships.csv').split('\n')[1]+'\n')],
  ['duplicate crosswalk', x => x.put(f+'legacy_event_review.csv', x.get(f+'legacy_event_review.csv') + x.get(f+'legacy_event_review.csv').split('\n')[1]+'\n')],
  ['empty sidecar', x => x.editJson(f+'legacy_event_interpretations.json', d => d.entries=[])],
  ['missing protected entry', x => x.editJson(f+'legacy_event_interpretations.json', d => d.entries.splice(0,1))],
  ['duplicate sidecar key', x => x.editJson(f+'legacy_event_interpretations.json', d => d.entries.push(d.entries[0]))],
  ['missing snapshot', x => x.editJson(f+'legacy_event_interpretations.json', d => delete d.entries[0].legacy_money_flow)],
  ['promoted protected flow', x => x.editJson(f+'legacy_event_interpretations.json', d => d.entries[0].use_in_financial_totals=true)],
  ['changed status', x => x.editJson(f+'legacy_event_interpretations.json', d => d.entries[0].status='confirmed')],
  ['crosswalk promotion', x => x.put(f+'legacy_event_review.csv', x.get(f+'legacy_event_review.csv').replace(',exclude,', ',include,'))],
  ['crosswalk unknown source', x => x.put(f+'legacy_event_review.csv', x.get(f+'legacy_event_review.csv').replace(',S07\n', ',S99\n'))],
  ['missing provenance column', x => x.put(f+'claims.csv', x.get(f+'claims.csv').replace('source_ids', 'wrong_column'))],
  ['source not HTTPS', x => x.put(f+'sources.csv', x.get(f+'sources.csv').replace('https:', 'http:'))],
  ['RF-014 included', x => x.put('Tmanch_Russian_Linked_Financial_Flows.csv', x.get('Tmanch_Russian_Linked_Financial_Flows.csv').replace(',no,no,', ',yes,no,'))],
  ['legacy amount drift', x => x.editJson('trump-russia-timeline/data/processed/by-year/2010.json', d => d.events[0].moneyFlow.amount=1)],
  ['adjacent Markdown labels', x => x.put(f+'README.md', x.get(f+'README.md').replace('[S07]\n', '[S07][S07]\n'))],
  ['missing Markdown definition', x => x.put(f+'README.md', '# TEST\n[S07]\n')],
  ['unknown Markdown source', x => x.put(f+'README.md', '# TEST\n[S99]\n[S99]: https://example.org/\n')],
];
for (const [label, mutate] of cases) test(`rejects ${label}`, t => {
  const x = fixture(t); mutate(x); assert.throws(() => validateEvidence(x.root));
});

// PR25 adds separate contracts without weakening any of the31 inherited rejection tests.
import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateFollowup } from './validate_followup.mjs';
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
function followupFixture(t) {
  const root = mkdtempSync(join(tmpdir(),'djt-followup-test-'));
  t.after(() => rmSync(root,{recursive:true,force:true}));
  mkdirSync(join(root,f),{recursive:true});
  for (const name of ['sources.csv','claims.csv','entity_crosswalk.csv','transaction_crosswalk.csv',
    'a7_note_inventory.csv','acquisition_manifest.csv','rinfo_audit.json']) cpSync(join(repositoryRoot,f,name),join(root,f,name));
  cpSync(join(repositoryRoot,'rinfo.json'),join(root,'rinfo.json'));
  return {root, edit(name,fn){const p=join(root,f,name);writeFileSync(p,fn(readFileSync(p,'utf8')));}};
}
test('follow-up production records validate and remain read-only', () => {
  const before=readFileSync(join(repositoryRoot,f,'transaction_crosswalk.csv'),'utf8');
  assert.deepEqual(validateFollowup(repositoryRoot),{entities:24,transactions:21,instruments:13,acquisitions:39});
  assert.equal(readFileSync(join(repositoryRoot,f,'transaction_crosswalk.csv'),'utf8'),before);
});
const followupCases = [
  ['unknown entity',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',N19,N01,',',N99,N01,'))],
  ['total promotion',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(/,no\r?\n/,',yes\n'))],
  ['policy in financial ledger',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',toronto,',',policy,'))],
  ['category laundering',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',security_face,',',cash_received,'))],
  ['missing currency',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',USD,',',,'))],
  ['unknown amount as zero',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',reported_buyer_financing,,,',',reported_buyer_financing,0,USD,'))],
  ['note value drift',x=>x.edit('a7_note_inventory.csv',s=>s.replace(',400000,',',400001,'))],
  ['issuer name-only promotion',x=>x.edit('entity_crosswalk.csv',s=>s.replace(',unresolved_issuer,',',legal_entity,'))],
  ['fabricated unavailable hash',x=>x.edit('acquisition_manifest.csv',s=>s.replace('bytes_obtained','not_obtained'))],
  ['unknown source',x=>x.edit('entity_crosswalk.csv',s=>s.replace('S17;S18','S99;S18'))],
  ['inventory audit drift',x=>x.edit('rinfo_audit.json',s=>s.replace('44496','44495'))],
  ['duplicate instrument',x=>x.edit('a7_note_inventory.csv',s=>s+s.split(/\r?\n/)[1]+'\n')],
];
for (const [label,mutate] of followupCases) test(`follow-up rejects ${label}`,t=>{
  const x=followupFixture(t); mutate(x); assert.throws(()=>validateFollowup(x.root));
});

// Wave3 expectations change only for appended reviewed rows; original31 tests are unchanged.
const wave3Cases = [
  ['assignment promoted to payment',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',reported_debt_assignment,',',reported_payment,'))],
  ['holding promoted to payment',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',reported_instrument_holding,',',reported_payment,'))],
  ['carrying value treated as dollar settlement',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',693738000,RUB,',',693738000,USD,'))],
  ['condominium counterparties merged',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',N23,N15,',',N24,N15,'))],
  ['contract inventory promoted to fee amount',x=>x.edit('transaction_crosswalk.csv',s=>s.replace(',N23,N15,management_contract,,,',',N23,N15,management_contract,1,CAD,'))],
];
for (const [label,mutate] of wave3Cases) test(`wave3 rejects ${label}`,t=>{
  const x=followupFixture(t);mutate(x);assert.throws(()=>validateFollowup(x.root));
});
