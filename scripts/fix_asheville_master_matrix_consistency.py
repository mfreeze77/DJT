#!/usr/bin/env python3
"""Finalize dates, coverage, records targets, and wording for Asheville integration."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def load(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def save(path: str, text: str) -> None:
    (ROOT / path).write_text(text, encoding="utf-8")


def replace(path: str, old: str, new: str) -> None:
    text = load(path)
    if new in text:
        return
    if old not in text:
        raise RuntimeError(f"Missing anchor in {path}: {old!r}")
    save(path, text.replace(old, new, 1))


def append(path: str, marker: str, block: str) -> None:
    text = load(path)
    if marker in text:
        return
    save(path, text.rstrip() + "\n\n" + block.strip() + "\n")


replace(
    "Tmanch_CH7.md",
    "and updated through August 27, 2026.",
    "and updated through August 31, 2026.",
)
replace(
    "Tmanch_CH7_support.md",
    "### Coverage: January 20, 2025–August 26, 2026",
    "### Coverage: January 20, 2025–August 31, 2026",
)
replace(
    "Tmanch_CH7_J20_reconciliation.md",
    "**Coverage:** January 20–December 6, 2025  ",
    "**Coverage:** January 20, 2025–present  ",
)
replace(
    "Tmanch_CH7_open_questions.md",
    "### Coverage: January 2024–August 26, 2026",
    "### Coverage: January 2024–August 31, 2026",
)
replace(
    "Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md",
    "### Coverage: March 1–August 27, 2026",
    "### Coverage: March 1–August 31, 2026",
)
replace(
    "Current_Working_Tmanch_Conclusion.md",
    "As of August 27, this research has identified public sanctions",
    "As of August 31, this research has identified public sanctions",
)
replace(
    "J20-Pres.md",
    "> **The reconciled 2025 record supports a cumulative pattern",
    "> **The reconciled 2025–present record supports a cumulative pattern",
)
replace(
    "Tmanch_CH7_J20_event_ledger.csv",
    "Complete weighted scoring methodology and independent review\n\nJ20-2026-001",
    "Complete weighted scoring methodology and independent review\nJ20-2026-001",
)

append(
    "Tmanch_CH7_open_questions.md",
    "## Program CH7-RP-050 — Asheville G20 invitation, bilateral, and normalization record",
    '''## Program CH7-RP-050 — Asheville G20 invitation, bilateral, and normalization record

- **Priority:** A
- **Date range:** July 1–September 30, 2026
- **Agencies and custodians:** White House, Treasury, State, NSC, U.S. G20 presidency staff, Secret Service, relevant allied finance ministries, and Russian Finance Ministry records where obtainable.
- **Questions:**
  - Who proposed and approved Anton Siluanov’s in-person participation?
  - What alternatives were considered, including virtual participation, restricted attendance, or no bilateral?
  - What Russian concession, if any, was requested before the invitation?
  - What instructions did Bessent receive concerning Ukraine, sanctions, Iran, NATO, financial cooperation, and public messaging?
  - What did Siluanov request, offer, reject, or promise?
  - Were European allies consulted before the invitation and bilateral?
  - Did the meeting produce any follow-up on sanctions licenses, frozen assets, banking, debt, investment, energy, or G20 cooperation?
- **Records needed:** invitation memoranda; participant and protocol decisions; agenda and briefing book; bilateral transcript or memorandum of conversation; Bessent talking points; Trump instructions; Russian requests; sanctions and licensing options; allied demarches; press strategy; Russian readout comparison; follow-up tasking; and any performance milestones.
- **Would strengthen the current inference:** evidence that status or access was granted without a requested concession, that Russia sought normalization as a benefit, or that economic subjects advanced despite the war and targeting controversy.
- **Would weaken the current inference:** evidence that the invitation was necessary to secure a concrete U.S. objective, that Bessent obtained a material verifiable concession, or that the meeting imposed costs exceeding its status and propaganda value.

### Treasury FOIA module

```text
Subject: FOIA Request — August 31, 2026 Asheville G20 invitation and
Bessent–Siluanov bilateral meeting

I request records dated July 1 through September 30, 2026 concerning
Russian Finance Minister Anton Siluanov's participation in the U.S.-
hosted G20 finance ministers and central bank governors meeting in
Asheville, North Carolina, and his bilateral meeting with Treasury
Secretary Scott Bessent.

Please include:

1. invitation, attendance, protocol, and participation decisions;
2. White House, NSC, State, and Treasury recommendations or approvals;
3. briefing materials, agendas, talking points, participant lists,
   memoranda of conversation, notes, and follow-up tasking;
4. records concerning Ukraine, sanctions relief, Russian-origin oil,
   frozen assets, banking, debt, investment, Iran, NATO, or bilateral
   financial cooperation;
5. communications with allied governments concerning Russian
   participation or objections;
6. Russian proposals, commitments, denials, or requested benefits; and
7. records sufficient to identify any concession obtained, condition
   imposed, implementation milestone, or later Russian performance.

I do not request properly classified intelligence-source identities or
material protected by statute. Please release all reasonably segregable
portions, including dates, titles, routing, participants, and factual
summaries.
```''',
)

# Add Asheville to the existing high-confidence presidential-insulation finding.
path = "Current_Working_Tmanch_Conclusion.md"
text = load(path)
marker = "The later restoration of Siluanov"
anchor = (
    "The American casualty record, U.S. intelligence reporting, Russia's denial, Trump's minimization, "
    "the absence of an identified public Russia-specific consequence, and contemporaneous Russian-oil "
    "authorizations support this finding. The public evidence does not establish casualty-by-casualty "
    "causation or prove that Trump protected Russia pursuant to an explicit bargain. It establishes a "
    "striking differential response to materially similar foreign targeting support."
)
if marker not in text:
    if anchor not in text:
        raise RuntimeError("High-confidence insulation anchor missing")
    replacement = anchor + (
        " The later restoration of Siluanov to in-person G20 participation and a Treasury bilateral—before "
        "any publicly announced Russian concession—extended that exceptional insulation into senior financial diplomacy."
    )
    save(path, text.replace(anchor, replacement, 1))

changed = [
    "J20-Pres.md",
    "Tmanch_CH7.md",
    "Tmanch_CH7_support.md",
    "Tmanch_CH7_J20_reconciliation.md",
    "Tmanch_CH7_J20_event_ledger.csv",
    "Tmanch_CH7_open_questions.md",
    "Tmanch_CH7_Russia_Iran_Sanctions_High_Magnitude_Red_Flag.md",
    "Current_Working_Tmanch_Conclusion.md",
]

subprocess.run(["git", "config", "user.name", "github-actions[bot]"], cwd=ROOT, check=True)
subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], cwd=ROOT, check=True)
subprocess.run(["git", "add", *changed], cwd=ROOT, check=True)
if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT).returncode:
    subprocess.run(
        ["git", "commit", "-m", "fix: finalize Asheville master-ledger consistency [skip ci]"],
        cwd=ROOT,
        check=True,
    )
    subprocess.run(["git", "push", "origin", "HEAD"], cwd=ROOT, check=True)
else:
    print("No consistency changes required.")
