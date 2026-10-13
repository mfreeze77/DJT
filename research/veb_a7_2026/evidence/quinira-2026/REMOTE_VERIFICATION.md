# Quinira publication and remote tree verification

## Published research

The reviewed continuation was committed on the PR29 branch by publication commit `0e49fdbe9539085c934d5a1b337b31fc302b3381`, parent `d0cccc61a8c7b4dfde811524f39a00d6d991fffa`. Its 57 research-file changes and nine execution logs plus publication receipt are committed, not merely temporary artifacts. The existing continuation checkpoint from `fc4be0a2fdf2f29b770b43d3f4394284fa6837f3` is preserved. Main is not written or merged.

The exact original patch is 369607 bytes, SHA256 `968dae02aa808bfc26d3e169125b75ffe31d48791cc83d242b1ba1089c9f028b`, based on `ec885204d70c64fb898c7de07743eb17de30d692`. Its reviewed tree is `e0e31ff016206a2b3c779d556717fc218b41b96b`. The patch comprises 57 research paths and ten workflow paths. Workflow changes were applied separately through the authorized connector: update the integrity workflow and retire nine completed one-run acquisitions. Temporary transfer files and the write-capable publication workflow are removed from the final tree; their history remains available.

## Independent exact-tree check

The cleaned remote tree before adding this verification note is `8867897ba1bcb382217818fa9ace0b951606b933`. Creating an UNREFERENCED verification tree that removed only the separately preserved continuation checkpoint and the ten new publication log/receipt files reproduced `e0e31ff016206a2b3c779d556717fc218b41b96b` exactly. No branch was moved to that verification tree. This confirms the entire reviewed postimage, not merely sampled file matches, while preserving the additional checkpoint and receipts in the actual branch.

## Executed checks and prior failure

The publication ran all five validators, the 90 inherited evidence/reviewer tests, 26 Gorlane/Panama tests, 12 Python selection tests and 16 new Quinira tests: 144 total. Tracked-file hashes were unchanged by those read-only checks. The logs and input-commit/index-tree receipt are in `validation/publication/`. These are execution results on the publication's staged research tree; final-head GitHub Actions results must be read separately and are not asserted by this note.

The first publication run, 38110398964, passed those checks but its push was rejected because the default Actions token lacked permission to change workflows. No final research publication was claimed for that failed push. The corrected run restricted the bot to research paths; the already authorized connector handled workflow changes separately. No token permission expansion, force-push or main write was used.

The original registry parity result is separately preserved at `validation/original-registry-parity.json`: five obtained HTML displays and all 21 observations, including the repeated Quinira scan-status row. Neither the publication nor structural CI re-downloads or authenticates those original responses. Raw ICIJ verification was not rerun this wave.

## Source and privacy boundary

The committed HTML excerpts are disclosed native-text derivatives, not full-response copies or original loan instruments. Whole-response hashes and acquired-artifact provenance are retained. No new unredacted tax page, full tax PDF or unnecessary identifiers are published. RF-014, cash/obligation distinctions, identity exclusions and all inherited interpretation controls remain unchanged.

The final web recheck retrieved the same official 2017 NYC-3L instructions and current Cyprus charge-registration guidance; physical page16 of the former was image-read again. A repeat web-tool attempt at Ukrainian decision104052660 returned an internal retrieval error, which does not overwrite the already acquired original-response bytes and review record. No new source-byte hash is invented for web renderings.
