import os
import pathlib,json,re,hashlib,datetime,collections,lxml.html,zoneinfo
P=pathlib.Path(os.environ.get('SOCIAL_DATA_DIR', str(pathlib.Path(__file__).resolve().parents[2]/'.cache/social')));P.mkdir(parents=True,exist_ok=True)
START=datetime.datetime.fromisoformat('2025-01-20T17:00:00+00:00');END=datetime.datetime.fromisoformat('2026-10-12T03:12:00+00:00');NY=zoneinfo.ZoneInfo('America/New_York')
def dt(s):return datetime.datetime.fromisoformat(s.replace('Z','+00:00')).astimezone(datetime.timezone.utc)
def iso(t):return t.isoformat().replace('+00:00','Z')
def clean(s):
 d=lxml.html.fromstring('<div>'+s+'</div>')
 for e in d.xpath('//br'):e.tail='\n'+(e.tail or '')
 for e in d.xpath('//p'):e.tail='\n'+(e.tail or '')
 return d.text_content().strip()
def words(s):return re.sub(r'[^a-z0-9]+',' ',re.sub(r'https?://\S+','',s.lower())).strip()
cnn={r['id']:r for r in json.loads((P/'cnn_archive.json').read_text())if START<=dt(r['created_at'])<=END}
days=json.loads((P/'app_days_parsed.json').read_text());app={};app_duplicates=[]
for d in days:
 for r in d.get('posts',[]):
  id=r.get('id')
  if not id:continue
  try:t=datetime.datetime.fromtimestamp((int(id)>>16)/1000,datetime.timezone.utc)
  except:continue
  if not START<=t<=END:continue
  if id in app:app_duplicates.append({'id':id,'first':app[id]['source_url'],'second':r['source_url']})
  app[id]=r
rc={};rawpages=[]
for f in sorted((P/'rollcall_pages').glob('truth_social_*.json'),key=lambda p:int(p.stem.split('_')[-1])):
 data=json.loads(f.read_text());rawpages.append({'file':f.name,'page':data.get('meta',{}).get('page'),'count':len(data.get('data',[])),'min_date':min([r['date']for r in data.get('data',[])],default=''),'max_date':max([r['date']for r in data.get('data',[])],default='')})
 for r in data.get('data',[]):
  if START<=dt(r['date'])<=END:rc[r['id']]=r
xraw=json.loads((P/'rollcall_x_inperiod.json').read_text());xraw=[r for r in xraw if START<=dt(r['date'])<=END]
records=[]
for id in sorted(cnn.keys()|app.keys()|rc.keys(),key=int):
 c=cnn.get(id);a=app.get(id);r=rc.get(id);social=r.get('social',{})if r else{};sources=[]
 if c:sources.append({'source':'cnn','url':'https://ix.cnn.io/data/truth-social/truth_archive.json'})
 if a:sources.append({'source':'app','url':a['source_url']})
 if r:sources.append({'source':'rollcall','url':'https://rollcall.com/factbase/topic/assets/?platform=truth+social'})
 time=dt(c['created_at'])if c else dt(r['date'])if r else datetime.datetime.fromtimestamp((int(id)>>16)/1000,datetime.timezone.utc)
 text=clean(social['post_html'])if social.get('post_html')else social.get('post_text','')if r else clean(c['content'])if c else a['app_text']
 repost=bool(social.get('repost_flag')) or bool(re.match(r'^\[?RT\s+@',text));quote=bool(social.get('quote_flag')) or bool(re.search(r'RT:\s*https://truthsocial',text))
 own=text;quoted_ref=''
 if repost:own=''
 elif quote:
  own=re.split(r'RT:\s*https://truthsocial',text)[0].strip();quoted_ref=social.get('quote_id')or''
 type='repost'if repost else'quote_post'if quote else'media_only'if not text.strip()else'original_account_text'
 if not r and not c:type='app_editorial_candidate';own=''
 record={'id':id,'platform':'Truth Social','account':'realDonaldTrump','created_at':iso(time),'date':time.astimezone(NY).date().isoformat(),'url':c['url']if c else r['post_url']if r else a['url'],'text':text,'authored_text_candidate':own,'type':type,'repost_flag':repost,'quote_flag':quote,'repost_id':social.get('repost_id'),'quote_id':quoted_ref or social.get('quote_id'),'deleted_flag':r.get('deleted_flag')if r else None,'timestamp_basis':'CNN API timestamp'if c else'Roll Call timestamp'if r else'Truth snowflake ID-derived UTC; date corroborated by APP','sources':sources,'source_presence':{'cnn':bool(c),'app':bool(a),'rollcall':bool(r)},'media_urls':list(dict.fromkeys((c or{}).get('media',[])+social.get('media_urls',[]))),'media_archive_screenshot':r.get('image_url')if r else None,'authorship_warning':'Account text is not automatically Trump-authored: attributed quotations, shared headlines, screenshots, and quoted material require manual review. Media speech/OCR is not transcribed here.','text_sha256':hashlib.sha256(text.encode()).hexdigest()}
 records.append(record)
for r in xraw:
 s=r['social'];time=dt(r['date']);text=s.get('post_text',r['text']);rep=bool(s.get('repost_flag'));quo=bool(s.get('quote_flag'));records.append({'id':r['id'],'platform':'X','account':'realDonaldTrump','created_at':iso(time),'date':time.astimezone(NY).date().isoformat(),'url':r['post_url'],'text':text,'authored_text_candidate':''if rep else text,'type':'repost'if rep else'quote_post'if quo else'media_only'if not text.strip()else'original_account_text','repost_flag':rep,'quote_flag':quo,'repost_id':s.get('repost_id'),'quote_id':s.get('quote_id'),'deleted_flag':r.get('deleted_flag'),'timestamp_basis':'Roll Call timestamp','sources':[{'source':'rollcall','url':'https://rollcall.com/factbase/topic/assets/?platform=twitter'},{'source':'supertrumptracker','url':'https://supertrumptracker.com/?platform=X&from=2025-01-20&to=2026-10-12'}],'source_presence':{'rollcall':True,'supertrumptracker':True},'media_urls':s.get('media_urls',[]),'media_archive_screenshot':r.get('image_url'),'authorship_warning':'Roll Call X index latest post February 2, 2026; later platform coverage unverified. Shared quotes/headlines require manual review.','text_sha256':hashlib.sha256(text.encode()).hexdigest()})
records.sort(key=lambda r:(r['created_at'],r['platform'],r['id']))
clusters=collections.defaultdict(list)
for r in records:
 w=words(r['authored_text_candidate']);r['duplicate_text_group']=hashlib.sha256(w.encode()).hexdigest()[:20]if len(w)>60 else None
 if r['duplicate_text_group']:clusters[r['duplicate_text_group']].append(r)
 r['duplicate_of']=r.get('repost_id')or None;r['duplicate_relation']='repost'if r.get('repost_id')else None
for group in clusters.values():
 if len(group)>1:
  for r in group[1:]:
   orig=group[0]
   if (dt(r['created_at'])-dt(orig['created_at'])).total_seconds()<86400:
    r['duplicate_of']=orig['id'];r['duplicate_relation']='same_text_within_24h'
# DCPD exact/fuzzy-compatible textual overlap flags. These are candidates, not automatic removals.
dcp=[]
for f in pathlib.Path(os.environ.get('DCPD_RECORDS_DIR', str(pathlib.Path(__file__).resolve().parents[2]/'.cache/dcpd/records'))).glob('*.json'):
 z=json.loads(f.read_text());ss=words(' '.join(z.get('lines',[])));dcp.append((z.get('id'),z.get('date'),ss))
for r in records:
 w=words(r['authored_text_candidate']);r['dcpd_overlap_candidates']=[]
 if len(w)>100:
  for did,date,ss in dcp:
   if date==r['date'] and (w in ss or (w[:150]in ss and w[-100:]in ss)):r['dcpd_overlap_candidates'].append(did)
(P/'social_normalized.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
(P/'app_duplicate_ids.json').write_text(json.dumps(app_duplicates,indent=2));(P/'rollcall_page_manifest.json').write_text(json.dumps(rawpages,indent=2))
# Keep raw/editorial candidate list separate; term matches in excluded third-party reposts remain auditable.
dic={'PAT':json.loads((pathlib.Path(__file__).resolve().parents[2]/'data/social_targets.json').read_text())}
for name,pat in dic['PAT'].items():
 rx=re.compile(pat,re.I);allrows=[];candidates=[];excluded=[]
 for r in records:
  text=r['text'];text=re.sub(r'\bNew Mexico\b','',text,flags=re.I)if name=='canada_mexico'else text
  if not rx.search(text):continue
  allrows.append(r)
  own=r['authored_text_candidate'];own=re.sub(r'\bNew Mexico\b','',own,flags=re.I)if name=='canada_mexico'else own
  if r['type']not in ['repost','app_editorial_candidate']and own and rx.search(own)and not r.get('duplicate_of'):candidates.append(r)
  else:excluded.append(r)
 (P/f'{name}_packets_final.json').write_text(json.dumps(candidates,ensure_ascii=False,indent=2));(P/f'{name}_all_source_hits.json').write_text(json.dumps(allrows,ensure_ascii=False,indent=2));(P/f'{name}_source_exclusions.json').write_text(json.dumps(excluded,ensure_ascii=False,indent=2));(P/f'{name}_packets_final.txt').write_text('\n\n'.join(f"=== {r['id']} | {r['date']} | {r['platform']} | {r['type']}\n{r['url']}\n{r['authored_text_candidate']}"for r in candidates));print(name,'all',len(allrows),'candidates',len(candidates),'excluded',len(excluded))
meta={'scope_start_utc':iso(START),'snapshot_cutoff_utc':iso(END),'records':len(records),'platforms':dict(collections.Counter(r['platform']for r in records)),'types':dict(collections.Counter(r['type']for r in records)),'truth_source_counts':{'cnn':len(cnn),'app':len(app),'rollcall':len(rc)},'truth_union':len(cnn.keys()|app.keys()|rc.keys()),'x_inperiod':len(xraw),'x_latest':max(r['date']for r in xraw),'app_index_days':len(days),'app_first_day':min(d['date']for d in days),'app_last_day':max(d['date']for d in days),'rollcall_pages':len(rawpages),'rollcall_oldest_fetched_date':min(p['min_date']for p in rawpages),'by_month':dict(sorted(collections.Counter(r['date'][:7]for r in records).items())),'dcpd_overlap_posts':sum(bool(r['dcpd_overlap_candidates'])for r in records),'complete_all_platform_activity':False}
(P/'social_summary.json').write_text(json.dumps(meta,indent=2));print(json.dumps(meta,indent=2))
# No full post text or archive editorial HTML in redistributable index.
portable=P/'portable';portable.mkdir(exist_ok=True)
manifest=[{k:v for k,v in r.items()if k not in ['text','authored_text_candidate','media_urls','media_archive_screenshot','authorship_warning']}for r in records]
(portable/'social_manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2));(portable/'coverage.json').write_text(json.dumps(meta,indent=2))
