#!/usr/bin/env python3
"""Apply the Manafort–Kilimnik operational-use research update idempotently."""

from __future__ import annotations

import csv
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
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"Expected one replacement anchor in {path}, found {count}")
    write(path, text.replace(old, new, 1))


def insert_before_once(path: str, marker: str, block: str) -> None:
    text = read(path)
    if block in text:
        return
    count = text.count(marker)
    if count != 1:
        raise RuntimeError(f"Expected one insertion marker in {path}, found {count}")
    write(path, text.replace(marker, block + marker, 1))


def append_csv_rows(path: str, rows: list[list[str]]) -> None:
    file_path = ROOT / path
    existing = file_path.read_text(encoding="utf-8")
    ids = {line.split(",", 1)[0].strip('"') for line in existing.splitlines()[1:] if line}
    missing = [row for row in rows if row[0] not in ids]
    if not missing:
        return
    with file_path.open("a", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle, quoting=csv.QUOTE_ALL, lineterminator="\n")
        writer.writerows(missing)


# 1. Main Chapter 5: separate established receipt, probable exploitation, and unproved routing.
replace_once(
    "Tmanch_CH5.md",
    """This is among the strongest official findings in the entire record. It establishes that sensitive campaign information reached Russian intelligence through a campaign chairman’s long-term associate.\n\nThe public record still leaves major questions:\n\n- exactly which data were transferred;\n- how frequently they were updated;\n- what geographic or demographic detail they contained;\n- who within Russian intelligence received them;\n- how the information was analyzed or used;\n- whether Manafort understood Kilimnik’s current intelligence role; and\n- whether the transfer was connected to debt, future business, Deripaska, a Ukraine peace plan, or another expected benefit.\n\nManafort’s convictions and guilty plea involved tax offenses, bank fraud, unregistered foreign work, money laundering-related conspiracy, false statements, and witness tampering. He was not convicted of conspiring with Russia to interfere in the election.\n""",
    """This is among the strongest official findings in the entire record. It resolves the first half of the chain: **sensitive internal Trump campaign information reached Russian intelligence through the campaign chairman’s long-term associate while Russia was conducting several active election-influence operations.**\n\nThree propositions must be separated.\n\n| Proposition | Present assessment |\n|---|---|\n| Russian intelligence received sensitive polling and campaign-strategy information | **Officially established** |\n| Russian intelligence meaningfully assessed, circulated, retained, or exploited that information | **Highly probable analytical inference** |\n| A particular file directly selected a particular Facebook audience, district, advertisement, or GRU/WikiLeaks release date | **Plausible but not publicly established** |\n\nThe second proposition is more probable than institutional inaction. An intelligence service conducting hacking, staged publication, false-persona, social-media, and political-influence operations had obvious reasons to exploit confidential information from inside one of the two presidential campaigns. The material could improve strategic assessment, validate battleground assumptions, reveal message or turnout vulnerabilities, guide resource allocation, inform release-impact analysis, or assess Manafort as a continuing channel without being handed directly to an Internet Research Agency advertisement buyer.\n\nThe public record still leaves major questions:\n\n- exactly which data were transferred;\n- how frequently they were updated;\n- what geographic or demographic detail they contained;\n- who within Russian intelligence received them;\n- which analytic products or briefings incorporated them;\n- whether they informed IRA messaging, Facebook targeting, GRU release timing, or another operation;\n- whether Manafort understood Kilimnik’s current intelligence role; and\n- whether the transfer was connected to debt, future business, Deripaska, a Ukraine peace plan, or another expected benefit.\n\nThe evidentiary limit is important: no public record presently connects a specific Manafort file to a specific IRA advertisement, Facebook audience, voting district, GRU action, or WikiLeaks release. But the missing final routing record should not be mistaken for evidence that Russian intelligence received the material and did nothing meaningful with it.\n\nSee the [Manafort–Kilimnik Operational-Use Matrix](Tmanch_CH5_Manafort_Kilimnik_Operational_Use_Matrix.md) for the full evidence ladder, competing hypotheses, operational pathways, and records plan.\n\nManafort’s convictions and guilty plea involved tax offenses, bank fraud, unregistered foreign work, money laundering-related conspiracy, false statements, and witness tampering. He was not convicted of conspiring with Russia to interfere in the election.\n""",
)

# 2. Supporting research: reweight the established data chain.
replace_once(
    "Tmanch_CH5_support.md",
    """## Current assessment\n\nThe transfer of sensitive campaign information into a Russian intelligence channel is established at an official level. The public record does not fully establish whether Manafort intended to assist Russian intelligence, expected a particular reciprocal benefit, or knew how the information would be used.\n\n---\n""",
    """## Current assessment\n\nThe transfer of sensitive campaign information into a Russian intelligence channel is established at an official level. The public record does not fully establish whether Manafort intended to assist Russian intelligence, expected a particular reciprocal benefit, or knew how the information would be used.\n\nThe downstream-use question should not be treated as an even choice between use and non-use. The probability-weighted assessment is:\n\n1. **Strategic or counterintelligence assessment — highly probable.** Russian intelligence had obvious reasons to evaluate internal polling, battleground assumptions, campaign vulnerabilities, resource plans, and the reliability of Manafort as a channel.\n2. **Dissemination or operational guidance to one or more influence components — moderate to high probability.** Compartmentation could convert raw information into sanitized themes, priorities, timing judgments, or leadership guidance without exposing the original source.\n3. **Direct use by a named IRA or GRU operator for a particular Facebook audience, district, advertisement, or release — plausible but not publicly established.**\n4. **Receipt followed by no meaningful assessment or exploitation — the weakest comprehensive explanation.** It requires an active hostile service to disregard uniquely valuable inside-campaign information during a priority election mission.\n\nThe exact downstream route remains a highest-priority records question. The most defensible present wording is:\n\n> **Russian intelligence receipt is established. Meaningful assessment or exploitation is highly probable. Specific Facebook, IRA, GRU, or publication routing remains unproved publicly.**\n\nSee the [Manafort–Kilimnik Operational-Use Matrix](Tmanch_CH5_Manafort_Kilimnik_Operational_Use_Matrix.md).\n\n---\n""",
)

# 3. Counterevidence: preserve the specific-routing limit while correcting the probability weighting.
replace_once(
    "Tmanch_CH5_counterevidence.md",
    """## Current assessment\n\n**Plausible and high priority, but not established publicly.**\n\n---\n\n# Hypothesis 10 — Roger Stone served as the campaign’s operational link to WikiLeaks and Russian intelligence\n""",
    """## Current assessment\n\n**A specific file-to-Facebook, file-to-IRA, or file-to-GRU operational bridge is not established publicly. Meaningful Russian intelligence assessment or exploitation of the data is nevertheless substantially more probable than institutional inaction.**\n\nThe hypothesis should therefore be divided:\n\n- **General intelligence use:** high-probability inference based on official receipt, obvious value, timing, and the existence of active Russian election operations.\n- **Specific social-media or release use:** plausible and high priority, but unproved without matching files, analytic products, tasking, or operator testimony.\n\nThe absence of the final public routing record limits specificity; it does not return the analysis to a neutral zero baseline.\n\n---\n\n# Hypothesis 10 — Roger Stone served as the campaign’s operational link to WikiLeaks and Russian intelligence\n""",
)

# 4. Open questions: state the baseline and sharpen proof/falsification requirements.
replace_once(
    "Tmanch_CH5_open_questions.md",
    """# Program 9 — Russian intelligence receipt and operational use of Manafort data\n\n- **Priority:** Highest\n- **Question:** Which service received the information and how was it used?\n- **Custodians:** Treasury sanctions office; ODNI; CIA; NSA; FBI; NARA; allied intelligence archives subject to lawful release.\n""",
    """# Program 9 — Russian intelligence receipt and operational use of Manafort data\n\n- **Priority:** Highest\n- **Question:** Which service received the information and how was it assessed, disseminated, retained, or operationally used?\n- **Analytical baseline:** Treasury establishes Russian intelligence receipt. Meaningful assessment or exploitation is substantially more probable than no use. A specific IRA, Facebook, GRU, or publication-channel application remains unproved.\n- **Custodians:** Treasury sanctions office; ODNI; CIA; NSA; FBI; NARA; allied intelligence archives subject to lawful release.\n""",
)
replace_once(
    "Tmanch_CH5_open_questions.md",
    """- **Would establish:** Connection between campaign data and Russian influence operations.\n- **Would falsify stronger claims:** Intelligence received but did not use, considered unreliable, or unrelated to election operations.\n""",
    """- **Would establish:** Russian analytic use, dissemination, leadership briefing, operational guidance, or a direct connection between campaign data and a Russian influence component.\n- **Would establish a specific Facebook/GRU claim:** Matching unique fields, file hashes, target segments, geographic priorities, release discussions, or operator testimony linking a campaign file to an identified action.\n- **Would falsify stronger claims:** Records showing the information was stale, public, rejected as unreliable, retained only in a non-election business or Ukraine-policy channel, or affirmatively not disseminated to an influence component.\n""",
)

# 5. Claim ledger: add the missing inference and limitation rows.
append_csv_rows(
    "Tmanch_CH5_claim_ledger.csv",
    [
        [
            "CH5-KILIMNIK-EXPLOIT-020A",
            "3.3",
            "Russian intelligence meaningfully assessed, circulated, retained, or exploited the Manafort polling and campaign-strategy information.",
            "2016; official receipt finding 2021",
            "Paul Manafort; Rick Gates; Konstantin Kilimnik; Russian intelligence personnel",
            "Trump campaign; Russian Intelligence Services",
            "Probability-weighted analytical inference grounded in official receipt and active operations",
            "92",
            "Treasury establishes receipt; Senate grave-threat finding; IRA and GRU operations were active; information had obvious nonpublic strategic value",
            "No public Russian analytic product, tasking record, or operator testimony identifies the exact use",
            "Meaningful intelligence use is substantially more probable than institutional inaction",
            "A particular Facebook audience, district, advertisement, GRU action, WikiLeaks release, or changed election outcome",
            "Russian intelligence receipt is established, and meaningful assessment or exploitation is highly probable; the exact route remains classified or unreleased.",
            "Which service, analysts, leaders, and operators received or acted on the information?",
            "Treasury evidentiary memorandum; Russian intelligence reports; dissemination logs; analytic products; liaison reporting; IRA/GRU records",
        ],
        [
            "CH5-KILIMNIK-SPECIFIC-USE-020B",
            "3.3",
            "A particular Manafort file directly guided IRA Facebook microtargeting, a named district strategy, or GRU/WikiLeaks release timing.",
            "2016",
            "Manafort; Gates; Kilimnik; IRA and GRU personnel",
            "Trump campaign; Russian Intelligence Services; Internet Research Agency; GRU",
            "Operational hypothesis",
            "48",
            "Sensitive inside information reached Russian intelligence while targeted social-media and hacking-release operations were active",
            "No public file-to-ad, file-to-audience, file-to-district, or file-to-release record; Russia had independent research and data sources",
            "Specific operational routing is plausible and testable",
            "That a direct handoff or named operational use is established",
            "The public record does not yet prove that Manafort data selected a particular Facebook audience, district, advertisement, or release date.",
            "Do unique fields or metadata match Russian targeting or release-planning records?",
            "Native polling files; platform targeting data; Russian analytic products; operator communications; tasking and release records",
        ],
        [
            "CH5-KILIMNIK-NONUSE-020C",
            "3.3",
            "Russian intelligence received the sensitive campaign information but derived no meaningful use from it.",
            "2016",
            "Kilimnik; Russian intelligence personnel",
            "Russian Intelligence Services",
            "Competing hypothesis",
            "18",
            "No public downstream-use document has been released",
            "The service was conducting a priority election mission and the information had obvious strategic, counterintelligence, and operational value",
            "Non-use remains possible but is the weakest comprehensive explanation",
            "That a specific operational use is proved",
            "Receipt followed by no meaningful assessment or exploitation is possible but substantially less likely than some form of intelligence use.",
            "Was the information rejected, quarantined, or considered unreliable?",
            "Russian handling records; analytic rejection notes; dissemination controls; Treasury and IC source reporting",
        ],
    ],
)

# 6. Working conclusion: elevate the chain without asserting a direct Facebook handoff.
replace_once(
    "Current_Working_Tmanch_Conclusion.md",
    """- and Russia conducted another Putin-authorized influence operation in 2020 using proxies and domestic laundering channels.\n\nMueller did not establish a criminal campaign–Russian government conspiracy or coordination agreement. That finding must remain.\n""",
    """- and Russia conducted another Putin-authorized influence operation in 2020 using proxies and domestic laundering channels.\n\nThe Manafort–Kilimnik chain deserves additional weight. Treasury’s finding establishes that sensitive internal polling and campaign-strategy information reached Russian intelligence while Russia was conducting simultaneous hacking, staged-publication, social-media, and influence operations. The public record does not show that a particular campaign file selected a particular Facebook audience, district, advertisement, or release date. But meaningful Russian intelligence assessment, dissemination, retention, or exploitation is substantially more probable than the proposition that an active hostile service received uniquely valuable inside-campaign information and did nothing consequential with it. The unresolved question is principally **how the information was used**, not whether it had obvious value. See the [Manafort–Kilimnik Operational-Use Matrix](Tmanch_CH5_Manafort_Kilimnik_Operational_Use_Matrix.md).\n\nMueller did not establish a criminal campaign–Russian government conspiracy or coordination agreement. That finding must remain.\n""",
)
replace_once(
    "Current_Working_Tmanch_Conclusion.md",
    """### Russia repeatedly acted to advance Trump’s political success\n\nThe official record establishes Russian interference in 2016 and a Putin-authorized influence operation in 2020. The later record shows continued Russian preference and exploitation surrounding his return.\n\n### Trump and his orbit repeatedly accepted, concealed, or benefited from foreign approaches\n""",
    """### Russia repeatedly acted to advance Trump’s political success\n\nThe official record establishes Russian interference in 2016 and a Putin-authorized influence operation in 2020. The later record shows continued Russian preference and exploitation surrounding his return.\n\n### Sensitive inside-campaign information reached Russian intelligence during an active election operation\n\nTreasury’s official finding resolves receipt. Meaningful intelligence assessment or exploitation is highly probable from the information’s obvious value, timing, and the existence of simultaneous Russian influence operations. A specific Facebook, IRA, GRU, or publication-channel use remains unproved publicly.\n\n### Trump and his orbit repeatedly accepted, concealed, or benefited from foreign approaches\n""",
)

# 7. README: link the new supporting document in Chapter 5.
replace_once(
    "README.md",
    """- [Counterevidence and hypothesis tests](Tmanch_CH5_counterevidence.md)\n- [Open questions and records plan](Tmanch_CH5_open_questions.md)\n""",
    """- [Counterevidence and hypothesis tests](Tmanch_CH5_counterevidence.md)\n- [Manafort–Kilimnik Operational-Use Matrix](Tmanch_CH5_Manafort_Kilimnik_Operational_Use_Matrix.md)\n- [Open questions and records plan](Tmanch_CH5_open_questions.md)\n""",
)

print("Manafort–Kilimnik operational-use update applied.")
