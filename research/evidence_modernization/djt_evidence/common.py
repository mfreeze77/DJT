"""Deterministic serialization, scoped identity, and strict input handling."""

import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import tempfile


class EvidenceError(ValueError):
    """A preservation or evidence boundary was not satisfied."""


def canonical_bytes(value):
    # This project encoding is versioned; it is NOT claimed to be RFC 8785/JCS.
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"),
                      allow_nan=False).encode("utf-8")


def digest(value):
    return hashlib.sha256(canonical_bytes(value)).hexdigest()


def bytes_digest(value):
    return hashlib.sha256(value).hexdigest()


def scoped_id(kind, *parts):
    return f"djt:{kind}:" + digest(list(parts))


def strict_json(data):
    def pairs(items):
        result = {}
        for key, value in items:
            if key in result:
                raise EvidenceError(f"Duplicate JSON key: {key}")
            result[key] = value
        return result

    def invalid(value):
        raise EvidenceError(f"Non-finite JSON number: {value}")

    return json.loads(data, object_pairs_hook=pairs, parse_constant=invalid)


def safe_relative(path):
    candidate = PurePosixPath(path)
    if not path or candidate.is_absolute() or ".." in candidate.parts or "\\" in path:
        raise EvidenceError(f"Unsafe relative path: {path!r}")
    return candidate


def write_json(path, data):
    target = Path(path)
    content = json.dumps(data, ensure_ascii=False, sort_keys=True, indent=2,
                         allow_nan=False) + "\n"
    target.parent.mkdir(parents=True, exist_ok=True)
    # An exclusive random sibling cannot overwrite an existing source named
    # '<output>.tmp', and concurrent writers cannot reuse each other's stage.
    descriptor, temporary = tempfile.mkstemp(prefix=f".{target.name}.", suffix=".tmp",
                                             dir=target.parent)
    temp = Path(temporary)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, target)
        temp = None
    finally:
        if temp is not None:
            temp.unlink(missing_ok=True)
