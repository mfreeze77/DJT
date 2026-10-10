# Accounting and settlement delta: original fee disclosures and later holder accounts

**Research cutoff:** October 9, 2026 US Central / October 10 UTC. **Base:** `ef53c200ea9ada6d5e5a893ffd4d35a6c2bd6c09`, merged PR #25. Current main and open PRs were checked before creating `research/veb-a7-accounting-settlement`; main was the specified merge and the open-PR collection was empty. This investigation is PR #26, not continued work on either merged branch. The initial checkpoint was committed before final research.

Source IDs refer to the [existing source ledger](sources.csv); [the acquisition manifest](acquisition_manifest.csv) preserves URLs, hashes and reviewed-page boundaries. The new [accounting reconciliation](accounting_reconciliation.csv) is a companion to the existing transaction crosswalk, **not a second total or a cash-transfer ledger**. Blank fields mean not obtained, not zero. The original disputed RF-014 classification and both total exclusions remain unchanged.

## 1. The most consequential new record is an original disclosure of a defined fee period

Three actual OGE Form 278e disclosure PDFs were obtained through public DocumentCloud reproductions. These are reproductions of signed public disclosure forms, not new interviews or articles describing them. Covers, relevant income entries and period footers were inspected as page images. The forms are self-reports; their certification is not bank-level authentication.

| Form | Precise locator | Reported amount and category | Period boundary |
|---|---|---|---|
| Signed May 16 2016 | Physical p25, Part 2 item 142, schedule reference 442 | USD611,864; management fees for Trump Toronto Hotel Management Corp | Income interval is not separately itemized in this entry; do not treat the filing year as an isolated calendar year |
| Signed June 14 2017 | Physical p25, same item/reference | USD559,904; management fees for the same entity | Page footer says information as of April 15 2017; no monthly allocation |
| Signed May 15 2018, annual report for 2017 | Physical p24, same item/reference; cover p1 | **USD2,273,297; management fees and other contract payments** | **January 1–December 31 2017 is explicitly stated on the page** |

(S45–S47; R01–R03.) The 2016 entry describes an underlying licence with Talon while labeling its income management fees. Later entries describe a management deal with Talon. Preserve those descriptions rather than fabricating separate licence and management payments. The USD1,001–15,000 asset-value range in the later forms refers to bank-account holdings, not the income amount.

**What is strengthened:** a named Trump-related entity and a specific reported calendar-year income amount are now supported by the original disclosure reproduction. The prior reliance on an article's description of at least USD611,000 is superseded for that amount by the form itself. The later USD2,273,297 finding is new to this research package.

**What is not strengthened by these forms:** no invoice, remitting account, exact credit date, settlement currency, fee-to-contract allocation, beneficial-source reconciliation or steel-proceeds provenance was obtained. The USD2,273,297 cannot be called entirely ordinary management fees, entirely a termination payment, net personal profit, or Russian-origin receipts. The words other contract payments do not quantify their components.

The later forms name Talon in the asset description; that does not resolve why the receivership materials name condominium corporations 2267 and 2279 as management counterparties. The contracting entity, obligor, remitter and recipient account remain separate fields. No contradiction is assumed without the executed contracts and allocation schedules. The group-level T14 amount remains blank; the self-reported income sits in R01–R03 with empty traced-payment fields.

**No three-year sum:** different filing cutoffs and possible overlap prevent adding the three amounts as nonoverlapping annual receipts. OGE's official guidance distinguishes annual reporting from candidate/new-entrant periods; it is not used to fill undocumented dates in these particular forms. The 2018 form itself supplies the clean 2017 reporting interval. (S52.)

### Acquisition provenance

The official OGE index was acquired, but its 2017/2018 Box links returned 404. The 2016 DocumentCloud URL was located through a filed CREW complaint; the 2017 URL through a contemporary Axios document embed; the 2018 URL through a House report citation. These are discovery paths, not independent corroboration of the form amounts. Actual PDF bytes were acquired separately and hashed. No claim of a fresh certified OGE download is made. (S45–S47, S55; M40–M42 and M47.)

## 2. Later Aragon accounts add accounting evidence but expose a classification boundary

The holder's own disclosure page supplied new **H1 2026 IFRS and Russian-accounting statements**. These are **Aragon's accounts**, not the still-unretrieved A7 issuer financial ZIPs. The IFRS report is a 14-page condensed interim statement with a limited review dated August 28; it is not a full annual audit. Its investment disclosures do not provide the 13-note serial inventory. The 38-page Russian-accounting scan was selectively inspected, especially balance-sheet pp1–2 and Table 5.1 on p19. (S48–S50.)

### A. The same filing uses two different category labels for matching amounts

The H1 Russian-accounting balance sheet, physical p2, labels a component securities: **RUB688,764,000 opening and RUB514,411,000 closing**. Table 5.1, physical p19, labels a row with those same values deposit accounts. It reports RUB1,183,854,000 additions and RUB1,358,206,000 derecognition at original cost. These are book-movement categories, not automatically cash paid or redeemed. (S49; R27–R30.)

The opening figure also equals the total initial book values of the 13 A7-named notes in the 2025 statement. This is a useful reconciliation target but **not an issuer-ID match or proof that any specific serial was redeemed**. A preparer/template classification issue is plausible; no falsification is inferred. We retain both source labels.

There is also a small arithmetic difference: the displayed opening plus additions minus derecognition equals RUB514,412,000, while the displayed closing is RUB514,411,000. The RUB1,000 difference could reflect rounding or an error, but the cause is unverified. It is recorded rather than silently repaired. This difference is not evidence of missing or illicit funds.

### B. The 2025 statement reports actual cash-flow categories, but only at portfolio level

New examination of the existing 2025 PDF, physical p9, finds reported **RUB1,492,629,000 paid for debt securities/monetary claims** and **RUB816,855,000 sale proceeds**. These are materially better accounting evidence than a holdings table alone. They still are not a serial-level A7 purchase/redemption ledger. Proceeds, acquisition cost, changes in carrying value, exchange differences and accrued interest must not be treated as interchangeable. (S25; R20–R21.)

A separate loan series *does* reconcile within the reported statements: RUB580.4m opening less RUB209.2m repayments equals RUB371.2m at year-end 2025. In H1 2026, RUB371.2m less RUB87.16m repayments equals RUB284.04m, matching the related-party loan table. The 2025 note names Kerber for this loan portfolio. **This is a control reconciliation for a different asset, not A7 funding or note redemption.** No new influence edge to Kerber is inferred. It illustrates why subtracting every loan repayment from the A7-named notes would manufacture a false chain. (S25 pp9,24; S48 pp8,14; R22–R26.)

## 3. Serial A7R0004947: the public evidence still stops before issuer identity and settlement

The original 2025 table was visually checked again. It reports A7R0004947 drawn October 17 2025, USD400,000 face, presentation no earlier than October 28 2025, RUB31,634,000 initial value and RUB643,000 accrued interest. Their sum is a **derived RUB32,277,000 carrying value**, not an independently observed bank payment. The second selected serial, A7R0010382, is drawn December 30 2025, USD2 million face, presentation no earlier than January 20 2026, with RUB154,893,000 initial value and RUB43,000 interest. (S25; R12–R19.)

**Important qualification:** date of drawing is not the acquisition date. An earliest-presentation date is not an actual redemption date or proof the note is overdue after that date. Exact-serial web searches returned no usable connecting original record in this pass. Later holder financial statements do not supply the missing issuer OGRN, certificate/register entry or settlement instruction. N22 therefore remains separate from N07.

| Required stage | Actual result |
|---|---|
| Serial and reported holding | Table transcription verified |
| Legal issuer of this serial | Not resolved; issuer name alone is insufficient |
| Note copy and accepted purchase/custody contract | Not obtained |
| Applicable contract version and holder-register entry | Standard versions known; this holder's acceptance/register entry missing |
| Endorsement or other transfer documents | Not obtained |
| Presentation/redemption instruction | Not obtained |
| Matched settlement | Not obtained; denomination and carrying currency are not settlement proof |

### Legal and contractual distinction

Federal Law 48-FZ article 1 applies the 1937 regulation and article 4 requires paper instruments. The regulation's articles 11–16 distinguish endorsement, assignment exceptions and a holder's rights; article 34 permits a not-before presentation condition, and article 77 applies the relevant provisions to promissory notes. The texts were read in public legal reproductions, not obtained as certified gazette copies. They do not establish the legal effect of a particular custody-register change without the original note, endorsements, delivery/agency terms and applicable contract. **Custody entitlement, note ownership and ultimate beneficial ownership remain distinct.** (S53–S54.)

A7's current FAQ describes ruble purchases/payments and alternative use of notes in foreign-trade payment arrangements. It also states that detailed activity/financial indicators are not publicly disclosed to avoid additional sanctions pressure. These are current first-party statements, not proof of Aragon's use, the 2025 contract version, or universal unavailability of issuer filings. Historical custody-version discrepancies documented in PR #25 are retained; this pass does not resolve them. (S51.)

## 4. MRHL/MDI: additional operative clauses, but no invented debt rollforward

Selected previously underexamined pages of the already-acquired Talon application were read. Exhibit V sections 3.1–3.3 provide a cost-overrun demand mechanism; section 3.9 addresses application of amounts received by the agent to project costs/overruns. Sections 6.1 and 7.1 subordinate the cost-overrun provider's debt and restrict repayments, subject to the agreement's terms and agent consent. These clauses identify the **demand notices, consultant computations, agent postings and written repayment consents** that could connect an obligation to a payment. They are not evidence that a particular demand or disbursement occurred. Later amendments or waivers were not comprehensively obtained. (S18 physical 637–645.)

Affidavit paragraph 71, physical 47, confirms the reported CAD105,651,246 includes accrued interest, continues to accrue 15 percent interest, and is separate from CAD9,315,000 in non-interest-accruing guarantee fees. These are sworn assertions based on counsel's advice, not independent ledger verification. The original principal, advance dates, repayments, capitalization and 2011 assignment consideration remain blank in R04–R11. A rate and closing balance cannot solve those missing components.

Affidavit paragraph 100, physical 55, proposed periodic respondent receipts/disbursements reporting **with bank reconciliations**, rather than assuming the receiver held all operating accounts. That identifies a potentially useful receiver/party reporting package; the reports themselves were not obtained. The earlier receiver accounting-scope qualifications remain controlling. Exhibit X physical 661 was also inspected: it concerns the Lombard charge postponement, not the June 2011 assignment. It is not misidentified as a VEB or Raiffeisen payment.

Targeted name/date searches and selected exhibit review did not locate the executed June 2011 deed or the later USD850 million closing bank attachments. This was not an exhaustive search of all 1,029 scanned pages or an assertion that the court records cannot exist. The earlier Luxe refund/break-payment enclosures remain separate from the later Troika closing. No purchaser entity, VEB loan account or Trump knowledge of source of funds was newly established.

## 5. What changed and what did not

| Link or inference | Result |
|---|---|
| Toronto contract to reported Trump-related economic benefit | **Strengthened** by original disclosure reproductions and an explicit 2017 income interval |
| Reported income to a matched remitter/recipient bank entry | Unresolved |
| USD2.273 million as entirely a termination fee or ordinary management income | Unsupported; mixed category retained |
| Aragon financial holdings to accounting movements | **Strengthened at aggregate level**, with internal category-label discrepancy identified |
| A7R0004947 or A7R0010382 to identified issuer and settlement | Unresolved |
| Earliest presentation date equals redemption or default | Unsupported |
| MRHL cost-overrun obligations to specific demand/payment records | Mechanism and acquisition targets sharpened; no actual demand/payment obtained |
| Steel proceeds to Toronto or RF-014 USD15 million | Unchanged; withdrawn/unconfirmed and excluded |
| Continuous Toronto–A7 financial channel | Not established in reviewed records |

Legitimate ongoing fees and other contractual payments fit the Trump disclosure; ordinary treasury investment and reclassification fit the holder accounts. Those alternatives do not erase the documented relationships. Conversely, the new amounts do not identify VEB origination, political coordination or control. The two histories remain separately investigated.

## 6. Next requests narrowed by the records (drafts only; not sent)

**Toronto recipient/accounting:** Please identify publicly releasable records supporting item 142/reference 442 in the 2016, 2017 and 2018 disclosures. For calendar 2017, please separate management fees from other contract payments within USD2,273,297 and identify the service periods, contracts, invoices, obligors, remitters and recipient entries. Include any termination allocation and explain the relationship among Talon, condominium corporations 2267/2279 and Trump Toronto Hotel Management Corp. This does not request confidential banking access without authorization.

**MRHL/MDI/receiver:** Please identify nonsealed filed demand notices under Exhibit V sections 3.1–3.3, consultant cost-overrun calculations, agent receipts/application records and repayment consents under section 7.1; the June 2011 deed and debt schedule; and any filed periodic respondent cash reports/bank reconciliations contemplated by affidavit paragraph 100. Please distinguish principal, interest, guarantee fees and assignment consideration. No confidential SARs or sealed records are sought.

**Aragon/issuer:** Please clarify why the H1 2026 balance sheet describes the 688764/514411 thousand-ruble row as securities while Table 5.1 calls it deposit accounts, and supply any publicly releasable analytical schedule mapping opening positions to additions, derecognition and closing positions. For the two selected serials, please identify the issuer's OGRN, note copies, accepted contracts, custody/endorsement chain, presentation and settlement documents. Please explain the RUB1,000 displayed arithmetic difference without presuming its cause. These are voluntary/public-record drafts, not sent inquiries.

**VEB/Exim:** Original facility/pledge, actual advances, Exim contribution and distribution records remain needed. ACRA's identified release failed certificate validation; a registry-aggregator A7-Agent lead returned 403. No insecure retry or access bypass occurred. The aggregator lead concerns a different company's interest and is not promoted into proof of the PSB 49 percent A7 pledge. The earlier A7 issuer ZIP failures remain; Aragon's newly acquired reports do not cure them.

## 7. Validation and acquisition boundary

The merged research baseline was actually rerun: 49 tests passed. The existing rinfo audit was only an integrity rerun, not new discovery. Source bytes for the newly acquired forms and holder accounts were hashed and compared with acquisition manifests. No source PDFs, personal account numbers or unneeded personal tax identifiers are committed.

After this update, local checks pass: 55 sources, 56 claims, 30 relationships, 4 legacy entries; 24 entities, 21 typed entries, 13 instruments, 57 acquisition entries; 31 accounting rows; **61 tests, zero failures**. Twelve new rejection tests protect income/receipt, period, mixed-category, issuer, currency, portfolio/serial and unknown-value distinctions. Only the appended-record count expectation changed in the existing production test. Current published-head CI must be read from the PR rather than inferred from an acquisition run.

The underlying assignment, closing exhibits, executed fee schedules, note-specific bank matches and original VEB financing remain unacquired. This is substantive accounting progress with defined public-record limits, not a claim that the missing settlement chain is proven or the investigation exhausted.
