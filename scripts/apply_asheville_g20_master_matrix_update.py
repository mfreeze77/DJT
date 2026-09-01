#!/usr/bin/env python3
"""Integrate the Asheville G20 normalization event into existing master records.

This is intentionally idempotent and creates no permanent stand-alone research file.
"""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def replace_once(path: str, old: str, new: str) -> None:
    text = read(path)
    if new in text:
        return
    if old not in text:
        raise RuntimeError(f"Anchor not found in {path}: {old[:100]!r}")
    write(path, text.replace(old, new, 1))


def insert_before_once(path: str, marker: str, anchor: str, block: str) -> None:
    text = read(path)
    if marker in text:
        return
    if anchor not in text:
        raise RuntimeError(f"Anchor not found in {path}: {anchor[:100]!r}")
    write(path, text.replace(anchor, block.rstrip() + "\n\n" + anchor, 1))


def insert_after_once(path: str, marker: str, anchor: str, block: str) -> None:
    text = read(path)
    if marker in text:
        return
    if anchor not in text:
        raise RuntimeError(f"Anchor not found in {path}: {anchor[:100]!r}")
    write(path, text.replace(anchor, anchor + "\n\n" + block.rstrip(), 1))


def append_once(path: str, marker: str, block: str) -> None:
    text = read(path)
    if marker in text:
        return
    write(path, text.rstrip() + "\n\n" + block.strip() + "\n")


def insert_lines_after_once(path: str, marker: str, line_fragment: str, lines: list[str]) -> None:
    text = read(path)
    if marker in text:
        return
    src = text.splitlines()
    for index, line in enumerate(src):
        if line_fragment in line:
            src[index + 1:index + 1] = lines
            write(path, "\n".join(src) + "\n")
            return
    raise RuntimeError(f"Line anchor not found in {path}: {line_fragment!r}")


# ---------------------------------------------------------------------------
# J20 master investigative ledger
# ---------------------------------------------------------------------------
replace_once(
    "J20-Pres.md",
    "### Coverage: January 20–December 2025",
    "### Coverage: January 20, 2025–present",
)
replace_once(
    "J20-Pres.md",
    "This file began as a rapid chronological notebook. It is now a source-controlled index rather than a running collection of headlines.",
    "This file began as a rapid chronological notebook. It is now a source-controlled living index rather than a running collection of headlines.",
)
insert_after_once(
    "J20-Pres.md",
    "2026 and later entries use year-qualified identifiers",
    "Anonymous posts are used for reception and lead generation—not as standalone proof.",
    "2026 and later entries use year-qualified identifiers such as `J20-2026-001` so the established 2025 record is not renumbered as the living tracker expands.",
)
insert_after_once(
    "J20-Pres.md",
    "voluntary restoration of senior Russian financial access",
    "- and repeated threats against Russia that were delayed, narrowed, or not implemented as announced.",
    "- voluntary restoration of senior Russian financial access and status before any publicly announced Russian concession.",
)
insert_after_once(
    "J20-Pres.md",
    "Bessent’s reported refusal to discuss economic relief",
    "- and Russian nationalist frustration that Trump had not delivered Moscow’s complete territorial and security agenda.",
    "- and Bessent’s reported refusal to discuss economic relief with Anton Siluanov until Russia ended the war in Ukraine.",
)

j20_rows = [
    "| **J20-2026-001** | Mar. 1–Apr. 7, 2026 | Iranian attacks killed and wounded U.S. service members while intelligence reporting indicated Russia supplied Iran targeting information concerning American military assets; later reporting described Russian satellite collection preceding Iranian strikes. Russia denied the allegations. | American casualties established; Russian support strongly reported; casualty-specific causation unresolved | 5 | 5 | [Russia–China–Iran targeting matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md) |",
    "| **J20-2026-002** | Mar. 5–May 18 | OFAC issued GL 133 and the GL 134 series authorizing specified delivery and sale transactions involving Russian-origin oil. The licenses served energy-market purposes but preserved Russian transaction and revenue pathways during the targeting-assistance controversy. | Verified targeted sanctions loosening; not wholesale repeal | 4 | 1 | [OFAC license matrix](Tmanch_CH7_OFAC_license_matrix.csv) |",
    "| **J20-2026-003** | Mar. 7–10 | After the dignified transfer for six soldiers killed in Kuwait, Trump minimized reported Russian assistance; Witkoff repeated Putin and Ushakov’s denials and said the United States could take them at their word subject to intelligence review. | Verified presidential-response asymmetry | 4 | 3 | [High-magnitude red-flag synthesis](Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md) |",
    "| **J20-2026-004** | Aug. 25–27 | CIA Director Ratcliffe made a rare Moscow visit; Trump publicly assured that Putin would not attack NATO based on their good talks and separately said Russia had behaved quite well concerning the Strait of Hormuz. | Verified access and trust-framing sequence; private purpose and commitments unresolved | 4 | 4 | [Chapter 7](Tmanch_CH7.md) |",
    "| **J20-2026-005** | Aug. 31 | As G20 host, the United States restored Russian Finance Minister Anton Siluanov to in-person participation and granted him a bilateral with Treasury Secretary Scott Bessent—the first such appearance since the 2022 full-scale invasion. European officials protested and refused the customary group photograph. Trump defended the invitation by saying he liked getting along with everybody; Russia framed the meeting as bilateral financial cooperation. Bessent reportedly told Siluanov no economic relief was possible until Russia ended the war. No prior Russian concession was publicly announced. | Verified discretionary normalization; immediate Russian status benefit; substantive Bessent counterevidence preserved | 4 | 3 | [Reuters on return and objections](https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/) · [Reuters on Bessent warning](https://www.reuters.com/world/bessent-told-russian-finance-minister-no-economic-relief-until-ukraine-war-ends-2026-08-31/) |",
]
insert_lines_after_once(
    "J20-Pres.md",
    "J20-2026-005",
    "| **J20-050**",
    j20_rows,
)

# ---------------------------------------------------------------------------
# Machine-readable J20 event matrix
# ---------------------------------------------------------------------------
append_once(
    "Tmanch_CH7_J20_event_ledger.csv",
    "J20-2026-005,2026-08-31",
    '''J20-2026-001,2026-03-01/04-07,Russia-Iran targeting and U.S. casualties,"Russian targeting support during attacks on Americans","Promoted from Chapter 7 casualty matrix","Iranian attacks killed and wounded U.S. service members while intelligence reporting indicated Russia supplied Iran targeting information concerning American military assets; later reporting described Russian satellite collection preceding Iranian strikes. Russia denied the allegations.",5,5,"Russian officials denied assistance; Russian commentary emphasized U.S. support for Ukraine as a comparison.",Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md,"Declassified U.S. assessment, satellite tasking, dissemination, Iranian receipt and casualty-specific strike files"
J20-2026-002,2026-03-05/05-18,Russian oil licensing,"GL 133 and GL 134 series during targeting controversy","Verified and promoted with scope qualification","OFAC authorized specified delivery and sale transactions involving Russian-origin oil. The licenses served energy-market purposes but preserved Russian transaction and revenue pathways during the targeting-assistance controversy.",4,1,"Russian energy interests retained qualifying transaction pathways; public Russian treatment emphasized continued market access.",Tmanch_CH7_OFAC_license_matrix.csv,"Decision memoranda, cargo values, beneficiaries and official knowledge timeline"
J20-2026-003,2026-03-07/10,Presidential response,"Trump minimization and elevation of Russian denials","Verified and promoted","After the dignified transfer for six soldiers killed in Kuwait, Trump minimized reported Russian assistance; Witkoff repeated Putin and Ushakov denials and said the United States could take them at their word subject to intelligence review.",4,3,"Russian denials received prominent U.S. repetition and no identified public Russia-specific targeting penalty followed.",Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md,"Presidential briefing record, call memoranda, options papers and any classified consequences"
J20-2026-004,2026-08-25/27,Intelligence diplomacy and NATO trust framing,"Ratcliffe Moscow visit and Trump assurances","Verified events; private substance unresolved","CIA Director Ratcliffe made a rare Moscow visit; Trump publicly assured that Putin would not attack NATO based on good talks and said Russia had behaved quite well concerning the Strait of Hormuz.",4,4,"Russian officials treated intelligence contact and presidential assurances as evidence of privileged bilateral trust.",Tmanch_CH7.md,"Mission authorization, readout, Trump-Putin communications and NATO contingency guidance"
J20-2026-005,2026-08-31,Financial normalization and allied fracture,"Siluanov restored to U.S.-hosted in-person G20 finance participation","Verified discretionary normalization; counterevidence preserved","As G20 host, the United States restored Russian Finance Minister Anton Siluanov to in-person participation and granted him a bilateral with Treasury Secretary Scott Bessent, the first such appearance since the 2022 full-scale invasion. European officials protested and refused the family photograph. Trump defended the invitation through a desire to get along with everybody. Russia framed the meeting as bilateral financial cooperation. Bessent reportedly said no economic relief was possible until Russia ended the war. No prior Russian concession was publicly announced.",4,3,"TASS amplified Trump’s congeniality rationale; Russia’s Finance Ministry and Interfax described Russian-American financial-track and G20 cooperation.",https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/,"Invitation decision, White House and Treasury instructions, bilateral transcript, sanctions agenda, allied consultations and any concession obtained"''',
)

# ---------------------------------------------------------------------------
# J20 reconciliation and Russian reception
# ---------------------------------------------------------------------------
append_once(
    "Tmanch_CH7_J20_reconciliation.md",
    "## August 31, 2026 — volunteered financial normalization at Asheville",
    '''# 2026 continuation — promoted master-ledger events

The living J20 ledger now carries year-qualified 2026 entries rather than forcing new material into the closed 2025 numbering sequence. The first promoted continuation rows connect the Russia–Iran targeting and casualty record, contemporaneous Russian-oil licenses, presidential minimization, August intelligence diplomacy, and the Asheville G20 event.

## August 31, 2026 — volunteered financial normalization at Asheville

As host of the G20 finance ministers and central-bank governors meeting in Asheville, the United States restored Russian Finance Minister Anton Siluanov to in-person participation and granted him a bilateral meeting with Treasury Secretary Scott Bessent. It was Siluanov’s first in-person G20 finance appearance since Russia’s 2022 full-scale invasion of Ukraine.

This was not mechanically compelled by a new Russian concession. No withdrawal, ceasefire, end to reported targeting support for Iran, acceptance of Ukrainian sovereignty, sanctions-compliance agreement, or NATO-related restraint was publicly announced before the invitation.

The immediate Russian-side benefits were:

- restored senior access to the U.S. Treasury secretary;
- visible treatment as a normal great-power financial interlocutor;
- domestic and international propaganda value;
- a Russian official narrative of renewed bilateral financial interaction;
- and allied division over whether Moscow should be normalized while its war continued.

Trump defended the invitation by saying that he liked getting along with everybody. That rationale is direct presidential evidence that the invitation was framed as congenial engagement rather than as a publicly specified exchange for Russian performance.

European officials treated the invitation as a troubling normalization signal and refused the customary group photograph with Siluanov.

### Counterevidence

Reuters reported that Bessent told Siluanov that there would be no economic relief or agreements on other matters until Russia ended its war and interrupted discussion of mutual interests to deliver that condition.

That is substantive counterevidence to a claim that the bilateral itself granted immediate sanctions relief. It does not erase the volunteered status, access, legitimacy, propaganda, and allied-fracture benefits already delivered by the invitation.

The controlling classification is:

> **A verified, discretionary normalization event with immediate Russian status value, no publicly announced prior Russian concession, and real but limited Bessent counterevidence. The Russian benefit was front-loaded; the American condition remained prospective.**

### Sources

- [Reuters — Europeans bristle at Russia’s return to the G20](https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/)
- [Reuters — Bessent told Siluanov no economic relief until the war ends](https://www.reuters.com/world/bessent-told-russian-finance-minister-no-economic-relief-until-ukraine-war-ends-2026-08-31/)
- [Reuters — U.S. host brings Russia back to G20 finance meeting](https://www.reuters.com/world/china/g20-host-us-pushes-growth-agenda-allay-debt-market-concerns-2026-08-31/)
- [Washington Post — Trump defends the invitation](https://www.washingtonpost.com/world/2026/08/31/russian-finance-minister-invited-by-trump-draws-objections-g-20-meeting/)
- [TASS — Trump says he wants to get along with everyone](https://tass.com/world/2180105)
- [Interfax — Russian Finance Ministry readout](https://interfax.com/newsroom/top-stories/118922/)
- [Associated Press — simultaneous SCO gathering involving Russia, China, and Iran](https://apnews.com/article/cf543dfad0a20097ed4c2b415a26e8b4)''',
)

replace_once(
    "Tmanch_CH7_J20_russian_commentary.md",
    "### Coverage: January 20–December 2025, with later context through August 2026",
    "### Coverage: January 20, 2025–present, with promoted 2026 continuation events",
)
append_once(
    "Tmanch_CH7_J20_russian_commentary.md",
    "## August 31, 2026 — Asheville G20 normalization",
    '''## August 31, 2026 — Asheville G20 normalization

Russian official and state-media framing treated Anton Siluanov’s return to an in-person G20 finance meeting as more than a technical attendance decision.

- **TASS** centered Trump’s statement that he wanted to get along with everybody, giving Russian audiences a presidential rationale based on congeniality rather than punishment or conditionality.
- **Russia’s Finance Ministry and Interfax** described the Bessent–Siluanov meeting as discussion of Russian-American interaction on the financial track and cooperation within the G20 framework.
- The Russian public account omitted or deemphasized the sharper reported U.S. condition that no economic relief would be available until the Ukraine war ended.
- The event supplied a visible narrative of restored bilateral status while Russia, China, Iran, and other SCO members were meeting in Bishkek around an explicitly multipolar institutional platform.

This material is reception evidence. It does not prove that the United States intended to reward Russia or that Bessent offered relief. It proves that Russian official channels immediately converted the invitation, bilateral access, and Trump’s explanation into a normalization story.

The event’s propaganda value came from a simple contrast:

> **Europe said Russia could not be treated as normal; the U.S. host received Russia’s finance minister, granted a Treasury bilateral, and the American president publicly explained that he likes getting along with everybody.**

### Sources

- [TASS](https://tass.com/world/2180105)
- [Interfax](https://interfax.com/newsroom/top-stories/118922/)
- [Reuters on European objections](https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/)
- [Reuters on the Bessent condition](https://www.reuters.com/world/bessent-told-russian-finance-minister-no-economic-relief-until-ukraine-war-ends-2026-08-31/)''',
)

# ---------------------------------------------------------------------------
# Chapter 7 and supporting architecture
# ---------------------------------------------------------------------------
replace_once(
    "Tmanch_CH7.md",
    "## January 20, 2025–August 27, 2026",
    "## January 20, 2025–August 31, 2026",
)
insert_before_once(
    "Tmanch_CH7.md",
    "# 17B. Volunteered financial normalization at Asheville",
    "# 18. Circumstantial-evidence assessment",
    '''# 17B. Volunteered financial normalization at Asheville

On August 31, 2026, the United States used its role as G20 host to restore Russian Finance Minister Anton Siluanov to in-person participation and grant him a bilateral meeting with Treasury Secretary Scott Bessent. It was Siluanov’s first in-person G20 finance appearance since Russia’s full-scale invasion in 2022.

The event was discretionary in the form that mattered. Russia remained a G20 member, but the United States controlled the host setting, bilateral access, diplomatic presentation, and normalization signal. The administration had excluded or downgraded other participants while receiving Siluanov, weakening the claim that protocol mechanically dictated the outcome.

No publicly announced Russian concession preceded the invitation. Russia had not ended the war, withdrawn from occupied territory, ended reported targeting assistance to Iran, accepted a broad ceasefire, or provided an identified NATO-related restraint.

The immediate Russian benefits were:

- restored senior financial access;
- visible great-power status;
- bilateral Treasury engagement;
- propaganda value;
- renewed discussion of financial-track cooperation;
- and division with European allies seeking continued isolation.

European officials objected publicly and refused the customary family photograph. Germany’s finance minister said Russia should not be received as a normal guest while people continued dying in Ukraine.

Trump did not defend the invitation by identifying a concession extracted from Moscow. He said that the administration liked getting along with everybody and linked that preference to his own success.

Russia’s official account described the bilateral as discussion of Russian-American financial interaction and G20 cooperation. TASS amplified Trump’s congeniality rationale.

Bessent’s reported conduct is important counterevidence. Reuters reported that he told Siluanov no economic relief or agreements on other subjects were possible until Russia ended the war and cut off an attempt to discuss mutual interests.

The bilateral therefore did not publicly deliver immediate sanctions relief. But it did deliver status, access, legitimacy, and propaganda value before Russian compliance.

The correct cumulative finding is:

> **The Asheville event was an affirmative, volunteered normalization step—not merely passive G20 attendance. Russia received immediate financial-diplomatic status and allied-fracture value without a publicly announced prior concession. Bessent’s reported warning limits an inference of unconditional economic accommodation; it does not erase the front-loaded normalization benefit or Trump’s decision to justify it through personal congeniality.**

The event belongs in the same sequence as:

- reported Russian targeting support to Iran during lethal attacks on American forces;
- Trump’s minimization and repetition of Moscow’s denial;
- successive Russian-origin oil authorizations;
- Ratcliffe’s exceptional Moscow visit;
- Trump’s personal assurance that Putin would not attack NATO;
- and simultaneous Russian coordination with Iran and China through the SCO.

Placed in that sequence, Asheville is not a stand-alone diplomatic curiosity. It is a continuation of the recurrent pattern in which Russia receives an immediate benefit while the American condition or promised Russian restraint is deferred.
''',
)
insert_before_once(
    "Tmanch_CH7.md",
    "The Asheville restoration added a financial-normalization dimension",
    "The later record matters just as much.",
    "The Asheville restoration added a financial-normalization dimension to that asymmetry. The United States granted Russia’s finance minister in-person status and a Treasury bilateral before any publicly announced Russian concession; European allies protested the signal. Bessent reportedly refused immediate relief, but the access and legitimacy benefit had already been delivered.",
)

append_once(
    "Tmanch_CH7_support.md",
    "## August 31, 2026 — Asheville G20 financial normalization",
    '''## August 31, 2026 — Asheville G20 financial normalization

The U.S.-hosted G20 finance meeting restored Anton Siluanov to in-person participation for the first time since the 2022 invasion and provided a bilateral with Scott Bessent. European officials publicly objected and declined the customary family photograph. Trump defended the invitation through a general preference for getting along with everybody. Russian official reporting described bilateral financial-track and G20 cooperation.

Reuters separately reported that Bessent told Siluanov no economic relief or agreements on other subjects would be available until Russia ended the war. That is meaningful counterevidence, but it occurred inside an already delivered normalization event.

**Classification:** verified discretionary normalization; front-loaded Russian status/access benefit; back-loaded American condition; no publicly announced prior Russian concession.

**Primary research location:** `J20-Pres.md` and `Tmanch_CH7_J20_event_ledger.csv`.

**Sources:**

- https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/
- https://www.reuters.com/world/bessent-told-russian-finance-minister-no-economic-relief-until-ukraine-war-ends-2026-08-31/
- https://www.washingtonpost.com/world/2026/08/31/russian-finance-minister-invited-by-trump-draws-objections-g-20-meeting/
- https://tass.com/world/2180105
- https://interfax.com/newsroom/top-stories/118922/''',
)

append_once(
    "Tmanch_CH7_primary_sources.md",
    "## CH7-SRC-080 — Russian Finance Ministry / Interfax readout",
    '''# H. Asheville G20 financial normalization

## CH7-SRC-075 — Reuters on Russia’s return and European objections

- **Date:** August 31, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/business/finance/europeans-bristle-russias-return-g20-2026-08-31/
- **Supports:** Siluanov’s in-person attendance; first such appearance since the 2022 invasion; bilateral with Bessent; European objections; refusal of the family photograph; host-setting context.
- **Does not support:** an express U.S.–Russia bargain, sanctions relief granted in the room, or secret commitments.

## CH7-SRC-076 — Reuters on Bessent’s condition

- **Date:** August 31, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/bessent-told-russian-finance-minister-no-economic-relief-until-ukraine-war-ends-2026-08-31/
- **Supports:** attributed report that Bessent told Siluanov no economic relief or agreements on other subjects were possible until Russia ended the war and interrupted discussion of mutual interests.
- **Does not support:** a complete transcript, proof that no other subject was discussed, or Russian compliance.

## CH7-SRC-077 — Washington Post on the invitation and Trump rationale

- **Date:** August 31, 2026
- **Publisher:** Washington Post
- **Location:** https://www.washingtonpost.com/world/2026/08/31/russian-finance-minister-invited-by-trump-draws-objections-g-20-meeting/
- **Supports:** Trump’s statement that the administration liked getting along with everybody; European reaction; Treasury’s membership-and-dialogue rationale.
- **Does not support:** private motive or a concession obtained from Moscow.

## CH7-SRC-078 — TASS amplification of Trump’s rationale

- **Date:** August 31, 2026
- **Publisher:** TASS
- **Location:** https://tass.com/world/2180105
- **Supports:** Russian state-media amplification of Trump’s congeniality explanation and Russian presentation of the meeting as financial cooperation.
- **Does not support:** neutral proof of U.S. motive or the full Bessent–Siluanov exchange.

## CH7-SRC-079 — AP on the simultaneous SCO context

- **Date:** August 30–31, 2026
- **Publisher:** Associated Press
- **Location:** https://apnews.com/article/cf543dfad0a20097ed4c2b415a26e8b4
- **Supports:** simultaneous gathering of Russia, China, Iran, and other states at the SCO summit; the organization’s counter-Western and multipolar positioning.
- **Does not support:** coordination between the Asheville invitation and SCO events.

## CH7-SRC-080 — Russian Finance Ministry / Interfax readout

- **Date:** August 31, 2026
- **Publisher:** Interfax citing the Russian Finance Ministry
- **Location:** https://interfax.com/newsroom/top-stories/118922/
- **Supports:** Russian official description of the bilateral as discussion of Russian-American interaction on the financial track and G20 cooperation.
- **Does not support:** completeness, the U.S. account of conditions, or an agreement to provide relief.''',
)

append_once(
    "Tmanch_CH7_claim_ledger.csv",
    "CH7-G20-005,\"Cumulative classification\"",
    '''CH7-G20-001,"Financial normalization","The U.S.-hosted G20 meeting restored Russian Finance Minister Anton Siluanov to in-person participation and a bilateral with the Treasury secretary","2026-08-31","Reuters and official/attributed records","Established",99,"First in-person finance appearance since 2022; Bessent bilateral; U.S. host setting","Russia remained a G20 member and dialogue can serve legitimate purposes","The administration voluntarily delivered senior financial access and status","Sanctions relief or a secret bargain","The U.S. restored Siluanov to a prominent in-person financial forum and granted a Treasury bilateral.","Who approved the invitation and what was sought in return?","White House and Treasury invitation, agenda, instructions and allied consultation records"
CH7-G20-002,"Allied fracture","European officials objected to treating Russia as normal and refused the customary family photograph","2026-08-31","Reuters documentary reporting","Established",98,"German and other European objections; photo protest","Allies still participated and some supported dialogue","The invitation imposed a visible allied-cohesion cost","Permanent alliance break","European officials treated the invitation as a troubling normalization signal.","What consultations occurred before the invitation?","Treasury, State, NSC and allied communications"
CH7-G20-003,"Presidential rationale","Trump defended the invitation by saying he liked getting along with everybody","2026-08-31","Recorded public statement and documentary reporting","Established public statement",100,"Direct quotation carried by multiple outlets and Russian state media","Statement may be shorthand rather than complete policy rationale","The president publicly framed the decision through personal congeniality rather than a named Russian concession","Private motive or secret terms","Trump publicly justified the invitation through a desire to get along with everybody.","What briefing and options preceded the statement?","White House talking points, decision memo and meeting preparation"
CH7-G20-004,"Counterevidence","Bessent reportedly told Siluanov no economic relief or other agreements were possible until Russia ended the war","2026-08-31","Reuters attributed source reporting","Credibly reported counterevidence",93,"Source said Bessent interrupted discussion of mutual interests to impose the condition","No public transcript; other topics may have been discussed","The bilateral did not publicly grant immediate economic relief","Elimination of status and normalization value","Bessent reportedly conditioned economic relief on an end to the war, limiting an unconditional-accommodation inference.","Was the condition formal and what response did Siluanov give?","Bilateral transcript, readout, follow-up and sanctions records"
CH7-G20-005,"Cumulative classification","The Asheville event delivered immediate Russian status, access, legitimacy and propaganda value before any publicly announced Russian concession","2026-08-31","Primary/documentary chronology plus analysis","Strong analytical inference",91,"First post-invasion in-person return; bilateral; allied protest; Trump rationale; Russian financial-cooperation framing","Bessent imposed a reported condition; Russia remained a member; dialogue can be useful","Front-loaded normalization and allied-fracture value","A proven quid pro quo or immediate sanctions relief","Asheville was a verified discretionary normalization event whose immediate Russian benefit preceded any publicly announced concession.","What concession, if any, was privately obtained or later performed?","Invitation rationale, complete bilateral record, Russian response and implementation files"''',
)

append_once(
    "Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md",
    "## August 31, 2026 addendum — financial normalization and allied cohesion",
    '''## August 31, 2026 addendum — financial normalization and allied cohesion

The transatlantic architecture is weakened not only through military withdrawals or Article 5 ambiguity. It can also be weakened when the United States unilaterally restores an adversary’s diplomatic and financial status while European allies are still attempting to maintain isolation.

| Pressure dimension | Asheville event | Immediate effect | Counterevidence | Net assessment |
|---|---|---|---|---|
| Diplomatic isolation | First in-person G20 finance appearance by Siluanov since the 2022 invasion | Reduced Russia’s visible isolation | Russia remained a formal G20 member | Material normalization signal |
| Senior financial access | Bilateral with U.S. Treasury secretary | Restored direct high-level financial channel | Bessent reportedly refused relief until war ended | Access delivered; relief withheld publicly |
| Allied cohesion | European objection and refusal of family photo | Created visible U.S.–European division over treatment of Russia | Allies remained in the meeting | Moderate allied-fracture cost |
| Presidential deterrence framing | Trump said he likes getting along with everybody | Replaced a concession-based public rationale with personalized congeniality | Full internal rationale is not public | Reinforces personalized Russia treatment |
| Russian propaganda | TASS and official readout emphasized bilateral financial cooperation | Converted the U.S. invitation into status and normalization messaging | Russian state accounts omit adverse details | Immediate narrative benefit |

This event does not by itself change the matrix’s weighted 55–70 percent degradation range. It adds another high-confidence observation to the diplomatic-isolation and allied-cohesion layer:

> **The transatlantic system can remain formally intact while the American executive voluntarily degrades the common isolation posture and forces allies to signal resistance to Washington’s treatment of Russia.**''',
)

append_once(
    "Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md",
    "# 11. August 31 continuation — financial normalization after the targeting controversy",
    '''# 11. August 31 continuation — financial normalization after the targeting controversy

Four days after Trump said Russia had behaved quite well concerning the Strait of Hormuz, the U.S.-hosted G20 finance meeting restored Anton Siluanov to in-person participation and a bilateral with Scott Bessent.

The event extended the high-magnitude sequence:

1. Americans were killed and wounded in Iranian attacks.
2. Russia was credibly reported to have supplied targeting support during that campaign.
3. Trump minimized the allegation and Moscow’s denials received public weight.
4. Russian-origin oil transaction authority continued through successive licenses.
5. No equivalent public Russia-specific targeting penalty was identified.
6. Trump continued favorable public framing of Russian conduct concerning Iran.
7. The United States then delivered renewed senior financial access and status without a publicly announced prior Russian concession.

Bessent reportedly told Siluanov no economic relief would be available until Russia ended the Ukraine war. That condition is real counterevidence and means the meeting cannot be described as an immediate sanctions grant.

The cumulative red flag nevertheless grew because the administration delivered the normalization benefit first:

> **The targeting controversy did not move Russia into a durably hostile category in Trump’s public threat hierarchy. It was followed by continued oil authorizations, favorable rhetoric, intelligence-level engagement, and finally a volunteered restoration of senior Russian financial status on American soil.**''',
)

# ---------------------------------------------------------------------------
# Working conclusion and repository index
# ---------------------------------------------------------------------------
replace_once(
    "Current_Working_Tmanch_Conclusion.md",
    "### Coverage: 1977–August 27, 2026",
    "### Coverage: 1977–August 31, 2026",
)
insert_after_once(
    "Current_Working_Tmanch_Conclusion.md",
    "Asheville extended that asymmetry into financial diplomacy",
    "The full causation ladder, source comparison, licensing chronology, alternative explanations, and records plan appear in the [Russia–China–Iran Targeting and U.S. Casualty Matrix](Tmanch_CH7_Russia_China_Iran_Targeting_Casualty_Matrix.md).",
    "Asheville extended that asymmetry into financial diplomacy. On August 31, the United States restored Russia’s finance minister to in-person G20 participation and a bilateral with the Treasury secretary before any publicly announced Russian concession. European allies protested the normalization signal. Bessent reportedly told Siluanov no economic relief was possible until the war ended, but the access, status, legitimacy, propaganda, and allied-fracture benefits had already been delivered. Trump defended the invitation by saying that he liked getting along with everybody.",
)
insert_after_once(
    "Current_Working_Tmanch_Conclusion.md",
    "restored senior Russian financial status before a publicly announced concession",
    "- minimized reported Russian targeting support to Iran during lethal attacks on American forces while preserving Russian diplomatic and oil-transaction channels;",
    "- restored senior Russian financial status before a publicly announced concession, producing immediate access, legitimacy, propaganda, and allied-fracture value while the American condition remained prospective;",
)
insert_after_once(
    "Current_Working_Tmanch_Conclusion.md",
    "the Asheville G20 invitation decision",
    "- OFAC decision memoranda for General Licenses 133 and 134 through 134C, including what officials knew about Russian support when each license was approved;",
    "- the Asheville G20 invitation decision, bilateral transcript, Trump and Treasury instructions, Russian requests, allied consultations, and any concession obtained or performed;",
)

replace_once(
    "README.md",
    "The Chapter 7 expansion covers January 20, 2025 through August 27, 2026.",
    "The Chapter 7 expansion covers January 20, 2025 through August 31, 2026.",
)
insert_after_once(
    "README.md",
    "volunteered Asheville G20 financial normalization",
    "The rapid ledger is retained as investigative evidence discovery. Every material event is promoted, qualified, merged as a duplicate, retained as an unresolved lead, or corrected with an explanation. Nothing is silently discarded.",
    "The living ledger now includes year-qualified 2026 continuation rows, including the Russia–Iran targeting and casualty sequence, Russian-oil licenses, presidential minimization, August intelligence diplomacy, and the volunteered Asheville G20 financial normalization event.",
)

# ---------------------------------------------------------------------------
# Commit resulting repository changes
# ---------------------------------------------------------------------------
changed = [
    "J20-Pres.md",
    "Tmanch_CH7_J20_event_ledger.csv",
    "Tmanch_CH7_J20_reconciliation.md",
    "Tmanch_CH7_J20_russian_commentary.md",
    "Tmanch_CH7.md",
    "Tmanch_CH7_support.md",
    "Tmanch_CH7_primary_sources.md",
    "Tmanch_CH7_claim_ledger.csv",
    "Tmanch_CH7_Transatlantic_Pressure_Architecture_Matrix.md",
    "Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md",
    "Current_Working_Tmanch_Conclusion.md",
    "README.md",
]

subprocess.run(["git", "config", "user.name", "github-actions[bot]"], cwd=ROOT, check=True)
subprocess.run(
    ["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"],
    cwd=ROOT,
    check=True,
)
subprocess.run(["git", "add", *changed], cwd=ROOT, check=True)
result = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT)
if result.returncode == 0:
    print("No repository changes required; update is already applied.")
else:
    subprocess.run(
        ["git", "commit", "-m", "research: integrate Asheville G20 normalization into master matrices [skip ci]"],
        cwd=ROOT,
        check=True,
    )
    subprocess.run(["git", "push", "origin", "HEAD"], cwd=ROOT, check=True)
