# Installed-wheel verification

The package was built as a wheel, installed into a clean virtual environment outside the repository, and exercised from outside the source checkout. Imports came from the environment's `site-packages`; the smoke commands did not use an editable installation or `PYTHONPATH`.

## Exact build inputs

| Item | Verified value |
|---|---|
| Distribution | `djt-evidence==0.1.0` |
| Runtime | Python 3.12.14, Linux x86_64 |
| Research input revision | `d5f1b11a0500d5d577f4553d7e6d13a0aa69e494` |
| Package source files | 14 |
| Package source manifest SHA-256 | `a3a58077c5fa0d1e80dd40d2bf5ba974df320ad194da56dd0391952009701a31` |
| Wheel | `djt_evidence-0.1.0-py3-none-any.whl` |
| Wheel bytes | 54,017 |
| Wheel SHA-256 | `02b01b54c61cd55b444706ab639a9078d5029bbf73c1ade9561803043ad1f851` |
| Builder | pip 26.2.1; wheel metadata identifies setuptools 84.0.0 as its generator |

The source digest covers `pyproject.toml` and all `.py`/`.json` files under `djt_evidence`, excluding `__pycache__`. For each input, record `path`, `sha256`, and `byte_count`; sort records by relative POSIX path, serialize with Python `json.dumps(records, sort_keys=True, separators=(",", ":"))`, and hash the UTF-8 bytes. All 14 inputs were checked again after the smoke commands and remained unchanged. The wheel build used `SOURCE_DATE_EPOCH=1791590400`. This digest identifies the tested implementation bytes without implying a final merged implementation commit.

## Executed checks

| Check | Result |
|---|---|
| Clean base wheel installation with declared dependencies | Passed; jsonschema 4.26.0 installed. Matter and PyMuPDF were initially absent. |
| Installed `djt-evidence --help` | Passed; all command entry points listed. |
| Packaged schema resources | Both evidence-package and story-manifest schemas loaded and validated through the installed package. |
| Installed CLI `build` and `validate` against the pinned research input | Passed; 465 covered files, 2,480 raw records, and 592 typed claims. Validation replayed the original import and checked repository source bytes. |
| Installed CLI `audit` | Passed; 20 artifacts, nine chapter manifests, 32 quarantined rows, and a 58-claim pilot. |
| Installed CLI `validate` on the gzip evidence package | Passed. |
| Installed CLI review compilation | Passed; 58 unique claim scenes, controlling qualifications retained, publication eligibility false. |
| Installed CLI publication attempt | Refused with exit 2; no publication output created. Blockers included unevaluated citations, controlling interpretations, missing editorial review, and missing verified support excerpts. |
| Matter export without Matter installed | Refused with exit 2 and an explicit instruction to install the documented pinned dependency; no candidate output created. |
| PDF capture without the optional extra | Refused with exit 2 and `CAPTURE_DEPENDENCY_MISSING`; no capture directory created. |
| Optional capture extra installation | Passed with PyMuPDF 1.28.2, within the declared supported dependency range. |
| Installed capture CLI after extra installation | Passed on an explicitly synthetic two-page PDF with one region crop: two full-page PNGs and one crop, all artifact hashes verified, original PDF bytes unchanged. Manifest status remained `captured_unreviewed`. |
| Dependency consistency | `pip check` passed with no broken requirements. |

The classification report reconciled 437 original rows from the active chapter and VEB claim ledgers into 423 typed claim rows and 14 quarantined rows. It kept the original status, source tier, source class, and confidence fields separate, including blank values and missing columns. These are migration counts and historical labels, not newly assigned confidence scores or evidence acceptance.

The base environment also resolved attrs 26.1.0, jsonschema-specifications 2025.9.1, referencing 0.37.0, rpds-py 2026.9.1, and typing-extensions 4.16.0. The separate source-tree capture tests used PyMuPDF 1.26.6; the installed-wheel smoke above independently exercised 1.28.2.

## Scope of this check

This installed-wheel run did not test Python 3.11, Windows, macOS, or a positive installed-wheel Matter integration. It verified explicit refusal when Matter was absent. The PDF fixture was synthetic test material, not acquired research evidence. The run did not authenticate external documents, establish supporting excerpts, approve factual publication, or render a V-Flow film.
