#!/usr/bin/env python3
"""Apply the Russia–China–Iran targeting research update idempotently."""

from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, content: str) -> None:
    (ROOT / path).write_text(content, encoding="utf-8")


def insert_before(text: str, marker: str, addition: str, sentinel: str) -> str:
    if sentinel in text:
        return text
    if marker not in text:
        raise RuntimeError(f"Marker not found: {marker!r}")
    return text.replace(marker, addition.rstrip() + "\n\n" + marker, 1)


def insert_after(text: str, marker: str, addition: str, sentinel: str) -> str:
    if sentinel in text:
        return text
    if marker not in text:
        raise RuntimeError(f"Marker not found: {marker!r}")
    return text.replace(marker, marker + "\n" + addition.rstrip() + "\n", 1)


def update_chapter() -> None:
    path = "Tmanch_CH7.md"
    text = read(path)
    text = text.replace("August 26, 2026", "August 27, 2026")
    text = text.replace(
        "· [primary sources](Tmanch_CH7_primary_sources.md) · [Russian-source appendix]",
        "· [primary sources](Tmanch_CH7_primary_sources.md) · [Russia–China–Iran targeting and casualty matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md) · [Russian-source appendix]",
    )

    executive_finding = r'''## Finding 6A — Foreign targeting support reached Iran during lethal attacks on Americans, while Russian pressure was relaxed

The Russia–Iran relationship became an American-casualty issue in 2026.

Official U.S. military records establish that an Iranian unmanned aircraft struck a U.S. tactical operations facility at Port Shuaiba, Kuwait, on March 1, killing six Army Reserve soldiers and wounding additional personnel. U.S. intelligence reporting subsequently indicated that Russia supplied Iran with information concerning American warships, aircraft, and other military assets. A later intelligence assessment reviewed by Reuters described at least 24 Russian satellite surveys covering 46 military and critical-infrastructure objects in 11 Middle Eastern countries, with Iranian attacks reportedly following Russian collection in multiple cases.

The public record does not yet identify which Russian intelligence product caused any individual casualty. It does, however, place Russian operational support inside the same campaign in which Americans were killed and wounded.

The China evidence provides an important comparator. The State Department sanctioned three China-based geospatial companies and an Iranian intermediary on the ground that imagery of U.S. and allied military facilities enabled Iranian strikes against U.S. forces. The public attribution was company-specific; it did not establish that Beijing directed every transfer.

Trump's response to the Russian allegation was markedly different. After attending the dignified transfer for the soldiers killed in Kuwait, he minimized the reported assistance and resisted treating it as a major rupture in U.S.–Russia relations. Witkoff later said Putin and Yuri Ushakov denied the assistance and that the United States could take them at their word, while acknowledging that intelligence agencies needed to determine the truth.

At the same time, Treasury issued General License 133 and then the 134 series, authorizing delivery and sale of qualifying Russian-origin oil cargoes. GL 133 preceded public reporting of the intelligence allegation by one day; GL 134 and its extensions followed the public allegation and Trump's minimization. These were limited energy-market authorizations, not repeal of the Russia sanctions regime. They nevertheless preserved Russian transaction and revenue channels during a period when Moscow was credibly accused of helping Iran locate American military assets.

The complete evidence and causation ladder appears in the [Russia–China–Iran Targeting and U.S. Casualty Matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md).'''
    text = insert_before(
        text,
        "## Finding 7 — The strongest financial-policy chain is UAE–World Liberty–AI chips–Binance",
        executive_finding,
        "## Finding 6A — Foreign targeting support",
    )

    main_section = r'''# 17A. Russia–China–Iran targeting support and American casualties

The Russia–Iran intelligence relationship became a direct commander-in-chief test when Iranian attacks killed and wounded American service members.

## 17A.1 Established American casualties

The U.S. Army Reserve confirmed that six soldiers assigned to the 103rd Sustainment Command died at Port Shuaiba, Kuwait, on March 1, 2026, during an Iranian unmanned-aircraft attack. CENTCOM also reported seriously wounded personnel and additional shrapnel and concussion injuries during the opening attacks.

This casualty record is established independently of the foreign-intelligence question.

## 17A.2 Russian targeting support

On March 6, reporting based on three officials familiar with U.S. intelligence stated that Russia supplied Iran with targeting information including the locations of American warships and aircraft.

Reuters later reviewed a Ukrainian intelligence assessment alleging that Russian satellites conducted at least 24 reconnaissance surveys covering 46 military and critical-infrastructure objects in 11 countries from March 21 through March 31. Iranian strikes reportedly followed Russian collection within days in multiple cases. The assessment described a sequence involving Prince Sultan Air Base: Russian collection preceded a March 27 Iranian strike that damaged a U.S. E-3 Sentry AWACS aircraft, followed by additional Russian collection on March 28. Reuters reported partial corroboration from two other Western or regional sources. Russia denied the allegation.

The complete U.S. assessment, satellite tasking, imagery dissemination, Iranian receipt records, and strike packages remain unavailable publicly. The evidence is therefore stronger than rumor but narrower than a declassified final intelligence finding.

## 17A.3 China-based imagery support

The State Department separately sanctioned MizarVision/Meentropy Technology, The Earth Eye, Chang Guang Satellite Technology, and Iranian intermediary MINDEX. The official U.S. finding was that imagery of U.S. and allied military facilities enabled Iranian military strikes against U.S. forces.

That establishes company-level enabling support. It does not establish that the Chinese central government directed every transaction.

## 17A.4 Presidential response and Russian denials

After attending the dignified transfer for the six soldiers killed in Kuwait, Trump publicly minimized the reported Russian assistance, saying in substance that it had not helped Iran much and resisting the conclusion that it should materially alter U.S.–Russia relations.

Witkoff later said Putin and Ushakov denied sharing the information and that the United States could take them at their word, while also saying intelligence officials should determine the facts.

The public response did not include an identified Russia-specific sanction tied to the targeting support, an explicit presidential warning, or a visible rupture in diplomacy.

## 17A.5 Russian-oil authorizations during the controversy

OFAC issued:

- General License 133 on March 5;
- General License 134 on March 12;
- General License 134A on March 19;
- General License 134B on April 17; and
- General License 134C on May 18.

The licenses authorized specified delivery and sale transactions involving Russian-origin crude oil and petroleum products. They served identifiable energy-market and supply-stabilization purposes. They did not delist Russia's major energy companies wholesale or repeal the broader sanctions system.

Their significance lies in the chronology. GL 133 preceded public disclosure of the targeting allegation by one day. The broader 134 series continued after the allegation was public, after Trump minimized it, and while further Russian satellite-support reporting emerged.

The result was an asymmetry:

- China-based providers were publicly named and sanctioned for enabling strikes on U.S. forces;
- Russia denied the allegation and received presidential minimization;
- no equivalent public Russia-specific consequence tied to the targeting support has been identified;
- and qualifying Russian oil transactions remained authorized through successive licenses.

## 17A.6 August 27 continuation

When asked on August 27 whether Russia should face punishment for doing business with Iran, Trump said Russia had behaved “quite well” concerning the Strait of Hormuz.

The narrow reading is that he was evaluating Russian maritime behavior rather than revisiting the targeting allegation. The broader analytical significance is that the targeting controversy did not create a durable public presumption of hostility or end the exceptional trust framing applied to Moscow.

## 17A.7 Current finding

> **The public record does not show that Trump wanted American troops harmed, nor does it identify which Russian or Chinese intelligence product caused each casualty. It does establish that Russian state-linked and China-based actors supplied operational targeting support during a campaign that killed and wounded Americans; that the United States publicly sanctioned the named China-based providers; and that Trump's visible response to Russia emphasized minimization, Moscow's denial, continued diplomacy, and licensed Russian-oil pathways. That differential treatment materially strengthens the finding that Russia occupied an exceptional and unusually protected position in Trump's threat hierarchy.**

See the [complete targeting, casualty, sanctions, and records matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md).'''
    text = insert_before(
        text,
        "# 18. Circumstantial-evidence assessment",
        main_section,
        "# 17A. Russia–China–Iran targeting support",
    )

    conclusion_blurb = r'''The Russia–Iran targeting record adds a direct American-casualty dimension. Iranian attacks killed and wounded U.S. service members, including six Army Reserve soldiers at Port Shuaiba. U.S. intelligence reporting indicated that Russia supplied information concerning American military assets, and later reporting described Russian satellite collection preceding Iranian strikes. The State Department publicly sanctioned China-based geospatial companies for imagery that enabled attacks on U.S. forces. Trump instead minimized the Russian allegation, entertained Moscow's denial, maintained high-level engagement, and presided over successive authorizations for qualifying Russian-origin oil cargoes. The licenses had defensible energy-market purposes and did not erase Russia sanctions, but they preserved Russian transaction value during a period when Moscow was credibly accused of helping Iran target Americans. That response asymmetry is now part of the Chapter 7 payoff and influence analysis.

'''
    if "The Russia–Iran targeting record adds a direct American-casualty dimension" not in text:
        text = text.replace("The later record matters just as much.", conclusion_blurb + "The later record matters just as much.", 1)

    related_line = "- [Russia–China–Iran targeting and U.S. casualty matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md)"
    if related_line not in text:
        text = text.replace(
            "- [Chapter 7 primary-source inventory](Tmanch_CH7_primary_sources.md)",
            "- [Chapter 7 primary-source inventory](Tmanch_CH7_primary_sources.md)\n" + related_line,
            1,
        )

    write(path, text)


def update_conclusion() -> None:
    path = "Current_Working_Tmanch_Conclusion.md"
    text = read(path)
    text = text.replace("August 26, 2026", "August 27, 2026")
    text = text.replace(
        "[Chapter 7 J20 reconciliation](Tmanch_CH7_J20_reconciliation.md)",
        "[Chapter 7 J20 reconciliation](Tmanch_CH7_J20_reconciliation.md) · [Russia–China–Iran targeting and casualty matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md)",
        1,
    )
    if "19. Russian and China-based targeting support" not in text:
        text = text.replace(
            "18. independent banking scrutiny of hundreds of Trump-affiliated accounts for stated anti-money-laundering reasons.",
            "18. independent banking scrutiny of hundreds of Trump-affiliated accounts for stated anti-money-laundering reasons; and\n19. Russian and China-based targeting support supplied to Iran during attacks that killed and wounded American service members, followed by sharply different public consequences.",
            1,
        )

    replacement = r'''## 8.4 Russia–Iran targeting support, American casualties, and sanctions relief

The Russia–Iran seam now reaches beyond Ukraine and regional diplomacy into attacks on American personnel.

Official U.S. military records establish that an Iranian unmanned aircraft struck a U.S. tactical operations facility at Port Shuaiba, Kuwait, on March 1, 2026, killing six Army Reserve soldiers and wounding additional personnel. U.S. intelligence reporting indicated that Russia supplied Iran with targeting information concerning American warships, aircraft, and other military assets.

A later intelligence assessment reviewed by Reuters described at least 24 Russian satellite surveys covering 46 military and critical-infrastructure objects in 11 Middle Eastern countries from March 21 through March 31. Iranian attacks reportedly followed Russian collection within days in multiple cases. The assessment included a sequence involving Prince Sultan Air Base, where collection preceded an Iranian strike that damaged a U.S. E-3 Sentry AWACS aircraft. Reuters reported partial corroboration from other Western and regional sources. Russia denied the allegation.

The public record does not establish which Russian intelligence product caused any individual casualty. That casualty-specific chain remains classified or unreleased. The operational assistance itself is strongly supported by intelligence reporting and a detailed collection-to-strike chronology.

The China evidence provides a formal comparator. The State Department sanctioned three China-based geospatial companies and an Iranian intermediary on the ground that their imagery of U.S. and allied military facilities enabled Iranian strikes against U.S. forces. The attribution was company-specific and did not establish Chinese central-government direction of every transfer.

Trump's response to Russia was markedly different. After attending the dignified transfer for the six soldiers killed in Kuwait, he minimized the reported Russian assistance and resisted treating it as a major rupture in U.S.–Russia relations. Witkoff later said Putin and Yuri Ushakov denied the assistance and that the United States could take them at their word, subject to intelligence review.

Treasury simultaneously issued General License 133 and then General Licenses 134, 134A, 134B, and 134C, authorizing specified delivery and sale transactions involving Russian-origin crude oil and petroleum products. GL 133 preceded public disclosure of the targeting allegation by one day. The 134 series followed the public allegation and Trump's minimization.

Those licenses served identifiable energy-supply and market-stability purposes. They did not repeal the Russia sanctions regime or prove a reward to Moscow. They nevertheless preserved Russian transaction and revenue pathways while Russia was credibly accused of helping Iran locate American military assets.

As of August 27, this research has identified public sanctions against the named China-based providers but no equivalent publicly announced Russia-specific consequence imposed because of Moscow's reported targeting assistance. Trump later said Russia had behaved “quite well” concerning the Strait of Hormuz.

The resulting finding is:

> **The Russia–Iran targeting relationship converts the influence inquiry from abstract policy alignment into a question involving American blood. Foreign adversary-linked actors supplied operational targeting support during a lethal campaign against U.S. forces. Trump did not publicly respond to Russia with the attribution, warning, rupture, or sustained consequence applied to the China-based providers. Instead, he minimized the allegation, entertained Moscow's denial, preserved diplomacy, and allowed qualifying Russian oil transactions through successive licenses. This asymmetry materially strengthens the conclusion that Russia occupied an exceptional and unusually insulated position in Trump's threat hierarchy even when Russian conduct directly threatened American personnel.**

The full causation ladder, source comparison, licensing chronology, alternative explanations, and records plan appear in the [Russia–China–Iran Targeting and U.S. Casualty Matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md).

---

# 9.'''
    pattern = re.compile(r"## 8\.4 Russia–Iran\n\n.*?\n\n---\n\n# 9\.", re.DOTALL)
    if not pattern.search(text):
        raise RuntimeError("Conclusion Russia–Iran section marker not found")
    text = pattern.sub(replacement, text, count=1)

    high_confidence = r'''### Russia received exceptional presidential insulation even after reported support for attacks on Americans

The American casualty record, U.S. intelligence reporting, Russia's denial, Trump's minimization, the absence of an identified public Russia-specific consequence, and contemporaneous Russian-oil authorizations support this finding. The public evidence does not establish casualty-by-casualty causation or prove that Trump protected Russia pursuant to an explicit bargain. It establishes a striking differential response to materially similar foreign targeting support.

'''
    if "### Russia received exceptional presidential insulation" not in text:
        text = text.replace(
            "### Trump repeatedly functioned as an agent of influence in effect",
            high_confidence + "### Trump repeatedly functioned as an agent of influence in effect",
            1,
        )

    if "Russian and Iranian target-package" not in text:
        text = text.replace(
            "- the original Russian non-paper and its transmission chain into U.S. settlement proposals;",
            "- the original Russian non-paper and its transmission chain into U.S. settlement proposals;\n- Russian and Iranian target-package, satellite-tasking, dissemination, and strike-assessment records;\n- the Trump–Putin and Witkoff/Kushner–Ushakov records concerning Russia's targeting-assistance denial;\n- OFAC decision memoranda for General Licenses 133 and 134 through 134C, including what officials knew about Russian support when each license was approved;",
            1,
        )

    if "minimized reported Russian targeting support" not in text:
        text = text.replace(
            "- weakened safeguards against oligarch wealth, foreign influence, and disinformation;",
            "- weakened safeguards against oligarch wealth, foreign influence, and disinformation;\n- minimized reported Russian targeting support to Iran during lethal attacks on American forces while preserving Russian diplomatic and oil-transaction channels;",
            1,
        )

    write(path, text)


def update_sources() -> None:
    path = "Tmanch_CH7_primary_sources.md"
    text = read(path)
    text = text.replace("August 26, 2026", "August 27, 2026")
    section = r'''# G. Russia–China–Iran targeting support, American casualties, and Russian-oil licensing

## CH7-SRC-060 — U.S. Army Reserve Port Shuaiba casualty confirmation

- **Date:** March 1–11, 2026
- **Institution:** U.S. Army Reserve
- **Location:** https://www.usar.army.mil/News/Article/4431227/media-release-army-reserve-confirms-casualty/
- **Supports:** six Army Reserve soldiers killed at Port Shuaiba during an unmanned-aircraft attack; names, unit, date, and location.
- **Does not support:** the intelligence source used by Iran to select or refine the target.

## CH7-SRC-061 — CENTCOM opening casualty update

- **Date:** March 1–2, 2026
- **Institution:** U.S. Central Command
- **Location:** https://www.centcom.mil/MEDIA/STATEMENTS/Statements-View/Article/4418924/operation-epic-fury-update/
- **Supports:** killed, seriously wounded, and additional shrapnel/concussion casualties during Iran's opening attacks.
- **Does not support:** final campaign-wide casualty totals or foreign-intelligence causation.

## CH7-SRC-062 — Washington Post reporting on Russian targeting support

- **Date:** March 6, 2026
- **Publisher:** Washington Post
- **Location:** https://www.washingtonpost.com/national-security/2026/03/06/russia-iran-intelligence-us-targets/
- **Supports:** reporting from three officials familiar with U.S. intelligence that Russia supplied Iran locations and targeting information concerning American warships and aircraft.
- **Does not support:** a declassified final assessment or casualty-by-casualty causal chain.

## CH7-SRC-063 — AP on Trump minimization after dignified transfer

- **Date:** March 7, 2026
- **Publisher:** Associated Press
- **Location:** https://apnews.com/article/iran-russia-intelligence-sharing-trump-oil-prices-109923968208e549fe1d674d7cb71978
- **Supports:** Trump's public minimization, timing after the dignified transfer, and contemporaneous oil-license context.
- **Does not support:** Trump's classified briefing record or private motive.

## CH7-SRC-064 — Reuters on Russian denial and Witkoff response

- **Date:** March 10, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/middle-east/russia-told-trump-it-isnt-sharing-us-military-asset-info-with-iran-says-witkoff-2026-03-10/
- **Supports:** Putin and Ushakov denials; Witkoff's statement that the United States could take them at their word while intelligence officials assessed the claim.
- **Does not support:** truth of the denial.

## CH7-SRC-065 — Reuters on Russian satellite and cyber support

- **Date:** April 7, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/europe/russia-supplies-iran-with-cyber-support-spy-imagery-hone-attacks-ukraine-says-2026-04-07/
- **Supports:** reviewed intelligence assessment, 24 surveys, 46 objects, 11 countries, collection-to-strike chronology, Prince Sultan/AWACS sequence, treaty context, cyber support, and partial corroboration.
- **Does not support:** every Ukrainian assertion as independently confirmed or direct causation for every strike.

## CH7-SRC-066 — Reuters on alleged Russia–Iran intelligence blackmail

- **Date:** March 25, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/europe/russia-sought-blackmail-us-using-intelligence-iran-zelenskiy-says-2026-03-25/
- **Supports:** Zelenskyy's attributed allegation that Russia offered to stop Iran support if the United States stopped Ukraine intelligence support.
- **Does not support:** the allegation as established fact; underlying evidence was not released.

## CH7-SRC-067 — U.S.–China Commission enabling-Iran timeline

- **Date:** May 8, 2026
- **Institution:** U.S.–China Economic and Security Review Commission
- **Location:** https://www.uscc.gov/research/enabling-iran-timeline-chinas-role-during-and-after-operation-epic-fury
- **Supports:** U.S. sanctions against named China-based geospatial firms and the official assertion that imagery enabled Iranian strikes against U.S. forces.
- **Does not support:** Chinese central-government direction of every transfer.

## CH7-SRC-068 — U.S. government statement on China-based imagery providers

- **Date:** 2026
- **Institution:** U.S. government / VOA editorial
- **Location:** https://editorials.voa.gov/a/holding-china-accountable-for-support-of-iran/8148868.html
- **Supports:** names, company roles, MINDEX intermediary, and official U.S. policy attribution.
- **Does not support:** undisclosed intelligence or judicial findings beyond the sanctions action.

## CH7-SRC-069 — OFAC General License 133

- **Date:** March 5, 2026
- **Agency:** Treasury / OFAC
- **Location:** https://ofac.treasury.gov/recent-actions/20260305_33
- **Supports:** specified delivery and sale of Russian-origin oil cargoes to India.
- **Does not support:** reward motive, broad sanctions repeal, or knowledge of the targeting allegation without decision records.

## CH7-SRC-070 — OFAC General License 134

- **Date:** March 12, 2026
- **Agency:** Treasury / OFAC
- **Location:** https://ofac.treasury.gov/recent-actions/20260312_33
- **Supports:** specified delivery and sale authorization for Russian-origin crude and petroleum products.
- **Does not support:** unrestricted Russian oil trade.

## CH7-SRC-071 — OFAC General License 134A

- **Date:** March 19, 2026
- **Agency:** Treasury / OFAC
- **Location:** https://ofac.treasury.gov/recent-actions/20260319_33
- **Supports:** amendment or extension of the GL 134 authorization.
- **Does not support:** complete removal of energy sanctions.

## CH7-SRC-072 — OFAC General License 134B

- **Date:** April 17, 2026
- **Agency:** Treasury / OFAC
- **Location:** https://ofac.treasury.gov/recent-actions/20260417_33
- **Supports:** continued specified Russian-origin oil delivery and sale authorization.
- **Does not support:** a policy bargain with Russia.

## CH7-SRC-073 — OFAC General License 134C

- **Date:** May 18, 2026
- **Agency:** Treasury / OFAC
- **Location:** https://ofac.treasury.gov/recent-actions/20260518_33
- **Supports:** final identified extension in the 134 series and its defined cargo conditions.
- **Does not support:** unrestricted future trade or delisting.

## CH7-SRC-074 — Reuters on August 27 Russia–Iran remarks

- **Date:** August 27, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/middle-east/trump-says-us-is-not-talking-with-iran-economic-war-focus-2026-08-27/
- **Supports:** Trump's statement that Russia had behaved quite well concerning the Strait of Hormuz when asked about punishment for countries doing business with Iran.
- **Does not support:** a conclusion that the remark addressed every prior targeting allegation.

---
'''
    text = insert_before(text, "# Source-control rules", section, "## CH7-SRC-060")
    write(path, text)


def update_claim_ledger() -> None:
    path = "Tmanch_CH7_claim_ledger.csv"
    text = read(path)
    if "CH7-RUS-IRN-001" in text:
        return
    rows = '''CH7-RUS-IRN-001,"Russia-Iran targeting","U.S. intelligence reporting indicated Russia supplied Iran targeting information concerning American warships and aircraft","2026-03","Multiple-official intelligence reporting","Strongly documented intelligence report; final assessment not public",92,"Three officials familiar with U.S. intelligence; later Reuters satellite chronology","Russia denied assistance; assessment remains classified","Russia was credibly reported to have supplied operational targeting information concerning U.S. military assets","Declassified IC assessment, source reporting, dissemination logs","CIA, ODNI, NSA, DIA, NGA, CENTCOM, NSC"
CH7-RUS-IRN-002,"Russia-Iran targeting","Russian satellites reportedly surveyed 46 military and critical-infrastructure objects and Iranian strikes followed collection in multiple cases","2026-03-21/31","Reuters-reviewed Ukrainian intelligence plus corroborating sources","Strong documentary intelligence reporting",88,"24 surveys, 46 objects, 11 countries; two other sources said imagery was shared","Core chronology originated with Ukrainian intelligence; Russia denied it","A detailed collection-to-strike chronology supports Russian operational assistance while exact causation remains unresolved","Satellite tasking, imagery metadata, Iranian receipt and strike packages","NGA, Space Force, CIA, NSA, CENTCOM, foreign partners"
CH7-RUS-IRN-003,"American casualties","An Iranian unmanned aircraft attack at Port Shuaiba killed six Army Reserve soldiers and wounded additional U.S. personnel","2026-03-01","U.S. military primary records","Established by primary record",100,"Army Reserve casualty confirmation and CENTCOM updates","Public records do not identify the foreign intelligence used for the target","Iranian attacks killed and wounded Americans during the same campaign in which foreign targeting support was supplied","Attack investigation, warning, target-selection and casualty files","CENTCOM, Army, DOD"
CH7-CHN-IRN-001,"China-Iran targeting","The United States sanctioned China-based geospatial firms after finding their imagery enabled Iranian strikes against U.S. forces","2026-05-08","Official U.S. sanctions attribution","Established as official government finding",98,"MizarVision, The Earth Eye, Chang Guang and MINDEX named","Does not establish Chinese central-government direction of every transfer","U.S. authorities publicly attributed and sanctioned company-level enabling support","Designation evidentiary memoranda, contracts, imagery logs","State, Treasury, intelligence agencies, commercial records"
CH7-RUS-IRN-004,"Presidential response","Trump minimized reported Russian targeting assistance after attending the dignified transfer for soldiers killed in Kuwait","2026-03-07","Recorded public statement and AP reporting","Established public response",99,"Trump said any Russian information had not helped Iran much and resisted broader rupture","He may have had classified information different from public reporting and may have sought to avoid escalation","Trump publicly minimized rather than warned or punished Russia while the intelligence allegation was active","PDB, briefing record, talking points, options memoranda","White House PRA, NSC, CIA, State"
CH7-RUS-IRN-005,"Russian denial","Witkoff said Putin and Ushakov denied sharing targeting information and that the United States could take them at their word subject to intelligence review","2026-03-10","Reuters attributed interview and readout","Established attributed statement",97,"Putin denial in Trump call and Ushakov denial to Witkoff/Kushner","Witkoff also said intelligence agencies should determine truth","The administration publicly elevated Moscow's denial while intelligence review remained unresolved","Call memorandum, meeting notes, briefing record","White House PRA, NSC, State, CIA"
CH7-RUS-OIL-003,"Russian oil relief","OFAC issued GL 133 and the 134 series authorizing specified delivery and sale of Russian-origin oil during the targeting-assistance controversy","2026-03/06","OFAC primary records","Established by primary record",100,"GL 133, 134, 134A, 134B and 134C","Licenses served energy-market and supply-stability interests and did not repeal sanctions","Successive licenses preserved qualifying Russian oil transaction pathways while Moscow faced targeting allegations","Decision memos, knowledge timeline, cargo and revenue data","Treasury, OFAC, NSC, White House, Energy"
CH7-RUS-IRN-006,"Comparative consequence","The U.S. publicly sanctioned named China-based targeting providers but no equivalent public Russia-specific sanction tied to Moscow's reported targeting support has been identified","2026-05/08","Comparative official record analysis","Strong analytical finding subject to undisclosed actions",88,"Public State action against China-based firms; no located public Russia action tied to the allegation","Classified, diplomatic or nonpublic consequences may exist; evidence standards may differ","The visible consequence architecture treated China-based and Russian support differently","Russia options memo, demarches, covert and sanctions decisions","State, Treasury, NSC, CIA, White House PRA"
CH7-RUS-IRN-007,"August continuation","Trump said Russia had behaved quite well regarding the Strait of Hormuz when asked about punishing countries doing business with Iran","2026-08-27","Reuters report of Oval Office remarks","Established attributed statement",98,"Direct public remarks","May have referred narrowly to maritime conduct rather than targeting assistance","The prior targeting controversy did not produce a durable public presumption of Russian hostility","Full transcript, briefing context, Russia-Iran policy memo","White House, NSC, State"
CH7-RUS-IRN-008,"Intelligence leverage allegation","Zelensky alleged Russia offered to end Iran intelligence support if the United States stopped sharing intelligence with Ukraine","2026-03-25","Attributed presidential allegation","Unverified lead",55,"Zelensky described irrefutable intelligence","No underlying evidence was released; Russia denied broader assistance","Retain as a high-priority blackmail lead, not an established finding","Intercept, source report, Russian proposal or communications","Ukraine intelligence, CIA, NSA, NSC"
'''
    marker = "CH7-CONCL-001,"
    if marker not in text:
        raise RuntimeError("Claim-ledger conclusion marker not found")
    text = text.replace(marker, rows + marker, 1)
    write(path, text)


def update_ofac_matrix() -> None:
    path = "Tmanch_CH7_OFAC_license_matrix.csv"
    text = read(path)
    if "GL_133,2026-03-05" in text:
        return
    rows = '''\nGL_133,2026-03-05,"Delivery and sale of Russian-origin crude oil and petroleum products to India","Indian refiners and consumers; shippers, insurers and banks; Russian sellers and fiscal interests","Specified transactions necessary to deliver and sell qualifying Russian-origin cargoes loaded by the stated date","Issued during Iran-war supply disruption; one day before public reporting of Russian targeting support","Moderate_to_high","Temporary energy-market authorization with real Russian transaction and revenue benefit","Preserved delivery, settlement and sale pathways for qualifying Russian cargoes during a major energy shock","Does not delist Russian oil companies, authorize all Russian oil trade or prove reward motive","https://ofac.treasury.gov/recent-actions/20260305_33","Decision memo; date officials learned of Russian targeting support; cargo values; counterparties; alternative supply analysis"
GL_134,2026-03-12,"Delivery and sale of Russian-origin crude oil and petroleum products","Global energy purchasers and market participants; Russian sellers and fiscal interests","Specified delivery and sale transactions for cargoes loaded by the stated date","Issued after public targeting-assistance reporting and Trump's March 7 minimization; later superseded by 134A","Moderate_to_high","Temporary market-stabilization license; material Russian revenue pathway","Continued qualifying Russian oil sales after the targeting allegation was public","Does not repeal the Russia sanctions regime or establish a quid pro quo","https://ofac.treasury.gov/recent-actions/20260312_33","Interagency decision record; oil-price forecast; targeting-intelligence knowledge; transaction and revenue data"
GL_134A,2026-03-19,"Amended Russian-origin oil delivery and sale authorization","Same market participants and Russian counterparties as GL 134","Extended or amended qualifying cargo and transaction authority","Superseded GL 134; expired April 11, 2026","Moderate_to_high","Extension of temporary Russian-oil relief with supply-stability rationale","Preserved qualifying cargo delivery and sale pathways after Russian denials and continuing intelligence concern","Does not authorize unrestricted future purchases or remove entity designations","https://ofac.treasury.gov/recent-actions/20260319_33","Change log; cargo values; beneficiaries; White House and Treasury approvals"
GL_134B,2026-04-17,"Continued Russian-origin oil delivery and sale authorization","Energy-market participants; Russian sellers; importing states","Continued specified delivery and sale transactions","Followed April 7 Reuters reporting on Russian satellite and cyber support; expired May 16","Moderate_to_high","Post-disclosure continuation of energy-market relief","Preserved Russian transaction value after detailed targeting-support reporting","Does not prove the license was connected to the intelligence allegation","https://ofac.treasury.gov/recent-actions/20260417_33","Decision memo; intelligence briefing chronology; estimated Russian revenue; alternative supply options"
GL_134C,2026-05-18,"Final identified extension of Russian-origin oil cargo authorization","Energy purchasers, logistics providers and Russian sellers","Continued qualifying delivery and sale authority through the defined period","Followed U.S. sanctions against China-based imagery providers; expired June 17","Moderate_to_high","Continued market-stabilization authorization and comparative-consequence evidence","Maintained qualifying Russian oil pathways while China-based targeting providers faced public sanctions","Does not establish that Russia was exempt from every consequence or that China and Russia evidence was identical","https://ofac.treasury.gov/recent-actions/20260518_33","Comparative State/Treasury options; transaction volume; Russian fiscal benefit; expiration and enforcement records"\n'''
    text = text.rstrip() + rows
    write(path, text)


def update_readme() -> None:
    path = "README.md"
    text = read(path)
    text = text.replace("August 26, 2026", "August 27, 2026")
    matrix = "- [Russia–China–Iran Targeting and U.S. Casualty Matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md)"
    if matrix not in text:
        text = text.replace(
            "- [Transatlantic Deterrence and Russia-Pressure Architecture Matrix](Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md)",
            "- [Transatlantic Deterrence and Russia-Pressure Architecture Matrix](Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md)\n" + matrix,
            1,
        )
        text = text.replace(
            "- [Transatlantic Deterrence and Russia-Pressure Architecture Matrix](Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md)\n- [Open questions and records plan]",
            "- [Transatlantic Deterrence and Russia-Pressure Architecture Matrix](Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md)\n" + matrix + "\n- [Open questions and records plan]",
            1,
        )
    write(path, text)


def main() -> None:
    update_chapter()
    update_conclusion()
    update_sources()
    update_claim_ledger()
    update_ofac_matrix()
    update_readme()
    print("Russia–China–Iran targeting research integrated successfully.")


if __name__ == "__main__":
    main()
