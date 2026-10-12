"""Materialize reproducible migration reports and explicit review selections.

All research comes from one pinned Git commit.  Report files are outputs, never
additional research inputs.  A successful build verifies original repository
bytes and package contracts; it does not authenticate external cited evidence.
"""

from __future__ import annotations

import csv
import gzip
import io
import json
import os
import re
import tempfile
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

from . import __version__
from .common import EvidenceError, bytes_digest, digest
from .compiler import compile_story
from .contracts import validate_bundle, validate_schema
from .importer import COLLECTIONS, build_bundle
from .inventory import GitSnapshot, build_inventory


PILOT_VEB_IDS = ("C21", "C22", "C23", "C24", "C25", "C26")
VEB_CLAIMS_PATH = "research/veb_a7_2026/claims.csv"
REVIEW_LIMIT = (
    "These are preserved repository assertions and source references for review. "
    "This report does not verify cited external documents, create supporting "
    "excerpts, approve factual publication, or render a V-Flow film."
)


def _json_bytes(value: Any, *, pretty: bool = True) -> bytes:
    options = {"indent": 2} if pretty else {"separators": (",", ":")}
    text = json.dumps(value, ensure_ascii=True, sort_keys=True, allow_nan=False, **options)
    return (text + "\n").encode("utf-8")


def _gzip_json(value: Any) -> bytes:
    buffer = io.BytesIO()
    # GzipFile fixes the OS byte as well as omitting filename/time metadata.
    with gzip.GzipFile(fileobj=buffer, mode="wb", filename="", mtime=0, compresslevel=9) as stream:
        stream.write(_json_bytes(value, pretty=False))
    return buffer.getvalue()


def _csv_bytes(fieldnames: list[str], rows: list[dict[str, Any]]) -> bytes:
    stream = io.StringIO(newline="")
    writer = csv.DictWriter(stream, fieldnames=fieldnames, lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)
    return stream.getvalue().encode("utf-8")


def _claim_origin_order(claim: dict[str, Any], raw_index: dict[str, Any]) -> tuple[Any, ...]:
    raw = raw_index[claim["raw_record_id"]]
    origin = raw["origin"]
    locator = origin["locator"]
    number = int(locator.rsplit(":", 1)[1]) if locator.startswith("csv:row:") else 0
    if locator.startswith("/events/"):
        try:
            number = int(locator.rsplit("/", 1)[1])
        except ValueError:
            pass
    return origin["path"], number, locator, claim["id"]


def _manifest(story_id: str, title: str, question: str, claim_ids: list[str], duration: int) -> dict[str, Any]:
    manifest = {
        "schema_version": "djt-story/1.0",
        "id": story_id,
        "title": title,
        "narrative_question": question,
        "target_duration_seconds": duration,
        "claim_ids": list(dict.fromkeys(claim_ids)),
        "capture_policy": "optional",
    }
    validate_schema(manifest, "story-manifest")
    return manifest


def _quarantine_rows(
    inventory: dict[str, Any], bundle: dict[str, Any], snapshot: GitSnapshot
) -> dict[str, Any]:
    imported = {
        (raw["origin"]["path"], raw["origin"]["locator"]): raw
        for raw in bundle["raw_records"]
        if raw["disposition"] == "quarantined_schema_mismatch"
    }
    rows = []
    for file in inventory["files"]:
        csv_report = file.get("csv", {})
        ragged = {row["pointer"]: row for row in csv_report.get("ragged_rows", [])}
        if not ragged:
            continue
        raw_bytes = snapshot.read_bytes(file["path"])
        parsed_rows = list(csv.reader(io.StringIO(raw_bytes.decode("utf-8-sig"), newline=""), strict=True))
        record_index = {record["pointer"]: record for record in file["records"]}
        for pointer, issue in ragged.items():
            number = int(pointer.rsplit(":", 1)[1])
            record = record_index[pointer]
            raw = imported.get((file["path"], pointer))
            payload = {"headers": parsed_rows[0], "cells": parsed_rows[number - 1]}
            if raw is not None and raw["payload"] != payload:
                raise EvidenceError(f"Quarantine payload does not reproduce original cells: {file['path']} {pointer}")
            rows.append({
                "record_id": raw["id"] if raw else None,
                "local_id_as_recorded": payload["cells"][0] if payload["cells"] else None,
                "import_status": "imported_quarantined" if raw else "inventory_only_not_imported",
                "disposition": "quarantined_schema_mismatch",
                "origin": {
                    "revision": snapshot.revision,
                    "path": file["path"],
                    "locator": pointer,
                    "sha256": file["sha256"],
                    "raw_sha256": record["raw_sha256"],
                    "byte_start": record["byte_start"],
                    "byte_end": record["byte_end"],
                    "line_start": record["line_start"],
                    "line_end": record["line_end"],
                },
                "expected_fields": issue["expected_fields"],
                "actual_fields": issue["actual_fields"],
                "payload": payload,
                "payload_sha256": digest(payload),
                "limitation": "Column alignment has not been guessed; every cell remains available for review.",
            })
    rows.sort(key=lambda row: (row["origin"]["path"], row["origin"]["line_start"]))
    covered = {(row["origin"]["path"], row["origin"]["locator"]) for row in rows}
    if set(imported) - covered:
        raise EvidenceError("Imported quarantine records were absent from the inventory quarantine report")
    return {
        "schema_version": "djt-quarantine-report/1.0",
        "source_revision": snapshot.revision,
        "row_count": len(rows),
        "imported_quarantined_count": sum(row["import_status"] == "imported_quarantined" for row in rows),
        "inventory_only_count": sum(row["import_status"] == "inventory_only_not_imported" for row in rows),
        "rows": rows,
    }


def _chapter_report(
    number: int,
    claims: list[dict[str, Any]],
    bundle: dict[str, Any],
    inventory_files: dict[str, Any],
    raw_index: dict[str, Any],
    quarantine: dict[str, Any],
) -> dict[str, Any]:
    ledger = f"Tmanch_CH{number}_claim_ledger.csv"
    source_path = f"Tmanch_CH{number}_primary_sources.md"
    ledger_info = inventory_files.get(ledger)
    sources = [
        source for source in bundle["sources"]
        if raw_index[source["raw_record_id"]]["origin"]["path"] == source_path
    ]
    references = [ref for claim in claims for ref in claim["source_refs"]]
    unresolved = [ref for ref in references if ref["resolution"] == "unresolved"]
    chapter_quarantine = [row for row in quarantine["rows"] if row["origin"]["path"] == ledger]
    return {
        "chapter": number,
        "ledger_path": ledger,
        "ledger_status": "file_present" if ledger_info else "no_file",
        "narrative_path": f"Tmanch_CH{number}.md" if f"Tmanch_CH{number}.md" in inventory_files else None,
        "raw_ledger_rows": ledger_info.get("csv", {}).get("row_count", 0) if ledger_info else 0,
        "imported_raw_records": sum(raw["origin"]["path"] == ledger for raw in bundle["raw_records"]),
        "typed_claim_count": len(claims),
        "quarantined_rows": len(chapter_quarantine),
        "quarantined_local_ids": [row["local_id_as_recorded"] for row in chapter_quarantine],
        "source_inventory_path": source_path if source_path in inventory_files else None,
        "named_source_entries": len(sources),
        "named_source_reference_occurrences": len(references),
        "resolved_source_reference_occurrences": len(references) - len(unresolved),
        "unresolved_source_reference_occurrences": len(unresolved),
        "unresolved_source_names": sorted({ref["raw_reference"] for ref in unresolved}),
        "claims_without_named_source_references": sum(not claim["source_refs"] for claim in claims),
        "manifest_status": "review_selection_created" if claims else "no_typed_claims_available",
        "manifest_path": f"chapters/chapter-{number}.story.json" if claims else None,
        "claim_ids": [claim["id"] for claim in claims],
        "limitation": "Resolved source IDs identify source entries; they do not establish verified documentary support.",
    }


def _coverage_csv(
    inventory: dict[str, Any], bundle: dict[str, Any], raw_index: dict[str, Any]
) -> bytes:
    coverage = {entry["path"]: entry for entry in bundle["coverage"]}
    raw_counts = Counter(raw["origin"]["path"] for raw in bundle["raw_records"])
    claim_counts = Counter(raw_index[claim["raw_record_id"]]["origin"]["path"] for claim in bundle["claims"])
    unresolved_counts: Counter[str] = Counter()
    for claim in bundle["claims"]:
        path = raw_index[claim["raw_record_id"]]["origin"]["path"]
        unresolved_counts[path] += sum(ref["resolution"] == "unresolved" for ref in claim["source_refs"])
    rows = []
    for file in inventory["files"]:
        path = file["path"]
        imported = coverage[path]
        rows.append({
            "path": path,
            "sha256": file["sha256"],
            "byte_count": file["byte_count"],
            "classification": file["classification"],
            "collection": file["collection"],
            "inventory_disposition": file["migration_disposition"],
            "import_disposition": imported["disposition"],
            "inventoried_structured_records": len(file["records"]),
            "imported_raw_records": raw_counts[path],
            "typed_claims": claim_counts[path],
            "quarantined_rows": file.get("csv", {}).get("ragged_row_count", 0),
            "unresolved_source_references": unresolved_counts[path],
        })
    fields = [
        "path", "sha256", "byte_count", "classification", "collection",
        "inventory_disposition", "import_disposition", "inventoried_structured_records",
        "imported_raw_records", "typed_claims", "quarantined_rows", "unresolved_source_references",
    ]
    return _csv_bytes(fields, rows)


def _classification_summary(
    inventory: dict[str, Any], bundle: dict[str, Any], raw_index: dict[str, Any]
) -> dict[str, Any]:
    """Count literal ledger labels without inferring acceptance or new scores."""
    families = {
        "status": ("Evidence_Status", "Evidence_Classification", "Evidence_Class", "status"),
        "source_tier": ("Source_Tier",),
        "source_class": ("Source_Class",),
        "confidence": ("Confidence_0_to_100",),
    }
    claims_by_path: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for claim in bundle["claims"]:
        claims_by_path[raw_index[claim["raw_record_id"]]["origin"]["path"]].append(claim)
    raw_by_path: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for raw in bundle["raw_records"]:
        raw_by_path[raw["origin"]["path"]].append(raw)
    collections = []
    origins = []
    for file in inventory["files"]:
        path = file["path"]
        chapter = re.fullmatch(r"Tmanch_CH(\d+)_claim_ledger\.csv", path)
        if not chapter and path != VEB_CLAIMS_PATH:
            continue
        headers = file.get("csv", {}).get("header", [])
        claims = sorted(claims_by_path[path], key=lambda claim: _claim_origin_order(claim, raw_index))
        quarantine = [raw for raw in raw_by_path[path] if raw["disposition"] == "quarantined_schema_mismatch"]
        for claim in claims:
            raw = raw_index[claim["raw_record_id"]]
            origins.append({
                "claim_id": claim["id"], "raw_record_id": raw["id"],
                "local_id": raw["local_id"], "origin": raw["origin"],
            })
        axes = []
        for family, fields in families.items():
            present_fields = [field for field in fields if field in headers]
            for field in present_fields or [None]:
                values: dict[tuple[str, str | None], list[str]] = defaultdict(list)
                for claim in claims:
                    payload = raw_index[claim["raw_record_id"]]["payload"]
                    if field is None:
                        state, value = "missing_column", None
                    elif field not in payload or payload[field] is None:
                        state, value = "missing_value", None
                    else:
                        value = payload[field]
                        state = "blank" if not value.strip() else "recorded"
                    values[(state, value)].append(claim["id"])
                axes.append({
                    "axis": family,
                    "field_name": field,
                    "field_presence": "present" if field is not None else "missing_column",
                    "counted_typed_claims": len(claims),
                    "values": [
                        {"state": state, "value_as_recorded": value, "count": len(ids), "claim_ids": ids}
                        for (state, value), ids in sorted(values.items(), key=lambda item: (item[0][0], item[0][1] or ""))
                    ],
                })
        raw_rows = file.get("csv", {}).get("row_count", 0)
        untyped = raw_rows - len(claims) - len(quarantine)
        if untyped < 0:
            raise EvidenceError(f"Classification counts exceed original ledger rows: {path}")
        collections.append({
            "path": path,
            "chapter": int(chapter.group(1)) if chapter else None,
            "file_sha256": file["sha256"],
            "raw_ledger_rows": raw_rows,
            "typed_claim_rows": len(claims),
            "quarantined_rows": len(quarantine),
            "other_untyped_rows": untyped,
            "axes": axes,
            "quarantined_origins": [
                {"raw_record_id": raw["id"], "local_id": raw["local_id"], "origin": raw["origin"]}
                for raw in sorted(quarantine, key=lambda raw: raw["origin"]["locator"])
            ],
        })
    return {
        "schema_version": "djt-classification-summary/1.0",
        "source_revision": inventory["revision"],
        "scope": "Typed claims from active chapter claim ledgers and the VEB claim ledger. Annual assertions and unaligned quarantine cells are not assigned ledger classifications.",
        "value_policy": "Preserve each exact as-recorded field/value, including blank strings and missing columns. Status, source tier, source class, and confidence are separate axes; no averaging, ranking, numerical synthesis, or new confidence label is performed.",
        "publication_policy": "Legacy labels and confidence values do not constitute editorial acceptance or verified evidentiary support and do not change publication gates.",
        "total_raw_ledger_rows": sum(item["raw_ledger_rows"] for item in collections),
        "total_typed_claim_rows": sum(item["typed_claim_rows"] for item in collections),
        "total_quarantined_rows": sum(item["quarantined_rows"] for item in collections),
        "total_other_untyped_rows": sum(item["other_untyped_rows"] for item in collections),
        "collections": collections,
        "claim_origins": sorted(origins, key=lambda origin: origin["claim_id"]),
    }


def _write_artifact(target: Path, content: bytes) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=f".{target.name}.", dir=target.parent)
    try:
        with os.fdopen(descriptor, "wb") as handle:
            handle.write(content)
        os.replace(temporary, target)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def write_audit_reports(root: Path, revision: str, output_dir: Path) -> dict[str, Any]:
    """Write deterministic inventory, preservation coverage, and review outputs.

    ``revision`` is resolved once; generated files and concurrent working-tree
    changes cannot enter that input.  No artifact may overwrite a path tracked
    in the selected input commit.  The receipt hashes all artifacts except its
    own manifest, and deliberately contains no output-directory or wall time.
    """
    root = Path(root).resolve()
    snapshot = GitSnapshot(root, revision)
    inventory = build_inventory(root, snapshot.revision)
    bundle = build_bundle(root, snapshot.revision, inventory=inventory)
    validation = validate_bundle(bundle, root)
    raw_index = {record["id"]: record for record in bundle["raw_records"]}
    inventory_files = {file["path"]: file for file in inventory["files"]}
    quarantine = _quarantine_rows(inventory, bundle, snapshot)
    claims_by_path: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for claim in bundle["claims"]:
        claims_by_path[raw_index[claim["raw_record_id"]]["origin"]["path"]].append(claim)
    for claims in claims_by_path.values():
        claims.sort(key=lambda claim: _claim_origin_order(claim, raw_index))

    artifacts: dict[str, bytes] = {
        "inventory.json.gz": _gzip_json(inventory),
        "evidence-package.json.gz": _gzip_json(bundle),
        "coverage.csv": _coverage_csv(inventory, bundle, raw_index),
        "quarantined-rows.json": _json_bytes(quarantine),
        "classification-summary.json": _json_bytes(_classification_summary(inventory, bundle, raw_index)),
    }
    chapters = []
    for number in range(1, 10):
        claims = claims_by_path.get(f"Tmanch_CH{number}_claim_ledger.csv", [])
        chapter = _chapter_report(number, claims, bundle, inventory_files, raw_index, quarantine)
        chapters.append(chapter)
        if claims:
            manifest = _manifest(
                f"djt-chapter-{number}-review",
                f"Research review: Chapter {number} evidence collection",
                f"Which assertions recorded in Chapter {number} have supporting sources, "
                "material counterevidence, and unresolved limitations that must be carried into a future story?",
                chapter["claim_ids"],
                1800,
            )
            artifacts[chapter["manifest_path"]] = _json_bytes(manifest)

    pilot_groups = {
        "chapter_4": claims_by_path.get("Tmanch_CH4_claim_ledger.csv", []),
        "annual_2010": claims_by_path.get("trump-russia-timeline/data/processed/by-year/2010.json", []),
        "annual_2011": claims_by_path.get("trump-russia-timeline/data/processed/by-year/2011.json", []),
        "selected_veb": [
            claim for claim in claims_by_path.get(VEB_CLAIMS_PATH, [])
            if raw_index[claim["raw_record_id"]]["local_id"] in PILOT_VEB_IDS
        ],
    }
    selected = list(dict.fromkeys(claim["id"] for group in pilot_groups.values() for claim in group))
    present_veb = {raw_index[claim["raw_record_id"]]["local_id"] for claim in pilot_groups["selected_veb"]}
    pilot: dict[str, Any] = {
        "status": "review_selection_created" if selected else "no_typed_claims_available",
        "selected_claim_count": len(selected),
        "component_claim_counts": {name: len(claims) for name, claims in pilot_groups.items()},
        "requested_veb_local_ids": list(PILOT_VEB_IDS),
        "missing_requested_veb_local_ids": [local_id for local_id in PILOT_VEB_IDS if local_id not in present_veb],
        "publication_allowed": False,
        "limitation": REVIEW_LIMIT,
    }
    if selected:
        manifest = _manifest(
            "djt-chapter-4-toronto-midland-review-pilot",
            "Research review: Chapter 4 / Toronto / Midland pilot",
            "What do the preserved Chapter 4 assertions, 2010–2011 timeline records, and selected "
            "Midland/Toronto records establish, qualify, or leave unresolved about distinct commitments, "
            "transactions, and alleged onward payments?",
            selected,
            1200,
        )
        review = compile_story(bundle, manifest, mode="review", source_root=root)
        pilot["publication_allowed"] = review["publication"]["allowed"]
        pilot["publication_blocker_counts"] = dict(sorted(Counter(
            code for finding in review["publication"]["findings"] for code in finding["blocking_reasons"]
        ).items()))
        pilot["manifest_path"] = "chapter-4-pilot.story.json"
        pilot["review_package_path"] = "chapter-4-pilot.review.json"
        pilot["build_fingerprint"] = review["build_fingerprint"]
        artifacts[pilot["manifest_path"]] = _json_bytes(manifest)
        artifacts[pilot["review_package_path"]] = _json_bytes(review)

    chapter_fields = [
        "chapter", "ledger_path", "ledger_status", "raw_ledger_rows", "imported_raw_records",
        "typed_claim_count", "quarantined_rows", "named_source_entries",
        "named_source_reference_occurrences", "resolved_source_reference_occurrences",
        "unresolved_source_reference_occurrences", "claims_without_named_source_references",
        "manifest_status", "manifest_path",
    ]
    artifacts["chapter-coverage.csv"] = _csv_bytes(
        chapter_fields, [{key: chapter[key] for key in chapter_fields} for chapter in chapters]
    )
    artifacts["chapter-coverage.json"] = _json_bytes({
        "schema_version": "djt-chapter-coverage/1.0",
        "source_revision": snapshot.revision,
        "chapters": chapters,
        "pilot": pilot,
        "limitation": REVIEW_LIMIT,
    })
    summary = {
        "schema_version": "djt-inventory-summary/1.0",
        "source_revision": snapshot.revision,
        "snapshot_commit_date": inventory["snapshot_commit_date"],
        "compiler_version": __version__,
        "inventory": inventory["summary"],
        "package_counts": {name: len(bundle[name]) for name in COLLECTIONS},
        "validation": validation,
        "validation_scope": "Checks original repository blobs, imported payloads, and package references; external cited source contents remain unverified.",
        "annual_year_coverage": inventory["annual_audit"]["year_coverage"],
        "annual_local_id_collisions_by_kind": dict(sorted(Counter(
            collision["kind"] for collision in inventory["annual_audit"]["local_id_collisions"]
        ).items())),
        "invalid_json": [
            {"path": file["path"], "sha256": file["sha256"], "parse": file["json"]}
            for file in inventory["files"] if file.get("json", {}).get("status") == "invalid_json"
        ],
        "csv_structure_issues": [
            {"path": file["path"], "row_count": file["csv"].get("row_count", 0),
             "ragged_rows": file["csv"].get("ragged_rows", []),
             "header_issues": file["csv"].get("header_issues", [])}
            for file in inventory["files"] if "csv" in file
            and (file["csv"]["status"] != "parsed" or file["csv"].get("ragged_rows") or file["csv"].get("header_issues"))
        ],
        "filename_metadata": [file["filename_metadata"] for file in inventory["files"] if "filename_metadata" in file],
        "link_status_counts": inventory["link_audit"]["status_counts"],
        "quarantined_row_count": quarantine["row_count"],
        "imported_quarantined_row_count": quarantine["imported_quarantined_count"],
        "inventory_only_quarantined_row_count": quarantine["inventory_only_count"],
        "source_version_availability": dict(sorted(Counter(version["availability"] for version in bundle["source_versions"]).items())),
        "chapter_manifest_count": sum(chapter["manifest_path"] is not None for chapter in chapters),
        "classification_summary_path": "classification-summary.json",
        "chapter_4_pilot": pilot,
        "coverage_count_note": "Inventory counts describe top-level structured records; imported raw counts may additionally include nested citations and named source sections. These counts are not interchangeable measures of verified evidence.",
        "limitation": REVIEW_LIMIT,
    }
    artifacts["inventory-summary.json"] = _json_bytes(summary)
    receipt = {
        "schema_version": "djt-audit-receipt/1.0",
        "source_revision": snapshot.revision,
        "compiler_version": __version__,
        "artifact_count": len(artifacts) + 1,
        "artifacts": [
            {"path": name, "sha256": bytes_digest(content), "byte_count": len(content)}
            for name, content in sorted(artifacts.items())
        ],
        "receipt_path": "receipt.json",
        "integrity_scope": "Artifact hashes cover every generated file except this receipt, which is the hash manifest itself.",
        "serialization": "Sorted UTF-8 JSON; gzip has mtime zero and no filename metadata; CSV uses LF line endings.",
        "source_file_count": len(inventory["files"]),
        "imported_raw_record_count": len(bundle["raw_records"]),
        "typed_claim_count": len(bundle["claims"]),
        "quarantined_row_count": quarantine["row_count"],
        "chapter_manifest_count": summary["chapter_manifest_count"],
        "pilot_claim_count": len(selected),
        "pilot_publication_allowed": pilot["publication_allowed"],
        "limitation": REVIEW_LIMIT,
    }
    artifacts["receipt.json"] = _json_bytes(receipt)

    # Validate and prepare every output before writing the first one.
    output_dir = Path(output_dir).resolve()
    for name in artifacts:
        resolved = (output_dir / name).resolve()
        try:
            relative = resolved.relative_to(root).as_posix()
        except ValueError:
            continue
        if relative in inventory_files:
            raise EvidenceError(f"Report target would overwrite a tracked input file: {relative}")
    for name, content in sorted(artifacts.items()):
        _write_artifact(output_dir / name, content)
    return receipt
