# Panama Papers findings incorporated into the financial research

**Integration baseline:** PR #28 research head `2910a026c73e5cd576f51ffd50863dfa9faf8a0c`.

This is a reader-facing consolidation of the already documented ICIJ records, not a new leak, new source acquisition, independent confirmation, or additional financial ledger. The controlling observations remain in the linked CSVs. The original delivery archive and earlier research snapshots are preserved.

## What was already in the Panama Papers data

The [reviewed continuation](gorlane_reviewed_delta.md) establishes that the later Equalchance and Freegain records were already in the **same acquired export** marked `GENERATED_ON_20260909.txt`. Their absence from the old eight-row extract was a selection gap, not evidence that ICIJ added them later. The raw-export checks and hashes are recorded in [the selection audit](gorlane_selection_audit.json) and [the original export audit](offshore_export_audit.json). This integration does not claim to have independently reacquired that archive.

Three recovered records complete the selected Gorlane shareholder timeline: **Equalchance on 29-DEC-2011, Equalchance on 12-DEC-2012, and Freegain on 12-DEC-2012**. The later Atinia row was already present as OE08; Quinira was already OE01. Neither is newly recovered evidence.

## All eleven dated Gorlane shareholder observations

Every row below points to **Gorlane entity node 10210594**, and belongs to the **Panama Papers** source family S59. Names and dates preserve the source wording. A source row is a CSV record locator, not a physical text line or bank transaction ID. "Not stated" means the source end-date field is blank, not that the holding continues today. Percentages and replacement of earlier holders are not established.

Source: [complete ownership timeline](gorlane_ownership_timeline.csv), reconciled to [scoped raw relationship extracts](gorlane_neighborhood_relationships.csv). The earlier [eight-row review](offshore_relationship_review.csv) remains historical evidence of the previous selection; do not add it to these eleven observations as another independent dataset.

<!-- BEGIN PANAMA_SHAREHOLDERS -->
| Source row | Holder node | Published holder name | From | To | Review status |
| --- | --- | --- | --- | --- | --- |
| 494203 | 12155628 | MIDLAND RESOURCES HOLDING LIMITED | 30-MAR-2007 | 23-MAY-2010 | already selected (OE03) |
| 452081 | 12141123 | BELEGO HOLDINGS LIMITED | 23-MAY-2010 | not stated | already selected (OE02) |
| 506896 | 12159818 | PARBORIO HOLDINGS LIMITED | 23-MAY-2010 | not stated | already selected (OE04) |
| 521674 | 12163340 | EQUALCHANCE PROCESSING LIMITED | 23-MAY-2010 | not stated | already selected (OE05) |
| 533397 | 12167368 | SILENI TRADING LIMITED | 23-MAY-2010 | not stated | already selected (OE06) |
| 640469 | 12205452 | ATINIA VENTURES LIMITED | 23-MAY-2010 | not stated | already selected (OE07) |
| 336664 | 12099846 | EQUALCHANCE PROCESSING LIMITED | 29-DEC-2011 | not stated | recovered from same snapshot |
| 640470 | 12205452 | ATINIA VENTURES LIMITED | 29-DEC-2011 | not stated | already selected (OE08) |
| 336663 | 12099846 | EQUALCHANCE PROCESSING LIMITED | 12-DEC-2012 | not stated | recovered from same snapshot |
| 394235 | 12121184 | Quinira Holdings Limited | 12-DEC-2012 | not stated | already selected (OE01) |
| 466882 | 12146270 | Freegain Trading Limited | 12-DEC-2012 | not stated | recovered from same snapshot |
<!-- END PANAMA_SHAREHOLDERS -->

**Do not merge Equalchance nodes 12163340 and 12099846 by name alone.** Their separate node identities and parallel role dates are retained. Likewise, Midland officer node 12155628 has Guernsey context; it is not automatically the distinct BVI entity 10088926. The [identity review](gorlane_neighborhood_review.md) records the evidence and remaining limits for those matches.

## Eastrade and the related records

The scoped extract also preserves the Gorlane-named officer's Eastrade relationship, Eastrade's explicit cross-dataset identity link, and relevant intermediary relationships. These four selected pointers are part of the existing forty-edge scoped review, not four additional records to append to it.

<!-- BEGIN PANAMA_RELATED -->
| Source row | From node | To node | Published role | From date | Source dataset |
| --- | --- | --- | --- | --- | --- |
| 431838 | 12133896 | 10173628 | shareholder of | 17-MAY-2010 | Panama Papers |
| 1289949 | 20025856 | 10173628 | same company as | not stated | Bahamas Leaks |
| 70807 | 11003807 | 10210594 | intermediary of | not stated | Panama Papers |
| 70808 | 11003807 | 10173628 | intermediary of | not stated | Panama Papers |
<!-- END PANAMA_RELATED -->

The first row names **GORLANE BUSINESS INC. as an officer/shareholder of EASTRADE LTD.** Officer node **12133896** remains separate from Gorlane entity node **10210594** until the qualified identity question is resolved. Eastrade nodes **10173628** and **20025856** have an explicit `same_company_as` source relationship, matching incorporation and normalized registration fields in the reviewed data. That is stronger than name similarity but not a newly certified Bahamas extract. Its row is attributed to **Bahamas Leaks**, not silently relabeled Panama Papers.

Intermediary node **11003807**, recorded as **FIDUSERVE CORPORATE SERIVCES LTD**, is a service-provider/custodian lead. Shared services or addresses do not establish a common funding pool, common beneficial owner, or client-to-client payment. See [the neighborhood review](gorlane_neighborhood_review.md) and [node extracts](gorlane_neighborhood_nodes.csv).

## How these items fit the existing investigation

**The 2010 acquisition comparison.** The Midland end date and five shareholder start dates can be compared with the judicial account of the acquisition in S71. Preserve the distinction between the graph's **23-MAY-2010** relationship date, the **19 May 2010** Etmor payment described in the judgment, and the **17-MAY-2010** Eastrade relationship. The dates are not interchangeable. The graph does not identify the three unnamed VEB-associated purchasers by eliminating Parborio and Atinia, and it does not identify the ultimate bank payee. See [the purchaser-role matrix](gorlane_purchaser_roles.csv), [reviewed delta](gorlane_reviewed_delta.md), and S71 in [sources.csv](sources.csv).

**The 2011–2012 follow-through.** Later Equalchance, Atinia, Quinira and Freegain observations now remain visible for comparison with the 2012 exit negotiations and exact-company credit/security records. The judgment's described VEB negotiating conditions are a separate evidence family; the graph alone does not prove those conditions were executed or that credit was advanced. The [ranked records plan](gorlane_next_records.md) identifies the executed exit, consent, release, purchaser schedule and credit instruments still sought.

**Separate original-record corroboration and counterevidence.** The UK Global Steel shareholder filing, conflicting disposal dates, dormant-account representations and official registration-identifier leads in the reviewed delta are not themselves Panama Papers findings. They corroborate or challenge particular hypotheses at their stated scope and must not be counted as extra graph rows or bank confirmations.

## Corrections to older financial narratives remain part of the finding

The [prior corpus audit](corpus_tax_delta.md) found that an Investments Tower Inc. node did not establish the alleged Trump-unit purchase, price or deed. It also distinguished address nodes from lenders and source-status fields from disciplinary findings. Those historical claims remain qualified leads unless their original property or regulatory records establish more. Repetition across internal financial notes does not create independent corroboration. See [the older node review](offshore_node_review.csv) and [source coverage](corpus_coverage.csv).

## Evidence and publication boundaries

- The public ICIJ graph is not the full leaked-document cache or a bank ledger. Node pages and their export rows are the same evidence family. Preserve [ICIJ attribution and licensing](ICIJ_ATTRIBUTION.md).
- These observations do not establish that the disputed steel proceeds entered Toronto, that any particular Trump receipt came from those proceeds, or that the later A7 network continued the same payment channel. **RF-014 remains withdrawn/unconfirmed and excluded from both totals.**
- No new financial amount, bank-recipient claim, present ownership percentage, or identity merge is introduced by this consolidation. A source-end date left blank remains unknown.
- The complete review is scoped to fifteen seeds and forty incident relationships. This guide highlights eleven shareholder observations and four related pointers; it does not claim worldwide identity resolution or exhaustive leak-document coverage.
- The original PR #28 ZIP/patch and its publication receipts describe the earlier reviewed delivery. They are not rewritten to include this later integration note. The follow-up commits and PR review identify these additions separately.

[Integration regression tests](panama_papers_findings.test.mjs) compare the displayed rows to the existing committed extracts and reject omitted/duplicated rows, identity conflation, date substitution and source-dataset relabeling. They do not reacquire ICIJ's raw export or authenticate the historical facts.
