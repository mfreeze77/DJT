"""Behavioral tests for source-preserving inventory against real Git objects."""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path

from djt_evidence.inventory import GitSnapshot, build_inventory


class InventoryTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.git("init", "-q")
        self.git("config", "user.name", "Inventory Fixture")
        self.git("config", "user.email", "inventory@example.invalid")

    def git(self, *args: str) -> str:
        env = {**os.environ, "GIT_AUTHOR_DATE": "2026-10-10T12:00:00+00:00", "GIT_COMMITTER_DATE": "2026-10-10T12:00:00+00:00"}
        return subprocess.run(["git", "-C", str(self.root), *args], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, env=env).stdout.decode().strip()

    def write(self, path: str, content: str | bytes) -> None:
        destination = self.root / path
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content.encode("utf-8") if isinstance(content, str) else content)

    def commit(self) -> str:
        self.git("add", "-A")
        self.git("commit", "-qm", "Fixture snapshot")
        return self.git("rev-parse", "HEAD")

    def annual(self, year: int, data: object) -> str:
        path = f"trump-russia-timeline/data/processed/by-year/{year}.json"
        self.write(path, json.dumps(data, ensure_ascii=False, indent=2))
        return path

    @staticmethod
    def files(report: dict) -> dict:
        return {item["path"]: item for item in report["files"]}

    def test_pinned_bytes_ignore_head_dirty_tree_and_untracked_files(self) -> None:
        self.write("research.md", "original\n")
        initial = self.commit()
        snapshot = GitSnapshot(self.root)
        expected = build_inventory(self.root, initial)
        self.write("research.md", "later commit\n")
        self.write("later.md", "new tracked content")
        self.commit()
        self.write("research.md", "dirty\n")
        self.write("untracked.md", "ignored")
        self.assertEqual(snapshot.revision, initial)
        self.assertEqual(snapshot.read_bytes("research.md"), b"original\n")
        self.assertEqual(snapshot.paths, ["research.md"])
        self.assertEqual(build_inventory(self.root, initial), expected)
        self.assertEqual(set(self.files(expected)), {"research.md"})

    def test_literal_paths_symlinks_and_every_tracked_file_are_retained(self) -> None:
        names = ["folder with spaces/# source:one.md", "tab\tname.txt", "line\nbreak.txt", "unknown.bin", "script.py"]
        for index, name in enumerate(names):
            self.write(name, f"content {index}")
        os.symlink("/outside/private-source", self.root / "link.md")
        revision = self.commit()
        snapshot = GitSnapshot(self.root, revision)
        self.assertEqual(set(snapshot.paths), set(names + ["link.md"]))
        for index, name in enumerate(names):
            self.assertEqual(snapshot.read_bytes(name), f"content {index}".encode())
        files = self.files(build_inventory(self.root))
        for name in names:
            self.assertEqual(files[name]["sha256"], hashlib.sha256(snapshot.read_bytes(name)).hexdigest())
            self.assertTrue(files[name]["migration_disposition"])
        self.assertEqual(files["link.md"]["content_status"], "symlink_target_bytes_retained_not_followed")
        self.assertEqual(files["link.md"]["sha256"], hashlib.sha256(b"/outside/private-source").hexdigest())
        self.assertEqual(files["script.py"]["classification"], "code")
        self.assertEqual(files["script.py"]["records"], [])

    def test_gitlinks_are_explicit_metadata_without_fabricated_bytes(self) -> None:
        self.write("readme.md", "fixture")
        target = self.commit()
        self.git("update-index", "--add", "--cacheinfo", f"160000,{target},nested/module")
        self.git("commit", "-qm", "Gitlink fixture")
        snapshot = GitSnapshot(self.root)
        self.assertIn("nested/module", snapshot.paths)
        with self.assertRaisesRegex(ValueError, "no local blob"):
            snapshot.read_bytes("nested/module")
        item = self.files(build_inventory(self.root))["nested/module"]
        self.assertIsNone(item["sha256"])
        self.assertEqual(item["object_id"], target)
        self.assertEqual(item["content_status"], "gitlink_metadata_only")

    def test_annual_entity_maps_and_all_record_kinds_have_exact_spans(self) -> None:
        path = "trump-russia-timeline/data/processed/by-year/2010.json"
        content = ('\ufeff{\n  "events": [ { "id": "event-1", "title": "Café", "date": "2010-01-01" } ],\n'
                   ' "entities": { "entity~/1": {"id":"entity~/1","name":"Étmor"} },\n'
                   ' "relationships": [{"id":"r1","source":"entity~/1","target":"entity-2"}],\n'
                   ' "transactions": [{"id":"t1","amount":5}], "intelligenceActivities": [{"id":"i1"}],\n'
                   ' "metadata": { "literal": "preserve me" }\n}\n')
        self.write(path, content)
        self.commit()
        report = build_inventory(self.root)
        item = self.files(report)[path]
        records = {record["pointer"]: record for record in item["records"]}
        self.assertIn("/entities/entity~0~11", records)
        self.assertEqual(records["/entities/entity~0~11"]["local_id"], "entity~/1")
        self.assertEqual(records["/metadata"]["migration_disposition"], "preserve_metadata")
        raw = content.encode("utf-8")
        for record in item["records"]:
            span = raw[record["byte_start"]:record["byte_end"]]
            self.assertEqual(record["raw_sha256"], hashlib.sha256(span).hexdigest())
            json.loads(span)
        event = records["/events/0"]
        self.assertEqual(raw[event["byte_start"]:event["byte_end"]], '{ "id": "event-1", "title": "Café", "date": "2010-01-01" }'.encode())
        self.assertEqual(report["annual_audit"]["record_counts"], {"events": 1, "entities": 1, "relationships": 1, "transactions": 1, "intelligenceActivities": 1})

    def test_colliding_ids_are_scoped_and_repeated_names_are_not_merged(self) -> None:
        self.annual(2010, {"events": [{"id": "event-074", "title": "Debt", "date": "2010-01-01"}], "entities": {"entity-1": {"id": "entity-1", "name": "Person A", "type": "person"}, "stable": {"id": "stable", "name": "Same person", "description": "old"}}, "relationships": [{"id": "rel-1", "source": "a", "target": "b"}]})
        self.annual(2011, {"events": [{"id": "event-074", "title": "Another event", "date": "2011-01-01"}], "entities": {"entity-1": {"id": "entity-1", "name": "Person B", "type": "person"}, "stable": {"id": "stable", "name": "Same person", "description": "new"}}, "relationships": [{"id": "rel-1", "source": "a", "target": "c"}]})
        self.commit()
        report = build_inventory(self.root)["annual_audit"]
        collisions = {(item["kind"], item["local_id"]) for item in report["local_id_collisions"]}
        self.assertEqual(collisions, {("events", "event-074"), ("entities", "entity-1"), ("relationships", "rel-1")})
        self.assertIn(("entities", "stable"), {(item["kind"], item["local_id"]) for item in report["local_id_reuse"]})
        self.assertTrue(all(item["identity_resolution"] == "not_performed" for item in report["local_id_reuse"]))
        self.assertEqual(report["record_counts"]["entities"], 4)

    def test_duplicates_are_reported_without_collapsing_records_or_mirrors(self) -> None:
        record = {"id": "e1", "date": "2010-01-01", "title": "Retained twice"}
        source = self.annual(2010, {"events": [record, record], "entities": {}, "relationships": []})
        mirror = source.replace("/data/", "/dist/data/")
        self.write(mirror, (self.root / source).read_bytes())
        self.write("root.md", "identical\n")
        self.write("trump-russia-timeline/data/raw/markdown/root.md", "identical\n")
        self.commit()
        report = build_inventory(self.root)
        files = self.files(report)
        self.assertEqual(report["annual_audit"]["record_counts"]["events"], 2)
        self.assertEqual(len(files[source]["records"]), 2)
        self.assertEqual(len(files[mirror]["records"]), 2)
        self.assertTrue(files[mirror]["mirror_byte_identical"])
        self.assertEqual(files[mirror]["classification"], "dist_mirror")
        self.assertTrue(any(set(group["paths"]) == {source, mirror} for group in report["duplicate_files"]))
        self.assertTrue(any(len(group["occurrences"]) == 4 for group in report["duplicate_records"]))
        self.assertEqual(report["annual_audit"]["local_id_collisions"][0]["local_id"], "e1")

    def test_missing_years_are_no_file_states_and_invalid_present_files_stay_present(self) -> None:
        self.annual(1973, {"events": []})
        self.annual(1975, {"events": []})
        self.write("trump-russia-timeline/data/processed/by-year/1976.json", '{"events": [')
        self.commit()
        report = build_inventory(self.root)["annual_audit"]
        self.assertEqual(report["missing_years_between_files"], [1974])
        years = {item["year"]: item for item in report["year_coverage"]}
        self.assertEqual(years[1974]["status"], "no_file")
        self.assertIn("does not establish", years[1974]["interpretation"])
        self.assertEqual(years[1976]["status"], "file_present_invalid_json")
        self.assertEqual(years[2026]["status"], "no_file")

    def test_invalid_json_and_duplicate_keys_cannot_lose_original_bytes(self) -> None:
        invalid = {
            "trump-russia-timeline/data/processed/json_schema.json": '{"id": "string", // commentary\n}',
            "trump-russia-timeline/data/processed/network_relationships.json": '{"relationships": [',
            "research/veb_a7_2026/duplicate.json": '{"records":[{"id":"one","id":"two"}]}',
            "research/veb_a7_2026/nonfinite.json": '{"value":NaN}',
        }
        for path, content in invalid.items():
            self.write(path, content)
        self.commit()
        report = build_inventory(self.root)
        self.assertEqual(report["summary"]["invalid_json_files"], 4)
        for path, content in invalid.items():
            item = self.files(report)[path]
            self.assertEqual(item["records"], [])
            self.assertEqual(item["json"]["unparsed_sha256"], hashlib.sha256(content.encode()).hexdigest())
            self.assertEqual(item["migration_disposition"], "manual_review_unparsed_json_preserved")
        self.assertFalse(self.files(report)[next(iter(invalid))]["schema_executable"])

    def test_json_null_is_distinguished_from_invalid_json_and_a_missing_file(self) -> None:
        self.annual(2010, None)
        self.commit()
        report = build_inventory(self.root)
        self.assertEqual(report["summary"]["invalid_json_files"], 0)
        self.assertEqual(report["annual_audit"]["year_coverage"][0]["status"], "file_present")
        self.assertEqual(report["annual_audit"]["issues"][0]["code"], "annual_root_not_object")

    def test_csv_multiline_blank_and_ragged_rows_have_complete_byte_accounting(self) -> None:
        path = "Tmanch_CH4_claim_ledger.csv"
        raw = b'id,text\r\n1,"Caf\xc3\xa9\r\nnext line"\r\n2,plain,extra\r\n\r\n3\r\n'
        self.write(path, raw)
        self.commit()
        item = self.files(build_inventory(self.root))[path]
        self.assertEqual(item["csv"]["row_count"], 4)
        self.assertEqual(item["csv"]["ragged_row_count"], 3)
        self.assertEqual(item["records"][0]["line_start"], 2)
        self.assertEqual(item["records"][0]["line_end"], 3)
        spans = [item["csv"]["header_record"], *item["records"]]
        self.assertEqual(b"".join(raw[row["byte_start"]:row["byte_end"]] for row in spans), raw)
        self.assertEqual(item["records"][2]["field_count"], 0)
        for row in spans:
            self.assertEqual(row["raw_sha256"], hashlib.sha256(raw[row["byte_start"]:row["byte_end"]]).hexdigest())

    def test_malformed_csv_retains_parsed_rows_and_exact_unparsed_tail(self) -> None:
        path = "research/veb_a7_2026/claims.csv"
        raw = b'id,text\n1,okay\n2,"not closed\nremaining bytes\n'
        self.write(path, raw)
        self.commit()
        item = self.files(build_inventory(self.root))[path]
        self.assertEqual(item["csv"]["status"], "invalid_csv")
        self.assertEqual(item["csv"]["row_count"], 1)
        tail = item["csv"]["unparsed_segment"]
        self.assertEqual(tail["line_start"], 3)
        self.assertEqual(raw[tail["byte_start"]:], b'2,"not closed\nremaining bytes\n')
        self.assertEqual(tail["raw_sha256"], hashlib.sha256(raw[tail["byte_start"]:]).hexdigest())

    def test_duplicate_csv_headers_are_flagged_without_overwriting_values(self) -> None:
        self.write("ledger.csv", "id,id,note\nleft,right,retained\n")
        self.commit()
        item = self.files(build_inventory(self.root))["ledger.csv"]
        self.assertEqual(item["csv"]["header"], ["id", "id", "note"])
        self.assertEqual(item["csv"]["header_issues"], [{"code": "duplicate_header", "name": "id", "count": 2}])
        self.assertNotIn("local_id", item["records"][0])
        self.assertEqual(item["records"][0]["field_count"], 3)

    def test_link_audit_distinguishes_syntax_placeholders_and_snapshot_presence(self) -> None:
        self.write("present file.md", "retained")
        self.write("research/veb_a7_2026/links.json", json.dumps({"sources": [
            {"url": "https://archive.university.edu/source.pdf"},
            {"url": "https://example.com/placeholder"},
            {"url": "https:/broken"},
            {"url": "http://host.test/no"},
            {"url": "https://[invalid"},
            {"url": ""},
            {"url": "" , "documentType": "markdown", "description": "present file.md"},
            {"source_path": "absent.md"},
        ]}))
        self.write("readme.md", '[present](<present file.md>#anchor)\n[missing](missing.md)\n[only fragment](#section)\n[external](https://archive.university.edu/doc_(v1))\n')
        self.commit()
        report = build_inventory(self.root)
        counts = report["link_audit"]["status_counts"]
        self.assertGreaterEqual(counts["invalid_url_syntax"], 2)
        self.assertGreaterEqual(counts["placeholder_url"] + counts.get("placeholder_reference", 0), 2)
        self.assertGreaterEqual(counts["url_syntax_valid_network_unverified"], 1)
        self.assertGreaterEqual(counts["local_target_missing_from_snapshot"], 2)
        self.assertGreaterEqual(counts["local_target_present"], 1)
        self.assertTrue(all(link["network_status"] == "not_checked" for link in report["link_audit"]["occurrences"]))
        self.assertEqual(report["summary"]["network_checks_performed"], 0)
        self.assertTrue(any(link["target"] == "https://archive.university.edu/doc_(v1)" for link in report["link_audit"]["occurrences"]))

    def test_filename_metadata_and_implementation_are_not_acquired_research(self) -> None:
        self.write("rinfo.json", json.dumps({"Part 1": {"file.pdf": "file", "subdir": {"file2.pdf": "file"}}}))
        self.write("research/evidence_modernization/generated/inventory.json", '{"events":[{"id":"must-not-reimport"}]}')
        self.write("research/evidence_modernization/djt_evidence/tool.py", "# implementation")
        self.write("Tmanch_Fin_201-204.md", "original")
        self.write("research/veb_a7_2026/acquisition_manifest.csv", "id,url\n1,https://archive.university.edu/doc\n")
        self.commit()
        files = self.files(build_inventory(self.root))
        metadata = files["rinfo.json"]["filename_metadata"]
        self.assertEqual(metadata["filename_references"], 2)
        self.assertEqual(metadata["referenced_document_contents_acquired_by_inventory"], 0)
        self.assertEqual(files["research/evidence_modernization/generated/inventory.json"]["records"], [])
        self.assertEqual(files["Tmanch_Fin_201-204.md"]["classification"], "financial_tranche")
        self.assertEqual(files["research/veb_a7_2026/acquisition_manifest.csv"]["classification"], "source_manifest")

    def test_markdown_escapes_and_real_ellipsis_fragments_are_not_broken_urls(self) -> None:
        self.write("readme.md", '[article](https://archive.university.edu/doc_(v1)#:~:text=one...two)\\\n[fictional](https://en.wikipedia.org/wiki/Event_(fictional_reference))\n')
        self.write("research/veb_a7_2026/source.csv", "id,url\n1,CV-16-11573-00CL; paragraph74\n")
        self.commit()
        links = build_inventory(self.root)["link_audit"]["occurrences"]
        article = [link for link in links if "archive.university.edu" in link["target"]]
        self.assertEqual(len(article), 1)
        self.assertEqual(article[0]["status"], "url_syntax_valid_network_unverified")
        fictional = [link for link in links if "fictional_reference" in link["target"]]
        self.assertEqual(fictional[0]["status"], "placeholder_url")
        docket = [link for link in links if link["target"].startswith("CV-16")]
        self.assertEqual(docket[0]["status"], "non_url_locator")

    def test_dates_and_map_key_mismatches_remain_review_issues(self) -> None:
        self.annual(2010, {"events": [{"id": "bad", "date": "2010-02-30"}, {"id": "partial", "date": "2011-03"}, {"id": "reverse", "date": "2010-05-02", "startDate": "2010-05-02", "endDate": "2010-04-01"}], "entities": {"key-id": {"id": "different-id", "name": "Retain"}}})
        self.commit()
        report = build_inventory(self.root)
        codes = {issue["code"] for issue in report["annual_audit"]["issues"]}
        self.assertTrue({"invalid_calendar_date", "partial_date_preserved", "date_year_differs_from_file_year", "reversed_date_range", "map_key_id_mismatch"}.issubset(codes))
        self.assertEqual(report["annual_audit"]["record_counts"]["events"], 3)


if __name__ == "__main__":
    unittest.main()
