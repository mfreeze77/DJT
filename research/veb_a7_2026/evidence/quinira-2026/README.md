# Quinira source-review evidence and validation

This directory preserves reviewed, source-linked derivatives and execution records for the five-company financing follow-through. It is not a cache of the entire corporate files or the underlying credit instruments.

## Source coverage

- The five `*-charge-excerpt.html` files contain all displayed charge-table observations and the relevant company header fields from the five original Cyprus responses. Whitespace is normalized. Unrelated addresses, officers, cookies and application state are omitted. These derivatives are **not** the original response bytes. Their hashes, original-response hashes, acquisition methods and exact URLs are in `../../quinira_source_review.json`.
- `ukraine-104052660-native.txt` preserves the complete anonymized decision body, not the original HTML shell or its unacquired certified annexes. It is a native-text derivative, not OCR.
- `recovered_acquisition_logs.json` preserves the previous acquisitions and failures; successful HTTP responses are not automatically successful document acquisition. The HTML/raw artifacts remain identified by repository artifact IDs and hashes. An expired artifact would require an honestly logged reacquisition, not an invented byte match.
- `web_source_review.json` records historical official forms and instructions read through web text and page images. No local byte hash is claimed for those web-only records.
- `toronto_baseline_crosscheck.json` covers only the enumerated native Markdown files and exact queries, not linked PDFs, scans or Library contents.

## Validation scope

Baseline checks preserve all 128 inherited tests at the exact merged main. Final local checks add 16 narrow tests, without removing inherited safeguards. The first final iteration is retained: its sole failure was an exact expected acquisition count still set to 181; appending fourteen reviewed acquisition records required the visible update to 195. No historical classification was weakened to satisfy that test.

`verify_quinira_registry.py RAW_DIRECTORY` is an **optional, read-only original-response parity check**. It requires the original acquired five HTML files and checks their complete hashes and all displayed rows/header fields against the committed review. The local result is recorded separately. CI tests the committed data and derivatives; it does not download corporate records or rerun the raw ICIJ export.

The one-run acquisition/recovery workflows have been retired from the final tree. Their executed code and source artifacts remain in Git history and the action records. No new account, purchase, outreach, permission bypass, unredacted tax image or bank record was added. Final remote-head validation is distinct from historical acquisition and local logs.

The failed iteration’s `06.log.gz` preserves exact output bytes, including whitespace, without adding log-rendering whitespace to the source diff. All other logs are readable text. `validation/local-final/checks.json` identifies the locally checked commit; final remote CI is reported separately.
