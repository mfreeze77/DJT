#!/usr/bin/env python3
"""Add the closest verbal and Putin-specific precedents to the Witkoff comparison."""

from __future__ import annotations

import csv
import io
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
        raise RuntimeError(f"Marker not found in {path}: {old[:120]!r}")
    write(path, text.replace(old, new, 1))


def append_csv_rows(path: str, rows: list[list[str]], sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    buffer = io.StringIO()
    writer = csv.writer(buffer, lineterminator="\n")
    writer.writerows(rows)
    write(path, text.rstrip() + "\n" + buffer.getvalue())


chapter = "Tmanch_CH7.md"

# Closest wording precedent: Eric Johnston's 1944 Roosevelt-emissary commercial mission.
replace_once(
    chapter,
    "| **1938 — Ambassador Joseph E. Davies with Stalin** | Davies described a friendly, informal meeting lasting more than two hours and expressed enthusiasm for rapprochement | Private diplomatic reporting during the Great Terror; later historical work found Davies unusually accepting of the Soviet account of the show trials | Important attitude precedent, but not a comparable public lifetime-memory tribute |\n| **1945 — President Harry Truman with Stalin**",
    "| **1938 — Ambassador Joseph E. Davies with Stalin** | Davies described a friendly, informal meeting lasting more than two hours and expressed enthusiasm for rapprochement | Private diplomatic reporting during the Great Terror; later historical work found Davies unusually accepting of the Soviet account of the show trials | Important attitude precedent, but not a comparable public lifetime-memory tribute |\n| **1944 — Roosevelt emissary and U.S. Chamber president Eric Johnston with Stalin** | In a letter published by *Izvestiya*, Johnston said his Soviet trip produced many pleasant memories and called his Kremlin meeting with Stalin the greatest and inspiring | The Soviet Union was a wartime ally fighting Nazi Germany; Johnston's mission emphasized industrial production, wartime cooperation, postwar trade, and credits | **Closest verbal precedent located.** The wording is strikingly similar, but the alliance, war, official purpose, and reciprocal-trade context were fundamentally different |\n| **1945 — President Harry Truman with Stalin**",
)

# Closest modern Putin personalization precedent: George W. Bush, but president-to-president and pre-Crimea.
replace_once(
    chapter,
    "| **1987 — Secretary George Shultz with Gorbachev** | Shultz said Gorbachev’s engaging manner could lead Americans to view him as a good guy | Intensive arms-control and human-rights negotiations immediately before the INF breakthrough | Personal praise, but framed as political assessment and connected to measurable treaty progress |\n| **2013 — Secretary John Kerry with Putin**",
    "| **1987 — Secretary George Shultz with Gorbachev** | Shultz said Gorbachev’s engaging manner could lead Americans to view him as a good guy | Intensive arms-control and human-rights negotiations immediately before the INF breakthrough | Personal praise, but framed as political assessment and connected to measurable treaty progress |\n| **2001 — President George W. Bush with Putin** | Bush called Putin straightforward and trustworthy, said he could sense his soul, and described him as a remarkable leader | First post-Cold War summit; Russia had not yet seized Georgian or Ukrainian territory, and Bush was the president rather than a subordinate envoy | Closest Putin-specific precedent for personalized trust, but not a lifetime-memory tribute and not delivered during Russia’s unresolved war against a U.S.-supported state |\n| **2013 — Secretary John Kerry with Putin**",
)

replace_once(
    chapter,
    "This review is bounded rather than exhaustive. It examined official U.S. diplomatic records involving Stalin, Brezhnev, Gorbachev, and Putin, along with major public meeting transcripts. It located examples of cordiality, strategic flattery, friendship language, and even substantial personal praise. It did **not** locate a close modern public analogue in which a U.S. envoy opened talks with a Russian leader prosecuting an unresolved war against a U.S.-supported state by describing that leader as one of the most treasured future memories of the envoy’s own life before a concession or settlement had been obtained.",
    "This review is bounded rather than exhaustive. It examined official U.S. diplomatic records involving Stalin, Brezhnev, Gorbachev, and Putin, along with major public meeting transcripts. It located examples of cordiality, strategic flattery, friendship language, and substantial personal praise. It also found one close **verbal** precedent: in 1944, Roosevelt emissary and U.S. Chamber of Commerce president Eric Johnston told Stalin that his Kremlin meeting was the greatest of the many pleasant memories he would carry home from the Soviet Union. That precedent prevents calling Witkoff’s wording literally unprecedented. Its context was radically different: the Soviet Union was a wartime ally against Nazi Germany, and Johnston’s mission focused on industrial cooperation, postwar trade, and credits. George W. Bush’s 2001 statements that he trusted Putin and could sense his soul provide the closest modern Putin-specific example of highly personalized public confidence, but they were president-to-president and preceded Russia’s later wars of territorial expansion. The search did **not** locate a close modern envoy analogue combining an unresolved Russian war against a U.S.-supported state, unchanged maximalist demands, no announced breakthrough, and a self-referential statement placing Putin among the envoy’s most treasured future life memories.",
)

replace_once(
    chapter,
    "- [FRUS — Kissinger and Brezhnev, October 1974](https://history.state.gov/historicaldocuments/frus1969-76v16/d64)",
    "- [FRUS — Eric Johnston’s July 1944 letter to Stalin](https://history.state.gov/historicaldocuments/frus1944v04/d884)\n- [White House archive — George W. Bush and Putin, June 2001](https://georgewbush-whitehouse.archives.gov/news/releases/2001/06/text/20010616-6.html)\n- [FRUS — Kissinger and Brezhnev, October 1974](https://history.state.gov/historicaldocuments/frus1969-76v16/d64)",
)

# Supporting research.
support = "Tmanch_CH7_support.md"
replace_once(
    support,
    "The review found real precedents for unusually warm U.S. language toward Soviet or Russian leaders: Davies’s friendly relationship with Stalin; Truman’s Potsdam toast; Kissinger’s “friends” language and praise of Brezhnev; Shultz’s “good guy” assessment of Gorbachev; and Kerry’s cordial remarks to Putin. The Kissinger–Brezhnev record is the closest envoy precedent.",
    "The review found real precedents for unusually warm U.S. language toward Soviet or Russian leaders: Davies’s friendly relationship with Stalin; Eric Johnston’s 1944 statement that his Stalin meeting was the greatest of his pleasant Soviet memories; Truman’s Potsdam toast; Kissinger’s “friends” language and praise of Brezhnev; Shultz’s “good guy” assessment of Gorbachev; George W. Bush’s public trust and “sense of his soul” language toward Putin; and Kerry’s cordial remarks to Putin. Johnston is the closest verbal precedent, Kissinger the closest career-diplomatic analogue, and Bush the closest Putin-specific precedent for personalized public trust. None occurred in the same complete configuration as Witkoff’s September 2026 remark.",
)
replace_once(
    support,
    "- https://history.state.gov/historicaldocuments/frus1969-76v16/d64",
    "- https://history.state.gov/historicaldocuments/frus1944v04/d884\n- https://georgewbush-whitehouse.archives.gov/news/releases/2001/06/text/20010616-6.html\n- https://history.state.gov/historicaldocuments/frus1969-76v16/d64",
)

# Primary-source inventory additions before source-control rules.
source_path = "Tmanch_CH7_primary_sources.md"
source_marker = "---\n\n# Source-control rules"
source_text = read(source_path)
if "## CH7-SRC-090" not in source_text:
    additions = r'''## CH7-SRC-090 — FRUS: Eric Johnston’s letter to Stalin

- **Date:** July 7, 1944; reported by the U.S. Embassy July 11
- **Institution:** U.S. Department of State, Office of the Historian
- **Location:** https://history.state.gov/historicaldocuments/frus1944v04/d884
- **Supports:** Johnston’s statement that his Kremlin meeting with Stalin was the greatest of the pleasant memories he would carry from the Soviet Union; Soviet publication of the letter; commercial and industrial-cooperation framing.
- **Does not support:** equivalence to 2026 without accounting for the U.S.–Soviet wartime alliance, the shared fight against Nazi Germany, Johnston’s trade mission, or his status as a business leader serving as an emissary rather than a career diplomat.

## CH7-SRC-091 — White House archive: George W. Bush and Putin, June 2001

- **Date:** June 16, 2001
- **Institution:** George W. Bush White House archive
- **Location:** https://georgewbush-whitehouse.archives.gov/news/releases/2001/06/text/20010616-6.html
- **Supports:** Bush’s public statements that Putin was straightforward and trustworthy, that Bush could sense his soul, and that Putin was a remarkable leader; also records contemporaneous discussion of NATO, missile defense, Chechnya, media freedom, and economic cooperation.
- **Does not support:** an envoy-level precedent, a lifetime-memory formulation, or equivalence to diplomacy conducted during Russia’s full-scale war against Ukraine.

'''
    if source_marker not in source_text:
        raise RuntimeError("Primary-source rules marker not found")
    write(source_path, source_text.replace(source_marker, additions + source_marker, 1))

# Claim-ledger corrections/additions.
append_csv_rows(
    "Tmanch_CH7_claim_ledger.csv",
    [
        [
            "CH7-RUS-LANG-005",
            "Historical comparison",
            "Eric Johnston used a closely parallel memory formulation toward Stalin in 1944",
            "1944-07-07",
            "FRUS primary record",
            "Established historical precedent",
            "NA",
            "U.S. Embassy reporting reproduced Johnston's letter published by Izvestiya",
            "The USSR was a wartime ally against Nazi Germany; Johnston's mission concerned trade and credits; he was not negotiating an ongoing Soviet war against a U.S.-supported state",
            "Johnston is the closest verbal precedent located and prevents describing Witkoff's wording as literally unprecedented",
            "Johnston's full mission instructions, Roosevelt correspondence, and original English letter",
            "State Department, FDR Library, U.S. Chamber archives",
        ],
        [
            "CH7-RUS-LANG-006",
            "Historical comparison",
            "George W. Bush publicly personalized trust in Putin at their first 2001 summit",
            "2001-06-16",
            "White House primary transcript",
            "Established Putin-specific precedent",
            "NA",
            "Bush called Putin trustworthy, said he could sense his soul, and described him as a remarkable leader",
            "Bush was president, not an envoy; the meeting preceded Russia's later wars of territorial expansion; it was not a lifetime-memory tribute",
            "Bush provides the closest modern Putin-specific precedent for highly personalized public trust but not the complete Witkoff configuration",
            "Internal summit assessments and later retrospective evaluations",
            "George W. Bush Presidential Library, State, NSC records",
        ],
    ],
    "CH7-RUS-LANG-005",
)

# Working conclusion: make the closest precedents explicit.
conclusion = "Current_Working_Tmanch_Conclusion.md"
replace_once(
    conclusion,
    "Historical comparison prevents two opposite errors. Warm personal language toward Soviet and Russian leaders is not unprecedented: Davies, Truman, Kissinger, Shultz, and Kerry all supply examples, with Kissinger’s treatment of Brezhnev the closest envoy analogue. But the review found no close modern public precedent combining a subordinate envoy, an unresolved Russian war against a U.S.-supported state, no announced prior concession, and a self-referential statement placing the Russian leader among the envoy’s most valued future life memories.",
    "Historical comparison prevents two opposite errors. Witkoff’s wording is not literally unprecedented: in 1944, Roosevelt emissary and U.S. Chamber of Commerce president Eric Johnston told Stalin that their Kremlin meeting was the greatest of the pleasant memories he would carry from the Soviet Union. That is the closest verbal precedent located, but it occurred while the countries were wartime allies against Nazi Germany and Johnston was promoting industrial cooperation, postwar trade, and credits. Kissinger’s treatment of Brezhnev is the closest career-diplomatic analogue, while George W. Bush’s 2001 trust and “sense of his soul” language is the closest modern Putin-specific precedent. The review nevertheless found no close modern envoy precedent combining a subordinate envoy, an unresolved Russian war against a U.S.-supported state, no announced breakthrough, unchanged maximalist demands, and a self-referential statement placing Putin among the envoy’s most valued future life memories.",
)

print("Closest historical precedents added and uniqueness claim narrowed.")
