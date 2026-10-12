"""Fetch public initial snapshots. No credentials, cookies, or unpublished endpoints."""
import urllib.request,urllib.parse,pathlib,json,os,hashlib,datetime
P=pathlib.Path(os.environ.get('SOCIAL_DATA_DIR',str(pathlib.Path(__file__).resolve().parents[2]/'.cache/social')));P.mkdir(parents=True,exist_ok=True)
manifest=[]
def fetch(url,filename):
 p=P/filename
 with urllib.request.urlopen(url,timeout=60)as r:
  data=r.read();p.write_bytes(data);manifest.append({'url':url,'file':filename,'sha256':hashlib.sha256(data).hexdigest(),'status':r.status,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()})
 return data
fetch('https://ix.cnn.io/data/truth-social/truth_archive.json','cnn_archive.json')
x=[]
for page in range(1,5):
 u='https://rollcall.com/wp-json/factbase/v1/twitter?'+urllib.parse.urlencode({'platform':'twitter','sort':'date','sort_order':'desc','page':page,'format':'json'})
 a=json.loads(fetch(u,f'rollcall_x_{page}.json'));x+=a.get('data',[])
 if x and min(r['date']for r in a.get('data',[]))<'2025-01-20':break
(P/'rollcall_x_inperiod.json').write_text(json.dumps([r for r in x if r['date']>='2025-01-20'],ensure_ascii=False,indent=2))
(P/'fetch_manifest.json').write_text(json.dumps(manifest,indent=2))
