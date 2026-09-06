#!/usr/bin/env python3
"""Integrate the September 2026 Witkoff–Putin language event into existing research files.

This is a one-time, idempotent migration script. It creates no permanent standalone
research document; the event and historical comparison are added to the master
ledger, Chapter 7, supporting research, source inventory, claim ledger, records
plan, and working conclusion.
"""

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
        raise RuntimeError(f"Marker not found in {path}: {old[:100]!r}")
    write(path, text.replace(old, new, 1))


def insert_before(path: str, marker: str, block: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    if marker not in text:
        raise RuntimeError(f"Insertion marker not found in {path}: {marker!r}")
    write(path, text.replace(marker, block.rstrip() + "\n\n" + marker, 1))


def append_block(path: str, block: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    write(path, text.rstrip() + "\n\n" + block.strip() + "\n")


def insert_table_row_after_prefix(path: str, prefix: str, row: str, sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    lines = text.splitlines()
    for index, line in enumerate(lines):
        if line.startswith(prefix):
            lines.insert(index + 1, row)
            write(path, "\n".join(lines) + "\n")
            return
    raise RuntimeError(f"Row prefix not found in {path}: {prefix!r}")


def append_csv_rows(path: str, rows: list[list[str]], sentinel: str) -> None:
    text = read(path)
    if sentinel in text:
        return
    buffer = io.StringIO()
    writer = csv.writer(buffer, lineterminator="\n")
    for row in rows:
        writer.writerow(row)
    write(path, text.rstrip() + "\n" + buffer.getvalue())


# 1. Extend master living ledger.
master_row = (
    '| **J20-2026-006** | Sept. 5–6 | Witkoff and Kushner met Putin for more than three hours. '
    'In Kremlin-released opening remarks, Witkoff said the group had discussed future retirement '
    '“stories and memories” and that Putin-related memories would be “right at the top.” Putin said '
    'Russia found it convenient to work with the envoys. No breakthrough was announced; Moscow '
    'reiterated its territorial and NATO demands, and potential major U.S.–Russia economic projects '
    'were discussed. The envoys then made their first Kyiv visit in these roles. | Verified '
    'personalized-diplomacy event; unusually effusive public tribute in a bounded historical comparison; '
    'motive and negotiating effect unresolved | — | — | '
    '[Reuters opening](https://www.reuters.com/world/europe/putin-says-us-russia-contacts-beneficial-talks-begin-with-witkoff-kushner-2026-09-05/) · '
    '[Reuters outcome](https://www.reuters.com/world/europe/putins-envoy-dmitriev-meet-witkoff-kushner-upon-their-arrival-moscow-sources-say-2026-09-05/) · '
    '[Washington Post quote](https://www.washingtonpost.com/world/2026/09/05/witkoff-kushner-arrive-moscow-talks-with-putin/) |'
)
insert_table_row_after_prefix(
    "J20-Pres.md",
    "| **J20-2026-005**",
    master_row,
    "| **J20-2026-006**",
)

# 2. Extend machine-readable ledger without assigning a numeric political score.
append_csv_rows(
    "Tmanch_CH7_J20_event_ledger.csv",
    [[
        "J20-2026-006",
        "2026-09-05/06",
        "Diplomatic language and personalized access",
        "Witkoff retirement-memory tribute to Putin during Moscow talks",
        "Verified event; historical-comparison inference qualified",
        (
            "Witkoff and Kushner met Putin for more than three hours. In opening remarks released by "
            "the Kremlin, Witkoff framed the group’s Putin encounters as future retirement stories and "
            "memories near the top of their experience. No breakthrough was announced; Russia’s core "
            "territorial and NATO demands remained unchanged, while economic projects were discussed. "
            "The envoys traveled to Kyiv the following day."
        ),
        "NA",
        "NA",
        (
            "The Kremlin publicly emphasized that Russia trusted the envoys and found them convenient "
            "to work with; release of the opening exchange supplied status and relationship-centered "
            "messaging value."
        ),
        "https://www.reuters.com/world/europe/putin-says-us-russia-contacts-beneficial-talks-begin-with-witkoff-kushner-2026-09-05/",
        (
            "Full Kremlin video and transcript; U.S. talking points; meeting memorandum; delegation "
            "briefing; economic-project papers; comparable public and private language used in Kyiv; "
            "post-meeting instructions and concessions sought or obtained"
        ),
    ]],
    "J20-2026-006",
)

# 3. Update Chapter 7 dates and add the integrated historical comparison.
replace_once(
    "Tmanch_CH7.md",
    "## January 20, 2025–August 31, 2026",
    "## January 20, 2025–September 6, 2026",
)
replace_once(
    "Tmanch_CH7.md",
    "updated through August 31, 2026.",
    "updated through September 6, 2026.",
)
chapter_block = r'''# 17C. Personalized envoy language: Witkoff, Putin, and the historical baseline

On September 5, 2026, Steve Witkoff and Jared Kushner met Vladimir Putin in the Kremlin for more than three hours. In opening remarks made public by the Kremlin, Witkoff said he, Kushner, Kirill Dmitriev, and Yuri Ushakov had been discussing the “incredible stories and incredible memories” they would have in retirement and told Putin that his would be “right at the top of it all.”

The exact wording is more specific than the shorthand claim that Witkoff called the meeting one of the greatest memories of his life. He framed repeated engagement with Putin as a prized future personal memory shared by a small U.S.–Russian negotiating circle.

Putin said contacts with Washington were beneficial and that Russia found it convenient to work with Witkoff and Kushner. The meeting produced no announced breakthrough. Kremlin aide Yuri Ushakov said the parties discussed economic issues and potentially large mutually beneficial U.S.–Russia projects. Moscow reiterated the position that Ukraine should surrender the full territory of four claimed regions and abandon NATO membership. The envoys traveled to Kyiv the following day for their first visit there in these diplomatic roles.

## 17C.1 Historical comparison

Warmth toward Soviet and Russian leaders is not literally unprecedented in American diplomacy.

| Period and U.S. representative | Public or archival language | Context | Comparison with September 2026 |
|---|---|---|---|
| **1938 — Ambassador Joseph E. Davies with Stalin** | Davies described a friendly, informal meeting lasting more than two hours and expressed enthusiasm for rapprochement | Private diplomatic reporting during the Great Terror; later historical work found Davies unusually accepting of the Soviet account of the show trials | Important attitude precedent, but not a comparable public lifetime-memory tribute |
| **1945 — President Harry Truman with Stalin** | At a Potsdam toast, Truman called association with Churchill and Stalin a great pleasure and privilege | Stalin was then a wartime ally immediately after Nazi Germany’s defeat; Truman was a president, not an envoy | Strong ceremonial warmth in a fundamentally different alliance and victory context |
| **1974 — Secretary Henry Kissinger with Brezhnev** | Kissinger said he had come to meet friends and predicted Brezhnev would be remembered for contributions to peace | Détente, repeated leader-level negotiations, arms-control bargaining, and explicit reciprocity | The closest archival envoy analogue in warmth, but tied directly to a substantive diplomatic program and mutual concessions |
| **1987 — Secretary George Shultz with Gorbachev** | Shultz said Gorbachev’s engaging manner could lead Americans to view him as a good guy | Intensive arms-control and human-rights negotiations immediately before the INF breakthrough | Personal praise, but framed as political assessment and connected to measurable treaty progress |
| **2013 — Secretary John Kerry with Putin** | Kerry said he was very happy to see Putin and thanked Russia for historic wartime sacrifice and current cooperation | Before Russia’s 2014 seizure of Crimea; discussions included Syria, terrorism, and bilateral cooperation | Warm protocol language, not a self-referential tribute to Putin’s place in the envoy’s life |
| **2015 — Secretary Kerry with Putin after Crimea** | Kerry thanked Putin for hosting and maintained direct communication while publicly identifying major disagreements | Russia had seized Crimea and supported war in eastern Ukraine; U.S. sanctions and allied policy remained explicit | A close modern conflict-period comparator, but the public tone remained professional and issue-centered |

This review is bounded rather than exhaustive. It examined official U.S. diplomatic records involving Stalin, Brezhnev, Gorbachev, and Putin, along with major public meeting transcripts. It located examples of cordiality, strategic flattery, friendship language, and even substantial personal praise. It did **not** locate a close modern public analogue in which a U.S. envoy opened talks with a Russian leader prosecuting an unresolved war against a U.S.-supported state by describing that leader as one of the most treasured future memories of the envoy’s own life before a concession or settlement had been obtained.

## 17C.2 What the remark can and cannot establish

The statement can reasonably be interpreted as:

- rapport-building and deliberate flattery;
- genuine personal admiration or emotional investment;
- reassurance that the relationship itself is valuable to the U.S. envoys;
- or a mixture of negotiating technique and sincere sentiment.

The words alone do not establish compromised loyalty, a secret agreement, or acceptance of Russian demands. Diplomats sometimes flatter adversaries to preserve access and create negotiating room.

Their evidentiary significance comes from context and repetition:

- Witkoff had previously said he liked Putin, regarded him as straightforward and highly intelligent, did not view him as a bad person, and emphasized Putin’s personal gestures toward Trump;
- the September remark joined American envoys and senior Russian interlocutors inside one imagined future community of shared memories;
- the Kremlin selected and released the exchange publicly;
- Putin simultaneously said Russia trusted the envoys and found them convenient to work with;
- Russia had not changed its central territorial and NATO demands;
- and no breakthrough was announced after the meeting.

The proper conclusion is therefore narrower than alleging disloyalty but stronger than dismissing the exchange as routine protocol:

> **Historical U.S.–Soviet and U.S.–Russian diplomacy contains genuine precedents for warmth and strategic flattery. Witkoff’s September 5 statement remains unusually personal, self-referential, and status-conferring for an envoy’s opening address to the leader of a state continuing an unresolved war on unchanged maximalist terms. In the cumulative Chapter 7 record, it is evidence of a relationship-centered negotiating posture in which access to and memories with Putin are publicly treated as valuable in themselves.**

### Principal sources

- [Reuters — opening of the September 5 meeting](https://www.reuters.com/world/europe/putin-says-us-russia-contacts-beneficial-talks-begin-with-witkoff-kushner-2026-09-05/)
- [Reuters — no announced breakthrough, unchanged demands, and economic-project discussion](https://www.reuters.com/world/europe/putins-envoy-dmitriev-meet-witkoff-kushner-upon-their-arrival-moscow-sources-say-2026-09-05/)
- [Washington Post — Kremlin-released opening quote](https://www.washingtonpost.com/world/2026/09/05/witkoff-kushner-arrive-moscow-talks-with-putin/)
- [FRUS — Kissinger and Brezhnev, October 1974](https://history.state.gov/historicaldocuments/frus1969-76v16/d64)
- [FRUS — Shultz and Gorbachev, October 1987](https://history.state.gov/historicaldocuments/frus1981-88v06/d84)
- [FRUS — Truman, Churchill, and Stalin toast at Potsdam](https://history.state.gov/historicaldocuments/frus1945Berlinv02/d710a-82)
- [State Department archive — Kerry and Putin, May 2013](https://2009-2017.state.gov/secretary/remarks/2013/05/209065.htm)
- [State Department archive — Kerry’s May 2015 Sochi visit](https://2009-2017.state.gov/secretary/remarks/2015/05/242214.htm)
- [FRUS — Ambassador Davies’s June 1938 farewell meeting with Stalin](https://history.state.gov/historicaldocuments/frus1933-39/d465)
'''
insert_before(
    "Tmanch_CH7.md",
    "# 18. Circumstantial-evidence assessment",
    chapter_block,
    "# 17C. Personalized envoy language",
)

# 4. Add supporting research with the same bounded-comparison control.
replace_once(
    "Tmanch_CH7_support.md",
    "### Coverage: January 20, 2025–August 31, 2026",
    "### Coverage: January 20, 2025–September 6, 2026",
)
support_block = r'''## September 5–6, 2026 — Witkoff’s Putin memory tribute and historical-comparison finding

Witkoff and Kushner returned to Moscow for more than three hours of talks with Putin and traveled to Kyiv the following day. The Kremlin-released opening showed Witkoff describing future retirement “stories and memories” and placing Putin-related memories “right at the top.” He identified Jared Kushner, Kirill Dmitriev, and Yuri Ushakov as participants in the conversation that produced the remark.

**Verified event findings:**

- Putin publicly said Russia found Witkoff and Kushner convenient to work with.
- No breakthrough was announced.
- Russia’s territorial and NATO demands remained unchanged.
- Potential major U.S.–Russia economic projects were discussed.
- The envoys subsequently visited Kyiv, which is relevant counterevidence to a claim that their mission consisted only of engagement with Moscow.

**Bounded archival comparison:**

The review found real precedents for unusually warm U.S. language toward Soviet or Russian leaders: Davies’s friendly relationship with Stalin; Truman’s Potsdam toast; Kissinger’s “friends” language and praise of Brezhnev; Shultz’s “good guy” assessment of Gorbachev; and Kerry’s cordial remarks to Putin. The Kissinger–Brezhnev record is the closest envoy precedent.

The comparison did not identify a close modern instance combining all of the following:

1. a subordinate U.S. envoy rather than the president;
2. a public opening statement rather than a private retrospective;
3. an unresolved war against a U.S.-supported state;
4. unchanged maximalist demands from Moscow;
5. no announced prior concession or breakthrough;
6. a self-referential statement about the Russian leader’s place among the envoy’s greatest future memories; and
7. Kremlin publication of the exchange as relationship-centered imagery.

**Classification:** unusually effusive personalized diplomacy; historical warmth has precedents, but the complete configuration appears rare in the public record reviewed. The statement supports analysis of diplomatic posture and susceptibility to personalized engagement. It does not independently prove secret direction, disloyalty, or a policy bargain.

**Sources:**

- https://www.reuters.com/world/europe/putin-says-us-russia-contacts-beneficial-talks-begin-with-witkoff-kushner-2026-09-05/
- https://www.reuters.com/world/europe/putins-envoy-dmitriev-meet-witkoff-kushner-upon-their-arrival-moscow-sources-say-2026-09-05/
- https://www.washingtonpost.com/world/2026/09/05/witkoff-kushner-arrive-moscow-talks-with-putin/
- https://history.state.gov/historicaldocuments/frus1969-76v16/d64
- https://history.state.gov/historicaldocuments/frus1981-88v06/d84
- https://history.state.gov/historicaldocuments/frus1945Berlinv02/d710a-82
- https://history.state.gov/historicaldocuments/frus1933-39/d465
- https://2009-2017.state.gov/secretary/remarks/2013/05/209065.htm
- https://2009-2017.state.gov/secretary/remarks/2015/05/242214.htm
'''
append_block(
    "Tmanch_CH7_support.md",
    support_block,
    "## September 5–6, 2026 — Witkoff’s Putin memory tribute",
)

# 5. Add source inventory entries before source-control rules.
source_block = r'''# I. September 2026 Witkoff–Putin language and historical comparison

## CH7-SRC-081 — Reuters on opening remarks and mutual trust framing

- **Date:** September 5, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/europe/putin-says-us-russia-contacts-beneficial-talks-begin-with-witkoff-kushner-2026-09-05/
- **Supports:** meeting date and participants; Putin’s statement that contacts were beneficial and Russia found the envoys convenient to work with; Witkoff’s transmission of Trump’s best wishes and thanks for the temporary strike pause.
- **Does not support:** secret commitments, motive for the memory remark, or a completed settlement.

## CH7-SRC-082 — Reuters on meeting outcome, Russian demands, and economic projects

- **Date:** September 5, 2026
- **Publisher:** Reuters
- **Location:** https://www.reuters.com/world/europe/putins-envoy-dmitriev-meet-witkoff-kushner-upon-their-arrival-moscow-sources-say-2026-09-05/
- **Supports:** more than three hours of talks; no announced breakthrough; unchanged Russian territorial and NATO demands; discussion of potentially major mutually beneficial U.S.–Russia projects; subsequent Kyiv visit.
- **Does not support:** the undisclosed contents of the U.S. proposal or private concessions.

## CH7-SRC-083 — Washington Post on Kremlin-released memory remark

- **Date:** September 5, 2026
- **Publisher:** Washington Post
- **Location:** https://www.washingtonpost.com/world/2026/09/05/witkoff-kushner-arrive-moscow-talks-with-putin/
- **Supports:** the opening wording in which Witkoff referred to future retirement stories and memories and placed Putin-related memories near the top; identification of Kushner, Dmitriev, and Ushakov in that framing.
- **Does not support:** whether the language was scripted, tactical, sincere, or approved in advance.

## CH7-SRC-084 — FRUS: Kissinger and Brezhnev, October 1974

- **Date:** October 1974
- **Institution:** U.S. Department of State, Office of the Historian
- **Location:** https://history.state.gov/historicaldocuments/frus1969-76v16/d64
- **Supports:** Kissinger’s statements that he came to meet friends and that Brezhnev would be remembered for contributions to peace; cordial banter during détente.
- **Does not support:** equivalence between détente-era arms-control negotiations and the September 2026 Ukraine-war context.

## CH7-SRC-085 — FRUS: Shultz and Gorbachev, October 1987

- **Date:** October 23, 1987
- **Institution:** U.S. Department of State, Office of the Historian
- **Location:** https://history.state.gov/historicaldocuments/frus1981-88v06/d84
- **Supports:** Shultz’s personal assessment that Gorbachev’s manner could lead Americans to consider him a good guy during detailed treaty negotiations.
- **Does not support:** a personal lifetime-memory tribute or the absence of simultaneous substantive pressure.

## CH7-SRC-086 — FRUS: Potsdam toast involving Truman and Stalin

- **Date:** July 23, 1945
- **Institution:** U.S. Department of State, Office of the Historian
- **Location:** https://history.state.gov/historicaldocuments/frus1945Berlinv02/d710a-82
- **Supports:** President Truman’s ceremonial statement that association with Churchill and Stalin was a great pleasure and privilege.
- **Does not support:** comparison without accounting for the wartime-alliance, victory, presidential, and formal-toast context.

## CH7-SRC-087 — State Department: Kerry and Putin, May 2013

- **Date:** May 7, 2013
- **Institution:** U.S. Department of State archive
- **Location:** https://2009-2017.state.gov/secretary/remarks/2013/05/209065.htm
- **Supports:** cordial opening language and thanks for Soviet sacrifice and Russian cooperation before the seizure of Crimea.
- **Does not support:** a conflict-period personal tribute or equivalence to the 2026 context.

## CH7-SRC-088 — State Department: Kerry’s Sochi visit after Crimea

- **Date:** May 12, 2015
- **Institution:** U.S. Department of State archive
- **Location:** https://2009-2017.state.gov/secretary/remarks/2015/05/242214.htm
- **Supports:** professional thanks for hosting and continued direct communication amid explicit disagreements over Ukraine and other issues.
- **Does not support:** unusually personal admiration or a lifetime-memory formulation.

## CH7-SRC-089 — FRUS: Ambassador Davies and Stalin, June 1938

- **Date:** June 5, 1938
- **Institution:** U.S. Department of State, Office of the Historian
- **Location:** https://history.state.gov/historicaldocuments/frus1933-39/d465
- **Supports:** Davies’s description of a cordial, friendly, informal meeting of more than two hours and his strong rapprochement orientation.
- **Does not support:** a public statement to Stalin comparable to Witkoff’s wording.
'''
insert_before(
    "Tmanch_CH7_primary_sources.md",
    "---\n\n# Source-control rules",
    source_block,
    "## CH7-SRC-081",
)

# 6. Add claim-ledger propositions. Confidence field is NA to avoid pretending a quantitative score.
append_csv_rows(
    "Tmanch_CH7_claim_ledger.csv",
    [
        [
            "CH7-RUS-LANG-001",
            "September 2026 personalized diplomacy",
            "Witkoff publicly framed his Putin encounters as future retirement memories near the top of his experience",
            "2026-09-05",
            "Kremlin-released video; Reuters and Washington Post documentary reporting",
            "Established attributed statement",
            "NA",
            "The opening wording and named participants are publicly documented",
            "The remark may have been deliberate rapport-building rather than an expression of policy preference",
            "Witkoff used unusually personal and self-referential language toward Putin at the opening of the talks",
            "Full official video, transcript, prepared remarks, and delegation briefing",
            "White House, State, NSC, Presidential records, Kremlin public archive",
        ],
        [
            "CH7-RUS-LANG-002",
            "Historical comparison",
            "American diplomats have previously used warm and flattering language toward Soviet and Russian leaders",
            "1938-2015",
            "FRUS and State Department primary records",
            "Established historical counterevidence",
            "NA",
            "Davies, Truman, Kissinger, Shultz, and Kerry provide documented precedents",
            "Contexts varied substantially and several examples followed or accompanied concrete reciprocal diplomacy",
            "Warmth is not literally unprecedented in U.S.–Soviet or U.S.–Russian diplomacy",
            "Broader corpus review of public and private diplomatic transcripts",
            "State Department Office of the Historian; presidential libraries; NARA",
        ],
        [
            "CH7-RUS-LANG-003",
            "Historical comparison",
            "No close modern public analogue was located for the complete configuration of Witkoff's statement",
            "2026-09-05",
            "Bounded comparative archival analysis",
            "Qualified analytical finding",
            "NA",
            "Review covered major official records involving Stalin, Brezhnev, Gorbachev, and Putin",
            "The review is not an exhaustive search of every classified, private, or untranslated exchange",
            "The formulation appears rare because it combined a subordinate envoy, an unresolved war, no announced concession, and a self-referential lifetime-memory tribute",
            "Complete searchable corpus of diplomatic memoranda and audiovisual records",
            "NARA; State; presidential libraries; foreign archives",
        ],
        [
            "CH7-RUS-LANG-004",
            "Negotiating effect",
            "The public tribute supplied relationship and status value to Putin independent of a completed settlement",
            "2026-09-05",
            "Event chronology and communications analysis",
            "Analytical inference",
            "NA",
            "Kremlin publication, Putin trust framing, no announced breakthrough, unchanged demands",
            "Flattery may preserve access and could be intended to facilitate future concessions",
            "The remark is evidence of a relationship-centered negotiating posture; its actual bargaining effect and motive remain unresolved",
            "Internal strategy, talking points, Russian assessment, and later concessions",
            "White House, State, NSC, intelligence and Russian records",
        ],
    ],
    "CH7-RUS-LANG-001",
)

# 7. Add a records-compulsion program.
replace_once(
    "Tmanch_CH7_open_questions.md",
    "### Coverage: January 2024–August 31, 2026",
    "### Coverage: January 2024–September 6, 2026",
)
records_block = r'''## Program CH7-RP-051 — September 2026 Moscow–Kyiv envoy posture, language, and negotiating record

- **Priority:** A
- **Date range:** August 20–September 30, 2026
- **Agencies and custodians:** White House, State Department, NSC, U.S. special-envoy offices, Secret Service, intelligence agencies for final releasable assessments, and Presidential records custodians; Ukrainian and Russian records where obtainable.
- **Questions:**
  - Was Witkoff’s retirement-memory statement prepared, approved, rehearsed, or spontaneous?
  - What guidance governed public praise, personal rapport, gifts, protocol, and bargaining posture?
  - What did the United States ask Putin to concede before or during the meeting?
  - What did Russia request concerning territory, NATO, sanctions, recognition, frozen assets, energy, investment, technology, or economic projects?
  - What potentially major U.S.–Russia projects were discussed?
  - Did the delegation use comparable personal language toward President Zelenskyy or Ukrainian negotiators the following day?
  - How did U.S., Russian, Ukrainian, and allied officials assess the effect of the public opening?
  - Did any later concession, ceasefire, or economic action result from the rapport strategy?
- **Records needed:** full audiovisual record; official transcript and translation; prepared remarks and talking points; briefing books; participant notes; memorandum of conversation; gifts and protocol records; economic-project papers; messages with Dmitriev and Ushakov; delegation debrief; Kyiv meeting records; allied consultations; intelligence and public-diplomacy assessments; and follow-up tasking.
- **Would strengthen the relationship-centered inference:** evidence that praise and personal status were intentionally granted without reciprocal concession, that economic normalization was prioritized, or that Russian officials viewed the envoys as unusually pliable or trusted.
- **Would weaken it:** evidence that the language was an approved tactical device that produced a material, verifiable Russian concession exceeding its status value, or that comparable warmth was used symmetrically with Kyiv.

### State Department / White House records module

```text
Subject: Records request — September 5–6, 2026 Witkoff–Kushner meetings
in Moscow and Kyiv, public opening language, and negotiating outcomes

I request releasable agency records dated August 20 through September
30, 2026 concerning Steve Witkoff's and Jared Kushner's meetings with
Vladimir Putin and Volodymyr Zelenskyy, including:

1. agendas, briefing materials, prepared remarks, talking points, and
   protocol or public-messaging guidance;
2. memoranda of conversation, participant notes, transcripts,
   translations, audiovisual records, and delegation debriefs;
3. records concerning territorial demands, NATO, security guarantees,
   sanctions, frozen assets, energy, trade, investment, technology, or
   potentially major U.S.–Russia economic projects;
4. records sufficient to show each proposal, concession requested,
   concession offered, condition imposed, and follow-up milestone;
5. communications with Kirill Dmitriev, Yuri Ushakov, Ukrainian
   officials, and allied governments;
6. records assessing the diplomatic, negotiating, alliance, or public-
   diplomacy effect of the Kremlin-released opening exchange; and
7. records sufficient to compare the delegation's public and private
   language toward the Russian and Ukrainian sides.

Please release all reasonably segregable portions, including dates,
titles, participants, routing, and unclassified factual summaries where
substantive material remains properly classified or privileged.
```
'''
insert_before(
    "Tmanch_CH7_open_questions.md",
    "---\n\n# 11. Filing-ready federal request modules",
    records_block,
    "## Program CH7-RP-051",
)

# 8. Carry the finding into the working conclusion without treating one remark as dispositive.
replace_once(
    "Current_Working_Tmanch_Conclusion.md",
    "### Coverage: 1977–August 31, 2026",
    "### Coverage: 1977–September 6, 2026",
)
conclusion_block = r'''Five days after Asheville, Witkoff and Kushner again met Putin in Moscow. In the Kremlin-released opening, Witkoff framed the group’s encounters with Putin as future retirement stories and memories that would rank near the top of their experience. The meeting produced no announced breakthrough; Russia’s core territorial and NATO demands remained unchanged, while potentially large U.S.–Russia economic projects were discussed. The envoys traveled to Kyiv the following day, an important indication that the mission was not limited to Moscow.

Historical comparison prevents two opposite errors. Warm personal language toward Soviet and Russian leaders is not unprecedented: Davies, Truman, Kissinger, Shultz, and Kerry all supply examples, with Kissinger’s treatment of Brezhnev the closest envoy analogue. But the review found no close modern public precedent combining a subordinate envoy, an unresolved Russian war against a U.S.-supported state, no announced prior concession, and a self-referential statement placing the Russian leader among the envoy’s most valued future life memories.

The remark does not prove secret direction or disloyalty. It may have been calculated flattery intended to preserve access. Its cumulative significance is that the relationship itself was publicly treated as a valuable personal achievement while Moscow’s substantive position remained fixed. That posture belongs beside Witkoff’s earlier trust framing, personalized accounts of Putin’s gestures toward Trump, repeated Russian economic-normalization discussions, and the administration’s broader reliance on personal assurances from Putin.
'''
insert_before(
    "Current_Working_Tmanch_Conclusion.md",
    "---\n\n# 9. Competing explanations",
    conclusion_block,
    "Five days after Asheville, Witkoff and Kushner again met Putin",
)

print("Witkoff–Putin diplomatic-language update applied successfully.")
