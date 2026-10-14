"""Optional, read-only bridge to Matter's actual observation-input contract.

This exports candidates for retained repository files. It never creates claims,
acceptance decisions, authority receipts, or a Matter database. A source-bound
repository assertion remains an assertion in a repository, even when its file
contains a URL for a court judgment or an official announcement.
"""

from __future__ import annotations

from copy import deepcopy
from datetime import datetime
import hashlib
import importlib
import importlib.metadata
import importlib.resources
import json
from pathlib import Path
import re
import subprocess
from typing import Any
from urllib.parse import quote


MATTER_REPOSITORY = "https://github.com/mfreeze77/matter"
MATTER_COMMIT = "be2b652d116f4eab77fc9721ba45f545ddc40e26"
MATTER_VERSION = "0.1.0.dev11"
SCOPE_ID = "djt:repository_assertions"
NAMESPACE = "djt.repository"
_DIGEST = re.compile(r"[0-9a-f]{64}\Z")
_TIMESTAMP = re.compile(
    r"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}"
    r"(?:\.[0-9]{3}|\.[0-9]{6}|\.[0-9]{9})?Z\Z"
)
_SCHEMA_HASHES = {
    "core-record.schema.json": "e761e17959a9a79cb1de6f66baafd80138c566e23635af73111bb37744b7abc3",
    "operation-command.schema.json": "a1a033e5b59207edcf26a6ddc9f4ecf6d6f11446226c69fab77b00e8e9a6a18e",
    "operation-result.schema.json": "adc72b8c2b009a62f68e22743269ae161243e09a38c11bd4d3e3a8e1372f2328",
}
_MODULE_HASHES = {
    "matter": "756b186ec743efc376eeb7ee4e83859f9d891ad162fe1ad6d938a4d73bf9fc9a",
    "matter.contracts": "b6b281dc20bdbeb0f59c231f60ce967d28c63f17569d3d8bde1e171e05a0b137",
    "matter.canonical": "2db7e5d31f55b5ff117186471901b4dbe08be1e1d19aaf82499ef6f60a7c758d",
}
_SOURCE_PROFILE = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "additionalProperties": False,
    "required": ["repository", "revision", "path", "source_sha256", "evidence_scope"],
    "properties": {
        "repository": {"const": "mfreeze77/DJT"},
        "revision": {"type": "string", "pattern": "^[0-9a-f]{40}$"},
        "path": {"type": "string", "minLength": 1},
        "source_sha256": {"type": "string", "pattern": "^[0-9a-f]{64}$"},
        "evidence_scope": {"const": "repository_assertion"},
    },
}


class MatterAdapterError(ValueError):
    """A refused bridge operation with a stable code and no source payload."""

    def __init__(self, code: str, detail: str) -> None:
        self.code = code
        super().__init__(detail)


def _sha(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def _json_bytes(value: Any) -> bytes:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def _installed_commit(distribution: Any, contracts_module: Any) -> str | None:
    """Read package provenance; a caller cannot self-declare the accepted pin."""
    direct_url = distribution.read_text("direct_url.json")
    if direct_url:
        try:
            origin = json.loads(direct_url)
        except (TypeError, ValueError):
            return None
        if origin.get("vcs_info", {}).get("vcs") == "git":
            return origin["vcs_info"].get("commit_id")
    module_path = Path(contracts_module.__file__).resolve()
    # An editable checkout has src/matter/contracts.py below its Git root.
    root = module_path.parents[2]
    if module_path.parent.name != "matter" or module_path.parent.parent.name != "src":
        return None
    if not (root / ".git").exists():
        return None
    try:
        result = subprocess.run(
            ["git", "-C", str(root), "rev-parse", "--verify", "HEAD"],
            capture_output=True, text=True, check=True, timeout=10,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    return result.stdout.strip()


def _matter_boundary() -> tuple[Any, Any, dict[str, Any]]:
    """Require the inspected real dependency; never substitute local schemas."""
    try:
        distribution = importlib.metadata.distribution("matter-foundation")
        modules = {name: importlib.import_module(name) for name in _MODULE_HASHES}
        from jsonschema import Draft202012Validator
        from referencing import Registry, Resource
    except (ImportError, importlib.metadata.PackageNotFoundError) as exc:
        raise MatterAdapterError(
            "E_MATTER_DEPENDENCY_MISSING",
            "Install the documented, pinned matter-foundation dependency to export Matter candidates.",
        ) from exc
    if distribution.version != MATTER_VERSION:
        raise MatterAdapterError("E_MATTER_DEPENDENCY_MISMATCH", "Matter package version is not the inspected version.")
    commit = _installed_commit(distribution, modules["matter.contracts"])
    if commit != MATTER_COMMIT:
        raise MatterAdapterError("E_MATTER_DEPENDENCY_MISMATCH", "Matter installation lacks the inspected Git commit pin.")
    try:
        for name, expected in _MODULE_HASHES.items():
            if _sha(Path(modules[name].__file__).read_bytes()) != expected:
                raise MatterAdapterError("E_MATTER_DEPENDENCY_MISMATCH", "Matter boundary code differs from the inspected revision.")
        resources = importlib.resources.files("matter._schemas")
        for name, expected in _SCHEMA_HASHES.items():
            if _sha(resources.joinpath(name).read_bytes()) != expected:
                raise MatterAdapterError("E_MATTER_DEPENDENCY_MISMATCH", "Matter packaged schemas differ from the inspected revision.")
    except (OSError, TypeError, ModuleNotFoundError) as exc:
        raise MatterAdapterError("E_MATTER_DEPENDENCY_MISMATCH", "Matter boundary resources cannot be verified.") from exc
    schema = modules["matter.contracts"].schema_for("record")
    registry = Registry().with_resource(schema["$id"], Resource.from_contents(schema))
    validator = Draft202012Validator(
        {"$schema": schema["$schema"], "$ref": schema["$id"] + "#/$defs/observation_input"},
        registry=registry,
    )
    return modules["matter.canonical"], validator, {
        "repository": MATTER_REPOSITORY, "revision": commit, "package": "matter-foundation",
        "version": distribution.version, "record_schema_sha256": _SCHEMA_HASHES["core-record.schema.json"],
    }


def _known_time(value: str) -> dict[str, str]:
    if not isinstance(value, str) or not _TIMESTAMP.fullmatch(value):
        raise MatterAdapterError("E_MATTER_INPUT_INVALID", "observed_at must be a UTC timestamp with Matter-supported precision.")
    try:
        datetime.strptime(value[:19], "%Y-%m-%dT%H:%M:%S")
    except ValueError as exc:
        raise MatterAdapterError("E_MATTER_INPUT_INVALID", "observed_at is not a valid calendar timestamp.") from exc
    digits = len(value.split(".")[1][:-1]) if "." in value else 0
    return {"state": "known", "value": value, "precision": {0: "second", 3: "millisecond", 6: "microsecond", 9: "nanosecond"}[digits]}


def build_matter_candidates(package: dict[str, Any], source_root: Path, observed_at: str) -> dict[str, Any]:
    """Bind repository assertions to immutable file candidates without writes.

    ``observed_at`` is the host's actual acquisition/import time, never an event
    date taken from a narrative. The source files are read from the package's
    exact Git revision. Mapped row/JSON locators remain unvalidated locators;
    they do not become Matter citation-validation receipts.
    """
    from .inventory import GitSnapshot

    canonical, validator, upstream = _matter_boundary()
    at = _known_time(observed_at)
    try:
        repository = package["repository"]
        if repository["name"] != "mfreeze77/DJT" or not re.fullmatch(r"[0-9a-f]{40}", repository["revision"]):
            raise ValueError
        records = package["raw_records"]
        assertions = package["observations"]
        if not isinstance(records, list) or not isinstance(assertions, list):
            raise ValueError
        raw_by_id = {record["id"]: record for record in records}
        if len(raw_by_id) != len(records):
            raise ValueError
    except (KeyError, TypeError, ValueError) as exc:
        raise MatterAdapterError("E_MATTER_INPUT_INVALID", "The package lacks a unique, pinned DJT source inventory.") from exc
    snapshot = GitSnapshot(Path(source_root), repository["revision"])
    if snapshot.revision != repository["revision"]:
        raise MatterAdapterError("E_MATTER_INPUT_INVALID", "Source repository revision does not match the package.")
    producer = {
        "namespace": "djt.evidence_modernization", "id": "matter-observation-candidates",
        "version": "1", "digest": _sha(Path(__file__).read_bytes()),
    }
    profile = {
        "namespace": "djt.evidence_modernization", "id": "repository-source-profile",
        "version": "1", "digest": _sha(_json_bytes(_SOURCE_PROFILE)),
    }
    source_by_path: dict[str, dict[str, Any]] = {}
    mappings: list[dict[str, Any]] = []
    seen_assertions: set[str] = set()
    for assertion in assertions:
        try:
            assertion_id = assertion["id"]
            if not isinstance(assertion_id, str) or not assertion_id or assertion_id in seen_assertions or assertion["scope"] != "repository_assertion":
                raise ValueError
            seen_assertions.add(assertion_id)
            raw_id = assertion["raw_record_id"]
            origin = raw_by_id[raw_id]["origin"]
            path, expected = origin["path"], origin["sha256"]
            if not isinstance(path, str) or not isinstance(expected, str) or not _DIGEST.fullmatch(expected) or "locator" not in origin:
                raise ValueError
        except (KeyError, TypeError, ValueError) as exc:
            raise MatterAdapterError("E_MATTER_INPUT_INVALID", "An assertion lacks a unique repository scope or source binding.") from exc
        existing = source_by_path.get(path)
        if existing is not None and existing["body"]["content"]["digest"] != expected:
            raise MatterAdapterError("E_MATTER_SOURCE_MISMATCH", "One source path has conflicting byte digests.")
        if existing is None:
            raw = snapshot.read_bytes(path)
            if canonical.source_digest(raw) != expected:
                raise MatterAdapterError("E_MATTER_SOURCE_MISMATCH", "Repository file bytes differ from the package source digest.")
            candidate_id = "djt-source-" + _sha(_json_bytes([repository["name"], repository["revision"], path, expected]))
            uri = f"https://github.com/{repository['name']}/blob/{repository['revision']}/{quote(path, safe='/')}"
            suffix = Path(path).suffix.lower()
            media_type = {".md": "text/markdown", ".json": "application/json", ".csv": "text/csv", ".txt": "text/plain", ".pdf": "application/pdf"}.get(suffix, "application/octet-stream")
            existing = {
                "schema_version": "1.0", "record_type": "observation", "scope_id": SCOPE_ID,
                "namespace": NAMESPACE, "id": candidate_id,
                "provenance": {"origin": "adapter", "producer": producer, "recorded_at": at, "parents": []},
                "body": {
                    "source_identity": {"namespace": NAMESPACE, "event_id": "djt-file-" + _sha(path.encode("utf-8")), "revision_id": repository["revision"]},
                    "content": {"digest": expected, "locator": {"kind": "whole_artifact", "uri": uri}, "media_type": media_type, "byte_length": len(raw), "availability": {"status": "available", "checked_at": at}},
                    "occurred_at": {"state": "unknown", "reason": "not_applicable", "detail": "A repository snapshot does not establish the historical occurrence described by its assertions."},
                    "source_published_at": {"state": "unknown", "reason": "not_reported"},
                    "available_at": at, "ingested_at": at, "extraction": producer,
                },
                "extensions": {"djt:repository_source": {"schema": profile, "value": {"repository": repository["name"], "revision": repository["revision"], "path": path, "source_sha256": expected, "evidence_scope": "repository_assertion"}}},
            }
            # Use Matter's own canonical value domain and installed schema.
            canonical.canonical_bytes(existing)
            if not validator.is_valid(existing):
                raise MatterAdapterError("E_MATTER_CONTRACT_INVALID", "The candidate violates Matter's inspected observation-input contract.")
            source_by_path[path] = existing
        mappings.append({
            "assertion_id": assertion_id, "raw_record_id": raw_id,
            "matter_observation_candidate_id": existing["id"],
            "origin": deepcopy(origin), "evidence_scope": "repository_assertion",
            "source_bytes_verified": True, "locator_validation": "not_performed",
        })
    return {
        "kind": "djt.matter-observation-candidates", "schema_version": "1.0",
        "upstream": upstream, "repository": deepcopy(repository), "observed_at": observed_at,
        "evidence_scope": "repository_assertion", "persisted": False,
        "observation_candidates": [source_by_path[path] for path in sorted(source_by_path)],
        "assertion_mappings": sorted(mappings, key=lambda mapping: mapping["assertion_id"]),
        "limitations": [
            "Candidate source observations establish retained repository bytes, not the truth of the assertions or authenticity of linked documents.",
            "No claim, citation-validation receipt, acceptance decision, identity merge, or Matter storage write was created.",
            "The host must preserve source bytes in its payload store, supply authorized commands and actual commit receipts, and separately validate assertion locators.",
        ],
    }
