# NYFT and Tunyung: supply, book credits and a separately reported payment

Reviewed November 13, 2026. This bounded supplement records the three original NY administrative decisions listed below. Read the [typed observations](tunyung_observations.csv) with the [source manifest](tunyung_source_manifest_2026-11-13.json). It adds no central financial-flow total, personal-benefit claim or traced Trump receipt. Existing transaction/relationship rows, claim scores and correction history are unchanged.

## 1984 supply and source-stated role

The February 12, 1998 Tribunal decision, DTA 810139/810140/810253, describes NYFT's January–April 1984 motor-fuel sales to **Tunyung Oil Corporation**. John Quock is described as Tunyung's principal and the signatory of its MT-338 reports identifying NYFT as distributor. Municipal supply contracts had been awarded to Tunyung. M & Q Trucking was NYFT's affiliate; accountant Abbey Blatt recalled its deliveries but could not guarantee all of them. This is qualified testimony, not an independently recovered complete shipment ledger. [CH2-P53](sources.md#ch2-p53--nyft-tunyung-tribunal-decision), pp.3–5.

The source supplies a supplier/customer and signatory connection. It does not allocate a shareholder percentage, resolve corporate registration or license identifiers, or identify Conlo's seller or purchase price. Keep the DTA spelling and source scope: no ownership/identity merger with similarly named entities or other proceedings is made here. The 1984 municipal sales and later Tunyung payment are not converted into Conlo transactions by Quock's name.

NYFT initially billed the taxes, then credited qualifying exempt resales by reducing the Tunyung receivable and sales accounts on its books. That mechanism is a **book adjustment**, not a cash refund or second receipt. [P53, p.4](https://www.dta.ny.gov/pdf/archive/decisions/810139.dec.pdf#page=4).

## 1988 payment versus 1989 uncollected judgment

The Tribunal describes later March–April 1988 credit sales, Tunyung's default, and **one $102,931.25 payment in March or April 1988**. Blatt applied it to the earliest March invoice. This is an adopted administrative finding about a payment, not an independently inspected bank-clearing record. No exact payment date, method, bank, account, instrument or personal originator is supplied; it is not a finding that Quock personally paid. The 1997 ALJ version describes the same payment, not another receipt. [P53, pp.9–10](https://www.dta.ny.gov/pdf/archive/decisions/810139.dec.pdf#page=9); [CH2-P54, p.11](https://www.dta.ny.gov/pdf/archive/determinations/810139.DET.pdf#page=11).

The sources then report an August 21, 1989 judgment and state NYFT could not collect on it. The descriptions conflict:

| Source | Reported court county | Reported total |
|---|---|---|
| 1997 ALJ p.11 and 1998 Tribunal p.10 | Kings County | $7,277,169.72, including interest/costs on $5,343,818.67 |
| 1995 Tribunal DTA 811653/811678, p.5 | New York County | $7,277,189.72 |

The **$20 difference and county discrepancy are unresolved original-source differences**, not an OCR repair. No original judgment or index number was acquired. The two versions describe the same reported debt/judgment, not two awards to add. The judgment is not another cash receipt, and reported noncollection is limited to the administrative records, not a current collection-status check. [CH2-P55, p.5](https://www.dta.ny.gov/pdf/archive/decisions/811653.dec.pdf#page=5).

The earlier invoice-sales-tax figure and later stated allocation/balance also do not reconcile. This supplement makes no synthetic tax balance, net-recovery figure or grand total. It does not add the separate later tax payment or tax-account-credit matters as extra money rows.

## Tribunal correction controls the procedural summary

The February 20, 1997 ALJ determination's Conclusion H canceled both 1984 notices outright. The 1998 Tribunal expressly identifies that as an apparent oversight. It allows exemption **only to the extent substantiated**, otherwise denies DTA 810139, denies DTA 810140 and 810253, and sustains the notices as modified. The record supports substantiated exempt sales, not all claimed sales. It is neither blanket exoneration nor a finding that every Tunyung sale was fictitious. [P54, p.26](https://www.dta.ny.gov/pdf/archive/determinations/810139.DET.pdf#page=26); [P53, pp.13,19–20](https://www.dta.ny.gov/pdf/archive/decisions/810139.dec.pdf#page=19).

## Existing-record crosswalk and companion contract

[CH2-P39](sources.md#ch2-p39--mq-transaction-and-terminal-finance-decision) / CH2-FIN-057 supplies the existing ICC/Enterprise/NYFT financing context. The new sources add an NYFT customer/account branch, not a new ICC loan instrument, factor identifier or ownership match. **CH2-FIN-056 and EP-T04–06 concern the distinct March 1983 Lesez/SMI transaction.** The 1988 Tunyung payment is not a missing component of that payment group and is not joined to its wire or cashbook credit.

`tunyung_observations.csv` is a standalone 17-column companion outside the central financial-flow ingestion pipeline. Observation IDs are unique. Semicolon-separated `source_ids` join the inventory/manifest; page locators distinguish procedural versions. Empty amounts mean unquantified, not applicable or unresolved, never zero. The judgment amount is deliberately blank because the conflicting totals remain in the observation text. The sole numeric `amount_usd` is the reported customer payment, not a bank-verified amount or personal receipt. Every row sets `aggregation_eligible`, `amount_counted`, `transaction_counted` and `bank_cleared_payment_verified` to `false`. Do not sum the rows, gross sales, accounting credits, debt, judgment principal or interest/costs.

The next discriminating originals are the payment instrument/receipts entry, the judgment and execution record, and the 1984 MT-338/exemption/delivery records. None was acquired in this supplement. Original PDFs were retained; text extraction and page renders are derived inspection aids, not additional sources. Raw headers/cookies and the private synthesis are not published.
