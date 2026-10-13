import os
import urllib.request,urllib.parse,pathlib,json,time,concurrent.futures
P=pathlib.Path(os.environ.get('SOCIAL_DATA_DIR', str(pathlib.Path(__file__).resolve().parents[2]/'.cache/social')));P.mkdir(parents=True,exist_ok=True);(P/'rollcall_pages').mkdir(exist_ok=True)
def get(platform,page):
 u='https://rollcall.com/wp-json/factbase/v1/twitter?'+urllib.parse.urlencode({'platform':platform,'sort':'date','sort_order':'desc','dateFilter':'custom','startDate':'2025-01-20','endDate':'2026-10-12','page':page,'format':'json'})
 p=P/'rollcall_pages'/f'{platform.replace(" ","_")}_{page}.json'
 if p.exists():return json.loads(p.read_text())
 for i in range(3):
  try:
   b=urllib.request.urlopen(u,timeout=35).read();a=json.loads(b);p.write_bytes(b);return a
  except Exception as e:
   if i==2:return {'error':str(e),'url':u}
   time.sleep(1+i)
for platform in ['truth social']:
 pages=[];done=False;start=1
 while not done:
  with concurrent.futures.ThreadPoolExecutor(max_workers=5)as ex:
   batch=list(ex.map(lambda n:get(platform,n),range(start,start+5)))
  pages+=batch
  for a in batch:
   data=a.get('data',[])
   if data and min(r['date']for r in data)<'2025-01-20':done=True
   if a.get('error'):print(a,flush=True);done=True
  print(platform,start,len(pages),min([r['date']for a in batch for r in a.get('data',[])],default=''),flush=True)
  start+=5
 (P/'rollcall_truth_social_combined.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
