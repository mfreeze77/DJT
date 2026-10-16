import importlib.util,pathlib,unittest
s=importlib.util.spec_from_file_location('aggregate',pathlib.Path(__file__).resolve().parents[1]/'scripts'/'aggregate.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class AggregateTest(unittest.TestCase):
 def row(self,id,target,p,n):return dict(channel='official',communication_id=id,target=target,date='2025-01-20',favorable=p,critical=n,comparison_groups=['Allies'])
 def test_union_not_sum(self):
  rows=[self.row('a','France',True,False),self.row('a','Germany',False,True)]
  x=next(x for x in m.aggregate(rows) if x['target']=='Allies');self.assertEqual(x['mention_communications'],1);self.assertEqual(x['mixed'],1)
 def test_partition(self):
  rows=[self.row('a','Putin',True,False),self.row('b','Putin',False,True),self.row('c','Putin',True,True),self.row('d','Putin',False,False)]
  x=next(x for x in m.aggregate(rows) if x['target']=='Putin');self.assertEqual([x[k] for k in ['favorable_only','critical_only','mixed','neutral']],[1,1,1,1]);self.assertEqual(x['any_favorable'],2)
 def test_exclusion(self):
  r=self.row('a','Putin',True,False);r['included']=False;self.assertEqual(m.aggregate([r]),[])
 def test_union_unknown_stays_unknown(self):
  a=self.row('a','France',False,False);a['strict_praise']=False
  b=self.row('a','Germany',False,False);b['strict_praise']=None
  x=next(x for x in m.aggregate([a,b]) if x['target']=='Allies');self.assertIsNone(x['strict_praise']);self.assertEqual(x['strict_praise_annotation_coverage'],0)
 def test_union_true_resolves_unknown(self):
  a=self.row('a','France',True,False);a['strict_praise']=True
  b=self.row('a','Germany',False,False);b['strict_praise']=None
  x=next(x for x in m.aggregate([a,b]) if x['target']=='Allies');self.assertEqual(x['strict_praise'],1)
 def test_channels_separate(self):
  a=self.row('a','Putin',True,False);b=dict(a,channel='social');self.assertEqual(len([r for r in m.aggregate([a,b]) if r['target']=='Putin']),2)
if __name__=='__main__':unittest.main()
