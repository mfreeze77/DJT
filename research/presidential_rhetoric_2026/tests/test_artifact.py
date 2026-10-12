import json,pathlib,unittest,re
R=pathlib.Path(__file__).resolve().parents[1]
class ArtifactTest(unittest.TestCase):
 def test_source_counts(self):
  a=json.loads((R/'data/corpus_manifest.json').read_text());self.assertEqual(len(a),1828);self.assertEqual(len({r['id'] for r in a}),1828)
 def test_annotations(self):
  p=R/'data/annotations.json'
  if not p.exists():self.skipTest('Annotations not assembled yet')
  a=json.loads(p.read_text());ids={r['id'] for r in json.loads((R/'data/corpus_manifest.json').read_text())}
  for r in a:
   self.assertIsInstance(r['communication_id'],str);self.assertRegex(r['date'],r'^202[56]-\d\d-\d\d$');self.assertTrue(r['url'].startswith('https://'));self.assertIsInstance(r['favorable'],bool);self.assertIsInstance(r['critical'],bool)
   if r['channel']=='official':self.assertIn(r['communication_id'],ids)
   self.assertEqual(r['review_method'],'AI semantic review; not human validation')
 def test_portable_components(self):
  for p in (R/'data/components').glob('*.json'):
   a=json.loads(p.read_text())
   for r in a:self.assertNotIn('text_path',r);self.assertNotIn('target_contexts',r);self.assertNotIn('text',r)
 def test_social_ids_are_strings(self):
  a=json.loads((R/'data/social_manifest.json').read_text())
  if isinstance(a,dict):a=a.get('records',a.get('posts',[]))
  self.assertEqual(len(a),12998)
  self.assertTrue(all(isinstance(r['id'],str) for r in a))
if __name__=='__main__':unittest.main()
