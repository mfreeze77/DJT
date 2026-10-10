# Corpus and tax-return delta: a payment-agent record and a documented reporting path

**Cutoff:** October 9, 2026 US Central / October 10 UTC. **Merged baseline:** `0c95a950f815be6519b0df479cf0dc325e2c5ee3` (PR26). The interrupted acquisition attempt had already created draft PR27, `research/veb-a7-corpus-tax`; this continuation recovered its artifacts instead of creating a duplicate. No merged branch was reused. Source keys below resolve in [sources.csv](sources.csv); acquired-byte hashes and failures are in [acquisition_manifest.csv](acquisition_manifest.csv).

## 1. What the older financial corpus actually contained

All **39 Tmanch_Fin-prefixed Markdown files**, including **11 PP/pp variants**, were scanned through their full text: **5,491 lines**. The earlier checkpoint's count of 38 is corrected here, not silently treated as verified. These files contain narratives, source citations, hypotheses, proposed research and some purported findings. The baseline repository did not contain a raw Offshore Leaks archive or underlying tax-return PDFs. Its CSVs were project-produced ledgers, not proof that an older raw leak download existed. The exact per-file paths, hashes, line counts, scope and upstream-source classifications are in [corpus_coverage.csv](corpus_coverage.csv). **Full-text scanning is not authentication of every cited allegation.** (S56.)

The financial source inventory also mixes distinct evidence types. FIN-SRC008 refers to Reuters' deed-based reporting, not an acquired copy of all the deeds. FIN-SRC013's tax-related lawyer letter is not an income-tax return. FIN-SRC014's earlier tax-derived reporting is not the later public 2015–2020 return collection. FIN-SRC025 is internal methodology. These distinctions remain important when two internal files appear to corroborate each other. (S56, inventory entries; source-family and coverage fields.)

### An explicit correction to the older PP material

The scan recovered **184 ICIJ node citations representing 16 distinct IDs**; all 16 were located in the acquired structured export. Existence of a node did not validate every associated historical claim. In particular, `Tmanch_Fin_PP_83-86_support.md` describes Investments Tower Inc. as a Trump-unit purchaser around lines 136–140, but line 217 still contains unfilled unit, floor and price placeholders. ICIJ entity **10009243** establishes an offshore entity, not the claimed deed or payment. That purchase assertion remains a lead pending the actual property record; this is not proof that no purchase occurred. (S56; S59; [node review](offshore_node_review.csv).)

Other concrete safeguards from the older citations: **120001148 is an address node**, not proof of Chase financing; **14081727 is a Trump Tower address**, not ownership or cash; **85001778 is an Aruba Citibank registry entry**, not a New York loan participant; and **20141651 has a 2005 incorporation date**, which cannot by itself establish a 1970s or 1980s role. The `SUSPENDED` status on **11011468** is a source field, not an authenticated professional-disciplinary finding. None is erased or silently rewritten in the original tranche. (S59, exact CSV member/record numbers in node review.)

Two scoped Library searches returned research handoffs and previously generated patches, not a recoverable earlier raw offshore cache. This is a bounded search result. Google Drive, Dropbox and the documents merely named in `rinfo.json` were not searched in this wave. The rinfo command was an integrity rerun of the already-known filename inventory, not a new examination of its 44,496 referenced files. (Coverage CV records; [search log](corpus_tax_search_log.md).)

## 2. Which underlying structured dataset was actually searched

The official ICIJ CSV download was acquired, hashed and decompressed. Its generation marker is **GENERATED_ON_20260909.txt**. All five node-type CSVs and the relationship CSV were parsed: **2,017,662 node records and 3,339,267 relationship records**. Actual headers, member hashes, source-dataset counts and query expressions are preserved in [offshore_export_audit.json](offshore_export_audit.json). Name-field queries and exact cited IDs were evaluated across the node files; relationships were filtered to relevant endpoints. This was not a search of every alternative-name field or of the confidential underlying document cache. (S57–S59.)

ICIJ's public graph is not a bank ledger. Different leaks may contain duplicate names, historical snapshots or different roles. Source-dataset labels and `valid_until` fields are retained, and no nodes are automatically merged across leaks. A7's 2024 formation is outside the useful historical coverage of many source collections; a no-hit does not disprove later activity. The derived extracts carry ICIJ attribution and the publisher's database/content license distinction in [ICIJ_ATTRIBUTION.md](ICIJ_ATTRIBUTION.md).

### Gorlane: a dated shareholder transition that supplies specific counterparties

The Panama Papers graph records **Midland Resources Holding Limited, node 12155628**, as a shareholder of **Gorlane Business Inc., node 10210594**, from March 30, 2007 until **May 23, 2010**. It records five holders beginning on that date: **Belego Holdings Limited, Parborio Holdings Ltd, Equalchance Processing Limited, Sileni Trading Limited, and Atinia Ventures Limited**. Their IDs and original role dates are preserved in [offshore_relationship_review.csv](offshore_relationship_review.csv). A separate Atinia entry beginning December 29, 2011 is retained, not collapsed into the 2010 entry. (S59; same-family public node S77.)

This is useful convergence with the already documented May 2010 steel-interest sale, but a shareholder date is not a payment date. The graph's **BVI Midland Resources Holding Limited entity 10088926**, incorporated in 2000, is not automatically the Guernsey seller: it remains an unresolved same-name candidate. Certified registry continuity or redomiciliation evidence is still missing. (S17; S59.)

### New original court evidence goes beyond the graph

**Avonwick Holdings Ltd v Azitio Holdings Ltd, [2020] EWHC 1844 (Comm), CL-2016-000494**, paragraphs **902–903**, identifies **Etmor Investments Ltd** as payment agent in the US$850 million Gorlane purchase and records **US$105.825 million paid on May 19, 2010 on behalf of Parborio**. It describes joint funding with VEB, five buyers including Parborio and Atinia, and three VEB-associated companies. Paragraphs **919, 926 and 932** treat the payment as partial discharge of an existing settlement obligation, rather than the separately alleged loan. Paragraph **927** describes VEB's role in later Quinira negotiations. The proposed netting/novation draft in paragraphs **928–930 was unsigned**. (S71.)

**The evidentiary improvement is material:** purchaser-side financing and a payment agent are no longer supported only by journalistic repetition. This is a dated judicial account of a specific payment, not our own matched-bank reconstruction. Parborio is the benefited obligor, not an identified receiving bank account. T22 records this distinction and excludes the amount from totals; it is not additional consideration on top of US$850 million or Trump income.

The court does not name the three VEB-associated companies in paragraph 903. The ICIJ names are candidates to reconcile with the executed SPA, not a completed certified identification of all purchaser vehicles. The official appeal index was acquired; full appellate disposition was not authenticated. A later BAILII search surfaced an indexed excerpt describing limited unjust-enrichment appeal scope, but opening the judgment returned an access-challenge page. No claim of exhaustive appellate finality is made. (S72; scoped log.)

A **2023 Ukrainian asset-arrest ruling reproduction**, case **761/11929/23**, recites prosecutor assertions about Cyprus credit and pledge records involving **Belego, Sileni, Equalchance, Quinira and Freegain** and VEB. The amount described exceeds US$940 million across the cited relationships. This supplies a registry-acquisition target, not authenticated advances or an amount to add to the US$850 million sale. The underlying Cyprus filings were not obtained; the asset owners were not heard at that hearing. Interim asset restraint is not a final guilt or forfeiture judgment. (S73, dated April 21, 2023, documentary narrative concerning 2010–2012 credit agreements.)

## 3. What the public tax material adds

### Acquisition and completeness are different

Actual source bytes were acquired for **51 unique CREW-linked tax PDFs and two Commons counterparts**. Their **6,340 physical pages include overlap**, not 6,340 unique authenticated tax pages. The [return inventory](return_inventory.csv) records each package's URL, hash, size, page count, year label, verified cover fields where reviewed, signature observation and actual image-review scope. Most packages were inventoried, not substantively read. All 53 lacked a usable native text layer in the extraction check. No full-corpus negative claim follows from empty extraction, and no bulk OCR was performed.

The Ways and Means report's **physical pages 21–22, printed 17–18**, distinguishes records received from returns submitted for release. It lists individual 2015–2020 returns and selected entity returns, including DJT Holdings, DJT Holdings Managing Member, DTTM Operations, and LFB entities. It does not imply every Trump entity's complete workpapers were released. The December 15 JCT staff analysis was also acquired and used as a scope map, not a final tax determination. (S61–S62.)

### A real mirror-label problem affects the 2017 search

The CREW-linked filename `Form-1040-2016-3b.pdf` contains **2017 attached statements**. At six sampled boundaries, the 306-page Commons 2017 part-three file matches the CREW 2017-3, 2017-3a and that 2016-3b payload. The comparison is page-image equality at specified samples, not proof of equality of every page. The 2016-3a payload also appears under a 2015 index route; its relevant year was not conclusively verified and remains blank. These files must not be counted as independent returns or assigned tax years solely from filenames. (S60; S67–S68; [boundary checks](tax_mirror_boundary_checks.json).)

### The manager now has a documented tax-reporting path

The **2017 DJT Holdings Managing Member LLC Form 1120S** is explicitly marked **AMENDED** on physical page 1. Its **Schedule B continuation, physical page 9**, lists **Trump Toronto Hotel Management Corp. as 100% owned**, with a reported qualified subchapter S subsidiary (**QSub**) election date of **January 19, 2017**. Physical page 8 similarly identifies Trump Toronto Development Inc., with January 1, 2017 shown. The **2018 parent return, physical page 8**, repeats the manager's ownership and 2017 election date. A repeated date is not a new 2018 election. (S63–S65; TR30–TR32; Q02/Q07.)

Historical IRS Form 8869 instructions explain that an effective QSub election generally places subsidiary assets, liabilities and income-tax items with the parent for federal income-tax purposes. It does **not** erase the corporation as a legal person. The actual executed election and IRS acceptance were not obtained; the date in Schedule B is a taxpayer representation, not independent certification of effective treatment. Any pre-election interval also requires care. (S69 p1, purpose/treatment; p2, acceptance; S70 historical 2017 instructions.)

This supplies a justified place to look for the manager's activity—**the parent reporting package and its subsidiary consolidation records**—without assuming that an LLC's legal label dictates its tax form. The 2017 individual Schedule E attachment separately lists the manager and parent as S-corporation entries, but the reviewed name columns were not paired with unverified numeric columns. (S66 pp38–39.)

### Reconciliation of the known OGE benefit remains incomplete

| Observed item | Amount / observation | What it does not establish |
|---|---|---|
| Existing R03, 2018 OGE disclosure for calendar 2017 | US$2,273,297, management fees and other contract payments | Not itself an IRS return, itemized termination allocation or matched bank receipt |
| 2017 amended parent 1120S p1 line1a | US$23,021,014 aggregate gross receipts | Not wholly Toronto and not net profit |
| Same parent, line21 | US$4,425,095 ordinary business income | Not a distribution or the manager's separately allocated income |
| Parent attached income/loss statement p46, heading p43 | Trump Marks Toronto LP: minus US$47; Toronto LLC: minus US$25 | Allocated net losses, not gross licensing receipts or cash distributions |
| Operating-fee component of R03 | Unknown | Not zero |
| Other-contract component of R03 | Unknown | Not automatically the whole amount |

(S47; S63; [tax/OGE reconciliation](tax_oge_reconciliation.csv).) The parent totals cannot be subtracted from the OGE figure to manufacture a discrepancy. The LP and LLC rows are separate entities and allocation levels, not a substitute for the manager's gross economics. Both the disclosure and return are declarations from the same taxpayer-side family, not independent payer confirmations. No aggregate financial total changes.

A **June 27, 2017 JCF Capital ULC/Trump Hotels announcement** confirms a management-contract buyout agreement contemporaneous with the OGE period. It supplies no price or fee allocation. It strengthens the existence of a plausible non-operating contractual component, but does not identify how much of R03 it represents or the actual remitter. Talon, condominium corporations 2267/2279, JCF and the Trump recipient must remain distinct roles until contracts and accounting reconcile them. (S74.)

## 4. How the hypothesis changes

The purchaser-side history is **strengthened** by a specified payment agent, a dated judicial payment finding and more precise corporate counterparties. The Toronto benefit's **tax-reporting path is strengthened**, but its operating/buyout allocation remains unresolved. Some older PP assertions are **weakened as currently sourced**, and tax mirror labels require correction. None of those findings makes RF014's US$15 million a verified project contribution.

Commercial acquisition financing, discharge of earlier business obligations and a conventional management-contract buyout all fit portions of the new record. They do not erase the documented state-financial relationships or the broader influence questions. Equally, this wave establishes no common Toronto–A7 account, no Trump knowledge of VEB origination, and no political instruction or control. A7, A71, Exim and Aragon were not collapsed into the older offshore graph. No new issuer-specific settlement or VEB/A7 drawdown was obtained. Diesel/ICC policy remains outside this crosswalk.

## 5. Precisely narrowed remaining records

**First, Toronto income:** the manager's 2017 trial balance, parent consolidation/elimination schedule, Form 8869 and acceptance, and the JCF buyout agreement's consideration allocation. Reconcile operating fees and other payments within R03 to contracts, invoices, obligors, remitters and recipient entries; retain any pre-election period.

**Second, Gorlane closing:** the executed May 2010 SPA/purchaser schedule, Etmor payment instructions and actual beneficiary records, and the underlying May 5 cash-flow presentation and September 13, 2010 update discussed in the judgment. Obtain the full appeal judgment before describing final appellate treatment. Keep the earlier Luxe refund/break-payment separate.

**Third, named VEB records and Midland obligations:** publicly accessible Cyprus loan/charge filings for the identified entities; the June 2011 MRHL–MDI deed and assigned-debt rollforward; cost-overrun demands and agent postings; and respondent reconciliations contemplated by Wolf paragraph100. Separate commitments, balances, collateral and actual advances.

**Still separate:** serial-specific A7/Aragon issuer and settlement records, original PSB/VEB financing, and Exim contributions/distributions. The old leak graph does not answer those later questions. Drafts in the records plan are not sent requests. No purchases, access bypass, confidential SAR acquisition or external contacts were made.

See [search/acquisition scope](corpus_tax_search_log.md), [validation record](corpus_tax_validation.md), and the same source/claim/entity/transaction ledgers. Structural checks protect these distinctions; they do not authenticate historical transactions.
