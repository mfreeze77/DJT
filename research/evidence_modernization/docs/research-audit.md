# Research modernization: source-bound audit

## Scope and conclusion

This audit examines the committed DJT tree at **`d5f1b11a0500d5d577f4553d7e6d13a0aa69e494`** against the attached modernization proposal. It assesses the repository's data, source custody, interpretations and software consumers. It does not independently authenticate historical allegations, conduct new financial or legal research, or incorporate unmerged PR contents. File and line references below refer to that commit, before the modernization files were added.

**The first implementation should preserve and reconcile the existing research, then produce a review package with explicit publication blockers.** The repository already contains substantial evidence discipline. Its legacy visualization does not apply that discipline, and acquisition metadata frequently describes documents absent from the committed tree. An automatic conversion from a ledger's confidence label to an approved factual scene would therefore be a regression.

The Chapter 4 / 2010-2011 / Gorlane-Toronto pilot is a strong acceptance case precisely because it contains conflicting legacy claims, source dependencies, corrections, different legal entities, incompatible financial measures and three retained source-page derivatives. It is not a basis for automatically certifying the entire narrative as publication-ready.

## 1. What is actually present

Counts below are file and record inventories, not counts of verified historical facts or independent confirmations.

| Collection | Observed scope at the audit commit | Meaning for migration |
| --- | ---: | --- |
| Annual JSON in `trump-russia-timeline/data/processed/by-year` | 43 files, 1971-2015 | Account for all files. Within this span, 1974 and 1976 have no annual file; this is a file-coverage observation, not evidence that nothing occurred. |
| Records in those annual files | 169 events; 247 entity occurrences; 129 relationships; 81 transactions; 5 intelligence activities | Preserve occurrences before resolving identities. A repeated entity is not automatically another person or automatically the same person. |
| Event money-flow objects | 118 events | A display amount is not automatically a payment or a contribution to a financial total. |
| Top-level metadata outside the common five collections | `1988.json` also has `era: "era-002"` and an empty `mediaUrls` list | Preserve the document envelope. Do not treat the seven characters of `era-002` as seven records or silently drop the field. |
| Current chapter claim ledgers | 351 post-header CSV records across Chapters 1-9, including one blank CH7 record | There are 350 populated records; 337 have the expected width. Nine different column layouts require explicit adapters and malformed-row quarantine. |
| Root `Tmanch_Fin*` files | 39 | Narrative sources need fingerprinting and explicit dispositions, not an assumption that every file is a unique finding. |
| `data/raw/markdown/*.md` | 59 | These include historical copies and an index. Compare bytes and provenance before deduplication. |
| `research/veb_a7_2026` main ledgers | 105 sources; 86 claims; 41 relationships; 38 crosswalk entities; 22 transactions; 181 acquisition rows | Reuse existing IDs, limits and cross-references within their source collection. |
| Other structured VEB/Gorlane evidence | 31 accounting rows; 53 return entries; 55 corpus entries; 17 cash/obligation rows; 12 purchaser-role rows | These are different record types, not additional cash transfers. |
| Original PDF files tracked by Git | **0** | A current clone cannot independently reopen the PDFs named by the manifests. |
| Retained research-page PNGs | **3** | Usable as explicitly identified derivatives with provenance; their parent PDF files remain absent. |

Reproduction: enumerate tracked files with `git ls-files -z`; parse each annual file as JSON; count collection occurrences; parse the named CSVs with a real CSV reader. `rinfo.json` is a separate filename metadata inventory. Its existing audit counts 44,496 file-valued leaves and expressly states that the referenced documents were not obtained or searched (`research/veb_a7_2026/audit_rinfo.mjs`; `rinfo_audit.json`). These leaves must not become thousands of acquired source versions.

## 2. Critical gaps in ingestion and the legacy consumer

### 2.0 Existing CSVs contain malformed records

The inventory's raw CSV-width audit finds **32 malformed records: 31 in active inputs and one in an archived payoff ledger**. In the current chapter claim ledgers, CH4 has seven oversized records, CH5 has one undersized record, and CH7 has five oversized records plus a blank record. The active CH7 J20 event ledger contributes another 17 width errors. This is an ingestion defect already present in the research files, not merely a future schema-design concern.

For example, CH4 logical CSV records 10, 14, 25, 26, 36, 38 and 40 have 18-20 cells under a 16-column header. A plain `csv.DictReader` does not reject these rows: it stores overflow cells under a null key and skips blank rows. Treating its output as a clean claim would risk shifted fields or dropped context. The original 350-row populated-claim count therefore must not be reported as 350 structurally valid claims.

The importer should preserve each raw record and exact cell sequence, record its source span/hash and expected/actual width, and quarantine it for repair rather than guessing the intended placement. The implementation inventory reconciles **337 well-formed chapter claims + 169 annual events + 86 VEB claims = 592 imported claim assertions**; the other active malformed records remain explicitly accounted for. A quoted-comma correction requires editorial/source review, not silent truncation or a parser that accepts the wrong shape.

### 2.1 IDs are ambiguous well beyond the example in the proposal

Across the annual files, **45 event-ID groups** repeat. The familiar `2010:event-074` / `2011:event-074` collision is one of many; the former concerns Chicago and the latter Tevfik Arif. The audit also finds 47 repeated entity-ID groups, 16 repeated relationship-ID groups, 5 repeated transaction-ID groups and 1 repeated intelligence-activity-ID group. Those counts identify groups of reused keys, not proven duplicate facts.

The inventory distinguishes **all key reuse** (`local_id_reuse`) from **identity-review candidates** (`local_id_collisions`). The latter flags changed identity signatures or multiple occurrences within one source file. For entities, the signature is the recorded `(name, type)` pair. Therefore **47 reused entity-ID groups produce 39 identity-review candidate groups**. The other eight groups have the same name/type signature across different files; six still differ in other payload fields and two have identical complete payloads. None is automatically merged. Across all five record types there are 114 reused-key groups and 106 candidate collision groups; the eight-group difference is entirely among entities.

Some entity key reuse is clearly unsafe for identity resolution: `entity-013` is used for Roy Cohn and Yuri Dubinin; `entity-016` for the KGB and New York state/city; `entity-032` for Nabila/Trump Princess, UBS Private Banking Deutschland AG and Vera Coking. Other name differences, such as Fred Trump / Fred C. Trump, could be aliases and still require an explicit decision.

Both loader implementations merge entity maps by overwriting earlier keys (`src/js/main.js:183-186`; `src/utils/dataLoader.js:123-126`). The latter also indexes events solely by `event.id` (`dataLoader.js:158-162`). A path-scoped origin key and record pointer are therefore essential; normalizing only the two example events would leave the broader problem intact.

### 2.2 There are two active loading paths

The webpack entry is `src/index.js`, which imports `src/js/main.js` (`index.js:33-34`). Main explicitly lists the 43 years ending in 2015 and appends their data (`main.js:148-205`). The visualization components also use the shared `DataLoader`: for example, the money counter calls `dataLoader.initialize()` and `getFinancialData()` (`components/moneyCounter.js:53-69`).

`DataLoader` first tries `complete_dataset.json`, then attempts to parse the descriptive `json_schema.json`, then requests every year from 1971 to the current year (`dataLoader.js:46-109`). It catches and continues past individual failures. Its final no-data branch calls `createDummyData()`, but that method is not defined in the file. Consequently, the documented fallback is itself an error path.

The modernized consumer must select one compiled, versioned input package. Merely adding a complete dataset for one loader or adding later years to one list would leave inconsistent behavior in the other path.

### 2.3 Corrections exist but are not connected to display

`research/veb_a7_2026/legacy_event_interpretations.json:4` explicitly says that consumers must opt in. Neither active frontend path references that sidecar. The existing timeline formats a nonzero `moneyFlow.amount` as money to or from Trump based only on the direction flag (`components/timeline.js:150-154,243-249`). It does not consult the sidecar or the financial ledger.

The current file `2010.json:217-229` retains the disputed USD15 million `to-trump` object. `2011.json:373-385` retains an unsupported USD100 million `to-trump` object. The 2010 relationship `relationship-veb-shnaider-trump` is still marked `confirmed` (`2010.json:558-569`). These objects are preserved historical inputs, not the controlling interpretation. A correction-aware event projection must also address affected relationship descriptions and entity descriptions before the whole graph can be represented as corrected.

The existing sidecar has four entries, two of which are explicitly `outside_scope`. **`outside_scope` and `no_change` mean no decision by that review, not approval of the original event.** The modernization should preserve that distinction.

### 2.4 Financial summation has no evidence or measurement boundary

The old financial loader chooses recipient/sender `entity-001` and sums raw `amount` values (`dataLoader.js:355-372`). It does not enforce currency, financial measure, verified receipt, directness, source availability, overlap groups or correction status. A record can therefore be counted because of its shape even when its amount describes a debt, purchase price, security face or a disputed report.

The root financial ledger already has better dimensions: `Amount_Type`, `Directness`, `Evidence_Status`, two separate inclusion flags and `Overlap_Group`. Row RF-014 expressly excludes the disputed USD15 million from both totals. The newer crosswalk and reconciliation ledgers deliberately exclude every row from financial totals. These decisions must survive ingestion unchanged; creating a new total requires a separately defined and reviewed aggregation rule.

### 2.5 The old schema file is documentation

`data/processed/json_schema.json:4-23` includes comments and tokens such as `1-10`, `number` and `boolean`, followed by Markdown fences and additional example sections. It is neither valid JSON nor executable JSON Schema. Preserve it as a historical design document and introduce actual schemas in the new package. Treating its parsing failure as evidence that an annual data file is corrupt would be a misclassification.

### 2.6 Acquisition claims do not establish present file custody

`gorlane_document_review.csv` names 20 PDF documents, their expected hashes, sizes and reviewed portions. None of those filenames exists as a tracked PDF at this commit. The committed delivery ZIP contains 74 members but no PDFs or HTML source pages. The three review PNGs are the only retained research images.

The distinction is also explicit in the workflow design. `.github/workflows/gorlane-final-records.yml:18,48,56-61` downloads source files into runner temporary storage and uploads a three-day-retention artifact; it does not commit those sources. Historical `runtime_present: true` fields in `gorlane_recovered_acquisitions.json` refer to the recorded acquisition runtime and must not be read as a statement about the present clone.

Accordingly, a source-version adapter needs separate fields or records for **reported historical acquisition** and **currently available, rehashed bytes**. A syntactically valid SHA256 in a CSV is valuable provenance metadata, but cannot by itself satisfy the latter state.

## 3. Existing protections that should be reused

| Existing protection | Source location | What it already enforces | What it does not establish |
| --- | --- | --- | --- |
| Strict CSV parsing | `validate_evidence.mjs:15-49` | Quoted commas/newlines, escaped quotes, BOM/CRLF; rejects malformed quotes, duplicate headers and row-width drift | Historical truth of cell contents |
| Source references and limitations | `validate_evidence.mjs:73-94` | Source IDs, HTTPS URLs, locators, independence notes and linked limitations | That each external URL is accessible or has been freshly reviewed |
| Legacy interpretation protection | `validate_evidence.mjs:95-152` | Composite keys; exact preserved money-flow snapshots; RF-014 exclusions; unresolved local IDs cannot silently drift | Frontend application of those rules |
| Typed transaction boundaries | `validate_followup.mjs:44-70` | Categories; referenced entities and claims; no inclusion in totals; unknown amounts remain blank; assignments/contracts/holdings do not become receipts | Complete accounting or settlement reconstruction |
| Note reconciliation | `validate_followup.mjs:71-81` | Thirteen serials, separate USD face and RUB carrying measures, exact arithmetic | Identity of the unresolved issuer or actual repayment |
| Acquisition metadata | `validate_followup.mjs:82-93` | Valid states, hashes and sizes for historical `bytes_obtained`; no fabricated hash for unacquired entries | Current possession or original-document authentication |
| Accounting and tax scope | `validate_accounting.mjs:14-62`; `validate_corpus_tax.mjs:39-67,87-119` | Incompatible measures remain separate; no invented remitter/recipient; no bank match; tax year versus filing year; original/amended distinction; missing values remain unknown | A reconciliation of tax income to cash or its funding source |
| Identity and raw row boundaries | `validate_corpus_tax.mjs:68-85`; `gorlane_review.test.mjs:28-64` | No name-only merges; source dataset and raw row identity; separately preserved Equalchance and Midland nodes | Ultimate ownership or legal identity solely from graph matches |
| Source-specific regression coverage | `gorlane_review.test.mjs:65-125` | Payment agent versus obligor; UK date conflict; dormant-account limits; appellate scope; distinct tax amounts; no new A7 payment path | Whole-source review or bank-level confirmation |
| CI scope and read-only assurance | `.github/workflows/veb-a7-evidence.yml` | Pinned checkout of the reviewed head; structural gates; tests; no mutation of tracked files | Modernization-wide validation unless the new workflow explicitly adds it |

These are deliberately conservative controls, not obsolete tests to be removed once a generic schema exists. Keep them as inherited gates and add general contract/graph/coverage checks beside them. Where they pin counts, changing a source collection should trigger a deliberate source review and an explicit test update.

## 4. Import mappings and ambiguity rules

### Chapter claim ledgers

Each chapter's first CSV row is the exact schema authority for its importer. Import the full original row and maintain a field mapping; never discard columns merely because a downstream view does not use them yet.

| Chapter / rows | Claim text | Evidence classification | Source material | Dates and scope | Context that must accompany the claim |
| --- | --- | --- | --- | --- | --- |
| CH1 / 30 | `Exact_Claim` | `Evidence_Classification` | `Supporting_Evidence` | `Timeframe` | `New_Expansion`, `Counterevidence_or_Limit`, `Additional_Record_Needed` |
| CH2 / 35 | `Exact_Claim` | `Evidence_Status` | `Source_IDs`, `Supporting_Evidence` | `Relevant_Dates`, `Current_Section`, `People_Entities` | `Counterevidence_or_Limit`, `Recommended_Wording`, `Open_Record_Need` |
| CH3 / 38 | `Exact_Claim` | `Source_Tier`, `Evidence_Status` | `Supporting_Evidence` | `Relevant_Dates`, `Current_Section`, `People_and_Entities` | `Counterevidence_or_Limit`, `Recommended_Wording`, `Open_Question`, `Additional_Record_Needed` |
| CH4 / 40 | `Exact_Claim` | `Evidence_Status` | `Source_IDs`, `Supporting_Evidence` | `Relevant_Dates`, `Current_File`, `Current_Section`, `People`, `Entities` | `Counterevidence`, `Alternative_Explanation`, `Recommended_Wording`, `Open_Question`, `Additional_Record_Needed` |
| CH5 / 55 | `Exact_Claim` | `Evidence_Class` | `Supporting_Evidence` | `Relevant_Dates`, `Current_Section`, `People`, `Entities` | `Counterevidence`, `What_It_Proves`, `What_It_Does_Not_Prove`, `Recommended_Wording`, `Open_Question`, `Records_Needed` |
| CH6 / 44 | `Claim` | `Evidence_Status` | `Primary_Source`, `Supporting_Evidence` | `Period` | `Counterevidence_or_Limit`, `Open_Question`, `Additional_Record_Needed`, `Recommended_Wording` |
| CH7 / 86 raw records, 85 populated | `Exact_Claim` | `Source_Class`, `Evidence_Status` | `Supporting_Evidence` | `Relevant_Date`, `Section` | `Counterevidence_or_Alternative`, `Recommended_Wording`, `Missing_Record`, `FOIA_or_Record_Target` |
| CH8 / 12 | `Claim` | `Evidence_Status` | `Controlling_Source` | `Section` | `Key_Limitation` |
| CH9 / 11 | `Claim` | `Evidence_Status` | `Controlling_Source` | `Section` | `Key_Limitation` |

All nine use `Claim_ID`. CH1-CH7 also have `Confidence_0_to_100`; preserve it as the original researcher's assessment, not a calibrated probability or machine-issued publication approval. Row counts in this mapping table describe raw input scope and include malformed records; only width-validated records can receive the named-field mapping. Source ID spellings are not uniform: for example, the malformed CH4 logical record 40 contains `PS4-001 through PS4-022`, whereas many rows use semicolon-delimited IDs. After structural repair, an adapter may record a candidate expansion, but must retain the literal and report unresolved references instead of silently asserting that every source supports every subclaim.

Dates such as `2001-2014`, `1996;2013`, partial years and source-specific date literals require a temporal parsing state. Preserve the original literal and distinguish occurrence date, document date, filing date, retrieval time and assessment time. An absent day must not become an observed January 1 event.

### VEB/Gorlane records and source inventories

| Input | Core mapping | Preservation rule |
| --- | --- | --- |
| `claims.csv` | `claim_id` -> scoped origin identity; `claim` -> imported assertion; `status` -> inherited assessment; `source_ids` -> references | Import `counterevidence_or_limit` and `proof_needed` as mandatory claim context. None of these fields alone establishes acceptance. |
| `sources.csv` | `source_id`, publisher/title/date/URL/locator -> source reference; `independence_note` -> dependency context | A source reference is not an acquired source version. Dates are literal strings and may describe retrieval or an export marker. |
| `acquisition_manifest.csv` | `manifest_id` -> acquisition observation; source IDs/URL/date/status/hash/size -> recorded acquisition metadata | Several versions or attempts may cite the same source. Preserve each attempt, `dependency_chain`, `review_scope` and `limitation`; rehash local bytes separately. |
| `entity_crosswalk.csv` | `entity_id`, `original_name`, `kind`, `identifiers` -> scoped candidate entity/identity evidence | Retain `identity_limit`; identifiers need issuing namespace, jurisdiction and a literal form before automatic matching is safe. |
| `relationships.csv` | `edge_id` plus original endpoint fields and classification -> relationship assertion | Endpoint names are source assertions, not guaranteed foreign keys to the new entity table. Keep limitations and evidence references. |
| `transaction_crosswalk.csv` | Type/date/amount/currency/source/claim IDs -> financial observation | Preserve category and exclusion. In T22, `to_entity_id=N26` means the benefited obligor Parborio, not a verified recipient account. Use the role matrix to model that distinction. |
| `gorlane_purchaser_roles.csv` | Separate provider, transmitting agent, benefited obligor and ultimate payee fields | Preserve `missing_proof`; unnamed buyers cannot be filled by subtracting known names from an ownership list. |
| Accounting, tax and cash/obligation CSVs | Measurement-bearing observations with period, source locator, amount and currency | Preserve blank amounts as unknown; keep totals exclusions, overlap and bank-match states. Do not derive cash from differences between unlike measures. |
| Source inventory Markdown | Section-scoped reference + full section text | Preserve headings, URLs, supports/does-not-support text and acquisition targets. A prose summary is not an exact excerpt of the external document. |
| Raw ICIJ-derived reviews | Source dataset, CSV member/row, raw-field hash, node/edge type | Keep distinct nodes and dated records until an identity decision explicitly resolves them. A graph relationship is not a payment. |

For annual data, derive an origin identity from repository + source path + record kind + local key/pointer. Preserve the original JSON object and unknown fields verbatim in the migration representation. The source revision and bytes hash establish the input snapshot. The canonical identity, assessment and story membership remain separate records that can change without rewriting that input history.

## 5. Concrete pilot selection

The following are source-bound *import candidates*. Their historical status is quoted or paraphrased from the repository, not newly verified here. Every row needs an explicit disposition, and disputed/unsupported rows are valuable regression cases rather than items to silently omit.

| Pilot candidate | Exact repository anchor | Source references / external locator already recorded | Controlling treatment |
| --- | --- | --- | --- |
| Chapter 4 Toronto proposition | `Tmanch_CH4_claim_ledger.csv:27`, `CH4-TORONTO-VEB-026`; `Tmanch_CH4_primary_sources.md:150-156` | PS4-016, a summary of WSJ reporting | Preserve conflict, initial account and withdrawal. This is a lead about an indirect project pathway, not a verified direct loan/payment. |
| Legacy disputed USD15m | `2010.json:217-249`; sidecar entry `2010:event-081`; RF-014 | S05/S06/S07/S29; Congressional Record H4293-H4294, PDF pp67-68; archived WSJ pp1,3-4 | Exclude from financial totals and factual payment animation; display the controlling withdrawn/unconfirmed assessment. |
| Legacy unsupported USD100m | `2011.json:373-412`; sidecar entry `2011:event-076` | S07/S16 | Preserve original assertion, mark unsupported amount; no invented replacement amount. |
| Same local event ID, different occurrences | `2010.json:4`; `2011.json:304`; sidecar `2010:event-074` / `2011:event-074` | Composite source path and local ID | Both survive as distinct imported records; outside-scope status does not verify either. |
| USD850m purchase price | `claims.csv:22` C21; cash/obligation GO01/GO02 | S17 paras42-45; S71 para903 | Purchase price and two tranches are related measures, not three additive receipts or a Trump transfer. |
| Etmor payment for Parborio obligation | `claims.csv:62-63` C61/C62; transaction T22; role GR01/GR08; GO03 | S71/S72; paras902-904,919-932; expected PDF physical187,190-193 | Preserve judicial attribution and settlement characterization. Etmor is the named transmitting payer, Parborio the benefited obligor; actual ultimate account and specific funding source remain unknown. |
| Later VEB negotiating condition | `claims.csv:83` C82; `gorlane_reviewed_delta.md:47` | S71 para927 | Transaction-specific contractual leverage concerning the 2012 Quinira exit; does not establish 2010 payment provenance or universal control. |
| Appellate scope qualification | `claims.csv:82` C81; `gorlane_reviewed_delta.md:49` | S79; [2021] EWCA Civ1149 | Limited Castlerose unjust-enrichment appeal; do not turn dismissal into approval of every trial finding. This later assessment qualifies older C60-C62 appeal wording. |
| UK shareholder statement and conflict | `claims.csv:76-77` C75/C76; `gorlane_document_review.csv:18-19` | S85 physical3-4; S84 physical3-4 | The retained 2009-page derivatives report Gorlane's two shares and literal 14/05/2008 disposal dates. Preserve the reported conflict with the earlier 2008 return; do not repair the year by guessing. |
| Dormant-company counterevidence | `claims.csv:78` C77; GO16 | S97/S92 balance sheets; S99 charge page | Limited company-filed net assets/cash evidence; not a bank audit or group-wide absence of financing. Attach to the relevant ownership/finance explanation. |
| Toronto obligations | GO08-GO12; `gorlane_reviewed_delta.md:55-59` | S18 physical47-48, paras71-75; charge AT1599260; S37 | CAD200m security face, CAD105,651,246 principal-plus-interest due and CAD9,315,000 fee due are distinct. Neither assignment nor amount due establishes payment. |
| Two different 2017 Toronto measures | Q01/R03/GO13 versus Q12/GO14; `claims.csv:85` C84 | S47 disclosure; S63 physical38 TY2017 GenDep | USD2,273,297 mixed disclosed benefit remains separate from USD2,219,431 taxable-income exclusion narrative. No subtraction-based cash, fees, expense or buyout inference. |
| Unclosed Toronto connecting leg | GO12 and GO17; `gorlane_reviewed_delta.md:55,63,79-81` | Existing cross-record sources and named missing documents | Preserve the open question. Common seller/guarantor identity and later benefit do not supply the missing proceeds application records. |

The pilot should bind material qualifications, contrary evidence and corrections to each selected claim before arranging scenes. Support and counterevidence cannot be selected independently merely to make the narration simpler. Some corrections currently exist only in narrative prose, such as the later appellate-scope assessment and the recovered-page hash correction (`gorlane_reviewed_delta.md:27-29`). These require an explicit supersession/qualification record before generic consumers can enforce them reliably.

## 6. Source screenshots and custody requirements

I inspected all three retained PNGs and recomputed their SHA256 values. They match the committed `review-images/provenance.json`:

| Derivative | Source / physical page | Verified derivative SHA256 | Provenance boundary |
| --- | --- | --- | --- |
| `uk-2009-return-physical-3.png` | S85 / 3 | `50a757d9e3fe4a827720724c562b5e43fd4b2ccc688a4f41246871ba31cae13f` | Crop of the rendered page, excluding unrelated director details. Shows share capital, reporting date, E Chifrin disposal literal and company number. |
| `uk-2009-return-physical-4.png` | S85 / 4 | `bb624d7f68afee02f66f1c201ced63f075ddf055d891c72d9b28ec8f98b1e5e3` | Lossless re-encoding of a rendering; shows A Shnaider disposal literal, Gorlane shareholding, authorization and company number. |
| `2017-parent-physical-38-redacted.png` | S63 / 38 | `3205a76070fc9518ed28538b0196189ec0b3e78b4af78d75ffd6a559a8de9ebb` | Raster redactions remove tax identifiers and a document locator. Shows the named Toronto amount in the taxable-income exclusion narrative. |

The manifest retains source PDF hashes and render/crop/redaction information (`review-images/provenance.json:3-81`). Those parent PDFs and original render inputs are not tracked, so matching the derivative hash does not reproduce its complete creation chain in this clone. The full-year/date-conflict context also spans an earlier return whose page images are not retained here.

A capture service should therefore hash the actual available source bytes before rendering, pin the physical page, preserve full-page and cropped images separately, record output hashes and pixel geometry, and identify the renderer/version. Printed page labels and physical page numbers need separate fields. Highlights belong in a separate overlay or crop record; an image should not be presented as an untouched original if pixels were changed. A missing capture must remain an explicit state, not an excuse to fabricate a screenshot or delete a claim.

No new external source was acquired for this audit. The current pilot should expose these existing derivatives as review material with their recorded transformations and missing-parent boundary. Publication approval requires a deliberate source/claim review and the relevant source-version requirements; import success alone cannot supply it.

## 7. Implementation priorities

1. **Reconcile origin coverage first.** Preserve every parsed record and original field. Fingerprint every discovered research file, classify invalid descriptive schema separately, and produce explicit unparsed/unresolved/duplicate dispositions. Keep original and generated copies distinct so source counts do not double.
2. **Separate imported assertions from accepted evidence.** Introduce actual contracts for sources, source versions, excerpts, captures, claims, identities, corrections and financial observations. Imported editorial confidence stays an inherited assessment. Exact excerpts require a bound available source; a Markdown summary of a judgment is not the judgment text.
3. **Apply controlling interpretations in a read-only projection.** Preserve historical JSON and RF-014, then generate a view that cannot present the protected disputed amounts as settled payments. Make the scope of that corrected projection explicit; a limited pilot is not a corrected whole legacy graph.
4. **Build draft and publish paths with distinct gates.** Draft output should explain missing originals, unresolved citations, counterevidence and review needs. Publish should require accepted claim versions, cited source versions/excerpts, material context and current correction closure. Do not auto-accept a ledger row because it says `Established`.
5. **Bind reproducibility and invalidation to content.** Pin source revision/hash, schema/compiler versions, assessment versions and selected narrative inputs. A changed correction or evidence dependency should identify affected stories without overwriting the published historical package.
6. **Switch consumers only after the vertical slice is qualified.** Both frontend loading paths and all monetary/relationship views need the compiled model. The new review package is immediately useful while that consumer migration remains an explicit later milestone.

The proposed Matter and V-Flow integrations require inspection of their actual current contracts. This audit does not infer external API compatibility from the attached recommendation. Reuse should happen at explicit adapters, without making Matter's generic core depend on documentary presentation fields.

## 8. Executed baseline and limits

The following inherited commands were executed against the audit tree. All exited successfully:

```sh
node research/veb_a7_2026/validate_evidence.mjs
node research/veb_a7_2026/validate_followup.mjs
node research/veb_a7_2026/validate_accounting.mjs
node research/veb_a7_2026/validate_corpus_tax.mjs
node research/veb_a7_2026/audit_rinfo.mjs
node --test research/veb_a7_2026/validate_evidence.test.mjs research/veb_a7_2026/review_assessment.test.mjs research/veb_a7_2026/gorlane_review.test.mjs research/veb_a7_2026/panama_papers_findings.test.mjs
python3 -B research/veb_a7_2026/test_gorlane_neighborhood.py
```

**Baseline: 116 Node tests + 12 Python tests = 128 passed; no failures, skips or cancellations.** The five standalone validation/audit commands also passed. Logs were retained in the task's baseline directory. These results confirm the repository's existing structural protections and committed-record tests. They do not authenticate external sources, reacquire original PDFs, establish raw ICIJ export parity in this clone, test the legacy browser visually, or render a V-Flow film.

All audited legacy files, financial exclusions, source inventories and research narratives were preserved. This audit supplies the boundary conditions and source mappings for implementation; newly added modernization and capture tests should report their own results separately from this inherited baseline.
