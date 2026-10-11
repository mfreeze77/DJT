// Committed-extract and interpretation controls. No network/raw-export acquisition claim.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCsv } from './validate_evidence.mjs';
const here=dirname(fileURLToPath(import.meta.url));
const read=n=>readFileSync(resolve(here,n),'utf8');
const rows=n=>parseCsv(read(n),n);
const index=(n,k)=>new Map(rows(n).map(r=>[r[k],r]));
const audit=JSON.parse(read('gorlane_selection_audit.json'));
const edges=index('gorlane_neighborhood_relationships.csv','csv_row');
const nodes=index('gorlane_neighborhood_nodes.csv','node_id');
const sources=index('sources.csv','source_id');
const claims=index('claims.csv','claim_id');
const q=index('tax_oge_reconciliation.csv','reconciliation_id');
const ids=new Set(audit.seed_ids);
function checkedTax(r){
  assert.equal(r.entity_id,'N15');assert.equal(r.source_ids,'S63');assert.equal(r.return_id,'TR31');
  assert.equal(r.tax_year,'2017');assert.equal(r.amount,'2219431');assert.equal(r.currency,'USD');
  assert.equal(r.revision_status,'amended_checkbox_marked');
  assert.equal(r.measure,'reported_QSub_NYC3L_taxable_income_exclusion_statement');
  assert.equal(r.actual_bank_match,'not_obtained');assert.equal(r.include_in_totals,'no');
  assert.match(r.locator,/physical38/);assert.match(r.locator,/field blank/);
  assert.match(r.limit,/not gross receipts fees cash buyout/);
}
test('all scoped incident edges retain both hydrated endpoints without old whitelist',()=>{
 assert.equal(edges.size,40);assert.equal(nodes.size,39);assert.equal(ids.size,15);
 for(const r of edges.values()){
  assert(ids.has(r.node_id_start)||ids.has(r.node_id_end));assert(nodes.has(r.node_id_start));assert(nodes.has(r.node_id_end));
  assert.equal(r.source_id,'S59');assert.match(r.raw_fields_sha256,/^[a-f0-9]{64}$/);
 }
});
test('Freegain and both later Equalchance missing-neighbor records survive',()=>{
 for(const [n,id,date] of [['336663','12099846','12-DEC-2012'],['336664','12099846','29-DEC-2011'],['466882','12146270','12-DEC-2012']]){
  const r=edges.get(n);assert(r);assert.equal(r.node_id_start,id);assert.equal(r.node_id_end,'10210594');assert.equal(r.start_date,date);assert.equal(r.end_date,'');
 }
});
test('eleven dated holdings preserve blanks and do not infer present percentage or replacement',()=>{
 const rr=rows('gorlane_ownership_timeline.csv');assert.equal(rr.length,11);
 for(const r of rr){assert.equal(r.percentage,'');assert.equal(r.present_ownership_proven,'no');assert.equal(r.replacement_proven,'no');
 const e=edges.get(r.csv_row);assert.equal(r.source_start_date,e.start_date);assert.equal(r.source_end_date,e.end_date);}
 assert.equal(rr.find(r=>r.csv_row==='640470').old_selected_edge,'OE08');
});
test('two Equalchance nodes and Midland jurisdiction boundary remain separate',()=>{
 assert(nodes.has('12099846')&&nodes.has('12163340'));assert(nodes.has('12155628')&&nodes.has('10088926'));
 for(const r of nodes.values())assert.equal(r.automatic_merge,'no');
 assert.match(index('entity_crosswalk.csv','entity_id').get('N30').identity_limit,/without automatic merge/);
});
test('all alias candidates have provenance and decisions; addresses not republished',()=>{
 const rr=rows('gorlane_alias_review.csv');assert.equal(rr.length,57);assert.equal(new Set(rr.map(r=>r.node_id)).size,57);
 for(const r of rr){assert(r.decision&&r.reason&&r.matched_fields);assert.equal(r.automatic_merge,'no');assert.match(r.raw_fields_sha256,/^[a-f0-9]{64}$/);}
 for(const r of nodes.values())if(r.node_type==='addresses')assert.match(r.name,/withheld/);
});
test('all 55 recovered page projections map without claiming independent confirmations',()=>{
 const rr=rows('gorlane_live_comparison.csv');assert.equal(rr.length,55);
 for(const r of rr){assert.equal(r.match_status,'matched');assert(edges.has(r.matching_raw_rows));assert(ids.has(r.page_node_id));assert.match(r.limit,/same ICIJ family/);}
});
test('same raw ZIP and different recovered HTML bytes are both recorded',()=>{
 assert.equal(audit.baseline_zip_equal,true);assert.equal(audit.page_bytes_equal,false);
 assert.notEqual(audit.baseline_page_sha256,audit.recovered_page_sha256);
 assert.match(audit.page_hash_limit,/do not infer/);assert.equal(audit.missing_endpoints,0);
});
test('all role-matrix sources resolve and all rows stay outside totals',()=>{
 for(const r of rows('gorlane_purchaser_roles.csv')){
  for(const s of r.source_ids.split(';'))assert(sources.has(s));assert(r.locator&&r.missing_proof);
  for(const f of ['provider_of_funds','transmitting_agent','benefited_obligor','ultimate_payee_account'])assert(r[f]);
  assert.equal(r.include_in_totals,'no');
 }
});
test('T22 preserves Etmor payer and Parborio benefited-obligor meaning',()=>{
 const r=index('transaction_crosswalk.csv','transaction_id').get('T22');
 assert.equal(r.from_entity_id,'N31');assert.equal(r.to_entity_id,'N26');assert.equal(r.amount,'105825000');
 assert.match(r.status,/benefited obligor NOT confirmed bank payee/);assert.equal(r.include_in_totals,'no');
});
test('official identifiers are qualified and cannot certify three unnamed buyers',()=>{
 const e=index('entity_crosswalk.csv','entity_id');
 for(const [id,reg]of[['N28','251868'],['N29','251695'],['N30','187745'],['N32','286910'],['N36','286456']]){
  assert(e.get(id).identifiers.includes(reg));assert(e.get(id).source_ids.split(';').includes('S81'));
 }
 assert.match(claims.get('C78').counterevidence_or_limit,/no explicit mapping/);
 assert.match(claims.get('C79').counterevidence_or_limit,/proposal not final strikeoff/);
});
test('UK filing-date conflict and limited dormant counterevidence stay visible',()=>{
 assert.match(claims.get('C76').counterevidence_or_limit,/14\/05\/2008/);
 assert.match(claims.get('C76').counterevidence_or_limit,/do not silently correct/);
 assert.match(claims.get('C77').counterevidence_or_limit,/not a bank audit/);
 assert.match(index('entity_crosswalk.csv','entity_id').get('N37').identity_limit,/distinct from Seychelles/);
});
test('appeal scope, interim status and contractual leverage remain distinguished',()=>{
 assert.match(claims.get('C81').claim,/Castlerose/);assert.match(claims.get('C81').counterevidence_or_limit,/no separately sealed order/);
 assert.match(claims.get('C80').counterevidence_or_limit,/prosecution submissions not original facilities/);
 assert.match(claims.get('C82').counterevidence_or_limit,/not proof of the2010payment source/);
});
test('new tax amount requires source-image-specific bounded classification',()=>checkedTax(q.get('Q12')));
test('new tax amount cannot be relabeled cash, fees or buyout',()=>{
 for(const measure of ['bank_receipt','management_fee_revenue','buyout_consideration','gross_receipts'])
  assert.throws(()=>checkedTax({...q.get('Q12'),measure}));
 assert.throws(()=>checkedTax({...q.get('Q12'),actual_bank_match:'confirmed'}));
 assert.throws(()=>checkedTax({...q.get('Q12'),include_in_totals:'yes'}));
});
test('tax provenance may not move to parent, different year or unmarked amendment',()=>{
 for(const change of [{entity_id:'N33'},{tax_year:'2018'},{source_ids:'S74'},{revision_status:'original'},{locator:'Form1120Sline19'}])
  assert.throws(()=>checkedTax({...q.get('Q12'),...change}));
});
test('OGE mixed benefit and unknown component allocations are unchanged',()=>{
 assert.equal(q.get('Q01').amount,'2273297');assert.equal(q.get('Q01').measure,'existing_mixed_OGE_income');
 for(const id of ['Q10','Q11'])assert.equal(q.get(id).amount,'');
 assert.equal(q.get('Q02').period_start,'2017-01-19');
});
test('cash/obligation table never adds duplicate measures or zero-fills open legs',()=>{
 const rr=index('gorlane_cash_obligation_reconciliation.csv','reconciliation_id');
 for(const r of rr.values()){
  assert.equal(r.include_in_totals,'no');assert(r.reconciliation_limit&&r.next_document);
  for(const s of r.source_ids.split(';'))assert(sources.has(s));
 }
 for(const id of ['GO09','GO12','GO15','GO17'])assert.equal(rr.get(id).amount,'');
 assert.match(rr.get('GO12').link_status,/RF-014 withdrawn\/unconfirmed/);
 assert.equal(rr.get('GO03').amount,'105825000');assert.equal(rr.get('GO01').amount,'850000000');
});
test('new judicial and registry records do not become an A7 financial path',()=>{
 assert.match(read('gorlane_reviewed_delta.md'),/A7.*outside this transaction wave/s);
 const added=rows('relationships.csv').filter(r=>Number(r.edge_id.slice(1))>=37);
 for(const r of added)assert(!/A7|Aragon|Exim/.test(`${r.from_entity} ${r.to_entity}`));
});
