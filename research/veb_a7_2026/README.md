# VEB / A7 / Trump Toronto: evidence-ranked crosswalk
**Research cut-off:** 2026-10-09. **Status:** working research, not a finding of a common payment chain.

## Core finding

**VEB/VEB.RF is a common institution in two temporally distinct lines of research. No reviewed source establishes an A7-to-Trump transfer, a VEB-to-Trump loan, or a completed bank-level trace from VEB-financed steel proceeds to Trump Toronto fees.** Do not merge the two timelines.

**A7 (2024–2026).** FinCEN's October 5, 2026 notice of proposed rulemaking says Promsvyazbank (PSB) pledged its A7 LLC stake to VEB as collateral for loans to A7 (footnote 23). FinCEN cites the Centre for Information Resilience (CIR), which cites FrankMedia and Star-Pro. **FinCEN -> CIR -> earlier reporting is one dependent evidence chain, not three independent confirmations.** Executed loan/pledge agreements and actual drawdown records have not been obtained. CIR reports A7 was registered September 2, 2024, with earlier registry data indicating Ilan Shor 51% / PSB 49%; CIR separately reports Exim International as Shor 75% / VEB 25% and cautions that Exim is not formally part of A7's ownership structure. [S01] [S02]

**Toronto (2007–2017).** The Wall Street Journal's 2017 reporting (reproduced in the Congressional Record) describes an approximately $850m sale of a Ukrainian steel stake financed through VEB-linked buyers. Shnaider's lawyer initially said about $15m from the sale entered the Toronto project, then wrote he could not confirm any such transfer. Trump Organization said it was a licensor/manager, not an equity owner, and denied VEB dealings. **RF-014 correctly treats the $15m as disputed and excluded from totals.** [S05] [S06] [S07]

## New primary-record check: Toronto receivership

FTI Consulting's **First Receiver's Report, December 14, 2016, Ontario Superior Court CV-16-11573-00CL** is a useful original court-filed document. Paragraph 1 identifies Talon International, Midland Development and other project entities. Paragraphs 5–6 explicitly say the receiver used unaudited information and did not independently verify all respondent records to assurance standards. [S03]

- Paragraph 16 identifies an October 9, 2007 **C$400m principal debenture** by Talon International in favor of BNY Trust Company of Canada as agent. **Face principal is not a verified cash draw or Trump receipt.**
- Paragraph 17(a) identifies subordinate registered charges including **Midland Resources Holding Limited**. A charge does not prove its funds originated at VEB.
- Paragraph 17 lists additional security registrations and a 2013 perfection/renewal issue. These identify documents and parties to trace; they do not prove a Russian source.
- Appendix D items 7–12 list project-account pledges, including one with **Raiffeisen Zentralbank Österreich Aktiengesellschaft**. Item 14 identifies an August 5, 2011 share pledge. Items 17–19 and 22 list assignments of CCU, restaurant/bar/spa and material project agreements. **None of these labels alone establishes an executed Trump trademark or management-fee agreement.**
- The [FTI reports index][S04] identifies subsequent receivership reports and final receipts/disbursements. Those may reconstruct 2016–2019 cash, **not necessarily 2010 provenance**.

## A7 sanctions and adjacent leads

Treasury's October 2026 action calls A7 a sanctions-evasion network used by Iranian actors including the IRGC and designated the network as a significant transnational criminal organization. FinCEN's proposed special measure is **a proposed restriction**, distinct from effective OFAC sanctions. These are official U.S. assessments, not proof of any A7 payment to a Trump entity. [S01] [S08]

The existing [a7-veb-fin working note](../../a7-veb-fin) contains additional **lower-strength leads**: A7/Garantex and Karavatsky's historical Peresvet/Rosneft role [S09] [S10]; Exved intermediaries' unverified reference to Deutsche Bank Hong Kong [S09] [S11]; the Baku/IRGC subject overlap [S08] [S12]; reported Abramovich A7 activity [S13]; and Kushner's documented meeting with VEB chairman Sergey Gorkov [S14]. **None supplies a common account, funds transfer or transactionally relevant intermediary connecting A7 to Trump.** Keep each lead separate and preserve denials/counterevidence.

## Source and transaction hygiene

1. **Do not combine amounts:** reported $850m steel-sale value, disputed $15m project contribution, unsupported $100m visualization amount, and 2007 C$400m debenture principal describe different categories. None establishes direct Trump income.
2. **Do not count dependent citations as independent:** FinCEN cites CIR; CIR cites FrankMedia and Star-Pro. Congressional Record reproduces WSJ reporting rather than independently verifying its interviews.
3. **Do not time-travel:** A7 was registered in September 2024. Its operation cannot explain Toronto payments from 2010.
4. **Distinguish claims:** an equity pledge is not a loan disbursement; a loan commitment is not cash received; a mortgage is not proof of funding origin; a project contribution is not a Trump licensing payment.
5. **Treat negative results as scoped:** no connection was found in the sources reviewed, not proof no connection could exist.
6. **No financial total changes:** RF-014 remains excluded from direct-receipt and branded-ecosystem totals.

## Legacy visualization conflicts (do not silently promote)

- **2010 event-081:** asserts $15m moved into Toronto; its moneyFlow direction is “to-trump” despite isDirectFlow=false. It contradicts the withdrawn/unconfirmed status in RF-014.
- **2011 event-076:** asserts VEB paid $850m to Midland and sets a $100m “to-trump” moneyFlow. The $100m figure has no identified bank-level source; the upstream deal is not a Trump payment.
- **2010 and 2011 event-074:** different events share the same local ID. A global join on event ID alone merges unrelated facts.
- The 2010 relationship “relationship-veb-shnaider-trump” is marked confirmed while describing the disputed onward transfer. Entity descriptions in both years also promote the same unresolved pathway.

This PR **preserves the original annual JSON and existing ledger**. The [legacy event review](legacy_event_review.csv) and [interpretation sidecar](legacy_event_interpretations.json) document controlling readings with composite keys. The [validator](validate_evidence.mjs) is read-only. A visualization must explicitly consume the sidecar; its presence does not rewrite the old graph.

## What evidence would resolve this?

**Toronto:** signed steel closing + payer and seller accounts + Shnaider/Midland capital ledger + project capital-call/loan entry + corresponding bank wire + Trump licensing/management invoices and receipts. Alternative funding sources and negative bank reconciliation could falsify the alleged $15m link.

**A7:** original PSB/VEB pledge registration, VEB credit agreement, maturity and facility terms, evidence of drawdowns, Shor/PSB/Exim corporate extracts, and bank settlement records. A pledge without a disbursement proves security, not a particular cash flow.

**Across periods:** same specific bank account, decision-maker, intermediary, payment vehicle or contractual obligation with documented continuity. Merely sharing VEB is insufficient.

See [source ledger](sources.csv), [claim ledger](claims.csv), [relationship crosswalk](relationships.csv), and [lawful records plan](records_plan.md). All entries distinguish reported allegations from court-filed records, and include counterevidence and missing proof.

## Validation and review boundary

Run from the repository root using Node.js 22:

```sh
node research/veb_a7_2026/validate_evidence.mjs
node --test research/veb_a7_2026/validate_evidence.test.mjs
```

The validator checks CSV structure, unique record IDs, source references across all ledgers, mandatory exclusion of the disputed flows, crosswalk consistency, legacy snapshot drift, and Markdown source labels. The regression tests use **synthetic fixtures**, not additional research evidence. A structural pass does not authenticate a source or prove a financial allegation. Changes to the legacy snapshots require a corresponding evidence review, not restoration of an unsupported claim merely to satisfy a test.

## Source keys

[S01]: https://www.federalregister.gov/public-inspection/2026-20371/special-measure-prohibiting-the-transmittal-of-funds-regarding-transactions-involving-the-a7
[S02]: https://www.info-res.org/app/uploads/2025/10/A7-Abroad-FINAL-Copy.pdf
[S03]: https://cfcanada.fticonsulting.com/talon/docs/Receiver%27s%20First%20Report%20%28Security%20Opinion%2C%20Status%20Report%29.pdf
[S04]: https://cfcanada.fticonsulting.com/talon/reports.htm
[S05]: https://www.govinfo.gov/content/pkg/CREC-2017-05-17/pdf/CREC-2017-05-17.pdf
[S06]: https://businessmirror.com.ph/2017/06/05/bank-at-center-of-us-inquiry-projects-russian-soft-power/
[S07]: ../../Tmanch_Russian_Linked_Financial_Flows.csv
[S08]: https://home.treasury.gov/news/press-releases/sb0644
[S09]: https://home.treasury.gov/news/press-releases/sb0225
[S10]: https://www.icij.org/investigations/russia-archive/firm-related-to-sanctioned-crypto-exchange-garantex-is-a-partner-of-moscow-gang-leader-and-has-links-to-kremlin-controlled-rosneft/
[S11]: https://cryptolaundromat.ti-russia.org/chapter-1/
[S12]: ../../Tmanch_CH4_primary_sources.md
[S13]: https://www.rferl.org/a/russia-cryptocurrency-a7a5-ilan-shor-investigation-sanction-evasion/33746026.html
[S14]: ../../Tmanch_CH5.md
