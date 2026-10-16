# Corpus/tax validation and review boundary

## Executed baseline

The recovered PR27 archive retained the merged PR26 research tables. Before the new research additions, all five requested commands were executed in the working container. The baseline passed **61 tests**, with55 sources,56 claims,30 relationships,4 legacy annotations;24 entities,21 typed entries,13 instruments,57 acquisition entries;31 accounting rows. The rinfo result was an integrity rerun, not new document discovery.

## Executed final local checks

Runtime: Node.js **v22.16.0**. The commands below were executed against the final local research files:

```sh
node research/veb_a7_2026/validate_evidence.mjs
node --test research/veb_a7_2026/validate_evidence.test.mjs
node research/veb_a7_2026/validate_followup.mjs
node research/veb_a7_2026/validate_accounting.mjs
node research/veb_a7_2026/audit_rinfo.mjs
node research/veb_a7_2026/validate_corpus_tax.mjs
```

Results: **78 tests passed, zero failed**. Current counts:77 sources,72 claims,36 relationships,4 legacy annotations;35 entities,22 typed entries,13 instruments,127 acquisition entries;31 existing accounting rows;53 return payloads,55 coverage records,28 reviewed nodes,8 reviewed relationships and11 tax/OGE reconciliation rows. Acquisition entries include inherited records, repeated reviews, index-only reads and failures;127 does not mean127 new original documents.

All61 inherited tests remain. The existing production-count expectation changed solely for appended rows. Sixteen new rejection tests and one production/read-only test cover tax-year/filing-year confusion, original/amended treatment, duplicated return parts, OGE versus tax returns, gross/net/allocation/distribution distinctions, unknown components, empty-text negative claims, incomplete collection claims, mirror overlap, entity identity, source-dataset loss, invented bank matches, obligor/payee distinction, QSub/legal-existence distinction, and sample/full-file equivalence.

The original validator, accounting validator, follow-up validator, annual2010/2011 JSON, controlling financial ledger, both legacy sidecars and13-note inventory remain unchanged. A before/after hash inventory verified that validation did not modify any file in the tested research subtree.

## Raw-data parity actually executed

```sh
python research/veb_a7_2026/verify_offshore_extract.py /path/to/extracted/full-oldb
```

Executed locally against the acquired2026-09-09 export: all6 member hashes, schemas and row counts matched; all36 selected node/relationship records matched their published row locators and retained fields. This command performs no network requests or writes. It is not run in ordinary CI because the raw archive is not committed.

## Publication and historical authentication

Current-head GitHub evidence CI must be confirmed from its actual run; earlier acquisition-run success is not final research validation. The final PR description identifies the published head, synthetic merge checkout and confirmed CI run. A synthetic merge test does not merge the PR into main.

NOT executed or obtained: a full6,340-page substantive tax review, full-corpus OCR, independent IRS e-file/acceptance authentication, complete amended/original reconciliation, a bank-level Toronto receipt trace, certified offshore register authentication, exhaustive appellate-disposition review, original Cyprus loan/pledge filings, or the missing MRHL/A7/Aragon settlements. No protected classification was changed to make a test pass. Structural and byte checks authenticate neither tax assertions nor historical allegations.
