# November 12 identity controls: Conlo and Blue Bell

This narrow supplement adds two [typed identity observations](identity_observations.csv), not payment or ownership edges. Placement in this collection is for reference and does not establish membership in the ICC–NYFT–SMI payment chain or a title/account match. The existing transaction and relationship companions, financial totals, chapter claims and Bogatin correction history are unchanged. No amount or transaction is counted.

## Conlo: retain the two corporate petitioners

The May 11, 1995 NY Tax Appeals Tribunal decision, DTA 801597, printed p.3 expressly names **Conlo Service Corp.** and **Conlo Service, Inc.** as two corporate petitioners in consolidated proceedings. It describes Ronald Weiner, Isidore Weiner and Harry Radinsky collectively as officers of the corporations, without allocating precise titles or ownership to either. The original PDF and rendered page 3 were inspected. [CH2-P45](sources.md#ch2-p45--conlo-corporate-petitioners).

Pages 1–2 use differing Inc./Corp. labels, making the express distinction on p.3 important. The tax period is January 1 through February 29, 1984. The issue is whether grounds existed to vacate a default order; pp.8–9 deny the exception and sustain the notice. This is not a new merits finding about every sale or later transactions. Neither corporation is matched by corporate identifier or a transfer instrument to the Conlo, Inc. named in Macchia. An officer reference is not an ownership or seller identification.

## Blue Bell: official metadata, not an acquired certificate

NY's All Filings response for **DOS 884703** records **BLUE BELL TRADING CO., INC.**, **MAJOR ENERGY COMPANY (FICTITIOUS NAME)**, an **APPLICATION OF AUTHORITY**, film **A978447-6**, filed/approved/effective **May 10, 1983**, and foreign-incorporation date **August 26, 1980**. The entity type is foreign business corporation and county is Suffolk. These are calendar dates, not inferred UTC instants. This is the new official-source upgrade for these exact fields. [CH2-P46](sources.md#ch2-p46--blue-bell-official-all-filings-metadata).

The returned row has no foreign-jurisdiction field. It does not establish Panama incorporation or a match to the Panama candidate or an Austrian account holder. No certificate image, ownership instrument or transfer record was acquired. One returned row is not a completeness audit of all historical filings.

## Data and provenance contract

`identity_observations.csv` is a standalone 13-field companion, outside the transaction and central financial-flow ingestion pipelines. Each `observation_id` is unique; `source_id` joins the source inventory. `cross_source_identity_status=unresolved` describes the unproved cross-source matches, not doubt that the original record contains the quoted names. `amount_counted` and `transaction_counted` are always `false`. Identifiers are record locators, not payment values.

The [sanitized source manifest](identity_source_manifest_2026-11-12.json) distinguishes original PDF/response bytes from derived text/render and analyst-created records. Source hashes are provenance, not new evidence. No source archive, raw response headers, cookies or private synthesis is included. These observations do not add an accusation, personal-benefit claim, financial amount, or petroleum-to-property trace.

## Separate DOE proceeding: no corporate identity upgrade

The [bounded DOE refund note](doe_refund_note_2026-11-12.md) follows HEF-0053 and RF236-1 using four official Federal Register sources (CH2-P47–P50). It preserves the audit-period and table-value discrepancies and distinguishes commitment, agency-reported remittance, conditional allocation and award. It supplies no corporate identifier or private signatory matching this Conlo Service to either DTA petitioner or Macchia’s Conlo. EP-I01 and EP-I02 are unchanged. Its separate stage observations are non-additive and create no transaction, ownership or personal-benefit inference.
