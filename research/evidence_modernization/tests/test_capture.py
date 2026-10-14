"""Source integrity and pixel-parity tests using synthetic PDF fixtures only."""

from __future__ import annotations

import hashlib
from importlib import util
import json
from pathlib import Path
import tempfile
import unittest
from unittest import mock

from djt_evidence.capture import CaptureError, capture_pdf


HAS_RENDERER = util.find_spec("pymupdf") is not None


class CaptureBoundaryTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.source = self.root / "source.pdf"
        self.source.write_bytes(b"%PDF-1.7\nsynthetic invalid parser fixture\n")
        self.options = {
            "expected_sha256": hashlib.sha256(self.source.read_bytes()).hexdigest(),
            "source_id": "source:synthetic",
            "source_version_id": "source-version:synthetic-v1",
            "pages": [1],
            "source_url": "https://example.org/evidence.pdf",
            "captured_at": "2026-10-12T01:00:00Z",
        }

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def check_failure(self, code: str, *, source: Path | None = None, **changes: object) -> None:
        output = self.root / "output"
        with self.assertRaises(CaptureError) as raised:
            capture_pdf(source or self.source, output, **(self.options | changes))
        self.assertEqual(raised.exception.code, code)
        self.assertFalse(output.exists(), "validation failure created output")
        self.assertFalse(list(self.root.glob(".output.capture-*")))

    def test_missing_source_fails_before_output_or_renderer_import(self) -> None:
        with mock.patch("djt_evidence.capture.import_module") as renderer:
            self.check_failure("SOURCE_MISSING", source=self.root / "missing.pdf")
        renderer.assert_not_called()

    def test_wrong_hash_fails_before_renderer_import(self) -> None:
        with mock.patch("djt_evidence.capture.import_module") as renderer:
            self.check_failure("SOURCE_HASH_MISMATCH", expected_sha256="0" * 64)
        renderer.assert_not_called()

    def test_non_pdf_bytes_are_rejected_despite_matching_hash(self) -> None:
        self.source.write_bytes(b"<html>Not the requested judgment</html>")
        self.check_failure(
            "INVALID_PDF",
            expected_sha256=hashlib.sha256(self.source.read_bytes()).hexdigest(),
        )

    def test_optional_dependency_error_is_actionable_without_outputs(self) -> None:
        with mock.patch("djt_evidence.capture.import_module", side_effect=ImportError):
            self.check_failure("CAPTURE_DEPENDENCY_MISSING")

    def test_bad_page_lists_do_not_silently_deduplicate_or_coerce(self) -> None:
        for pages in ([], [0], [-1], [True], [1.0], [1, 1], "1", None):
            with self.subTest(pages=pages):
                self.check_failure("INVALID_PAGES", pages=pages)

    def test_regions_are_finite_normalized_and_bound_to_selected_pages(self) -> None:
        valid = {"page": 1, "x": 0.1, "y": 0.1, "w": 0.5, "h": 0.5}
        for change in (
            {"page": 2},
            {"page": True},
            {"x": -0.1},
            {"x": 0.8},
            {"y": 1},
            {"w": 0},
            {"h": float("nan")},
            {"x": float("inf")},
            {"w": True},
            {"x": 10**1000},
            {"unknown": "not a supported coordinate"},
        ):
            with self.subTest(change=change):
                self.check_failure("INVALID_REGION", regions=[valid | change])
        self.check_failure("INVALID_REGION", regions=[{"page": 1, "x": 0.1}])
        self.check_failure("INVALID_REGION", regions=[valid | {"id": "same"}] * 2)

    def test_source_metadata_and_clock_are_explicit(self) -> None:
        for change in (
            {"source_id": ""},
            {"source_version_id": ""},
            {"expected_sha256": "not-a-hash"},
            {"captured_at": "2026-10-12"},
            {"captured_at": "2026-10-12T01:00:00"},
            {"source_url": "file:///private/source.pdf"},
            {"source_url": "https://user:password@example.org/evidence.pdf"},
        ):
            with self.subTest(change=change):
                self.check_failure("INVALID_ARGUMENT", **change)

    def test_existing_files_and_nonempty_directories_are_never_overwritten(self) -> None:
        for as_directory in (False, True):
            with self.subTest(as_directory=as_directory):
                output = self.root / ("existing-directory" if as_directory else "existing-file")
                if as_directory:
                    output.mkdir()
                    original = output / "preserve.txt"
                else:
                    original = output
                original.write_text("preserve this", encoding="utf-8")
                with self.assertRaises(CaptureError) as raised:
                    capture_pdf(self.source, output, **self.options)
                self.assertEqual(raised.exception.code, "OUTPUT_NOT_EMPTY")
                self.assertEqual(original.read_text(), "preserve this")

    def test_output_symlinks_and_traversal_are_rejected(self) -> None:
        elsewhere = self.root / "elsewhere"
        elsewhere.mkdir()
        linked = self.root / "linked"
        try:
            linked.symlink_to(elsewhere, target_is_directory=True)
        except (OSError, NotImplementedError):
            self.skipTest("symlinks are unavailable on this platform")
        for output in (linked, linked / "child", self.root / "a" / ".." / "child"):
            with self.subTest(output=output):
                with self.assertRaises(CaptureError) as raised:
                    capture_pdf(self.source, output, **self.options)
                self.assertEqual(raised.exception.code, "UNSAFE_OUTPUT")
        self.assertEqual(list(elsewhere.iterdir()), [])


@unittest.skipUnless(HAS_RENDERER, "install djt-evidence[capture] for PDF rendering tests")
class CaptureRenderingTests(unittest.TestCase):
    def setUp(self) -> None:
        import pymupdf as fitz

        self.fitz = fitz
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.source = self.root / "synthetic-evidence.pdf"
        with fitz.open() as document:
            page = document.new_page(width=200, height=100)
            page.draw_rect(fitz.Rect(0, 0, 100, 100), color=None, fill=(0.1, 0.3, 0.9))
            page.draw_rect(fitz.Rect(100, 0, 200, 100), color=None, fill=(0.9, 0.7, 0.1))
            page.insert_text((15, 20), "SYNTHETIC EVIDENCE", fontsize=9)
            page.draw_line((0, 90), (200, 10), color=(0.7, 0.1, 0.2), width=2)
            second = document.new_page(width=150, height=200)
            second.insert_text((15, 30), "ROTATED FIXTURE", fontsize=10)
            second.set_rotation(90)
            document.set_page_labels(
                [{"startpage": 0, "prefix": "A-", "style": "D", "firstpagenum": 7}]
            )
            document.save(self.source)
        self.source_bytes = self.source.read_bytes()
        self.options = {
            "expected_sha256": hashlib.sha256(self.source_bytes).hexdigest(),
            "source_id": "source:synthetic",
            "source_version_id": "source-version:synthetic-v1",
            "pages": [1, 2],
            "source_url": "https://example.org/evidence.pdf",
            "captured_at": "2026-10-12T01:00:00Z",
        }

    def tearDown(self) -> None:
        self.temporary.cleanup()

    def capture(self, name: str = "output", **changes: object) -> tuple[Path, dict]:
        output = self.root / name
        manifest = capture_pdf(self.source, output, **(self.options | changes))
        self.assertEqual(self.source.read_bytes(), self.source_bytes, "source was edited")
        return output, manifest

    def test_full_pages_have_verified_hashes_dimensions_and_separate_page_labels(self) -> None:
        output, manifest = self.capture()
        self.assertEqual(manifest["status"], "captured_unreviewed")
        self.assertEqual(manifest["source"]["sha256"], self.options["expected_sha256"])
        self.assertEqual(manifest["source"]["name"], self.source.name)
        self.assertEqual(manifest["source"]["bytes"], len(self.source_bytes))
        self.assertEqual(manifest["renderer"]["version"], self.fitz.VersionBind)
        self.assertEqual(manifest["renderer"]["engine_version"], self.fitz.VersionFitz)
        self.assertEqual(manifest["pages"][0]["embedded_page_label"], "A-7")
        self.assertEqual(manifest["pages"][1]["embedded_page_label"], "A-8")
        self.assertEqual(manifest["pages"][1]["page_geometry"]["rotation_degrees"], 90)
        for page, dimensions in zip(manifest["pages"], [(400, 200), (400, 300)]):
            image = page["image"]
            data = (output / image["path"]).read_bytes()
            self.assertEqual(image["sha256"], hashlib.sha256(data).hexdigest())
            self.assertEqual(image["bytes"], len(data))
            self.assertEqual((image["width_px"], image["height_px"]), dimensions)
            self.assertIsNone(page["printed_page_label"])
            self.assertEqual(page["printed_page_label_status"], "not_reviewed")
        recorded = (output / "manifest.json").read_text()
        self.assertEqual(json.loads(recorded), manifest)
        self.assertNotIn(str(self.root), recorded, "absolute source/output path leaked")

    def test_crops_are_exact_full_page_pixels_and_do_not_change_original_render(self) -> None:
        region = {"page": 1, "x": 0.25, "y": 0.2, "w": 0.5, "h": 0.6, "id": "passage"}
        output, manifest = self.capture(regions=[region])
        _, without_crops = self.capture("no-crops")
        page = manifest["pages"][0]
        self.assertEqual(page["image"], without_crops["pages"][0]["image"])
        crop = page["crops"][0]
        self.assertEqual(crop["pixel_box_xyxy"], [100, 40, 300, 160])
        self.assertEqual(crop["source_full_image_sha256"], page["image"]["sha256"])
        self.assertEqual(crop["highlights"], [])
        full_pixmap = self.fitz.Pixmap(str(output / page["image"]["path"]))
        cropped_pixmap = self.fitz.Pixmap(str(output / crop["image"]["path"]))
        expected_pixels = b"".join(
            full_pixmap.samples[row * full_pixmap.stride + 300 : row * full_pixmap.stride + 900]
            for row in range(40, 160)
        )
        self.assertEqual(cropped_pixmap.samples, expected_pixels)
        crop_bytes = (output / crop["image"]["path"]).read_bytes()
        self.assertEqual(crop["image"]["sha256"], hashlib.sha256(crop_bytes).hexdigest())
        self.assertEqual((cropped_pixmap.width, cropped_pixmap.height), (200, 120))

    def test_capture_rebuild_is_deterministic_and_sorts_selected_physical_pages(self) -> None:
        first_path, first = self.capture("first", pages=[2, 1])
        second_path, second = self.capture("second", pages=[1, 2])
        self.assertEqual(first, second)
        self.assertEqual(
            (first_path / "manifest.json").read_bytes(),
            (second_path / "manifest.json").read_bytes(),
        )
        for page in first["pages"]:
            filename = page["image"]["path"]
            self.assertEqual((first_path / filename).read_bytes(), (second_path / filename).read_bytes())

    def test_output_can_replace_only_an_empty_directory(self) -> None:
        (self.root / "empty").mkdir()
        output, manifest = self.capture("empty", pages=[1])
        self.assertTrue((output / "manifest.json").is_file())
        self.assertEqual(len(manifest["pages"]), 1)

    def test_out_of_bounds_pages_fail_without_output(self) -> None:
        output = self.root / "out-of-range"
        with self.assertRaises(CaptureError) as raised:
            capture_pdf(self.source, output, **(self.options | {"pages": [3]}))
        self.assertEqual(raised.exception.code, "INVALID_PAGES")
        self.assertFalse(output.exists())

    def test_invalid_parser_input_fails_even_with_pdf_magic_and_matching_hash(self) -> None:
        invalid = self.root / "invalid.pdf"
        invalid.write_bytes(b"%PDF-1.7\nnot a document\n%%EOF\n")
        with self.assertRaises(CaptureError) as raised:
            capture_pdf(
                invalid,
                self.root / "invalid-out",
                **(self.options | {"expected_sha256": hashlib.sha256(invalid.read_bytes()).hexdigest()}),
            )
        self.assertEqual(raised.exception.code, "INVALID_PDF")
        self.assertFalse((self.root / "invalid-out").exists())

    def test_render_failure_does_not_leave_partial_output(self) -> None:
        original_get_pixmap = self.fitz.Page.get_pixmap
        calls = 0

        def fail_second(page, *args, **kwargs):
            nonlocal calls
            calls += 1
            if calls == 2:
                raise RuntimeError("synthetic render failure")
            return original_get_pixmap(page, *args, **kwargs)

        with mock.patch.object(self.fitz.Page, "get_pixmap", fail_second):
            with self.assertRaises(CaptureError) as raised:
                self.capture("partial")
        self.assertEqual(raised.exception.code, "CAPTURE_RENDER_FAILED")
        self.assertFalse((self.root / "partial").exists())
        self.assertFalse(list(self.root.glob(".partial.capture-*")))

    def test_region_identifier_cannot_control_output_filename(self) -> None:
        output, manifest = self.capture(
            regions=[{"page": 1, "x": 0, "y": 0, "w": 1, "h": 1, "id": "../../elsewhere.png"}]
        )
        crop = manifest["pages"][0]["crops"][0]
        self.assertEqual(crop["region"]["id"], "../../elsewhere.png")
        self.assertEqual(crop["image"]["path"], "page-0001-crop-001.png")
        self.assertTrue((output / crop["image"]["path"]).is_file())
        self.assertFalse((self.root / "elsewhere.png").exists())

    def test_encrypted_sources_are_not_silently_rendered(self) -> None:
        encrypted = self.root / "encrypted.pdf"
        with self.fitz.open(stream=self.source_bytes, filetype="pdf") as document:
            document.save(
                encrypted,
                encryption=self.fitz.PDF_ENCRYPT_AES_256,
                owner_pw="synthetic-owner",
                user_pw="synthetic-reader",
            )
        with self.assertRaises(CaptureError) as raised:
            capture_pdf(
                encrypted,
                self.root / "encrypted-out",
                **(self.options | {"expected_sha256": hashlib.sha256(encrypted.read_bytes()).hexdigest()}),
            )
        self.assertEqual(raised.exception.code, "SOURCE_ENCRYPTED")
        self.assertFalse((self.root / "encrypted-out").exists())


if __name__ == "__main__":
    unittest.main()
