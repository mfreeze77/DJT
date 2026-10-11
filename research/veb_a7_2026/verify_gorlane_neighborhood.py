#!/usr/bin/env python3
"""Read-only parity check for the scoped Gorlane review, not financial authentication.

python verify_gorlane_neighborhood.py /path/to/extracted/full-oldb
The six exact snapshot members are required. CSV locators count records, header=1.
No network requests, graph expansion beyond the explicit seeds, or file writes.
"""
from __future__ import annotations
import argparse
import csv
import hashlib
import json
import re
from pathlib import Path
from typing import Iterable

HERE = Path(__file__).resolve().parent
SEEDS = frozenset('10210594 12155628 10088926 12141123 12159818 12163340 12167368 12205452 12121184 12146270 12099846 10173628 12133896 20025856 11003807'.split())
ALIAS_PATTERN = r'GORLANE|MIDLAND\s+RESOURCES\s+HOLDING|BELEGO|PARBORIO|EQUALCHANCE|SILENI|ATINIA|QUINIRA|FREEGAIN|EASTRADE|FIDUSERVE|ETMOR|GLOBAL\s+STEEL\s+INVESTMENTS'
ALIAS_RE = re.compile(ALIAS_PATTERN, re.I)
NODE_TYPES = ('addresses', 'entities', 'intermediaries', 'officers', 'others')


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def row_hash(row: dict[str, str]) -> str:
    """Hash canonical raw field values, NOT original CSV bytes or source truth."""
    return hashlib.sha256(json.dumps(row, ensure_ascii=False, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def records(path: Path) -> Iterable[tuple[int, dict[str, str]]]:
    with path.open(newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for locator, row in enumerate(reader, 2):
            require(None not in row and None not in row.values(), f'{path.name}:{locator}: malformed CSV')
            yield locator, row


def incident_edges(rows: Iterable[tuple[int, dict[str, str]]], seeds: frozenset[str]) -> list[tuple[int, dict[str, str]]]:
    # Crucial: OR, not AND. An unknown opposite endpoint must survive selection.
    return [(n, r) for n, r in rows if r['node_id_start'] in seeds or r['node_id_end'] in seeds]


def hydrate(rows_by_member: Iterable[tuple[str, Iterable[tuple[int, dict[str, str]]]]], endpoints: set[str]):
    out: dict[str, tuple[str, int, dict[str, str]]] = {}
    for member, rows in rows_by_member:
        for n, r in rows:
            if r['node_id'] in endpoints:
                require(r['node_id'] not in out, f'duplicate node id across members: {r["node_id"]}')
                out[r['node_id']] = (member, n, r)
    require(set(out) == endpoints, f'unhydrated endpoints: {sorted(endpoints-set(out))}')
    return out


def public_node(member: str, locator: int, raw: dict[str, str]) -> dict[str, str]:
    kind = member.removeprefix('nodes-').removesuffix('.csv')
    display = raw.get('name', '') if kind != 'addresses' else '[address withheld; raw node retained]'
    return dict(node_id=raw['node_id'], node_type=kind, name=display,
        original_name=raw.get('original_name', '') if kind != 'addresses' else '',
        former_name=raw.get('former_name', '') if kind != 'addresses' else '',
        jurisdiction=raw.get('jurisdiction', ''), countries=raw.get('countries', ''),
        registration_identifier=raw.get('ibcRUC', ''), incorporation_date=raw.get('incorporation_date', ''),
        inactivation_date=raw.get('inactivation_date', ''), struck_off_date=raw.get('struck_off_date', ''),
        historical_status=raw.get('status', ''), source_dataset=raw.get('sourceID', ''),
        valid_until=raw.get('valid_until', ''), csv_member=member, csv_row=str(locator),
        raw_fields_sha256=row_hash(raw), source_id='S59', automatic_merge='no',
        address_redaction='all street-address fields omitted; raw bytes external')


def collect(raw_dir: Path):
    edges = incident_edges(records(raw_dir/'relationships.csv'), SEEDS)
    endpoints = set(SEEDS) | {r[k] for _, r in edges for k in ('node_id_start','node_id_end')}
    aliases = []
    nodes = {}
    counts = {}
    for kind in NODE_TYPES:
        member = f'nodes-{kind}.csv'
        count = 0
        for n, raw in records(raw_dir/member):
            count += 1
            nid = raw['node_id']
            if nid in endpoints:
                require(nid not in nodes, f'duplicate node: {nid}')
                nodes[nid] = (member, n, raw)
            matched = [k for k in ('name','original_name','former_name') if raw.get(k) and ALIAS_RE.search(raw[k])]
            if matched:
                aliases.append((member, n, raw, matched))
        counts[member] = count
    require(set(nodes) == endpoints, f'unhydrated endpoints: {sorted(endpoints-set(nodes))}')
    return edges, nodes, aliases, counts


def verify(raw_dir: Path, review_dir: Path = HERE) -> dict:
    audit = json.loads((review_dir/'offshore_export_audit.json').read_text())
    for m in audit['members']:
        require(Path(m['file']).name == m['file'], 'unsafe member name')
        path = raw_dir/m['file']
        require(path.is_file(), f'missing member: {path}')
        require(file_hash(path) == m['sha256'], f'snapshot hash mismatch: {m["file"]}')
        with path.open(newline='', encoding='utf-8-sig') as f:
            require(next(csv.reader(f)) == m['headers'], f'schema mismatch: {m["file"]}')
    edges, nodes, aliases, counts = collect(raw_dir)
    expected_edges = {r['csv_row']: r for _,r in records(review_dir/'gorlane_neighborhood_relationships.csv')}
    require(len(expected_edges) == len(edges), 'incident-edge selection incomplete or extra records')
    for locator, raw in edges:
        expected = expected_edges.get(str(locator))
        require(expected is not None, f'missing incident relationship {locator}')
        for field, value in raw.items():
            require(expected[field] == value, f'relationship {locator}:{field}: raw value changed')
        require(expected['raw_fields_sha256'] == row_hash(raw), f'relationship {locator}: canonical row hash mismatch')
    expected_nodes = {r['node_id']: r for _,r in records(review_dir/'gorlane_neighborhood_nodes.csv')}
    require(set(expected_nodes) == set(nodes), 'endpoint hydration selection differs')
    for nid,(member,locator,raw) in nodes.items():
        require(expected_nodes[nid] == public_node(member, locator, raw), f'node parity/redaction differs: {nid}')
    expected_aliases = {r['node_id']: r for _,r in records(review_dir/'gorlane_alias_review.csv')}
    require(set(expected_aliases) == {raw['node_id'] for _,_,raw,_ in aliases}, 'alias selection differs')
    for member,n,raw,matched in aliases:
        r=expected_aliases[raw['node_id']]
        require(r['csv_member']==member and r['csv_row']==str(n), 'alias locator drift')
        require(r['raw_fields_sha256']==row_hash(raw), 'alias raw-field hash drift')
        require(r['matched_fields']==';'.join(matched), 'alias field selection drift')
        require(r['decision'] and r['reason'] and r['automatic_merge']=='no', 'alias missing reviewed decision')
    for m in audit['members']:
        if m['file'] in counts:
            require(counts[m['file']] == m['rows'], f'row count drift: {m["file"]}')
    return dict(snapshot_members_verified=6, scoped_seeds=len(SEEDS), incident_relationships=len(edges),
        hydrated_nodes=len(nodes), alias_candidates=len(aliases), missing_endpoints=0,
        meaning='Raw-byte and selection parity only; not legal identity, payment, authenticity or wrongdoing')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('raw_directory', type=Path)
    args = parser.parse_args()
    print(json.dumps(verify(args.raw_directory), indent=2))

if __name__ == '__main__':
    main()
