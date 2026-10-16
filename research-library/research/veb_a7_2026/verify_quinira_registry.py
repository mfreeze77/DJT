#!/usr/bin/env python3
"""Read-only parity for this five-company charge-index review, not historical proof.

Usage: python3 -B research/veb_a7_2026/verify_quinira_registry.py RAW_ARTIFACT_DIR
RAW_ARTIFACT_DIR must contain the five original *-charges-1.html responses.
No network, authentication, source rewriting or generalized registry crawling.
"""
from __future__ import annotations
import argparse
import csv
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path

TABLE = "ctl00_cphMyMasterCentral_grdFileContent"
PREFIX = "ctl00_cphMyMasterCentral_ucOrganizationDetailsSummary1_"
FIELDS = dict(name_original="lblName", registration_original="lblNumber",
              registration_date_literal="lblRegistrationDate", status_literal="lblStatus",
              status_date_literal="lblstatusDate", last_annual_return_literal="lblLastAnnualReturnDate")
COLUMNS = ["service_description", "form_number", "form_description", "order_date_literal", "file_page", "scanned"]

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

class ChargePage(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.table = False
        self.rows: list[list[str]] = []
        self.row: list[str] | None = None
        self.cell: list[str] | None = None
        self.span: str | None = None
        self.spans: dict[str, str] = {}
        self.span_text: list[str] = []
        self.category_selected = False
        self.document_links = 0
        self.text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = dict(attrs)
        if tag == "table" and a.get("id") == TABLE:
            self.table = True
        if self.table and tag == "tr":
            self.row = []
        if self.table and tag in ("td", "th"):
            self.cell = []
        if self.table and tag == "a":
            self.document_links += 1
        if tag == "span" and a.get("id") in [PREFIX + s for s in FIELDS.values()] + ["ctl00_cphMyMasterCentral_CurrentPage", "ctl00_cphMyMasterCentral_TotalPages"]:
            self.span = a["id"]
            self.span_text = []
        if tag == "input" and a.get("id") == "ctl00_cphMyMasterCentral_rdFileType_1":
            self.category_selected = "checked" in a

    def handle_data(self, data: str) -> None:
        self.text.append(data)
        if self.cell is not None:
            self.cell.append(data)
        if self.span is not None:
            self.span_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if self.table and tag in ("td", "th") and self.cell is not None:
            if self.row is None:
                raise ValueError("Cell outside row")
            self.row.append(" ".join(" ".join(self.cell).split()))
            self.cell = None
        if self.table and tag == "tr" and self.row is not None:
            self.rows.append(self.row)
            self.row = None
        if tag == "table" and self.table:
            self.table = False
        if tag == "span" and self.span is not None:
            self.spans[self.span] = " ".join(" ".join(self.span_text).split())
            self.span = None

def verify(raw_dir: Path, review_dir: Path) -> dict[str, object]:
    meta = json.loads((review_dir / "quinira_source_review.json").read_text())
    with (review_dir / "quinira_charge_index.csv").open(newline="") as f:
        charges = list(csv.DictReader(f))
    with (review_dir / "quinira_company_review.csv").open(newline="") as f:
        companies = {r["entity_id"]: r for r in csv.DictReader(f)}
    checked = 0
    for s in meta["company_sources"]:
        data = (raw_dir / s["file"]).read_bytes()
        if len(data) != s["raw_bytes"] or digest(data) != s["raw_sha256"]:
            raise ValueError(f"Raw response bytes changed: {s['file']}")
        p = ChargePage()
        p.feed(data.decode("utf-8-sig"))
        if not p.category_selected or p.document_links:
            raise ValueError("Unexpected selected category or scan hyperlink")
        if p.rows[0] != ["Service Description", "Form Number", "Form Description", "Order Date", "Page Number", "Scanned"]:
            raise ValueError("Unreviewed table schema")
        target = [r for r in charges if r["source_id"] == s["source_id"]]
        if p.rows[1:] != [[r[c] for c in COLUMNS] for r in target]:
            raise ValueError(f"Row selection/order mismatch: {s['source_id']}")
        for field, suffix in FIELDS.items():
            if p.spans.get(PREFIX + suffix) != companies[s["entity_id"]][field]:
                raise ValueError(f"Organization-header mismatch: {field}")
        for suffix in ("CurrentPage", "TotalPages"):
            if p.spans.get("ctl00_cphMyMasterCentral_" + suffix) != "1":
                raise ValueError("Unexpected display pagination")
        if "20 most recent document entries" not in " ".join(p.text):
            raise ValueError("Display-cap warning missing")
        if digest((review_dir / s["derived_excerpt_path"]).read_bytes()) != s["derived_excerpt_sha256"]:
            raise ValueError("Derived excerpt changed")
        checked += len(target)
    if checked != len(charges) or checked != 21:
        raise ValueError("Incomplete scoped row coverage")
    return {"raw_responses": 5, "displayed_observations": checked,
            "same_page_scan_observations_preserved": True, "read_only": True,
            "underlying_instruments_checked": False, "historical_authentication": False}

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("raw_directory", type=Path)
    args = parser.parse_args()
    try:
        print(json.dumps(verify(args.raw_directory, Path(__file__).resolve().parent), indent=2))
    except (ValueError, OSError, KeyError, UnicodeError) as exc:
        parser.exit(1, f"Quinira source parity failed: {exc}\n")

if __name__ == "__main__":
    main()
