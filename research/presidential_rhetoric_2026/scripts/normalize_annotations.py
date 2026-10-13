"""Normalize reviewed component annotations; original component records remain auditable."""
import json,pathlib,argparse,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
ALIASES={'King Charles III':'Charles III','Pedro Sanchez':'Pedro Sánchez','Putin_personal':'Vladimir Putin','Carney':'Mark Carney','Trudeau':'Justin Trudeau','Sheinbaum':'Claudia Sheinbaum','EU':'European Union','Europe (unspecified)':'Europe','UK':'United Kingdom','Macron':'Emmanuel Macron','Starmer':'Keir Starmer','Merz':'Friedrich Merz','Meloni':'Giorgia Meloni','Stubb':'Alexander Stubb','Rutte':'Mark Rutte','Von der Leyen':'Ursula von der Leyen','Erdogan':'Recep Tayyip Erdoğan','Recep Tayyip Erdogan':'Recep Tayyip Erdoğan','Orban':'Viktor Orbán','Viktor Orban':'Viktor Orbán','Nawrocki':'Karol Nawrocki','Babis':'Andrej Babiš','Macinka':'Petr Macinka','Radev':'Rumen Radev','Swinney':'John Swinney','Burnham':'Andy Burnham','Le Pen':'Marine Le Pen'}
COUNTRIES={'Albania','Belgium','Bulgaria','Croatia','Czechia','Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Iceland','Italy','Latvia','Lithuania','Luxembourg','Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden','Turkey','United Kingdom'}
PERSON_COUNTRY={'Emmanuel Macron':'France','Brigitte Macron':'France','Marine Le Pen':'France','Keir Starmer':'United Kingdom','Andy Burnham':'United Kingdom','John Swinney':'United Kingdom','Charles III':'United Kingdom','UK monarchs':'United Kingdom','Friedrich Merz':'Germany','Giorgia Meloni':'Italy','Alexander Stubb':'Finland','Recep Tayyip Erdoğan':'Turkey','Viktor Orbán':'Hungary','Karol Nawrocki':'Poland','Andrej Babiš':'Czechia','Petr Macinka':'Czechia','Rumen Radev':'Bulgaria','Harald V':'Norway','Dutch monarchs':'Netherlands','Mark Carney':'Canada','Justin Trudeau':'Canada','Claudia Sheinbaum':'Mexico'}

def listish(x):
 if isinstance(x,list):return x
 return [v for v in re.split(r'[;,]',x or '') if v]
def normalize(r,channel,component,official):
 id=r.get('id',r.get('document_id'));target=ALIASES.get(r['target'],r['target']);country=r.get('country') or PERSON_COUNTRY.get(target,'')
 if target in COUNTRIES|{'Canada','Mexico'}:country=target
 if target=='Greenland':country='Denmark'
 role=r.get('target_type') or ('country' if target in COUNTRIES|{'Canada','Mexico'} else 'territory' if target=='Greenland' else 'institution' if target=='NATO' else 'institution_non_nato' if target=='European Union' else 'regional_collective' if target in ['Europe','European allies'] else 'individual')
 role_overrides={'Brigitte Macron':'leader_spouse','Marine Le Pen':'opposition_politician','Nigel Farage':'opposition_politician','Santiago Abascal':'opposition_politician','Angela Merkel':'former_government_leader','Charles III':'monarch','Harald V':'monarch','UK monarchs':'monarchs','Dutch monarchs':'monarchs','William, Prince of Wales':'royal','Mark Rutte':'alliance_secretary_general','Ursula von der Leyen':'supranational_executive'}
 role=role_overrides.get(target,role)
 groups=[]
 if country in ['Canada','Mexico']:groups.append(country+' — country and leaders')
 if country in COUNTRIES or target=='European allies':groups.append('European NATO allies — country and people')
 if role=='country' and country in COUNTRIES:groups.append('European NATO allies — countries only')
 if role in {'individual','leader_spouse','opposition_politician','former_government_leader','monarch','monarchs','royal','subnational_leader','former_leader','monarch_spouse','royal_consort','subnational_official'} and country in COUNTRIES:groups.append('European NATO allies — named people')
 code=r.get('code');positive=bool(r.get('positive',r.get('praise',code in ['P','M'])));negative=bool(r.get('negative',r.get('criticism',code in ['N','M'])))
 quality=bool(r.get('communication_quality_positive',r.get('communication_quality',False)) or r.get('communication_quality_only',False))
 deal=bool(r.get('deal_appraisal_positive',False) or r.get('deal_outcome_only',False))
 tags=listish(r.get('positive_subtypes'))+listish(r.get('praise_subtypes'))+listish(r.get('praise_tags'))+listish(r.get('tags'))+listish(r.get('context_tag'))
 included=code not in ['X','E'] and not r.get('historical_commemoration',False) and role!='historical_leader'
 if channel=='official':
  if id not in official:raise ValueError('Unknown official source ID: '+id)
  included &= bool(official[id].get('analysis_base_eligible',False))
 else:included &= bool(r.get('included_in_social_comparison',True)) and not bool(r.get('duplicate_of'))
 ev=r.get('evidence') or ' | '.join(r.get('positive_quotes',[])+r.get('negative_quotes',[]))
 # No automated sentiment inference: narrower flags come only from reviewers.
 personal=r.get('praise_or_affinity',r.get('personal_praise_or_affinity',r.get('current_appraisal_positive')))
 strict=r.get('explicit_praise',r.get('strict_praise',r.get('strict_positive')))
 return dict(interpretation_status=r.get("interpretation_status","FIRST_PASS; consult revision ledgers"),communication_id=id,channel=channel,date=r['date'],target=target,target_role=role,country=country,comparison_groups=groups,included=included,favorable=positive or quality or deal,actor_positive=positive,critical=negative,personal_appraisal=personal,strict_praise=strict,communication_quality=quality,communication_quality_undercut=bool(r.get('communication_quality_undercut',False)),deal_appraisal=deal,praise_subtypes=sorted(set(tags)),negative_subtypes=listish(r.get('negative_severity'))+listish(r.get('severity_tags'))+listish(r.get('criticism_severity'))+[t for t in listish(r.get('tags')) if t in {'policy_grievance','substantive_condemnation','coercive_threat','competence_criticism','insult','mild_disagreement','personal_insult'}],evidence=ev,url=r['url'],note=r.get('note',r.get('notes','')),review_method='AI semantic review; not human validation',component=component)

def main():
 p=argparse.ArgumentParser();p.add_argument('--components',type=pathlib.Path,default=ROOT/'data/components');a=p.parse_args()
 official={r['id']:r for r in json.loads((ROOT/'data/corpus_manifest.json').read_text())};out=[]
 sources={'putin.json':'official','nato_coded.json':'official','nato_late2025_coded.json':'official','nato_2026_coded.json':'official','canada_mexico_coded.json':'official','putin_social_coded.json':'social','nato_social_standardized.json':'social','canada_mexico_social_coded.json':'social'}
 for filename,channel in sources.items():
  f=a.components/filename
  if not f.exists():raise FileNotFoundError('Required completed component: '+str(f))
  for r in json.loads(f.read_text()):out.append(normalize(r,channel,filename,official))
 # Multiple independently coded rows may cover one document/target; aggregator unions them.
 (ROOT/'data/annotations.json').write_text(json.dumps(out,indent=2,ensure_ascii=False));print(len(out),'normalized rows')
if __name__=='__main__':main()
