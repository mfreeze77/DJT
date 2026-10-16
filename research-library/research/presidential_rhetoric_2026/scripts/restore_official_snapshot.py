"""Restore bundled public-government HTML to the ignored local cache, without network."""
import pathlib,os,zipfile,shutil,json,hashlib
root=pathlib.Path(__file__).resolve().parents[1]
p=pathlib.Path(os.environ.get('DCPD_DATA_DIR',str(root/'.cache/dcpd')));p.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(root/'data/official_source_html.zip') as z:
 for item in z.infolist():
  if not item.filename.startswith('html/') or '..' in pathlib.PurePosixPath(item.filename).parts:raise ValueError('Unexpected archive member')
 z.extractall(p)
for year in [2025,2026]:shutil.copy2(root/'data'/f'DCPD_{year}_sitemap.xml',p)
provenance=json.loads((root/'data/download_provenance.json').read_text())
for row in provenance:
 f=p/'html'/(row['id']+'.html');assert hashlib.sha256(f.read_bytes()).hexdigest()==row['html_sha256'],row['id']
print(f'Restored and hash-verified {len(provenance)} official source files.')
