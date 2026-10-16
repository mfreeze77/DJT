"""Read-only validation of local GovInfo acquisition and analysis manifest."""
import pathlib,json,hashlib,collections,csv,datetime
P=pathlib.Path(__import__("os").environ.get("DCPD_DATA_DIR", str(pathlib.Path(__file__).resolve().parents[1]/".cache/dcpd")));P.mkdir(parents=True,exist_ok=True)
source=json.loads((P/'sitemap_manifest.json').read_text());manifest=json.loads((P/'corpus_manifest.json').read_text())
records={p.stem:json.loads(p.read_text())for p in (P/'records').glob('*.json')}
expected={x['id']for x in source};got=set(records)
validation={'checked_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'expected_numbered_packages':len(expected),'downloaded_record_files':len(got),'missing_ids':sorted(expected-got),'unexpected_ids':sorted(got-expected),'download_errors':[{'id':i,'error':r.get('error')}for i,r in records.items()if r.get('status')!='ok'],'missing_dates':[i for i,r in records.items()if not r.get('date')],'missing_titles':[i for i,r in records.items()if not r.get('title')],'manifest_rows':len(manifest),'eligible_rows':sum(x['eligible']for x in manifest),'max_dates_by_year':{y:max([r.get('date','')for r in records.values()if r['id'].startswith('DCPD-'+y)],default='')for y in ['2025','2026']}}
provenance=[]
for a in source:
 i=a['id'];r=records.get(i,{});html=P/'html'/f'{i}.html';j=P/'records'/f'{i}.json'
 provenance.append({'id':i,'sitemap_url':a['loc'],'source_last_modified':a.get('lastmod',''),'html_url':r.get('url',''),'date':r.get('date',''),'title':r.get('title',''),'status':r.get('status','missing'),'html_bytes':html.stat().st_size if html.exists()else None,'html_sha256':hashlib.sha256(html.read_bytes()).hexdigest()if html.exists()else None,'record_sha256':hashlib.sha256(j.read_bytes()).hexdigest()if j.exists()else None})
(P/'validation.json').write_text(json.dumps(validation,ensure_ascii=False,indent=2));(P/'download_provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2))
with (P/'corpus_manifest.csv').open('w',newline='')as f:
 w=csv.DictWriter(f,fieldnames=list(manifest[0]));w.writeheader();w.writerows(manifest)
print(json.dumps(validation,ensure_ascii=False,indent=2))
