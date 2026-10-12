import collections
import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]
REVISIONS = ROOT / 'data' / 'review_revisions'


class RevisionIntegrityTest(unittest.TestCase):
    def test_positive_review_preserves_all_candidate_ids(self):
        original = json.loads((ROOT / 'data/components/putin.json').read_text())
        reviewed = json.loads((REVISIONS / 'putin_positive_reaudit_combined.json').read_text())
        self.assertEqual(len(reviewed), 243)
        self.assertEqual(len({row['id'] for row in reviewed}), 243)
        self.assertEqual({row['id'] for row in original}, {row['id'] for row in reviewed})

    def test_negative_unknowns_are_not_silently_zero(self):
        reviewed = json.loads((REVISIONS / 'putin_negative_reaudit_revised_combined.json').read_text())['rows']
        self.assertEqual(len(reviewed), 243)
        self.assertEqual(len({row['id'] for row in reviewed}), 243)
        self.assertEqual(collections.Counter(row['tier'] for row in reviewed),
                         {None: 133, 'clear': 57, 'contextual': 13, 'separate': 40})
        for row in reviewed:
            if row['tier'] is None:
                self.assertEqual(row['negative_adjudication_status'],
                                 'not_selected_for_separate_negative_adjudication')

    def test_new_candidate_accounting(self):
        rows = json.loads((REVISIONS / 'new_negative_adjudication.json').read_text())['rows']
        self.assertEqual(len(rows), 34)
        self.assertEqual(collections.Counter(row['tier'] for row in rows),
                         {'clear': 14, 'contextual': 5, 'separate': 15})


if __name__ == '__main__':
    unittest.main()
