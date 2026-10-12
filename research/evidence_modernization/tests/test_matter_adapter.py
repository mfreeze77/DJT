"""Boundary tests use the real pinned Matter package when it is installed."""

from copy import deepcopy
import hashlib
import importlib.metadata
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

from djt_evidence import matter_adapter as adapter


class OptionalDependencyTests(unittest.TestCase):
    def test_missing_dependency_is_an_explicit_refusal(self):
        with patch.object(
            importlib.metadata, "distribution",
            side_effect=importlib.metadata.PackageNotFoundError("matter-foundation"),
        ):
            with self.assertRaises(adapter.MatterAdapterError) as caught:
                adapter._matter_boundary()
        self.assertEqual(caught.exception.code, "E_MATTER_DEPENDENCY_MISSING")

    def test_invalid_calendar_date_is_not_accepted_as_a_timestamp(self):
        with self.assertRaises(adapter.MatterAdapterError):
            adapter._known_time("2026-02-30T00:00:00Z")


class ActualMatterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        try:
            cls.canonical, cls.validator, cls.upstream = adapter._matter_boundary()
        except adapter.MatterAdapterError as exc:
            if exc.code == "E_MATTER_DEPENDENCY_MISSING":
                raise unittest.SkipTest("Optional pinned Matter package is not installed; no integration qualification.") from exc
            raise

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = b"Claim one remains unreviewed.\r\nClaim two points to a missing judgment.\r\n"
        (self.root / "ledger.txt").write_bytes(self.source)
        env = dict(os.environ)
        env.update({
            "GIT_AUTHOR_NAME": "Synthetic adapter test",
            "GIT_AUTHOR_EMAIL": "synthetic@example.invalid",
            "GIT_COMMITTER_NAME": "Synthetic adapter test",
            "GIT_COMMITTER_EMAIL": "synthetic@example.invalid",
            "GIT_AUTHOR_DATE": "2026-01-01T00:00:00Z",
            "GIT_COMMITTER_DATE": "2026-01-01T00:00:00Z",
        })
        self.git("init", "--quiet", env=env)
        self.git("add", "ledger.txt", env=env)
        self.git("-c", "commit.gpgsign=false", "commit", "--quiet", "-m", "Synthetic retained source", env=env)
        revision = self.git("rev-parse", "HEAD").strip()
        sha = hashlib.sha256(self.source).hexdigest()
        self.package = {
            "repository": {"name": "mfreeze77/DJT", "revision": revision},
            "raw_records": [
                {"id": "raw:1", "kind": "row", "origin": {"path": "ledger.txt", "locator": "line:1", "sha256": sha, "raw_sha256": None}, "payload": "Claim one"},
                {"id": "raw:2", "kind": "row", "origin": {"path": "ledger.txt", "locator": "line:2", "sha256": sha, "raw_sha256": None}, "payload": "Claim two"},
            ],
            "observations": [
                {"id": "assertion:1", "raw_record_id": "raw:1", "text": "Claim one", "scope": "repository_assertion"},
                {"id": "assertion:2", "raw_record_id": "raw:2", "text": "Claim two", "scope": "repository_assertion"},
            ],
        }
        self.observed_at = "2026-10-12T02:00:00Z"

    def git(self, *args, env=None):
        return subprocess.run(
            ["git", "-C", str(self.root), *args],
            capture_output=True, text=True, check=True, env=env, timeout=10,
        ).stdout

    def build(self, package=None):
        return adapter.build_matter_candidates(package or self.package, self.root, self.observed_at)

    def test_actual_contract_keeps_one_source_and_two_unreviewed_mappings(self):
        original = deepcopy(self.package)
        result = self.build()
        self.assertEqual(self.package, original)
        self.assertEqual(len(result["observation_candidates"]), 1)
        self.assertEqual(len(result["assertion_mappings"]), 2)
        candidate = result["observation_candidates"][0]
        self.assertTrue(self.validator.is_valid(candidate))
        self.assertEqual(candidate["body"]["content"]["digest"], hashlib.sha256(self.source).hexdigest())
        self.assertEqual(candidate["body"]["content"]["byte_length"], len(self.source))
        self.assertNotIn("creation_receipt", candidate)
        self.assertNotIn("acceptance", candidate["body"])
        self.assertEqual(candidate["body"]["source_published_at"]["state"], "unknown")
        self.assertEqual(candidate["body"]["occurred_at"]["state"], "unknown")
        self.assertEqual(candidate["body"]["available_at"]["value"], self.observed_at)
        self.assertFalse(result["persisted"])
        self.assertTrue(all(row["locator_validation"] == "not_performed" for row in result["assertion_mappings"]))
        self.assertEqual(result["upstream"]["revision"], adapter.MATTER_COMMIT)

    def test_changed_working_tree_does_not_replace_pinned_source_bytes(self):
        (self.root / "ledger.txt").write_text("Different working-tree assertions.", encoding="utf-8")
        self.assertEqual(self.build()["observation_candidates"][0]["body"]["content"]["digest"], hashlib.sha256(self.source).hexdigest())

    def test_deterministic_candidates_ignore_assertion_iteration_order(self):
        first = self.build()
        self.package["observations"].reverse()
        self.assertEqual(first, self.build())

    def test_forged_source_hash_is_refused(self):
        self.package["raw_records"][0]["origin"]["sha256"] = "0" * 64
        with self.assertRaises(adapter.MatterAdapterError) as caught:
            self.build()
        self.assertEqual(caught.exception.code, "E_MATTER_SOURCE_MISMATCH")

    def test_inconsistent_source_hashes_cannot_share_one_candidate(self):
        self.package["raw_records"][1]["origin"]["sha256"] = "0" * 64
        with self.assertRaises(adapter.MatterAdapterError) as caught:
            self.build()
        self.assertEqual(caught.exception.code, "E_MATTER_SOURCE_MISMATCH")

    def test_non_repository_scope_is_not_promoted_to_source_observation(self):
        self.package["observations"][0]["scope"] = "verified_primary_source"
        with self.assertRaises(adapter.MatterAdapterError) as caught:
            self.build()
        self.assertEqual(caught.exception.code, "E_MATTER_INPUT_INVALID")

    def test_dangling_assertion_binding_is_refused(self):
        self.package["observations"][0]["raw_record_id"] = "missing"
        with self.assertRaises(adapter.MatterAdapterError):
            self.build()

    def test_installed_version_mismatch_is_refused(self):
        distribution = importlib.metadata.distribution("matter-foundation")
        with patch.object(adapter, "MATTER_VERSION", "0.0.0-unsupported"):
            with self.assertRaises(adapter.MatterAdapterError) as caught:
                adapter._matter_boundary()
        self.assertEqual(caught.exception.code, "E_MATTER_DEPENDENCY_MISMATCH")
        self.assertEqual(distribution.version, adapter.MATTER_VERSION)

    def test_modified_contract_resource_is_refused(self):
        with patch.dict(adapter._SCHEMA_HASHES, {"core-record.schema.json": "0" * 64}):
            with self.assertRaises(adapter.MatterAdapterError) as caught:
                adapter._matter_boundary()
        self.assertEqual(caught.exception.code, "E_MATTER_DEPENDENCY_MISMATCH")

    def test_unpinned_dependency_is_refused(self):
        with patch.object(adapter, "_installed_commit", return_value=None):
            with self.assertRaises(adapter.MatterAdapterError) as caught:
                adapter._matter_boundary()
        self.assertEqual(caught.exception.code, "E_MATTER_DEPENDENCY_MISMATCH")


if __name__ == "__main__":
    unittest.main()
