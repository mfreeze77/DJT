# Gorlane acquisition and search log — 10 October 2026

This is the actual review/acquisition boundary, not a list of successful full-content searches. Exact requested URLs, response status, raw acquisition metadata and current byte rehashes are in `gorlane_recovered_acquisitions.json`; the authoritative per-source register is `acquisition_manifest.csv`. Signed redirect query strings are not published. Hashes identify bytes, not truth.

## Recovery and baseline

Current main was inspected at4d90dbca4b6f7ad99676b7eb8c36d43b415af178. Existing open draftPR28 was preserved rather than duplicated. Its later checkpoint heada13ac85660c0293539d57ad3cde28296b8a38eb1 has treec3ec0d82c4d9fe32a7afec1a299fbdff04d1c62f. The local preimage has that exact tree, not an invented claim of matching commit identity. Ordinary runtime cloning failed DNS resolution. No GitHub write action or authenticated CLI was available in this continuation; local commits are not pushed commits.

Recovered acquisition artifacts, rather than repeating the large downloads:

| Artifact | GitHub identifier | Recovered ZIP SHA256 | Scope |
| --- | --- | --- | --- |
| Opening records |11661502097|ab4f6b92eff0e8f3c526b93318cf1a8cd24bf22aa312c6671e71c240eb0e698c|Raw ICIJ export; node pages; English/Ukrainian judgments; Talon application; initial documentation |
| Company records |11662078007|5cabd967d4a406598c121b9ca6a1a2b33a501a345a7a1ea76494de892fa2c145|Twelve UK filings, index pages and bounded ancillary responses |
| Final small records |11662915367|d94e2d76d21d29d7097836025240a301a9702793a5b449f7efcc8dc597a5edde|UK2007–2009 annual returns and limited docket/index responses |
| Prior tax-C |11656198955|00386eca825be5a823fc6f273970091ca0101bcf2ef5b92276b8e577268bffce|Selected2017parent return extracted; not a new53-PDF acquisition |

The first three ZIP digests were compared with returned GitHub artifact metadata. The tax-C digest is locally computed; the selected PDF independently matches the existing S63/TR31 manifest. This log does not claim a newly repeated comparison with an independent tax-C artifact digest.

All six requested baseline commands were rerun on the exact merged baseline, including both test files:90tests passed, none failed or skipped. Tracked-file hashes were unchanged. The legacy raw verifier independently passed six member hashes/schemas/counts and36selected records. Final-head results are recorded separately; these baseline checks are not final CI.

## Executed scope and substantive outcomes

| Search/review | Actual extent | Result and restriction |
| --- | --- | --- |
| Raw incident edges | All3,339,267relationship records tested for either endpoint in15explicit seeds |40retained;39endpoints hydrated across all five node-type files; unknown opposite endpoints not filtered out |
| Alias/original-name scan | Actualname/original_name/former_name fields wherever present; exact pattern recorded in verifier/audit |57candidates reviewed; unresolved aliases not assumed same company; irrelevant personal/address matches withheld |
| Recovered public node pages |15pages,55visible table projections, with page hashes and HTML locators |All projections matched raw rows; same ICIJ evidence family; whole Gorlane HTML hash differs from earlier logged page |
| ICIJ documentation | Reconciliation page, REST/schema page and obtained OpenAPI JSON |Inspected available fields before use; no similarity score accepted as legal identity; no protected/private API access |
| English original judgment | Relevant native reasoning and physical187,190–193images around paras902–932 |Payment roles, competing characterization and2012negotiations reviewed; executed underlying exhibits not acquired |
| Dargamo appeal | Full available recovered BAILII judgment text including permission/scope/disposition |Limited Castlerose unjust-enrichment appeal dismissed; not all Gorlane findings affirmed; sealed order unacquired |
| Ukrainian original | Full acquired official110589321text |Custody upgrade of same S73proceeding; distinguish prosecution assertions and interim judge's assessment; not final guilt |
| UK company registry | Four filing-history pages,12selected filings plus2007/2008/2009returns; targeted image coverage in document register |Pre2010Gorlane holder;2008/09date contradiction;2009/10dormant counterevidence; no actual bank flow |
| Official identifier annex | Relevant company rows in2023Annex2; native text and consequential images |Exact foreign registration leads; no local original PDF hash claimed; not certified historical foreign registry extracts |
| Cyprus Gazette | Notice5986heading and exact Quinira/Belego rows |Quinira image-read; Belego text-only after targeted screenshot failure; proposed strikeoff only |
| Ontario judgment assignment | Indexed passages from2021ONSC3077,2022ONCA73 and2023ONSC865 |Precise2019certificate/annex custody lead; direct reproduction attempts failed; annexes not obtained |
| Existing financial corpus | Exact new company/agent names checked across39root Tmanch_Fin*.md files |No new underlying connecting instrument from those hits; internal synthesis not independent proof |
| Talon application | New-name scan limited to35native-text-bearing pages; targetedimages47–48and55 |No new counterparty hit in searchable portion;994image-only pages not exhaustively searched; respondent bank-report requirement located |
| Library | Three topical searches for Gorlane/financing, MRHL–MDIassignment and2017manager/QSub/buyout |Results were prior internal patches and summaries; not independent underlying records; no claim of complete Library search |
| Tax package | Only selected106-page parent PDF; freshly reviewedimages37–39, with38supplying the new named amount |No OCR or full106-page negative search; no full6,340-page review; other schedules not allocated to manager |

Library queries were: `Gorlane Freegain Equalchance Belego Sileni Etmor purchaser sale proceeds Toronto Midland`; `Midland Resources Holding MDI June 2011 assignment debt schedule Talon`; and `Trump Toronto Hotel Management Corp 2017 QSub 2219431 2273297 buyout`. Results are locating history only. Google Drive/Dropbox contents and unreturned Library files were not inferred or claimed searched.

## Bounded failed routes and access limits

The Cyprus public-search portal returned server-error HTML, not a usable negative company search. Numeric/name searches following the official HEidentifiers did not yield the original credit/pledge instruments in the reviewed results; irrelevant numeric matches in unrelated filings/retail pages were rejected. No fee purchase, account creation or external request was made; no price is invented for unquoted registry services.

The CanLII acquisition attempt returned403 and further same-host targets were stopped. The three selected MiniCounsel direct routes returned404; web-indexed judicial text was kept at reproduction/locating status, not promoted to acquired annexes. SCC40113was an index response, not an authenticated merits disposition covering all earlier findings. Current BAILII web retrieval presented an access/challenge response; the recovered earlier artifact nevertheless contains the full relevant judgment and is separately hashed. These routes were not bypassed.

The requested historical NYC2017-3Linstruction route returned404. No substantive tax-law conclusion here relies on those unacquired instructions. The acquired Russian case-service response was a challenge/captcha, not a searched case docket; no banking record was inferred from it. The official annex and Cyprus Gazette were reviewed through the web tool, but attempts to place those original PDFs in the runtime did not yield bytes; their manifest rows contain no fabricated hashes or sizes.

No executed May2010buyer schedule, Etmor instruction/beneficiary document, original VEBfacility/charge, May5orSeptember13cash-flow exhibit, executed2012release, June2011MRHL–MDIassignment, manager trial balance/own NYC3L/election acceptance, or2017buyout consideration schedule was acquired. These are specific unclosed targets, not assumed nonexistence. No confidential SAR, private-bank access, outreach, purchase, TLS override, rate-limit bypass or merge was performed.

## Visible corrections and test updates

The earlier same-Gorlane-page-hash assertion is corrected by C86 and the reviewed delta. Atinia29-DEC-2011is acknowledged as previously selected. The tax Q12classification is justified by the newly read physical38source image; that page's form-line reference field is blank, so it is not labeled Form1120Sline19. The source's phrase is “this return,” not a substituted claim about a particular federal line. The adjacent Fortress description is not assigned to Toronto.

Two inherited test expectations change for the expanded entity/acquisition counts and the additional Q12 row. The first final run also caught a test-fixture collision: its unknown-source sentinel S99 had become the real UK charges source. That test now derives an absent source ID, asserts absence and successful mutation, and still requires rejection. No validator protection was relaxed. All90 inherited tests and their rejection controls remain. New tests supplement, rather than replace, those controls. Structural CI runs synthetic/committed-extract checks, never claims raw-export parity without the raw files, and does not acquire the source corpus.
