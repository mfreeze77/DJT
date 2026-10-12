"""Deterministic, non-destructive inventory of one complete Git commit.

The inventory describes retained bytes and migration coverage, not whether an
assertion is true.  It never fetches a URL, follows a symlink, or reads research
from a changing working tree.  JSON record digests cover the original tokens;
CSV record digests cover the original physical lines, including line endings.
"""

from __future__ import annotations

import csv
import hashlib
import io
import json
import posixpath
import re
import subprocess
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path, PurePosixPath
from typing import Any, Iterator
from urllib.parse import unquote, urlsplit


ANNUAL_RE = re.compile(r"^trump-russia-timeline/data/processed/by-year/(\d{4})\.json$")
ANNUAL_KINDS = ("events", "entities", "relationships", "transactions", "intelligenceActivities")
CODE_SUFFIXES = {".py", ".js", ".mjs", ".cjs", ".css", ".html", ".yml", ".yaml", ".toml", ".sh"}
NON_RESEARCH = {"code", "modernization_artifact", "build_artifact", "delivery_artifact", "other"}
URL_RE = re.compile(r"https?://[^\s<>\"`\\]+", re.IGNORECASE)
LINK_KEYS = {"url", "urls", "documentationlink", "mediaurls", "source_url", "original_url", "download_url"}
PATH_KEYS = {"path", "source_path", "current_file", "local_path", "source_file", "evidence_path"}
PLACEHOLDERS = {"", "url", "string", "todo", "tbd", "n/a", "none", "null", "...", "#"}


def _sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _canonical_sha(value: Any) -> str:
    encoded = json.dumps(value, sort_keys=True, ensure_ascii=True, separators=(",", ":"), allow_nan=False)
    return _sha(encoded.encode("utf-8"))


def _pointer(value: str) -> str:
    return value.replace("~", "~0").replace("/", "~1")


class GitSnapshot:
    """A pinned Git tree with literal, NUL-safe paths and exact blob access.

    ``paths`` includes every tracked leaf, including symlinks and gitlinks.
    Gitlinks are retained as metadata but have no repository-local file bytes;
    ``read_bytes`` raises ValueError for those rather than inventing a digest.
    """

    def __init__(self, root: Path, revision: str = "HEAD") -> None:
        self.root = Path(root).resolve()
        self.revision = self._git("rev-parse", "--verify", "--end-of-options", f"{revision}^{{commit}}").decode("ascii").strip()
        self.commit_date = self._git("show", "-s", "--format=%cI", self.revision).decode("ascii").strip()
        listing = self._git("ls-tree", "-r", "-z", "--full-tree", self.revision)
        entries = {}
        for item in listing.split(b"\0"):
            if not item:
                continue
            metadata, raw_path = item.split(b"\t", 1)
            mode, object_type, object_id = metadata.decode("ascii").split(" ")
            path = raw_path.decode("utf-8", errors="surrogateescape")
            entries[path] = {"mode": mode, "object_type": object_type, "object_id": object_id}
        self.paths = sorted(entries, key=lambda path: path.encode("utf-8", errors="surrogateescape"))
        self.entries = {path: entries[path] for path in self.paths}
        self._blobs: dict[str, bytes] = {}

    def _git(self, *args: str) -> bytes:
        result = subprocess.run(["git", "-C", str(self.root), *args], check=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode:
            raise ValueError(f"Git snapshot operation failed: {result.stderr.decode('utf-8', errors='replace').strip()}")
        return result.stdout

    def read_bytes(self, path: str) -> bytes:
        entry = self.entries[path]
        if entry["object_type"] != "blob":
            raise ValueError(f"Tracked entry has no local blob content: {path}")
        object_id = entry["object_id"]
        if object_id not in self._blobs:
            self._blobs[object_id] = self._git("cat-file", "blob", object_id)
        return self._blobs[object_id]


def _classification(path: str) -> tuple[str, str, str]:
    name = PurePosixPath(path).name
    lower = name.lower()
    suffix = PurePosixPath(path).suffix.lower()
    if path == "rinfo.json":
        return "rinfo_filename_metadata", "filename_metadata", "preserve_filename_metadata_only"
    if path.startswith("research/evidence_modernization/"):
        kind = "code" if suffix in CODE_SUFFIXES else "modernization_artifact"
        return kind, "modernization_implementation", "preserve_implementation_not_research"
    if "/dist/data/" in path:
        return "dist_mirror", "timeline_dist", "preserve_generated_mirror"
    if "/dist/" in path:
        return "build_artifact", "timeline_dist", "preserve_implementation_not_research"
    if suffix in CODE_SUFFIXES or lower in {"package.json", "package-lock.json", ".gitignore"}:
        return "code", "implementation", "preserve_implementation_not_research"
    if "/deliveries/" in path and (suffix in {".zip", ".patch", ".log"} or "/validation/" in path or "/publication-checks/" in path or name in {"DELIVERY.json", "PUBLICATION.json", "gorlane-validation.json"}):
        return "delivery_artifact", "research_deliveries", "preserve_delivery_artifact"
    if ANNUAL_RE.fullmatch(path):
        return "annual_json", "annual_timeline", "pending_structured_migration"
    if name == "json_schema.json":
        return "legacy_schema_document", "legacy_schema", "preserve_descriptive_schema_review_required"
    if "/data/raw/markdown/" in path:
        return "raw_archive", "raw_markdown", "preserve_historical_input"
    if path.startswith("archive/"):
        return "raw_archive", "chapter_archive", "preserve_historical_input"
    if re.match(r"Tmanch_CH\d+", name) and "/" not in path:
        kind = "chapter_ledger" if suffix == ".csv" else "chapter_research"
        disposition = "pending_structured_migration" if suffix == ".csv" else "pending_manual_review"
        return kind, "chapters", disposition
    if name.startswith("Tmanch_Fin") and "/" not in path:
        return "financial_tranche", "financial_tranches", "pending_manual_review"
    if any(term in lower for term in ("manifest", "sources", "source_map", "inventory", "corpus_coverage")) and suffix in {".csv", ".json", ".md"}:
        return "source_manifest", "source_acquisition", "pending_structured_migration" if suffix != ".md" else "pending_manual_review"
    if suffix in {".pdf", ".png", ".jpg", ".jpeg", ".webp", ".mp4", ".wav", ".mp3"}:
        return "source_asset", "source_assets", "preserve_asset_review_required"
    if path.startswith("research/veb_a7_2026/"):
        return "research_record", "veb_a7_2026", "pending_structured_migration" if suffix in {".csv", ".json"} else "pending_manual_review"
    if suffix == ".csv":
        return "research_ledger", "other_research", "pending_structured_migration"
    if suffix == ".json" and "/data/processed/" in path:
        return "legacy_json", "legacy_timeline", "pending_structured_migration"
    if suffix in {".md", ".txt"} or name == "a7-veb-fin":
        return "research_document", "other_research", "pending_manual_review"
    return "other", "other", "preserve_unclassified_item"


def _decode(raw: bytes) -> tuple[str, int]:
    offset = 3 if raw.startswith(b"\xef\xbb\xbf") else 0
    return raw[offset:].decode("utf-8"), offset


def _span(raw: bytes, text: str, bom: int, start: int, end: int) -> dict[str, Any]:
    byte_start = bom + len(text[:start].encode("utf-8"))
    byte_end = byte_start + len(text[start:end].encode("utf-8"))
    return {"byte_start": byte_start, "byte_end": byte_end, "raw_sha256": _sha(raw[byte_start:byte_end])}


def _object_members(text: str, start: int) -> Iterator[tuple[str, Any, int, int]]:
    """Yield exact member token bounds after the complete document validated."""
    decoder = json.JSONDecoder()
    index = start + 1
    while True:
        while text[index].isspace():
            index += 1
        if text[index] == "}":
            return
        key, index = decoder.raw_decode(text, index)
        while text[index].isspace():
            index += 1
        index += 1  # colon; syntax was checked by json.loads
        while text[index].isspace():
            index += 1
        value_start = index
        value, index = decoder.raw_decode(text, index)
        yield key, value, value_start, index
        while text[index].isspace():
            index += 1
        if text[index] == "}":
            return
        index += 1


def _array_members(text: str, start: int) -> Iterator[tuple[int, Any, int, int]]:
    decoder = json.JSONDecoder()
    index = start + 1
    row = 0
    while True:
        while text[index].isspace():
            index += 1
        if text[index] == "]":
            return
        value_start = index
        value, index = decoder.raw_decode(text, index)
        yield row, value, value_start, index
        row += 1
        while text[index].isspace():
            index += 1
        if text[index] == "]":
            return
        index += 1


def _reject_duplicate_keys(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON object key {key!r}; original bytes retained, no lossy parse accepted")
        result[key] = value
    return result


def _reject_constant(value: str) -> None:
    raise ValueError(f"Non-finite number {value!r} is not JSON")


def _json_records(raw: bytes) -> tuple[dict[str, Any], list[dict[str, Any]], Any, list[tuple[dict[str, Any], Any]]]:
    records: list[dict[str, Any]] = []
    indexed_values: list[tuple[dict[str, Any], Any]] = []
    try:
        text, bom = _decode(raw)
        data = json.loads(text, object_pairs_hook=_reject_duplicate_keys, parse_constant=_reject_constant)
    except (UnicodeDecodeError, ValueError) as error:
        failure: dict[str, Any] = {"status": "invalid_json", "error": str(error), "unparsed_sha256": _sha(raw)}
        if isinstance(error, json.JSONDecodeError):
            failure.update({"line": error.lineno, "column": error.colno, "character_offset": error.pos})
        return failure, records, None, indexed_values

    def add(pointer: str, kind: str, value: Any, start: int, end: int, key: str | None = None) -> None:
        record: dict[str, Any] = {"pointer": pointer, "kind": kind, **_span(raw, text, bom, start, end), "value_sha256": _canonical_sha(value), "migration_disposition": "pending_structured_migration" if kind != "json_metadata" else "preserve_metadata"}
        if isinstance(value, dict) and "id" in value:
            record["local_id"] = value["id"]
        elif key is not None:
            record["local_id"] = key
        if key is not None:
            record["map_key"] = key
        records.append(record)
        indexed_values.append((record, value))

    start = len(text) - len(text.lstrip())
    if isinstance(data, dict):
        for key, value, begin, end in _object_members(text, start):
            pointer = "/" + _pointer(key)
            if isinstance(value, list):
                for index, item, item_start, item_end in _array_members(text, begin):
                    add(f"{pointer}/{index}", key, item, item_start, item_end)
            elif isinstance(value, dict) and key in ANNUAL_KINDS:
                for map_key, item, item_start, item_end in _object_members(text, begin):
                    add(f"{pointer}/{_pointer(map_key)}", key, item, item_start, item_end, map_key)
            else:
                add(pointer, "json_metadata", value, begin, end)
    elif isinstance(data, list):
        for index, value, begin, end in _array_members(text, start):
            add(f"/{index}", "json_row", value, begin, end)
    else:
        add("", "json_metadata", data, start, len(text.rstrip()))
    return {"status": "parsed", "root_type": type(data).__name__, "record_count": len(records)}, records, data, indexed_values


def _csv_records(raw: bytes) -> tuple[dict[str, Any], list[dict[str, Any]], list[tuple[dict[str, Any], list[str]]]]:
    try:
        text, bom = _decode(raw)
    except UnicodeDecodeError as error:
        return {"status": "invalid_utf8", "error": str(error), "unparsed_sha256": _sha(raw)}, [], []
    lines = io.StringIO(text, newline="").readlines()
    offsets = [bom]
    for line in lines:
        offsets.append(offsets[-1] + len(line.encode("utf-8")))
    reader = csv.reader(io.StringIO(text, newline=""), strict=True)
    header: list[str] | None = None
    records = []
    indexed_values = []
    last_line = 0
    row_number = 0
    report: dict[str, Any] = {"status": "parsed", "header": [], "header_issues": [], "ragged_rows": []}
    try:
        for row in reader:
            row_number += 1
            first_line, last_read = last_line + 1, reader.line_num
            byte_start, byte_end = offsets[last_line], offsets[last_read]
            record: dict[str, Any] = {"pointer": f"csv:row:{row_number}", "row_number": row_number, "line_start": first_line, "line_end": last_read, "byte_start": byte_start, "byte_end": byte_end, "raw_sha256": _sha(raw[byte_start:byte_end]), "field_count": len(row), "kind": "csv_row", "migration_disposition": "pending_structured_migration"}
            last_line = last_read
            if header is None:
                header = row
                report["header"] = row
                report["header_record"] = {**record, "kind": "csv_header", "migration_disposition": "preserve_metadata"}
                counts = Counter(row)
                report["header_issues"] = [{"code": "duplicate_header", "name": name, "count": count} for name, count in sorted(counts.items()) if count > 1]
                if not row or any(not name.strip() for name in row):
                    report["header_issues"].append({"code": "empty_header"})
                continue
            record["value_sha256"] = _canonical_sha({"header": header, "row": row})
            if len(row) != len(header):
                record["migration_disposition"] = "manual_review_ragged_row"
                report["ragged_rows"].append({"pointer": record["pointer"], "expected_fields": len(header), "actual_fields": len(row)})
            for field in ("claim_id", "id", "source_id", "manifest_id", "transaction_id", "canonical_key"):
                indexes = [i for i, name in enumerate(header) if name.lower() == field]
                if len(indexes) == 1 and indexes[0] < len(row):
                    record["local_id"] = row[indexes[0]]
                    break
            records.append(record)
            indexed_values.append((record, row))
    except csv.Error as error:
        report.update({"status": "invalid_csv", "error": str(error), "unparsed_segment": {"line_start": last_line + 1, "byte_start": offsets[last_line], "byte_end": len(raw), "raw_sha256": _sha(raw[offsets[last_line]:])}})
    report["row_count"] = len(records)
    report["physical_line_count"] = len(lines)
    report["ragged_row_count"] = len(report["ragged_rows"])
    if header is None and report["status"] == "parsed":
        report["status"] = "empty_csv"
    return report, records, indexed_values


def _filename_counts(data: Any) -> dict[str, Any]:
    counts: Counter[str] = Counter()
    def walk(value: Any) -> None:
        if isinstance(value, dict):
            counts["directory_objects"] += 1
            for child in value.values():
                walk(child)
        elif isinstance(value, list):
            counts["list_objects"] += 1
            for child in value:
                walk(child)
        elif value == "file":
            counts["filename_references"] += 1
        else:
            counts["other_scalar_values"] += 1
    walk(data)
    return {**dict(sorted(counts.items())), "content_status": "filename_metadata_only", "referenced_document_contents_acquired_by_inventory": 0, "interpretation": "Names are not evidence that referenced document bytes are present, readable, authentic, or reviewed."}


def _annual_audit(snapshot: GitSnapshot, annual: list[tuple[str, int, Any, list[tuple[dict[str, Any], Any]], str]]) -> dict[str, Any]:
    counts: Counter[str] = Counter()
    reused: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    issues = []
    year_rows = []
    for path, year, data, values, parse_status in annual:
        local_counts: Counter[str] = Counter()
        if parse_status == "parsed" and not isinstance(data, dict):
            issues.append({"path": path, "pointer": "", "code": "annual_root_not_object"})
        if isinstance(data, dict):
            for kind in ANNUAL_KINDS:
                if kind in data and not isinstance(data[kind], (list, dict)):
                    issues.append({"path": path, "pointer": "/" + kind, "code": "invalid_record_container", "actual_type": type(data[kind]).__name__})
        for record, value in values:
            kind = record["kind"]
            if kind not in ANNUAL_KINDS:
                continue
            counts[kind] += 1
            local_counts[kind] += 1
            location = {"path": path, "pointer": record["pointer"], "year": year}
            if not isinstance(value, dict):
                issues.append({**location, "code": "record_not_object"})
                continue
            local_id = record.get("local_id")
            if not isinstance(local_id, str) or not local_id:
                issues.append({**location, "code": "missing_or_invalid_local_id"})
            else:
                occurrence = {**location, "value_sha256": record["value_sha256"], "label": value.get("title", value.get("name", ""))}
                if kind == "events":
                    identity = [value.get("title"), value.get("date")]
                elif kind == "entities":
                    identity = [value.get("name"), value.get("type")]
                elif kind == "relationships":
                    identity = [value.get("source"), value.get("target"), value.get("type"), value.get("subtype")]
                else:
                    identity = value
                occurrence["identity_signature_sha256"] = _canonical_sha(identity)
                reused[(kind, local_id)].append(occurrence)
            if "map_key" in record and "id" in value and record["map_key"] != value["id"]:
                issues.append({**location, "code": "map_key_id_mismatch", "map_key": record["map_key"], "local_id": value["id"]})
            if kind != "events":
                continue
            for field in ("date", "startDate", "endDate"):
                if field not in value:
                    if field == "date":
                        issues.append({**location, "code": "missing_event_date", "field": field})
                    continue
                literal = value[field]
                if literal in (None, ""):
                    if field == "date":
                        issues.append({**location, "code": "missing_event_date", "field": field})
                    continue
                if not isinstance(literal, str) or not re.fullmatch(r"\d{4}(?:-\d{2})?(?:-\d{2})?", literal):
                    issues.append({**location, "code": "unrecognized_date_format", "field": field, "value": literal})
                    continue
                try:
                    date.fromisoformat(literal + ("-01-01" if len(literal) == 4 else "-01" if len(literal) == 7 else ""))
                except ValueError:
                    issues.append({**location, "code": "invalid_calendar_date", "field": field, "value": literal})
                    continue
                if len(literal) < 10:
                    issues.append({**location, "code": "partial_date_preserved", "field": field, "value": literal})
                if field == "date" and int(literal[:4]) != year:
                    issues.append({**location, "code": "date_year_differs_from_file_year", "field": field, "value": literal})
            if isinstance(value.get("startDate"), str) and isinstance(value.get("endDate"), str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", value["startDate"]) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", value["endDate"]) and value["startDate"] > value["endDate"]:
                issues.append({**location, "code": "reversed_date_range"})
        year_rows.append({"year": year, "path": path, "status": "file_present" if parse_status == "parsed" else "file_present_invalid_json", "record_counts": dict(sorted(local_counts.items()))})
    local_id_reuse = []
    collisions = []
    for (kind, local_id), occurrences in sorted(reused.items()):
        if len(occurrences) < 2:
            continue
        item = {"kind": kind, "local_id": local_id, "occurrences": occurrences, "identity_resolution": "not_performed"}
        local_id_reuse.append(item)
        if len({o["identity_signature_sha256"] for o in occurrences}) > 1 or len({o["path"] for o in occurrences}) < len(occurrences):
            collisions.append({**item, "status": "scoped_identity_review_required"})
    present = sorted(year_rows, key=lambda item: item["year"])
    present_by_year = {item["year"]: item for item in present}
    last = max(present_by_year) if present_by_year else None
    first = min(present_by_year) if present_by_year else None
    through = max(last, int(snapshot.commit_date[:4])) if last is not None else None
    coverage = [present_by_year.get(year, {"year": year, "path": None, "status": "no_file", "interpretation": "No annual file in this snapshot; does not establish that no events occurred."}) for year in range(first, through + 1)] if first is not None and through is not None else []
    return {"scope": "Canonical annual files only; dist mirrors excluded from these record counts.", "file_count": len(annual), "record_counts": dict(sorted(counts.items())), "first_file_year": first, "last_file_year": last, "coverage_through_year": through, "coverage_basis": "through the later of the last annual file year and pinned commit year", "year_coverage": coverage, "missing_years_between_files": [year for year in range(first, last + 1) if year not in present_by_year] if first is not None and last is not None else [], "years_after_last_file": list(range(last + 1, through + 1)) if last is not None and through is not None else [], "local_id_reuse": local_id_reuse, "local_id_collisions": collisions, "issues": issues}


def _trim_url(target: str) -> str:
    target = target.rstrip(".,;:!?]")
    while target.endswith(")") and target.count(")") > target.count("("):
        target = target[:-1]
    return target


def _link_status(target: str, source_path: str, paths: set[str], *, root_relative: bool = False, expected_url: bool = False) -> dict[str, Any]:
    literal = target.strip()
    lower = literal.lower()
    base: dict[str, Any] = {"target": target, "network_status": "not_checked"}
    if lower in PLACEHOLDERS or re.search(r"\b(?:insert[_ -]?url|placeholder|your-domain)\b", lower):
        return {**base, "status": "empty_reference" if not literal else "placeholder_reference"}
    if lower.startswith(("http:", "https:", "//")):
        try:
            parts = urlsplit("https:" + literal if literal.startswith("//") else literal)
            host = parts.hostname
            _ = parts.port
        except ValueError:
            return {**base, "status": "invalid_url_syntax"}
        if not host or re.search(r"\s", literal) or re.search(r"%(?![0-9a-fA-F]{2})", literal) or any(char in literal for char in "<>\\"):
            return {**base, "status": "invalid_url_syntax"}
        if host == "localhost" or host in {"127.0.0.1", "::1"}:
            return {**base, "status": "local_service_url_unverified"}
        if any(host == name or host.endswith("." + name) for name in ("example.com", "example.org", "example.net", "example.invalid")) or host.endswith((".invalid", ".test")) or re.search(r"(?:^|/)\.\.\.(?:/|$)", parts.path) or re.search(r"fictional(?:_reference)?", parts.path, re.IGNORECASE):
            return {**base, "status": "placeholder_url"}
        return {**base, "status": "url_syntax_valid_network_unverified"}
    try:
        parts = urlsplit(literal)
    except ValueError:
        return {**base, "status": "invalid_reference_syntax"}
    if parts.scheme:
        return {**base, "status": "other_scheme_unverified", "scheme": parts.scheme}
    if literal.startswith("#"):
        return {**base, "status": "fragment_unverified"}
    path_part = unquote(parts.path)
    if expected_url and not root_relative and not path_part.startswith(("./", "../", "/")) and not re.search(r"\.(?:md|csv|json|pdf|txt|html?|png|jpe?g|zip)$", path_part, re.IGNORECASE):
        return {**base, "status": "non_url_locator"}
    if not path_part:
        return {**base, "status": "unresolved_reference"}
    if root_relative or path_part.startswith("/"):
        resolved = posixpath.normpath(path_part.lstrip("/"))
    else:
        resolved = posixpath.normpath(posixpath.join(posixpath.dirname(source_path), path_part))
    if resolved == ".." or resolved.startswith("../"):
        return {**base, "status": "local_reference_outside_repository", "resolved_path": resolved}
    present = resolved in paths or any(path.startswith(resolved.rstrip("/") + "/") for path in paths)
    if not present and not root_relative and path_part in paths:
        return {**base, "status": "local_target_present_at_repository_root", "resolved_path": path_part, "fragment_status": "not_checked"}
    return {**base, "status": "local_target_present" if present else "local_target_missing_from_snapshot", "resolved_path": resolved, "fragment_status": "not_checked"}


def _json_links(data: Any, pointer: str = "", key: str = "") -> Iterator[tuple[str, str, bool, bool]]:
    if isinstance(data, dict):
        for name, value in data.items():
            location = f"{pointer}/{_pointer(name)}"
            if name == "description" and data.get("documentType") == "markdown" and isinstance(value, str) and re.fullmatch(r"[^\n]+\.md", value):
                yield location, value, True, False
            else:
                yield from _json_links(value, location, name)
    elif isinstance(data, list):
        for index, value in enumerate(data):
            yield from _json_links(value, f"{pointer}/{index}", key)
    elif isinstance(data, str):
        lower = key.lower()
        if lower in LINK_KEYS or lower.endswith("_url"):
            yield pointer, data, False, True
        elif lower in PATH_KEYS:
            yield pointer, data, True, False
        else:
            for match in URL_RE.finditer(data):
                yield pointer, _trim_url(match.group()), False, False


def _markdown_links(text: str) -> Iterator[tuple[int, str]]:
    """A limited link inventory, not a renderer; destinations retain context."""
    destination_spans = []
    for match in re.finditer(r"!?\[[^\]\n]*\]\(", text):
        start = index = match.end()
        depth = 1
        angle = index < len(text) and text[index] == "<"
        escaped = False
        while index < len(text):
            char = text[index]
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif angle:
                if char == ">":
                    angle = False
            elif char == "(":
                depth += 1
            elif char == ")":
                depth -= 1
                if depth == 0:
                    break
            index += 1
        if depth:
            continue
        destination_spans.append((start, index))
        content = text[start:index].strip()
        if content.startswith("<") and ">" in content:
            target = content[1:content.index(">")]
        else:
            target = re.split(r'\s+["\']', content, maxsplit=1)[0]
        target = re.sub(r"\\([\\()])", r"\1", target)
        yield match.start(), target
    for match in re.finditer(r"(?m)^\s{0,3}\[[^\]\n]+\]:\s*(?:<([^>\n]+)>|(\S+))", text):
        yield match.start(), match.group(1) or match.group(2)
    for match in URL_RE.finditer(text):
        if any(start <= match.start() < end for start, end in destination_spans):
            continue
        yield match.start(), _trim_url(match.group())


def build_inventory(root: Path, revision: str = "HEAD") -> dict[str, Any]:
    """Return a JSON-serializable audit of every entry at one pinned revision.

    Every file has a disposition and digest (or an explicit gitlink state).
    Logical rows are never deduplicated away.  Invalid documents retain their
    entire blob digest and a manual-review disposition.  All link findings are
    syntactic or against this Git tree; no network availability is implied.
    """
    snapshot = GitSnapshot(root, revision)
    paths = set(snapshot.paths)
    files = []
    file_hashes: dict[str, list[str]] = defaultdict(list)
    value_hashes: dict[tuple[str, str], list[dict[str, str]]] = defaultdict(list)
    annual = []
    links = []
    for path in snapshot.paths:
        kind, collection, disposition = _classification(path)
        entry = snapshot.entries[path]
        item: dict[str, Any] = {"path": path, **entry, "classification": kind, "collection": collection, "migration_disposition": disposition, "records": []}
        files.append(item)
        if entry["object_type"] != "blob":
            item.update({"sha256": None, "byte_count": None, "content_status": "gitlink_metadata_only", "migration_disposition": "preserve_gitlink_target_without_claiming_local_content"})
            continue
        raw = snapshot.read_bytes(path)
        item.update({"sha256": _sha(raw), "byte_count": len(raw), "content_status": "exact_git_blob_retained"})
        file_hashes[item["sha256"]].append(path)
        if entry["mode"] == "120000":
            item["content_status"] = "symlink_target_bytes_retained_not_followed"
            item["migration_disposition"] = "preserve_symlink_metadata"
            continue
        if kind == "dist_mirror":
            origin = path.replace("/dist/", "/", 1)
            item["mirror_of"] = origin if origin in paths else None
            item["mirror_byte_identical"] = origin in paths and snapshot.entries[origin]["object_type"] == "blob" and raw == snapshot.read_bytes(origin)
        suffix = PurePosixPath(path).suffix.lower()
        if kind in NON_RESEARCH:
            continue
        if suffix == ".json":
            report, records, data, indexed_values = _json_records(raw)
            item["json"] = report
            item["records"] = records
            if report["status"] != "parsed":
                item["migration_disposition"] = "manual_review_unparsed_json_preserved"
            if PurePosixPath(path).name == "json_schema.json":
                item["schema_executable"] = bool(isinstance(data, dict) and ("$schema" in data or "$defs" in data or "properties" in data or "type" in data))
            if kind == "rinfo_filename_metadata" and data is not None:
                item["filename_metadata"] = _filename_counts(data)
                for record in records:
                    record["migration_disposition"] = "preserve_filename_metadata_only"
            match = ANNUAL_RE.fullmatch(path)
            if match:
                annual.append((path, int(match.group(1)), data, indexed_values, report["status"]))
            for pointer, target, root_relative, expected_url in _json_links(data):
                links.append({"path": path, "pointer": pointer, **_link_status(target, path, paths, root_relative=root_relative, expected_url=expected_url)})
        elif suffix == ".csv":
            report, records, indexed_values = _csv_records(raw)
            item["csv"] = report
            item["records"] = records
            if report["status"] != "parsed" or report.get("header_issues") or report.get("ragged_row_count"):
                item["migration_disposition"] = "manual_review_csv_structure_preserved"
            header = report.get("header", [])
            for record, row in indexed_values:
                for index, value in enumerate(row):
                    column = header[index] if index < len(header) else f"extra_column_{index + 1}"
                    lower = column.lower()
                    if lower in LINK_KEYS or lower.endswith("_url") or lower in PATH_KEYS:
                        targets = [(value, lower in PATH_KEYS)]
                    else:
                        targets = [(_trim_url(match.group()), False) for match in URL_RE.finditer(value)]
                    for target, root_relative in targets:
                        links.append({"path": path, "pointer": record["pointer"], "column_index": index, "column": column, **_link_status(target, path, paths, root_relative=root_relative, expected_url=lower in LINK_KEYS or lower.endswith("_url"))})
        else:
            try:
                text, _ = _decode(raw)
            except UnicodeDecodeError:
                item["text_status"] = "not_utf8_text"
                continue
            item["text_status"] = "utf8_text"
            seen = set()
            for offset, target in _markdown_links(text):
                line = text.count("\n", 0, offset) + 1
                if (line, target) in seen:
                    continue
                seen.add((line, target))
                links.append({"path": path, "line": line, **_link_status(target, path, paths)})
        for record in item["records"]:
            if record["kind"] != "json_metadata" and "value_sha256" in record:
                value_hashes[(record["kind"], record["value_sha256"])].append({"path": path, "pointer": record["pointer"], "raw_sha256": record["raw_sha256"]})
    duplicate_files = [{"sha256": digest, "paths": locations, "disposition": "retain_every_original_path"} for digest, locations in sorted(file_hashes.items()) if len(locations) > 1]
    duplicate_records = [{"kind": kind, "value_sha256": digest, "occurrences": locations, "disposition": "retain_every_original_record", "interpretation": "Equal parsed values do not establish identity, independence, or evidentiary truth."} for (kind, digest), locations in sorted(value_hashes.items()) if len(locations) > 1]
    annual_report = _annual_audit(snapshot, annual)
    classification_counts = Counter(item["classification"] for item in files)
    collection_files = Counter(item["collection"] for item in files)
    collection_records: Counter[str] = Counter()
    record_counts: Counter[str] = Counter()
    for item in files:
        for record in item["records"]:
            collection_records[item["collection"]] += 1
            record_counts[record["kind"]] += 1
    statuses = Counter(link["status"] for link in links)
    return {
        "schema_version": "djt.inventory.v1",
        "revision": snapshot.revision,
        "snapshot_commit_date": snapshot.commit_date,
        "scope": "Every tracked leaf in the pinned Git commit; original bytes remain in Git. No working-tree or network content is ingested.",
        "accounting": "File digests account for complete original content, including JSON metadata, CSV headers, invalid documents, binary files, and symlink target bytes. Structured rows additionally retain exact token/line spans. rinfo references are filename metadata, not acquired document contents.",
        "files": files,
        "duplicate_files": duplicate_files,
        "duplicate_records": duplicate_records,
        "annual_audit": annual_report,
        "link_audit": {"scope": "Recognized JSON/CSV URL and path fields, embedded HTTP(S) URLs, and Markdown destinations; syntactic inventory only, not exhaustive prose citation extraction. Network and fragment availability are not checked.", "status_counts": dict(sorted(statuses.items())), "occurrences": links},
        "summary": {
            "tracked_entries": len(files),
            "blob_files": sum(item["object_type"] == "blob" for item in files),
            "total_blob_bytes": sum(item["byte_count"] or 0 for item in files),
            "files_by_classification": dict(sorted(classification_counts.items())),
            "files_by_collection": dict(sorted(collection_files.items())),
            "records_by_collection": dict(sorted(collection_records.items())),
            "records_by_kind": dict(sorted(record_counts.items())),
            "structured_records": sum(len(item["records"]) for item in files),
            "identical_file_groups": len(duplicate_files),
            "duplicate_record_groups": len(duplicate_records),
            "invalid_json_files": sum(item.get("json", {}).get("status") == "invalid_json" for item in files),
            "csv_files": sum("csv" in item for item in files),
            "csv_data_rows": sum(item.get("csv", {}).get("row_count", 0) for item in files),
            "ragged_csv_rows": sum(item.get("csv", {}).get("ragged_row_count", 0) for item in files),
            "annual_file_count": annual_report["file_count"],
            "annual_record_counts": annual_report["record_counts"],
            "annual_local_id_collision_groups": len(annual_report["local_id_collisions"]),
            "link_occurrences": len(links),
            "unique_link_targets": len({link["target"] for link in links}),
            "network_checks_performed": 0,
        },
    }
