import os
import json,pathlib,datetime,collections
P=pathlib.Path(os.environ.get('SOCIAL_DATA_DIR', str(pathlib.Path(__file__).resolve().parents[2]/'.cache/social')));P.mkdir(parents=True,exist_ok=True)
r=json.loads((P/'social_normalized.json').read_text());start=datetime.datetime.fromisoformat('2025-01-20T17:00:00+00:00');end=datetime.datetime.fromisoformat('2026-10-12T03:12:00+00:00')
assert len({(x['platform'],x['id'])for x in r})==len(r)
assert all(isinstance(x['id'],str)for x in r)
assert all(start<=datetime.datetime.fromisoformat(x['created_at'].replace('Z','+00:00'))<=end for x in r)
assert all(x['url'].startswith(('https://truthsocial.com/','https://x.com/'))for x in r)
assert all(not x['authored_text_candidate']for x in r if x['repost_flag'])
for k in ['nato','putin','canada_mexico']:
 a=json.loads((P/f'{k}_packets_final.json').read_text());assert all(x['authored_text_candidate'] and not x['repost_flag'] and not x['duplicate_of']for x in a)
manifest=json.loads((P/'portable/social_manifest.json').read_text());assert len(manifest)==len(r);assert all('text'not in x and'authored_text_candidate'not in x for x in manifest)
coded=json.loads((P/'putin_social_coded.json').read_text());screen=json.loads((P/'putin_social_screening.json').read_text());hits=json.loads((P/'putin_all_source_hits.json').read_text());assert {x['id']for x in coded}.isdisjoint({x['id']for x in screen});assert {x['id']for x in coded}|{x['id']for x in screen}=={x['id']for x in hits}
print('PASS: unique string IDs; cutoff; original URLs; repost exclusions; candidate eligibility; text-free portable manifest; complete Putin candidate disposition.')
