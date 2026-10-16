import os
import urllib.request,concurrent.futures,pathlib,lxml.html,json,re,time,datetime,html,collections
P=pathlib.Path(os.environ.get('SOCIAL_DATA_DIR', str(pathlib.Path(__file__).resolve().parents[2]/'.cache/social')));P.mkdir(parents=True,exist_ok=True);(P/'app_index').mkdir(exist_ok=True);(P/'app_days').mkdir(exist_ok=True)
def get(url,path):
 if path.exists():return path.read_text()
 for i in range(3):
  try:
   r=urllib.request.urlopen(url,timeout=35);b=r.read();path.write_bytes(b);return b.decode()
  except Exception as e:
   if i==2:return None
   time.sleep(1+i)
def index(i):
 u=f'https://www.presidency.ucsb.edu/documents/app-attributes/truth-social?items_per_page=60&page={i}';s=get(u,P/'app_index'/f'{i}.html');out=[]
 if s:
  d=lxml.html.fromstring(s)
  for a in d.xpath('//a[contains(@href,"/documents/truth-social-posts-")]'):
   title=a.text_content().strip();m=re.search(r'Truth Social Posts of (.*)',title)
   if not m:continue
   try:date=datetime.datetime.strptime(m[1],'%B %d, %Y').strftime('%Y-%m-%d')
   except:continue
   out.append({'date':date,'title':title,'url':'https://www.presidency.ucsb.edu'+a.get('href'),'index_url':u})
 return out
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as ex:links=sum(list(ex.map(index,range(12))),[])
links=list({r['url']:r for r in links}.values());(P/'app_index_manifest.json').write_text(json.dumps(links,indent=2)); links=[r for r in links if '2025-01-20'<=r['date']<='2026-10-12'];print('eligible APP dates',len(links),flush=True)
def day(r):
 u=r['url'];s=get(u,P/'app_days'/(r['date']+'.html'))
 if not s:return dict(r,status='download_error')
 d=lxml.html.fromstring(s);rows=[];pending=None
 for tr in d.xpath('//table//tr'):
  tds=tr.xpath('./td')
  if len(tds)==2 and re.search(r'\d{1,2}:\d{2}',tds[0].text_content()):
   pending={'raw_timestamp':tds[0].text_content().strip(),'app_text':tds[1].text_content().strip(),'app_content_html':lxml.html.tostring(tds[1],encoding='unicode'),'source_url':u,'date':r['date']}
  elif len(tds)==1 and pending:
   urls=tds[0].xpath('.//a[contains(@href,"truthsocial.com")]/@href')
   if urls:
    pending['url']=urls[0];m=re.search(r'/(\d+)(?:\D|$)',urls[0]);pending['id']=m[1]if m else None;rows.append(pending);pending=None
 return dict(r,status='ok',posts=rows)
with concurrent.futures.ThreadPoolExecutor(max_workers=8)as ex:
 days=[]
 for i,r in enumerate(ex.map(day,links)):
  days.append(r)
  if i%30==0:print('downloaded APP',i,flush=True)
(P/'app_days_parsed.json').write_text(json.dumps(days,ensure_ascii=False,indent=2));print('APP done',len(days),sum(len(r.get('posts',[]))for r in days),flush=True)
