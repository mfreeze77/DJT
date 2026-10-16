# Testing selective restraint toward Putin

## Purpose and present status

The testable question is whether Trump criticizes Putin less readily or less severely than comparable people, and more often qualifies or withdraws criticism. Fear of exposure is one possible explanation for that pattern, not an established fact. Rhetoric alone cannot establish that Putin possesses compromising information, that Trump believes he does, or that fear changes Trump's behavior.

This is a proposed research extension, not completed results or an already registered study. It builds on [METHOD.md](METHOD.md) and [CORRECTION_LOG.md](CORRECTION_LOG.md). The initial personal-criticism total was withdrawn; its candidate reclassification is not an exhaustive corrected comparison. Both favorable and adverse language must be reviewed symmetrically. Existing annotations are AI semantic review, without human validation or measured inter-rater reliability.

Use the current shared official coverage window, January 20, 2025 through September 11, 2026. Analyze social posts separately unless event-level duplicates and comparable coverage are resolved. Missing transcripts, untranscribed media and unavailable later social records are missing observations, not silence. This protocol does not classify anyone's leverage or assert any new biographical allegations.

## Separate the explanatory evidence from the outcome

Create a dated, source-linked **exposure evidence ledger** before reviewing comparative rhetoric results. A separate researcher should assemble it using independently sourced records, without inferring leverage from Trump's friendliness or restraint. For every person and period, distinguish:

- Evidence of access to specific nonpublic information, versus allegations of access or ordinary past contact.
- Evidence that the person could disclose or credibly threaten disclosure of it.
- Evidence that Trump knew or believed this at that time. Information becoming public later does not establish earlier knowledge.
- A documented disclosure, threat or change in access, with event date separate from reporting date.
- Contrary evidence, source quality, corroboration and unresolved uncertainty.

Use nominal statuses such as `documented`, `alleged_or_disputed`, `no_documented_evidence_in_search` and `unknown`, separately for each dimension. Record the claim, source, exact supporting passage and limits. These are evidence labels, not a validated numerical leverage score. An allegation is not documentation of the underlying fact; access alone is not proof of coercion.

Call the comparison group **people with no documented exposure leverage in the specified search**, never people proved incapable of exposing him. Apply an equal, recorded source-search procedure to every person and retain uncertain cases separately. If the ledger supplies no independently supported variation, the study can test Putin-specific restraint but cannot estimate an exposure-leverage effect.

Record military, nuclear, economic, legal and electoral power separately. A foreign leader's ability to retaliate against US interests is a competing mechanism, not evidence of personal exposure leverage. Do not search for or publish speculative private material to fill gaps in the ledger.

## Define opportunities before measuring responses

The current communication-by-target mention denominator cannot detect avoidance: a response that declines to name Putin may disappear from it. Add **response opportunities**, selected without regard to whether criticism follows.

1. Primary unit: one complete reporter question that explicitly invites assessment of an identifiable person's conduct, and Trump's complete response. Include refusals, evasions and answers without the person's name. A target mentioned only by the reporter still creates an eligible opportunity. Distinguish that from counting the reporter's accusation as Trump's opinion.
2. Nest consecutive questions and follow-ups on the same incident within one exchange. Retain question-level observations and order; show exchange-level results as a sensitivity. Link exchanges discussing one provocation into an episode so repeated coverage is not treated as independent incidents.
3. Separate units: self-initiated target-directed passages and account-published social posts. Report these separately because choosing to introduce or publish an evaluation is substantively different from responding to a direct question. A lack of a voluntary post is not equivalent to declining a direct question. Account publication does not establish Trump's personal authorship.
4. Build a separate, externally sourced provocation register using a fixed rule for all targets, for example publicly documented personal attacks on Trump, refusals of a stated demand, or challenged conduct raised in questions. Include all qualifying incidents, not just those followed by a striking response. Code type, timing and observable magnitude without pretending unlike harms share a validated severity score.

Re-screen the full official oral corpus and retain complete questions and answers; the existing target packets and short excerpt windows are discovery aids. Record insufficient context and unavailable audio or video explicitly.

## Distinguish format initiation and response

Code three independent axes, at the passage or exchange level rather than assigning one label to an entire press conference:

- **Format:** live press exchange, interview, speech or remarks, prepared written statement, original social post, quote-post or repost, or uncertain. Retain platform separately.
- **Initiation:** direct question, follow-up question, uninvited live topic introduction, prepared topic introduction, voluntary account publication, or unknown. Separately code an identifiable external trigger as present, absent from the documented context, or unknown. Preserve the initiating question or event and whether it names the person, asks about their conduct, or concerns another topic. An original social post can be reactive; a press appearance can include unsolicited remarks. An omitted prompt or edited clip is unknown, not self-initiated.
- **Response:** answers the requested evaluation, partially answers, explicitly declines, evades or redirects, or not applicable. Also flag chosen favorable or adverse additions beyond what the prompt requests, with exact spans and an explanation of that judgment. These flags can coexist with a responsive answer. A broad request for an opinion does not specifically demand either praise or condemnation.

Preserve social provenance: original text versus quoted third-party words, whether Trump endorses the quoted claim, staff-authorship uncertainty, and any identifiable prompt or provocation. Voluntary publication is an observable choice by the account; it is not proof that the thought was spontaneous or personally composed. Similarly, being asked a question does not eliminate the choice to refuse, deflect, add praise or change the subject.

Publish **format × initiation × target** cross-tabs, further stratified by topic, showing criticism, favorable categories, chosen extra praise and response disposition. This makes the user's emphasis on chosen output directly inspectable without arbitrarily weighting an unsolicited compliment as two or three prompted ones. For direct questions, use all eligible opportunities as the denominator. For voluntary output, show counts and rates among all eligible target-directed voluntary communications; also show counts relative to total comparable original output on that channel. Neither is an opportunity-to-criticize denominator. An incident-based publication rate requires the independently selected provocation register and verified channel coverage.

## Choose comparable people and situations

Select the comparator roster and inclusion rules before examining outcome differences. The existing individual Canadian, Mexican and European leader observations are a starting pool, not automatically matched controls. Institutions and countries are separate outcomes; NATO as a whole cannot be compared directly with one individual.

Prioritize foreign heads of government or state in the same role and period. Compare Putin with other powerful adversarial leaders as well as allied leaders where suitable opportunities exist. Domestic critics may supply a secondary comparison for responses to personal attacks, but have different political and diplomatic costs and must not be pooled into the primary estimate.

Match or stratify on information available **before** the response: topic and provocation class, question wording and accusatory premise, public versus private setting, live interview versus prepared text, presence of the target, active negotiation, diplomatic event, and period. Prefer same-event or close-in-time comparable exchanges. Use a prespecified 30-day calendar caliper, with 14- and 60-day sensitivity analyses. Do not force matches between war atrocities and tariff bargaining. Publish unmatched opportunities and imbalance; if common support is absent, report that the desired comparison is not identified.

Account for pre-existing strategic interests, dependence, power, alliance status, ideological affinity and personal history. Distinguish pre-existing affinity from contemporaneous praise, which is an outcome or possible mediator. Do not mechanically control for subsequent negotiations or policy concessions that might themselves result from restraint.

## Practical annotation fields

Keep separate linked tables rather than overwrite the original annotations.

| Table | Minimum fields |
|---|---|
| Source and opportunity | `source_id`, original URL, event and publication dates, channel, `communication_id`, duplicate group, `episode_id`, `exchange_id`, target identity and role, complete prompt and response spans, paragraph indices or timestamps, speaker attribution, missing context |
| Initiation and response | `format`, `initiation_type`, `initiator`, prompt or external-trigger source, question target and topic, `response_disposition`, `volunteered_favorable_addition`, `volunteered_adverse_addition`, supporting spans, quoted or reposted text, endorsement and authorship uncertainty |
| Matching context | Topic, provocation source and date, prompt type and premise, response setting, target present, negotiation stage, pre-response covariates, matching stratum, inclusion or exclusion reason |
| Evaluation | Clear personal or conduct criticism, implicit or ambiguous criticism, claim disagreement, request, conditional warning, state-policy criticism, negotiation frustration; quote and span for each; favorable conduct, affinity, trust, defense, favorable intentions and call quality separately |
| Severity | Mild adverse evaluation, substantive condemnation or accusation, personal insult, explicit threat; separate profanity and threatened consequence; multiple tags allowed; evidentiary confidence and reason |
| Sequence and blame | Ordered negative and favorable spans; explicit qualification, withdrawal, justification or renewed condemnation; same answer versus later response; same subject or unrelated; blame recipient, addition of shared blame versus displacement of prior blame |
| Threat and action | Threat target, demanded condition, instrument, deadline, authority and specificity; implementation source, legal effective date and scope, waiver or reversal; due, not yet due, conditional trigger unmet, partly implemented, implemented, or unverifiable |
| Review | Coder, codebook version, independent initial code, adjudication, uncertainty, revision reason; exposure-ledger link stored separately from the rhetoric coding interface |

Severity categories are operational labels, not equal numerical intervals. Report category distributions. If an ordinal summary is piloted, freeze its anchors before testing and disclose its lack of validation. Do not combine criticism, praise, insults and sanctions into an invented overall score.

## Comparisons to freeze before analysis

Because this corpus and conspicuous examples have already been inspected, analyses of it are exploratory unless a genuinely untouched holdout exists. Timestamp the final protocol and codebook before coding new observations or an untouched holdout; list prior exposure and all deviations. Pilot on a separate development set, then freeze the following choices.

1. **Primary criticism contrast.** Within eligible matched question opportunities, compare the proportion containing a clear negative judgment of the individual or unambiguously their conduct. Report numerator, denominator, matched coverage, absolute percentage-point difference and uncertainty. Separate direct questions from follow-ups; count evasion and refusal in the opportunity denominator but report them as distinct responses. Retain mild criticism; do not silently redefine criticism as insults. Analyze implicit cases separately and in an inclusive sensitivity.
2. **Severity contrast.** Compare the occurrence of substantive condemnation and personal insults across all eligible opportunities, then describe severity among critical responses. Conditioning only on criticism selects different subsets, so that latter comparison is descriptive.
3. **Immediate softening.** Among critical responses, measure explicit qualification, withdrawal or defensive justification later in the same answer or contiguous exchange. Ordinary mixed praise and criticism is not automatically retraction. Preserve order, subject and distance; praise preceding criticism is a separate pattern. Also report the unconditional rate across all opportunities.
4. **Later softening and persistence.** Inspect the next on-topic response within seven calendar days, with 1- and 30-day sensitivities. Report whether criticism is maintained, renewed, explicitly softened or withdrawn. When no subsequent opportunity is observed, mark the sequence right-censored rather than infer persistence or avoidance. Do not attribute changed tone to fear when circumstances or the underlying conduct changed without examining that change.
5. **Blame movement.** Compare explicit movement of responsibility from the initial target to another actor, including Ukraine, allies or domestic opponents where present. Distinguish adding shared responsibility from excusing the initial target. Neutral discussion of another actor is not blame shifting.
6. **Chosen favorable output.** Within matched topics and initiation strata, compare voluntary favorable statements and chosen extra praise inside answers. Distinguish conduct praise, affinity, defense and call quality rather than relabeling all of them praise. Show original social posts by external-trigger status, quote-posts and reposts, prepared statements, and unsolicited live remarks separately, alongside prompted answers. Differences in what gets discussed remain selection effects, even after a rate is calculated.
7. **Threat follow-through.** Analyze specificity and independently verified implementation separately from personal criticism. Verify executive orders, agency notices or other relevant implementation records; statements alone are insufficient. Follow each threat through its stated deadline and trigger. For threats without a deadline, use a declared 30-day observation window and report unresolved cases. Distinguish Trump's authority and choices from legislative or administrative constraints. Enactment does not establish economic effectiveness.

Publish matched-set estimates and individual comparator results before any aggregate. Account for repeated exchanges within communications and episodes; a large number of utterances about one person does not create many independent exposed people. With very few leaders, conventional standard errors or a regression coefficient cannot solve that identification problem. Treat pooled modeling as secondary, show leave-one-comparator-out results, and avoid causal significance claims from small or unmatched samples. Label secondary tests and handle multiplicity explicitly.

Audit direct speech versus attributed writing, shared cutoff versus channel-specific coverage, source gaps, deduplication, strict versus inclusive attribution and ambiguity. Ask two independent coders to review the same held-out sample, concealing the exposure ledger and predictions where possible. Identity cannot realistically be fully blinded. Report agreement by category and adjudicate discrepancies; AI-only agreement is not human validation.

## Feasible extraction and review workflow

1. Freeze a copy of the source manifest and correction ledger. Record codebook version, corpus cutoff and coverage gaps; keep original annotation rows intact.
2. From full official transcripts, identify speaker turns and contiguous questions, follow-ups and Trump responses using source labels. Search questions as well as answers for target aliases and resolved references. Inspect section boundaries and a sample of nonmatching transcripts to find omitted opportunities. Expand every candidate to the complete exchange before coding.
3. Segment unsolicited passages and prepared statements separately. Join social records to provenance and duplication metadata, separating original commentary from quoted or reposted content. Do not classify media-only posts until the relevant content is transcribed and attributed.
4. Create a neutral opportunity inventory with IDs, full source spans and initiation fields before sentiment review. Independently assemble the exposure ledger and external provocation register; use their dated evidence to define eligible comparisons rather than selecting episodes by their rhetorical outcome.
5. Pilot the codebook, freeze it, independently code the holdout, adjudicate disagreements, and retain all revisions. Verify challenging cases against source HTML and available recording. Add chosen-extra-language spans rather than guessing agency from document type.
6. Build and audit matching sets; generate the cross-tabs and prespecified contrasts from reviewed rows. Inspect both numerator and denominator cases, publish exclusions and unmatched strata, and trace policy claims to implementation records. This workflow and the new fields are proposed; they have not yet been run or populated by this document.

## Predictions that could weaken the hypothesis

- Similar restraint toward comparably powerful leaders without documented exposure evidence favors an explanation involving strategic costs or diplomacy.
- Restraint concentrated around negotiations or face-to-face encounters across targets favors a situational explanation.
- Differences that disappear after matching opportunities, or depend on one comparator or coding choice, weaken a general selective-restraint claim.
- Sustained, unqualified criticism and implemented discretionary pressure against Putin despite an independently documented increase in exposure risk would challenge a simple fear-causes-restraint model. A model allowing public toughness as camouflage must state in advance what could falsify it.
- Harsh treatment of other people with independently documented exposure capacity weakens a general exposure-deterrence prediction, although differences in Trump's knowledge and credibility of disclosure still matter.

Other explanations include ideological affinity, authoritarian admiration, reciprocal flattery, bargaining style, audience incentives, prior relationships, issue stakes and news selection. None is established merely because fear is unproven. Their discriminating predictions and evidence should be tested rather than invoked selectively after results appear.

## Minimum evidence for a causal claim

A reliable matched difference establishes an observational pattern. A stronger fear-of-exposure explanation requires independently corroborated evidence that Trump contemporaneously believed consequential disclosure was possible; correct temporal order; and evidence connecting that belief to restraint rather than merely to contact or general affinity. Fear could concern information that was never actually held. Claiming actual exposure leverage additionally requires credible evidence of the information and disclosure capacity; belief and possession must not be conflated.

The most informative extension would examine a plausibly external change in exposure risk, not selected because rhetoric changed, with comparable unaffected targets or episodes, pre-event trends, no simultaneous diplomatic explanation, and robustness to alternative event dates. A pre-post change alone is insufficient. Corroborated contemporaneous records or testimony linking a disclosure threat to a specific decision could provide mechanism evidence; their reliability still needs evaluation.

No amount of phrase counting by itself identifies a hidden motive. The appropriate conclusion may remain: **selective restraint is measurable; whether fear of exposure causes it is unresolved**. Record evidence against the hypothesis as carefully as evidence supporting it.
