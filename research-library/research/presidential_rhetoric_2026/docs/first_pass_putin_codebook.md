# FIRST-PASS AUDIT TRAIL: COUNTS NOT FINAL

Read CORRECTION_LOG.md and revision ledgers before use.

# Putin rhetoric coding

Scope: Donald Trump's own words in the parent team's eligible DCPD corpus from 2025-01-20 through 2026-10-12. Supplemental Truth Social source examples are identified separately and cannot be added to a DCPD denominator without expanding all targets' coverage equivalently.

Unit: one presidential record × event date × target. Duplicate publication of the same event is not a new event. A record receives at most one positive flag and one negative flag per target. Multiple passages remain available for audit. Separate targets: `Putin_personal` and `Russia_state_policy`. A general description of war, geography, military/economic size, a meeting schedule, or what was discussed is not evaluative by itself. Reporter questions, other speakers, quoted third-party judgments, metadata, and title mentions are not Trump's evaluative statements.

Polarity: `positive` (at least one affirmed positive assessment and no negative); `negative` (at least one negative and no affirmed positive); `mixed` (both); `neutral` (actual own-word mention/answer with neither).

Positive subtypes: `competence_praise` (smart, capable, strong when explicitly admiring); `moral_or_conduct_praise` (kept his word, honest, generous); `current_affinity` (affirmed present good relationship, liking, mutual respect); `ceremonial_courtesy` (thanks/welcome attached only to a diplomatic encounter); `favorable_intention` (affirmative assertion Putin wants peace or will act constructively). Use ceremonial-only and favorable-intention-only cases transparently in sensitivity analysis; they are weaker evidence than competence or moral praise.

Not current praise: `past_affinity` explicitly contrasted with current disappointment; `reported_niceness` when the point is deception; attributed Putin praise of Trump merely repeated without endorsing Putin; bare claims that Putin respects/fears Trump as a boast about Trump's deterrence rather than a positive judgment of Putin. The present-perfect formulation 'I've always had a good relationship' counts as current affinity unless the same passage clearly withdraws it ('but something happened to him') or frames it as ended. Retain the phrase and an uncertainty note for borderline cases.

Negative severity: `mild_disagreement` (disappointment, not happy, not helping, should act differently); `substantive_condemnation` (needless killing, aggression, dishonesty, responsibility for war); `personal_insult` (crazy, explicit derogatory personal epithet); `coercive_threat` (explicit threatened adverse action with a target or condition). Multiple severity tags can coexist. 'Playing with fire' is an unspecified coercive warning rather than evidence of an enacted policy or a specific military threat. 'Bullshit thrown at us by Putin' is a strong honesty criticism, separately flagged for profane language; it is not a threat of force.

Context: `ceremonial_greeting`, `substantive_evaluation`, `policy_grievance`, `negotiation_expectation`, `neutral_reporting`, `past_affinity`. Policy implementation must be proven independently; statements promising sanctions or weapons do not establish implementation.

## Final field definitions and coverage

- `explicit_praise`: competence praise, direct moral/conduct approval, or explicit praise of Putin's statement (the Alaska 'very profound' comment). This excludes expressed trust about future behavior, favorable intentions, defensive explanations, policy agreement alone, and ceremonial courtesy alone. `strict_praise` is an alias of this field.
- `current_affinity`: a presently affirmed good personal relationship, liking or getting along. A past-tense relationship by itself is not current affinity. A hedged present affirmation ('Probably still do') counts, with an uncertainty note.
- `praise_or_affinity`: logical union of the preceding two fields, the recommended headline positive measure.
- `positive`: a deliberately broader sensitivity measure including favorable intention, favorable defense, expressed trust, policy approval and ceremonial courtesy. Do not label this 'praise' without qualifying the definition.
- `communication_quality`: an affirmed good/great/productive call, meeting or dialogue with Putin. This can be true when the personal evaluation is otherwise neutral. `communication_quality_undercut` marks a favorable call appraisal immediately contrasted with bombing or no results; these should be presented separately. The phrase 'talks nice' alone, when the point is deception, is not communication-quality approval.
- `positive_including_communication`: union of broad positive and communication quality. `positive_including_unqualified_communication` excludes the expressly undercut call-only additions.
- `negative`: explicit dissatisfaction, adverse assessment, condemnation, personal insult or coercive warning about Putin or his conduct. Descriptive mutual dislike alone is neutral; explicit personality criticism, blame or direct rebuke is negative. Some indirect rebukes and warnings have contextual personal/state attribution and are flagged in `coding_uncertainty`.
- Criticism and praise are independently coded; either can coexist in the same record. Categories are not counts of words or individual sentences.

Final screened coverage: 401 Putin/Russia candidate packets from the enumerated DCPD corpus, 243 eligible personal-target record units and 158 exclusions/nonpersonal records; zero pending packets. All 243 are in the main direct/attributed presidential base: 240 Trump_direct and three attributed_Trump_written. Putin personal observations run January 20, 2025 through September 9, 2026; the wider retrieved DCPD corpus reaches September 11, 2026. The intended study cutoff is October 12, 2026, but publication lag means the DCPD text corpus is not complete through that cutoff. This is a census of the defined archived corpus, not all statements in all media.

AI semantic review was performed on the transcript excerpts. Ambiguous cases were checked in expanded excerpts or original full transcripts. Neutral records received a second expanded-context pass, because the original compact ±2-paragraph window could omit follow-up answers. The final audit recovered August 7 and August 25 criticism, and refined October 14 affinity and October 17 mixed appraisal. Source speaker labels were regenerated from source HTML markup, with mixed-speaker paragraphs separately checked. No human review or independent inter-coder reliability estimate is claimed.

DCPD written records that may duplicate original social posts and must be collapsed in a combined corpus: DCPD-202500257 (February 12, 2025), DCPD-202500616 (May 19, 2025), and DCPD-202600328 (May 8, 2026). Repetition of a story at a genuinely different event remains a new record-level statement. Different events on the same date remain separate record units.

Russia-only packets remain in the original packet archive and `putin_exclusions.json`, with screening reasons. They were not coded as Putin-personal neutral observations and do not enter that target's mention denominator. No exhaustive Russia-state sentiment count is asserted.
