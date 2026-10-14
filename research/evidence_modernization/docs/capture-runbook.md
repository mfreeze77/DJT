# Source capture and excerpt runbook

## What is executable now

`djt_evidence.capture.capture_pdf` renders **locally available original PDF bytes**
whose SHA-256 matches an explicit expected digest. It creates complete full-page
PNG images and independent pixel crops. It does not fetch a URL, acquire a source,
OCR a document, approve a claim or publish an image.

Install the optional dependency:

```sh
python -m pip install './research/evidence_modernization[capture]'
```

Use a new destination directory. Obtain the expected hash and identifiers from
the source-version/acquisition record, not from a filename that merely sounds
like the source. The capture function verifies the actual supplied bytes before
creating output.

```python
from djt_evidence.capture import capture_pdf

manifest = capture_pdf(
    source_path="/path/to/retained-original.pdf",
    output_dir="/path/to/new-capture-directory",
    expected_sha256="<64-character SHA-256 from the retained source version>",
    source_id="<stable source ID>",
    source_version_id="<exact source version ID>",
    pages=[187],                 # one-based physical PDF pages
    regions=[{
        "page": 187,
        "x": 0.05, "y": 0.10,
        "w": 0.90, "h": 0.35,
        "id": "passage-region",
    }],
    source_url="https://publisher.example/document.pdf",
    captured_at="2026-10-12T00:00:00Z",  # replace with actual capture/import time
)
```

This example is a usage template, not a claim that its page, rectangle, timestamp,
or URL is a reviewed DJT source locator. Supply the actually reviewed region and
source URL. Reuse the same explicit timestamp and renderer for a deterministic
reproduction of a capture operation.

The CLI exposes the same full-page operation:

```sh
djt-evidence capture-pdf \
  --source /path/to/retained-original.pdf \
  --expected-sha256 '<expected digest>' \
  --source-id '<source ID>' --source-version-id '<source version ID>' \
  --pages 187 \
  --source-url 'https://publisher.example/document.pdf' \
  --captured-at '2026-10-12T00:00:00Z' \
  --output-dir /path/to/new-capture-directory
```

Add `--regions /path/to/regions.json` to supply a JSON array with the same
`page,x,y,w,h` region fields shown above. Full-page images are retained alongside
the separate crops.

## Capture invariants

The renderer records its implementation versions and renders 144-DPI RGB pages.
Source annotations are included. Crops are copied from those full-page pixels;
they do not re-render a separate document state. Normalized rectangles use the
displayed, rotated page, a top-left origin, and width/height fractions. The
manifest records resulting pixel geometry and dimensions.

The source file is unchanged. Output creation is staged and only completed after
all selections render successfully. Invalid hashes, invalid/repaired/encrypted
PDFs, out-of-range pages, invalid regions and unsafe/nonempty output paths fail
explicitly. The manifest includes the source basename and public URL, not an
absolute local/private filesystem path. A public source URL is descriptive
metadata; the function never treats it as proof that a network request succeeded.

Physical PDF page numbers, embedded page labels and a human-checked printed page
number have distinct fields. An embedded label is not asserted to be a correct
printed page number. Capture creation leaves editorial review unperformed.

## Source and capture state

| Situation | Record it as | Result |
| --- | --- | --- |
| Citation exists; original bytes not retained here | Source version `metadata_only` | Eligible for research review; cannot verify the original excerpt |
| Matching original bytes retained | Source version with hash and storage locator | Eligible for targeted extraction/capture, subject to provenance and access rules |
| Capture not requested | `not_requested` | Citation-card fallback |
| Publisher has not made the needed item available | `expected_not_published` | Research/acquisition gap remains visible |
| Capture failed | `capture_failed` plus specific error | Keep source and claim; retry or review separately |
| Available derivative needs review | `manual_review` | No automatic factual or publication approval |
| Original source unavailable | `source_unavailable` | Preserve attempted acquisition and limitations |
| Verified derivative and complete manifest retained | `available` | The later publication-binding adapter must still check source/excerpt/capture consistency |

The importer preserves the original acquisition-status wording independently of
these normalized capture states. It does not rewrite an unsuccessful acquisition
into a successful capture.

## Source version and excerpt binding still required

The audited main revision `d5f1b11a0500d5d577f4553d7e6d13a0aa69e494` contains no
original PDFs, despite acquisition manifests recording prior PDF hashes. It
includes three historical review PNGs. The capture
tests use synthetic PDFs and prove renderer/preservation behavior, not the truth
of historical research. No new original-source capture is claimed by those tests.

The next integration must attach captured originals to a declared source version,
retain PDF-to-text extraction metadata and source hash, verify the exact quote
against that derivative, and resolve the same passage on the source image.
Native text, OCR text and manual corrections are distinct derivatives. Selective
image review must never become a full-corpus negative-search assertion.

The current text publication verifier accepts exact UTF-8 positions, with explicit
character units and prefix/suffix checks. It does not yet admit a PDF screenshot
as substitute support for a missing text excerpt. Required-image publication is
therefore blocked until DEM-014 adds and qualifies this binding.

Highlights and narration callouts should be separate presentation data. Keep an
unaltered contextual full page and a readable crop, and preserve any material
qualification outside the crop. A screenshot preserves what a page showed; it
does not supply independent corroboration of the underlying assertion.
