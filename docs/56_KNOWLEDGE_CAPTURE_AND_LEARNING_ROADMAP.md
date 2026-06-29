# Knowledge Capture and Learning Roadmap

Date: 2026-06-29
Status: future capability roadmap
Sources consolidated: Personal-Knowledge-Radar, Lumina-AI, Screen-Translation-Assistant

## Purpose

Aether-Radar can later grow from an AI ecosystem catalog into a local-first research and learning system. This document preserves the useful concepts from the retired projects without importing their whole codebases.

## Product Boundary

Aether remains an AI ecosystem radar first. Capture and learning features must support that mission:

- discover AI tools, platforms, models, agents, workflows, and risks,
- verify source quality and maintenance status,
- compare options for scenarios,
- export reusable knowledge and reports,
- help the user learn and retain selected concepts.

Aether should not become a generic crawler, course platform, translation desktop app, or unsourced learning generator.

## Stage A: Local Knowledge Capture

Imported from Personal-Knowledge-Radar.

Future Aether ingestion sources:

- public URL,
- GitHub repository README/docs,
- local Markdown/text file,
- manual note,
- exported browser/bookmark record,
- optional OCR/translation capture event.

Required fields for every captured source:

```text
source_id
source_type
source_url_or_path
title
captured_at
content_hash
quality_score
risk_level
rights_note
last_verified_at
capture_method
capture_diagnostics
```

Default safety posture:

- local-first storage,
- no automatic login bypass,
- no CAPTCHA or paywall bypass,
- no bulk collection of personal data,
- no automatic upload of raw private documents,
- stop on 401, 403, 407, 429, CAPTCHA, or Cloudflare-style hard blocks unless the user explicitly chooses a diagnostic-only path.

## Stage B: Source Quality Diagnostics

For each source, store diagnostics that can affect whether an Aether entity is trusted.

Recommended scores:

- extractability,
- source fidelity,
- completeness,
- freshness,
- license clarity,
- maintenance signal,
- risk disclosure quality,
- commercial usage clarity.

Low-quality sources should not silently become curated recommendations.

## Stage C: Knowledge Integrity Layer

Imported from Lumina-AI.

Every generated knowledge item should separate fact from interpretation and memory encoding.

Fact layer:

```text
source_text
source_location
extracted_fact
source_type
source_fidelity_score
uncertainty_label
risk_level
requires_human_review
```

Memory or explanation layer:

```text
summary
analogy
memory_prompt
visual_mapping
recall_question
confusion_warning
```

Rules:

- No-source content is never marked verified.
- High-risk domains require visible warnings.
- Memory aids may be vivid, but must explain their mapping back to facts.
- Facts do not change automatically after a user confirms or freezes a learning route.

## Stage D: Learning Route Packages

A route package turns selected Aether concepts into a reusable learning asset.

Minimum route package content:

```text
route_id
title
domain
version
status
nodes
quality_scores
change_summary
created_at
updated_at
```

Route statuses:

```text
draft | confirmed | frozen | revised
```

Confirmed or frozen routes must not be overwritten by automatic generation. Regeneration creates a candidate version that the user accepts or rejects.

## Stage E: Screen / OCR Capture Contract

Imported from Screen-Translation-Assistant as an optional future input contract.

Use cases:

- capture a visible AI tool name from a screen,
- translate a UI label or error message,
- save a snippet as a research note,
- attach a source window/app context to a knowledge item.

Required privacy rule:

- app blacklist and protected-window handling must exist before any screen capture feature becomes active.
- raw screenshots should not be stored by default.
- OCR text is treated as unverified source material.

## Implementation Order

P1:

1. Add `captured_sources` data model draft.
2. Add manual source import for URL/file/note metadata only.
3. Add quality diagnostics fields to entity review workflow.

P2:

1. Add local knowledge source search.
2. Add source-to-entity suggestion workflow.
3. Add learning route package export/import.

P3:

1. Add OCR/translation capture event import.
2. Add optional browser extension or desktop bridge.
3. Add community route preview and review status.

## Related Schemas

- `data/schemas/capture_event.schema.json`
- `data/schemas/learning_route.schema.json`
