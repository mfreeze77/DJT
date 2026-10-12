# Reproducing this deliverable

Python 3.11+ is recommended. The official-source and analysis scripts use the standard library; social retrieval additionally needs lxml.

## Verify the frozen official snapshot and release safeguards

```sh
python -m unittest discover -s tests -v
python scripts/verify_official_snapshot.py
```

The second command restores to a fresh temporary cache, disables network connections in each parser subprocess, runs the official pipeline, and compares all 1,828 HTML hashes, all 1,828 parsed-record hashes and both source manifests with the bundled snapshot. It removes its temporary cache afterward. This verifies extraction reproducibility, not the semantic correctness or completeness of annotations. The Python standard library is sufficient; no social download or dependency installation is needed.

## Offline official-source restore

From the package root:

```sh
python scripts/restore_official_snapshot.py
python scripts/build_corpus.py
python scripts/repair_metadata.py
python scripts/extract_packets.py
python scripts/make_compact_packets.py
python scripts/validate_corpus.py
```

The restore verifies all 1,828 original HTML SHA-256 hashes before parsing. Source HTML and frozen sitemaps restore to `.cache/dcpd`. The build reuses cached files, so this sequence does not need to fetch the source snapshot again. `DCPD_DATA_DIR` can override the cache directory.

Compact packets are navigation aids. They are not guaranteed to contain every relevant statement, pronoun reference or follow-up answer. Semantic annotation must consult full sources where needed. Source typography is used to distinguish speakers, including mixed-speaker paragraphs.

## Check the withheld comparison

```sh
python scripts/normalize_annotations.py
python -m unittest discover -s tests -v
```

Normalization preserves the first-pass review status. It does not apply revision ledgers automatically or constitute a new semantic review. The following commands are expected to exit with a `Blocked` message and write no comparison output for this release:

```sh
python scripts/aggregate.py
python scripts/aggregate.py --through 2026-09-11 --out results/common_cutoff
```

The CLI fails closed unless every input row has the exact status `REVIEWED_SYMMETRIC_COMPARISON`. Missing, unknown, empty and first-pass input is refused before date filtering or exclusions; there is no force/override option. Do not relabel rows merely to bypass the gate. Promotion requires source-context corrections to be applied symmetrically, favorable and adverse evidence to be audited, and the comparison to be explicitly approved. Stale output from an earlier run must not be treated as a valid result.

The calculation code does not recreate semantic judgments from a sentiment word list. Review decisions, literal evidence and provenance are part of the research artifact. The proposed matched-opportunity and causal protocol in `SELECTIVE_RESTRAINT_TEST.md` has not been executed.

A missing narrower annotation is represented as unknown. It must not be printed as zero. Broad favorable references include ceremonial courtesy, current affinity, favorable intention and positive call/deal appraisals when reviewers explicitly flagged them. Those categories are not equivalent to explicit praise of competence or character.

## Live social refresh

```sh
python -m pip install -r requirements.txt
python scripts/social/fetch_initial.py
python scripts/social/build_social.py
python scripts/social/fetch_rollcall.py
python scripts/social/normalize_social.py
```

Set `SOCIAL_DATA_DIR` to a private cache directory if desired. Set `DCPD_RECORDS_DIR` to the generated official `records/` directory when regenerating overlap candidates. The acquisition scripts contain the snapshot window and must be deliberately updated for a later research release.

A live refresh can differ from the supplied source manifest because archives add, edit and delete records. Preserve both versions. No raw third-party social compilation or media is licensed for redistribution by this package. Original post URLs and archival-source provenance remain available for verification.
