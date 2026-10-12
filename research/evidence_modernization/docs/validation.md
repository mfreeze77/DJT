# Executed validation and remaining acceptance

## Result

**223 tests passed locally: 95 new modernization tests and 128 inherited research
tests. There were no failures, errors or skipped tests.** All five inherited
standalone validation/audit commands also passed. A clean, installed wheel
reproduced all **20 committed report artifacts byte for byte** from the pinned
source revision.

The audited input is DJT commit
`d5f1b11a0500d5d577f4553d7e6d13a0aa69e494`. The tests identify the exact runtime and
test file hashes in [the execution receipt](../validation/local-validation.json).
This receipt binds the local result to those files rather than to an unpublished
or subsequently changed branch name. The execution logs are preserved beside it.

## New regression suite

The full suite ran on Python **3.12.14**, with `jsonschema==4.26.0`,
`PyMuPDF==1.26.6`, and the actual pinned
`matter-foundation==0.1.0.dev11` implementation installed. All optional integration
and rendering tests ran; none were counted as passing because of a skip.

| Area | Passed | What the tests exercise |
| --- | ---: | --- |
| Git inventory | 16 | Immutable source revisions, exact raw spans, malformed input, annual metadata, scoped collision counts and full file accounting |
| Importer | 16 | Original payload preservation, explicit chapter mappings, quarantine, ambiguous identifiers, relationship roles and controlling corrections |
| CLI | 8 | Pinned input behavior, error exits, safe output paths, review compilation and publication refusal |
| Publication and validation | 20 | Complete import replay, forged/deleted-record rejection, exact source/excerpt binding, explicit host review authority, evidence completeness, correction dependencies and prior-output integrity |
| Real Matter adapter | 12 | Actual upstream schema/module contracts, version/provenance checks, source-file observations and refusal to fabricate accepted claims or receipts |
| Offline PDF capture | 18 | Original-byte hashes, full-page/crop consistency, physical-page geometry, explicit derivative provenance and safe refusal paths |
| Report generation | 5 | Complete coverage, independent classification axes, malformed-row queues, deterministic artifact output and input preservation |
| **Total** | **95** | **0 failures, 0 errors, 0 skips** |

The positive publication fixture uses a synthetic retained UTF-8 source, exact
excerpt coordinates and explicitly supplied authenticated-review digests. It
proves the implemented gate can succeed under its declared host contract. It does
not approve the historical pilot. Required PDF captures still need a later
capture-to-publication binding.

## Inherited gates

The source-specific research controls were retained and executed unchanged:

```sh
node research/veb_a7_2026/validate_evidence.mjs
node research/veb_a7_2026/validate_followup.mjs
node research/veb_a7_2026/validate_accounting.mjs
node research/veb_a7_2026/validate_corpus_tax.mjs
node research/veb_a7_2026/audit_rinfo.mjs
node --test research/veb_a7_2026/validate_evidence.test.mjs research/veb_a7_2026/review_assessment.test.mjs research/veb_a7_2026/gorlane_review.test.mjs research/veb_a7_2026/panama_papers_findings.test.mjs
python -B research/veb_a7_2026/test_gorlane_neighborhood.py
```

The Node suite passed **116 tests**; the Python suite passed **12**. These checks
cover the existing financial exclusions, source-specific qualifications, identity
boundaries, corpus/tax limits and correction interpretations. They remain useful
alongside the general migration contracts.

## Real repository and installed-package checks

The build and source-bound validation succeeded against all **465** original
tracked files. The validated exchange contains **2,480 raw records**, **592 claim
assertions**, **285 entity occurrences/crosswalk candidates**, **169 event
occurrences**, **170 relationships**, **396 source references**, **181 source
versions**, **181 acquisitions**, **267 financial observations**, **504 evidence
links**, and **5 controlling corrections**. All source-version/acquisition
availability in this import remains metadata-only/unverified locally.

All 43 complete annual envelopes are retained, including metadata outside the
five common domain collections. The 31 malformed active rows remain import
issues. The quarantine report includes those rows plus one malformed archived
row, for **32** total. No malformed row was repaired by guessing its intended
columns.

The nine chapter selections and the **58-claim pilot** compiled successfully in
review mode. Pilot publication is **blocked**. The imported package has no exact
external-source excerpts, retained original source versions, authenticated
reviews, enabled financial totals or enabled cash animation. Missing evidence is
reported explicitly.

The real Matter adapter mapped the 592 assertions to **53 original-source-file
observation candidates** using the pinned implementation. These are uncommitted
inputs, with no Matter host writes or receipts.

An independent clean wheel installation outside the checkout exercised build,
validation, compressed inputs, report generation, review compilation, publication
refusal, missing optional dependencies, and PDF capture after installing the
capture extra. That renderer check also passed with **PyMuPDF 1.28.2**. See
[installation-check.md](installation-check.md) for the exact wheel and package
input hashes and the check scope.

The installed-wheel audit and working-checkout audit matched using:

```sh
python research/evidence_modernization/verify_reports.py \
  research/evidence_modernization/reports /path/to/independent-audit
```

Result: `verified: true`, `artifacts: 20`, `byte_identical_rebuild: true`.
The [report receipt](../reports/receipt.json) gives every artifact's byte count and
SHA-256; the receipt itself is the hash manifest, not a self-hashed artifact.

A direct comparison of all 465 baseline files found **464 byte-identical files**
and one intentional root `README.md` navigation-link addition. Every original
research, data, frontend and validation file is unchanged. The new implementation,
documents, tests and reports live under `research/evidence_modernization/`, with
one additional CI workflow.

## CI and acceptance still to execute

The new workflow installs the real optional dependencies, runs the complete suite
on Python 3.11 and 3.12, regenerates the pinned baseline, verifies report parity,
and executes the inherited gates. A workflow definition alone is not a completed
remote CI run; inspect the checks on the exact proposed GitHub commit for that
result. The local full-suite result above is Python 3.12 only.

This milestone validates preservation and software behavior. Historical-source
authentication, acquisition of the missing original PDFs, reviewed CSV repair
decisions, durable Matter hosting, live EXAIS calls, V-Flow research ingestion and
rendering, and the legacy frontend's consumer transition remain explicit
acceptance work in the [roadmap](implementation-roadmap.md). No new historical
source screenshot or film is presented as an output of these tests.
