"""Executable transport contracts and source-bound referential validation."""

import csv
import io
from collections import Counter
from importlib.resources import files
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker

from .common import EvidenceError, bytes_digest, digest, safe_relative, strict_json
from .importer import COLLECTIONS, build_bundle
from .inventory import GitSnapshot


def schema(name):
    if name not in {"evidence-package", "story-manifest"}:
        raise EvidenceError(f"Unknown schema: {name}")
    return strict_json(files("djt_evidence").joinpath("schemas", name + ".schema.json").read_text())


def validate_schema(value, name):
    definition = schema(name)
    Draft202012Validator.check_schema(definition)
    errors = list(Draft202012Validator(definition, format_checker=FormatChecker()).iter_errors(value))
    if errors:
        error = sorted(errors, key=lambda item: str(list(item.absolute_path)))[0]
        raise EvidenceError(f"{name} {'/'.join(map(str, error.absolute_path))}: {error.message}")


def indexes(bundle):
    return {name: {record["id"]: record for record in bundle[name]} for name in COLLECTIONS}


def validate_bundle(bundle, source_root=None):
    validate_schema(bundle, "evidence-package")
    all_ids = [record["id"] for name in COLLECTIONS for record in bundle[name]]
    if len(all_ids) != len(set(all_ids)):
        raise EvidenceError("Duplicate canonical ID")
    index = indexes(bundle)

    def require(collection, key, label):
        if key not in index[collection]:
            raise EvidenceError(f"{label}: unresolved {collection} reference {key}")
        return index[collection][key]

    coverage = {item["path"]: item for item in bundle["coverage"]}
    if len(coverage) != len(bundle["coverage"]):
        raise EvidenceError("Duplicate coverage path")
    counts = Counter(record["origin"]["path"] for record in bundle["raw_records"])
    for path, entry in coverage.items():
        safe_relative(path)
        if entry["imported_records"] != counts[path]:
            raise EvidenceError(f"Coverage count mismatch: {path}")
    for record in bundle["raw_records"]:
        origin = record["origin"]
        if origin["path"] not in coverage or coverage[origin["path"]]["sha256"] != origin["sha256"]:
            raise EvidenceError("Raw provenance does not match inventory coverage")
        if digest(record["payload"]) != record["payload_sha256"]:
            raise EvidenceError("Raw payload digest mismatch")
    for name in ("entities", "occurrences", "relationships", "observations", "claims",
                 "sources", "acquisitions", "financials", "corrections"):
        for record in bundle[name]:
            require("raw_records", record["raw_record_id"], name)

    def require_source_refs(record, label):
        for ref in record["source_refs"]:
            if ref["resolution"] == "resolved":
                require("sources", ref["source_id"], label)
            elif ref["source_id"] is not None:
                raise EvidenceError("Unresolved citation cannot identify a resolved source")

    annual_documents = {record["origin"]["path"]: record["payload"] for record in bundle["raw_records"]
                        if record["kind"] == "annual_document"}
    entity_aliases = {}
    for entity in bundle["entities"]:
        raw = index["raw_records"][entity["raw_record_id"]]
        path = raw["origin"]["path"]
        aliases = {raw["local_id"]}
        document = annual_documents.get(path)
        if (isinstance(document, dict) and isinstance(document.get("entities"), dict)
                and raw["origin"]["locator"].startswith("/entities/")):
            aliases.add(raw["origin"]["locator"][len("/entities/"):].replace("~1", "/").replace("~0", "~"))
        for alias in aliases:
            entity_aliases.setdefault((path, alias), set()).add(entity["id"])

    for claim in bundle["claims"]:
        obs = require("observations", claim["observation_id"], "claim")
        if obs["raw_record_id"] != claim["raw_record_id"] or obs["text"] != claim["statement"]:
            raise EvidenceError("Claim/observation origin or text mismatch")
        require_source_refs(claim, "claim citation")
        for field in ("financial_ids", "occurrence_ids", "correction_ids"):
            if len(claim[field]) != len(set(claim[field])):
                raise EvidenceError(f"Claim contains duplicate {field}")
        for key in claim["occurrence_ids"]:
            occurrence = require("occurrences", key, "claim")
            if occurrence["raw_record_id"] != claim["raw_record_id"]:
                raise EvidenceError("Claim and occurrence do not have the same original event")
        for key in claim["financial_ids"]:
            if claim["id"] not in require("financials", key, "claim")["claim_ids"]:
                raise EvidenceError("Financial claim linkage is not reciprocal")
        for key in claim["correction_ids"]:
            if claim["id"] not in require("corrections", key, "claim")["claim_ids"]:
                raise EvidenceError("Correction linkage is not reciprocal")
    for relationship in bundle["relationships"]:
        require_source_refs(relationship, "relationship citation")
        original = index["raw_records"][relationship["raw_record_id"]]
        for side in ("from", "to"):
            key = relationship[side + "_entity_id"]
            if key is None:
                continue
            entity = require("entities", key, "relationship")
            entity_raw = index["raw_records"][entity["raw_record_id"]]
            if (entity_raw["origin"]["path"] != original["origin"]["path"]
                    or entity_aliases.get((original["origin"]["path"],
                                           relationship[side + "_label_as_recorded"])) != {key}):
                raise EvidenceError("Relationship reference crosses its recorded entity namespace")
        if len(relationship["correction_ids"]) != len(set(relationship["correction_ids"])):
            raise EvidenceError("Relationship contains duplicate correction references")
        for key in relationship["correction_ids"]:
            correction = require("corrections", key, "relationship")
            if relationship["raw_record_id"] not in correction["raw_record_ids"]:
                raise EvidenceError("Relationship correction linkage is not reciprocal")
    for acquisition in bundle["acquisitions"]:
        if len(set(acquisition["source_ids"])) != len(acquisition["source_ids"]):
            raise EvidenceError("Acquisition contains duplicate source references")
        for key in acquisition["source_ids"]:
            require("sources", key, "acquisition")
    for version in bundle["source_versions"]:
        require("sources", version["source_id"], "source version")
        acquisition = require("acquisitions", version["acquisition_id"], "source version")
        if version["source_id"] not in acquisition["source_ids"]:
            raise EvidenceError("Source version belongs to a different acquisition source")
        if version["content_sha256"] != acquisition["recorded_sha256"]:
            raise EvidenceError("Source version and acquisition hash disagree")
        if version["availability"] == "retained":
            if not version["local_path"] or not version["content_sha256"]:
                raise EvidenceError("Retained source version needs bytes path and digest")
            safe_relative(version["local_path"])
        elif version["local_path"] is not None or version["verification"] != "not_verified_locally":
            raise EvidenceError("Metadata-only version cannot claim local verification")
    for excerpt in bundle["excerpts"]:
        require("source_versions", excerpt["source_version_id"], "excerpt")
        if bytes_digest(excerpt["exact_text"].encode("utf-8")) != excerpt["text_sha256"]:
            raise EvidenceError("Excerpt text digest mismatch")
        selector = excerpt["selector"]
        if selector["end"] <= selector["start"]:
            raise EvidenceError("Invalid text selector bounds")
    for link in bundle["evidence_links"]:
        require("claims", link["claim_id"], "evidence link")
        require("sources", link["source_id"], "evidence link")
        if link["excerpt_id"]:
            excerpt = require("excerpts", link["excerpt_id"], "evidence link")
            version = require("source_versions", excerpt["source_version_id"], "evidence link")
            if version["source_id"] != link["source_id"]:
                raise EvidenceError("Evidence link source and excerpt source disagree")
        elif link["relation"] != "cites_unverified":
            raise EvidenceError("Evidence support/qualification/contradiction needs an exact excerpt")
    for financial in bundle["financials"]:
        for side in ("from_entity_id", "to_entity_id"):
            if financial["roles_as_recorded"].get(side) is not None:
                require("entities", financial["roles_as_recorded"][side], "financial party")
        for key in financial["claim_ids"]:
            if financial["id"] not in require("claims", key, "financial")["financial_ids"]:
                raise EvidenceError("Financial linkage is not reciprocal")
    for correction in bundle["corrections"]:
        for key in correction["claim_ids"]:
            if correction["id"] not in require("claims", key, "correction")["correction_ids"]:
                raise EvidenceError("Correction linkage is not reciprocal")
        for key in correction["raw_record_ids"]:
            require("raw_records", key, "correction")
            for relationship in bundle["relationships"]:
                if relationship["raw_record_id"] == key and correction["id"] not in relationship["correction_ids"]:
                    raise EvidenceError("Correction relationship linkage is not reciprocal")
    for capture in bundle["captures"]:
        require("excerpts", capture["excerpt_id"], "capture")
        if capture["status"] == "available":
            if not capture["manifest_path"] or not capture["manifest_sha256"]:
                raise EvidenceError("Available capture needs a verifiable manifest")
            safe_relative(capture["manifest_path"])
    for review in bundle["reviews"]:
        require("claims", review["claim_id"], "review")
        if len(set(review["evidence_link_ids"])) != len(review["evidence_link_ids"]):
            raise EvidenceError("Review contains duplicate evidence references")
        for key in review["evidence_link_ids"]:
            if require("evidence_links", key, "review")["claim_id"] != review["claim_id"]:
                raise EvidenceError("Review references evidence for another claim")
    for path, fingerprint in bundle["control_fingerprints"].items():
        if path not in coverage or coverage[path]["sha256"] != fingerprint:
            raise EvidenceError("Controlling interpretation fingerprint mismatch")
    if source_root is not None:
        verify_snapshot(bundle, source_root)
    return {"valid": True, "claims": len(bundle["claims"]),
            "raw_records": len(bundle["raw_records"]), "source_bytes_checked": source_root is not None,
            "original_import_replayed": source_root is not None}


def _json_pointer(data, pointer):
    if not pointer:
        return data
    if not pointer.startswith("/"):
        raise EvidenceError("Invalid JSON pointer")
    for encoded in pointer[1:].split("/"):
        key = encoded.replace("~1", "/").replace("~0", "~")
        data = data[int(key)] if isinstance(data, list) else data[key]
    return data


def verify_snapshot(bundle, source_root):
    snapshot = GitSnapshot(Path(source_root), bundle["repository"]["revision"])
    coverage = {entry["path"]: entry for entry in bundle["coverage"]}
    if set(snapshot.paths) != set(coverage):
        raise EvidenceError("Coverage must account for every entry of the pinned Git snapshot")
    # Checking only supplied rows permits deleting a row and recounting coverage.
    # Reproduce the expected import from the actual Git tree, without trusting a
    # package-provided inventory or count. Imported meaning is immutable here;
    # review, retained-source bindings and new evidence relations are separate.
    expected = build_bundle(Path(source_root), snapshot.revision)
    _verify_import_preserved(bundle, expected)
    content = {}
    for path, entry in coverage.items():
        data = snapshot.read_bytes(path)
        if bytes_digest(data) != entry["sha256"]:
            raise EvidenceError(f"Source file hash mismatch: {path}")
        content[path] = data
    parsed = {}
    for record in bundle["raw_records"]:
        origin = record["origin"]
        path, locator = origin["path"], origin["locator"]
        data = content[path]
        try:
            if locator.startswith("csv:row:"):
                if path not in parsed:
                    parsed[path] = list(csv.reader(io.StringIO(data.decode("utf-8-sig"), newline=""), strict=True))
                rows = parsed[path]
                cells = rows[int(locator.rsplit(":", 1)[1]) - 1]
                value = ({"headers": rows[0], "cells": cells} if record["kind"] == "csv_unmapped_row"
                         else dict(zip(rows[0], cells)))
            elif locator.startswith("lines:"):
                start, end = map(int, locator[6:].split("-"))
                text = "".join(data.decode("utf-8").splitlines(keepends=True)[start - 1:end])
                value = {"text": text}
                if origin["raw_sha256"] != bytes_digest(text.encode("utf-8")):
                    raise EvidenceError("Source section byte digest mismatch")
            else:
                if path not in parsed:
                    parsed[path] = strict_json(data)
                value = _json_pointer(parsed[path], locator)
            if value != record["payload"]:
                raise EvidenceError(f"Imported payload does not reproduce original: {path} {locator}")
        except (KeyError, IndexError, TypeError, UnicodeError, ValueError) as exc:
            raise EvidenceError(f"Invalid source locator: {path} {locator}") from exc
    _verify_retained_sources(bundle, snapshot)
    return snapshot


def _verify_import_preserved(bundle, expected):
    """Allow declared enrichment while refusing removal or source promotion."""
    for key in ("schema_version", "compiler_version", "package_id", "repository",
                "issues", "control_fingerprints"):
        if bundle[key] != expected[key]:
            raise EvidenceError(f"Pinned import metadata differs: {key}")
    if {entry["path"]: entry for entry in bundle["coverage"]} != {
        entry["path"]: entry for entry in expected["coverage"]
    }:
        raise EvidenceError("Coverage differs from the complete pinned import")
    actual_index, expected_index = indexes(bundle), indexes(expected)
    enriched_fields = {
        "source_versions": {"availability", "local_path", "verification", "media_type"},
        "acquisitions": {"local_bytes_verified"},
    }
    additive = {"evidence_links", "excerpts", "captures", "reviews"}
    for name in COLLECTIONS:
        actual, baseline = actual_index[name], expected_index[name]
        if name in additive:
            # A reviewed contribution is a new record. In particular, never
            # overwrite a historical cites_unverified edge with supports.
            if any(actual.get(key) != value for key, value in baseline.items()):
                raise EvidenceError(f"Original {name} records were removed or changed")
            continue
        if set(actual) != set(baseline):
            raise EvidenceError(f"Original {name} population differs from pinned import")
        allowed = enriched_fields.get(name, set())
        for key, original in baseline.items():
            observed = actual[key]
            if {k: v for k, v in observed.items() if k not in allowed} != {
                k: v for k, v in original.items() if k not in allowed
            }:
                raise EvidenceError(f"Original {name} content differs from pinned import: {key}")


def _verify_retained_sources(bundle, snapshot):
    """Check all declared retained bytes, including currently unused versions."""
    acquisitions = {item["id"]: item for item in bundle["acquisitions"]}
    verified_acquisitions = set()
    for version in bundle["source_versions"]:
        if version["availability"] != "retained":
            continue
        path = version["local_path"]
        try:
            entry = snapshot.entries[path]
            if entry["mode"] not in {"100644", "100755"}:
                raise EvidenceError("Retained source must be an original regular-file blob")
            data = snapshot.read_bytes(path)
        except (KeyError, ValueError) as exc:
            raise EvidenceError("Retained source bytes are not present in the pinned snapshot") from exc
        if bytes_digest(data) != version["content_sha256"]:
            raise EvidenceError("Retained source bytes do not match the recorded acquisition hash")
        acquisition = acquisitions[version["acquisition_id"]]
        if acquisition["recorded_bytes"] is not None and len(data) != acquisition["recorded_bytes"]:
            raise EvidenceError("Retained source length differs from the recorded acquisition")
        verified_acquisitions.add(acquisition["id"])
    for acquisition in bundle["acquisitions"]:
        if acquisition["local_bytes_verified"] and acquisition["id"] not in verified_acquisitions:
            raise EvidenceError("Acquisition claims verified local bytes without a retained verified source")
