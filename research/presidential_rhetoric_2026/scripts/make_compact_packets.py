import json,pathlib,re
P=pathlib.Path(__import__("os").environ.get("DCPD_DATA_DIR", str(pathlib.Path(__file__).resolve().parents[1]/".cache/dcpd")));P.mkdir(parents=True,exist_ok=True)
corpus={x['id']:x for x in json.loads((P/'eligible_corpus.json').read_text())}
for target in ['putin','canada_mexico','nato']:
 packets=json.loads((P/f'{target}_packets.json').read_text());compact=[];personal=[]
 for a in packets:
  z=corpus[a['id']]['paragraphs'];ix=set()
  for h in a['hit_paragraphs']:
   speaker=z[h]['speaker']
   if speaker.startswith('Trump') or speaker=='Mixed':
    ix.add(h)
    if h and z[h-1]['speaker']=='Reporter':ix.add(h-1)
    for j in range(h+1,min(h+3,len(z))):
     if z[j]['speaker'].startswith('Trump'):ix.add(j)
     else:break
   elif speaker=='Reporter':
    ix.add(h);answers=0
    for j in range(h+1,min(h+9,len(z))):
     sp=z[j]['speaker']
     if sp=='Editorial_heading':break
     if sp.startswith('Trump'):
      ix.add(j);answers+=1
      if answers>=3:break
     elif sp in ['Reporter','Editorial']:ix.add(j)
     else:break
  c=dict(a);c['contexts']=[t for t in z if t['i']in ix];c['compact_caution']='This is a review aid. Inspect full original for ambiguity, pronouns, or omitted speakers. Heuristic speaker labels need verification.'
  if c['contexts']:compact.append(c)
  if target=='putin':
   hits=[t['i']for t in z if re.search(r'\bPutin\b',t['text'],re.I)];ix=set()
   for h in hits:ix.update(range(max(h-1,0),min(h+3,len(z))))
   if hits:
    c=dict(a);c['hit_paragraphs']=hits;c['contexts']=[t for t in z if t['i']in ix];personal.append(c)
 for key,items in [(target+'_compact',compact)]+([('putin_personal_only',personal)]if target=='putin'else[]):
  (P/f'{key}_packets.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
  (P/f'{key}_packets.txt').write_text('\n\n'.join(f"=== {a['id']} | {a['date']} | {a['title']}\n{a['url']}\n"+'\n'.join(f"[{z['i']}; {z['speaker']}] {z['text']}"for z in a['contexts'])for a in items))
  print(key,len(items),'documents',sum(len(z['text'].split())for x in items for z in x['contexts']),'words')
