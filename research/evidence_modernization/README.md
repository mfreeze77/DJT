# DJT Evidence Modernization

**A working preserved-source inventory, migration exchange, and research-review
compiler.** The input is one immutable DJT Git revision. The output accounts for
the original archive, carries qualified assertions into reusable story selections,
and refuses to treat imported assertions as approved facts.

Start with the [repository audit](docs/research-audit.md),
[generated coverage summary](reports/inventory-summary.json),
[architecture](docs/architecture.md), and
[implementation roadmap](docs/implementation-roadmap.md). The
[integration contracts](docs/integration-contracts.md) identify the exact Matter,
EXAIS, and V-Flow code inspected and the boundaries that remain to be implemented.

## Delivered in this milestone

- Complete Git-snapshot inventory: files, byte hashes, structured rows, identical
  file groups, scoped identifier collisions, malformed JSON/CSV, source pointers,
  missing annual files, and explicit migration dispositions.
- Executable JSON Schema 2020-12 contracts, original payloads, stable path-scoped
  record IDs, source-file and raw-record hashes, entities, occurrences,
  relationships, observations, claims, acquisition history, source versions,
  financial observations, corrections, and story selections.
- Imports of all 43 annual datasets, all nine active chapter claim ledgers,
  named primary-source sections, the active VEB/A7 ledgers, and remaining active
  CSV rows. Malformed rows are retained in a review queue; unknown prose is
  inventoried instead of interpreted by guesswork.
- A Chapter 4 / 2010–2011 / Midland–Toronto review pilot and nine reusable chapter
  selections. The pilot has 58 claims and explicitly fails publication gates.
- Controlling corrections applied to review output and financial exclusions.
  A changed dependency or review identifies affected outputs without rewriting
  their original published snapshot.
- An optional adapter tested with the actual pinned Matter implementation. It
  creates **uncommitted repository-source observation inputs**, without creating
  Matter receipts, approved claims, or identities.
- Offline PDF capture with original-byte verification, full-page PNGs, separate
  crops, geometry, hashes, renderer version, and physical/printed-page separation.

This is a research exchange, not a new claims database. DJT remains the research
system of record. Matter owns the future durable evidence lifecycle. The inspected
V-Flow source union does not yet accept a research package, so these outputs are
not advertised as rendered or render-ready V-Flow storyboards.

## Reproduce the audited baseline

Requires Python 3.11+ and Git. From the DJT repository root:

```sh
python -m pip install ./research/evidence_modernization

djt-evidence --repo . --revision d5f1b11a0500d5d577f4553d7e6d13a0aa69e494 audit \
  --output-dir /tmp/djt-evidence-audit

djt-evidence --repo . validate \
  --bundle /tmp/djt-evidence-audit/evidence-package.json.gz

djt-evidence --repo . compile \
  --bundle /tmp/djt-evidence-audit/evidence-package.json.gz \
  --story /tmp/djt-evidence-audit/chapter-4-pilot.story.json \
  --mode review --output /tmp/djt-chapter-4-review.json
```

Use a new output directory. The CLI refuses to overwrite any input path tracked
in the selected revision. A dirty working tree is not part of the input. To audit
newly committed research, select its new commit explicitly. `--revision HEAD` is
also supported and is resolved once at the start of the command.

The compressed full inventory and evidence package are ordinary JSON wrapped in
deterministic gzip; the CLI reads both `.json` and `.json.gz`. The
[receipt](reports/receipt.json) lists artifact hashes. A compressed package saves
space; it does not remove original records.

## Commands

| Command | Result |
| --- | --- |
| `inventory --output FILE` | Full file/record inventory from a pinned Git snapshot |
| `build --output FILE` | Preserved-source exchange, validated against original Git blobs |
| `audit --output-dir DIR` | Inventory, exchange, coverage, quarantine, chapter selections, review pilot, and receipt |
| `validate --bundle FILE` | Schema, references, provenance, and deterministic import reconciliation |
| `compile --bundle FILE --story FILE --mode review --output FILE` | Qualified review scenes and explicit publication blockers |
| `compile ... --mode publish ...` | Requires verifiable supporting excerpts and a trusted host editorial-review boundary; imported research cannot self-approve |
| `affected --bundle FILE --story-package FILE --output FILE` | Whether changed evidence, contextual files, corrections, or reviews affect an earlier output |
| `matter-candidates --bundle FILE --observed-at TIMESTAMP --output FILE` | Real Matter observation inputs and source assertion mappings, using the optional pinned dependency |
| `capture-pdf --source FILE --expected-sha256 HASH --source-id ID --source-version-id ID --pages N ... --source-url URL --captured-at TIMESTAMP --output-dir DIR` | Verified local PDF full-page/crop derivatives; see the capture runbook |

Global `--repo` and `--revision` precede the command. Errors exit with status 2 and
an explicit message; a failed publication command writes no replacement output.

## Evidence and migration status are different

| Example | Migration outcome | Evidence outcome |
| --- | --- | --- |
| A valid chapter CSV row says “Established” | Preserved and mapped | Original status retained; canonical candidate stays unreviewed |
| A row has more cells than headers | All cells and raw row hash preserved | Quarantined; no guessed claim field mapping |
| An acquisition manifest records a PDF SHA-256 | Manifest and source version imported | Metadata-only until the actual matching source bytes are retained |
| A legacy event says `$15m` “to-trump” | Original payload remains available | Controlling withdrawn/unconfirmed interpretation applies; no total or cash animation |
| A matching person/company name occurs elsewhere | Both records retained | Separate identities until an explicit reviewed decision connects them |
| A citation has no image | Claim and source pointer remain | Explicit capture state and citation-card fallback |
| `rinfo.json` lists a filename | Filename reference counted | Not counted as an acquired or reviewed document |

## Tests and limitations

```sh
python -m pip install './research/evidence_modernization[capture]'
python -m unittest discover -s research/evidence_modernization/tests -v
```

The optional Matter installation and exact supported revision are documented in
[integration-contracts.md](docs/integration-contracts.md). Its tests report an
explicit skip when that dependency is unavailable; a skip is not an integration
pass. The included CI installs the pinned package and runs the real adapter tests.

See [validation.md](docs/validation.md) for executed results and unrun acceptance.
This milestone does not acquire every linked document, resolve the quarantined
CSV meanings, authenticate historical allegations, complete Matter hosting,
connect the EXAIS service, switch the existing visualizer, or render a film.
Those are explicit sequenced tickets in the roadmap.
