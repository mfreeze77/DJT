# Inspected integration contracts and ownership

This document records code inspected on 2026-10-12 UTC. The goal is to reuse
existing capabilities while keeping the DJT import and editorial boundary
explicit. Names under **proposed** describe work still required; they are not
advertised upstream APIs.

## 1. Source revisions and readiness

| System | Inspected revision | Reuse established by source inspection | Boundary of this delivery |
| --- | --- | --- | --- |
| [Matter](https://github.com/mfreeze77/matter/tree/be2b652d116f4eab77fc9721ba45f545ddc40e26) | `be2b652d116f4eab77fc9721ba45f545ddc40e26`; `matter-foundation==0.1.0.dev11` | Portable contracts, immutable observations and claims, scoped citations, acceptance history, transactional SQLite, guarded identity correction | Optional DJT adapter exports real Matter observation **inputs**, checked against the installed upstream contract; it makes no Matter writes |
| [V-Flow EXAIS](https://github.com/mfreeze77/v-flow-exais/tree/b94bbf7fba90370d0114fcd17dbd09c66187b085) | `b94bbf7fba90370d0114fcd17dbd09c66187b085` | Stored repository evidence, versioned storyboards, evidence-bound narration, slide/diagram/kinetic/image composition, project history and render services | A DJT research package is not an accepted V-Flow source at this revision; a downstream importer/resolver remains required |
| [EXAIS vector store](https://github.com/mfreeze77/exais_vector_store/tree/9a43f7b706a3f098bcdb2d771bc77c3f3e633613) | `9a43f7b706a3f098bcdb2d771bc77c3f3e633613` | Existing HTTP ingestion, hybrid retrieval, source chunks, context packs, citations, ACL checks and GraphRAG-owned services | Contract mapping and future HTTP client integration; no new search backend, provider call or live store mutation |

Matter was checked from a local pinned checkout and its real package was
installed for the adapter tests. V-Flow and EXAIS contracts were read through
the connected GitHub service at the revisions above. Their application test
suites, external services and video renderers were not run for this work.

Matter declares Apache-2.0 in its
[package metadata](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/pyproject.toml)
and [LICENSE](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/LICENSE).
This adapter imports that dependency; it does not vendor its source. The
inspected EXAIS root has no license file; V-Flow has a `licenses/` directory
for its combined components. These inspections do not establish a blanket
redistribution license for either private project or for their media assets.
Use their owned service boundaries and preserve the existing per-component
notices if a later release includes their code.

## 2. Matter: the actual reusable boundary

### Record and reference semantics

The current wire schema version is `"1.0"`. Twelve core record kinds exist:
`observation`, `occurrence`, `matter`, `claim`, `evidence_relation`,
`association_proposal`, `accepted_association`, `matter_relation`, `judgment`,
`assessment`, `control` and `receipt`. A schema admitting a record kind does
not mean its full lifecycle service has been implemented. In particular,
assessment publication and general transitive invalidation remain backlog
work in the inspected [README](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/README.md).

A reference carries `scope_id`, `namespace`, `record_type` and `id`. A pinned
reference carries exactly one of `revision` or `digest`; immutable core kinds
require a digest. Claim and observation inputs omit `creation_receipt`.
The storage host assigns actual commit receipts and mutable revisions. DJT
must not manufacture those fields to make a proposed import look committed.
The [core schema](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/schemas/core-record.schema.json)
and [storage service](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/docs/storage.md)
are the implementation references.

There is no current exported `SourceReference` class to instantiate. Source
identity is an observation-body object with `namespace`, `event_id` and
optional `revision_id`. Domain entities such as companies are not additional
core kinds. An adapter can use schema-bound subject values and separately
admitted identity records without treating a company name as a global key.

| DJT concept | Current Matter contract | Important constraint |
| --- | --- | --- |
| Retained repository file or acquired primary document | `observation_input.body.content` plus `source_identity` | `content.digest` is SHA-256 of the exact retained source bytes, separate from Matter's normalized record digest |
| Historical event described in a source | `occurred_at` or `occurred_interval` | Exactly one; preserve unknown time when the source does not establish it |
| Publication, acquisition and import time | `source_published_at`, `available_at`, `ingested_at` | They have distinct meanings; a year in a chapter is not an acquisition timestamp |
| Original assertion | `claim_input` submitted through `ClaimService` | Exact subject, namespaced predicate, schema-bound value/qualifiers, applicability, pinned attribution and proposition version |
| Component-specific support or contradiction | `EvidenceRelationService` | Exact claim pin and evidence pin; target the whole claim or an explicitly declared component |
| Source-family dependence | Occurrence/provenance grouping services | Two citations to the same source do not become independent corroboration |
| Corrected assertion | New claim ID with `supersedes` pins | Same subject/predicate, changed proposition version; original claim and branches remain |
| Review of an evidence contribution | `revise_evidence_acceptance` | Revisioned acceptance, host authority and unchanged citation target; no implicit retargeting |
| Durable commands | `SQLiteStore` and prepared service commands | Exact retries, current dependency pins and atomic operation receipts; the host supplies authorization |

Matter's `domain_value` is `{schema, value}`. Its schema descriptor contains
`namespace`, `id`, `version` and `digest`. The core preserves the value but
does not validate the external domain schema or interpret its meaning. DJT
must validate its financial classifications, entity roles, review policies,
capture states and publication dependencies itself. Unknown extensions do
not execute code or grant authority. See the
[portable contract implementation](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/src/matter/contracts.py).

Matter's strict canonical domain rejects floating-point tokens, unsafe
integers, duplicate JSON keys, non-finite values and invalid Unicode. Preserve
financial decimal quantities as explicit decimal strings with currency,
measurement type and uncertainty. Keep the original source bytes independently
so legacy floating values are not silently rounded during adaptation. Its
kind/version-framed digests are defined in
[canonical.md](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/docs/contracts/canonical.md);
do not replace them with a generic JSON hash or claim that DJT serialization
is the same encoding.

### What the included adapter actually does

[`build_matter_candidates`](../djt_evidence/matter_adapter.py) accepts:

```python
build_matter_candidates(package: dict, source_root: Path, observed_at: str) -> dict
```

It reads source files from `package.repository.revision` through the existing
`GitSnapshot`, checks each `origin.sha256`, and creates one uncommitted Matter
observation input per referenced repository file. Multiple ledger rows in one
file map to the same candidate. The result retains each assertion ID, raw
record ID and original locator, marked `locator_validation: not_performed`.
`origin.raw_sha256` remains a separate raw-record/token fingerprint; it is not
substituted for the whole-file source digest.

Every candidate is scoped to `djt:repository_assertions`, uses namespace
`djt.repository`, and carries a versioned `djt:repository_source` extension.
Its `source_identity.revision_id` is the exact repository commit. The explicit
host timestamp supplies `available_at`, proposed `ingested_at` and the
availability check time. Source publication and described occurrence are
unknown. Reuse the original timestamp when reproducing a candidate package.

The adapter verifies the actual installed distribution version, Git commit
provenance, packaged schema hashes and boundary-module hashes. Missing,
unverifiable or mismatched dependencies produce an explicit refusal. It uses
Matter's actual `canonical.source_digest`, `canonical.canonical_bytes`, and
`contracts.schema_for("record")` with the `observation_input` definition.
It contains no fallback Matter implementation.

Install the optional dependency only when using this bridge:

```sh
python -m pip install 'matter-foundation @ git+https://github.com/mfreeze77/matter.git@be2b652d116f4eab77fc9721ba45f545ddc40e26'
```

A clean editable checkout at that exact commit also works. A wheel without
verifiable commit provenance is refused even when its version string matches.
The tests in [test_matter_adapter.py](../tests/test_matter_adapter.py) exercise
the real installed package. When the optional dependency is missing, the
integration class reports a skip rather than a successful integration proof.

The adapter does not interpret a link inside a ledger as acquired evidence.
Reading a DJT file that quotes a judgment establishes those repository bytes;
it does not acquire or authenticate the linked judgment. A host that wants to
persist candidates must save the exact bytes in `FilePayloadStore`, prepare
authorized `ObservationIngestor` commands, commit them through storage and
replace candidate IDs with the resulting actual pins and receipts.

### Citations, review and correction gaps

The shipped `Utf8LineLocatorAdapter` checks retained observation payloads
using an exact URI, exact source digest and one-based inclusive line ranges.
Selected passages require a quotation present in those lines. Whole-artifact
citations explicitly omit a quotation. Missing bytes, a wrong span or an
unsupported coordinate system yield an error. It does not fetch a URL,
validate PDF coordinates or authenticate an external issuer. Those behaviors
need explicit locator adapters. See the
[claims/citation API](https://github.com/mfreeze77/matter/blob/be2b652d116f4eab77fc9721ba45f545ddc40e26/docs/claims.md).

The six relation types are `supports`, `contradicts`, `qualifies`,
`reports_assertion`, `context_only` and `unresolved`. Acceptance states are
`proposed`, `accepted`, `rejected` and `superseded`. Non-proposed acceptance
requires an authority reference; the host must authenticate and authorize it.
An accepted relation is not a blanket declaration that every sentence in a
source or film is established.

Claim correction creates a new immutable assertion and retains all explicit
branches. Existing evidence relations do not move to the corrected claim.
Changed citation wording, a new target component or a different evidence
snapshot needs a new relation. Existing citations can be retired through
acceptance revisions without erasing their history.

Matter emits durable dependency-change notices and implements specific
identity/negative-watch invalidation. Its general assessment invalidation and
queued-delivery cancellation are still planned. Therefore DJT's compiler must
already bind outputs to claim, correction, source, review and capture
fingerprints and refuse stale publication requests. Later Matter integration
can consume those dependencies; it does not remove this release requirement.

### Current DJT publication boundary

The exchange compiler does not manufacture Matter acceptance or a host
authority. `compile_story(..., trusted_review_digests=())` takes the exact
SHA-256 digests of editorial decision records that the host has separately
authenticated. The empty default refuses publication; names, timestamps and
`decision: approve` in a supplied JSON file do not authenticate themselves.
The CLI provides no option to promote self-declared reviews. The host must
review the claim snapshot and the complete set of supporting, qualifying and
contradicting evidence IDs, including source-family limitations.

With `source_root` supplied, validation reproduces the complete original
import from the pinned Git tree. Imported records, meanings, correction
decisions, origin hashes and historical citation edges must remain intact.
Permitted enrichment consists of retained-source bindings, new exact
excerpts/evidence edges, capture records and review records. The unchanged
`package_id` identifies the baseline import; the compiled
`evidence_package_sha256` binds the full enriched exchange. Removing raw rows
and recounting coverage does not satisfy this contract.

Publication also requires every original resolved citation to have an
evaluated evidence relation, at least one supporting exact excerpt, and
successful verification against retained source bytes. This release supports
UTF-8 text selectors. Required publication captures remain blocked until the
separate capture-to-publication binding adapter exists. An available standalone
PDF image manifest does not satisfy that unfinished integration.

Compiled dependency records cover claim and evidence records, source and
acquisition origins, corrections, chapter context files, controlling financial
policy files, captures and separate editorial decision digests. Added,
changed or removed chapter counterevidence/open-question files and changes to
RF-014 trigger renewed review even if the claim wording and JSON correction
sidecar are unchanged. `affected_story` verifies the prior build fingerprint
and complete selection/dependency binding before comparing snapshots. It is
a dependency check, not an authentication service: an external revocation of
review authority requires the host to recompile with its current trust set.
Synthetic positive tests exercise this boundary without approving any actual
DJT research claim.

## 3. EXAIS: reuse its HTTP retrieval and source identity

The inspected native routes are:

```text
POST /api/v1/documents/ingest
POST /api/v1/documents/upload
POST /api/v1/retrieval/search
POST /api/v1/retrieval/context-pack
POST /api/v1/retrieval/answer
```

The authoritative request/response types are in
[`svs_common/schemas.py`](https://github.com/mfreeze77/exais_vector_store/blob/9a43f7b706a3f098bcdb2d771bc77c3f3e633613/packages/svs_common/svs_common/schemas.py),
the runtime in
[`retrieval.py`](https://github.com/mfreeze77/exais_vector_store/blob/9a43f7b706a3f098bcdb2d771bc77c3f3e633613/packages/svs_common/svs_common/retrieval.py),
and the route/identity guidance in
[`docs/API.md`](https://github.com/mfreeze77/exais_vector_store/blob/9a43f7b706a3f098bcdb2d771bc77c3f3e633613/docs/API.md).

| Exact field or behavior | DJT integration rule |
| --- | --- |
| Ingestion `source_identity` | Supply a stable logical-document key; keep it distinct from the citation URL and byte-version hash |
| Ingestion `source_uri` | Human citation location; a changed URL does not automatically create another logical document |
| `SearchRequest.query`, optional `vector_store_id`, `knowledge_base_id`, `retrieval_profile_id`, `mode`, `filters`, `top_k` | Use an explicitly configured DJT store/profile; let EXAIS enforce its tenant and caller boundary |
| `ChunkRecord.id`, `document_id`, nullable `document_version_id` | Preserve all available identifiers; an unversioned result cannot supply a pinned source version by itself |
| `ChunkRecord.text`, `source_uri`, `heading_path`, `page_start`, `page_end`, `metadata` | Retain the returned passage and locator data; do not turn optional page metadata into verified PDF geometry |
| `ChunkRecord.score`, `source` | Retrieval ranking/provenance, not probability that a claim is true |
| `SearchResponse.audit_event_id` | Retain query/audit linkage when provided |
| `ContextPackRequest.max_context_tokens`, `require_citations` | Use the existing context service; carry its declared truncation/context boundary into review |
| `ContextPackResponse.context`, `citations`, `chunks`, `token_estimate`, `audit_event_id` | Keep the actual selected chunks beside their rendered citations; do not persist only synthesized prose |

`ContextCitation` includes chunk/document IDs, citation URL, optional file/page/
heading information, marker/annotation fields and context-expansion relations.
It does not currently include `document_version_id`; retrieve that from the
corresponding `chunks` entry and refuse to invent it when absent. Citation
marker offsets locate markers in generated context, not byte offsets in the
original PDF or source page.

The existing service owns dense/sparse retrieval, fusion, Postgres hydration,
post-retrieval ACL checks, neighbor expansion and GraphRAG access. A DJT adapter
should make HTTP calls and preserve their typed outputs. It should not import
internal database handlers, copy vector-store logic, bypass authorization or
rebuild the user's existing PDF processing client. Retrieved material remains
a candidate for exact-source acquisition and claim review until the required
evidence checks are complete.

## 4. V-Flow: real storyboards, missing research-source adapter

### Current accepted contracts

`vflow repository --bundle FILE --store` consumes
`intent-oil.repo-understanding.v1` through
[`validateRepositoryBundle` and `consumeRepositoryBundle`](https://github.com/mfreeze77/v-flow-exais/blob/b94bbf7fba90370d0114fcd17dbd09c66187b085/packages/studio-server/src/project/repositoryBundle.ts).
It creates `vflow.repository-evidence.v1`. The imported observations are code
modules, functions and classes; relationships are import/call edges. This
format retains repository commit and path/line locations but explicitly lacks
complete captured source bytes. A financial relationship must not be renamed
an import edge to pass that schema.

The real
[`storyboard-v2.schema.json`](https://github.com/mfreeze77/v-flow-exais/blob/b94bbf7fba90370d0114fcd17dbd09c66187b085/packages/project-model/schemas/storyboard-v2.schema.json)
accepts exactly three source alternatives:

| `source.kind` | Required source binding |
| --- | --- |
| `intake` | `intakeId`, `snapshotHash`, `revision`, `dirty`, `title` |
| `repository-evidence` | `evidenceId`, `contentHash`, `url`, `commit`, `storeId`, `title` |
| `listing-evidence` | `evidenceId`, `contentHash`, `url`, `fetchedAt`, `title` |

There is no `research-evidence` alternative at the inspected revision.
The types and grounding implementation are in
[`storyboardV2.ts`](https://github.com/mfreeze77/v-flow-exais/blob/b94bbf7fba90370d0114fcd17dbd09c66187b085/packages/project-model/src/storyboardV2.ts).
The top-level format is `kind: "vflow-storyboard"`, `schemaVersion: 2`, a
monotonic `version`, rational `output.fps`, ordered sections/scenes and
version/hash-bound approval. Scene durations are integer frames. Narration
beats contain `text` and evidence IDs, or an explicit editorial grounding
declaration. Source/slide facts and diagram relationships have separate
grounding checks.

Reuse these existing downstream owners:

| Existing owner | Reusable capability | Required research addition |
| --- | --- | --- |
| `packages/project-model/src/storyboardV2.ts` and matching schema | Versioned source union, narration, scenes, evidence validation | New explicit research source type and a resolver for pinned research claims/evidence |
| `packages/studio-server/src/project/repositoryEvidenceStore.ts` | Stored evidence identity/content-hash pattern | A separate research-evidence store using the DJT package contract |
| [`storyboardStore.ts`](https://github.com/mfreeze77/v-flow-exais/blob/b94bbf7fba90370d0114fcd17dbd09c66187b085/packages/studio-server/src/project/storyboardStore.ts) | Current-source validation, version persistence and approval | Load the research resolver in `versionTwoOptions`; check current controlling interpretations and approval dependencies |
| [`storyboardWorkspace.ts`](https://github.com/mfreeze77/v-flow-exais/blob/b94bbf7fba90370d0114fcd17dbd09c66187b085/packages/studio-server/src/project/storyboardWorkspace.ts) | Evidence listings, review summaries and approval status | Expose research claim/source/capture IDs and limitations through the same review flow |
| `packages/studio-server/src/project/storyboardBuild.ts` | One project journal, scene compilation, assets and script | Build evidence-document scenes and carry exact research pins into project/build provenance |
| Existing image store and kinetic/photo composition | Content-addressed image assets and provenance checks | Admit genuine captured page/crop assets; maintain uncropped context and source-version links |
| Existing rendering/export services | Timelines, narration timing, rendering and output verification | Qualify a real DJT film after the evidence importer is integrated |

The proposed research resolver must distinguish supporting, qualifying,
contradicting and merely reporting evidence. It must reject stale claim
versions, unreviewed facts and missing source/capture dependencies. It should
return a rendering-safe selected package, preserve exclusions in the review
record, and leave style, pacing and voice work to V-Flow's existing owners.
Story approval and evidentiary approval are separate decisions; neither should
be synthesized by renaming the other.

The completion test is an actual integrated film: import a pinned research
package, validate a storyboard with claim-scoped evidence, review it, build
using the existing project services, inspect a real export, then introduce a
controlling correction and show that the previous publication request becomes
stale while its historical evidence package remains readable. A DJT JSON file
passing its own validator does not establish this V-Flow capability.

## 5. Standards alignment for captures and exchange

These are design choices grounded in public primary specifications; the DJT
exchange format does not claim full conformance to every model below.

| Standard/reference | Practical use in DJT | Boundary |
| --- | --- | --- |
| [JSON Schema Draft 2020-12 validation](https://json-schema.org/draft/2020-12/json-schema-validation) | Closed versioned record shapes, required fields and enums, local schema registration | `format` can be annotation-only; enable/check required formats. Cross-record referential integrity, correction graphs, file hashes and editorial policy still require code |
| [W3C Web Annotation Data Model](https://www.w3.org/TR/annotation-model/) | Explicit source resource plus typed selectors; exact quotation with prefix/suffix, text positions and image/fragment selection | Store the source representation/version used. Character, line, byte, PDF-page and pixel coordinates are different units |
| [W3C PROV-DM](https://www.w3.org/TR/prov-dm/) | Separate source entities, capture/extraction activities, responsible agents and derivation/revision links | A provenance relationship documents origin or transformation; it does not prove that a financial assertion is correct |
| [NIST Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | SHA-256 for exact source bytes and independently hashed derivatives | A digest detects byte changes relative to the recorded digest; it does not authenticate an issuer or prove when acquisition occurred |
| [Library of Congress WARC description](https://www.loc.gov/preservation/digital/formats/fdd/fdd000236.shtml) and [IIPC WARC 1.1](https://iipc.github.io/warc-specifications/specifications/warc-format/warc-1.1/) | Optional later web-capture container for response/resource bytes and capture metadata | A screenshot and its hash do not substitute for the underlying response collection; WARC capture is not implemented by this milestone |

A capture adapter should retain the original artifact hash, acquisition
timestamp, page or resource locator, exact excerpt text, page dimensions,
crop geometry, coordinate units, renderer/version, full-page image hash and
crop hash. A crop is a derivative of a named full page, which is a rendering
of a named original source version. For OCR, preserve the original image and
mark text as derived. For media, store time units and the exact recording
version. Failed capture has an explicit state and reason; it does not delete
the underlying evidence or silently become a successful screenshot.

This release's original-byte inventory and source-bound assertions are the
starting boundary. Acquiring primary documents, reviewing their claims,
registering canonical Matter state, and adding V-Flow's research importer are
separate, reviewable integration milestones.
