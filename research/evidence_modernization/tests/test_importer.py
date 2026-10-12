"""Regression checks for preservation and conservative source adaptation."""

import copy
import json
import subprocess
import tempfile
import unittest
from pathlib import Path

from djt_evidence.common import EvidenceError, bytes_digest, canonical_bytes, digest
from djt_evidence.contracts import schema, validate_bundle
from djt_evidence.importer import build_bundle


class RepositoryFixture:
    def __init__(self, root):
        self.root = Path(root)
        self.git("init", "-q")
        self.git("config", "user.email", "fixture@example.invalid")
        self.git("config", "user.name", "Synthetic fixture")

    def git(self, *args):
        return subprocess.check_output(["git", "-C", str(self.root), *args], text=True).strip()

    def write(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(content, ensure_ascii=False) if not isinstance(content, str) else content,
                        encoding="utf-8")

    def commit(self):
        self.git("add", ".")
        self.git("commit", "-qm", "Synthetic source fixture")
        return self.git("rev-parse", "HEAD")


class ImporterTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = RepositoryFixture(self.temp.name)

    def test_entities_and_events_do_not_merge_across_years(self):
        for year, name in [(2010, "First organization"), (2011, "Different person")]:
            self.repo.write(f"trump-russia-timeline/data/processed/by-year/{year}.json", {
                "events": [{"id": "event-074", "title": name, "sources": []}],
                "entities": {"entity-013": {"id": "entity-013", "name": name}},
                "relationships": [{"id": "same-link", "source": "entity-013", "target": "entity-001"}],
                "transactions": [{"id": "same-transaction", "amount": "900719925474099312345", "currency": "USD"}],
                "intelligenceActivities": [{"id": "same-activity", "description": name}],
            })
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertEqual(len(bundle["entities"]), 2)
        self.assertEqual(len({e["id"] for e in bundle["entities"]}), 2)
        self.assertEqual(len(bundle["claims"]), 2)
        self.assertTrue(all(e["identity_status"] == "unresolved" for e in bundle["entities"]))
        self.assertEqual(len(bundle["raw_records"]), 12)  # Ten records plus both complete annual envelopes.
        self.assertEqual(bundle["financials"][0]["amount_exact"], "900719925474099312345")
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_ragged_csv_preserves_every_cell_and_excludes_claim_promotion(self):
        self.repo.write("Tmanch_CH4_claim_ledger.csv", "Claim_ID,Exact_Claim,Evidence_Status\n"
                        "GOOD,A supported-looking assertion,Established\n"
                        "BAD,An unquoted comma, shifts the status,Established\n\n")
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertEqual(len(bundle["claims"]), 1)
        quarantine = [r for r in bundle["raw_records"] if r["disposition"] == "quarantined_schema_mismatch"]
        self.assertEqual(len(quarantine), 2)
        self.assertIn(["BAD", "An unquoted comma", " shifts the status", "Established"],
                      [r["payload"]["cells"] for r in quarantine])
        self.assertTrue(all(r["origin"]["raw_sha256"] for r in quarantine))
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_recorded_acquisition_hash_is_not_possession(self):
        folder = "research/veb_a7_2026/"
        self.repo.write(folder + "sources.csv", "source_id,date,publisher,title,url,locator,independence_note\n"
                        "S01,2020,Fixture,Source,https://example.invalid/doc,paragraph1,not reviewed\n")
        self.repo.write(folder + "acquisition_manifest.csv",
                        "manifest_id,source_ids,url,document_date,retrieved_at,acquisition_status,document_kind,dependency_chain,locator,sha256,bytes,review_scope,limitation\n"
                        f"M01,S01,https://example.invalid/doc,2020,2026-01-01,bytes_obtained,text,fixture,paragraph1,{'a'*64},100,selected,not retained\n")
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertFalse(bundle["acquisitions"][0]["local_bytes_verified"])
        version = bundle["source_versions"][0]
        self.assertEqual(version["availability"], "metadata_only")
        self.assertIsNone(version["local_path"])
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_markdown_source_section_retains_exact_bytes_and_no_independence_guess(self):
        self.repo.write("Tmanch_CH2_primary_sources.md", "# Synthetic\n\n## PS2-001 — Source\n\n"
                        "- URL: https://example.invalid/source\n- Limitation: copied report.\n\n"
                        "## PS2-002 — Another source\n\nUnavailable.\n")
        self.repo.write("Tmanch_CH2_claim_ledger.csv", "Claim_ID,Exact_Claim,Source_IDs\n"
                        "C01,Fixture assertion,PS2-001;UNKNOWN\n")
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        refs = bundle["claims"][0]["source_refs"]
        self.assertEqual([r["resolution"] for r in refs], ["resolved", "unresolved"])
        self.assertTrue(all(s["source_family_id"] is None for s in bundle["sources"]))
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_source_revision_ignores_dirty_worktree_and_build_is_repeatable(self):
        path = "trump-russia-timeline/data/processed/by-year/2010.json"
        self.repo.write(path, {"events": [{"id": "e1", "title": "Original"}]})
        rev = self.repo.commit()
        first = build_bundle(self.repo.root, rev)
        self.repo.write(path, {"events": [{"id": "e1", "title": "Uncommitted alteration"}]})
        second = build_bundle(self.repo.root, rev)
        self.assertEqual(canonical_bytes(first), canonical_bytes(second))
        self.assertEqual(second["claims"][0]["statement"], "Original")

    def test_payload_tampering_rejected_even_with_recomputed_digest(self):
        self.repo.write("Tmanch_CH4_claim_ledger.csv", "Claim_ID,Exact_Claim\nC01,Original\n")
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        record = bundle["raw_records"][0]
        record["payload"]["Exact_Claim"] = "Tampered"
        record["payload_sha256"] = digest(record["payload"])
        with self.assertRaises(EvidenceError):
            validate_bundle(bundle, self.repo.root)

    def test_unreviewed_financial_flags_cannot_be_enabled_by_transport_edit(self):
        self.repo.write("trump-russia-timeline/data/processed/by-year/2010.json", {
            "events": [{"id": "e1", "title": "Legacy amount", "moneyFlow": {
                "amount": 15000000, "direction": "to-trump", "isDirectFlow": True}}]})
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        finance = bundle["financials"][0]
        self.assertIsNone(finance["currency"])
        self.assertFalse(finance["allow_cash_flow_animation"])
        finance["include_in_totals"] = True
        with self.assertRaises(EvidenceError):
            validate_bundle(bundle)

    def test_duplicate_json_keys_refused_before_claim_creation(self):
        self.repo.write("trump-russia-timeline/data/processed/by-year/2010.json",
                        '{"events":[],"events":[{"id":"e1","title":"shadow"}]}')
        self.repo.commit()
        with self.assertRaises(EvidenceError):
            build_bundle(self.repo.root)

    def test_actual_json_schemas_are_executable(self):
        from jsonschema import Draft202012Validator
        for name in ("evidence-package", "story-manifest"):
            Draft202012Validator.check_schema(schema(name))

    def test_complete_annual_envelope_preserves_scalar_empty_and_future_fields(self):
        path = "trump-russia-timeline/data/processed/by-year/1988.json"
        document = {"events": [], "entities": {}, "era": "era-002", "mediaUrls": [],
                    "future_metadata": {"note": "retain this", "version": 3},
                    "zero": 0, "unknown": None}
        self.repo.write(path, document)
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        envelopes = [r for r in bundle["raw_records"] if r["kind"] == "annual_document"]
        self.assertEqual(len(envelopes), 1)
        self.assertEqual(envelopes[0]["payload"], document)
        self.assertEqual(envelopes[0]["origin"]["locator"], "")
        self.assertEqual(envelopes[0]["origin"]["raw_sha256"],
                         bytes_digest((self.repo.root / path).read_bytes()))
        self.assertEqual(bundle["claims"], [])
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_invalid_collection_shape_is_preserved_and_explicitly_quarantined(self):
        path = "trump-russia-timeline/data/processed/by-year/1988.json"
        self.repo.write(path, {"events": "This is not an event collection"})
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertEqual(bundle["claims"], [])
        self.assertTrue(any(r["code"] == "invalid_annual_collection" for r in bundle["issues"]))
        coverage = next(row for row in bundle["coverage"] if row["path"] == path)
        self.assertEqual(coverage["disposition"], "structured_import_with_quarantine")
        self.assertEqual(bundle["raw_records"][0]["payload"]["events"],
                         "This is not an event collection")

    def test_same_file_duplicate_entity_ids_do_not_choose_the_last_endpoint(self):
        self.repo.write("trump-russia-timeline/data/processed/by-year/2010.json", {
            "entities": {"first-key": {"id": "same", "name": "First"},
                         "second-key": {"id": "same", "name": "Second"}},
            "relationships": [{"id": "r", "source": "same", "target": "first-key"}],
        })
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        relation = bundle["relationships"][0]
        self.assertIsNone(relation["from_entity_id"])
        first = next(entity for entity in bundle["entities"] if entity["name"] == "First")
        self.assertEqual(relation["to_entity_id"], first["id"])
        self.assertTrue(any(r["code"] == "ambiguous_entity_reference" for r in bundle["issues"]))
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_duplicate_local_events_and_adversarial_literal_ids_all_survive(self):
        self.repo.write("trump-russia-timeline/data/processed/by-year/2010.json", {
            "events": [
                {"id": "same", "title": "First", "sources": [{"url": "https://example.org/first"}]},
                {"id": "same", "title": "Second", "sources": [{"url": "https://example.org/second"}]},
                {"id": "('duplicate', 'same', 1)", "title": "Third", "sources": [{"url": "https://example.org/third"}]},
            ],
        })
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertEqual(len(bundle["claims"]), 3)
        self.assertEqual(len({r["id"] for r in bundle["claims"]}), 3)
        self.assertEqual(len(bundle["sources"]), 3)
        self.assertEqual(len({r["id"] for r in bundle["sources"]}), 3)
        self.assertTrue(any(r["code"] == "ambiguous_claim_reference" for r in bundle["issues"]))
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_correction_cannot_bind_to_one_of_two_ambiguous_local_events(self):
        path = "trump-russia-timeline/data/processed/by-year/2010.json"
        self.repo.write(path, {"events": [{"id": "same", "title": "First"},
                                          {"id": "same", "title": "Second"}]})
        self.repo.write("research/veb_a7_2026/legacy_event_interpretations.json", {
            "entries": [{"path": path, "local_id": "same", "canonical_key": "2010:same",
                         "status": "reported_then_withdrawn", "display_note": "Review both origins"}],
        })
        self.repo.commit()
        with self.assertRaisesRegex(EvidenceError, "ambiguous controlling correction"):
            build_bundle(self.repo.root)

    def test_csv_duplicate_keys_and_literal_row_style_key_are_not_collapsed(self):
        self.repo.write("Tmanch_CH4_claim_ledger.csv", "Claim_ID,Exact_Claim\n"
                        "same,First assertion\nsame,Second assertion\nrow:3,Third assertion\n")
        self.repo.commit()
        bundle = build_bundle(self.repo.root)
        self.assertEqual(len(bundle["claims"]), 3)
        self.assertEqual({r["statement"] for r in bundle["claims"]},
                         {"First assertion", "Second assertion", "Third assertion"})
        self.assertTrue(validate_bundle(bundle, self.repo.root)["valid"])

    def test_legacy_transaction_party_fields_are_preserved_in_financial_projection(self):
        parties = {"sender": {"entity": "seller"}, "receiver": {"entity": "buyer"}}
        self.repo.write("trump-russia-timeline/data/processed/by-year/2010.json", {
            "transactions": [{"id": "t", "fromEntity": "seller", "toEntity": "buyer",
                              "parties": parties, "intermediaries": ["agent"], "amount": 25}],
        })
        self.repo.commit()
        financial = build_bundle(self.repo.root)["financials"][0]
        self.assertEqual(financial["roles_as_recorded"], {
            "fromEntity": "seller", "toEntity": "buyer", "parties": parties,
            "intermediaries": ["agent"],
        })
        self.assertFalse(financial["include_in_totals"])


if __name__ == "__main__":
    unittest.main()
