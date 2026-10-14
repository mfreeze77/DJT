"""Verify every receipt-listed artifact and compare deterministic report sets."""

import hashlib
import json
import sys
from pathlib import Path, PurePosixPath


def verify(root):
    root = Path(root)
    receipt = json.loads((root / "receipt.json").read_text(encoding="utf-8"))
    expected = {"receipt.json"}
    for artifact in receipt["artifacts"]:
        path = PurePosixPath(artifact["path"])
        if path.is_absolute() or ".." in path.parts or str(path) in expected:
            raise ValueError("Unsafe or duplicate report artifact path")
        expected.add(str(path))
        content = (root / path).read_bytes()
        if len(content) != artifact["byte_count"] or hashlib.sha256(content).hexdigest() != artifact["sha256"]:
            raise ValueError(f"Report digest or byte count mismatch: {path}")
    actual = {path.relative_to(root).as_posix() for path in root.rglob("*") if path.is_file()}
    if actual != expected or len(expected) != receipt["artifact_count"]:
        raise ValueError("Unlisted or missing report artifacts")
    return expected


def main():
    left, right = map(Path, sys.argv[1:])
    names = verify(left)
    if names != verify(right):
        raise ValueError("Report file sets differ")
    for name in sorted(names):
        if (left / name).read_bytes() != (right / name).read_bytes():
            raise ValueError(f"Regenerated report differs: {name}")
    print(json.dumps({"verified": True, "artifacts": len(names), "byte_identical_rebuild": True}))


if __name__ == "__main__":
    main()
