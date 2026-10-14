"""Exercise the installed-style CLI against pinned Git and synthetic PDF inputs."""

from __future__ import annotations

import hashlib
from importlib import util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

from djt_evidence.common import write_json
from test_importer import RepositoryFixture


class CliTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "repo").mkdir()
        self.repo = RepositoryFixture(self.root / "repo")
        self.source_path = "trump-russia-timeline/data/processed/by-year/2010.json"
        self.repo.write(self.source_path, {"events": [{"id": "event-1", "title": "Synthetic assertion"}]})
        self.revision = self.repo.commit()
        self.env = dict(os.environ)
        package = str(Path(__file__).resolve().parents[1])
        self.env["PYTHONPATH"] = os.pathsep.join(filter(None, [package, self.env.get("PYTHONPATH")]))

    def command(self, *args: str, repo: Path | None = None, expected: int = 0) -> dict:
        result = subprocess.run(
            [sys.executable, "-B", "-m", "djt_evidence", "--repo", str(repo or self.repo.root), *map(str, args)],
            cwd=self.root,
            env=self.env,
            capture_output=True,
            text=True,
            check=False,
            timeout=30,
        )
        self.assertEqual(result.returncode, expected, result.stdout + result.stderr)
        return json.loads(result.stdout if expected == 0 else result.stderr)

    def build(self) -> tuple[Path, dict]:
        output = self.root / "bundle.json"
        result = self.command("--revision", self.revision, "build", "--output", output)
        self.assertEqual(result["source_revision"], self.revision)
        return output, json.loads(output.read_text())

    def test_build_and_validate_use_bundle_revision_after_head_and_worktree_change(self) -> None:
        output, bundle = self.build()
        self.repo.write(self.source_path, {"events": [{"id": "event-1", "title": "New head assertion"}]})
        self.repo.commit()
        self.repo.write(self.source_path, {"events": [{"id": "event-1", "title": "Uncommitted assertion"}]})
        result = self.command("validate", "--bundle", output)
        self.assertTrue(result["valid"])
        self.assertEqual(bundle["claims"][0]["statement"], "Synthetic assertion")

    def test_output_cannot_overwrite_any_pinned_input_file(self) -> None:
        source = self.repo.root / self.source_path
        before = source.read_bytes()
        result = self.command("inventory", "--output", source, expected=2)
        self.assertIn("overwrite a pinned source", result["error"])
        self.assertEqual(source.read_bytes(), before)

    def test_staging_filename_does_not_overwrite_a_pinned_dot_tmp_source(self) -> None:
        original = self.repo.root / "result.json.tmp"
        self.repo.write("result.json.tmp", "original record must survive unchanged\n")
        self.repo.commit()
        before = original.read_bytes()
        self.command("inventory", "--output", self.repo.root / "result.json")
        self.assertEqual(original.read_bytes(), before)
        self.assertEqual(self.repo.git("diff", "--name-only"), "")

    def test_review_compiles_and_publish_fails_without_creating_output(self) -> None:
        bundle_path, bundle = self.build()
        story = self.root / "story.json"
        write_json(story, {
            "schema_version": "djt-story/1.0", "id": "synthetic-story", "title": "Review fixture",
            "narrative_question": "What does the imported record say?", "target_duration_seconds": 30,
            "claim_ids": [bundle["claims"][0]["id"]], "capture_policy": "optional",
        })
        review_output = self.root / "review.json"
        self.command("compile", "--bundle", bundle_path, "--story", story,
                     "--mode", "review", "--output", review_output)
        review = json.loads(review_output.read_text())
        self.assertFalse(review["publication"]["allowed"])
        self.assertTrue(review["scenes"][0]["publication_blockers"])
        publish_output = self.root / "publish.json"
        result = self.command("compile", "--bundle", bundle_path, "--story", story,
                              "--mode", "publish", "--output", publish_output, expected=2)
        self.assertIn("Publication blocked", result["error"])
        self.assertFalse(publish_output.exists())

    def test_compile_cannot_overwrite_its_untracked_bundle_or_story_input(self) -> None:
        bundle_path, bundle = self.build()
        story = self.root / "story.json"
        write_json(story, {
            "schema_version": "djt-story/1.0", "id": "synthetic-story", "title": "Review fixture",
            "narrative_question": "What does the imported record say?", "target_duration_seconds": 30,
            "claim_ids": [bundle["claims"][0]["id"]], "capture_policy": "optional",
        })
        for output in (bundle_path, story):
            with self.subTest(output=output.name):
                before = output.read_bytes()
                result = self.command("compile", "--bundle", bundle_path, "--story", story,
                                      "--mode", "review", "--output", output, expected=2)
                self.assertIn("overwrite a command input", result["error"])
                self.assertEqual(output.read_bytes(), before)

    def test_capture_hash_failure_is_json_error_and_needs_no_git_repository(self) -> None:
        source = self.root / "synthetic.pdf"
        source.write_bytes(b"%PDF-1.7\nnot rendered: hash check fails first\n")
        output = self.root / "capture"
        result = self.command(
            "capture-pdf", "--source", source, "--output-dir", output,
            "--expected-sha256", "0" * 64, "--source-id", "S-fixture",
            "--source-version-id", "V-fixture", "--pages", "1",
            "--source-url", "https://example.org/source.pdf", "--captured-at", "2026-10-12T01:00:00Z",
            repo=self.root / "not-a-git-repository", expected=2,
        )
        self.assertIn("SOURCE_HASH_MISMATCH", result["error"])
        self.assertFalse(output.exists())

    @unittest.skipUnless(util.find_spec("pymupdf") is not None, "optional PyMuPDF renderer is unavailable")
    def test_capture_command_produces_full_pages_and_separate_crops(self) -> None:
        import pymupdf as fitz

        source = self.root / "synthetic.pdf"
        with fitz.open() as document:
            page = document.new_page(width=200, height=100)
            page.insert_text((15, 20), "SYNTHETIC CLI CAPTURE", fontsize=9)
            document.save(source)
        regions = self.root / "regions.json"
        write_json(regions, [{"page": 1, "x": 0, "y": 0, "w": 0.75, "h": 0.5}])
        output = self.root / "capture"
        result = self.command(
            "capture-pdf", "--source", source, "--output-dir", output,
            "--expected-sha256", hashlib.sha256(source.read_bytes()).hexdigest(),
            "--source-id", "S-fixture", "--source-version-id", "V-fixture", "--pages", "1",
            "--source-url", "https://example.org/source.pdf", "--captured-at", "2026-10-12T01:00:00Z",
            "--regions", regions, repo=self.root / "not-a-git-repository",
        )
        self.assertTrue(result["capture_created"])
        manifest = json.loads((output / "manifest.json").read_text())
        self.assertEqual(manifest, result["manifest"])
        self.assertEqual(len(manifest["pages"][0]["crops"]), 1)
        page = manifest["pages"][0]
        for artifact in (page["image"], page["crops"][0]["image"]):
            self.assertEqual(artifact["sha256"], hashlib.sha256((output / artifact["path"]).read_bytes()).hexdigest())
        self.assertEqual(page["crops"][0]["pixel_box_xyxy"], [0, 0, 300, 100])
        self.assertNotIn(str(self.root), json.dumps(manifest))

    def test_atomic_writer_cleans_stage_on_replace_failure_and_preserves_destination(self) -> None:
        output = self.root / "retained.json"
        output.write_text('{"original":true}\n', encoding="utf-8")
        with mock.patch("djt_evidence.common.os.replace", side_effect=OSError("synthetic write failure")):
            with self.assertRaises(OSError):
                write_json(output, {"new": "must not replace original"})
        self.assertEqual(output.read_text(), '{"original":true}\n')
        self.assertEqual(list(self.root.glob(".retained.json.*.tmp")), [])


if __name__ == "__main__":
    unittest.main()
