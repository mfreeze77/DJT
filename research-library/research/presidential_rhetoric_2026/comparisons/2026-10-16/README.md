# Cumulative official-rhetoric comparison

Prepared October 16, 2026. Start with REPORT.md. Window: January 20, 2025–September 11, 2026.

After restoring the existing official archive as described below, run `python scripts/reproduce.py` from this comparison directory with Python 3. No packages or network access are required. This recomputes category memberships and counts, checks dates and IDs, and validates indexed quotation fields against the frozen corpus. It does not repeat semantic judgments or independently authenticate the downloaded corpus.

- comparison_summary.csv: category counts; NATO institution is a distinct target type.
- source_index.csv: contributing official source URLs and IDs.
- data/: reviewed records, exclusions, exact evidence, memberships. The eligible official corpus is reconstructed from the existing source archive rather than duplicated here.
- qa/: independent defense review, quotation checks and sensitivity summaries.
- docs/: original archive methodology and correction history; those documents predate the new harmonization.

Unit: one distinct official communication × target × category, counted once even when a phrase repeats. Categories overlap; unions are deduplicated, never added as a score. These are observed communication counts, not independent incidents, lifetime totals, equal-exposure rates or proof of motive. Social media and implemented policies are not pooled with official rhetoric.

Source archive: https://github.com/mfreeze77/DJT/tree/2d4820a115a3d5e0b29492834e0fc3e3d8ca7751/research-library/research/presidential_rhetoric_2026
All 88 available portable archive files matched that commit’s Git blob hashes. Original pre-packaging eligible-corpus SHA256: eadbd287bb6750aa047bd21d96ec88d01bcf7c8a24f1f37199e79d227d2daeb2. New coding is AI semantic review with source checks, not human validation and published only as a separate draft research extension. Official-source materials retain their source attribution.

Packaging replaces local source-path metadata with portable provenance labels; transcript content is unchanged. SHA256SUMS.json gives hashes of the delivered files.


## Reproduce from the repository's frozen official source archive

From `research-library/research/presidential_rhetoric_2026`:

```sh
python scripts/restore_official_snapshot.py
python scripts/build_corpus.py
python scripts/extract_packets.py
python comparisons/2026-10-16/scripts/reproduce.py
```

The first three commands reuse the existing `data/official_source_html.zip` and frozen sitemaps. No additional source download is needed. The final command reads `.cache/dcpd/eligible_corpus.json` and normalizes only `text_path` provenance to `source-records/<ID>.json`. This produces exactly the frozen comparison corpus's SHA-256 `33a83c60ddd81090afbcda6d5d1cf27421092714603830d26f8ff8b466929d39` (1,051 records). It aborts if content or speaker metadata differs. A compatible separately restored corpus can be supplied with `--corpus PATH`; its normalized hash must match. The 48,479,725-byte derived JSON is intentionally not duplicated in Git.

`SHA256SUMS.json` verifies this comparison's committed files. Exact quoted source context remains in the coded records. The script checks the membership/count tables and their CSV/source-index parity, and literal quotation fields; it does not redo semantic judgments, establish equal exposure, or authorize release of the archive's original withdrawn comparison. See [comparison correction history](docs/COMPARISON_CORRECTIONS.md) and [preserved original corrections](docs/archive_CORRECTION_LOG.md).

Status: draft AI-reviewed research, not human validation. The original archive annotations, fail-closed release gate, and previous correction history remain unchanged.


## Separate October 2026 matched-war context

[Trump and three allied leaders in the October energy-war episode](docs/OCTOBER_MATCHED_WAR_CONTEXT.md) compares responsibility, credibility, and pressure within the October 9–16 diesel-relief and energy-strikes episode. This is a separately sourced contextual report outside the cumulative corpus cutoff. It does not alter any coded record, category membership, total, or source-index row above. It covers one shared episode, not a frequency denominator, a NATO-wide consensus, or independent repeated tests. Source-access limits and the distinction between leader remarks and government-spokesperson statements remain explicit.

The source draft was supplied with SHA-256 `36a97cb936e9aa09b17b856f5d0f3d11b31d90be360c30561a16f810e9a97b00`; only its publication-status sentence was changed for this draft-PR copy. No new allegation was added.
