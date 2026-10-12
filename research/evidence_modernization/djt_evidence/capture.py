"""Offline, source-bound PDF page capture.

This module has no rendering dependency at import time. Install the ``capture``
extra to render with PyMuPDF. Captures remain unreviewed evidence derivatives;
creating one never accepts a claim or grants publication approval.
"""

from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal
import hashlib
from importlib import import_module
import json
import math
import os
from pathlib import Path
import re
import shutil
import tempfile
from typing import Any
from urllib.parse import urlsplit


_MAX_SOURCE_BYTES = 512 * 1024 * 1024
_MAX_RENDER_PIXELS = 200_000_000
_DPI = 144


class CaptureError(ValueError):
    """An explicit capture failure with a stable machine-readable ``code``."""

    def __init__(self, code: str, message: str) -> None:
        self.code = code
        super().__init__(f"{code}: {message}")


def _required_text(value: Any, name: str) -> str:
    if not isinstance(value, str) or not value.strip() or any(
        ord(character) < 32 for character in value
    ):
        raise CaptureError("INVALID_ARGUMENT", f"{name} must be nonempty text")
    return value


def _timestamp(value: Any) -> str:
    value = _required_text(value, "captured_at")
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise CaptureError("INVALID_ARGUMENT", "captured_at must be ISO8601") from exc
    if parsed.tzinfo is None or "T" not in value:
        raise CaptureError(
            "INVALID_ARGUMENT", "captured_at must include time and UTC offset"
        )
    return parsed.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def _public_source_url(value: Any) -> str | None:
    if value is None:
        return None
    value = _required_text(value, "source_url")
    try:
        parsed = urlsplit(value)
        valid = (
            parsed.scheme == "https"
            and parsed.hostname
            and not parsed.username
            and not parsed.password
        )
    except ValueError as exc:
        raise CaptureError("INVALID_ARGUMENT", "source_url is invalid") from exc
    if not valid:
        raise CaptureError(
            "INVALID_ARGUMENT", "source_url must be a credential-free HTTPS URL"
        )
    return value


def _output_target(value: str | os.PathLike[str]) -> Path:
    path = Path(value).expanduser()
    if ".." in path.parts:
        raise CaptureError("UNSAFE_OUTPUT", "output path may not contain '..'")
    path = path.absolute()
    for candidate in (path, *path.parents):
        if candidate.is_symlink():
            raise CaptureError("UNSAFE_OUTPUT", "output path may not use symlinks")
    if path.exists():
        if not path.is_dir() or any(path.iterdir()):
            raise CaptureError(
                "OUTPUT_NOT_EMPTY", "output must be a new or empty directory"
            )
    return path


def _read_source(path: Path, expected_sha256: Any) -> tuple[bytes, str]:
    if not isinstance(expected_sha256, str) or not re.fullmatch(
        r"[0-9a-fA-F]{64}", expected_sha256
    ):
        raise CaptureError("INVALID_ARGUMENT", "expected_sha256 must be SHA256 hex")
    try:
        with path.open("rb") as source:
            data = source.read(_MAX_SOURCE_BYTES + 1)
    except FileNotFoundError as exc:
        raise CaptureError("SOURCE_MISSING", "the source file is not available") from exc
    except OSError as exc:
        raise CaptureError("SOURCE_UNREADABLE", "the source file cannot be read") from exc
    if len(data) > _MAX_SOURCE_BYTES:
        raise CaptureError("SOURCE_TOO_LARGE", "source exceeds the 512MiB limit")
    actual = hashlib.sha256(data).hexdigest()
    if actual != expected_sha256.lower():
        raise CaptureError(
            "SOURCE_HASH_MISMATCH", "available bytes do not match the pinned source"
        )
    if not data.startswith(b"%PDF-"):
        raise CaptureError("INVALID_PDF", "source bytes do not begin with PDF magic")
    return data, actual


def _selected_pages(pages: Any) -> list[int]:
    if (
        not isinstance(pages, (list, tuple))
        or not pages
        or any(type(page) is not int or page < 1 for page in pages)
        or len(set(pages)) != len(pages)
    ):
        raise CaptureError(
            "INVALID_PAGES", "pages must be distinct positive one-based integers"
        )
    return sorted(pages)


def _selected_regions(regions: Any, pages: list[int]) -> list[dict[str, Any]]:
    if regions is None:
        return []
    if not isinstance(regions, list):
        raise CaptureError("INVALID_REGION", "regions must be a list")
    selected = []
    identifiers: set[str] = set()
    for index, region in enumerate(regions, start=1):
        if not isinstance(region, dict) or not {"page", "x", "y", "w", "h"} <= set(
            region
        ) or set(region) - {"page", "x", "y", "w", "h", "id", "label"}:
            raise CaptureError("INVALID_REGION", "region fields are page,x,y,w,h,id,label")
        if type(region["page"]) is not int or region["page"] not in pages:
            raise CaptureError("INVALID_REGION", "region page must be a selected page")
        for name in ("x", "y", "w", "h"):
            try:
                valid_number = type(region[name]) in (int, float) and math.isfinite(region[name])
            except OverflowError:
                valid_number = False
            if not valid_number:
                raise CaptureError("INVALID_REGION", "coordinates must be finite numbers")
        x, y, width, height = (Decimal(str(region[key])) for key in ("x", "y", "w", "h"))
        if not (
            0 <= x < 1
            and 0 <= y < 1
            and 0 < width <= 1
            and 0 < height <= 1
            and x + width <= 1
            and y + height <= 1
        ):
            raise CaptureError("INVALID_REGION", "normalized region is outside the page")
        identifier = region.get("id", f"region-{index:03d}")
        if not isinstance(identifier, str) or not identifier.strip() or identifier in identifiers:
            raise CaptureError("INVALID_REGION", "region IDs must be unique nonempty text")
        identifiers.add(identifier)
        if "label" in region and not isinstance(region["label"], str):
            raise CaptureError("INVALID_REGION", "region label must be text")
        selected.append(
            {
                "id": identifier,
                "page": region["page"],
                "x": float(x),
                "y": float(y),
                "w": float(width),
                "h": float(height),
                "label": region.get("label"),
            }
        )
    return selected


def _artifact(path: str, data: bytes, width: int, height: int) -> dict[str, Any]:
    return {
        "path": path,
        "sha256": hashlib.sha256(data).hexdigest(),
        "bytes": len(data),
        "media_type": "image/png",
        "width_px": width,
        "height_px": height,
    }


def _capture_id(source_version_id: str, source_hash: str, artifact: dict[str, Any]) -> str:
    payload = json.dumps(
        [source_version_id, source_hash, artifact["path"], artifact["sha256"]],
        separators=(",", ":"),
        ensure_ascii=False,
    ).encode("utf-8")
    return "capture:" + hashlib.sha256(payload).hexdigest()


def _crop(fitz: Any, pixmap: Any, region: dict[str, Any]) -> tuple[bytes, list[int]]:
    width, height = pixmap.width, pixmap.height
    x0 = max(0, math.floor(region["x"] * width))
    y0 = max(0, math.floor(region["y"] * height))
    x1 = min(width, math.ceil((region["x"] + region["w"]) * width))
    y1 = min(height, math.ceil((region["y"] + region["h"]) * height))
    if x1 <= x0 or y1 <= y0:
        raise CaptureError("INVALID_REGION", "region has no representable image pixels")
    # Copy exactly the existing RGB raster rows. Do not rerender a clip, which can
    # change antialiasing at the crop boundary, or draw highlights into the page.
    samples = memoryview(pixmap.samples)
    cropped = b"".join(
        samples[row * pixmap.stride + x0 * 3 : row * pixmap.stride + x1 * 3]
        for row in range(y0, y1)
    )
    result = fitz.Pixmap(fitz.csRGB, x1 - x0, y1 - y0, cropped, False)
    result.set_dpi(_DPI, _DPI)
    return result.tobytes("png"), [x0, y0, x1, y1]


def capture_pdf(
    source_path: str | os.PathLike[str],
    output_dir: str | os.PathLike[str],
    *,
    expected_sha256: str,
    source_id: str,
    source_version_id: str,
    pages: list[int],
    regions: list[dict[str, Any]] | None = None,
    source_url: str | None = None,
    captured_at: str,
) -> dict[str, Any]:
    """Render pinned local PDF bytes to full-page PNGs and separate pixel crops.

    ``pages`` uses one-based physical PDF pages. Regions use ``page,x,y,w,h``;
    their normalized coordinates refer to the displayed, rotated page with a
    top-left origin. Region IDs/labels are metadata only, never filenames.

    Outputs are 144-DPI RGB PNGs with source annotations included, accompanied
    by ``manifest.json``. The source is never edited. Embedded PDF labels are
    recorded separately; printed labels remain unreviewed. The manifest keeps
    only the source basename, never the absolute local input/output paths.

    Supply the public canonical ``source_url`` rather than a signed download URL.
    The URL is metadata: this function never performs network requests. The
    explicit, timezone-aware ``captured_at`` allows deterministic rebuilds.

    Source, page selection and normalized-region validation precede staging.
    Rendering and final pixel-bound checks are staged beside the destination
    and promoted only when every page succeeds. A nonempty destination or any
    output-path symlink is refused.
    """
    source_id = _required_text(source_id, "source_id")
    source_version_id = _required_text(source_version_id, "source_version_id")
    captured_at = _timestamp(captured_at)
    source_url = _public_source_url(source_url)
    selected_pages = _selected_pages(pages)
    selected_regions = _selected_regions(regions, selected_pages)
    source = Path(source_path).expanduser()
    data, source_hash = _read_source(source, expected_sha256)
    output = _output_target(output_dir)
    try:
        fitz = import_module("pymupdf")
    except ImportError as exc:
        raise CaptureError(
            "CAPTURE_DEPENDENCY_MISSING", "install djt-evidence[capture] to render PDFs"
        ) from exc
    try:
        document = fitz.open(stream=data, filetype="pdf")
    except Exception as exc:
        raise CaptureError("INVALID_PDF", "PDF parser could not open the pinned bytes") from exc
    staging: Path | None = None
    try:
        if not document.is_pdf or document.page_count < 1:
            raise CaptureError("INVALID_PDF", "source has no PDF pages")
        if document.needs_pass:
            raise CaptureError("SOURCE_ENCRYPTED", "encrypted PDF requires an authorized decrypted source")
        if selected_pages[-1] > document.page_count:
            raise CaptureError("INVALID_PAGES", "selected page exceeds the document page count")
        if document.is_repaired:
            raise CaptureError("INVALID_PDF", "PDF required parser repair; supply a reviewed valid source")
        total_pixels = 0
        geometry: dict[int, dict[str, Any]] = {}
        for physical_page in selected_pages:
            page = document[physical_page - 1]
            rect = page.rect
            if not all(math.isfinite(number) for number in rect) or rect.width <= 0 or rect.height <= 0:
                raise CaptureError("INVALID_PDF", "page has invalid geometry")
            pixel_width = math.ceil(rect.width * _DPI / 72)
            pixel_height = math.ceil(rect.height * _DPI / 72)
            total_pixels += pixel_width * pixel_height
            if total_pixels > _MAX_RENDER_PIXELS:
                raise CaptureError("CAPTURE_TOO_LARGE", "selected pages exceed the 200 million pixel limit")
            geometry[physical_page] = {
                "media_box_points": list(page.mediabox),
                "crop_box_points": list(page.cropbox),
                "visible_box_points": list(rect),
                "rotation_degrees": page.rotation,
            }
        manifest: dict[str, Any] = {
            "schema_version": "1.0.0",
            "kind": "pdf_capture_manifest",
            "status": "captured_unreviewed",
            "captured_at": captured_at,
            "source": {
                "source_id": source_id,
                "source_version_id": source_version_id,
                "name": source.name,
                "url": source_url,
                "sha256": source_hash,
                "bytes": len(data),
                "media_type": "application/pdf",
                "page_count": document.page_count,
            },
            "renderer": {
                "name": "PyMuPDF",
                "version": fitz.VersionBind,
                "engine": "MuPDF",
                "engine_version": fitz.VersionFitz,
                "dpi": _DPI,
                "colorspace": "DeviceRGB",
                "alpha": False,
                "annotations_included": True,
                "normalized_region_origin": "top_left_of_displayed_rotated_page",
                "pixel_box_convention": "xyxy_right_bottom_exclusive",
                "crop_rounding": "floor_left_top_ceil_right_bottom",
            },
            "pages": [],
        }
        # Delay all filesystem writes until missing/hash/format/page checks pass.
        output.parent.mkdir(parents=True, exist_ok=True)
        _output_target(output)
        staging = Path(tempfile.mkdtemp(prefix=f".{output.name}.capture-", dir=output.parent))
        for physical_page in selected_pages:
            page = document[physical_page - 1]
            pixmap = page.get_pixmap(dpi=_DPI, colorspace=fitz.csRGB, alpha=False, annots=True)
            full_data = pixmap.tobytes("png")
            filename = f"page-{physical_page:04d}.png"
            (staging / filename).write_bytes(full_data)
            full_image = _artifact(filename, full_data, pixmap.width, pixmap.height)
            page_capture = {
                "capture_id": _capture_id(source_version_id, source_hash, full_image),
                "physical_page": physical_page,
                "embedded_page_label": page.get_label() or None,
                "printed_page_label": None,
                "printed_page_label_status": "not_reviewed",
                "review_status": "unreviewed",
                "page_geometry": geometry[physical_page],
                "image": full_image,
                "crops": [],
            }
            for index, region in enumerate(selected_regions, start=1):
                if region["page"] != physical_page:
                    continue
                crop_data, pixel_box = _crop(fitz, pixmap, region)
                crop_filename = f"page-{physical_page:04d}-crop-{index:03d}.png"
                (staging / crop_filename).write_bytes(crop_data)
                crop_image = _artifact(
                    crop_filename,
                    crop_data,
                    pixel_box[2] - pixel_box[0],
                    pixel_box[3] - pixel_box[1],
                )
                page_capture["crops"].append(
                    {
                        "capture_id": _capture_id(source_version_id, source_hash, crop_image),
                        "physical_page": physical_page,
                        "source_full_capture_id": page_capture["capture_id"],
                        "source_full_image_sha256": full_image["sha256"],
                        "region": region,
                        "pixel_box_xyxy": pixel_box,
                        "operation": "lossless_pixel_crop",
                        "highlights": [],
                        "review_status": "unreviewed",
                        "image": crop_image,
                    }
                )
            manifest["pages"].append(page_capture)
        encoded = json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True, allow_nan=False)
        (staging / "manifest.json").write_text(encoded + "\n", encoding="utf-8")
        _output_target(output)
        os.replace(staging, output)
        staging = None
        return manifest
    except CaptureError:
        raise
    except OSError as exc:
        raise CaptureError("CAPTURE_WRITE_FAILED", "capture output could not be written safely") from exc
    except Exception as exc:
        raise CaptureError("CAPTURE_RENDER_FAILED", "source rendering did not complete") from exc
    finally:
        document.close()
        if staging is not None:
            shutil.rmtree(staging, ignore_errors=True)
