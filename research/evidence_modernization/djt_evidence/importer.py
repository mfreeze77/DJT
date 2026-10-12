"""Adapt original repository records without endorsing their factual assertions.

The immutable Git snapshot is the input. Raw assertions retain their original
payload and file/record fingerprints. Names, local IDs, confidence scores, and
legacy 'confirmed' flags never establish identity or publication eligibility.
"""

import csv
import io
import re
from collections import Counter
from pathlib import Path

from . import __version__
from .common import EvidenceError, bytes_digest, digest, scoped_id, strict_json
from .inventory import GitSnapshot, build_inventory

RESEARCH = "research/veb_a7_2026/"
ANNUAL = re.compile(r"trump-russia-timeline/data/processed/by-year/(\d{4})\.json$")
CHAPTER = re.compile(r"Tmanch_CH(\d+)_claim_ledger\.csv$")
SOURCE_SECTION = re.compile(r"(?m)^#{1,6}\s+(PS\d*-\d+)\b[^\n]*")
URL = re.compile(r"https?://[^\s<>\"\)]+")
COLLECTIONS = ("raw_records", "entities", "occurrences", "relationships", "observations", "claims", "sources",
               "source_versions", "acquisitions", "evidence_links", "financials",
               "corrections", "excerpts", "captures", "reviews")


def _split(value):
    return [part.strip() for part in value.split(";") if part.strip()]


def _first(row, *keys):
    return next((str(row[key]) for key in keys if row.get(key) not in (None, "")), "")


def _pointer(value):
    return str(value).replace("~", "~0").replace("/", "~1")


class Importer:
    def __init__(self, root, revision, inventory=None):
        self.snapshot = GitSnapshot(Path(root), revision)
        self.inventory = inventory or build_inventory(Path(root), self.snapshot.revision)
        if self.inventory["revision"] != self.snapshot.revision:
            raise EvidenceError("Inventory and source snapshot revisions differ")
        self.file_meta = {item["path"]: item for item in self.inventory["files"]}
        self.bundle = {
            "schema_version": "djt-evidence/1.0", "compiler_version": __version__,
            "repository": {"name": "mfreeze77/DJT", "revision": self.snapshot.revision},
            **{name: [] for name in COLLECTIONS},
            "coverage": [], "issues": [], "control_fingerprints": {},
        }
        self.raw_by_path = {}
        self.source_index = {}
        self.claim_index = {}
        self.entity_index = {}
        self.parsed_paths = set()
        self.quarantined_paths = set()

    def register_reference(self, index, key, canonical_id, kind):
        """A repeated local key cannot select the last encountered record."""
        if key not in index:
            index[key] = canonical_id
        elif index[key] != canonical_id:
            if index[key] is not None:
                self.bundle["issues"].append({
                    "code": f"ambiguous_{kind}_reference", "path": f"{key[0]}#{key[1]}"})
            index[key] = None

    def raw(self, path, locator, kind, payload, local_id=None, identity_key=None,
            raw_bytes=None):
        meta = self.file_meta[path]
        origin_record = next((item for item in meta.get("records", [])
                              if item["pointer"] == locator), None)
        if raw_bytes is not None:
            raw_hash = bytes_digest(raw_bytes)
        elif origin_record is not None:
            raw_hash = origin_record["raw_sha256"]
        else:
            # A decoded payload digest is explicitly distinct from exact token bytes.
            raw_hash = None
        record = {
            "id": scoped_id("record", path, kind, identity_key or local_id or locator),
            "kind": kind, "local_id": str(local_id) if local_id is not None else None,
            "origin": {"path": path, "locator": locator, "sha256": meta["sha256"],
                       "raw_sha256": raw_hash},
            "payload": payload, "payload_sha256": digest(payload),
            "disposition": "imported_unreviewed",
        }
        if any(item["id"] == record["id"] for item in self.bundle["raw_records"]):
            raise EvidenceError(f"Ambiguous raw identity: {path} {locator}")
        self.bundle["raw_records"].append(record)
        self.raw_by_path.setdefault(path, []).append(record)
        return record

    def table(self, path):
        if path not in self.snapshot.paths:
            return []
        data = self.snapshot.read_bytes(path)
        reader = csv.reader(io.StringIO(data.decode("utf-8-sig"), newline=""), strict=True)
        rows = list(reader)
        if not rows or len(set(rows[0])) != len(rows[0]) or not all(rows[0]):
            raise EvidenceError(f"Invalid CSV headers: {path}")
        headers = rows[0]
        counts = Counter(row[0] for row in rows[1:] if row)
        result = []
        for number, cells in enumerate(rows[1:], 2):
            if len(cells) != len(headers):
                # Preserve every cell without guessing which missing delimiter shifted columns.
                raw = self.raw(path, f"csv:row:{number}", "csv_unmapped_row",
                               {"headers": headers, "cells": cells},
                               cells[0] if cells else None, f"quarantined-row:{number}")
                raw["disposition"] = "quarantined_schema_mismatch"
                self.quarantined_paths.add(path)
                self.bundle["issues"].append({"code": "ragged_csv_row", "path": f"{path}:{number}"})
                continue
            row = dict(zip(headers, cells))
            local_id = cells[0]
            key = local_id if local_id and counts[local_id] == 1 else ("row", number)
            result.append(self.raw(path, f"csv:row:{number}", "csv_row", row,
                                   local_id, key))
        self.parsed_paths.add(path)
        return result

    def source(self, raw, scope, local_id, title, url, locator, note):
        key = (scope, local_id)
        if key in self.source_index:
            raise EvidenceError(f"Duplicate source identity: {key}")
        record = {
            "id": scoped_id("source", scope, local_id), "raw_record_id": raw["id"],
            "local_id": local_id, "title": title, "url": url or None,
            "locator": locator, "source_family_id": None,
            "source_family_note": note or "Source-family independence has not been reviewed.",
        }
        self.source_index[key] = record["id"]
        self.bundle["sources"].append(record)
        return record

    def refs(self, ids, scope):
        return [{"raw_reference": local_id, "source_id": self.source_index.get((scope, local_id)),
                 "resolution": "resolved" if (scope, local_id) in self.source_index else "unresolved"}
                for local_id in ids]

    def claim(self, raw, text, refs, status, qualifications, period, topic):
        observation = {"id": scoped_id("observation", raw["id"]),
                       "raw_record_id": raw["id"], "text": text,
                       "scope": "repository_assertion"}
        self.bundle["observations"].append(observation)
        claim = {"id": scoped_id("claim", raw["id"]), "raw_record_id": raw["id"],
                 "observation_id": observation["id"], "statement": text,
                 "legacy_status": status, "review_status": "unreviewed",
                 "source_refs": refs, "qualifications": [q for q in qualifications if q],
                 "period_as_recorded": period, "topics": [topic], "financial_ids": [], "occurrence_ids": [],
                 "correction_ids": [], "controlling_status": None}
        self.bundle["claims"].append(claim)
        self.register_reference(self.claim_index, (raw["origin"]["path"], raw["local_id"]),
                                claim["id"], "claim")
        for index, ref in enumerate(refs):
            if ref["source_id"]:
                self.bundle["evidence_links"].append({
                    "id": scoped_id("evidence-link", claim["id"], str(index)),
                    "claim_id": claim["id"], "source_id": ref["source_id"],
                    "excerpt_id": None, "relation": "cites_unverified", "qualifications": [],
                })
        return claim

    def financial(self, raw, claim_ids, amount, currency, measure, roles, limitations):
        # Exact strings preserve precision, ranges, blanks, and original units.
        record = {"id": scoped_id("financial", raw["id"]), "raw_record_id": raw["id"],
                  "claim_ids": claim_ids, "amount_exact": str(amount) if amount is not None else None,
                  "currency": currency or None, "measure": measure or "unclassified",
                  "roles_as_recorded": roles, "cash_status": "unverified",
                  "include_in_totals": False, "allow_cash_flow_animation": False,
                  "limitations": [x for x in limitations if x]}
        self.bundle["financials"].append(record)
        for claim in self.bundle["claims"]:
            if claim["id"] in claim_ids:
                claim["financial_ids"].append(record["id"])
        return record

    def sources(self):
        path = RESEARCH + "sources.csv"
        for raw in self.table(path):
            row = raw["payload"]
            self.source(raw, RESEARCH, row["source_id"], row["title"], row["url"],
                        row["locator"], row["independence_note"])
        for path in sorted(self.snapshot.paths):
            match = re.fullmatch(r"Tmanch_CH(\d+)_primary_sources\.md", path)
            if not match:
                continue
            scope = f"chapter-{match[1]}"
            data = self.snapshot.read_bytes(path)
            text = data.decode("utf-8")
            sections = list(SOURCE_SECTION.finditer(text))
            seen = set()
            for index, section in enumerate(sections):
                end = sections[index + 1].start() if index + 1 < len(sections) else len(text)
                content = text[section.start():end]
                local_id = section.group(1)
                if local_id in seen:
                    raise EvidenceError(f"Duplicate source heading: {path}:{local_id}")
                seen.add(local_id)
                start_line = text[:section.start()].count("\n") + 1
                end_line = start_line + len(content.splitlines()) - 1
                raw = self.raw(path, f"lines:{start_line}-{end_line}", "source_section",
                               {"text": content}, local_id, raw_bytes=content.encode("utf-8"))
                urls = URL.findall(content)
                self.source(raw, scope, local_id, section.group(0).lstrip("# "),
                            urls[0].rstrip(".,;") if urls else None,
                            f"Source inventory section {local_id}", content)
            # Remaining prose is accounted by the source file; not silently promoted to claims.

    def acquisitions(self):
        for raw in self.table(RESEARCH + "acquisition_manifest.csv"):
            row = raw["payload"]
            refs = self.refs(_split(row["source_ids"]), RESEARCH)
            source_ids = [ref["source_id"] for ref in refs if ref["source_id"]]
            if any(ref["resolution"] == "unresolved" for ref in refs):
                raise EvidenceError(f"Unresolved acquisition source: {raw['local_id']}")
            recorded_hash = row["sha256"] or None
            if recorded_hash and not re.fullmatch(r"[0-9a-f]{64}", recorded_hash):
                raise EvidenceError(f"Invalid recorded acquisition hash: {raw['local_id']}")
            acquisition = {"id": scoped_id("acquisition", raw["id"]),
                           "raw_record_id": raw["id"], "source_ids": source_ids,
                           "url": row["url"], "status_as_recorded": row["acquisition_status"],
                           "recorded_sha256": recorded_hash,
                           "recorded_bytes": int(row["bytes"]) if row["bytes"] else None,
                           "retrieved_at_as_recorded": row["retrieved_at"],
                           "local_bytes_verified": False,
                           "limitations": [row["limitation"], row["review_scope"]]}
            self.bundle["acquisitions"].append(acquisition)
            for source_id in source_ids:
                self.bundle["source_versions"].append({
                    "id": scoped_id("source-version", source_id, acquisition["id"]),
                    "source_id": source_id, "acquisition_id": acquisition["id"],
                    "content_sha256": recorded_hash, "availability": "metadata_only",
                    "local_path": None, "verification": "not_verified_locally", "media_type": None,
                })

    def annual(self):
        for path in sorted(self.snapshot.paths):
            match = ANNUAL.fullmatch(path)
            if not match:
                continue
            original_bytes = self.snapshot.read_bytes(path)
            data = strict_json(original_bytes)
            if not isinstance(data, dict):
                raise EvidenceError(f"Annual document must be an object: {path}")
            # The complete envelope preserves scalar metadata, empty arrays and
            # future fields alongside the separately adapted source records.
            self.raw(path, "", "annual_document", data, identity_key="document",
                     raw_bytes=original_bytes)
            for kind, values in data.items():
                if not isinstance(values, (dict, list)):
                    if kind in {"events", "entities", "relationships", "transactions", "intelligenceActivities"}:
                        self.quarantined_paths.add(path)
                        self.bundle["issues"].append({"code": "invalid_annual_collection",
                                                      "path": f"{path}/{_pointer(kind)}"})
                    continue
                members = list(values.items()) if isinstance(values, dict) else list(enumerate(values))
                counts = Counter(str(value.get("id", key)) if isinstance(value, dict) else str(key)
                                 for key, value in members)
                for key, value in members:
                    local_id = str(value.get("id", key)) if isinstance(value, dict) else str(key)
                    identity = local_id if counts[local_id] == 1 else ("duplicate", local_id, key)
                    raw = self.raw(path, f"/{_pointer(kind)}/{_pointer(key)}", kind,
                                   value, local_id, identity)
                    if not isinstance(value, dict):
                        continue
                    if kind == "entities":
                        entity = {"id": scoped_id("entity", raw["id"]),
                                  "raw_record_id": raw["id"],
                                  "name": str(value.get("name", local_id)),
                                  "identity_status": "unresolved",
                                  "identity_limit": "Scoped legacy occurrence; no name or local-ID merge."}
                        self.bundle["entities"].append(entity)
                        self.register_reference(self.entity_index, (path, local_id), entity["id"], "entity")
                        if isinstance(values, dict):
                            self.register_reference(self.entity_index, (path, str(key)), entity["id"], "entity")
                    if kind == "events":
                        refs = []
                        for index, citation in enumerate(value.get("sources", [])):
                            if not isinstance(citation, dict):
                                refs.append({"raw_reference": str(citation), "source_id": None,
                                             "resolution": "unresolved"})
                                continue
                            source_raw = self.raw(path, raw["origin"]["locator"] + f"/sources/{index}",
                                                  "legacy_citation", citation,
                                                  f"{raw['id']}:source:{index}")
                            source = self.source(source_raw, path, source_raw["local_id"],
                                                 citation.get("description", "Legacy citation"),
                                                 citation.get("url", ""), citation.get("citation", ""),
                                                 "Legacy pointer; citation content and independence unreviewed.")
                            refs.append({"raw_reference": source_raw["local_id"],
                                         "source_id": source["id"], "resolution": "resolved"})
                        text = value.get("description") or value.get("title") or str(value)
                        claim = self.claim(raw, text, refs, str(value.get("status", "legacy assertion")),
                                           ["Legacy timeline assertion; requires evidence review."],
                                           str(value.get("date", "")), f"year-{match[1]}")
                        occurrence = {
                            "id": scoped_id("occurrence", raw["id"]), "raw_record_id": raw["id"],
                            "title": str(value.get("title", "")), "temporal_status": "unreviewed",
                            "date_as_recorded": str(value.get("date", "")),
                            "start_as_recorded": str(value.get("startDate", "")),
                            "end_as_recorded": str(value.get("endDate", "")),
                        }
                        self.bundle["occurrences"].append(occurrence)
                        claim["occurrence_ids"].append(occurrence["id"])
                        if isinstance(value.get("moneyFlow"), dict):
                            flow = value["moneyFlow"]
                            self.financial(raw, [claim["id"]], flow.get("amount"), flow.get("currency"),
                                           "legacy_moneyFlow", {"direction": flow.get("direction"),
                                                                "entities": flow.get("entities", [])},
                                           ["Legacy direction/directness does not prove payer, payee, cash, or currency."])
                    elif kind == "transactions":
                        self.financial(raw, [], value.get("amount"), value.get("currency"),
                                       str(value.get("type", "legacy_transaction")),
                                       {key: value[key] for key in (
                                           "from", "to", "source", "target", "fromEntity", "toEntity",
                                           "parties", "intermediaries") if key in value},
                                       ["Unreviewed legacy transaction; original payload retained."])
            self.parsed_paths.add(path)
        # Resolve references only within the exact source-file namespace after all entities exist.
        for raw in list(self.bundle["raw_records"]):
            if raw["kind"] != "relationships" or not isinstance(raw["payload"], dict):
                continue
            row, path = raw["payload"], raw["origin"]["path"]
            refs = [{"raw_reference": str(citation), "source_id": None, "resolution": "unresolved"}
                    for citation in row.get("sources", [])]
            self.relationship(raw, str(row.get("source", "")), str(row.get("target", "")),
                              str(row.get("type", "")),
                              self.entity_index.get((path, str(row.get("source", "")))),
                              self.entity_index.get((path, str(row.get("target", "")))), refs,
                              str(row.get("startDate", "")), str(row.get("evidenceStrength", "")),
                              [str(row.get("description", "")), str(row.get("notes", "")),
                               "Legacy relation; same-file reference resolution is not identity or relationship verification."])

    def relationship(self, raw, source_label, target_label, relation, source_id, target_id,
                     refs, period, status, limitations):
        self.bundle["relationships"].append({
            "id": scoped_id("relationship", raw["id"]), "raw_record_id": raw["id"],
            "from_entity_id": source_id, "to_entity_id": target_id,
            "from_label_as_recorded": source_label, "to_label_as_recorded": target_label,
            "relation_as_recorded": relation, "period_as_recorded": period,
            "legacy_status": status, "review_status": "unreviewed", "source_refs": refs,
            "limitations": [v for v in limitations if v], "correction_ids": [], "controlling_status": None,
        })

    def ledgers(self):
        for path in sorted(self.snapshot.paths):
            chapter = CHAPTER.fullmatch(path)
            if not chapter and path != RESEARCH + "claims.csv":
                continue
            scope = f"chapter-{chapter[1]}" if chapter else RESEARCH
            for raw in self.table(path):
                row = raw["payload"]
                text = _first(row, "Exact_Claim", "Claim", "claim")
                if not text:
                    raise EvidenceError(f"Missing claim text: {path}:{raw['local_id']}")
                refs = self.refs(_split(_first(row, "Source_IDs", "source_ids")), scope)
                limits = [f"{key}: {row[key]}" for key in (
                    "Counterevidence_or_Limit", "Counterevidence", "Alternative_Explanation",
                    "Counterevidence_or_Alternative", "What_It_Does_Not_Prove", "Key_Limitation",
                    "counterevidence_or_limit", "Additional_Record_Needed", "Open_Record_Need",
                    "Open_Question", "Records_Needed", "Missing_Record", "proof_needed") if row.get(key)]
                if not refs:
                    limits.append("No machine-resolved source IDs in this ledger row; preserve source prose for review.")
                self.claim(raw, text, refs,
                           _first(row, "Evidence_Status", "Evidence_Classification", "Evidence_Class", "status"),
                           limits, _first(row, "Relevant_Dates", "Relevant_Date", "Timeframe", "Period"),
                           f"chapter-{chapter[1]}" if chapter else "veb-a7-research")
        for raw in self.table(RESEARCH + "entity_crosswalk.csv"):
            row = raw["payload"]
            entity = {"id": scoped_id("entity", raw["id"]), "raw_record_id": raw["id"],
                      "name": row["name"], "identity_status": "unresolved",
                      "identity_limit": row["identity_limit"]}
            self.bundle["entities"].append(entity)
            self.register_reference(self.entity_index, (RESEARCH, row["entity_id"]), entity["id"], "entity")
        for raw in self.table(RESEARCH + "transaction_crosswalk.csv"):
            row = raw["payload"]
            claims = [self.claim_index.get((RESEARCH + "claims.csv", local_id))
                      for local_id in _split(row["claim_ids"])]
            if None in claims:
                raise EvidenceError(f"Unknown or ambiguous transaction claim: {raw['local_id']}")
            self.financial(raw, claims, row["amount"] or None, row["currency"], row["category"],
                           {"from_entity_id": self.entity_index.get((RESEARCH, row["from_entity_id"])),
                            "to_entity_id": self.entity_index.get((RESEARCH, row["to_entity_id"])),
                            "from_entity_reference_as_recorded": row["from_entity_id"],
                            "to_entity_reference_as_recorded": row["to_entity_id"]},
                           [row["status"], "Crosswalk parties are as recorded; payer/agent/benefited obligor/payee remain distinct."])
        for raw in self.table(RESEARCH + "relationships.csv"):
            row = raw["payload"]
            self.relationship(raw, row["from_entity"], row["to_entity"], row["relationship"], None, None,
                              self.refs(_split(row["source_ids"]), RESEARCH), row.get("period", ""),
                              row["classification"], [row["limitations"],
                              "Name labels are retained; identity joins require an explicit reviewed crosswalk."])
        for path in ("Tmanch_Russian_Linked_Financial_Flows.csv",
                     RESEARCH + "gorlane_cash_obligation_reconciliation.csv"):
            for raw in self.table(path):
                row = raw["payload"]
                amount = _first(row, "Amount_USD", "amount")
                self.financial(raw, [], amount or None,
                               "USD" if "Amount_USD" in row else row.get("currency", ""),
                               _first(row, "Amount_Type", "measure"), {},
                               [_first(row, "Analytical_Note", "reconciliation_limit"),
                                "Original inclusion flags are preserved in raw payload; no automatic total is authorized."])
        # Remaining active structured ledgers are preserved row-for-row, awaiting typed adapters.
        for path in sorted(self.snapshot.paths):
            if (path.endswith(".csv") and (path.startswith(RESEARCH) and "/deliveries/" not in path
                                           or "/" not in path)
                    and path not in self.parsed_paths):
                self.table(path)

    def corrections(self):
        path = RESEARCH + "legacy_event_interpretations.json"
        if path not in self.snapshot.paths:
            self.bundle["issues"].append({"code": "controlling_sidecar_missing", "path": path})
            return
        data = strict_json(self.snapshot.read_bytes(path))
        self.bundle["control_fingerprints"][path] = self.file_meta[path]["sha256"]
        for index, entry in enumerate(data.get("entries", [])):
            target = self.claim_index.get((entry["path"], entry["local_id"]))
            if not target:
                raise EvidenceError(f"Unresolved or ambiguous controlling correction: {entry['canonical_key']}")
            raw = self.raw(path, f"/entries/{index}", "correction", entry, entry["canonical_key"])
            correction = {"id": scoped_id("correction", raw["id"]), "raw_record_id": raw["id"],
                          "claim_ids": [target], "raw_record_ids": [], "status": entry["status"],
                          "statement": entry.get("display_title"), "reason": entry["display_note"],
                          "include_in_totals": entry.get("use_in_financial_totals")}
            self.bundle["corrections"].append(correction)
            claim = next(c for c in self.bundle["claims"] if c["id"] == target)
            claim["correction_ids"].append(correction["id"])
            claim["controlling_status"] = entry["status"]
            if entry["status"] != "outside_scope":
                claim["qualifications"].append(entry["display_note"])
        for index, entry in enumerate(data.get("relationship_review", [])):
            targets = [record["id"] for record in self.raw_by_path.get(entry["path"], [])
                       if record["kind"] == "relationships" and record["local_id"] == entry["local_id"]]
            if len(targets) != 1:
                raise EvidenceError("Ambiguous corrected relationship")
            raw = self.raw(path, f"/relationship_review/{index}", "relationship_correction", entry,
                           entry["path"] + ":" + entry["local_id"])
            correction = {
                "id": scoped_id("correction", raw["id"]), "raw_record_id": raw["id"],
                "claim_ids": [], "raw_record_ids": targets, "status": entry["status"],
                "statement": None, "reason": entry["display_note"], "include_in_totals": False,
            }
            self.bundle["corrections"].append(correction)
            for relationship in self.bundle["relationships"]:
                if relationship["raw_record_id"] in targets:
                    relationship["correction_ids"].append(correction["id"])
                    relationship["controlling_status"] = entry["status"]
                    relationship["limitations"].append(entry["display_note"])
        # Preserve entity flags and non-funds-flow limitations even before typed review exists.
        self.raw(path, "", "correction_policy", data, "policy")
        self.parsed_paths.add(path)

    def build(self):
        self.sources()
        self.acquisitions()
        self.annual()
        self.ledgers()
        self.corrections()
        for path, meta in sorted(self.file_meta.items()):
            count = len(self.raw_by_path.get(path, []))
            disposition = ("structured_import_with_quarantine" if path in self.quarantined_paths
                           else "structured_import_complete" if path in self.parsed_paths
                           else "source_sections_imported_prose_retained" if count
                           else "inventoried_awaiting_adapter")
            self.bundle["coverage"].append({"path": path, "sha256": meta["sha256"],
                                            "classification": meta["classification"],
                                            "disposition": disposition, "imported_records": count})
        for name in COLLECTIONS:
            self.bundle[name].sort(key=lambda item: item["id"])
        self.bundle["package_id"] = scoped_id("package", self.snapshot.revision,
                                               __version__, digest(self.bundle))
        return self.bundle


def build_bundle(root, revision="HEAD", inventory=None):
    return Importer(root, revision, inventory).build()
