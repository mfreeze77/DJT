# FIRST-PASS AUDIT TRAIL: COUNTS NOT FINAL

Read CORRECTION_LOG.md and revision ledgers before use.

# Trump rhetoric toward Canada, Mexico, and their leaders

Requested window: January 20, 2025–October 12, 2026. This component covers the enumerated GovInfo presidential corpus and archived original Truth Social text supplied with the research archive. GovInfo coverage ends September 11, 2026, leaving a 31-day publication gap. Social text has a later endpoint, but untranscribed video/image content and public remarks absent from GovInfo are outside the quantitative sample.

## Main finding

Country-level and leader-level tone are quite different. Explicit Canadian-state criticism substantially exceeds favorable state references, especially on trade and sovereignty. Yet Carney is often personally praised in official remarks. Sheinbaum is also personally praised far more often than criticized. Trudeau receives the reverse pattern. Treating all remarks about a country as remarks about its current leader would hide this distinction.

The media distinction also matters: Canada's social-text treatment is much more negative than its treatment in official oral/written records. A pooled result is supplied for auditability, but source-stratified results are preferable.

## Counts and definitions

Use `canada_mexico_summary.json` for all target, country-group, source-stratum, and pooled deduplicated counts. Use `canada_mexico_official_summary.json` for original broad official counts and `canada_mexico_definition_summary.json` / `canada_mexico_social_definition_summary.json` for definition-sensitive counts.

One record × target is the unit. P=positive-only; N=negative-only; M=mixed; U=neutral; X=excluded. A record with both polarities contributes once to each any-polarity numerator and once to the denominator, never twice to its mention denominator. These are document/post frequencies, not sentence, mention, or speaking-time frequencies.

Original broad official coding, restricted to the shared base-eligible corpus:

| Target | P | N | Mixed | Neutral | Any favorable | Any critical | Mention denominator |
|---|---:|---:|---:|---:|---:|---:|---:|
| Canada-state | 19 | 60 | 21 | 80 | 40 | 81 | 180 |
| Carney | 25 | 4 | 1 | 7 | 26 | 5 | 37 |
| Trudeau | 2 | 12 | 1 | 1 | 3 | 13 | 16 |
| Mexico-state | 11 | 41 | 13 | 94 | 24 | 54 | 159 |
| Sheinbaum | 20 | 0 | 4 | 2 | 24 | 4 | 26 |

The original broad definition includes communication warmth and ceremonial expressions but keeps pure future goodwill/predictions separate where no current appraisal occurs. To harmonize any broader favorable-reference definition across research components, use the explicit favorable-expectation, communication-quality, deal-outcome, and praise-subtype fields rather than silently relabeling these as character praise.

The narrower `current_appraisal_code` removes pure communication-quality/deal-outcome, future-intention, ceremonial-only, historical, and sports-only positives. Current personal affinity remains positive. The resulting official personal counts are: Carney 21 favorable / 5 critical of 37 records; Sheinbaum 21 / 4 of 26; Trudeau 1 / 13 of 16. These still include personal character/appearance compliments where stated, and should not be read as policy endorsements. Sheinbaum's appearance/voice compliments have separate subtype flags.

Country groups are unions of state and named-leader coding within each record. Canada-group includes Canada-state, Trudeau, and Carney; Mexico-group includes Mexico-state and Sheinbaum. Thus a Carney compliment plus Trudeau criticism in the same record yields one mixed Canada-group record. Canada is already a NATO ally: never add this component to a NATO-allies total without record-level deduplication.

## Representative primary records

- [May 6, 2025 Carney meeting](https://www.govinfo.gov/content/pkg/DCPD-202500563/html/DCPD-202500563.htm): talented/good-person praise for Carney; affection for Canada; renewed statehood advocacy; dislike of Trudeau. A mixed-country case, not a uniformly hostile meeting.
- [October 7, 2025 Carney meeting](https://www.govinfo.gov/content/pkg/DCPD-202500987/html/DCPD-202500987.htm): calls Carney a world-class leader, praises Canada's improved border work, and raises trade grievances.
- [January 4, 2026 Air Force One exchange](https://www.govinfo.gov/content/pkg/DCPD-202600005/html/DCPD-202600005.htm): Sheinbaum is a terrific person but a little afraid; Mexico is described as cartel-run. Personal praise and criticism coexist.
- [January 21, 2026 Davos remarks](https://www.govinfo.gov/content/pkg/DCPD-202600046/html/DCPD-202600046.htm): Canada and Carney criticized as insufficiently grateful.
- [January 24, 2026 original account post](https://truthsocial.com/@realDonaldTrump/posts/115950424403894234): Governor Carney insult and 100% tariff threat over a China agreement.
- [February 26, 2025 Cabinet meeting](https://www.govinfo.gov/content/pkg/DCPD-202500304/html/DCPD-202500304.htm): even Trudeau receives a good-guy compliment while Trump calls him Governor and advocates Canadian statehood.

## Coding rules

- Count only Trump's own attributed speech or presidential authored/attributed statement text. Reporter questions can identify the referent of his short reply; they are not themselves Trump statements.
- Keep explicit relationship warmth separate from competence/character/conduct assessment. Pure successful-call descriptions are `communication_quality_only`; they do not become personal appraisal in the narrow definition.
- A plain tariff announcement, import relocation, geographic drug-transit mention, trade deficit, or factual policy description is neutral unless accompanied by explicit responsibility, disapproval, insult, coercive threat, or sovereignty challenge. Policy actions are not a substitute for rhetorical evidence.
- A neutral statement may describe an adverse material action. For example, withdrawing an invitation without evaluative language remains neutral rhetorical text.
- Conditional annexation/statehood advocacy is a sovereignty-negative statement, even when framed as beneficial. Compliments about what Canada would become after annexation are not current praise.
- Sarcasm is not literal praise. Governor taunts are personal/sovereignty-negative. A qualified friendly-call claim in the March 5, 2025 Trudeau post is retained as broad communication warmth and flagged as plausibly sarcastic; narrow coding removes it.
- Do not automatically transfer a leader compliment to a separate state row. The country-group union captures it without double counting. Named private citizens, a specific city's safety, and particular artifacts do not automatically generalize to the country.
- Historical military commemoration, national-team sports praise, and ceremonial courtesy are flagged for sensitivity. Past praise explicitly withdrawn (e.g., once great) is not current praise.
- Corrected social posts with identical substance count once: the two deleted March 11, 2025 predecessors map to the surviving post; the October 23 (U.S. Eastern date) Reagan-ad dollar-amount correction maps to its corrected successor. Self-reposts and third-party quoted commentary/headline-only shares are excluded.
- Exact social-to-GovInfo statement duplicates are mapped and excluded from pooled counts, while both source records remain auditable. Repeated language in genuinely distinct events remains separate.

## Review and uncertainty

Review status is `AI_semantic_review`, not human coding or inter-rater validation. Exact supporting snippets were checked against the stored primary transcript paragraphs/post text. All quote checks pass and all candidate documents/posts in the assigned target packets are accounted for. Paragraph indices are preserved in the evidence records. A reader can inspect the source text, attribution, exclusions, and ambiguous cases.

Some classifications remain judgment calls. Examples include unambiguously negative economic verbs (stole, ripped off) versus mere changes in trade; collective praise applying to named member countries; the March 5 Trudeau call's sarcasm; and implied conduct praise from Canadian purchases supporting American jobs. Sensitivity fields and original excerpts preserve these judgments rather than hiding them.

No result establishes the frequency of every public utterance in the requested period. Search-index retrieval, corpus publication lag, literal target matching, pronoun-only references without an anchor, and untranscribed social media can cause omissions. The fixed source universe supports reproducible comparisons within that universe.

## Reproduction and inventory

Run from this directory, in order:
1. `python code_canada_mexico.py`
2. `python compile_canada_mexico.py`
3. `python code_canada_social.py`
4. `python finalize_canada_social.py`
5. `python canada_mexico_praise_flags.py`
6. `python summarize_canada_mexico.py`

Primary deliverables:
- `canada_mexico_coded.json` / `.csv`: official target rows, evidence, attribution, review status, subtype flags
- `canada_mexico_social_coded.json` / `.csv`: final social target rows, provenance and duplicate mapping
- `canada_mexico_group_coded.json` / `.csv`: record-level country-group unions under both definitions
- `canada_mexico_summary.json`: official, social, and pooled deduplicated tables
- `canada_mexico_quote_qa.json`, `canada_social_qa.json`, `mexico_qa.json`, `mexico_social_final_audit.json`: QA
- `canada_mexico_evidence.json`, `canada_mexico_manual_codes.json`, `canada_social_codes_all.json`, `mexico_codes.json`, `mexico_social_codes.json`: retained component annotations and exclusions
- `mexico_report.md`: detailed Mexico/Sheinbaum component notes

Other source corpus files and provenance are supplied by the source-enumeration components of the archive.
