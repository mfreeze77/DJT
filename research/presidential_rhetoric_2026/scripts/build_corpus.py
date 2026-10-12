import urllib.request, pathlib, xml.etree.ElementTree as ET, concurrent.futures as cf, time, json, re, datetime, traceback
import html
from repair_metadata import repair
P=pathlib.Path(__import__("os").environ.get("DCPD_DATA_DIR", str(pathlib.Path(__file__).resolve().parents[1]/".cache/dcpd")));P.mkdir(parents=True,exist_ok=True);(P/'html').mkdir(exist_ok=True);(P/'records').mkdir(exist_ok=True)
rows=[]
for y in [2025,2026]:
 index=P/f'DCPD_{y}_sitemap.xml'
 if not index.exists():
  index.write_bytes(urllib.request.urlopen(f'https://www.govinfo.gov/sitemap/DCPD_{y}_sitemap.xml',timeout=30).read())
 root=ET.fromstring((P/f'DCPD_{y}_sitemap.xml').read_bytes())
 for c in root:
  z={x.tag.split('}')[-1]:x.text for x in c};z['id']=z['loc'].split('/')[-1]
  if re.fullmatch(r'DCPD-\d{9}',z['id']):rows.append(z)
(P/'sitemap_manifest.json').write_text(json.dumps(rows,indent=2))
def work(z):
 id=z['id'];p=P/'html'/f'{id}.html';u=f'https://www.govinfo.gov/content/pkg/{id}/html/{id}.htm';a=dict(z,url=u,source='GovInfo DCPD')
 try:
  if p.exists():b=p.read_bytes()
  else:
   for attempt in range(3):
    try:b=urllib.request.urlopen(u,timeout=30).read();p.write_bytes(b);break
    except Exception:
     if attempt==2:raise
     time.sleep(1)
  raw=b.decode('utf-8',errors='replace')
  clean=lambda t: re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',t))).strip()
  lines=[clean(x[1]) for x in re.findall(r'<(p|h1|h2)\b[^>]*>(.*?)</\1>',raw,re.S|re.I)]
  hm=re.search(r'<h1\b[^>]*>(.*?)</h1>',raw,re.S|re.I)
  a['title']=clean(hm[1]) if hm else next((x for x in lines if x!='' and not x.startswith('Administration of')),'')
  a['administration']=next((x for x in lines if x.startswith('Administration of')),'')
  a['date']=''
  for x in lines[:10]:
   m=re.search(r'([A-Z][a-z]+ \d{1,2}, \d{4})$',x)
   if m:
    try:a['date']=datetime.datetime.strptime(m[1],'%B %d, %Y').date().isoformat();break
    except: pass
  a['header_title']=a['title'];a['title']=re.sub(r' [A-Z][a-z]+ \d{1,2}, \d{4}$','',a['title'])
  a['lines']=lines;a['text']='\n'.join(lines)
  a['category']=next((x for x in lines if x.startswith('Categories:') or x.startswith('Category:')),'')
  a['status']='ok'
 except Exception as e:a['status']='error';a['error']=str(e)
 a=repair(a)
 (P/'records'/f'{id}.json').write_text(json.dumps(a,ensure_ascii=False,indent=2))
 return a
start=time.time();results=[]
with cf.ThreadPoolExecutor(max_workers=16) as ex:
 for n,a in enumerate(ex.map(work,rows),1):
  results.append(a)
  if n%50==0: print(n,'/',len(rows),'seconds',round(time.time()-start),'errors',sum(x['status']=='error' for x in results),flush=True)
(P/'all_records.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print('DONE',len(results),'seconds',time.time()-start,flush=True)
