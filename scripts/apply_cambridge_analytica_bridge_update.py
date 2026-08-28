#!/usr/bin/env python3
"""Apply the Cambridge Analytica data-bridge research update idempotently."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def insert_before_once(path: str, marker: str, addition: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    if marker not in text:
        raise RuntimeError(f"Marker not found in {path}: {marker[:100]!r}")
    write(path, text.replace(marker, addition + marker, 1))


def insert_after_once(path: str, marker: str, addition: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    if marker not in text:
        raise RuntimeError(f"Marker not found in {path}: {marker[:100]!r}")
    write(path, text.replace(marker, marker + addition, 1))


def append_once(path: str, addition: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    suffix = "" if text.endswith("\n") else "\n"
    write(path, text + suffix + addition)


chapter_addition = r'''
## 3.3A Cambridge Analytica: campaign targeting capability and the missing operational bridge

Cambridge Analytica is related to the Manafort–Kilimnik inquiry because it demonstrates that the Trump campaign possessed a mature domestic system for converting voter information into surveys, audience segments, message tests, and targeted digital advertising.

The Federal Trade Commission found that Cambridge Analytica used deceptively collected Facebook information to generate personality scores, matched those scores with U.S. voter records, and used the resulting products for voter profiling and targeted-advertising services. That establishes campaign-era capability; it does not establish a Russian transfer.

Cambridge Analytica also created additional counterintelligence questions:

- Alexander Nix admitted that the company attempted to contact Julian Assange through an intermediary to discuss material reportedly relevant to the election; the approach was rejected.
- Christopher Wylie testified and submitted documents concerning Aleksandr Kogan's Russian-funded psychological-profiling work while he was involved in the Facebook-data project.
- Wylie described Cambridge Analytica presentations to Lukoil concerning American targeting capacity, data, disinformation, and rumor-campaign techniques; Nix described the contact as a benign Turkish customer-marketing proposal that never proceeded.
- A House of Commons final report recorded that the UK Information Commissioner found Russian or associated-state IP addresses connected to data/server activity involving Kogan's earlier app and referred the issue to relevant authorities and the National Crime Agency.

These facts make Cambridge Analytica a legitimate access-risk and routing node. They do **not** publicly establish that Cambridge Analytica transmitted Manafort's polling to Russia, received targeting instructions from Russian intelligence, or served as the bridge between Kilimnik and the IRA or GRU.

The precise assessment is:

> **Cambridge Analytica proves campaign-side data-to-message capability and creates a serious foreign-access-risk node. Manafort–Kilimnik proves Russian intelligence receipt of sensitive campaign information. The missing evidence is the operational routing record connecting those systems—or showing that Russian intelligence exploited the information through a different channel.**

See the [Cambridge Analytica Data-Bridge Matrix](Tmanch_CH5_Cambridge_Analytica_Data_Bridge_Matrix.md).

'''
insert_before_once(
    "Tmanch_CH5.md",
    "Manafort’s convictions and guilty plea involved tax offenses, bank fraud, unregistered foreign work, money laundering-related conspiracy, false statements, and witness tampering.",
    chapter_addition,
    "## 3.3A Cambridge Analytica: campaign targeting capability",
)

support_addition = r'''
## 5A. Cambridge Analytica as capability, access risk, and possible—but unproved—routing node

Cambridge Analytica should not be collapsed into the Manafort–Kilimnik chain as though the bridge were already proved.

The public record supports four separate propositions:

| Proposition | Present assessment |
|---|---|
| Cambridge Analytica possessed and deployed voter-profiling and targeted-advertising capability | **Established by FTC and company/parliamentary records** |
| Cambridge Analytica leadership sought access to Assange's reportedly election-relevant material | **Established; approach rejected** |
| Russia-related access risks existed around Kogan's Russian work, Lukoil contacts, insecure systems, and Russian-associated IP activity | **Documented risk leads; actual Russian access unproved** |
| Cambridge Analytica transmitted Manafort data to Russia or converted Russian intelligence guidance into specific ads | **Not publicly established** |

Cambridge Analytica matters even if it was not the bridge. It shows that the campaign had the machinery to transform voter information into targeted communications. It also shows how distributed vendors, models, datasets, subcontractors, and platform accounts could obscure who accessed a dataset and how derivative information moved.

The strongest present formulation is:

> **Russian intelligence receipt is established. Meaningful exploitation is highly probable. Cambridge Analytica is a plausible but unproved operational or security-risk node; no public record yet links a named campaign file to a named Cambridge Analytica audience, IRA advertisement, GRU action, or WikiLeaks release.**

See the [Cambridge Analytica Data-Bridge Matrix](Tmanch_CH5_Cambridge_Analytica_Data_Bridge_Matrix.md).

'''
insert_before_once(
    "Tmanch_CH5_support.md",
    "---\n\n# 6. Transition channel matrix",
    support_addition,
    "## 5A. Cambridge Analytica as capability",
)

counter_addition = r'''
# Hypothesis 9A — Cambridge Analytica was the missing bridge between Manafort data and Russian operations

## Supporting evidence

- Cambridge Analytica worked inside the Trump campaign's voter-targeting and digital-advertising environment.
- The FTC found that Cambridge Analytica combined Facebook-derived information with voter records for profiling and targeted advertising.
- Alexander Nix admitted seeking contact with Julian Assange concerning material reportedly relevant to the election; the approach was rejected.
- Parliamentary testimony and submissions identified Russia-related security concerns involving Kogan's Russian work, Lukoil presentations, distributed technical systems, and Russian-associated IP activity.
- Sensitive Manafort/Gates campaign information separately reached Russian intelligence while IRA and GRU operations were active.

## Counterevidence

- No public record shows Cambridge Analytica transmitted Manafort's polling to Kilimnik, Russia, the IRA, GRU, or WikiLeaks.
- No public record shows Russian intelligence sent Cambridge Analytica targeting instructions.
- Nix described the Lukoil work as a benign Turkish petrol-station marketing proposal that never proceeded.
- Wylie expressly disclaimed alleging knowing Cambridge Analytica or Kogan collusion with Russia.
- Russian actors possessed independent public, commercial, platform, and reconnaissance data.
- The UK IP-address evidence was an investigative lead, not proof that Russian intelligence accessed the Trump campaign dataset.

## What would establish the hypothesis

- matching unique fields or audience hashes;
- vendor access logs or transmissions;
- Russian analytic products citing Cambridge Analytica or campaign models;
- common administrators, accounts, payment instruments, or IP/device records;
- operator testimony;
- or communications linking Manafort/Kilimnik information to Cambridge Analytica, IRA, GRU, or WikiLeaks decisions.

## Current assessment

**Cambridge Analytica is a plausible and important routing or security-risk node, but it is not publicly established as the bridge.** Its proven significance is that it demonstrates campaign-side data-to-message capability and creates additional access pathways that require records-based testing.

The correct distinction is:

- **general Russian intelligence use of Manafort information:** highly probable;
- **Cambridge Analytica involvement in that use:** plausible but unproved;
- **a named file-to-Facebook or file-to-release action:** not publicly established.

---

'''
insert_before_once(
    "Tmanch_CH5_counterevidence.md",
    "# Hypothesis 10 — Roger Stone served as the campaign’s operational link to WikiLeaks and Russian intelligence",
    counter_addition,
    "# Hypothesis 9A — Cambridge Analytica was the missing bridge",
)

open_questions_addition = r'''
# Program 9A — Cambridge Analytica, Project Alamo, vendor, and Facebook audience records

- **Priority:** Highest
- **Question:** Did Cambridge Analytica, SCL, AggregateIQ, the campaign digital operation, the RNC, Facebook personnel, or another vendor receive, model, translate, or deploy information derived from the Manafort–Kilimnik channel?
- **Custodians:** Trump campaign; Cambridge Analytica/SCL administrators and bankruptcy estates; AggregateIQ; campaign digital vendors; RNC; Meta/Facebook; FTC; UK ICO; UK Parliament; National Crime Agency; FEC; DOJ; FBI; Treasury; ODNI.
- **Date range:** January 1–November 30, 2016, with model-development records from 2013 onward.
- **Search terms:** Manafort; Gates; Kilimnik; Fabrizio; Cambridge Analytica; SCL; Ripon; AggregateIQ; Project Alamo; Facebook; custom audience; lookalike; voter file; battleground; persuasion; turnout; psychographic; Kogan; GSR.
- **Records:** Contracts; statements of work; data dictionaries; native files; model versions; custom-audience uploads; upload hashes; campaign IDs; targeting criteria; survey instruments; access logs; user permissions; vendor transfers; retention/deletion records; platform communications; billing; IP/device logs.
- **Would establish:** A file-to-model, file-to-audience, vendor-to-Russia, or Russian-guidance-to-ad bridge.
- **Would falsify stronger claims:** Complete records showing no shared access, no matching unique fields, no relevant vendor receipt, and independent audience construction.

## Platform request/subpoena module

```text
Records sufficient to identify all custom audiences, lookalike audiences,
audience seed files, upload hashes, targeting parameters, account users,
payment instruments, IP/device logs, campaign identifiers, delivery reports,
and communications associated with Donald J. Trump campaign, Cambridge
Analytica, SCL, AggregateIQ, Giles-Parscale or related 2016 election
advertising accounts. Include records sufficient to compare those audiences
with the native campaign polling and strategy files transmitted through the
Manafort/Gates–Kilimnik channel.
```

---

# Program 9B — Kogan, Lukoil, Russian-associated access, and NCA disposition

- **Priority:** High
- **Question:** Did Russian government, intelligence, corporate, or proxy actors access Cambridge Analytica/SCL/GSR data, models, code, or derivative products?
- **Custodians:** UK ICO; National Crime Agency; Cambridge University; GSR/Kogan records; Cambridge Analytica/SCL; Lukoil; AggregateIQ; FTC; Meta/Facebook; UK parliamentary archives; U.S. intelligence agencies.
- **Date range:** January 1, 2013–December 31, 2018.
- **Search terms:** Kogan; GSR; St Petersburg; Russia; Russian IP; Tor; Lukoil; FSB; Ripon; Facebook data; white paper; rumor campaign; disinformation; microtargeting; NCA referral.
- **Records:** Server and access logs; IP attribution; forensic images; data exports; Kogan research contracts; Russian funding; Lukoil decks and correspondence; recipient lists; download logs; ICO analyses; NCA referral, investigative steps, and closing disposition; FTC/ICO cooperation records.
- **Would establish:** Actual Russian access, intelligence interest, exfiltration, or use.
- **Would falsify stronger claims:** Benign or unrelated IP activity, no relevant data exposure, no follow-up to Lukoil, and no Russian access to campaign-related data or derivatives.

---

'''
insert_before_once(
    "Tmanch_CH5_open_questions.md",
    "# Program 10 — Manafort’s motive: debt, Deripaska, future business, or policy",
    open_questions_addition,
    "# Program 9A — Cambridge Analytica, Project Alamo",
)

primary_sources_addition = r'''
## Cambridge Analytica, Facebook targeting, WikiLeaks interest, and Russia-related access risks

### CH5-SRC-046 — FTC Cambridge Analytica final opinion and order

- **Agency:** Federal Trade Commission
- **Date:** December 2019
- **Location:** [FTC Cambridge Analytica case](https://www.ftc.gov/legal-library/browse/cases-proceedings/182-3107-cambridge-analytica-llc-matter)
- **Supports:** FTC finding that Cambridge Analytica deceptively harvested personal information for voter profiling and targeting.
- **Does not establish:** Russian access, use on a particular Trump audience, or election-result effect.

### CH5-SRC-047 — FTC Kogan and Nix settlements and data-method summary

- **Agency:** Federal Trade Commission
- **Date:** July–December 2019
- **Location:** [FTC Kogan/Nix matter](https://www.ftc.gov/legal-library/browse/cases-proceedings/182-3106-182-3107-aleksandr-kogan-alexander-nix-matter)
- **Supports:** GSR application data collection; personality scoring; matching with U.S. voter records; targeted-advertising services; required deletion/destruction remedies.
- **Does not establish:** A Cambridge Analytica–Russian intelligence relationship.

### CH5-SRC-048 — Alexander Nix oral evidence concerning Assange

- **Body:** UK House of Commons Digital, Culture, Media and Sport Committee
- **Dates:** February 27 and June 6, 2018
- **Locations:** [February testimony](https://committees.parliament.uk/oralevidence/7660/html/) · [June testimony](https://committees.parliament.uk/oralevidence/8065/html/)
- **Supports:** Nix admitted Cambridge Analytica attempted to contact Assange through an intermediary to discuss reportedly election-relevant material; the approach was rejected.
- **Does not establish:** Working relationship, possession of stolen material, release coordination, or Russian direction.

### CH5-SRC-049 — Christopher Wylie oral evidence

- **Body:** UK House of Commons Digital, Culture, Media and Sport Committee
- **Date:** March 27, 2018
- **Location:** [Wylie oral evidence](https://committees.parliament.uk/oralevidence/7803/html/)
- **Supports:** Sworn account of Facebook-derived models, Ripon/AIQ architecture, Kogan's Russian work, Lukoil presentations, data-security risks, and limits on Wylie's allegations.
- **Does not establish:** Truth of every allegation, Russian access, or knowing collusion.

### CH5-SRC-050 — Wylie supplementary written evidence

- **Body:** UK House of Commons Digital, Culture, Media and Sport Committee
- **Date:** April 2018
- **Location:** [Supplementary evidence](https://committees.parliament.uk/writtenevidence/89475/html/)
- **Supports:** Documentary allegations concerning GSR/Facebook derivatives, Kogan's Russian research, Lukoil contacts, Ripon/AIQ, and security exposure.
- **Does not establish:** Adjudicated Russian intelligence access or a Manafort-to-IRA bridge.

### CH5-SRC-051 — House of Commons disinformation final report

- **Body:** UK House of Commons Digital, Culture, Media and Sport Committee
- **Date:** February 2019
- **Location:** [Final report, foreign-influence section](https://publications.parliament.uk/pa/cm201719/cmselect/cmcumeds/1791/179109.htm)
- **Supports:** Committee record of ICO findings concerning Russian/associated-state IP addresses connected to Kogan-related data/server activity and referral to relevant authorities/NCA.
- **Does not establish:** Malicious access, Russian intelligence identity, access to the Trump campaign dataset, or operational use.

---

'''
insert_before_once(
    "Tmanch_CH5_primary_sources.md",
    "# Priority retrieval gaps",
    primary_sources_addition,
    "### CH5-SRC-046 — FTC Cambridge Analytica",
)

claim_rows = r'''"CH5-CA-CAPABILITY-020D","3.3A","Cambridge Analytica possessed a voter-profiling and targeted-advertising system using Facebook-derived information and U.S. voter records.","2013-2016; FTC finding 2019","Alexander Nix; Aleksandr Kogan; campaign digital personnel","Cambridge Analytica; SCL; GSR; Facebook","FTC official finding",99,"FTC final opinion and case records","Does not establish Russian access or use of a particular Trump audience","Campaign-side capability to convert data into targeted communications","Russian operational bridge or election effect","The FTC established Cambridge Analytica's Facebook-derived voter-profiling and targeted-advertising capability.","Which models and derivatives were used for the Trump campaign?","FTC/ICO files; campaign contracts; model inventories; platform records"
"CH5-CA-ASSANGE-020E","3.3A","Cambridge Analytica leadership attempted to contact Julian Assange to discuss material reportedly relevant to the election; the approach was rejected.","2016; testimony 2018","Alexander Nix; Julian Assange; intermediary","Cambridge Analytica; WikiLeaks","Admitted parliamentary testimony",98,"Nix oral evidence February and June 2018","No meeting, working relationship, possession, or release coordination was established","Interest in the stolen-material publication environment","Cambridge Analytica coordination with WikiLeaks or GRU","Nix admitted a rejected attempt to discuss Assange's reportedly election-relevant material.","Did anyone pursue parallel or follow-up channels?","Intermediary messages; internal CA communications; campaign records; WikiLeaks records"
"CH5-CA-RUSSIA-RISK-020F","3.3A","Russia-related access risks existed around Kogan's Russian work, Lukoil contacts, insecure systems, and Russian-associated IP activity examined by UK authorities.","2013-2018","Aleksandr Kogan; Alexander Nix; Christopher Wylie; Lukoil personnel","Cambridge Analytica; SCL; GSR; Lukoil; UK ICO; NCA","Official investigative record plus sworn/documentary allegations",82,"UK parliamentary testimony, written evidence, and final report","Actual Russian intelligence access, malicious IP activity, and data exfiltration are not established","Serious security and counterintelligence exposure requiring records","Knowing collusion or operational transfer","The public record documents Russia-related access risks but not a proved Russian acquisition of campaign data.","What did ICO/NCA determine and what data were accessed?","Forensics; server logs; NCA file; Lukoil decks; Kogan contracts; intelligence reporting"
"CH5-CA-BRIDGE-020G","3.3A","Cambridge Analytica or an associated vendor served as the operational bridge between Manafort/Kilimnik information and IRA, GRU, Facebook, or WikiLeaks activity.","2016","Manafort; Gates; Kilimnik; Nix; campaign/vendor and Russian operators","Trump campaign; Cambridge Analytica; SCL; IRA; GRU; WikiLeaks","Operational hypothesis",43,"Parallel campaign targeting system, official RIS receipt, Assange interest, Russia-related access risks","No public file-to-vendor, vendor-to-Russia, or Russian-guidance-to-ad record","Plausible and testable routing hypothesis","That the bridge is established","Cambridge Analytica is a plausible routing node, but the public record does not establish it as the bridge.","Do unique fields, audience hashes, logs, or communications connect the systems?","Native files; vendor/platform logs; Russian analytic products; operator communications"
"CH5-CA-LIMIT-020H","3.3A","No public record currently ties a named Manafort file to a named Cambridge Analytica audience, IRA advertisement, GRU action, or WikiLeaks release decision.","2016-present","Manafort; Gates; Kilimnik; campaign and Russian operators","Trump campaign; Cambridge Analytica; IRA; GRU; WikiLeaks","Evidentiary limitation",97,"Public Mueller, SSCI, Treasury, FTC, and UK records","Classified or unreleased records may contain the bridge","Limits specificity without negating general exploitation inference","Russian non-use or absence of any influence","A named file-to-operation bridge remains unproved publicly.","What exact routing records remain classified or unreleased?","Treasury/IC files; platform data; vendor logs; Russian records; WikiLeaks/GRU communications"'''
append_once(
    "Tmanch_CH5_claim_ledger.csv",
    claim_rows + "\n",
    "CH5-CA-CAPABILITY-020D",
)

conclusion_marker = (
    "The Manafort–Kilimnik chain deserves additional weight. Treasury’s finding establishes that sensitive internal polling and campaign-strategy information reached Russian intelligence while Russia was conducting simultaneous hacking, staged-publication, social-media, and influence operations. The public record does not show that a particular campaign file selected a particular Facebook audience, district, advertisement, or release date. But meaningful Russian intelligence assessment, dissemination, retention, or exploitation is substantially more probable than the proposition that an active hostile service received uniquely valuable inside-campaign information and did nothing consequential with it. The unresolved question is principally **how the information was used**, not whether it had obvious value. See the [Manafort–Kilimnik Operational-Use Matrix](Tmanch_CH5_Manafort_Kilimnik_Operational_Use_Matrix.md)."
)
conclusion_addition = r'''

Cambridge Analytica sharpens—but does not close—the operational-use question. The FTC established a campaign-era system that combined Facebook-derived information, voter records, profiling, and targeted advertising. Nix also admitted a rejected attempt to contact Assange, while parliamentary records identify Russia-related access risks involving Kogan's Russian work, Lukoil contacts, insecure data handling, and Russian-associated IP activity. No public record proves that Cambridge Analytica transmitted Manafort's polling to Russia or converted Russian intelligence guidance into a named advertisement or release. Its significance is that it demonstrates campaign-side capability and creates a plausible additional routing or access-risk node. See the [Cambridge Analytica Data-Bridge Matrix](Tmanch_CH5_Cambridge_Analytica_Data_Bridge_Matrix.md).
'''
insert_after_once(
    "Current_Working_Tmanch_Conclusion.md",
    conclusion_marker,
    conclusion_addition,
    "Cambridge Analytica sharpens—but does not close",
)

readme_marker = "- [Primary-source inventory](Tmanch_CH5_primary_sources.md)\n"
readme_addition = "- [Cambridge Analytica Data-Bridge Matrix](Tmanch_CH5_Cambridge_Analytica_Data_Bridge_Matrix.md)\n"
insert_after_once(
    "README.md",
    readme_marker,
    readme_addition,
    "Tmanch_CH5_Cambridge_Analytica_Data_Bridge_Matrix.md",
)

print("Cambridge Analytica bridge research integrated successfully.")
