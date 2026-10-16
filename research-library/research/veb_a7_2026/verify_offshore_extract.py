#!/usr/bin/env python3
"""Verify the published small extracts against an already acquired ICIJ CSV snapshot.

Usage: python verify_offshore_extract.py /path/to/extracted/full-oldb
No downloads, writes, identity inference or confidential-record access are performed.
CSV row numbers count records with the header as record1 (not physical text lines).
"""
from __future__ import annotations
import argparse
import csv
import hashlib
import json
from pathlib import Path


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('raw_directory', type=Path)
    args = parser.parse_args()
    here = Path(__file__).resolve().parent
    audit = json.loads((here / 'offshore_export_audit.json').read_text())
    expected: dict[str, dict[int, dict[str, str]]] = {}
    for name in ['offshore_node_review.csv', 'offshore_relationship_review.csv']:
        with (here / name).open(newline='', encoding='utf-8') as stream:
            for row in csv.DictReader(stream):
                expected.setdefault(row['csv_member'], {})[int(row['csv_row'])] = row
    checked = 0
    for member in audit['members']:
        name = member['file']
        require(Path(name).name == name, 'unsafe member path')
        path = args.raw_directory / name
        require(path.is_file(), f'missing {name}')
        require(sha256(path) == member['sha256'], f'{name}: snapshot hash mismatch')
        rows = 0
        with path.open(newline='', encoding='utf-8-sig') as stream:
            reader = csv.DictReader(stream)
            require(reader.fieldnames == member['headers'], f'{name}: schema mismatch')
            for number, actual in enumerate(reader, 2):
                rows += 1
                wanted = expected.get(name, {}).get(number)
                if wanted is None:
                    continue
                if name == 'relationships.csv':
                    mapping = {'node_id_start':'node_id_start', 'node_id_end':'node_id_end',
                               'relationship':'rel_type', 'link':'link', 'start_date':'start_date',
                               'end_date':'end_date', 'source_dataset':'sourceID'}
                else:
                    mapping = {'node_id':'node_id', 'source_dataset':'sourceID',
                               'incorporation_date':'incorporation_date',
                               'registration_identifier':'ibcRUC'}
                    if wanted['node_type'] != 'addresses':
                        mapping['name'] = 'name'
                for key, raw_key in mapping.items():
                    require(wanted[key] == actual.get(raw_key, ''), f'{name}:{number}:{key} mismatch')
                checked += 1
        require(rows == member['rows'], f'{name}: record-count mismatch')
    require(checked == sum(len(x) for x in expected.values()), 'not all referenced records verified')
    print(json.dumps({'members_verified': len(audit['members']), 'selected_records_verified': checked,
                      'meaning': 'byte/row parity only; not authenticity or illegality'}, indent=2))


if __name__ == '__main__':
    main()
