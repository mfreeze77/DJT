# Presidential rhetoric archive and comparison

Research snapshot: October 12, 2026. Prepared for the DJT project. Destination: `mfreeze77/DJT`, selected by the user. Release status and subsequent corrections are recorded in Git history.

This deliverable is an evidence-indexed research archive for comparing Donald Trump's rhetoric toward Vladimir Putin, NATO and European allies, Canada and Mexico. It contains reproducible official-source extraction, source manifests, provisional annotation data, methods, retrieval scripts, coverage limits and analysis code. It is an archive of the enumerated sources, **not a certified complete archive of every presidential statement**.

Read [research status and remaining work](results/RESEARCH_STATUS.md) before using the annotations.

See the [existing-repository evidence crosswalk](docs/REPOSITORY_CROSSWALK.md) for the Chapter 5 claim IDs this work extends.

## Interpretation status

The initial 76-personal-criticism figure and its praise-versus-criticism balance were withdrawn after source-context reclassification. See [the correction log](docs/CORRECTION_LOG.md). Original component annotations are preserved as a first-pass audit trail; corrected symmetrical comparison remains under review. Do not use first-pass totals as a final finding. The aggregation command deliberately refuses first-pass, missing or unknown review statuses; no final comparative tables are supplied.

## Coverage
- All 1,828 numbered DCPD records in the retrieved 2025/2026 annual indexes were acquired, including excluded pre-inauguration records. The latest official event date available is September 11, 2026.
- The social source union has 12,855 Truth Social IDs and 143 in-term X IDs.
- X coverage after February 2, 2026 is unverified; 3,723 social records are media-only and are not exhaustively transcribed.
- Raw third-party archive compilations and media are not bundled for public republication. Portable source identifiers, provenance, original links and analytical annotations are supplied. See source-specific rights and coverage notes.

## Layout
- `data/`: portable source indexes, frozen official HTML, first-pass annotations and revision ledgers
- `docs/`: coding method, source coverage and rights, update workflow, and [selective restraint / prompted-versus-voluntary protocol](docs/SELECTIVE_RESTRAINT_TEST.md)
- `scripts/`: retrieval and reproducible aggregation
- `tests/`: schema, evidence and aggregation checks
- `results/`: reserved for comparison outputs after explicit review approval; currently withheld

All semantic review was performed by AI. The deliverable preserves evidence and limitations so a human can audit or revise it. Keyword matches select candidates; they are never treated as sentiment classifications.
