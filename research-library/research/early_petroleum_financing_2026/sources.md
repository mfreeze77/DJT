# Primary sources and evidence rules

Reviewed October 17, 2026. Source IDs continue the [CH2 inventory](../../Tmanch_CH2_primary_sources.md). Public originals and retained official extracts were inspected. The underlying bank exhibits and certified corporate instruments were not obtained. Hashes identify the retrieved files, not an endorsement of every assertion within them.

## CH2-P39 — M&Q transaction and terminal-finance decision

NY Tax Appeals Tribunal, DTA 810457, May 22, 1997. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/810457.2.dec.pdf).

- P.6: tax-paid gallonage credited and remaining assessment.
- P.11: ICC factor, Enterprise affiliate, 50/50 NYFT ownership.
- Pp.13–14: sample invoice, journal, cancelled-check copy and wire document.
- Pp.22–24: Tribunal reverses ALJ and sustains assessment as modified.
- Limits: originals of described exhibits not independently acquired; $20 invoice/component mismatch and four-cent original tax-component mismatch retained; no property transfer traced.

PDF SHA-256: `4bc2e13886b198ad360fdadf8f455a604b4268dc3665926d5aad2b34c17c6b0b`.

## CH2-P40 — Congressional restitution-order reporting

House Judiciary Subcommittee on Criminal Justice, Oversight Hearing on Organized Crime Strike Forces, June 20, 1989, Serial 14. [Official OJP scan](https://www.ojp.gov/pdffiles1/Digitization/148382NCJRS.pdf).

Edward A. McDonald's prepared-statement attachment begins at printed p.88 and is marked draft. P.99 discusses federal and state cases; p.125/PDF p.128 lists recoveries ordered. Each $5 million entry is a reported restitution order, not a receipt. Individual dockets, overlap and collections are unresolved.

PDF SHA-256: `afdff35ae89d710b2cae9569a0e2cfb654cf5d0a8f28edaac52941ca31873abe`.

## CH2-P41 — Official corporate filing crosswalk

NY Department of State public datasets: [All Filings](https://data.ny.gov/Economic-Development/Corporations-and-Other-Entities-All-Filings/63wc-4exh), [Entity Status](https://data.ny.gov/resource/3gg2-jgnp.json), and [Name Status](https://data.ny.gov/resource/ekwr-p59j.json). Retrieved October 17, 2026.

[Merger query](https://data.ny.gov/resource/63wc-4exh.json?%24where=film_num+in+%28%27B262523-5%27%2C%27B262522-9%27%2C%27B263007-5%27%29&%24limit=2000) includes Enterprise 447231 and Pan American 142871 under B262523-5. Only that shared filing is used here; adjacent filings and other constituents are not expanded into a network.

[Entity filing query](https://data.ny.gov/resource/63wc-4exh.json?%24where=corpid_num+in+%28110143%2C447231%2C516938%2C142871%29&%24limit=2000&%24order=corpid_num%2Cdate_filed) distinguishes separate ICC 110143 and excludes mirror misidentification 516938, which belongs to Windon Realty. [NYFT/M&Q query](https://data.ny.gov/resource/63wc-4exh.json?%24where=corpid_num+in+%28702986%2C105285%29&%24limit=2000&%24order=corpid_num%2Cdate_filed) supplies formation metadata, not ownership.

Merger-query extract SHA-256: `8166b09cc06b2c36fa2e9b7b320ccfbfdacbed8029ef812a0cbb4efd00549908`. Entity-filings extract: `c6a738dabe268098cd078f5f4136be0009d9280cdd624590b7f60b399fa71541`.

These are official electronic indexes, not certified certificate images. Their direct entity-to-filing links are established; their identity with similarly named DTA transaction parties remains unresolved.

## CH2-P42 — Contemporaneous ICC/Pan American division style

American Permac invoice dated August 31, 1965, retained in [NY DEC's 1997 site-investigation appendices](https://extapps.dec.ny.gov/data/DecDocs/130063/Report.HW.130063.1997-03-25.FRI_Report_Appendices.pdf#page=146), physical PDF p.146, visually inspected.

This invoice expressly names ICC as a division of Pan American. Its unrelated machinery transaction is not added to the petroleum transaction ledger. Government custody does not turn a business invoice into a corporate registry or resolve the 1983 payee's identity.

PDF SHA-256: `1d3bdac480575d5a3912d2ad9d28f7457ee139798e88032ffce5dd6bf93e013d`.

## CH2-P43 — Bounded Diamond address and counsel context

NY Tax Appeals Tribunal, Diamond Terminal, DTA 805249, September 22, 1988. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/805249.DEC.pdf).

P.1 identifies counsel; p.16 records the July 1987 application address. P.2 expressly strikes ALJ finding 53. This package excludes that stricken material and does not use a prior administrative finding to override the Tribunal. Address/counsel facts do not establish title, succession, payment or wrongdoing by counsel.

PDF SHA-256: `0cfa3fd95b2a95e4065cfdf048b8e1f6affbc406ea0834a548a17037be832dce`.

## Existing sources retained

CH2-P27 supplies the distinct 1982–83 SMI chronology and attributed testimony. CH2-P32 supplies the July 1984 cargo payments and Debbie Oil broker/principal qualifications. CH2-P26 supplies property-index/POA facts with their original-image limits. These are not recounted as new transactions.

## Companion-data contract

`transactions.csv` retains the 13-field transaction format used in source review: identifier, group, date, date precision, from/to, amount/currency, type, status, source, pages and limits. `relationships.csv` retains the seven-field relationship format: from/to, relationship, date, source locator, evidence strength and limits.

- This is a historical research companion, outside the central financial-flow or J20 ingestion pipeline.
- Never sum a group: invoices, supplier disbursements, customer payments and accounting credits overlap.
- An accounting attribution does not create a second cash edge.
- Entity labels containing “DTA810457” deliberately remain distinct from DOS-numbered candidates.
- Reported orders and calculated credits remain typed separately from payment documents.
- No aggregate amount or network-ownership conclusion is calculated.

## CH2-P45 — Conlo corporate petitioners

NY Tax Appeals Tribunal, May 11, 1995, DTA 801597. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/801597.dec.pdf). Printed p.3 names two corporate petitioners and the officers collectively; pp.1–2,8–9 bound the tax period and default-vacatur posture. Original PDF retained; page 3 visually inspected. No allocation of precise officer titles/ownership or verified corporate join to Macchia's Conlo, Inc. See the [identity note](identity_note_2026-11-12.md) and [sanitized provenance](identity_source_manifest_2026-11-12.json).

## CH2-P46 — Blue Bell official All Filings metadata

NY Department of State, [All Filings query for DOS 884703](https://data.ny.gov/resource/63wc-4exh.json?%24where=corpid_num%3D884703&%24limit=1000), acquired November 12, 2026. One original response row records Blue Bell, Major Energy fictitious name, May 10, 1983 authority filing, film A978447-6 and foreign-incorporation date August 26, 1980. Foreign jurisdiction absent. No certificate image, ownership/transfer instrument or match to a Panama candidate or Austrian account acquired. See the [identity note](identity_note_2026-11-12.md) and [sanitized provenance](identity_source_manifest_2026-11-12.json). This source upgrades filing metadata only; it is not a new financial event.

## CH2-P47 — Consent-order notice

DOE, 46 FR 29304-29305. [Official issue PDF](https://www.govinfo.gov/content/pkg/FR-1981-06-01/pdf/FR-1981-06-01.pdf). Original SHA-256: `47d8f813a11c1751b53c302ef06ab59d0279885893b3f613086cf1bd45fc4a9d`. See the [bounded proceeding note](doe_refund_note_2026-11-12.md) and [manifest](doe_source_manifest_2026-11-12.json) for dates, page locators and limits. Stages overlap; no cross-source corporate identity or bank-cleared payment is established.

## CH2-P48 — Proposed refund procedures

DOE, 50 FR 24301-24303. [Official issue PDF](https://www.govinfo.gov/content/pkg/FR-1985-06-10/pdf/FR-1985-06-10.pdf). Original SHA-256: `60d3ea073f859930a42aa0e8ee766a6c2d06618b2732d22083c1dae32b0a73cc`. See the [bounded proceeding note](doe_refund_note_2026-11-12.md) and [manifest](doe_source_manifest_2026-11-12.json) for dates, page locators and limits. Stages overlap; no cross-source corporate identity or bank-cleared payment is established.

## CH2-P49 — Final refund procedures

DOE, 50 FR 51916-51919. [Official issue PDF](https://www.govinfo.gov/content/pkg/FR-1985-12-20/pdf/FR-1985-12-20.pdf). Original SHA-256: `cfaa710c5bcfd1505472a41754d6512d8ccc47ea2be7aa27dcce913ab395184f`. See the [bounded proceeding note](doe_refund_note_2026-11-12.md) and [manifest](doe_source_manifest_2026-11-12.json) for dates, page locators and limits. Stages overlap; no cross-source corporate identity or bank-cleared payment is established.

## CH2-P50 — Jimmy’s refund-award summary

DOE, 51 FR 24436. [Official issue PDF](https://www.govinfo.gov/content/pkg/FR-1986-07-03/pdf/FR-1986-07-03.pdf). Original SHA-256: `6d4f74e92341a05088622e9dd8a2a3737a724f6c025ad37ea2a0bd0790ca2164`. See the [bounded proceeding note](doe_refund_note_2026-11-12.md) and [manifest](doe_source_manifest_2026-11-12.json) for dates, page locators and limits. Stages overlap; no cross-source corporate identity or bank-cleared payment is established.

## CH2-P51 — DOE Appendix B completed-payment classification

**Source:** 50 FR 4963,4965. [Original official issue PDF](https://www.govinfo.gov/content/pkg/FR-1985-02-05/pdf/FR-1985-02-05.pdf). SHA-256: `ad2f76b32198cdfed6a421a5b09745789497e46b787be7fae906208b48f5718a`.

**Limits:** No amount, HEF number or corporate identifier; correlated name/locality only. Classification cutoff is not exact payment date or universal release. [Chronology and companion contract](doe_refund_note_2026-11-12.md#november-13-2026-continuation-two-earlier-administrative-stages); [sanitized provenance](doe_continuation_source_manifest_2026-11-13.json).

## CH2-P52 — DOE Jimmy’s application receipt

**Source:** 51 FR 8236. [Original official issue PDF](https://www.govinfo.gov/content/pkg/FR-1986-03-10/pdf/FR-1986-03-10.pdf). SHA-256: `3ab904cc2f8719bb13ac939a7ea21e7615e257c190dbd8e722c645a361a9890d`.

**Limits:** Do. date inheritance gives February 5, 1986 application receipt for RF236-1, not award or payment. No amount or full application acquired. [Chronology and companion contract](doe_refund_note_2026-11-12.md#november-13-2026-continuation-two-earlier-administrative-stages); [sanitized provenance](doe_continuation_source_manifest_2026-11-13.json).

## November 13, 2026: NYFT/Tunyung primary-record supplement

## CH2-P53 — NYFT Tunyung Tribunal decision

NY Division of Tax Appeals, 1998-02-12. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/810139.dec.pdf). Printed pp.3-5,9-10,13,19-20. Controlling administrative decision: qualified 1984 supply/book-credit findings, reported 1988 payment and uncollected judgment; partly corrects the ALJ. No bank-clearing proof or corporate identifier match. [Bounded note](tunyung_note_2026-11-13.md); [sanitized provenance](tunyung_source_manifest_2026-11-13.json).

## CH2-P54 — NYFT Tunyung ALJ determination

NY Division of Tax Appeals, 1997-02-20. [Original PDF](https://www.dta.ny.gov/pdf/archive/determinations/810139.DET.pdf). Printed pp.4-5,11,26. Prior procedural version, not independent payment corroboration. Conclusion H blanket cancellation was corrected by the 1998 Tribunal; use P53 for disposition. [Bounded note](tunyung_note_2026-11-13.md); [sanitized provenance](tunyung_source_manifest_2026-11-13.json).

## CH2-P55 — NYFT earlier judgment account

NY Division of Tax Appeals, 1995-10-26. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/811653.dec.pdf). Printed pp.4-5. DTA 811653/811678 reports conflicting judgment county/total; no original judgment acquired. Same debt, not additional receipt. Other debtors and later tax-credit/payment matters excluded from this supplement. [Bounded note](tunyung_note_2026-11-13.md); [sanitized provenance](tunyung_source_manifest_2026-11-13.json).


## November 13, 2026: Meridian assessment/disposition companion

## CH2-P56 — NYFT Meridian Tribunal decision

NY Division of Tax Appeals, 1998-08-27. [Original PDF](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf), printed pp.5,7-10,14-17,26-28,35-36,40-41. Motor-fuel notice is DTA 814155 within consolidated decision. Assessments, not payments; preserve net multi-period composition, source discrepancies and limited relief. [Note](meridian_note_2026-11-13.md); [sanitized provenance](meridian_source_manifest_2026-11-13.json).

## CH2-P57 — NYFT Meridian ALJ determination

NY Division of Tax Appeals, 1997-05-22. [Original PDF](https://www.dta.ny.gov/pdf/archive/determinations/814152.det.pdf), printed pp.18-22,28. Prior procedural version of same matter, not independent transactions. Read with Tribunal corrections to inventory-loss wording and notice numbers; retain A/N/O limits. [Note](meridian_note_2026-11-13.md); [sanitized provenance](meridian_source_manifest_2026-11-13.json).


## November 13, 2026: Westchester/Shore Line later-record appendix

## CH2-P58 — Standard Petroleum Tribunal decision

NY Division of Tax Appeals, 1999-04-29, printed pp.2-8,13-15. [Official PDF](https://www.dta.ny.gov/pdf/archive/decisions/815413.dec.pdf). [Bounded note](westchester_shoreline_note_2026-11-13.md); [sanitized provenance](westchester_shoreline_source_manifest_2026-11-13.json). Recorded collections, liabilities and registration findings are not verified bank flows; paired versions are not independent transactions.

## CH2-P59 — Standard Petroleum ALJ determination

NY Division of Tax Appeals, 1998-05-07, printed pp.15. [Official PDF](https://www.dta.ny.gov/pdf/archive/determinations/815413.det.pdf). [Bounded note](westchester_shoreline_note_2026-11-13.md); [sanitized provenance](westchester_shoreline_source_manifest_2026-11-13.json). Recorded collections, liabilities and registration findings are not verified bank flows; paired versions are not independent transactions.

## CH2-P60 — Shore Line Tribunal decision

NY Division of Tax Appeals, 1996-02-15, printed pp.6-10,19-20. [Official PDF](https://www.dta.ny.gov/pdf/archive/decisions/813859.DEC.pdf). [Bounded note](westchester_shoreline_note_2026-11-13.md); [sanitized provenance](westchester_shoreline_source_manifest_2026-11-13.json). Recorded collections, liabilities and registration findings are not verified bank flows; paired versions are not independent transactions.

## CH2-P61 — Shore Line ALJ determination

NY Division of Tax Appeals, 1995-11-30, printed pp.34-35. [Official PDF](https://www.dta.ny.gov/pdf/archive/determinations/813859.det.pdf). [Bounded note](westchester_shoreline_note_2026-11-13.md); [sanitized provenance](westchester_shoreline_source_manifest_2026-11-13.json). Recorded collections, liabilities and registration findings are not verified bank flows; paired versions are not independent transactions.


## November 13, 2026: Barrier acquisition/financing comparison

## CH2-P62 — Barrier Tribunal decision

NY Division of Tax Appeals, 1991-01-04, printed pp.2-3,7,13,21-22. [Official PDF](https://www.dta.ny.gov/pdf/archive/decisions/807303.dec.pdf). [Bounded comparison](barrier_note_2026-11-13.md); [provenance](barrier_source_manifest_2026-11-13.json). Mixed consideration, reported debt balances and tax payments are distinct; paired versions are not independent flows.

## CH2-P63 — Barrier ALJ determination

NY Division of Tax Appeals, 1990-05-02, printed pp.2,5,8-10,16. [Official PDF](https://www.dta.ny.gov/pdf/archive/determinations/807303.DET.pdf). [Bounded comparison](barrier_note_2026-11-13.md); [provenance](barrier_source_manifest_2026-11-13.json). Mixed consideration, reported debt balances and tax payments are distinct; paired versions are not independent flows.

The comparison reuses CH2-P60 p.3 and CH2-P61 p.4 for the January 1989 unpriced account; these are not new sources.

## November 14, 2026: Century / Bridgeport comparison

## CH2-P64 — CT DEP Property Transfer Forms bundle

[Official source](https://filings.deep.ct.gov/DEEPDocumentSearchPortal/Home/DisplayPDF?DocID={B036CB84-0100-C42C-80D5-DB0453662158}); locator: 3,6-7,9-11. [Bounded note](century_bridgeport_note_2026-11-14.md); [acquisition tiers and hashes](century_bridgeport_source_manifest_2026-11-14.json). Signed filing declarations, agency chronology and later fee form; not actual land price or bank instrument

## CH2-P65 — Bridgeport recorded warranty deed

[Official source](https://i2o.uslandrecords.com/CT/Bridgeport/D/); locator: Document 1695; Vol2446 pp116-118; 001/02446/116. [Bounded note](century_bridgeport_note_2026-11-14.md); [acquisition tiers and hashes](century_bridgeport_source_manifest_2026-11-14.json). Review captures are not original-instrument bytes or certified copies; no amount inferred from consideration/tax/release language. Earlier referenced mortgage/assignment not inspected.

## CH2-P66 — Bridgeport recorded mortgage release

[Official source](https://i2o.uslandrecords.com/CT/Bridgeport/D/); locator: Document 1693; Vol2446 pp113-114; 001/02446/113. [Bounded note](century_bridgeport_note_2026-11-14.md); [acquisition tiers and hashes](century_bridgeport_source_manifest_2026-11-14.json). Review captures are not original-instrument bytes or certified copies; no amount inferred from consideration/tax/release language. Earlier referenced mortgage/assignment not inspected.

## CH2-P67 — CT REACT DCN-017205 displayed metadata

[Official source](https://deep-react.service.ct.gov/s/case/500cs00001Q1xTN/detail); locator: DCN-017205, Date Of Transfer field. [Bounded note](century_bridgeport_note_2026-11-14.md); [acquisition tiers and hashes](century_bridgeport_source_manifest_2026-11-14.json). Current migrated fields only. Date Of Transfer is not independently verified conveyance date; no historic original document bytes represented.

Reuses existing CH2-P62 pp.2–3 and CH2-P63 p.2 for the January 4, 1988 equipment/intangibles acquisition; no new IDs for those originals.

## November 14, 2026: Century installation/index context supplement

## CH2-P68 — EPA 1980 Region1 notification report, official text rendition

[Official source](https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=2000KBNF.TXT). Notifier-submitted/unverified; exact entry notification date garbled. Original PDF403 stopped; no PDF acquired. [Bounded context](century_bridgeport_note_2026-11-14.md#november-14-follow-up-installation-indexed-title-and-scoped-operating-context).

## CH2-P69 — Bridgeport1981 deed index metadata

[Official source](https://i2o.uslandrecords.com/CT/Bridgeport/D/). Zero images; original unavailable. Index field Verified/Certified does not mean certified copy obtained; no price/legal description/parcel equivalence. [Bounded context](century_bridgeport_note_2026-11-14.md#november-14-follow-up-installation-indexed-title-and-scoped-operating-context).

## CH2-P70 — CT DEP-hosted Keck assessment with attached NPDES permit

[Official source](https://filings.deep.ct.gov/DEEPDocumentSearchPortal/Home/DisplayPDF?DocID={D036CB84-0100-CCAF-B710-6042FA331F74}). Report not agency ownership finding or executed lease; permit not actual compliance/payment. Broader environmental findings outside this supplement. [Bounded context](century_bridgeport_note_2026-11-14.md#november-14-follow-up-installation-indexed-title-and-scoped-operating-context).

## CH2-P71 — Recorded Sun Oil boundary/location survey referenced by1988 deed

[Official source](https://i2o.uslandrecords.com/CT/Bridgeport/D/). Specific match to1988 deed survey reference only; not1981 deed original/terms, full title timeline, price or payment. Screenshot hashes are review derivatives, not raw map hashes. [Bounded context](century_bridgeport_note_2026-11-14.md#november-14-follow-up-installation-indexed-title-and-scoped-operating-context).


## November 14, 2026: Century price-source refinement

## CH2-P72 — City-linked Bridgeport assessor parcel4480 ownership history

[Source](https://gis.vgsi.com/cards/BridgeportCTCards//4480.pdf). Reported price not contract or bank receipt; underlying tax/assessor lineage unknown;7.98 vs historical8.8 acres unresolved;zero row not proof no consideration. [Dated refinement](century_bridgeport_note_2026-11-14.md#november-14-price-source-refinement-assessor-record-and-conditional-tax-base-check).

## CH2-P73 — DRS LSN-98 prior-rate description

[Source](https://portal.ct.gov/DRS/Publications/Legal-Special-Notices/LSN/LSN-98). Use prior0.45percent and1.10per1000/fraction only;1989 replacement rates do not apply1988;historical tax return/rounding absent. [Dated refinement](century_bridgeport_note_2026-11-14.md#november-14-price-source-refinement-assessor-record-and-conditional-tax-base-check).

## CH2-P74 — RCSA12-494-1 full-purchase-price definition

[Source](https://eregulations.ct.gov/eRegsPortal/Browse/getDocument?guid=%7B0E70C7B4-8A62-42DA-9243-6FC81C43545B%7D). Current-hosted historical-effective rule, not original1987 paper scan;nonmoney and liability-inclusive base not necessarily cash. [Dated refinement](century_bridgeport_note_2026-11-14.md#november-14-price-source-refinement-assessor-record-and-conditional-tax-base-check).


## November 14, 2026: Bridgeport 2006 continuity and issuer accounting

## CH2-P75 — CT DEP 2006 CPW Terminal signed Form III and agency acknowledgment

[Source](https://filings.deep.ct.gov/DEEPDocumentSearchPortal/Home/DisplayPDF?DocID={50EEFB89-0000-C126-A5F2-88535E424B4A}). Signed submissions and dated administrative acknowledgment; not acquired 2006 deed or bank record. No DEP certification of submitted correctness. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-continuity-extension-may-2006-transfer-and-issuer-accounting).

## CH2-P76 — Global Partners 2006 early acquisition disclosure family

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000110465906033565/a06-11681_18k.htm). Early approximate 2.3 million same acquisition; release seller affiliate unnamed; relevant 8-K information furnished not filed; not independent money events. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-continuity-extension-may-2006-transfer-and-issuer-accounting).

## CH2-P77 — Global Partners fiscal 2006 annual acquisition and group disclosures

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000110465907020106/a07-6021_210k.htm). Same issuer annual disclosure versions, not independent receipts; separate subsidiaries; 2.4 million includes buyer costs and is not seller proceeds. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-continuity-extension-may-2006-transfer-and-issuer-accounting).

## CH2-P78 — Global Partners fiscal 2007 repeated 2006 acquisition account

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000104746908002790/a2183777z10-k.htm). Repeats same 2006 Bridgeport account; do not add neighboring 2007 acquisition table or resolve early 2.3 million discrepancy without evidence. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-continuity-extension-may-2006-transfer-and-issuer-accounting).


## November 14, 2026: Global access and credit context

## CH2-P79 — Global Partners final 2005 prospectus: CPW access

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000104746905023615/a2163408z424b4.htm). Pre-purchase access only; throughput/exchange alternatives and As Available do not establish CPW-specific contract terms, title or seller affiliation. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-access-and-credit-extension-framework-is-not-acquisition-funding).

## CH2-P80 — Executed 2005 credit framework and bounded amendments

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000110465905048061/a05-17438_1ex10d8.htm). Contract contents, not compliance finding or funded Bridgeport draw. Postclosing amendment schedule not closing funding proof; completed acquisition/loan notices not acquired. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-access-and-credit-extension-framework-is-not-acquisition-funding).

## CH2-P81 — Global Partners first-quarter 2006 subsequent event

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000110465906034912/a06-9928_110q.htm). May 8 completion is subsequent event, not March closing or extra transaction. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-access-and-credit-extension-framework-is-not-acquisition-funding).

## CH2-P82 — Global Partners third-quarter 2006 availability and acquisition disclosure

[Source](https://www.sec.gov/Archives/edgar/data/1323468/000110465906074903/a06-22008_110q.htm). Availability is snapshot, not draw/never-used proof; approximately $2.4m stage does not reconcile earlier $2.3m or create another acquisition. [Bounded extension](century_bridgeport_note_2026-11-14.md#november-14-access-and-credit-extension-framework-is-not-acquisition-funding).

