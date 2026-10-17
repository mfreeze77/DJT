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
