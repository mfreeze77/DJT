"""Integrity checks for the separate draft comparison; preserve the old release gate."""
import hashlib
import json
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1] / 'comparisons/2026-10-16'


class CumulativeComparisonTest(unittest.TestCase):
    def test_complete_file_manifest(self):
        manifest = json.loads((ROOT / 'SHA256SUMS.json').read_text())
        files = {str(p.relative_to(ROOT)) for p in ROOT.rglob('*')
                 if p.is_file() and p.name != 'SHA256SUMS.json' and '__pycache__' not in p.parts}
        self.assertEqual(set(manifest), files)
        for name, digest in manifest.items():
            self.assertEqual(hashlib.sha256((ROOT / name).read_bytes()).hexdigest(), digest, name)

    def test_no_duplicate_corpus(self):
        self.assertFalse((ROOT / 'data/eligible_corpus.json').exists())
        self.assertIn('--corpus', (ROOT / 'README.md').read_text())

    def test_main_defense_counts_and_nato_correction(self):
        targets = {r['target']: r['counts'] for r in
                   json.loads((ROOT / 'data/category_membership.json').read_text())['targets']}
        self.assertEqual({k: v['defense_or_excuse'] for k, v in targets.items()}, {
            'Vladimir Putin': 26, 'Kim Jong Un': 2, 'Mohammed bin Salman': 2,
            'Trudeau': 0, 'Carney': 0, 'Sheinbaum': 0, 'NATO institution': 5})
        nato = targets['NATO institution']
        self.assertEqual((nato['character_or_conduct_praise_union'],
                          nato['broad_favorable_union'],
                          nato['clear_personal_or_conduct_negative'],
                          nato['communication_quality']), (32, 41, 81, 15))

    def test_later_context_is_separate_from_cumulative_counts(self):
        report = (ROOT / 'docs/OCTOBER_MATCHED_WAR_CONTEXT.md').read_text()
        self.assertIn('one shared episode', report)
        self.assertIn('not necessarily that exact individual strike', report)
        self.assertIn('No stable primary transcript', report)
        self.assertIn('outside the frozen official corpus', (ROOT / 'REPORT.md').read_text())
        self.assertIn('does not alter any coded record', (ROOT / 'README.md').read_text())

    def test_portable_context_and_correction_history(self):
        pattern = re.compile(r'/workspace/|/tmp/|/home/|/root/|AKIA[0-9A-Z]{16}|'
                             r'gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY')
        for p in ROOT.rglob('*'):
            if p.is_file() and p.suffix in {'.json', '.md', '.csv'}:
                self.assertIsNone(pattern.search(p.read_text()), str(p.relative_to(ROOT)))
        self.assertTrue((ROOT / 'docs/archive_CORRECTION_LOG.md').is_file())
        self.assertTrue((ROOT / 'docs/COMPARISON_CORRECTIONS.md').is_file())


if __name__ == '__main__':
    unittest.main()
