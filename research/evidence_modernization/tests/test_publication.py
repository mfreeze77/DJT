"""Adversarial source preservation, editorial trust and correction regressions.

Every positive publication test uses a temporary Git repository containing the
actual retained UTF-8 source. Its approval is synthetic test authority supplied
explicitly by the host API, never a real research or factual approval.
"""

import copy
import csv
import io
import json
import subprocess
import tempfile
import unittest
from collections import Counter
from pathlib import Path

from djt_evidence.common import EvidenceError, bytes_digest, digest, scoped_id
from djt_evidence.compiler import affected_story, claim_fingerprint, compile_story
from djt_evidence.contracts import validate_bundle
from djt_evidence.importer import COLLECTIONS, build_bundle


RESEARCH = "research/veb_a7_2026/"
SOURCE_PATH = "retained/synthetic-source.txt"
EXACT_TEXT = "The synthetic account describes an obligation of USD 10."
SOURCE_TEXT = "Synthetic fixture introduction.\n" + EXACT_TEXT + "\nNo payment is established.\n"


class PublicationTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.git("init", "-q")
        self.git("config", "user.email", "fixture@example.invalid")
        self.git("config", "user.name", "Synthetic publication fixture")
        self.write(SOURCE_PATH, SOURCE_TEXT)
        self.write(RESEARCH + "legacy_event_interpretations.json", {"entries": [], "relationship_review": []})
        self.write_csv(RESEARCH + "sources.csv", [
            ["source_id", "date", "publisher", "title", "url", "locator", "independence_note"],
            ["S1", "2020", "Synthetic fixture", "Synthetic source", "https://example.invalid/source",
             "Paragraph 2", "One synthetic source; independent corroboration is not asserted."],
        ])
        self.write_csv(RESEARCH + "claims.csv", [
            ["claim_id", "claim", "source_ids", "status", "proof_needed"],
            ["C1", EXACT_TEXT, "S1", "Legacy assertion", "Cash settlement is unproved."],
        ])
        self.write_csv(RESEARCH + "acquisition_manifest.csv", [
            ["manifest_id", "source_ids", "url", "acquisition_status", "sha256", "bytes",
             "retrieved_at", "limitation", "review_scope"],
            ["M1", "S1", "https://example.invalid/source", "bytes_obtained",
             bytes_digest(SOURCE_TEXT.encode()), len(SOURCE_TEXT.encode()), "2026-01-01T00:00:00Z",
             "Synthetic local test source", "Exact second paragraph"],
        ])
        self.commit()
        self.bundle = build_bundle(self.root)
        self.claim_id = self.bundle["claims"][0]["id"]
        self.manifest = {
            "schema_version": "djt-story/1.0", "id": "synthetic-editorial-test",
            "title": "Synthetic source-bound publication test",
            "narrative_question": "What does the fixture actually state?",
            "target_duration_seconds": 30, "claim_ids": [self.claim_id], "capture_policy": "optional",
        }

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.root), *args], text=True).strip()

    def write(self, name, value):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(value if isinstance(value, str) else json.dumps(value), encoding="utf-8")

    def write_csv(self, name, rows):
        value = io.StringIO(newline="")
        csv.writer(value).writerows(rows)
        self.write(name, value.getvalue())

    def commit(self):
        self.git("add", ".")
        self.git("commit", "-qm", "Synthetic test evidence")
        return self.git("rev-parse", "HEAD")

    def enrich(self, bundle=None):
        bundle = copy.deepcopy(bundle or self.bundle)
        version = bundle["source_versions"][0]
        version.update(availability="retained", local_path=SOURCE_PATH,
                       verification="verified_locally", media_type="text/plain")
        bundle["acquisitions"][0]["local_bytes_verified"] = True
        excerpt = {
            "id": scoped_id("excerpt", "synthetic-source-paragraph-2"),
            "source_version_id": version["id"], "exact_text": EXACT_TEXT,
            "text_sha256": bytes_digest(EXACT_TEXT.encode()),
            "selector": {"kind": "text_position", "start": SOURCE_TEXT.index(EXACT_TEXT),
                         "end": SOURCE_TEXT.index(EXACT_TEXT) + len(EXACT_TEXT),
                         "unit": "unicode_codepoints", "prefix": "introduction.\n",
                         "suffix": "\nNo payment", "locator_label": "Paragraph 2"},
        }
        bundle["excerpts"].append(excerpt)
        bundle["evidence_links"].append({
            "id": scoped_id("evidence-link", "synthetic-reviewed-support"),
            "claim_id": self.claim_id, "source_id": version["source_id"],
            "excerpt_id": excerpt["id"], "relation": "supports",
            "qualifications": ["The source describes an obligation; payment is not established."],
        })
        return bundle

    def review(self, bundle, *, decision="approve", evidence_ids=None):
        review = {
            "id": scoped_id("review", "synthetic-editorial-decision", str(len(bundle["reviews"]))),
            "claim_id": self.claim_id, "claim_digest": claim_fingerprint(bundle, self.claim_id),
            "decision": decision, "reviewer": "Synthetic authenticated fixture reviewer",
            "reviewed_at": "2026-01-02T00:00:00Z",
            "evidence_link_ids": evidence_ids if evidence_ids is not None else [
                link["id"] for link in bundle["evidence_links"]
                if link["claim_id"] == self.claim_id and link["relation"] != "cites_unverified"],
            "source_family_note": "One synthetic source. No independent corroboration asserted.",
        }
        bundle["reviews"].append(review)
        return digest(review)

    def compile(self, bundle, *, trusted=(), mode="review", manifest=None):
        return compile_story(bundle, manifest or self.manifest, mode=mode, source_root=self.root,
                             trusted_review_digests=trusted)

    def test_unreviewed_repository_assertion_remains_reviewable_and_unpublishable(self):
        output = self.compile(self.bundle)
        self.assertFalse(output["publication"]["allowed"])
        self.assertEqual(output["scenes"][0]["text_status"], "research_review_only")
        self.assertIn("no_verified_support_excerpt", output["scenes"][0]["publication_blockers"])
        with self.assertRaisesRegex(EvidenceError, "Publication blocked"):
            self.compile(self.bundle, mode="publish")

    def test_complete_exact_source_and_explicit_host_trust_can_publish(self):
        bundle = self.enrich()
        authority = self.review(bundle)
        result = self.compile(bundle, trusted={authority}, mode="publish")
        self.assertTrue(result["publication"]["allowed"])
        self.assertEqual(result["review_dependencies"][self.claim_id], [authority])
        self.assertEqual(result["scenes"][0]["original_statement"], EXACT_TEXT)
        self.assertIn("Cash settlement is unproved.", result["scenes"][0]["qualifications"][0])
        self.assertTrue(validate_bundle(bundle, self.root)["original_import_replayed"])

    def test_self_declared_approval_is_never_its_own_authority(self):
        bundle = self.enrich()
        self.review(bundle)
        with self.assertRaisesRegex(EvidenceError, "editorial_review_authority_unverified"):
            self.compile(bundle, mode="publish")
        with self.assertRaisesRegex(EvidenceError, "Trusted review digests"):
            self.compile(bundle, trusted=digest(bundle["reviews"][0]))

    def test_changing_authenticated_reviewer_metadata_invalidates_trust(self):
        bundle = self.enrich()
        authority = self.review(bundle)
        bundle["reviews"][0]["reviewer"] = "A different self-declared reviewer"
        with self.assertRaisesRegex(EvidenceError, "editorial_review_authority_unverified"):
            self.compile(bundle, trusted={authority}, mode="publish")

    def test_rejected_and_conflicting_decisions_block_even_with_host_trust(self):
        bundle = self.enrich()
        rejected = self.review(bundle, decision="reject")
        with self.assertRaisesRegex(EvidenceError, "editorial_review_rejected_or_ambiguous"):
            self.compile(bundle, trusted={rejected}, mode="publish")
        approved = self.review(bundle)
        with self.assertRaisesRegex(EvidenceError, "editorial_review_rejected_or_ambiguous"):
            self.compile(bundle, trusted={approved, rejected}, mode="publish")

    def test_qualifying_evidence_must_be_in_exact_review_id_set(self):
        bundle = self.enrich()
        qualifier = copy.deepcopy(bundle["evidence_links"][-1])
        qualifier.update(id=scoped_id("evidence-link", "synthetic-qualifier"), relation="qualifies")
        bundle["evidence_links"].append(qualifier)
        authority = self.review(bundle, evidence_ids=[bundle["evidence_links"][-2]["id"]])
        with self.assertRaisesRegex(EvidenceError, "material_evidence_not_fully_reviewed"):
            self.compile(bundle, trusted={authority}, mode="publish")

    def test_all_original_cited_sources_must_be_evaluated(self):
        sources = list(csv.reader(io.StringIO((self.root / (RESEARCH + "sources.csv")).read_text())))
        sources.append(["S2", "2020", "Synthetic fixture", "A second source pointer",
                        "https://example.invalid/second", "Paragraph 2", "Shared synthetic artifact"])
        self.write_csv(RESEARCH + "sources.csv", sources)
        claims = list(csv.reader(io.StringIO((self.root / (RESEARCH + "claims.csv")).read_text())))
        claims[1][2] = "S1;S2"
        self.write_csv(RESEARCH + "claims.csv", claims)
        acquisitions = list(csv.reader(io.StringIO((self.root / (RESEARCH + "acquisition_manifest.csv")).read_text())))
        acquisitions[1][1] = "S1;S2"
        self.write_csv(RESEARCH + "acquisition_manifest.csv", acquisitions)
        self.commit()
        bundle = self.enrich(build_bundle(self.root))
        authority = self.review(bundle)
        with self.assertRaisesRegex(EvidenceError, "cited_source_not_evaluated"):
            self.compile(bundle, trusted={authority}, mode="publish")

    def test_source_excerpt_requires_original_bytes_and_exact_selector(self):
        bundle = self.enrich()
        bundle["excerpts"][0]["selector"]["start"] += 1
        authority = self.review(bundle)
        with self.assertRaisesRegex(EvidenceError, "excerpt_selector_mismatch"):
            self.compile(bundle, trusted={authority}, mode="publish")
        bundle = self.enrich()
        authority = self.review(bundle)
        with self.assertRaisesRegex(EvidenceError, "source_bytes_not_checked"):
            compile_story(bundle, self.manifest, mode="publish", trusted_review_digests={authority})

    def test_retained_source_declarations_are_checked_even_when_unused(self):
        bundle = self.enrich()
        bundle["evidence_links"] = [link for link in bundle["evidence_links"] if link["relation"] == "cites_unverified"]
        bundle["excerpts"] = []
        bundle["source_versions"][0]["local_path"] = RESEARCH + "claims.csv"
        with self.assertRaisesRegex(EvidenceError, "Retained source bytes do not match"):
            validate_bundle(bundle, self.root)

    def test_original_records_cannot_be_deleted_by_recounting_coverage(self):
        bundle = copy.deepcopy(self.bundle)
        # Removing the whole imported graph and recounting used to pass all
        # local reference/count/hash checks while falsely claiming full coverage.
        for name in COLLECTIONS:
            bundle[name] = []
        for entry in bundle["coverage"]:
            entry["imported_records"] = 0
        with self.assertRaisesRegex(EvidenceError, "complete pinned import"):
            validate_bundle(bundle, self.root)

    def test_untyped_raw_record_deletion_cannot_hide_by_recounting(self):
        self.write_csv(RESEARCH + "other_ledger.csv", [["id", "detail"], ["R1", "Must remain preserved"]])
        self.commit()
        bundle = build_bundle(self.root)
        bundle["raw_records"] = [record for record in bundle["raw_records"]
                                 if record["origin"]["path"] != RESEARCH + "other_ledger.csv"]
        counts = Counter(record["origin"]["path"] for record in bundle["raw_records"])
        for entry in bundle["coverage"]:
            entry["imported_records"] = counts[entry["path"]]
        with self.assertRaisesRegex(EvidenceError, "complete pinned import"):
            validate_bundle(bundle, self.root)

    def test_original_semantics_and_token_digests_cannot_be_rewritten(self):
        for field in ("statement", "source_refs", "qualifications", "raw_sha256"):
            with self.subTest(field=field):
                bundle = copy.deepcopy(self.bundle)
                claim = bundle["claims"][0]
                if field == "statement":
                    claim["statement"] = "A synthetic USD 10 payment occurred."
                    bundle["observations"][0]["text"] = claim["statement"]
                elif field == "raw_sha256":
                    bundle["raw_records"][0]["origin"]["raw_sha256"] = "a" * 64
                else:
                    claim[field] = []
                with self.assertRaisesRegex(EvidenceError, "Original .* content differs"):
                    validate_bundle(bundle, self.root)

    def test_historical_citation_cannot_be_overwritten_with_support(self):
        bundle = self.enrich()
        original = next(link for link in bundle["evidence_links"] if link["relation"] == "cites_unverified")
        original.update(relation="supports", excerpt_id=bundle["excerpts"][0]["id"])
        with self.assertRaisesRegex(EvidenceError, "Original evidence_links records"):
            validate_bundle(bundle, self.root)

    def test_required_capture_stays_blocked_until_publication_binding_exists(self):
        bundle = self.enrich()
        authority = self.review(bundle)
        manifest = {**self.manifest, "capture_policy": "required"}
        with self.assertRaisesRegex(EvidenceError, "publication_capture_binding_not_implemented"):
            self.compile(bundle, trusted={authority}, mode="publish", manifest=manifest)

    def test_newly_added_material_evidence_invalidates_prior_approval(self):
        bundle = self.enrich()
        authority = self.review(bundle)
        prior = self.compile(bundle, trusted={authority}, mode="publish")
        addition = copy.deepcopy(bundle["evidence_links"][-1])
        addition.update(id=scoped_id("evidence-link", "new-synthetic-counterevidence"), relation="contradicts")
        bundle["evidence_links"].append(addition)
        with self.assertRaisesRegex(EvidenceError, "editorial_review_stale"):
            self.compile(bundle, trusted={authority}, mode="publish")
        self.assertEqual(affected_story(prior, bundle)["affected_claim_ids"], [self.claim_id])

    def test_review_revocation_or_metadata_change_invalidates_existing_output(self):
        bundle = self.enrich()
        authority = self.review(bundle)
        prior = self.compile(bundle, trusted={authority}, mode="publish")
        self.assertFalse(affected_story(prior, bundle)["requires_review"])
        for field, value in [("decision", "reject"), ("source_family_note", "New dependency concern")]:
            with self.subTest(field=field):
                changed = copy.deepcopy(bundle)
                changed["reviews"][0][field] = value
                self.assertEqual(affected_story(prior, changed)["affected_claim_ids"], [self.claim_id])
        bundle["reviews"] = []
        self.assertTrue(affected_story(prior, bundle)["requires_review"])

    def test_removed_claim_reports_staleness_without_crashing(self):
        prior = self.compile(self.bundle)
        self.write_csv(RESEARCH + "claims.csv", [["claim_id", "claim", "source_ids", "status", "proof_needed"]])
        self.commit()
        current = build_bundle(self.root)
        result = affected_story(prior, current)
        self.assertEqual(result["affected_claim_ids"], [self.claim_id])
        self.assertTrue(result["published_snapshot_preserved"])
        with self.assertRaisesRegex(EvidenceError, "Unknown selected claim"):
            self.compile(current)

    def test_tampered_story_or_omitted_dependency_cannot_report_clean(self):
        prior = self.compile(self.bundle)
        tampered = copy.deepcopy(prior)
        tampered["dependencies"] = {}
        with self.assertRaisesRegex(EvidenceError, "build fingerprint mismatch"):
            affected_story(tampered, self.bundle)
        # Recounting/rehashing an incomplete dependency graph does not restore
        # its exact binding to the selected manifest and scenes.
        tampered["build_fingerprint"] = digest({key: value for key, value in tampered.items()
                                                if key != "build_fingerprint"})
        with self.assertRaisesRegex(EvidenceError, "exactly cover the selected claims"):
            affected_story(tampered, self.bundle)

    def test_chapter_context_change_addition_and_removal_require_review(self):
        self.write("Tmanch_CH2_claim_ledger.csv", "Claim_ID,Exact_Claim\nC2,Synthetic chapter claim\n")
        self.write("Tmanch_CH2_counterevidence.md", "An unresolved alternative explanation.\n")
        self.commit()
        bundle = build_bundle(self.root)
        chapter_id = next(claim["id"] for claim in bundle["claims"] if "chapter-2" in claim["topics"])
        manifest = {**self.manifest, "claim_ids": [chapter_id]}
        prior = self.compile(bundle, manifest=manifest)
        for change in ("update", "add", "remove"):
            with self.subTest(change=change):
                if change == "update":
                    self.write("Tmanch_CH2_counterevidence.md", "A material corrected alternative explanation.\n")
                elif change == "add":
                    self.write("Tmanch_CH2_open_questions.md", "An added unresolved primary-source issue.\n")
                else:
                    (self.root / "Tmanch_CH2_counterevidence.md").unlink()
                self.commit()
                bundle = build_bundle(self.root)
                self.assertEqual(affected_story(prior, bundle)["affected_claim_ids"], [chapter_id])
                prior = self.compile(bundle, manifest=manifest)
        # Chapter numbers are exact: chapter 20 cannot be mistaken for chapter 2.
        self.write("Tmanch_CH20_open_questions.md", "Unrelated chapter.\n")
        self.commit()
        self.assertFalse(affected_story(prior, build_bundle(self.root))["requires_review"])

    def test_financial_policy_change_invalidates_without_sidecar_change(self):
        self.write("trump-russia-timeline/data/processed/by-year/2010.json", {
            "events": [{"id": "e1", "title": "Synthetic legacy assertion"}]})
        self.write("Tmanch_Russian_Linked_Financial_Flows.csv", "ID,Amount_USD,Analytical_Note\nRF-014,10,Excluded\n")
        self.commit()
        bundle = build_bundle(self.root)
        claim_id = next(claim["id"] for claim in bundle["claims"] if "year-2010" in claim["topics"])
        prior = self.compile(bundle, manifest={**self.manifest, "claim_ids": [claim_id]})
        self.write("Tmanch_Russian_Linked_Financial_Flows.csv", "ID,Amount_USD,Analytical_Note\nRF-014,10,Disputed and excluded\n")
        self.commit()
        current = build_bundle(self.root)
        self.assertEqual(bundle["control_fingerprints"], current["control_fingerprints"])
        self.assertEqual(affected_story(prior, current)["affected_claim_ids"], [claim_id])


if __name__ == "__main__":
    unittest.main()
