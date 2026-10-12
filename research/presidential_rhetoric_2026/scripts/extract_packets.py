import pathlib,json,re,collections,datetime,html
P=pathlib.Path(__import__("os").environ.get("DCPD_DATA_DIR", str(pathlib.Path(__file__).resolve().parents[1]/".cache/dcpd")));P.mkdir(parents=True,exist_ok=True)
records=[json.loads(p.read_text()) for p in (P/'records').glob('*.json')]
manifest=[];included=[];failure=[]
PAT={
 'putin':r'\b(?:Putin|Russia[n]?s?|Soviet|Kremlin)\b',
 'canada_mexico':r'\b(?:Canada|Canadian[s]?|Trudeau|Carney|Mexico|Mexican[s]?|Sheinbaum)\b',
 'nato':r'\b(?:NATO|North Atlantic|Rutte|Greenland|Europe(?:an)?|European Union|EU|Albania[n]?|Belgium|Belgian|Bulgaria[n]?|Croatia[n]?|Czech(?:ia)?|Denmark|Danish|Dane[s]?|Estonia[n]?|Finland|Finnish|France|French|Germany|German[s]?|Greece|Greek[s]?|Hungary|Hungarian[s]?|Iceland(?:ic)?|Italy|Italian[s]?|Latvia[n]?|Lithuania[n]?|Luxembourg|Montenegro|Netherlands|Dutch|North Macedonia|Norway|Norwegian[s]?|Poland|Polish|Portugal|Portuguese|Romania[n]?|Slovakia[n]?|Slovenia[n]?|Spain|Spanish|Sweden|Swedish|Turkey|Turkish|Türkiye|United Kingdom|Britain|British|U\.?K\.?|Macron|Starmer|Merz|Scholz|Meloni|Orban|Orbán|Erdogan|Erdoğan|Sanchez|Sánchez|Frederiksen|Støre|Stubb|Tusk|Duda|Nawrocki|von der Leyen)\b'
}
regex={k:re.compile(v,re.I)for k,v in PAT.items()}
packets={k:[]for k in PAT}
for a in sorted(records,key=lambda x:(x.get('date',''),x['id'])):
 title=a.get('title','');cat=a.get('category','');date=a.get('date','');admin=a.get('administration','')
 oral=bool(re.search(r'^(?:Remarks|Address|Inaugural Address|Commencement Address|Interview|The President.s News Conference|News Conference|Exchange|Radio Address|Videotaped|Telephone)',title) or re.search(r'(?:Addresses and Remarks|Addresses to the Nation|News Conferences|Interviews With the News Media)',cat))
 statement=bool(re.search(r'^(?:Statement|Joint Statement|Letter|Message)',title))
 legal=bool(re.search(r'^(?:Executive Order|Proclamation|Memorandum|Notice|National Security Presidential|Presidential Determination|Order)',title))
 eligible=a.get('status')=='ok' and 'Donald J. Trump' in admin and '2025-01-20'<=date<='2026-10-12' and (oral or statement) and not legal
 reason=('included_oral' if oral else 'included_written') if eligible else ('download_error' if a.get('status')!='ok' else 'other_president' if 'Donald J. Trump' not in admin else 'missing_or_outside_date' if not '2025-01-20'<=date<='2026-10-12' else 'formal_legal_or_other_document')
 m={k:a.get(k,'')for k in ['id','date','title','administration','category','url','source','status']};m.update(eligible=eligible,selection_reason=reason,document_type='oral' if oral else 'written_statement' if statement else 'formal_other')
 body='\n'.join(a.get('lines',[])[3:])
 if oral:voice='Trump_direct'
 elif re.match(r'Joint Statement',title)or 'Joint Statements :' in cat:voice='joint'
 elif statement and ('Statements by the President :' in cat or re.search(r'\b(?:I|my|My)\b',body)):voice='attributed_Trump_written'
 elif statement and re.search(r'\b(?:President Trump|The President|the President)\b',body):voice='administration_readout'
 else:voice='uncertain' if statement else 'other'
 m['voice_attribution']=voice
 m['voice_attribution_method']='document-level heuristic; transcript speakers and written authorship require manual verification'
 m['analysis_base_eligible']=eligible and voice in ['Trump_direct','attributed_Trump_written']
 manifest.append(m)
 if not eligible:continue
 raw=a['lines'];content=[];seen_date=False
 for line in raw:
  if line.startswith(('Administration of','Categories:','Category:','Names:','Subjects:','Locations:','DCPD Number:','NOTE:','Note:')):
   if content and line.startswith(('Categories:','Category:','NOTE:','Note:')):break
   continue
  if line==a.get('header_title',title):
   if re.search(r'[A-Z][a-z]+ \d{1,2}, \d{4}$',line):seen_date=True
   continue
  if re.fullmatch(r'[A-Z][a-z]+ \d{1,2}, \d{4}',line):seen_date=True;continue
  if seen_date: content.append(line)
 # Source-format speaker labels, rather than name-prefix guesses. Keep mixed paragraphs for human review.
 rawhtml=(P/'html'/f"{a['id']}.html").read_text()
 styles={c:b for c,b in re.findall(r'\.([\w]+)\s*\{([^}]+)\}',rawhtml)}
 clean=lambda t: re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',t))).strip()
 labels={};headings=set();mixed=set();speaker_runs={}
 for attrs,inner in re.findall(r'<p\b([^>]*)>(.*?)</p>',rawhtml,re.S|re.I):
  text=clean(inner);cl=re.search(r'class="([^\"]+)"',attrs);cls=cl[1]if cl else ''
  italic='font-style: italic' in styles.get(cls,'')
  if italic and '<span class="p">' in inner:
   prefix=clean(inner.split('<span class="p">')[0]).strip().rstrip('.')
   if prefix and len(prefix)<130 and not prefix.startswith(('[','Categories:','Names:','Subjects:','DCPD Number:')):
    labels[text]=prefix
    runs=[clean(q).strip().rstrip('.') for q in re.findall(r'(?:^|</span>)\s*([^<>]{1,130}?)\s*<span class="p">',inner) if re.match(r'^(?:The President|President|Prime Minister|Chancellor|Q\.|Secretary|Sen\.|Senator|Rep\.|Representative|Mr\.|Mrs\.|Ms\.|Dr\.|Vice President|Governor|Staff Secretary)',clean(q))]
    if len(runs)>1:mixed.add(text);speaker_runs[text]=runs
  elif italic and '<span class="p">' not in inner and len(text)<250:
   headings.add(text)
 has_speakers=any(v in ['The President','President Trump'] for v in labels.values())
 current='unlabeled' if has_speakers else 'Trump_written_or_single_speaker' if voice in ['Trump_direct','attributed_Trump_written'] else voice
 paragraphs=[]
 for idx,t in enumerate(content):
  label=labels.get(t)
  if label in ['The President','President Trump']:current='Trump'
  elif label=='Q':current='Reporter'
  elif label:current=label
  if t in headings:speaker='Editorial_heading'
  elif t.startswith('[') and t.endswith(']'):speaker='Editorial'
  else:speaker=current
  runs=speaker_runs.get(t,[])
  paragraphs.append({'i':idx,'speaker':'Mixed' if runs else speaker,'text':t,'source_speaker_label':label,'mixed_speaker_paragraph':bool(runs),'source_speaker_runs':runs})
  if runs:
   last=runs[-1];current='Trump' if last in ['The President','President Trump'] else 'Reporter' if last=='Q' else last
 data=dict(m,paragraphs=paragraphs,text_path=str(P/'records'/f"{a['id']}.json"))
 included.append(data)
 for target,rx in regex.items():
  hits=[]
  for z in paragraphs:
   t=z['text']
   if target=='canada_mexico':t=re.sub(r'\bNew Mexico\b','',t,flags=re.I)
   if rx.search(t):hits.append(z['i'])
  if not hits:continue
  inds=set()
  for h in hits:inds.update(range(max(0,h-2),min(len(paragraphs),h+4)))
  packet={k:v for k,v in data.items()if k!='paragraphs'}
  packet['hit_paragraphs']=hits;packet['contexts']=[z for z in paragraphs if z['i']in inds]
  packet['full_paragraph_count']=len(paragraphs)
  packets[target].append(packet)
(P/'corpus_manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(P/'eligible_corpus.json').write_text(json.dumps(included,ensure_ascii=False,indent=2))
for target,items in packets.items():
 (P/f'{target}_packets.json').write_text(json.dumps(items,ensure_ascii=False,indent=2))
 (P/f'{target}_packets.txt').write_text('\n\n'.join(f"=== {a['id']} | {a['date']} | {a['title']}\n{a['url']}\n"+'\n'.join(f"[{z['i']}; {z['speaker']}] {z['text']}"for z in a['contexts'])for a in items))
summary={'downloaded_records':len(records),'eligible_documents':len(included),'selection':dict(collections.Counter(x['selection_reason']for x in manifest)),'types':dict(collections.Counter(x['document_type']for x in included)),'voice_attribution':dict(collections.Counter(x['voice_attribution']for x in included)),'analysis_base_documents':sum(x['analysis_base_eligible']for x in included),'min_event_date':min([x['date']for x in included],default=''),'max_event_date':max([x['date']for x in included],default=''),'by_month':dict(sorted(collections.Counter(x['date'][:7]for x in included).items())),'target_packets':{k:len(v)for k,v in packets.items()},'raw_target_word_counts':{k:sum(len(z['text'].split())for x in v for z in x['contexts'])for k,v in packets.items()}}
(P/'corpus_summary.json').write_text(json.dumps(summary,indent=2));print(json.dumps(summary,indent=2))
