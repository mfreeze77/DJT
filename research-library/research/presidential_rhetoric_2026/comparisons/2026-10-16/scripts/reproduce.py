#!/usr/bin/env python3
"""Offline arithmetic and exact-quotation checks. Does not redo semantic judgments."""
import json,pathlib,csv,collections,hashlib,argparse
EXPECTED_CORPUS_SHA256="33a83c60ddd81090afbcda6d5d1cf27421092714603830d26f8ff8b466929d39"
ROOT=pathlib.Path(__file__).resolve().parents[1]
load=lambda p:json.loads((ROOT/p).read_text())
FLAGS=['explicit_character_or_competence_praise','favorable_conduct_appraisal','current_affinity','explicit_trust','defense_or_excuse','favorable_peace_intention','communication_quality','clear_personal_or_conduct_negative','contextual_negative']
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--corpus',type=pathlib.Path,default=ROOT.parents[1]/'.cache/dcpd/eligible_corpus.json')
args=parser.parse_args()
if not args.corpus.is_file():
 parser.error('Frozen eligible corpus is missing; follow README.md to restore the repository snapshot or pass --corpus PATH.')
for name,expected_hash in load('SHA256SUMS.json').items():
 assert hashlib.sha256((ROOT/name).read_bytes()).hexdigest()==expected_hash,('file hash mismatch',name)
corpus_rows=json.loads(args.corpus.read_text())
for row in corpus_rows:row['text_path']='source-records/'+row['id']+'.json'
corpus_sha256=hashlib.sha256(json.dumps(corpus_rows,indent=2,ensure_ascii=False).encode()).hexdigest()
assert corpus_sha256==EXPECTED_CORPUS_SHA256,('incompatible frozen corpus',corpus_sha256)
corpus={r['id']:r for r in corpus_rows}
assert len(corpus)==len(corpus_rows)==1051

records=[]
p=load('data/putin_records.json');records.append(('Vladimir Putin',p['rows']))
k=load('data/kim_records.json');records.append(('Kim Jong Un',[r for r in k['records'] if r['included_personal_target']]))
m=load('data/mbs_records.json');records.append(('Mohammed bin Salman',[r for r in m['records'] if r['main_analysis_included']]))
c=load('data/canada_mexico_records.json')
for t in ['Trudeau','Carney','Sheinbaum']:records.append((t,[r for r in c if r['target']==t and r['included_named_leader_candidate']]))
records.append(('NATO institution',[r for r in load('data/nato_institution_records.json') if r['included_nato_institution_candidate']]))
expected={r['target']:r for r in load('data/category_membership.json')['targets']}
results=[]
for target,rows in records:
 ids=[r.get('id',r.get('communication_id')) for r in rows];assert len(ids)==len(set(ids)),target
 members={f:[] for f in FLAGS}
 for r,id in zip(rows,ids):
  assert id in corpus and r['date']==corpus[id]['date'];assert '2025-01-20'<=r['date']<='2026-09-11'
  for f in FLAGS:
   if r['flags'].get(f) is True:members[f].append(id)
 members['character_or_conduct_praise_union']=sorted(set(members[FLAGS[0]])|set(members[FLAGS[1]]))
 members['broad_favorable_union']=sorted(set().union(*(set(members[f]) for f in FLAGS[:6])))
 members['mixed_broad_favorable_and_clear_negative']=sorted(set(members['broad_favorable_union'])&set(members['clear_personal_or_conduct_negative']))
 for flag,ids in members.items():
  assert sorted(ids)==sorted(expected[target]['memberships'][flag]),(target,flag)
  assert len(ids)==expected[target]['counts'][flag]
 results.append({'target':target,'reviewed_rows':len(rows),**{f:len(ids) for f,ids in members.items()}})
# Check both delivered CSVs against the deduplicated membership ledger.
with (ROOT/'comparison_summary.csv').open() as handle:summary=list(csv.DictReader(handle))
assert len(summary)==len(results) and {r['target'] for r in summary}==set(expected)
by_target={r['target']:r for r in results}
for row in summary:
 for field,value in row.items():
  if field!='target':assert int(value)==by_target[row['target']][field],('summary CSV',row['target'],field)
with (ROOT/'source_index.csv').open() as handle:source_index=list(csv.DictReader(handle))
seen=set()
for row in source_index:
 key=(row['target'],row['source_id']);assert key not in seen;seen.add(key)
 source=corpus[row['source_id']]
 for field in ['date','title','url']:assert row[field]==source[field],('source metadata',key,field)
 for flag,ids in expected[row['target']]['memberships'].items():
  if flag in row:assert int(row[flag])==int(row['source_id'] in ids),('source membership',key,flag)
expected_sources={(target,id) for target,item in expected.items() for ids in item['memberships'].values() for id in ids}
assert seen==expected_sources,('source index coverage',seen^expected_sources)
# Independently check structured quote fields that carry a corpus paragraph index.
checked=0;errors=[]
def walk(x,source_id=None,path=''):
 global checked
 if isinstance(x,dict):
  candidate=x.get('id',x.get('communication_id',x.get('document_id')))
  if isinstance(candidate,str) and candidate.startswith('DCPD-'):source_id=candidate
  quote=x.get('quote')
  inds=x.get('paragraph_index',x.get('paragraph_indices'))
  if isinstance(quote,str) and isinstance(inds,(int,list)) and source_id in corpus:
   inds=[inds] if isinstance(inds,int) else inds
   paras={p['i']:p['text'] for p in corpus[source_id]['paragraphs']}
   strings=[paras[i] for i in inds if i in paras]
   if not any(quote in s for s in strings) and quote not in ' '.join(strings):errors.append((source_id,path,inds,quote[:120]))
   checked+=1
  for key,value in x.items():walk(value,source_id,path+'/'+key)
 elif isinstance(x,list):
  for i,value in enumerate(x):walk(value,source_id,path+'/'+str(i))
for target,rows in records:
 for row in rows:walk(row,path=target)
assert not errors,errors[:20]
print(json.dumps({'status':'PASS','normalized_corpus_sha256':corpus_sha256,'verified_file_hashes':len(load('SHA256SUMS.json')),'source_index_rows_checked':len(source_index),'targets':results,'literal_indexed_quote_fields_checked':checked,'semantic_review_reperformed':False,'comparative_exposure_rates':None},indent=2))
