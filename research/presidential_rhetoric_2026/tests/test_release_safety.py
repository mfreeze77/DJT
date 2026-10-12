"""Release integrity and fail-closed regression checks; no network required."""
import collections
import hashlib
import importlib.util
import json
import pathlib
import re
import subprocess
import sys
import tempfile
import unittest
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('release_aggregate', ROOT / 'scripts/aggregate.py')
aggregate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aggregate)


class ComparisonReleaseGateTest(unittest.TestCase):
    def row(self, status=aggregate.FINAL_COMPARISON_STATUS):
        return dict(communication_id='synthetic', channel='official', target='Example',
                    date='2026-10-01', favorable=False, critical=True,
                    interpretation_status=status)

    def run_cli(self, rows, *args):
        with tempfile.TemporaryDirectory() as tmp:
            base = pathlib.Path(tmp)
            input_file = base / 'input.json'
            input_file.write_text(json.dumps(rows))
            output = base / 'output'
            proc = subprocess.run([sys.executable, str(ROOT / 'scripts/aggregate.py'),
                                   '--input', str(input_file), '--out', str(output), *args],
                                  capture_output=True, text=True, check=False)
            generated = sorted(p.name for p in output.glob('*'))
            return proc, generated

    def assert_blocked(self, rows, *args):
        proc, generated = self.run_cli(rows, *args)
        self.assertNotEqual(proc.returncode, 0)
        self.assertIn('Blocked:', proc.stderr)
        self.assertEqual(generated, [])

    def test_first_pass_blocks_output(self):
        self.assert_blocked([self.row('FIRST_PASS; withdrawn/asymmetric')])

    def test_excluded_first_pass_still_blocks(self):
        withheld = dict(self.row('FIRST_PASS'), included=False)
        self.assert_blocked([self.row(), withheld])

    def test_date_filter_cannot_hide_first_pass(self):
        reviewed = dict(self.row(), date='2025-01-20')
        self.assert_blocked([reviewed, self.row('FIRST_PASS')], '--through', '2026-09-11')

    def test_missing_unknown_and_empty_statuses_block(self):
        missing = self.row()
        del missing['interpretation_status']
        for rows in [[missing], [self.row(None)], [self.row('REVIEWED')],
                     [self.row('')], []]:
            with self.subTest(rows=rows):
                self.assert_blocked(rows)

    def test_explicitly_reviewed_synthetic_input_runs(self):
        proc, generated = self.run_cli([self.row()])
        self.assertEqual(proc.returncode, 0, proc.stderr)
        self.assertEqual(generated, ['comparison.csv', 'comparison.json'])

    def test_distributed_annotations_remain_withheld(self):
        rows = json.loads((ROOT / 'data/annotations.json').read_text())
        self.assertTrue(rows)
        self.assertTrue(all('FIRST_PASS' in r.get('interpretation_status', '') for r in rows))
        with self.assertRaises(SystemExit):
            aggregate.require_reviewed_comparison(rows)


class SourceIntegrityTest(unittest.TestCase):
    def test_reclassification_accounts_for_all_original_negative_candidates(self):
        directory = ROOT / 'data/review_revisions'
        first = json.loads((directory / 'putin_reaudit_first38.json').read_text())['rows']
        second = json.loads((directory / 'putin_reaudit_second38.json').read_text())
        original = json.loads((ROOT / 'data/components/putin.json').read_text())
        original_ids = {r['id'] for r in original if r['negative']}
        revised_ids = [r['id'] for r in first + second]
        self.assertEqual(len(original_ids), 76)
        self.assertEqual(len(revised_ids), len(set(revised_ids)))
        self.assertEqual(set(revised_ids), original_ids)
        clear = sum(r['clear_negative_judgment_of_putin_or_his_conduct'] for r in first)
        clear += sum(r['clear_personal_negative_evaluation'] is True for r in second)
        contextual = sum(r['contextual_conduct_criticism_only'] for r in first)
        contextual += sum(r['clear_personal_negative_evaluation'] is None for r in second)
        self.assertEqual((clear, contextual, len(revised_ids) - clear - contextual), (42, 8, 26))

    def test_official_zip_has_exact_safe_members_and_hashes(self):
        provenance = json.loads((ROOT / 'data/download_provenance.json').read_text())
        by_name = {'html/' + r['id'] + '.html': r for r in provenance}
        self.assertEqual(len(by_name), 1828)
        with zipfile.ZipFile(ROOT / 'data/official_source_html.zip') as archive:
            self.assertEqual(len(archive.namelist()), len(by_name))
            self.assertEqual(set(archive.namelist()), set(by_name))
            for name, row in by_name.items():
                self.assertRegex(name, r'^html/DCPD-\d{9}\.html$')
                payload = archive.read(name)
                self.assertEqual(len(payload), row['html_bytes'], name)
                self.assertEqual(hashlib.sha256(payload).hexdigest(), row['html_sha256'], name)

    def test_official_manifest_denominators_and_links(self):
        rows = json.loads((ROOT / 'data/corpus_manifest.json').read_text())
        candidates = [r for r in rows if r['eligible']]
        self.assertEqual(len(candidates), 1051)
        self.assertEqual(collections.Counter(r['document_type'] for r in candidates),
                         {'oral': 729, 'written_statement': 322})
        self.assertEqual(sum(r['analysis_base_eligible'] for r in rows), 981)
        self.assertEqual(sum(r['selection_reason'] == 'other_president' for r in rows), 102)
        self.assertEqual(max(r['date'] for r in candidates), '2026-09-11')
        for row in rows:
            expected = f"https://www.govinfo.gov/content/pkg/{row['id']}/html/{row['id']}.htm"
            self.assertEqual(row['url'], expected)

    def test_social_manifest_has_no_payload_fields(self):
        rows = json.loads((ROOT / 'data/social_manifest.json').read_text())
        self.assertEqual(len(rows), len({(r['platform'], r['id']) for r in rows}))
        self.assertEqual(collections.Counter(r['platform'] for r in rows),
                         {'Truth Social': 12855, 'X': 143})
        self.assertEqual(sum(r['type'] == 'media_only' for r in rows), 3723)
        forbidden = {'text', 'post_text', 'html', 'raw', 'authored_text_candidate',
                     'media_urls', 'media_archive_screenshot', 'archive_editorial_text',
                     'text_path', 'cache_path', 'local_path'}
        for row in rows:
            self.assertFalse(forbidden.intersection(row), row['id'])
            self.assertIsInstance(row['id'], str)
            self.assertIn(row['id'], row['url'])

    def test_portable_text_avoids_local_paths_and_common_secrets(self):
        paths = [ROOT / 'README.md']
        for folder in ['data', 'docs']:
            paths.extend(p for p in (ROOT / folder).rglob('*')
                         if p.is_file() and p.suffix in {'.json', '.csv', '.md', '.txt', '.xml'})
        pattern = re.compile(r'/workspace/|/tmp/|/home/|/root/|AKIA[0-9A-Z]{16}|'
                             r'gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY')
        for path in paths:
            self.assertIsNone(pattern.search(path.read_text()), str(path.relative_to(ROOT)))


if __name__ == '__main__':
    unittest.main()
