# Executed validation and remaining qualification

## Baseline actually rerun

GitHubActions acquisition runs **38000369324** and **38001378654** reran the inherited validator and test command successfully on this follow-up branch. Baseline: **16sources,20claims,17relationships,4legacy annotations;31tests passed**. These were new runs, not a repetition of PR24's asserted result.

- https://github.com/mfreeze77/DJT/actions/runs/38000369324
- https://github.com/mfreeze77/DJT/actions/runs/38001378654

## Local follow-up checks actually executed

Executed on October9,2026 in the working container:

```sh
node research/veb_a7_2026/validate_evidence.mjs
node research/veb_a7_2026/validate_followup.mjs
node --test research/veb_a7_2026/validate_evidence.test.mjs
node research/veb_a7_2026/audit_rinfo.mjs
```

Results: **36sources,37claims,28relationships,4legacy annotations;22entity entries,19transaction crosswalk entries,13instruments,30acquisition entries;44tests passed,0failed**. All31inherited tests remain;13new tests cover follow-up records and deliberate invalid mutations. The standalone original validator's implementation is unchanged.

The tests reject unknown source/entity references, total promotion, policy entries in the financial crosswalk, relabelling security as cash, missing currency, replacing unknown amounts with zero, note-value drift, name-only issuer promotion, fabricated acquisition hashes, inventory drift and duplicate instruments. They check the13-note total and its carrying-value reconciliation.

Byte comparison against the downloaded base snapshot confirmed no changes to:

- RF014's controlling financial ledger;
- the2010and2011annualJSON;
- either legacy review/interpretation file;
- `validate_evidence.mjs`.

The new audit traversed the full3,569,917-byte rinfoJSON; checksum and counts are stored in `rinfo_audit.json`. Existing source-byte hashes in the acquisition manifest were computed from files actually obtained. No hash is fabricated for a web-only or unobtained record.

## Not executed / not established by tests

No visualization integration or browser rendering test was performed; the sidecar is still not automatically consumed by the visualization. No bank reconciliation, certified registry authenticity check, signature forensic examination, verification of original federal fee-disclosure forms, or review of the unacquired A7 financial ZIPs was performed. The1,029-page scanned application was not exhaustively examined or OCRed.

Passing these checks authenticates neither historical allegations nor source provenance. It verifies structural contracts and preserves stated evidence boundaries. GitHub validation of the final published head must be read from its actual run; the baseline runs above are not represented as tests of later edits.
