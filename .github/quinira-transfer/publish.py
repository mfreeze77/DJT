"""One-time, hash-locked publication to PR29 only; no evidence acquisition."""
from pathlib import Path
import datetime
import hashlib
import json
import lzma
import os
import subprocess
import sys
import tempfile

BRANCH = 'research/gorlane-financing-quinira-20261011'
BASE = 'ec885204d70c64fb898c7de07743eb17de30d692'
EXPECTED_TREE = 'e0e31ff016206a2b3c779d556717fc218b41b96b'
PAYLOAD_SHA = '65fae03a737b2d5302e4fd6d75112bc29c49da276a6a0a7c72ec422a1a905f60'
PATCH_SHA = '968dae02aa808bfc26d3e169125b75ffe31d48791cc83d242b1ba1089c9f028b'
R = 'research/veb_a7_2026/'


def require(ok, message):
    if not ok:
        raise RuntimeError(message)


def git(*args, cwd=None):
    return subprocess.check_output(['git', *args], cwd=cwd, text=True).strip()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def snapshot():
    return {p: digest(Path(p).read_bytes()) for p in git('ls-files', '-z').split('\0') if p and Path(p).is_file()}


def main():
    dry = sys.argv[1:] == ['--dry-run']
    require(dry or not sys.argv[1:], 'Unexpected arguments')
    if not dry:
        require(os.environ.get('GITHUB_REPOSITORY') == 'mfreeze77/DJT', 'Wrong repository')
        require(os.environ.get('GITHUB_HEAD_REF') == BRANCH, 'Wrong branch')
        event = json.loads(Path(os.environ['GITHUB_EVENT_PATH']).read_text())
        require(event.get('number') == 29 and event['pull_request']['head']['repo']['full_name'] == 'mfreeze77/DJT', 'Wrong PR')
    head = git('rev-parse', 'HEAD')
    require(not git('status', '--porcelain', '--untracked-files=no'), 'Tracked worktree not clean')
    payload = b''.join((Path('.github/quinira-transfer') / f'{i:02}.bin').read_bytes() for i in range(1, 11))
    require(len(payload) == 58380 and digest(payload) == PAYLOAD_SHA, 'Payload mismatch')
    patch = lzma.decompress(payload, memlimit=512 * 1024 * 1024)
    require(len(patch) == 369607 and digest(patch) == PATCH_SHA, 'Patch mismatch')
    with tempfile.TemporaryDirectory() as tmp:
        p = Path(tmp) / 'reviewed.patch'
        p.write_bytes(patch)
        expected = Path(tmp) / 'expected'
        subprocess.run(['git', 'worktree', 'add', '--detach', str(expected), BASE], check=True)
        try:
            subprocess.run(['git', 'apply', '--index', '--', str(p)], cwd=expected, check=True)
            require(git('write-tree', cwd=expected) == EXPECTED_TREE, 'Reviewed tree not reproduced')
            changed = [n for n in git('diff', '--cached', '--name-only', '-z', cwd=expected).split('\0') if n]
            require(len(changed) == 67, 'Wrong patch path count')
            require(all(n.startswith(R) or n.startswith('.github/workflows/quinira-') or n == '.github/workflows/veb-a7-evidence.yml' for n in changed), 'Patch outside allowed scope')
            # Workflow edits are published separately by the authorized connector.
            proposed_paths = len(changed)
            changed = [n for n in changed if not n.startswith('.github/workflows/')]
            require(len(changed) == 57, 'Wrong research path count')
            before = snapshot()
            subprocess.run(['git', 'apply', '--exclude=.github/workflows/*', '--check', '--', str(p)], check=True)
            subprocess.run(['git', 'apply', '--exclude=.github/workflows/*', '--index', '--', str(p)], check=True)
            for name in changed:
                a, b = Path(name), expected / name
                require(a.exists() == b.exists(), 'Deletion mismatch: ' + name)
                if a.exists():
                    require(a.read_bytes() == b.read_bytes(), 'Postimage mismatch: ' + name)
            require(all(Path(n).is_file() and digest(Path(n).read_bytes()) == h for n, h in before.items() if n not in changed), 'Unrelated tracked file changed')
        finally:
            subprocess.run(['git', 'worktree', 'remove', '--force', str(expected)], check=True)
    tested_tree = git('write-tree')
    before = snapshot()
    commands = [['node', R + n + '.mjs'] for n in ['validate_evidence', 'validate_followup', 'validate_accounting', 'validate_corpus_tax', 'audit_rinfo']]
    commands += [
        ['node', '--test', R + 'validate_evidence.test.mjs', R + 'review_assessment.test.mjs'],
        ['node', '--test', R + 'gorlane_review.test.mjs', R + 'panama_papers_findings.test.mjs'],
        ['python3', '-B', R + 'test_gorlane_neighborhood.py'],
        ['node', '--test', R + 'quinira_review.test.mjs'],
    ]
    logs, checks = {}, []
    for i, command in enumerate(commands, 1):
        result = subprocess.run(command, capture_output=True, text=True)
        logs[f'{i:02}.log'] = result.stdout + result.stderr
        checks.append({'command': command, 'exit_code': result.returncode, 'log': f'{i:02}.log'})
        print(' '.join(command), result.returncode, flush=True)
        print('\n'.join(logs[f'{i:02}.log'].splitlines()[-9:]), flush=True)
        require(result.returncode == 0, 'Validation failed')
    require(snapshot() == before, 'Read-only checks modified tracked files')
    out = Path(R) / 'evidence/quinira-2026/validation/publication'
    out.mkdir(parents=True, exist_ok=False)
    for name, text in logs.items():
        (out / name).write_text(text)
    receipt = {'input_commit': head, 'tested_index_tree': tested_tree, 'reviewed_patch_tree': EXPECTED_TREE, 'patch_sha256': PATCH_SHA, 'proposed_patch_paths': proposed_paths, 'published_research_paths': len(changed), 'workflow_changes_deferred_to_connector': True, 'timestamp': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'checks': checks, 'read_only_hashes_unchanged': True, 'raw_export_checks_rerun': False, 'original_registry_checks_rerun': False, 'historical_authentication': False, 'file_sha256': snapshot()}
    (out / 'PUBLICATION.json').write_text(json.dumps(receipt, indent=2) + '\n')
    subprocess.run(['git', 'add', '--', str(out)], check=True)
    subprocess.run(['git', 'diff', '--cached', '--check'], check=True)
    require(all(n.startswith(R) for n in git('diff', '--cached', '--name-only').splitlines()), 'Research publication may not change workflows or other paths')
    if dry:
        print('DRY_RUN_OK; no commit or push')
        return
    require(git('ls-remote', 'origin', 'refs/heads/' + BRANCH).split()[0] == head, 'Remote moved; refusing push')
    subprocess.run(['git', 'config', 'user.name', 'github-actions[bot]'], check=True)
    subprocess.run(['git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'], check=True)
    subprocess.run(['git', 'commit', '-m', 'research: publish reviewed Quinira registry records and bounded tax follow-through'], check=True)
    subprocess.run(['git', 'push', 'origin', 'HEAD:refs/heads/' + BRANCH], check=True)
    print('PUBLISHED_COMMIT=' + git('rev-parse', 'HEAD'))


if __name__ == '__main__':
    main()
