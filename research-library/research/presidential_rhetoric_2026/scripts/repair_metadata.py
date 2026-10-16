import pathlib,json,re,datetime
P=pathlib.Path(__import__("os").environ.get("DCPD_DATA_DIR", str(pathlib.Path(__file__).resolve().parents[1]/".cache/dcpd")));P.mkdir(parents=True,exist_ok=True)
MONTH='(?:January|February|March|April|May|June|July|August|September|October|November|December)'
def repair(a):
 if a.get('status')!='ok':return a
 lines=a.get('lines',[]);title=a.get('header_title',a.get('title',''));a['header_title']=title;a['title']=title;a['date']='';datekind=''
 for kind,pattern,items in [('standalone',r'^('+MONTH+r' \d{1,2}, \d{4})$',lines[:8]),('prefix',r'^('+MONTH+r' \d{1,2}, \d{4})',lines[2:5]),('title_suffix',r'('+MONTH+r' \d{1,2}, '+a['id'][5:9]+r')$', [title])]:
  for t in items:
   m=re.search(pattern,t)
   if m:
    try:a['date']=datetime.datetime.strptime(m[1],'%B %d, %Y').date().isoformat();datekind=kind;break
    except:pass
  if a['date']:break
 if datekind=='title_suffix':a['title']=re.sub(r' '+MONTH+r' \d{1,2}, \d{4}$','',title)
 a['date_parse_method']=datekind;return a
if __name__=='__main__':
 for p in (P/'records').glob('*.json'):
  a=json.loads(p.read_text());b=repair(a);p.write_text(json.dumps(b,ensure_ascii=False,indent=2))
