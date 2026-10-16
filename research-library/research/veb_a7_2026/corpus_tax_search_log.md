# PR27 corpus/tax search and acquisition log

Research cutoff: October 9, 2026 US Central / October 10 UTC. This records actions performed, not intended future searches. The interrupted run had already opened PR27 from main `0c95a950f815be6519b0df479cf0dc325e2c5ee3`. The continuation inspected its checkpoint/workflow and recovered artifacts rather than creating a duplicate branch.

## Repository and Library coverage

- Current-main archive, source-integrity rules, current accounting/custody/research deltas and all evidence ledgers were available. Financial inventory/methodology, Chapter4 source/counterevidence material and Programs22/25 supplied the controlling distinctions. No `AGENTS.md` was found in the acquired tree.
- Discovered every `Tmanch_Fin*.md` path in the archive: 39 files, 11 PP/pp variants, 5,491 total lines. Full text was searched for entity/financial/offshore/tax terms and all `/nodes/<ID>` citations. Relevant surrounding passages and the cited raw-node records were examined. Every historical allegation and external link was NOT independently audited.
- The initial checkpoint's 38-file count was an error; the exact 39 paths and hashes in `corpus_coverage.csv` control. No original narrative was silently rewritten.
- The 16 unique cited ICIJ IDs were retrieved from the raw export. The 184 count is citation occurrences, not 184 distinct corroborations. `offshore_node_review.csv` records classifications and actual CSV record locators (header is record1; first data record2; embedded CSV line breaks do not change record numbering).
- Two scoped Library searches used combinations of Midland Resources Holding, Shnaider, Toronto, Gorlane, Panama Papers, Offshore Leaks, `Tmanch_Fin_90-93_PP`, `Tmanch_Fin_77-83_PP`, `nodes-entities.csv`, `relationships.csv`, and `full-oldb`. Returned material was research discussion/handoffs/generated patches, not a verified earlier raw cache. Results were ranked/partial; this is not an exhaustive all-Library absence finding.
- `rinfo.json` was integrity-checked only. Its referenced documents were not acquired. No Google Drive, Dropbox or other storage collection was searched; no claim that those places lack documents.

## Raw ICIJ export actually processed

Obtained the publisher's `full-oldb.LATEST.zip`; generation marker `GENERATED_ON_20260909.txt`. The entire five node files were parsed and name-field queries applied; all relationship records were scanned for selected endpoints. Exact cited IDs were retrieved regardless of name hits. Original field names, dates, sourceID and valid_until are preserved. Graph expansion was bounded to target nodes and selected counterparties, not an attempt to enlarge an association graph.

| CSV | Data records parsed |
|---|---:|
| nodes-addresses.csv | 402246 |
| nodes-entities.csv | 814344 |
| nodes-intermediaries.csv | 26768 |
| nodes-officers.csv | 771315 |
| nodes-others.csv | 2989 |
| relationships.csv | 3339267 |

The exact regexes are in `offshore_export_audit.json`. This name-field search did not exhaust every former-name, address or alias field. It did not search the underlying leaked correspondence, bank records or confidential SARs. Per-source historical coverage sharply limits no-hit interpretation, especially for A7's 2024 formation. The selected rows can be checked against an independently acquired matching export using `verify_offshore_extract.py`; no raw personal-address collection is committed.

## New public-record leads followed

1. The Gorlane shareholder transition was checked against ICIJ's public node page and the official National Archives text of `[2020] EWHC1844 (Comm)`. Full native HTML was obtained; substantive review centered on paragraphs56 and902–932. That is not an exhaustive legal review of all1,105 paragraphs.
2. The official 2021 appeal index was acquired. A later BAILII search returned a cached excerpt for `[2021] EWCA Civ1149` (paragraph7 describes a limited unjust-enrichment appeal); a direct open/find returned an access-challenge page. Full appellate disposition was not authenticated and no blanket claim of finality is made.
3. A YouControl reproduction of Ukrainian ruling110589321, April21,2023, was read for the prosecutor's stated Cyprus-credit/pledge evidence and procedural context. The ordinary acquisition returned403; no hash is assigned. No underlying certified Cyprus filings or bank advances were obtained.
4. Exact source review corrected the earlier tendency to treat VEB as purchaser. The new judicial account distinguishes buyers, payment agent, benefited obligor and financing association. Parborio is not presumed to be the recipient bank account of the105.825m payment.
5. JCF's June27,2017 first-party announcement was retrieved. It confirms a buyout agreement but omits consideration and allocation. No press estimate was substituted for a settlement schedule.

## Tax-release acquisition and review

The CREW index, Lawfare release page, Commons index/routes, JCT staff report, Ways and Means report, and historical IRS2017 instructions were consulted. Historic House routes and several large browser PDF opens failed. Ordinary public mirrors and bounded, read-only GitHub Actions downloads were used; downloaded content was not executed. The artifact acquisitions are manifest-linked, not inferred from file names.

There are53 acquired return PDF payloads:51 unique CREW URLs plus2 Commons counterparts. They total6340 physical pages including overlap. All were measured for page count and native text; the native extraction produced no usable searchable text. Most pages remain unreviewed. No statement that Toronto or an amount is absent throughout the corpus follows from that measurement.

Focused visual review:
- 2017 amended DJT Holdings Managing Member1120S: cover and selected ownership/tax-income statements, especially physical1,8–9,43,46; all106 pages were thumbnail-navigated, not all read substantively.
- 2016 parent1120S: physical1–2 and7–8; partial thumbnail navigation.
- 2018 parent1120S: physical1 and8–9; partial thumbnails.
- 2017 individual part1: cover and ScheduleE name/type columns at38–39 with neighboring navigation. No unsupported joins to numeric columns.
- Mislabelled2016-3b and Commons2017-3: selected statement headings and sampled boundary comparisons. Full-file equivalence is NOT claimed.
- Ways and Means physical21–22 and25: scope, entity-reporting description and audit-file limits. JCT scope/native text reviewed; neither report is a final determination of every tax question.

`return_inventory.csv` is the page/part-level coverage control. Blank verified-filer/year/form fields mean unverified, not an assumed match to a mirror label. The timestamp in an acquisition record is retrieval time, not tax year or filing date. Current scripts/templates were not applied retroactively: the IRS instructions used are the historical2017 versions.

No targeted OCR was necessary to read the selected decisive pages; OCR of the full corpus was not performed. A targeted query for later legitimate public return releases did not produce an additional authenticated collection in this pass. This is not a categorical assertion that none exists.

## Failures and controls

The manifest preserves missing/blocked official and mirror routes, native-text failure and selective review. A fresh browser retry of the2017 parentPDF returned a content-length error at26,937,628 bytes; the actual bytes had already been obtained through the separate lawful acquisition. The same URL therefore has different access results by tool, not a contradiction about existence.

A7 issuer ZIPs, MRHL/MDI deed, note-specific Aragon contracts, actual Toronto fee allocation, Etmor bank beneficiary, and original VEB facilities remain missing. They were not silently supplied by the newly acquired tax corpus. No outreach, purchase, unredacted taxpayer identifier publication, access-control bypass, TLS override or SAR request occurred. Diesel/ICC and unrelated influence leads were not expanded.
