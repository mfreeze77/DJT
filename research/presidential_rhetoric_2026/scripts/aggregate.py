#!/usr/bin/env python3
"""Aggregate already-reviewed annotations; never infer sentiment from keywords."""
import argparse,csv,json,pathlib,collections

# Promotion to this status requires a completed, symmetric source-context review.
# Missing, unknown and first-pass statuses are deliberately not publishable.
FINAL_COMPARISON_STATUS = 'REVIEWED_SYMMETRIC_COMPARISON'

def require_reviewed_comparison(rows):
    if not rows or any(r.get('interpretation_status') != FINAL_COMPARISON_STATUS for r in rows):
        raise SystemExit('Blocked: comparison annotations have not been explicitly approved as REVIEWED_SYMMETRIC_COMPARISON. First-pass, missing and unknown statuses cannot generate comparison tables. Consult the correction log and revision ledgers.')

def aggregate(rows):
    # An individual communication may name many allied targets. Union flags before counting.
    units={}
    for row in rows:
        if not row.get('included',True): continue
        groups=[row['target']]+row.get('comparison_groups',[])
        for target in set(groups):
            key=(row['channel'],target,row['communication_id'])
            unit=units.setdefault(key,{'favorable':False,'critical':False,'personal_appraisal':False,'strict_praise':False,'communication_quality':False,'date':row['date'],'personal_reviewed':True,'strict_reviewed':True,'insult':False,'coercive':False,'sovereignty':False})
            tags=set(row.get('negative_subtypes',[]))
            unit['insult'] |= bool(row.get('critical')) and bool(tags & {'personal','personal_insult','insult'})
            unit['coercive'] |= bool(row.get('critical')) and bool(tags & {'coercive','coercive_threat'})
            unit['sovereignty'] |= bool(row.get('critical')) and 'sovereignty' in tags
            unit['personal_reviewed'] &= row.get('personal_appraisal') is not None
            unit['strict_reviewed'] &= row.get('strict_praise') is not None
            for flag in ['favorable','critical','personal_appraisal','strict_praise','communication_quality']:
                unit[flag]|=bool(row.get(flag,False))
    result=[]
    tables=collections.defaultdict(list)
    for (channel,target,_),unit in units.items():
        unit['personal_reviewed'] |= unit['personal_appraisal']
        unit['strict_reviewed'] |= unit['strict_praise']
        tables[channel,target].append(unit)
    for (channel,target),values in sorted(tables.items()):
        n=len(values);p=sum(v['favorable'] for v in values);q=sum(v['critical'] for v in values);both=sum(v['favorable'] and v['critical'] for v in values)
        result.append(dict(channel=channel,target=target,mention_communications=n,favorable_only=p-both,critical_only=q-both,mixed=both,neutral=n-p-q+both,any_favorable=p,any_critical=q,favorable_percent=round(100*p/n,2),critical_percent=round(100*q/n,2),personal_appraisal=sum(v['personal_appraisal'] for v in values) if all(v['personal_reviewed'] for v in values) else None,personal_appraisal_annotation_coverage=sum(v['personal_reviewed'] for v in values),strict_praise=sum(v['strict_praise'] for v in values) if all(v['strict_reviewed'] for v in values) else None,strict_praise_annotation_coverage=sum(v['strict_reviewed'] for v in values),communication_quality=sum(v['communication_quality'] for v in values),insult_tagged_communications=sum(v['insult'] for v in values),coercive_tagged_communications=sum(v['coercive'] for v in values),sovereignty_tagged_communications=sum(v['sovereignty'] for v in values),first_date=min(v['date'] for v in values),last_date=max(v['date'] for v in values)))
    return result

def main():
    p=argparse.ArgumentParser();p.add_argument('--input',type=pathlib.Path,default=pathlib.Path(__file__).resolve().parents[1]/'data'/'annotations.json');p.add_argument('--out',type=pathlib.Path,default=pathlib.Path(__file__).resolve().parents[1]/'results');p.add_argument('--through',default=None);a=p.parse_args()
    rows=json.loads(a.input.read_text());
    require_reviewed_comparison(rows)
    rows=[r for r in rows if not a.through or r['date']<=a.through]
    out=aggregate(rows);a.out.mkdir(parents=True,exist_ok=True);(a.out/'comparison.json').write_text(json.dumps(out,indent=2,ensure_ascii=False))
    if out:
        with (a.out/'comparison.csv').open('w',newline='') as f:
            w=csv.DictWriter(f,fieldnames=out[0]);w.writeheader();w.writerows(out)
    print(f'{len(rows)} annotation rows -> {len(out)} target/channel summaries')
if __name__=='__main__':main()
