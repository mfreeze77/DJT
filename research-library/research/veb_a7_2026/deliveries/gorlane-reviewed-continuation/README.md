# Gorlane reviewed continuation — delivery package

## Publication status

The investigation and local validation in this package are completed at local commit
`f0790a2657ca33b415cd0d8cd0b6b9eabc958b41`, tree
`8f1262d99a756e54d0e2911b965e89871ffe675a`.
**These changes have NOT been pushed. No new PR was created in this continuation.**
Existing draft PR28 remains open and unmerged:
https://github.com/mfreeze77/DJT/pull/28

Last confirmed upstream PR28 head: `a13ac85660c0293539d57ad3cde28296b8a38eb1`.
Last confirmed main/base: `4d90dbca4b6f7ad99676b7eb8c36d43b415af178`.
The patch is against the PR28 head tree, NOT directly against main. The local reconstructed
preimage commit `bd56daa626876127851d3bd01ab65b5f634263f7` has exactly the same tree
`c3ec0d82c4d9fe32a7afec1a299fbdff04d1c62f` as upstream PR28, but is not represented as the same commit.
Existing PR28 checkpoint files are preserved unchanged by this patch.

## Read first

- `changes/research/veb_a7_2026/gorlane_reviewed_delta.md`: substantive findings, corrections and limits.
- `changes/research/veb_a7_2026/gorlane_neighborhood_review.md`: scoped traversal and identity decisions.
- The purchaser-role matrix, dated chronology, cash/obligation reconciliation and source-linked ledgers are alongside them.
- `validation/final/results.json`: every executed command, checked commit/tree, counts and read-only check.
- `validation/final/patch-application.json`: successful application to a disposable preimage checkout and exact postimage-tree match.
- `review-images/`: separately prepared review aids for the 2009 holding/transfer entries and 2017 tax narrative. Tax identifiers are raster-redacted; an unrelated director address and birth date are cropped out of UK page3. Provenance describes every transformation. These are not original PDFs and are not part of the repository patch.

## Apply without losing subsequent work

Use a clean checkout containing the exact PR28 preimage. If the branch/main has moved,
review the additional changes first; do not reset, force-push, or overwrite them.
The following checks intentionally fail on any different preimage tree. Run from the
repository root, after setting PATCH to this package's absolute patch path:

```sh
# Set this path to the extracted package's patch file.
PATCH=/absolute/path/gorlane-reviewed-continuation.patch

test -z "$(git status --porcelain)" || exit 1
test "$(git rev-parse HEAD^{tree})" = c3ec0d82c4d9fe32a7afec1a299fbdff04d1c62f || exit 1
git apply --check "$PATCH" || exit 1
git apply --index "$PATCH" || exit 1
git diff --cached --check || exit 1
test "$(git write-tree)" = 8f1262d99a756e54d0e2911b965e89871ffe675a || exit 1
```

Review the staged changes and rerun validation before committing/publishing. This package
performs no remote write and does not merge a PR. `changes/` contains only added/modified
files for inspection; it is not a standalone complete repository. The patch is preferred
because it verifies the expected preimage rather than silently copying over files.

## Validation actually executed

Baseline: all six requested commands, both inherited test files, 90 passing tests.
Final local: all six requested commands; the inherited90 plus18 new Node tests;12 Python
selection tests; both actual-raw-export verifiers; whitespace and clean-worktree checks.
All passed, zero failures. All405tracked file hashes were unchanged by the read-only checks.
A disposable worktree patch application reproduced the exact checked final tree.

Existing remote CI run38052189713/job114213381986 passed90tests on synthetic test-merge
`b1bc85899300c4998f3727c3880345b314b67ae2`, associated with PR28 head `a13ac85`.
That was NOT a main merge and did NOT test this local continuation. Its acquisition job
was skipped. No remote CI is claimed for local commit `f0790a2`.

The two raw parity checks require the separately obtained original ICIJ export directory:

```sh
python -B research/veb_a7_2026/verify_offshore_extract.py /path/to/raw-csv-directory
python -B research/veb_a7_2026/verify_gorlane_neighborhood.py /path/to/raw-csv-directory
```

The full export and large original PDF corpus are not republished in this package.
Exact byte hashes, source URLs, actual image/text coverage and access failures are in
the ledgers. Structural CI does not claim that it downloaded or checked the raw export.

## Evidentiary boundaries and attribution

RF-014 remains withdrawn/unconfirmed and excluded. No steel-proceeds-to-Toronto bank
leg, executed May2010buyer schedule, VEB drawdown or 2017buyout allocation is proved.
The newly supported2219431tax observation remains a specifically named taxable-income
exclusion narrative, not cash/fees/buyout and not a forced match to2273297OGE income.
The preserved opening checkpoint's matching-Gorlane-HTML-hash claim is explicitly
corrected in the reviewed delta. A checksum identifies bytes, not truth.

ICIJ-derived data retain International Consortium of Investigative Journalists attribution
and ODbL/content share-alike boundaries; see `reference/ICIJ_ATTRIBUTION.md` and the
publisher terms. No different license is asserted for source data or original records.
Being offshore is not evidence of wrongdoing. No outreach, purchase, private-bank/SAR
access, TLS override, main reset, force-push or merge was performed for this delivery.
