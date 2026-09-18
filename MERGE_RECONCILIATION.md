# Repository consolidation — September 17, 2026

Local date: America/Chicago. GitHub may display September 18 in UTC.

## Scope and protected baseline

This consolidation implements the repository owner's request to merge all branches into `main`.

The protected starting point is `bd26c11d957cf1bc874f6336e8f4271dccd07cc8`, with tree `6edd39e2c8ff5d444b1f9d66f1551b8fcf4198bd`. A recovery branch, `archive/pre-consolidation-2026-09-17`, points to that commit.

Every file already present at that starting point is retained at its original path with its original blob. In particular, Chapters 1–9, the current conclusion, the J20 tracker, financial reconciliation, claim ledgers, and existing README are not overwritten by older branches. This is a repository/history consolidation, not a new manuscript revision or external-source audit.

The captured source branches and their exact tips are recorded in [MERGE_SOURCE_BRANCHES.json](MERGE_SOURCE_BRANCHES.json). The integration commit connects those histories rather than squashing them again. Earlier PRs already recorded as merged retain their current integrated content; their old patches are not reapplied over later revisions.

## FOIA package: imported into the active root

The five additions from PR #3 / `agent/add-foia-research-tranche`, at `ee62aebda94024281fca29766a9856f7c899d6c3`, are imported without content changes:

- [Research index](Tmanch_FOIA_Index.md)
- [Request tracker](Tmanch_FOIA_Request_Tracker.csv)
- [1977–1983 tranche](Tmanch_Fin_77-83_FOIA_Tranche.md)
- [1983–1986 tranche](Tmanch_Fin_83-86_FOIA_Tranche.md)
- [Cuba 1979–1985 tranche](Tmanch_FOIA_Cuba_79-85.md)

The current README is retained rather than replaced with the older PR README. Restoring these files resolves its missing package targets. Request status, submission dates, and request numbers are unchanged; this merge does not submit any records request or represent a planned request as filed.

## Visualization: imported alongside the manuscript

The complete `trump-russia-timeline/` subtree is imported from `Visual_Timeline` at `9f01d75f6e678da76497a48ee7e89e3eefa830a0`. Its tree is preserved exactly as `62726fc70bc970ac6cc9d9cc3cd6808cb4653bbd`.

The branch's nine additional root files are retained at their original paths: the timeline and JSON-schema Markdown files, `Outline_Visual_Brainstorming.md`, `copied_files.txt`, `original_files.txt`, `environment.yml`, `simple-event-display.js`, `single-event.html`, and `single_event_test.md`.

The branch's historical move of manuscript files into `data/raw/markdown/` is resolved additively: the old input copies remain inside the visualization, but the newer root manuscript is not deleted, moved, or replaced. Those input copies and by-year data are legacy material, not automatically synchronized with the current chapters. Use [the existing financial reconciliation](Tmanch_Visual_Timeline_Financial_Reconciliation.md) when comparing financial data.

### Execution status

The source, lockfile, existing generated output, and assets are preserved as received. No package installation, build, browser test, deployment, or data regeneration is claimed by this merge. `package.json` has a placeholder `test` command that exits with failure; it is not a passing test suite. The `process-data` command points to a helper that must be checked before use. Merging the repository does not certify the application or legacy data as production-ready.

## Chapter 7 conflicts: retain current files and preserve drafts separately

PR #4 and PR #11 contain older Chapter 7 reconstructions. Their current-path versions conflict with later research on `main`. Copying them over the current chapter would reverse later edits, and concatenating their ledgers could conflate identifiers from different versions.

Resolution:

- [PR #4 archive](archive/chapter-7/pr-4/README.md) preserves its six changed files, byte-for-byte.
- [PR #11 archive](archive/chapter-7/pr-11/README.md) preserves its nine changed files, byte-for-byte, including its Russian-source annex. Its old root README is named `SOURCE_README.md` inside that archive.
- The current root Chapter 7, support files, ledgers, and source inventories remain unchanged.
- Original branch tips are retained in the merged history. This preserves access to the original layouts and all intermediate commits as well as the archived files.

The archives are not a claim that every draft proposition has been reconciled into the active manuscript. Any later promotion from a draft requires source review and an identifier crosswalk. Original relative links inside immutable archives may require the original commit context.

## Validation and limitations

Acceptance checks for this consolidation are: no modification or deletion of a baseline file; exact imported Git blob/tree identities; preservation of the captured source histories; and verification of the resulting `main` ref and PR states after merge.

This operation does not refresh the dated TLDR or source-integrity summary, independently revalidate outside citations, submit FOIA requests, create a recurring monitor, or deploy the visualization. Those activities are distinct from resolving repository branches.
