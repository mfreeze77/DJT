"""Narrow synthetic regression tests. These do not claim possession of raw ICIJ data."""
import importlib.util
from pathlib import Path
import unittest
SPEC = importlib.util.spec_from_file_location('gorlane', Path(__file__).with_name('verify_gorlane_neighborhood.py'))
g = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(g)

class SelectionTests(unittest.TestCase):
    def test_unknown_opposite_endpoint_survives(self):
        rows=[(2,dict(node_id_start='new-neighbor',node_id_end='seed'))]
        self.assertEqual(g.incident_edges(rows,frozenset({'seed'})),rows)
    def test_both_directions(self):
        rows=[(2,dict(node_id_start='seed',node_id_end='a')),(3,dict(node_id_start='b',node_id_end='seed'))]
        self.assertEqual(len(g.incident_edges(rows,frozenset({'seed'}))),2)
    def test_unrelated_edge_excluded(self):
        self.assertFalse(g.incident_edges([(2,dict(node_id_start='x',node_id_end='y'))],frozenset({'seed'})))
    def test_parallel_rows_not_deduplicated(self):
        rows=[(2,dict(node_id_start='s',node_id_end='x',start_date='29-DEC-2011')),(3,dict(node_id_start='s',node_id_end='x',start_date='12-DEC-2012'))]
        self.assertEqual(len(g.incident_edges(rows,frozenset({'s'}))),2)
    def test_all_node_types_hydrate(self):
        rows=[(f'nodes-{k}.csv',[(2,dict(node_id=k,name=k))]) for k in g.NODE_TYPES]
        self.assertEqual(set(g.hydrate(rows,set(g.NODE_TYPES))),set(g.NODE_TYPES))
    def test_missing_endpoint_fails(self):
        with self.assertRaisesRegex(ValueError,'unhydrated'):
            g.hydrate([],{'missing'})
    def test_duplicate_node_id_fails(self):
        with self.assertRaisesRegex(ValueError,'duplicate'):
            g.hydrate([('nodes-entities.csv',[(2,dict(node_id='x'))]),('nodes-officers.csv',[(2,dict(node_id='x'))])],{'x'})
    def test_blank_end_not_invented(self):
        raw=dict(node_id_start='s',node_id_end='x',end_date='')
        self.assertEqual(g.incident_edges([(2,raw)],frozenset({'s'}))[0][1]['end_date'],'')
    def test_address_redacted_but_hash_retained(self):
        raw=dict(node_id='a',address='private street',name='private street',sourceID='Panama Papers')
        out=g.public_node('nodes-addresses.csv',2,raw)
        self.assertNotIn('private street',str(out)); self.assertEqual(out['raw_fields_sha256'],g.row_hash(raw))
    def test_spelling_and_role_change_changes_hash(self):
        self.assertNotEqual(g.row_hash({'link':'shareholder of'}),g.row_hash({'link':'director of'}))
    def test_two_equalchance_ids_remain_scoped(self):
        self.assertTrue({'12099846','12163340'} <= g.SEEDS)
    def test_alias_original_and_former_name_query_terms(self):
        for name in ['Freegain Trading Limited','MIDLAND RESOURCES HOLDING LIMITED','GORLANE BUSINESS INC.']:
            self.assertRegex(name,g.ALIAS_RE)

if __name__ == '__main__':
    unittest.main()
