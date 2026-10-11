# Scoped neighborhood and identity decisions

The raw source is S59, with the exact six-member schema/hashes in `offshore_export_audit.json`. Attribution and licensing remain governed by [ICIJ_ATTRIBUTION.md](ICIJ_ATTRIBUTION.md). This file interprets the attached extracts; it is not a second independent source.

## Scope and completeness

Selection is `node_id_start IN seeds OR node_id_end IN seeds`, never a requirement that both endpoints were previously known. The15seeds are listed in `gorlane_selection_audit.json` and the verifier. All40incident relationships and all39endpoints are retained. Every available node type—entities, officers, intermediaries, addresses and others—was scanned for hydration. Officers may be companies, not human directors. Every raw relationship retains both IDs, direction, relationship type, role/link label, status, start/end dates, source dataset, CSV member and record locator.

CSV locators count records, with header1 and first data record2; they are not physical text lines when quoting/newlines intervene. `raw_fields_sha256` hashes canonical JSON field values, not the original serialized CSV row or the truth of an allegation. Full-member hashes identify the actual bytes. The raw archive stays outside the repository.

`gorlane_scope_coverage.csv` records every seed's incident count and page comparison; all55visible table projections match. A relationship repeated on two endpoint pages is counted once in the40-edge extract. `same_company_anchor_rows` identifies the Eastrade counterpart anchor and is not an additional distinct edge. Street addresses are omitted from node extracts and irrelevant personal/address substring matches are withheld in the alias review. Raw node IDs and row hashes remain for authorized reproducibility.

The name scan used the actual `name`, `original_name`, `former_name` fields wherever available and the disclosed pattern for Gorlane, MidlandResourcesHolding, all named purchasers, Eastrade, Fiduserve, Etmor and GlobalSteelInvestments. All57matches have decisions and reasons. Unresolved aliases are not newly resolved seeds and their unrelated neighborhoods were not indiscriminately traversed. This is complete first-degree coverage for the specified resolved/candidate seed set, not exhaustive legal-entity resolution across the world or all leaked documents.

## Identity decisions

| Record(s) | Decision and evidence | What is not accepted |
| --- | --- | --- |
| Gorlane entity10210594 / officer12133896 | Retain separately; exact-name, jurisdiction/context and linked Eastrade neighborhood justify a qualified candidate. S81 reports a legal Gorlane identifier under its source misspelling. | The officer record has not been certified as the legal entity or supplied a registry number by a raw row. No automatic merge. |
| Midland officer12155628 / BVI entity10088926 | Guernsey-context officer remains candidate seller context; BVI366883 is a separate record with its own historical bearer/“2146830 Ontarion Inc.” holder rows. Literal spelling retained. | No same-name legal continuity;2019Ontario judgment assignment is a transaction between separate entities, not redomiciliation evidence or certification of node10088926. |
| Equalchance12163340 /12099846 | Both raw records kept. First has2010row; second has2011and2012rows. The official annex names Equalchance with Cyprus187745. | That annex does not prove that each graph node is the same legal company or that later rows replace earlier holdings. |
| Eastrade10173628 /20025856 | Explicit same_company_as row1289949; matching01-SEP-1994 incorporation and25856B/25,856B identifiers after comma normalization. S81 reports25856B for named BahamasEastrade. | Within-dataset concordance is not a fresh Bahamas certificate, legal beneficial-ownership audit or proof of cash movement. |
| GlobalSteel UK05188128 / Seychelles10018466 | UK original filings establish the reviewed company; source annex5188128 is normalized by adding the known UK leading zero. Seychelles raw022113 is a different jurisdiction/identifier and excluded from the UK join. | Similar name does not establish redomiciliation, nominee relationship or common assets. |
| FIDUSERVE CORPORATE SERIVCES LTD11003807 | Preserve the source's SERIVCES spelling. Eight incident service edges supply potential records-custodian targets. Variants remain custody candidates only. | Shared agent/address is not evidence of a shared enterprise, funding pool or beneficial control. No speculative second-degree client-to-client financial path. |
| Belego12141123;Parborio12159818;Sileni12167368;Atinia12205452;Quinira12121184;Freegain12146270 | All incident relationships reviewed. Official Cyprus identifiers are attached where available with source-specific limits. Parborio/Atinia certified registry identifiers remain open. | None is upgraded to an executed buyer schedule or proven funding contribution. In particular, no three-buyer mapping by elimination. |

Other same-name Midland officers and provider variants remain unresolved or custody-only, with record-specific reasons in `gorlane_alias_review.csv`. Unrelated substring matches are rejected; absence of an accepted match is not proof the legal company never existed.

## Time-aware interpretation

The ownership file preserves11literal Gorlane shareholder rows. Midland's end23-MAY-2010 and the five starts on that date are database relationship dates. They are not the19May court-described payment date. The17May Eastrade relationship,19May payment and23May rows are not combined into a single maneuver. The2011Equalchance/Atinia and2012Equalchance/Quinira/Freegain rows are considered separately. Percentages are unknown; blank ends do not mean present ownership, and parallel rows do not prove replacement.

Second-degree documentary follow-through was justified by particular questions: original UK GlobalSteel shareholder filings test the alleged subsidiary leg; the official annex supplies legal registry identifiers; the Cyprus Gazette checks two exact named identifiers; English and Ontario court references identify potential instrument custodians. No indiscriminate service-hub graph expansion was treated as financial evidence.

## Reproduction

```
python research/veb_a7_2026/verify_offshore_extract.py /path/to/extracted/full-oldb
python research/veb_a7_2026/verify_gorlane_neighborhood.py /path/to/extracted/full-oldb
python -B research/veb_a7_2026/test_gorlane_neighborhood.py
node --test research/veb_a7_2026/gorlane_review.test.mjs
```

The first two require the actual exact snapshot and are not run by structural CI. Synthetic selection tests do not claim possession of it. The live-page comparison records acquired page hashes and literal field mappings; it is not a claim about future live changes. The raw/parity result validates coverage and preservation, not historical truth.
