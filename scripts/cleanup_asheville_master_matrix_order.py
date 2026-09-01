#!/usr/bin/env python3
"""Move Asheville additions into the correct sections of existing master files."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def move_tail_block_before(path: str, block_marker: str, anchor: str) -> None:
    file_path = ROOT / path
    text = file_path.read_text(encoding="utf-8")
    block_start = text.find(block_marker)
    if block_start < 0:
        raise RuntimeError(f"Block marker not found in {path}: {block_marker}")

    # Already correctly ordered.
    anchor_index = text.find(anchor)
    if anchor_index < 0:
        raise RuntimeError(f"Anchor not found in {path}: {anchor}")
    if block_start < anchor_index:
        return

    block = text[block_start:].strip()
    prefix = text[:block_start].rstrip()
    anchor_index = prefix.find(anchor)
    if anchor_index < 0:
        raise RuntimeError(f"Anchor not found before appended block in {path}")

    before = prefix[:anchor_index].rstrip()
    after = prefix[anchor_index:].lstrip()
    updated = before + "\n\n" + block + "\n\n" + after + "\n"
    file_path.write_text(updated, encoding="utf-8")


move_tail_block_before(
    "Tmanch_CH7_primary_sources.md",
    "# H. Asheville G20 financial normalization",
    "---\n\n# Source-control rules",
)
move_tail_block_before(
    "Tmanch_CH7_open_questions.md",
    "## Program CH7-RP-050 — Asheville G20 invitation, bilateral, and normalization record",
    "---\n\n# 11. Filing-ready federal request modules",
)

path = ROOT / "Tmanch_CH7_open_questions.md"
text = path.read_text(encoding="utf-8")
text = text.replace(
    "### Treasury FOIA module\n\n```text\nSubject: FOIA Request — August 31, 2026 Asheville G20 invitation",
    "### Filing-ready Treasury FOIA module\n\n```text\nSubject: FOIA Request — August 31, 2026 Asheville G20 invitation",
    1,
)
path.write_text(text, encoding="utf-8")

changed = ["Tmanch_CH7_primary_sources.md", "Tmanch_CH7_open_questions.md"]
subprocess.run(["git", "config", "user.name", "github-actions[bot]"], cwd=ROOT, check=True)
subprocess.run(["git", "config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"], cwd=ROOT, check=True)
subprocess.run(["git", "add", *changed], cwd=ROOT, check=True)
if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT).returncode:
    subprocess.run(
        ["git", "commit", "-m", "docs: place Asheville additions in master sections [skip ci]"],
        cwd=ROOT,
        check=True,
    )
    subprocess.run(["git", "push", "origin", "HEAD"], cwd=ROOT, check=True)
else:
    print("Document order already correct.")
