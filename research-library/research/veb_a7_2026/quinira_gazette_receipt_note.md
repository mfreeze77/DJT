# Gazette 4156: receipt locators for the existing company-file requests

**Review date:** 13 October 2026 (UTC). **Evidence class:** official administrative publication, receipt metadata only. This supplement was prepared against PR #29 head `0c6f2187d177382bc1a5c310c1702a6818129ebd`. It adds source S120, claim C95 and acquisition M196 without changing any of the 21 registry observations QC01–QC21.

## Source and provenance

- **Publisher:** Cyprus Government Printing Office, *Official Gazette*, issue 4156, Appendix 5, Part III, 18 September 2013. [Official PDF](https://www.mof.gov.cy/mof/gpo/gazette.nsf/12405FDECB88C34EC225872C00406142/%24file/4156%20%2018%209%202013%20%20PARARTIMA%20%205o%20%20MEROS%20%20III.pdf). Its first page identifies the issue and publication date and describes the April 2013 document-receipt list.
- **Original PDF:** 1,978,939 bytes, 594 pages, SHA-256 `0775da7c9f381848e96004e19e15d535e40bc3ba86d9201c2c8f1c3650043502`.
- **Acquisition boundary:** the official PDF was downloaded earlier on 13 October 2026. Its precise original acquisition time is unavailable. The existing bytes were rehashed and inspected again on the same date; this supplement does not claim a fresh download or an acquired underlying instrument.
- **Review method:** SHA-256 and PDF metadata check; native-text search of the whole PDF for the exact company identifiers; visual inspection of the three receipt pages to verify headers, row alignment, document counts and printed-page footers. The receipt sidecar is a transcription of those selected entries, not a copy of the whole source or a certified company history.
- **Page convention:** `pdf_page` in the sidecar is one-based. PDF 199 / 432 / 433 correspond to zero-based image indices 198 / 431 / 432 and printed pages 2953 / 3186 / 3187. Printed pages are the document's visible page numbers.

## Verified receipt observations

| ID | Company | Receipt date as printed | Type | Documents | PDF / printed page | Registry comparison only |
| --- | --- | --- | --- | ---: | --- | --- |
| QG01 | Quinira, HE286910 | 09/04/13 | Charge registration | 2 | 433 / 3187 | QC12–QC18; individual-document mapping unresolved |
| QG02 | Freegain, HE286456 | 09/04/13 | Charge registration | 1 | 432 / 3186 | QC19–QC21; individual-document mapping unresolved |
| QG03 | Equalchance, HE187745 | 16/04/13 | Charge registration | 1 | 199 / 2953 | QC05–QC06; individual-document mapping unresolved |
| QG04 | Equalchance, HE187745 | 16/04/13 | Court order | 1 | 199 / 2953 | QC09 for comparison only; not matched |

The table headings are **Ημερομηνία Παραλαβής Εγγράφων** (document-receipt date), **Είδος Εγγράφων - Εντύπων** (document/form type), and **Αριθμός Εγγράφων** (number of documents). The relevant types are **Εγγραφή Επιβάρυνσης** (charge registration) and **Διάταγμα Δικαστηρίου** (court order). These are working translations of the verified headings and labels. The sidecar preserves the native extracted Freegain spelling `FREΕGAIN` with its mixed Greek epsilon and supplies `FREEGAIN` separately as a Latin search label; the company-number match is explicit.

All four rows in [the receipt sidecar](quinira_gazette_receipts.csv) use `date_type=gazette_document_receipt_not_registry_Order_Date` and `include_in_totals=no`. A receipt date is not the existing index's literal Order Date, an instrument's execution or registration date, a closing date or an advance date. A document count is not a debt count. Matching a company number does not match an individual Gazette document to an HE24, HE50 or X00F record.

## Equalchance reconciliation remains open

QC05 and QC06 record HE50 file page 10 and HE24 file page 9 with literal registry Order Date **18/04/2013**. QC09 is the existing X00F court-order observation at file page 5, with literal Order Date **26/03/2012**. The Gazette records receipt of an Equalchance court order on **16/04/13**. QG04 is therefore a comparison lead, not a matched order. The underlying document must establish whether the receipt concerns an earlier order, resubmission or another order, with its originating court, case number and actual order date. Neither a new order or debt nor enforcement or a missing registry document is established. The evidence does not identify the contents of file page 8.

## Acquisition effect and unchanged boundaries

The Gazette narrows the availability-and-quotation request by adding published receipt locators. It is a distinct administrative publication within the Registrar's evidence family, not independent authentication of financing. The current execution order in [the instrument-access note](quinira_instrument_access_followthrough.md) is unchanged: **Quinira and Freegain together first; Belego, Sileni and Equalchance later**.

Only the repository copies of [the Quinira/Freegain inquiry](quinira_freegain_quotation_inquiry.md) and [the later-stage requests](quinira_record_requests.md) receive locator supplements. The previously saved Gmail draft is unchanged and no request has been sent. No paid work is authorized by this supplement.

There is no new transaction ID, monetary amount, lender identity, executed right, completed acquisition, advance, debt balance, Toronto payment leg or later A7 claim. The registry index, company review, financing-role records, transaction chronology and financial ledgers remain unchanged. T06 and T22 gain no funding or proceeds proof; all receipt observations remain excluded from totals. The missing underlying instruments and the existing date, identity and financial boundaries remain open.
