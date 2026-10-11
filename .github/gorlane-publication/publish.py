"""One-time PR28 delivery publication. No source acquisition, main write, or merge.

Decode the user-approved package, verify the exact patch postimage, recover only
existing authorized GitHub artifacts, reproduce reviewed redactions byte-for-byte,
and publish regular files. All byte checks fail closed; no evidence is inferred.
This temporary transfer script/workflow is removed after publication verification.
"""
from __future__ import annotations
import base64
import datetime
import hashlib
import io
import json
import lzma
import os
from pathlib import Path, PurePosixPath
import shutil
import subprocess
import tempfile
import urllib.parse
import urllib.request
import zipfile

REPO = 'mfreeze77/DJT'
BRANCH = 'research/gorlane-neighborhood-original-records-20261010'
BASE = 'a13ac85660c0293539d57ad3cde28296b8a38eb1'
BASE_TREE = 'c3ec0d82c4d9fe32a7afec1a299fbdff04d1c62f'
POST_TREE = '8f1262d99a756e54d0e2911b965e89871ffe675a'
PAYLOAD_SHA = '5fa7d8f6931e0a573a9037556492a6d7c498595806998c2ad238c965ca731829'
R = Path('research/veb_a7_2026')
DEST = R / 'deliveries/gorlane-reviewed-continuation'


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise RuntimeError(message)


def run(*args: str, cwd: Path | None = None) -> str:
    return subprocess.check_output(args, cwd=cwd, text=True).strip()


def safe_path(name: str) -> Path:
    p = PurePosixPath(name)
    require(not p.is_absolute() and '..' not in p.parts and '\\' not in name, 'Unsafe package path')
    return Path(*p.parts)


def write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


class SecureRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        require(urllib.parse.urlparse(newurl).scheme == 'https', 'Refused non-HTTPS redirect')
        result = super().redirect_request(req, fp, code, msg, headers, newurl)
        if result is not None and urllib.parse.urlparse(req.full_url).netloc != urllib.parse.urlparse(newurl).netloc:
            result.remove_header('Authorization')
        return result


def recover_artifact(artifact_id: int, digest: str, temp: Path) -> Path:
    # Reuse repository artifacts; do not contact the original records publishers.
    target = temp / f'{artifact_id}.zip'
    request = urllib.request.Request(
        f'https://api.github.com/repos/{REPO}/actions/artifacts/{artifact_id}/zip',
        headers={'Authorization': 'Bearer ' + os.environ['GH_TOKEN'],
                 'User-Agent': 'DJT-authorized-delivery-publication',
                 'Accept': 'application/vnd.github+json'})
    with urllib.request.build_opener(SecureRedirect()).open(request, timeout=90) as response, target.open('wb') as output:
        size = 0
        while chunk := response.read(1024 * 1024):
            size += len(chunk)
            require(size < 450_000_000, 'Artifact exceeded bounded size')
            output.write(chunk)
    require(hashlib.file_digest(target.open('rb'), 'sha256').hexdigest() == digest, 'Artifact ZIP digest mismatch')
    return target


def reviewed_images(final_zip: Path, tax_zip: Path) -> dict[str, bytes]:
    import fitz
    from PIL import Image, ImageDraw
    require(fitz.VersionBind == '1.26.7' and Image.__version__ == '12.3.0', 'Rendering version drift')
    with zipfile.ZipFile(final_zip) as z:
        uk = z.read('global-steel-2009-return.pdf')
    with zipfile.ZipFile(tax_zip) as z:
        tax = z.read('31-DJT-Holdings-Managing-Member-LLC-2017.pdf')
    require(sha(uk) == '0ce80156c87ef1b2c8ab97e8730ee5443082fbf8eade28fa2356fd784abdfb90', 'UK PDF mismatch')
    require(sha(tax) == '63c9519f0c9ada783dfecf8f9b4e3d29c99ce465252f5552adead9b8fee80d82', 'Tax PDF mismatch')
    images = {}
    with fitz.open(stream=uk, filetype='pdf') as doc:
        for page in (3, 4):
            image = Image.open(io.BytesIO(doc[page-1].get_pixmap(matrix=fitz.Matrix(2, 2)).tobytes('png')))
            if page == 3:
                image = image.crop((0, 450, 1190, 1684))
            buf = io.BytesIO()
            image.save(buf, format='PNG')
            images[f'review-images/uk-2009-return-physical-{page}.png'] = buf.getvalue()
    with fitz.open(stream=tax, filetype='pdf') as doc:
        image = Image.open(io.BytesIO(doc[37].get_pixmap(matrix=fitz.Matrix(1.7, 1.7)).tobytes('png')))
        draw = ImageDraw.Draw(image)
        for rectangle in ((733, 47, 910, 65), (365, 147, 480, 170), (416, 483, 521, 504), (269, 505, 376, 526)):
            draw.rectangle(rectangle, fill='black')
        buf = io.BytesIO()
        image.save(buf, format='PNG')
        images['review-images/2017-parent-physical-38-redacted.png'] = buf.getvalue()
    return images


def archive(payload: dict, members: dict[str, bytes]) -> bytes:
    require(set(members) == {r['path'] for r in payload['zip_members']}, 'Package member set mismatch')
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for row in payload['zip_members']:
            data = members[row['path']]
            require(len(data) == row['bytes'] and sha(data) == row['sha256'], 'Member mismatch: ' + row['path'])
            info = zipfile.ZipInfo(payload['member_prefix'] + row['path'], tuple(row['date_time']))
            info.compress_type = row['compress_type']
            info.create_system = row['create_system']
            info.external_attr = row['external_attr']
            info._compresslevel = 9
            z.writestr(info, data)
    data = buf.getvalue()
    require(len(data) == payload['archive_bytes'] and sha(data) == payload['archive_sha256'], 'Original ZIP mismatch')
    return data


def fingerprint(root: Path, paths: list[str]) -> dict[str, str]:
    return {p: sha((root / safe_path(p)).read_bytes()) for p in paths}


def main() -> None:
    require(os.environ.get('GITHUB_REPOSITORY') == REPO, 'Wrong repository')
    require(os.environ.get('GITHUB_HEAD_REF') == BRANCH, 'Wrong branch')
    root = Path.cwd()
    head = run('git', 'rev-parse', 'HEAD')
    require(run('git', 'rev-parse', BASE + '^{tree}') == BASE_TREE, 'Baseline tree drift')
    subprocess.run(['git', 'merge-base', '--is-ancestor', BASE, head], check=True)
    require(not DEST.exists(), 'Delivery already exists; stop rather than overwrite')
    parts = root / '.github/gorlane-publication'
    encoded = ''.join((parts / f'{i:02d}.txt').read_text().strip() for i in range(1, 13))
    compressed = base64.b64decode(encoded, validate=True)
    require(sha(compressed) == PAYLOAD_SHA, 'Transfer payload digest mismatch')
    payload = json.loads(lzma.decompress(compressed, memlimit=256 * 1024 * 1024))
    delivery = json.loads(payload['files']['DELIVERY.json'])
    require(delivery['patch_base_upstream_commit'] == BASE and delivery['checked_tree'] == POST_TREE, 'Delivery lineage mismatch')
    members = {p: text.encode('utf-8') for p, text in payload['files'].items()}
    with tempfile.TemporaryDirectory(prefix='gorlane-publish-') as tmp:
        temp = Path(tmp)
        worktree = temp / 'postimage'
        patch = temp / 'delivery.patch'
        patch.write_bytes(members['gorlane-reviewed-continuation.patch'])
        subprocess.run(['git', 'worktree', 'add', '--detach', str(worktree), BASE], check=True)
        subprocess.run(['git', 'apply', '--check', str(patch)], cwd=worktree, check=True)
        subprocess.run(['git', 'apply', '--index', str(patch)], cwd=worktree, check=True)
        require(run('git', 'write-tree', cwd=worktree) == POST_TREE, 'Exact patch postimage differs')
        subprocess.run(['git', 'diff', '--cached', '--check'], cwd=worktree, check=True)
        for name in delivery['files']:
            p = safe_path(name)
            data = (worktree / p).read_bytes()
            # Do not replace a later contribution to a touched path.
            old = subprocess.run(['git', 'show', BASE + ':' + name], capture_output=True)
            current = root / p
            require(not current.exists() or current.read_bytes() in (data, old.stdout if old.returncode == 0 else b''), 'Concurrent path change: ' + name)
            members['changes/' + name] = data
            write(current, data)
        small = recover_artifact(11662915367, 'd94e2d76d21d29d7097836025240a301a9702793a5b449f7efcc8dc597a5edde', temp)
        tax = recover_artifact(11656198955, '00386eca825be5a823fc6f273970091ca0101bcf2ef5b92276b8e577268bffce', temp)
        members.update(reviewed_images(small, tax))
        zip_bytes = archive(payload, members)
        for name, data in members.items():
            if not name.startswith('changes/'):
                write(root / DEST / safe_path(name), data)
        write(root / DEST / payload['archive_name'], zip_bytes)
        # Preserve standalone outputs linked in the original final response.
        write(root / DEST / 'gorlane-review-report.md', members['changes/research/veb_a7_2026/gorlane_reviewed_delta.md'])
        write(root / DEST / 'gorlane-validation.json', members['validation/final/results.json'])
        subprocess.run(['git', 'worktree', 'remove', '--force', str(worktree)], check=True)
    paths = run('git', 'ls-files', '-z').split('\0')
    paths = [p for p in paths if p]
    newpaths = [str(p.relative_to(root)) for p in (root / DEST).rglob('*') if p.is_file()]
    paths = sorted(set(paths + delivery['files'] + newpaths))
    before = fingerprint(root, paths)
    commands = [['node', str(R / n)] for n in ('validate_evidence.mjs', 'validate_followup.mjs', 'validate_accounting.mjs', 'validate_corpus_tax.mjs', 'audit_rinfo.mjs')]
    commands += [
        ['node', '--test', str(R / 'validate_evidence.test.mjs'), str(R / 'review_assessment.test.mjs')],
        ['node', '--test', str(R / 'gorlane_review.test.mjs')],
        ['python3', '-B', str(R / 'test_gorlane_neighborhood.py')],
    ]
    checks = []
    for i, command in enumerate(commands, 1):
        result = subprocess.run(command, capture_output=True, text=True)
        log = result.stdout + result.stderr
        print(log)
        write(root / DEST / f'publication-checks/{i:02d}.log', log.encode())
        checks.append({'command': command, 'exit_code': result.returncode})
        require(result.returncode == 0, 'Publication check failed')
    require(before == fingerprint(root, paths), 'Read-only checks changed files')
    # All workflow changes were made directly by the authenticated connector;
    # the job may commit only research files, never a workflow or main branch.
    require(not run('git', 'diff', '--', '.github'), 'Unexpected workflow change')
    tracked_delivery = sorted(set(delivery['files'] + [str(p.relative_to(root)) for p in (root / DEST).rglob('*') if p.is_file()]))
    manifest = {'repository': REPO, 'branch': BRANCH, 'pr': 28,
                'published_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                'input_head': head, 'original_patch_base': BASE, 'original_patch_tree': POST_TREE,
                'original_zip_sha256': payload['archive_sha256'], 'original_zip_bytes': len(zip_bytes),
                'operational_file_count': len(delivery['files']), 'checks': checks,
                'read_only_file_hashes_unchanged': True, 'fresh_raw_export_checks': False,
                'historical_validation': 'Original package logs retained; not relabeled as current CI.',
                'files': {p: {'sha256': sha((root / p).read_bytes()), 'bytes': (root / p).stat().st_size} for p in tracked_delivery}}
    write(root / DEST / 'PUBLICATION.json', (json.dumps(manifest, indent=2) + '\n').encode())
    write(root / R / 'gorlane_publication.md', (
        '# Gorlane delivery publication\n\n'
        'The complete previously downloadable delivery is now committed on the PR28 feature branch, not merged to main.\n\n'
        '- [Reviewed investigation](gorlane_reviewed_delta.md)\n'
        '- [Original ZIP](deliveries/gorlane-reviewed-continuation/gorlane-reviewed-continuation.zip)\n'
        '- [Original patch](deliveries/gorlane-reviewed-continuation/gorlane-reviewed-continuation.patch)\n'
        '- [Review images and provenance](deliveries/gorlane-reviewed-continuation/review-images/)\n'
        '- [Publication file hashes and checks](deliveries/gorlane-reviewed-continuation/PUBLICATION.json)\n\n'
        'All 30 operational files are applied at their normal repository paths. The archival delivery metadata and earlier notes retain their historical local-only status; this publication record supersedes that status, not their evidence limits. The original ZIP is byte-identical. The three review images were reproduced from the already acquired repository artifacts and checked against the original image hashes. No unredacted tax image, raw tax PDF, new record acquisition, outreach, purchase, main write, or merge is included. RF-014 remains excluded.\n\n'
        'The eight publication commands passed with unchanged file hashes. Historical raw-export parity logs are preserved; raw-export checks were not rerun by this publication job. Final-head CI must be read separately after publication.\n').encode())
    subprocess.run(['git', 'add', '--', str(R)], check=True)
    staged = run('git', 'diff', '--cached', '--name-only').splitlines()
    require(staged and all(p.startswith(str(R) + '/') for p in staged), 'Staged outside authorized research scope')
    subprocess.run(['git', 'diff', '--cached', '--check'], check=True)
    require(run('git', 'ls-remote', 'origin', 'refs/heads/' + BRANCH).split()[0] == head, 'Remote moved; refusing to push')
    subprocess.run(['git', 'config', 'user.name', 'github-actions[bot]'], check=True)
    subprocess.run(['git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'], check=True)
    subprocess.run(['git', 'commit', '-m', 'research: publish exact Gorlane delivery, artifacts and validation'], check=True)
    subprocess.run(['git', 'push', 'origin', 'HEAD:refs/heads/' + BRANCH], check=True)
    print('PUBLISHED_COMMIT=' + run('git', 'rev-parse', 'HEAD'))


if __name__ == '__main__':
    main()
