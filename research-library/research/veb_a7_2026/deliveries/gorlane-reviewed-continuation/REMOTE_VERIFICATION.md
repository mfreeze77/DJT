# Remote publication verification

The complete delivery was pushed to PR28's feature branch in commit `b34308cd1784233fa1370999c3f79485eeaae027`, tree `ca419f6e6f13f19d923b047f8234d362d8960e19`. This is not a merge into main.

## Exact research-tree comparison

A temporary, unreferenced Git tree was created from the published tree with only publication machinery, the delivery archive directory, and `gorlane_publication.md` excluded. The resulting tree was `8f1262d99a756e54d0e2911b965e89871ffe675a`: exactly the earlier tested patch postimage. Thus all 30 operational files and the preserved original repository contents match the reviewed delivery. No branch was moved to that verification-only tree.

## Original linked artifacts

A second unreferenced tree operation replaced the seven originally linked artifact paths with Git blob IDs computed locally from the delivered bytes. It returned the unchanged published tree `ca419f6e6f13f19d923b047f8234d362d8960e19`. This confirms exact remote equality for the ZIP, patch, standalone report, standalone validation JSON, and all three cropped/redacted review PNGs.

The original ZIP is 726417 bytes, SHA256 `44f57a110d7ecb73fc5c8b8caea817e1e0a838ad7326347353bc507b30f4b52e`. `PUBLICATION.json` records the remaining per-file hashes, sizes, and publication checks. The archived original ZIP retains all package member paths, including `changes/`; the operational files are also applied at their normal repository paths.

## Validation and publication history

All eight publication commands passed: the five validators, 90 inherited Node tests including both required test files, 18 new Node tests, and 12 Python tests. Before/after hashes were unchanged. The initial publication attempt stopped on Git's formatting check of a literal empty context line in the archived unified patch. The retry preserved the patch bytes and used an untracked, exact-path whitespace attribute for that archive only. Operational-file formatting, archive byte hashes, exact-tree checks, and evidence protections were not relaxed.

The temporary transfer payload and write-capable publication workflow are removed by the cleanup commit containing this receipt; their executed history remains in Git. The read-only evidence workflow remains and checks the actual PR head. Its final-head CI result must be read from the PR after this cleanup commit, separately from the publication-job results above.

No new original-source acquisition, unredacted tax image/PDF publication, outreach, purchase, force-push, main write, or merge occurred. Historical raw-export verification logs are preserved, not relabeled as a fresh raw-export CI run. The original delivery metadata's local-only flags describe its earlier creation state; `PUBLICATION.json`, this receipt, and the live PR supersede that publication status only. RF-014 remains withdrawn/unconfirmed and excluded.
