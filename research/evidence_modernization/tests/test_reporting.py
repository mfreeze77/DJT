"""Verify complete, reproducible reports using source-pinned Git fixtures."""

from __future__ import annotations

import csv
import gzip
import hashlib
import io
import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path

from djt_evidence.common import EvidenceError
from djt_evidence.contracts import validate_schema
from djt_evidence.inventory import GitSnapshot
from djt_evidence.reporting import write_audit_reports


class ReportingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.workspace = Path(self.temp.name)
        self.root = self.workspace / "repository"
        self.root.mkdir()
        self.git("init", "-q")
        self.git("config", "user.name", "Report Fixture")
        self.git("config", "user.email", "report@example.invalid")

    def git(self, *args: str) -> str:
        env = {
            **os.environ,
            "GIT_AUTHOR_DATE": "2026-10-10T12:00:00+00:00",
            "GIT_COMMITTER_DATE": "2026-10-10T12:00:00+00:00",
        }
        result = subprocess.run(
            ["git", "-C", str(self.root), *args], check=True, env=env,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
        )
        return result.stdout.decode().strip()

    def write(self, path: str, value: str) -> None:
        destination = self.root / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(value, encoding="utf-8")

    def commit(self) -> str:
        self.git("add", "-A")
        self.git("commit", "-qm", "Report fixture")
        return self.git("rev-parse", "HEAD")

    def populate(self) -> str:
        for number in range(1, 10):
            refs = f"PS{number}-001" if number != 2 else "PS2-MISSING"
            self.write(
                f"Tmanch_CH{number}_claim_ledger.csv",
                f"Claim_ID,Exact_Claim,Source_IDs\nCH{number}-001,Preserved assertion {number},{refs}\n"
                + ("CH4-RAGGED,unaligned,extra,cell\n" if number == 4 else ""),
            )
            self.write(f"Tmanch_CH{number}.md", f"# Chapter {number}: original narrative\n")
            self.write(
                f"Tmanch_CH{number}_primary_sources.md",
                f"## PS{number}-001 Named source\nhttps://archive.university.edu/ch{number}.pdf\n",
            )
        self.write(
            "archive/chapter-7/pr-11/Tmanch_CH7_payoff_ledger.csv",
            'id,meaning\nARCHIVE-RAGGED,"two cells",third\n',
        )
        for year, local_id in ((2010, "event-081"), (2011, "event-076")):
            self.write(
                f"trump-russia-timeline/data/processed/by-year/{year}.json",
                json.dumps({
                    "events": [{
                        "id": local_id, "date": f"{year}-05-19", "title": "Legacy asserted payment",
                        "description": "Legacy unsupported payment assertion.",
                        "sources": [],
                        "moneyFlow": {"amount": 15000000, "direction": "to-trump", "isDirectFlow": False},
                    }],
                    "entities": {}, "relationships": [], "transactions": [],
                }),
            )
        self.write(
            "research/veb_a7_2026/sources.csv",
            "source_id,date,publisher,title,url,locator,independence_note\n"
            "S01,2010-01-01,Issuer,Named source,https://archive.university.edu/doc,paragraph 1,not reviewed\n",
        )
        self.write(
            "research/veb_a7_2026/claims.csv",
            "claim_id,claim,source_ids,status\n"
            + "".join(f"C{number},Selected assertion {number},S01,unreviewed\n" for number in range(21, 27))
            + "C70,Not selected by the pilot,S01,unreviewed\n",
        )
        self.write(
            "research/veb_a7_2026/legacy_event_interpretations.json",
            json.dumps({"entries": [{
                "canonical_key": "2010:event-081",
                "path": "trump-russia-timeline/data/processed/by-year/2010.json",
                "local_id": "event-081", "status": "reported_then_withdrawn",
                "display_title": "Disputed reported contribution",
                "display_note": "No verified onward payment established.",
                "use_in_financial_totals": False,
            }], "relationship_review": []}),
        )
        self.write("implementation.py", "# This source file is not a research assertion.\n")
        return self.commit()

    @staticmethod
    def read_json(path: Path) -> dict:
        return json.loads(path.read_text(encoding="utf-8"))

    def test_reports_are_byte_reproducible_across_directories_and_head_changes(self) -> None:
        revision = self.populate()
        first = self.workspace / "reports-one"
        receipt = write_audit_reports(self.root, revision, first)
        self.write("Tmanch_CH1.md", "Changed in a later commit.\n")
        self.write("new-research.md", "A later item.\n")
        self.commit()
        self.write("Tmanch_CH4.md", "Dirty working-tree narrative.\n")
        second = self.workspace / "reports-two"
        rebuilt = write_audit_reports(self.root, revision, second)
        self.assertEqual(receipt, rebuilt)
        for artifact in receipt["artifacts"]:
            first_bytes = (first / artifact["path"]).read_bytes()
            self.assertEqual(first_bytes, (second / artifact["path"]).read_bytes())
            self.assertEqual(hashlib.sha256(first_bytes).hexdigest(), artifact["sha256"])
            self.assertEqual(len(first_bytes), artifact["byte_count"])
        self.assertEqual((first / "receipt.json").read_bytes(), (second / "receipt.json").read_bytes())
        inventory_gzip = (first / "inventory.json.gz").read_bytes()
        self.assertEqual(inventory_gzip[4:8], b"\0\0\0\0")
        self.assertEqual(inventory_gzip[3] & 8, 0)
        inventory = json.loads(gzip.decompress(inventory_gzip))
        self.assertEqual(inventory["revision"], revision)
        self.assertNotIn("new-research.md", {item["path"] for item in inventory["files"]})

    def test_coverage_quarantine_and_review_preserve_all_input_boundaries(self) -> None:
        revision = self.populate()
        output = self.workspace / "reports"
        receipt = write_audit_reports(self.root, revision, output)
        coverage = list(csv.DictReader(io.StringIO((output / "coverage.csv").read_text())))
        self.assertEqual({row["path"] for row in coverage}, set(GitSnapshot(self.root, revision).paths))
        self.assertEqual(len(coverage), receipt["source_file_count"])
        code = next(row for row in coverage if row["path"] == "implementation.py")
        self.assertEqual(code["classification"], "code")
        self.assertEqual(code["imported_raw_records"], "0")

        quarantine = self.read_json(output / "quarantined-rows.json")
        self.assertEqual(quarantine["row_count"], 2)
        self.assertEqual(quarantine["imported_quarantined_count"], 1)
        self.assertEqual(quarantine["inventory_only_count"], 1)
        chapter_row = next(row for row in quarantine["rows"] if row["origin"]["path"] == "Tmanch_CH4_claim_ledger.csv")
        self.assertEqual(chapter_row["payload"]["cells"], ["CH4-RAGGED", "unaligned", "extra", "cell"])
        archive_row = next(row for row in quarantine["rows"] if row["import_status"] == "inventory_only_not_imported")
        self.assertIsNone(archive_row["record_id"])
        self.assertEqual(archive_row["payload"]["cells"], ["ARCHIVE-RAGGED", "two cells", "third"])
        for row in quarantine["rows"]:
            origin = row["origin"]
            source = GitSnapshot(self.root, revision).read_bytes(origin["path"])
            retained = source[origin["byte_start"]:origin["byte_end"]]
            self.assertEqual(hashlib.sha256(retained).hexdigest(), origin["raw_sha256"])

        package = json.loads(gzip.decompress((output / "evidence-package.json.gz").read_bytes()))
        known_claims = {claim["id"] for claim in package["claims"]}
        raw_index = {record["id"]: record for record in package["raw_records"]}
        claim_index = {claim["id"]: claim for claim in package["claims"]}
        self.assertEqual(receipt["chapter_manifest_count"], 9)
        for number in range(1, 10):
            manifest = self.read_json(output / f"chapters/chapter-{number}.story.json")
            validate_schema(manifest, "story-manifest")
            self.assertTrue(set(manifest["claim_ids"]).issubset(known_claims))
            self.assertTrue(all(
                raw_index[claim_index[key]["raw_record_id"]]["origin"]["path"] == f"Tmanch_CH{number}_claim_ledger.csv"
                for key in manifest["claim_ids"]
            ))
        pilot = self.read_json(output / "chapter-4-pilot.story.json")
        self.assertEqual(len(pilot["claim_ids"]), 9)  # one chapter + two annual + six research claims
        self.assertEqual(len(pilot["claim_ids"]), len(set(pilot["claim_ids"])))
        selected_local_ids = {raw_index[claim_index[key]["raw_record_id"]]["local_id"] for key in pilot["claim_ids"]}
        self.assertNotIn("C70", selected_local_ids)
        self.assertNotIn("CH4-RAGGED", selected_local_ids)
        review = self.read_json(output / "chapter-4-pilot.review.json")
        self.assertFalse(review["publication"]["allowed"])
        self.assertEqual(review["mode"], "review")
        self.assertEqual(review["consumer_status"], "proposed_exchange_not_vflow_storyboard")
        corrected = [scene for scene in review["scenes"] if scene["controlling_interpretations"]]
        self.assertEqual(corrected[0]["display_text"], "Disputed reported contribution")
        self.assertIn("controlling_interpretation_blocks_original_claim", corrected[0]["publication_blockers"])
        chapter_report = self.read_json(output / "chapter-coverage.json")
        chapter_two = next(chapter for chapter in chapter_report["chapters"] if chapter["chapter"] == 2)
        self.assertEqual(chapter_two["unresolved_source_reference_occurrences"], 1)
        self.assertEqual(chapter_two["unresolved_source_names"], ["PS2-MISSING"])
        self.assertEqual(receipt["artifact_count"], 20)

    def test_classification_axes_reconcile_named_claims_and_keep_quarantine_separate(self) -> None:
        self.populate()
        self.write(
            "Tmanch_CH3_claim_ledger.csv",
            "Claim_ID,Exact_Claim,Source_IDs,Source_Tier,Evidence_Status,Confidence_0_to_100\n"
            "CH3-A,First assertion,PS3-001,Primary,Corroborated,92\n"
            "CH3-B,Second assertion,PS3-001,Secondary,, \n"
            "CH3-Q,Unaligned assertion,PS3-001,Invented tier,Claimed confirmed,100,extra\n",
        )
        revision = self.commit()
        output = self.workspace / "classification-reports"
        write_audit_reports(self.root, revision, output)
        report = self.read_json(output / "classification-summary.json")
        chapter = next(item for item in report["collections"] if item["chapter"] == 3)
        self.assertEqual(chapter["raw_ledger_rows"], 3)
        self.assertEqual(chapter["typed_claim_rows"], 2)
        self.assertEqual(chapter["quarantined_rows"], 1)
        self.assertEqual(chapter["other_untyped_rows"], 0)
        self.assertEqual(
            report["total_raw_ledger_rows"],
            report["total_typed_claim_rows"] + report["total_quarantined_rows"] + report["total_other_untyped_rows"],
        )
        origins = {origin["claim_id"]: origin for origin in report["claim_origins"]}
        self.assertNotIn("CH3-Q", {origin["local_id"] for origin in report["claim_origins"]})
        axes = {axis["axis"]: axis for axis in chapter["axes"]}
        for axis in chapter["axes"]:
            self.assertEqual(sum(value["count"] for value in axis["values"]), 2)
            counted_ids = [key for value in axis["values"] for key in value["claim_ids"]]
            self.assertEqual(len(counted_ids), len(set(counted_ids)))
            self.assertTrue(all(origins[key]["local_id"] in {"CH3-A", "CH3-B"} for key in counted_ids))
        self.assertEqual(axes["source_tier"]["field_name"], "Source_Tier")
        self.assertEqual(axes["source_class"]["values"][0]["state"], "missing_column")
        self.assertEqual(axes["source_class"]["values"][0]["count"], 2)
        self.assertEqual({value["state"] for value in axes["status"]["values"]}, {"recorded", "blank"})
        self.assertEqual({value["value_as_recorded"] for value in axes["confidence"]["values"]}, {"92", " "})

    def test_no_claims_does_not_fabricate_manifests_or_publish_empty_stories(self) -> None:
        self.write("research.md", "Unstructured original research awaiting an adapter.\n")
        revision = self.commit()
        output = self.workspace / "empty-reports"
        receipt = write_audit_reports(self.root, revision, output)
        self.assertEqual(receipt["typed_claim_count"], 0)
        self.assertEqual(receipt["chapter_manifest_count"], 0)
        self.assertEqual(receipt["pilot_claim_count"], 0)
        self.assertFalse(receipt["pilot_publication_allowed"])
        self.assertFalse((output / "chapter-4-pilot.story.json").exists())
        coverage = self.read_json(output / "chapter-coverage.json")
        self.assertEqual(len(coverage["chapters"]), 9)
        self.assertTrue(all(chapter["manifest_status"] == "no_typed_claims_available" for chapter in coverage["chapters"]))

    def test_reports_cannot_overwrite_any_tracked_input_file(self) -> None:
        self.populate()
        self.write("inventory-summary.json", '{"original":"must survive"}\n')
        revision = self.commit()
        before = (self.root / "inventory-summary.json").read_bytes()
        with self.assertRaisesRegex(EvidenceError, "overwrite a tracked input"):
            write_audit_reports(self.root, revision, self.root)
        self.assertEqual((self.root / "inventory-summary.json").read_bytes(), before)
        self.assertFalse((self.root / "inventory.json.gz").exists())
        self.assertFalse((self.root / "receipt.json").exists())


if __name__ == "__main__":
    unittest.main()
