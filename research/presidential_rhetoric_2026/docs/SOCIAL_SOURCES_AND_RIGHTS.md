# Trump social archive: snapshot and coverage

Snapshot cutoff: 2026-10-12 03:12 UTC. Term starts 2025-01-20 17:00 UTC (noon in Washington). Dates used for event comparisons are America/New_York; UTC timestamps are also retained. October 12 is a partial UTC day and the most recent post is October 11 locally.

## Enumerated sources

- CNN-hosted archive: https://ix.cnn.io/data/truth-social/truth_archive.json . A public JSON export preserving original post IDs, timestamps, HTML text, original URLs, and media URLs. 12,142 in-term records at this snapshot. Provenance: https://github.com/stiles/trump-truth-social-archive says the older GitHub workflow was discontinued October 26, 2025 and directs readers to the five-minute CNN export.
- Roll Call / Factba.se: https://rollcall.com/factbase/topic/assets/ . Its public page requests `/wp-json/factbase/v1/twitter?platform=truth+social&sort=date&sort_order=desc&page=N&format=json`. Pages 1–260 were enumerated in descending order until crossing the start boundary; 12,846 in-term Truth IDs were captured. This source supplies explicit repost/quote IDs and flags, deletion flags, and both account text and archive media fields. The date-filter parameters in the public UI were ignored by the endpoint during this retrieval, so date restrictions were applied locally. Every requested page in the selected range was retrieved. The source's current index is not proof that every original platform post was captured.
- American Presidency Project: https://www.presidency.ucsb.edu/documents/app-attributes/truth-social?items_per_page=60 . All 12 index pages were enumerated; all 625 consecutive calendar-date pages from January 20, 2025 through October 6, 2026 were downloaded. Two explicitly report no posts (December 29, 2025; July 18, 2026). Parsed rows yield 10,180 unique in-term IDs. Seventeen duplicate row IDs exist and are flagged. Daily pages retain original Truth links. Their image descriptions and editorial text are not Trump-authored words.
- X: Roll Call pages 1–4 include the complete available in-term slice before reaching pre-inauguration posts. 145 IDs appear on January 20 or later; two pre-noon January 20 records were excluded, leaving 143. All 145 were independently reproduced by SuperTrumpTracker's three filtered pages, https://supertrumptracker.com/?limit=60&page=1&platform=X&from=2025-01-20&to=2026-10-12 . The latest indexed X post is February 2, 2026. This corroboration does not establish independent collection provenance or prove that no later X posts exist. X coverage after that date is unverified.

The union is 12,855 Truth IDs plus 143 X IDs: 12,998 platform records. The Truth union adds 713 IDs to CNN alone. Four APP-only IDs lack a corroborating account-text source; they are preserved as editorial candidates and excluded from authored-text analysis.

## Important limits

This is an enumerated source-corpus archive, not a certified archive of all Trump statements or all social activity. Current archive pages may miss deletions, edits, or collection outages. The X gap prevents a full-platform frequency claim. No authenticated account export was obtained. Only the realDonaldTrump account is included: POTUS, WhiteHouse, campaign/team accounts are not independently exhaustively archived here.

3,723 union records are media-only. Embedded videos, screenshots, image statements, and linked articles were not exhaustively transcribed or read. Some may contain Trump's own additional words. Search packets cover literal account text; they cannot support claims about all spoken words in shared media. A shared headline, a quote from another speaker, and a repost are not automatically Trump's authored assertion. Explicit reposts are excluded from authored candidates, and quote references are separated, but manual attribution review remains required for the remaining candidates.

All post IDs are strings to avoid numeric precision loss. Raw source payloads are retained privately for verification. Source timestamps are preferred; four APP-only timestamps are explicitly derived from Truth's snowflake ID with the daily archive date as corroboration. Post dates can differ from APP's Pacific-date page labels.

## Deduplication

A record exists for each platform ID, even when its text repeats elsewhere. Explicit repost IDs and quote IDs are retained. Normalized exact texts longer than 60 characters are clustered; exact repeats within 24 hours are marked with the earliest record ID as duplicate_of. This is an analysis convention, not a claim the platform deleted them. Repetitions on different dates are preserved. Cross-platform exact matches use the same rule. DCPD textual overlaps are candidates for event-level deduplication, not automatically removed. Text similarity is punctuation/case/URL-normalized; no sentiment scoring uses keyword counts.

## Verification

The named criticism posts of April 24, April 26, May 25 and May 27, 2025 match the original IDs and text displayed by APP and the CNN/Roll Call archives. The February 12 statement also matches DCPD-202500257. Original Truth URLs were opened and returned a JavaScript-only shell; an original X URL returned HTTP 403. No login, security bypass, or restricted endpoint was used.

## Rights and publication

The portable social manifest contains identifiers, URLs, counts and provenance, without post-text or media payload fields. Separate analytical annotation files contain selected evidence quotations and review decisions; some short quotations can encompass a complete short post. Raw third-party archive compilations, their full editorial annotations and media are not bundled. Government-origin statements, archive editorial work, privately authored quotations, and third-party media can have different rights. No blanket public-domain or redistribution-license claim is made for the compilation or evidence quotations.

The Stiles GitHub repository has a CC0-1.0 file at https://github.com/stiles/trump-truth-social-archive/blob/main/LICENSE . It does not establish rights over all quoted posts/media or necessarily license the later CNN output. APP displays its copyright notice and links https://www.ucsb.edu/terms-of-use ; those terms restrict republication of site materials absent permission, with a personal-download exception. No general redistribution license was verified for Roll Call, CNN's migrated dataset, or SuperTrumpTracker. The raw research cache should remain untracked until publication permissions are resolved.

## Reproducing the retrieval

The scripts use a local `.cache/social` directory, ignored by Git. Set SOCIAL_DATA_DIR to use another private cache. They require Python 3 and lxml. Run, in order:

1. python scripts/social/fetch_initial.py
2. python scripts/social/build_social.py
3. python scripts/social/fetch_rollcall.py
4. python scripts/social/normalize_social.py

Set DCPD_RECORDS_DIR to the separately generated GovInfo per-document JSON directory to regenerate cross-source overlap candidates. The default snapshot cutoffs are in normalize_social.py. Public sources can add, edit, or delete records, so a later retrieval need not reproduce the archived counts; do not label a later fetch as the original snapshot. The generated text-free index is written to the cache's portable/ folder for explicit review before copying into a repository. Existing manifest and coverage files here describe the completed October 12 snapshot. The optional validation script expects the separately hand-coded Putin files as well as source data; automated core corpus validation can be separated from that final disposition assertion.
