"""Command-line entry points. All source reads use one pinned Git revision."""

import argparse
import gzip
import json
import sys
from pathlib import Path

from .common import EvidenceError, strict_json, write_json
from .compiler import affected_story, compile_story
from .contracts import validate_bundle
from .importer import build_bundle
from .inventory import GitSnapshot, build_inventory


def load_json(path):
    path = Path(path)
    data = gzip.decompress(path.read_bytes()) if path.suffix == ".gz" else path.read_bytes()
    return strict_json(data)


def safe_output(path, snapshot, inputs=()):
    """Never overwrite a pinned source or an explicitly supplied command input."""
    path = Path(path).resolve()
    if any(path == Path(source).resolve() for source in inputs if source is not None):
        raise EvidenceError("Output would overwrite a command input; choose a separate output path")
    try:
        relative = path.relative_to(Path(snapshot.root).resolve()).as_posix()
    except ValueError:
        return path
    if relative in snapshot.paths:
        raise EvidenceError(f"Output would overwrite a pinned source: {relative}")
    return path


def parser():
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument("--repo", type=Path, default=Path.cwd())
    result.add_argument("--revision", default="HEAD", help="Commit or ref resolved once before reading")
    commands = result.add_subparsers(dest="command", required=True)
    for name in ("inventory", "build"):
        command = commands.add_parser(name)
        command.add_argument("--output", type=Path, required=True)
    validate = commands.add_parser("validate")
    validate.add_argument("--bundle", type=Path, required=True)
    compile_command = commands.add_parser("compile")
    compile_command.add_argument("--bundle", type=Path, required=True)
    compile_command.add_argument("--story", type=Path, required=True)
    compile_command.add_argument("--mode", choices=("review", "publish"), default="review")
    compile_command.add_argument("--output", type=Path, required=True)
    affected = commands.add_parser("affected")
    affected.add_argument("--bundle", type=Path, required=True)
    affected.add_argument("--story-package", type=Path, required=True)
    affected.add_argument("--output", type=Path, required=True)
    audit = commands.add_parser("audit")
    audit.add_argument("--output-dir", type=Path, required=True)
    matter = commands.add_parser("matter-candidates")
    matter.add_argument("--bundle", type=Path, required=True)
    matter.add_argument("--observed-at", required=True,
                        help="Explicit host import time in RFC3339, never a fabricated historical acquisition time")
    matter.add_argument("--output", type=Path, required=True)
    capture = commands.add_parser("capture-pdf")
    capture.add_argument("--source", type=Path, required=True)
    capture.add_argument("--output-dir", type=Path, required=True)
    capture.add_argument("--expected-sha256", required=True)
    capture.add_argument("--source-id", required=True)
    capture.add_argument("--source-version-id", required=True)
    capture.add_argument("--pages", type=int, nargs="+", required=True, help="One-based physical PDF pages")
    capture.add_argument("--source-url", required=True)
    capture.add_argument("--captured-at", required=True)
    capture.add_argument("--regions", type=Path,
                         help="JSON array of normalized page,x,y,w,h crop regions; full pages are retained")
    return result


def run(args):
    if args.command == "capture-pdf":
        from .capture import capture_pdf
        capture = capture_pdf(args.source, args.output_dir, expected_sha256=args.expected_sha256,
                              source_id=args.source_id, source_version_id=args.source_version_id,
                              pages=args.pages, source_url=args.source_url, captured_at=args.captured_at,
                              regions=load_json(args.regions) if args.regions else None)
        return {"capture_created": True, "output_dir": str(args.output_dir), "manifest": capture}
    snapshot = GitSnapshot(args.repo, args.revision)
    if args.command == "audit":
        from .reporting import write_audit_reports
        resolved = args.output_dir.resolve()
        for path in snapshot.paths:
            candidate = (args.repo / path).resolve()
            if candidate == resolved or resolved in candidate.parents:
                raise EvidenceError("Audit output directory overlaps pinned input files; choose a new directory")
        return write_audit_reports(args.repo, snapshot.revision, args.output_dir)
    if args.command == "inventory":
        value = build_inventory(args.repo, snapshot.revision)
    elif args.command == "build":
        value = build_bundle(args.repo, snapshot.revision)
        validate_bundle(value, args.repo)
    else:
        bundle = load_json(args.bundle)
        # Bundle pins govern subsequent source reads, not the CLI's default current HEAD.
        snapshot = GitSnapshot(args.repo, bundle["repository"]["revision"])
        if args.command == "validate":
            return validate_bundle(bundle, args.repo)
        if args.command == "compile":
            value = compile_story(bundle, load_json(args.story), mode=args.mode, source_root=args.repo)
        elif args.command == "affected":
            validate_bundle(bundle, args.repo)
            value = affected_story(load_json(args.story_package), bundle)
        else:
            from .matter_adapter import build_matter_candidates
            validate_bundle(bundle, args.repo)
            value = build_matter_candidates(bundle, args.repo, args.observed_at)
    input_paths = [getattr(args, name, None) for name in ("bundle", "story", "story_package")]
    write_json(safe_output(args.output, snapshot, input_paths), value)
    return {"output": str(args.output), "source_revision": snapshot.revision,
            "schema_version": value.get("schema_version"), "written": True}


def main(argv=None):
    try:
        result = run(parser().parse_args(argv))
    except (ValueError, OSError, KeyError) as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False), file=sys.stderr)
        return 2
    print(json.dumps({"ok": True, **result}, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
