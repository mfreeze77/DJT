# Implementation roadmap and acceptance gates

This roadmap solidifies the six-wave program in the supplied proposal. The first
delivery implements the inventory, source-preserving exchange, real Matter input
adapter, offline PDF capture, and Chapter 4 review pilot. Completion of those
components does not mean that every historical claim has been adjudicated or that
V-Flow has rendered a film.

## Wave 1 — Inventory and audit

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-001: Pin and inventory the entire repository | Implemented | Git-object scanner, record spans, hashes, classifications, duplicate/collision/link/format audits | Every tracked entry is accounted for; worktree changes and branch movement cannot alter the pinned build |
| DEM-002: Preserve and reconcile every migrated record | Implemented | Raw payload crosswalk, all annual record types, active CSV adapters, quarantine report | No row disappears or acquires an evidence approval; original byte hashes and decoded payloads reproduce |
| DEM-003: Materialize reproducible coverage and chapter selections | Implemented | Full compressed inventory/exchange, human-readable coverage, nine story selections, 58-claim Chapter 4 pilot | Same source/compiler build reproduces outputs; receipt hashes verify; all publication blockers remain visible |

The inventory reports 465 baseline files. There are 32 malformed/blank CSV rows,
including 31 active rows and one archived row; four invalid JSON files; 97 exact
duplicate-file groups; and 106 candidate identifier collision groups. Those are
review queues, not evidence for deleting or automatically merging records.

## Wave 2 — Contracts, identity, and controlling decisions

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-004: Resolve malformed active CSV rows through reviewed sidecars | **Next** | Per-row preimage hash, original cells, proposed column mapping, reason and review identity; no original replacement | All 31 active malformed rows have an explicit disposition; named claims join the typed import only after a reviewed mapping; blank rows remain explicitly blank |
| DEM-005: Admit the generic evidence contracts | Transport implemented; durable host pending | Actual JSON Schema contracts plus real Matter host imports for observations, claims, citations and receipts | Matter stores exact source observations; claims use explicit subject/predicate/value/qualifier schemas; no fabricated receipts or self-approved relationships |
| DEM-006: Establish entity and occurrence crosswalks | Scoped preservation implemented; resolution pending | Reviewed links among annual entity occurrences, jurisdiction identifiers and current crosswalk rows; reversible decision history | Roy Cohn/Yuri Dubinin and KGB/NY entity-ID collisions stay separate; matching names never auto-merge; uncertain dates remain imprecise |
| DEM-007: Complete editorial/correction lifecycle | Sidecar application and dependency checks implemented; host integration pending | Authenticated editorial review receipts, superseding claims, rejected propositions, contradictions and publication eligibility | A stale or revoked review cannot authorize publication; original records and published revisions remain readable; linked dependent work requires renewed review |
| DEM-008: Resolve source-family dependencies | Preserved notes implemented; adjudication pending | Explicit source lineage, common-origin groups and acquisition coverage | FinCEN→CIR→other reporting is not counted as three independent confirmations; repeated mirrors/court recitations retain their lineage |

DEM-004 is the immediate follow-on because silently repairing a comma in a
financial or evidentiary row could change its meaning. A repair sidecar is a
specific, reviewable migration decision. It should be accepted by a new adapter
using the exact original row digest, not an editable heuristic that shifts cells
until the count matches. The 337 well-formed chapter rows already have a useful
working path while these cases are reviewed.

## Wave 3 — Historical backfill and financial meaning

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-009: Backfill all annual observations into Matter | Exchange import implemented; accepted Matter claims pending | 631 annual domain records plus original metadata and source citations | Counts reconcile by type; no original record discarded; accepted identities and claims require explicit decisions |
| DEM-010: Migrate chapters, tranches, archives and additional prose | Active CSV and source-section import implemented; prose extraction pending | Source-bound claim candidates from 39 tranches and 59 raw Markdown files, with duplicate/version dispositions | Every source passage is accounted for or explicitly queued; summaries are navigation, original passages remain the authority |
| DEM-011: Introduce approved financial measures and aggregation | Conservative transport implemented; aggregation pending | Typed measure/amount/currency/roles/economic-event/overlap model and per-total policy | Price≠payment; commitment≠advance; assignment≠cash; holding≠settlement; CAD/USD/RUB never combine silently; components never add to their enclosing total |
| DEM-012: Apply all corrections to cross-topic evidence | Existing Toronto sidecar applied; broader reconciliation pending | Linked replacement/superseded claims across chapters, original annual entries and financial tranches | RF-014, legacy $100m, relationship qualifications and acquisition limits survive every adapter and downstream selection |

An accepted financial policy must be able to describe the same amount from
different sources without double-counting it. Its key is the economic observation
and measurement scope, not the source file or appearance in a chapter. A court's
account of a payment and a bank statement of a credit are different evidence
observations even when a reviewed identity decision relates them to one payment.

## Wave 4 — Source retention, excerpts, and captures

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-013: Retain the pilot's accessible original source bytes | Pending | Source versions, acquisition events, exact content hashes, storage locators and selective-review scope | Match the recorded S17/S18/S71 versions where available; changed hashes create new versions; blocked acquisition remains blocked |
| DEM-014: Bind exact PDF excerpts and page regions | Offline capture implemented; publication binding pending | Versioned extraction output, PDF physical page, printed label, quote/offset/geometry and full-page/crop linkage | Text and image selectors open the same cited passage; OCR/manual corrections are explicit derivatives; no complete-corpus claim from native-text-only search |
| DEM-015: Capture webpages and time-based media | Pending | Original response/archive or recording; full contextual image; separate crop/highlight; timestamped transcript selectors | Final URL/status/headers/time/version preserved; screenshots never stand in for missing original source content; video timestamps and transcript revisions match |
| DEM-016: Publish rights and access decisions | Pending | Per-source/derivative retention, private/public eligibility and redaction policy | Existing tax redactions remain; image crop does not remove material context; generated captions never claim missing source text |

Source acquisition follows the explicit access boundary recorded in research.
The migration does not order company records, contact custodians, buy documents,
or assume an existing registry index entry is the underlying executed instrument.
PR #29's pending original-record work remains independent until reviewed and
merged. It can be inventoried at its own pinned head without becoming accepted
main evidence.

## Wave 5 — Real V-Flow research ingestion

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-017: Implement the V-Flow research source type | Contract gap identified; implementation pending in V-Flow | Proposed `research-evidence` source union and versioned research-package importer/resolver | Valid package imported into V-Flow's project/history ownership; unsupported schema/version, missing references and changed hashes refused |
| DEM-018: Bind authored narration and visuals to approved claims | Pending | Per-line/per-scene claim references, required qualifications and evidence scenes | Script editing cannot silently exceed source approval; allegations remain attributed; financial labels retain exact measure/currency |
| DEM-019: Render and qualify the real pilot | Pending | A reviewed short film, project bundle, render receipt, source-open actions and capture examples | Actual final render inspected; source cards open correct versions; changed source/review invalidates regeneration; film artifacts retain original evidence revision |

The existing `repository-evidence` importer in V-Flow is designed for code
repositories and call/module evidence. It should be reused for infrastructure
patterns, not repurposed by placing political assertions into call-graph fields.
The approved `research-evidence` consumer must preserve V-Flow's existing project
journal and revision controls. Narration remains user/agent authored through the
existing input flow; this migration does not add a mandatory writing-provider key.

The first render acceptance should be a short, source-complete subset of the
58-claim review collection, not an automatic 58-scene documentary. Choose the
subset after original evidence and editorial review are ready. Record exclusions
and unavailable images so that shortening a film does not hide material context.

## Wave 6 — Chapter rollout and visualizer transition

| Ticket | Status | Deliverable | Acceptance |
| --- | --- | --- | --- |
| DEM-020: Roll out accepted chapter and thematic collections | Nine review selections implemented; accepted collections pending | Chapter manifests plus Toronto, offshore ownership, financial timeline and other cross-topic selections | One claim/source version is reused across stories; no copied independent fact stores |
| DEM-021: Replace both legacy loader paths with compiled views | Pending | One validated data path, dynamic chapter/year availability, scoped entity keys and reviewed financial projections | Main app and DataLoader agree; correction sidecar cannot be bypassed; missing-data state is explicit; no dummy evidence; no raw-money total |
| DEM-022: Add production update and correction operations | Pending | Incremental inventory, candidate ingestion, review queue, rebuild/staleness reporting and edition notices | Changes identify affected scenes/films; old outputs reproducible; no unreviewed mutation publishes itself |

## Required end-to-end completion demonstration

The program is complete only after a real accepted source→Matter→review→V-Flow
render has been executed and inspected. The demonstration must include:

1. A source with exact bytes, a stable version, an excerpt and a readable full-page
   capture/crop; every claim selector opens the actual retained evidence.
2. Two unrelated entities with a reused legacy ID that remain separate, and a
   separately reviewed real identity link that survives an undo/split workflow.
3. A supported assertion, a properly attributed allegation, an unresolved lead,
   material counterevidence, and a superseding correction.
4. Financial observations whose differing currencies, meanings or overlap prevent
   an invalid total; only explicitly approved paid cash can animate as a flow.
5. A reviewable story package, an actual V-Flow project/render, and reproducible
   evidence/script/project version pins.
6. A controlled correction that marks affected scenes and prior editions for
   review while preserving their exact original evidence snapshots.

The first delivery is deliberately useful before those later gates: its inventory,
typed candidates, correction-aware review, capture tool and coverage queue allow
research and implementation to continue with explicit evidence boundaries.
