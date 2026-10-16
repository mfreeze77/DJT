# Official presidential transcript corpus

Snapshot acquired 2026-10-12 UTC. This is an enumerated corpus of all numbered Daily Compilation of Presidential Documents packages in GovInfo's 2025 and 2026 annual sitemaps, as retrieved, not a claim to contain every Trump communication.

## Scope and verified coverage

- Sources: https://www.govinfo.gov/sitemap/DCPD_2025_sitemap.xml and https://www.govinfo.gov/sitemap/DCPD_2026_sitemap.xml
- 2025 index: 1,238 entries, including 1,231 numbered documents and 7 annual supplemental lists.
- 2026 index: 601 entries, including 597 numbered documents and 4 annual supplemental lists.
- All 1,828 numbered packages downloaded successfully. The supplements are not speech events and are excluded.
- 102 records belong to Biden's administration; preserved but excluded from the Trump corpus.
- Trump target window requested: 2025-01-20 through 2026-10-12. Latest available event date in downloaded official records: 2026-09-11. The compilation therefore has a 31-day observed lag. Earlier coverage can also omit remarks not released to the compilation.
- 1,051 candidate personal-communication documents: 729 oral, 322 written. The rest are formal legal or other records.
- Heuristic voice attribution: 729 oral/direct, 252 attributed Trump-written, 33 joint statements, 36 uncertain, and 1 administration readout. The provisional analysis base is 981 direct/attributed records. Semantic review of source context takes precedence over these screening labels.

GovInfo describes CPD as the official compilation of materials released by the White House press secretary and states that event/document dates appear in the headings: https://www.govinfo.gov/help/cpd . Sitemap enumeration documentation: https://www.govinfo.gov/sitemaps .

## Reproducibility

Python standard library only. Run build_corpus.py, repair_metadata.py, extract_packets.py, make_compact_packets.py, validate_corpus.py in that order. Cached sitemaps are deliberately used; deleting them initiates a fresh snapshot, which can change the corpus. Downloaded HTML is reused. The metadata repair pass handles dates embedded in titles or attached directly to a following paragraph. Event dates are taken from document content, not last-modified or ingestion dates.

- html/: exact downloaded source HTML.
- records/: parsed complete texts with original header title, event date and parse method.
- sitemap_manifest.json: enumerated numbered source packages.
- download_provenance.json: source URLs, last-modified metadata, byte counts and SHA-256 hashes.
- corpus_manifest.csv/json: every source package, including excluded records and reasons.
- eligible_corpus.json: candidate communication corpus, including paragraph indices.
- *_packets.json/txt: broad target keyword contexts. *_compact_packets: smaller review aids. putin_personal_only_packets isolates literal Putin references.
- validation.json: coverage and extraction checks.

## Frequency analysis safeguards

Raw keyword hits are discovery aids, never sentiment counts. A reporter's question, a foreign leader's statement, an editorial heading, historic British Empire references, New Mexico, Gulf of Mexico, German shepherds and incidental nationality references must not become Trump evaluations of a contemporary target. Speaker tracking is heuristic, and unusual titles such as 'Sen. Graham' can defeat it. Joint statements and readouts must not be silently attributed to Trump's individual voice.

Code one document-date × exact target. Preserve praise and criticism independently so mixed cases are possible; retain neutral target-mention records. Distinguish Putin personally from Russia, NATO as an institution from individual member states and leaders, and the EU/Europe from NATO. Plain trade policy announcements are not automatically criticism; coercive threats deserve a separate tag. Ceremonial greetings are separately tagged for sensitivity analysis. Aggregate NATO-allies categories include more targets than one country and should not be treated as a directly equal exposure.

Use both target-mention denominators and the common all-record base. Deduplicate syndicated copies and cross-posted written statements by original post identity or canonical text. Truth Social/X coverage is a separate acquisition component; do not pool its records as independent events when they reproduce a DCPD statement. Text-only social archives omit video/image-only speech unless separately transcribed and attributed.

## Specific source QA

DCPD-202500855 (Trump/Putin Anchorage press appearance) has an event heading of August 15, 2025 in the downloaded HTML. The corpus therefore uses 2025-08-15. GovInfo's content-details publication date has been reported as August 18; publication/ingestion dates must not override the event heading. The raw HTML is retained.

GovInfo's sitemap enumeration is complete for the retrieved index. Completeness of the index does not establish completeness of presidential speech or publication coverage through the requested cutoff.

## Source rights

The frozen bundle contains the downloaded DCPD HTML, not third-party archive media. Original source identifiers and hashes are retained. GovInfo's [copyright policy](https://www.govinfo.gov/about/policies) explains that U.S. Government works are generally public domain in the United States, while government publications can also contain copyrighted third-party material. Inclusion here is not a blanket license for quoted third-party content or images. Preserve source attribution and any original rights notices when reusing material.
