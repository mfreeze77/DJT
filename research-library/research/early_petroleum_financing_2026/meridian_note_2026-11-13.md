# Meridian import-tax assessments and limited administrative relief

November 13, 2026. This bounded companion uses the August 27, 1998 Tribunal decision and May 22, 1997 ALJ determination in consolidated DTA 814152 and related dockets. The motor-fuel notice specifically belongs to **DTA 814155**. The [typed observations](meridian_observations.csv) distinguish assessments, components and noncash relief; they add no cash receipt, financial-flow total or corporate identity match. [Sanitized provenance](meridian_source_manifest_2026-11-13.json).

## Invoice/import context, not a payment trace

The Tribunal describes four NYFT invoices to **Meridian Resources and Development Ltd.**: April 24, 1989 (308,700 gallons), April 27 (420,000), September 22 (296,810) and September 25 (124,905). These are customer-invoice dates. The supplier table separately gives ship dates April 25/28 and September 20/22. Do not normalize the customer April 27 date into the supplier April 28 date. The BP supplier invoice is described as **402,399 gallons**, while the September 1990 worksheet and later discussion use **402,339**. The 60-gallon discrepancy remains unresolved. The original invoices were described in the administrative record, not independently obtained here. [CH2-P56, pp.9–10](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=9).

NYFT failed to establish that the April gallons were included in reported taxable receipts. Its proposed May 1 BP/Bonnie B entry of 125,453 gallons was not connected to the Meridian sale by supporting invoices; the separate 402,399-gallon supplier invoice carried the Meridian annotation. No evidence directly addressed September. The unsuccessful challenge was not merely about omitting Meridian's name as buyer on a return. This does not establish that the Meridian invoices were fraudulent or connect these sales to earlier criminal arrangements. [P56, pp.26–28](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=26).

## Typed assessments and overlapping components

| Record | Tax amount | Scope |
|---|---:|---|
| April 1989 motor-fuel component | $58,296.00 | 728,700 gallons × $0.08 |
| Motor-fuel component attributed to September 1989 | $30,738.00 | Net multi-period adjustment below |
| December 3, 1992 Notice L-006773641-6 | $89,034.00 | Sum of the two components; penalty/interest additional |
| April 1989 prepaid-sales-tax component | $47,365.50 | Separate tax on 728,700 gallons |
| September 1989 prepaid-sales-tax component | $27,411.48 | Separate tax on 421,715 gallons |

Sources: [P56, pp.7–8](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=7) and [p.15](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=15). These are tax assessments, not commodity prices, customer payments or proved tax remittances.

The $30,738 net is **(421,715 September 1989 gallons + 7,735 July 1990 gallons − 45,225 June–August 1990 inventory-loss gallons) × $0.08**. Its calculated parts, $33,737.20 + $618.80 − $3,618.00, explain the assessment; they are not additional notices or money flows. The Tribunal corrects the ALJ's “overstated” inventory losses to **understated**, without changing the outcome. The net is not solely September Meridian fuel. [P56, p.8](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=8).

The broader December 28, 1992 prepaid-sales-tax Notice of Determination **L-006902009-4** covers other periods/issues too. Its original totals are not Meridian transaction values or the final modified balance. No aggregate of that notice and its components is calculated here.

## Limited relief and notice-version controls

The Tribunal denied the exception and affirmed the ALJ. Corporate petitions were granted **only under N and O**; officer petitions **only under A and N**; all other relief was denied. This is not blanket cancellation. [P56, pp.40–41](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=40); [CH2-P57, p.28](https://www.dta.ny.gov/pdf/archive/determinations/814152.det.pdf#page=28).

- **A, officer assessments:** Notices L-005694275-6 and L-005694279-2 were conformed to $66,312.39 plus the corporate penalty/interest still unpaid. These are officer penalties linked to an earlier corporate assessment, not independent customer payments or new sales. [P57, pp.18–20](https://www.dta.ny.gov/pdf/archive/determinations/814152.det.pdf#page=18).
- **N, duplicate assessments:** The November/December 1990 tax components of $329,159.95 and $115,342.01, with corresponding penalty/interest, were canceled as duplicates. The Tribunal's express p.17 correction identifies L-006902009-4, L-006933110-7 and L-006933109-7. The ALJ and later recital retain the variant L-006933009-7; that discrepancy is not silently erased. The earlier December figure $113,376.74 is distinct from this version's $115,342.01, not a reconciled replacement. [P56, pp.5,17,35](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=17); [P57, p.28](https://www.dta.ny.gov/pdf/archive/determinations/814152.det.pdf#page=28).
- **O, document type matters:** The improperly issued **April 8, 1993 Notice and Demand L-006902009-4** was canceled. It is **not the Notice of Determination bearing the same number**, as Tribunal p.36 n.24 expressly warns. Do not describe the entire assessment as canceled or infer a refund. [P56, p.36](https://www.dta.ny.gov/pdf/archive/decisions/814152.dec.pdf#page=36).

## Existing work and data contract

[CH2-P53–55 / Tunyung companion](tunyung_note_2026-11-13.md) is crosslinked only for the same earlier debt and duplicate-assessment control. Its reported $102,931.25 payment, judgment conflict and noncollection limits remain unchanged. [CH2-P39](sources.md#ch2-p39--mq-transaction-and-terminal-finance-decision), FIN056's 1983 Lesez/SMI wire and FIN057's terminal-financing structure are separate: no shared account, inventory lot or instrument has been identified. No property evidence, claims, scores or financial totals are changed; no Trump payment is established.

`meridian_observations.csv` is a standalone 16-field companion, not a commodity-sale or cash-flow ledger. `source_ids` join the manifest/index; `parent_observation` marks motor-fuel components belonging to the notice total. Empty amounts are not zero. All rows set aggregation, amount/transaction counting and payment verification to `false`. Assessment, noncash cancellation and customer receipt are not interchangeable. Do not sum parents and components or turn duplicate-assessment relief into recovery.

The two PDFs are procedural versions, not independent transactions. Derived text/render aids and prior private verification do not create additional sources. No underlying invoice, bank record or later judicial-review outcome was acquired. The decisions do not prove the assessed tax was paid.
