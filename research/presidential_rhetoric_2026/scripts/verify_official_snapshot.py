#!/usr/bin/env python3
"""Rebuild the frozen official corpus in a fresh cache with network disabled."""
import hashlib
import json
import os
import pathlib
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[1]
STEPS = ('restore_official_snapshot', 'build_corpus', 'repair_metadata',
         'extract_packets', 'make_compact_packets', 'validate_corpus')


def verify():
    with tempfile.TemporaryDirectory(prefix='rhetoric-snapshot-') as temp:
        base = pathlib.Path(temp)
        blocker = base / 'no_network'
        blocker.mkdir()
        (blocker / 'sitecustomize.py').write_text(
            "import socket, urllib.request\n"
            "def denied(*args, **kwargs):\n"
            "    raise RuntimeError('Network disabled during frozen-snapshot verification')\n"
            "urllib.request.urlopen = denied\n"
            "socket.create_connection = denied\n"
            "socket.socket.connect = denied\n"
            "socket.socket.connect_ex = denied\n")
        cache = base / 'dcpd'
        env = dict(os.environ, DCPD_DATA_DIR=str(cache), PYTHONPATH=str(blocker))
        for step in STEPS:
            result = subprocess.run([sys.executable, str(ROOT / 'scripts' / (step + '.py'))],
                                    cwd=ROOT, env=env, text=True, capture_output=True)
            if result.returncode:
                raise RuntimeError(f'{step} failed:\n{result.stdout}\n{result.stderr}')
            print(f'{step}: passed', flush=True)

        def read_json(path):
            return json.loads(path.read_text())

        for name in ['corpus_manifest.json', 'sitemap_manifest.json']:
            if read_json(cache / name) != read_json(ROOT / 'data' / name):
                raise RuntimeError(f'Frozen manifest differs after reproduction: {name}')
        provenance = read_json(ROOT / 'data/download_provenance.json')
        for row in provenance:
            for folder, suffix, key in [('html', '.html', 'html_sha256'),
                                        ('records', '.json', 'record_sha256')]:
                payload = (cache / folder / (row['id'] + suffix)).read_bytes()
                if hashlib.sha256(payload).hexdigest() != row[key]:
                    raise RuntimeError(f"Frozen {folder} hash mismatch: {row['id']}")
        validation = read_json(cache / 'validation.json')
        for field in ['missing_ids', 'unexpected_ids', 'download_errors',
                      'missing_dates', 'missing_titles']:
            if validation[field]:
                raise RuntimeError(f'Corpus validation failed: {field}')
        if validation['expected_numbered_packages'] != 1828 or validation['downloaded_record_files'] != 1828:
            raise RuntimeError('Frozen official record count changed')
        print('Verified 1,828 HTML hashes, 1,828 parsed-record hashes, both manifests, and corpus validation; no source network reads.')


if __name__ == '__main__':
    verify()
