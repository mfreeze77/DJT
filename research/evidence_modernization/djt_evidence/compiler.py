"""Compile review scenes and fail closed at factual publication boundaries.

This exchange is not yet a V-Flow storyboard source type. It delivers selected,
source-pinned research to a future consumer without inventing paid cash flows.
"""

import re
from pathlib import Path

from .common import EvidenceError, bytes_digest, digest, safe_relative, scoped_id
from .contracts import indexes, validate_bundle, validate_schema
from .inventory import GitSnapshot


def _ordered(records):
    return sorted(records, key=lambda record: record["id"])


def _policy_fingerprints(bundle):
    # These records govern interpretation of the preserved annual financial
    # assertions even when the JSON sidecar itself has not changed.
    paths = {
        "Tmanch_Russian_Linked_Financial_Flows.csv",
        "Tmanch_Russian_Linked_Financial_Methodology.md",
        "Tmanch_Russian_Linked_Financial_Sources.md",
        "Tmanch_Visual_Timeline_Financial_Reconciliation.md",
        "research/veb_a7_2026/legacy_event_review.csv",
        "research/veb_a7_2026/review_assessment.md",
        "research/veb_a7_2026/policy_appendix.md",
    }
    for record in bundle["raw_records"]:
        if record["kind"] == "correction_policy" and isinstance(record["payload"], dict):
            declared = record["payload"].get("source_of_truth")
            if isinstance(declared, str):
                paths.add(declared.split("#", 1)[0])
    return {entry["path"]: entry["sha256"] for entry in bundle["coverage"] if entry["path"] in paths}


def _context_fingerprints(bundle, claim, raw_record):
    """Bind the surrounding research, including new/removed counterevidence files."""
    chapters = {topic[8:] for topic in claim["topics"] if re.fullmatch(r"chapter-\d+", topic)}
    original_chapter = re.match(r"Tmanch_CH(\d+)(?=\D|$)", raw_record["origin"]["path"])
    if original_chapter:
        chapters.add(original_chapter[1])
    research = "veb-a7-research" in claim["topics"]
    result = {}
    for entry in bundle["coverage"]:
        path = entry["path"]
        chapter = re.match(r"Tmanch_CH(\d+)(?=\D|$)", path)
        if (chapter and chapter[1] in chapters or research
                and path.startswith("research/veb_a7_2026/") and "/deliveries/" not in path):
            result[path] = entry["sha256"]
    return result


def claim_dependencies(bundle, claim_id):
    index = indexes(bundle)
    if claim_id not in index["claims"]:
        raise EvidenceError(f"Unknown selected claim: {claim_id}")
    claim = index["claims"][claim_id]
    links = _ordered(r for r in bundle["evidence_links"] if r["claim_id"] == claim_id)
    excerpt_ids = {r["excerpt_id"] for r in links if r["excerpt_id"]}
    excerpts = _ordered(index["excerpts"][key] for key in excerpt_ids)
    version_ids = {r["source_version_id"] for r in excerpts}
    source_ids = {r["source_id"] for r in links} | {
        ref["source_id"] for ref in claim["source_refs"] if ref["source_id"]}
    # All known versions/acquisitions for cited sources matter, including failed attempts.
    versions = _ordered(r for r in bundle["source_versions"] if r["source_id"] in source_ids or r["id"] in version_ids)
    acquisitions = _ordered(r for r in bundle["acquisitions"] if source_ids.intersection(r["source_ids"]))
    sources = _ordered(r for r in bundle["sources"] if r["id"] in source_ids)
    financials = _ordered(index["financials"][key] for key in claim["financial_ids"])
    corrections = _ordered(index["corrections"][key] for key in claim["correction_ids"])
    occurrences = _ordered(index["occurrences"][key] for key in claim["occurrence_ids"])
    raw_ids = {record["raw_record_id"] for collection in (sources, acquisitions, financials, corrections, occurrences)
               for record in collection}
    raw_record = index["raw_records"][claim["raw_record_id"]]
    result = {
        "claim": claim, "raw_record": raw_record,
        "observation": index["observations"][claim["observation_id"]], "evidence_links": links,
        "excerpts": excerpts, "source_versions": versions, "sources": sources,
        "acquisitions": acquisitions, "financials": financials, "corrections": corrections,
        "occurrences": occurrences,
        "related_raw_records": _ordered(index["raw_records"][key] for key in raw_ids),
        "control_fingerprints": bundle["control_fingerprints"],
        "policy_fingerprints": _policy_fingerprints(bundle),
        "context_fingerprints": _context_fingerprints(bundle, claim, raw_record),
        "captures": _ordered(r for r in bundle["captures"] if r["excerpt_id"] in excerpt_ids),
    }
    return result


def claim_fingerprint(bundle, claim_id):
    return digest(claim_dependencies(bundle, claim_id))


def _verify_excerpt(excerpt, version, snapshot):
    if version["availability"] != "retained" or not version["local_path"] or not version["content_sha256"]:
        return "source_bytes_not_retained"
    if snapshot is None:
        return "source_bytes_not_checked"
    try:
        safe_relative(version["local_path"])
        data = snapshot.read_bytes(version["local_path"])
    except (EvidenceError, KeyError, ValueError, FileNotFoundError):
        return "source_bytes_unavailable"
    if bytes_digest(data) != version["content_sha256"]:
        return "source_hash_mismatch"
    if version["media_type"] not in {"text/plain", "text/html", "application/xhtml+xml"}:
        return "source_text_adapter_required"
    try:
        text = data.decode("utf-8")
    except UnicodeError:
        return "source_text_encoding_unsupported"
    selector = excerpt["selector"]
    start, end = selector["start"], selector["end"]
    if start < 0 or end > len(text) or text[start:end] != excerpt["exact_text"]:
        return "excerpt_selector_mismatch"
    if selector["prefix"] and not text[:start].endswith(selector["prefix"]):
        return "excerpt_prefix_mismatch"
    if selector["suffix"] and not text[end:].startswith(selector["suffix"]):
        return "excerpt_suffix_mismatch"
    return None


def _trusted_reviews(values):
    if isinstance(values, (str, bytes)):
        raise EvidenceError("Trusted review digests must be an explicit collection of SHA-256 strings")
    try:
        values = frozenset(values)
    except TypeError as exc:
        raise EvidenceError("Invalid trusted review digest collection") from exc
    if any(not isinstance(value, str) or not re.fullmatch(r"[0-9a-f]{64}", value) for value in values):
        raise EvidenceError("Invalid trusted review digest")
    return values


def _review_dependencies(bundle, claim_id):
    return sorted(digest(record) for record in bundle["reviews"] if record["claim_id"] == claim_id)


def publication_findings(bundle, manifest, source_root=None, *, trusted_review_digests=()):
    """Evaluate a validated package against host-authenticated editorial decisions.

    The host obtains these digests from its authenticated review store. A name,
    timestamp or approval inside the exchange is never its own authority. The
    default empty trust set deliberately leaves publication closed.
    """
    index = indexes(bundle)
    trusted = _trusted_reviews(trusted_review_digests)
    snapshot = GitSnapshot(Path(source_root), bundle["repository"]["revision"]) if source_root else None
    findings = []
    for claim_id in manifest["claim_ids"]:
        if claim_id not in index["claims"]:
            findings.append({"claim_id": claim_id, "blocking_reasons": ["selected_claim_removed"],
                             "claim_digest": None})
            continue
        dependency = claim_dependencies(bundle, claim_id)
        claim = dependency["claim"]
        reasons = []
        if bundle["issues"]:
            # Import defects unrelated to a claim stay visible but do not impersonate claim evidence.
            if any(issue["code"] == "controlling_sidecar_missing" for issue in bundle["issues"]):
                reasons.append("controlling_interpretations_missing")
        covered_paths = {entry["path"] for entry in bundle["coverage"]}
        for record in bundle["raw_records"]:
            if record["kind"] == "correction_policy" and isinstance(record["payload"], dict):
                authority = record["payload"].get("source_of_truth")
                if isinstance(authority, str) and authority.split("#", 1)[0] not in covered_paths:
                    reasons.append("controlling_source_of_truth_missing")
        if claim["controlling_status"] not in (None, "outside_scope"):
            reasons.append("controlling_interpretation_blocks_original_claim")
        if any(ref["resolution"] == "unresolved" for ref in claim["source_refs"]):
            reasons.append("unresolved_citation")
        links = dependency["evidence_links"]
        support = [link for link in links if link["relation"] == "supports"]
        if not support:
            reasons.append("no_verified_support_excerpt")
        evaluated_sources = {link["source_id"] for link in links if link["relation"] != "cites_unverified"}
        if any(ref["source_id"] not in evaluated_sources for ref in claim["source_refs"]
               if ref["resolution"] == "resolved"):
            reasons.append("cited_source_not_evaluated")
        for link in links:
            if link["relation"] == "cites_unverified":
                continue
            excerpt = index["excerpts"][link["excerpt_id"]]
            version = index["source_versions"][excerpt["source_version_id"]]
            error = _verify_excerpt(excerpt, version, snapshot)
            if error:
                reasons.append(error)
        reviews = [r for r in bundle["reviews"] if r["claim_id"] == claim_id]
        current_digest = claim_fingerprint(bundle, claim_id)
        matching = [r for r in reviews if r["claim_digest"] == current_digest]
        if not matching:
            reasons.append("editorial_review_required" if not reviews else "editorial_review_stale")
        elif len(matching) != 1 or matching[0]["decision"] != "approve":
            reasons.append("editorial_review_rejected_or_ambiguous")
        else:
            material = {r["id"] for r in links if r["relation"] != "cites_unverified"}
            if set(matching[0]["evidence_link_ids"]) != material:
                reasons.append("material_evidence_not_fully_reviewed")
            if digest(matching[0]) not in trusted:
                reasons.append("editorial_review_authority_unverified")
        if manifest["capture_policy"] == "required":
            # PDF capture and exact text extraction are separate adapters in this wave.
            reasons.append("publication_capture_binding_not_implemented")
        findings.append({"claim_id": claim_id, "blocking_reasons": sorted(set(reasons)),
                         "claim_digest": current_digest})
    return findings


def compile_story(bundle, manifest, *, mode="review", source_root=None, trusted_review_digests=()):
    if mode not in {"review", "publish"}:
        raise EvidenceError("Mode must be review or publish")
    validate_bundle(bundle, source_root)
    validate_schema(manifest, "story-manifest")
    unknown = set(manifest["claim_ids"]) - set(indexes(bundle)["claims"])
    if unknown:
        raise EvidenceError("Unknown selected claim: " + ", ".join(sorted(unknown)))
    findings = publication_findings(bundle, manifest, source_root,
                                    trusted_review_digests=trusted_review_digests)
    allowed = all(not finding["blocking_reasons"] for finding in findings)
    if mode == "publish" and not allowed:
        codes = sorted({code for finding in findings for code in finding["blocking_reasons"]})
        raise EvidenceError("Publication blocked: " + ", ".join(codes))
    scenes = []
    index = indexes(bundle)
    for order, finding in enumerate(findings):
        claim = index["claims"][finding["claim_id"]]
        dependency = claim_dependencies(bundle, claim["id"])
        corrections = dependency["corrections"]
        display_text = next((c["statement"] for c in corrections if c["statement"]
                             and c["status"] != "outside_scope"), claim["statement"])
        scenes.append({
            "id": scoped_id("scene", manifest["id"], str(order), claim["id"]),
            "claim_id": claim["id"], "claim_digest": finding["claim_digest"],
            "original_statement": claim["statement"], "display_text": display_text,
            "text_status": "approved_source_bound_statement" if allowed else "research_review_only",
            "qualifications": claim["qualifications"], "controlling_interpretations": corrections,
            "evidence_links": dependency["evidence_links"], "source_refs": claim["source_refs"],
            "financial_observations": dependency["financials"],
            "occurrences": dependency["occurrences"],
            "capture": {"status": "not_requested", "fallback": "citation_card",
                        "limitation": "No primary-source image is synthesized or implied by a citation."},
            "publication_blockers": finding["blocking_reasons"],
        })
    output = {
        "schema_version": "djt-story-package/1.0", "consumer_status": "proposed_exchange_not_vflow_storyboard",
        "mode": mode, "story_manifest": manifest,
        "source_repository": bundle["repository"], "evidence_package_sha256": digest(bundle),
        "story_manifest_sha256": digest(manifest),
        "publication": {"allowed": allowed, "findings": findings}, "scenes": scenes,
        "dependencies": {finding["claim_id"]: finding["claim_digest"] for finding in findings},
        "review_dependencies": {claim_id: _review_dependencies(bundle, claim_id)
                                for claim_id in manifest["claim_ids"]},
    }
    output["build_fingerprint"] = digest(output)
    return output


def _validate_story_dependencies(story_package):
    """Refuse incomplete/tampered build inputs before comparing dependencies."""
    if not isinstance(story_package, dict) or story_package.get("schema_version") != "djt-story-package/1.0":
        raise EvidenceError("Unsupported story package")
    recorded = story_package.get("build_fingerprint")
    if digest({key: value for key, value in story_package.items() if key != "build_fingerprint"}) != recorded:
        raise EvidenceError("Story package build fingerprint mismatch")
    try:
        manifest = story_package["story_manifest"]
        validate_schema(manifest, "story-manifest")
        selected = manifest["claim_ids"]
        dependencies = story_package["dependencies"]
        reviews = story_package["review_dependencies"]
        if (not isinstance(dependencies, dict) or not isinstance(reviews, dict)
                or set(dependencies) != set(selected) or set(reviews) != set(selected)):
            raise EvidenceError("Story dependencies must exactly cover the selected claims")
        if story_package["story_manifest_sha256"] != digest(manifest):
            raise EvidenceError("Story manifest digest mismatch")
        if any(not isinstance(value, str) or not re.fullmatch(r"[0-9a-f]{64}", value)
               for value in dependencies.values()):
            raise EvidenceError("Invalid story claim dependency digest")
        for values in reviews.values():
            if not isinstance(values, list) or sorted(_trusted_reviews(values)) != values:
                raise EvidenceError("Invalid story editorial dependency digests")
        for records in (story_package["scenes"], story_package["publication"]["findings"]):
            if ([record["claim_id"] for record in records] != selected
                    or any(record["claim_digest"] != dependencies[record["claim_id"]] for record in records)):
                raise EvidenceError("Story scenes/findings disagree with selected claim dependencies")
    except (KeyError, TypeError) as exc:
        raise EvidenceError("Malformed story package dependency manifest") from exc


def affected_story(story_package, current_bundle):
    """Compare immutable build dependencies; do not authenticate a new publication.

    Hosts must recompile with their current authenticated review digests before
    publication. An external authority revocation is not inferable from these
    two files alone.
    """
    _validate_story_dependencies(story_package)
    validate_bundle(current_bundle)
    changed = []
    known = {claim["id"] for claim in current_bundle["claims"]}
    for claim_id, prior_digest in story_package["dependencies"].items():
        if claim_id not in known or claim_fingerprint(current_bundle, claim_id) != prior_digest:
            changed.append(claim_id)
    # Review records are a separate dependency to avoid a circular claim digest.
    # No source revalidation or trust-store guess can re-authorize this output.
    prior_reviews = story_package["review_dependencies"]
    for claim_id in story_package["dependencies"]:
        if prior_reviews.get(claim_id) != _review_dependencies(current_bundle, claim_id):
            changed.append(claim_id)
    return {"requires_review": bool(changed), "affected_claim_ids": sorted(set(changed)),
            "published_snapshot_preserved": True}
