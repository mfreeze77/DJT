# NEHHOR exchange: verified domestic-supply comparator

Reviewed 2026-10-28 21:29 UTC. J20-2026-064 / CH7-NEHHOR-EXCHANGE-001. Event date **October 21**, not October 28. Current repository reference: PR78 head `5753d76bc3e54be67336e0a7faf56b4bb1ad4ff0`.

## Findings and inspected originals

**NEHHOR-S001 — [DOE October 21 release](https://www.energy.gov/articles/energy-department-authorizes-exchange-northeast-home-heating-oil-reserve).** Announces a solicitation for up to 315,000 barrels of ultra-low-sulfur heating oil, using reserves in South Portland, Boston and New Haven. Bids closed October 27 at 11 a.m. Central; transfers/deliveries were scheduled by November 13. Wright attributes his direction to the Collins/King letter and discussions with Collins. This verifies an agency domestic response, not a separate personal presidential order. The release describes offers of 25,000–30,000 barrels. No award or realized price reduction is demonstrated. Its broad return-plus-premium description needs the operative clarification below.

**NEHHOR-S002 — [RFP DE-RP96-27PO00002](https://www.spr.doe.gov/nehhor/docs/Northeast%20Home%20Heating%20Oil%20Reserve%20Exchange%20Request%20for%20Proposal.pdf), October 21, 132 pages.** Cover letter physical p4 explicitly disclaims an obligation to award. B.1(d), physical p8: minimum 25,000 barrels; maximum 40% to one offeror/affiliate; 150,000 per site. B.3(m), p9: product is undyed, non-transportation heating distillate with maximum 15 ppm sulfur. B.5(b–c), pp10–11: principal volume returns in kind, but the premium is **revenue in US dollars**, not extra physical barrels. B.6, p13, uses documented in-tank transfers. Return periods extend through September 2027. Tables give November 2026 deliveries, not the release's November13 specificity; text search found neither November13 nor a 30,000 maximum. Preserve those source distinctions rather than silently harmonizing them. Example values are hypothetical, not a transaction. Physical p11 was visually inspected.

**NEHHOR-S003 — [Official solicitation Q&A](https://www.spr.doe.gov/nehhor/docs/Northeast%20Home%20Heating%20Oil%20Reserve%20Exchange%20Questions%20and%20Answers.pdf), 5 pages.** Q16 explicitly confirms dollar payment of the premium on return. Q4 says ownership passes at in-tank transfer and storage duration depends on the winner's terminal agreement. Therefore even a completed title transfer would not alone prove physical delivery to consumers by November13. Q13 calculates the offeror ceiling as 126,000 barrels, consistent with 40% of 315,000. Q1–2 describe outbound flexibility and required commercial terminal arrangements. These are terms, not named winners or receipt records.

All three originals acquired directly HTTP200 and hashed in [consolidation manifest](Tmanch_CH7_Oct28_Evening_Source_Manifest.json); original HTML/PDFs and extracted texts retained in the acquisition archive. No access denial. Initial Python downloader lacked requests; standard-library retrieval succeeded.

## Implementation search and limits

The [official NEHHOR solicitation index](https://www.spr.doe.gov/nehhor/default.htm) exposed RFP, offer form and Q&A, but no acquired award/transfer record. Bounded searches for the exact solicitation identifier and NEHHOR award/date on DOE/SPR domains found no applicable award. Unrelated crude SPR awards are not this heating-oil exchange. **Award, actual volume, winners, PTOs, outbound movement, return/premium receipt and price effects remain unverified.** This is not proof none exists. No bidder submission, contact, registration or purchase attempted.

## Exact repository joins and novelty

Live connector fetch of `research-library/Tmanch_CH7_J20_event_ledger.csv` at the reference SHA; cached files below match its tree blob hashes:
- **J20-2026-051/052; CH7-EPA-DIESEL-001/002**, `research-library/Tmanch_CH7_Oct20_EPA_Diesel_Waivers_Source_Note.md`: Texas/Arctic regulatory flexibility, distinct regions and mechanisms.
- **J20-2026-041; CH7-DPA-PETROLEUM-001**, `research-library/Tmanch_CH7_Oct22_Domestic_Petroleum_DPA_Source_Note.md`: domestic production/refining investment plan, not immediate stock release.
- **J20-2026-040**, `research-library/Tmanch_CH7_Oct23_Diesel_Shipment_Source_Note.md`: separate Russian cargo/production implementation reporting; **011/014** connect GL135 and price rationale in the event ledger.

591 cached textual blobs matched the current tree. No NEHHOR/name match. Four numeric 315,000 substring hits concerned old CAD9,315,000 guarantee fees, not fuel; no event duplicate found in this bounded corpus. No wholesale-repository clearance claimed.

## Cumulative assessment and proposed entry

**United States/allies, prospective.** A reserve-exchange channel could improve Northeast availability and commercial access; eventual premium receipts could benefit the US government. The verified result is an executable solicitation, not delivered fuel or taxpayer profit. No direct Russian benefit established. This strengthens affirmative evidence of a domestic fuel response alongside 041/051/052. It neither erases Russia's separate licensing advantage nor establishes that imported Russian diesel was necessary or unnecessary. Comparing unlike geographies, fuels, timing and regulatory eligibility as perfectly substitutable would overstate the record.

