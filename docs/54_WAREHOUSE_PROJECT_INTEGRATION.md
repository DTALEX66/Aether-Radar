# Warehouse Project Integration Blueprint

Date: 2026-06-29
Status: consolidation plan
Primary repository: Aether-Radar

## Goal

Aether-Radar becomes the single kept product repository. Useful ideas from the other warehouse projects are absorbed as product capabilities, engineering rules, data contracts, and future implementation tasks. The other repositories do not need to be kept as separate active projects after their useful material has been captured here.

## Keep / Absorb / Retire Decision

| Source project | Decision | What Aether keeps | What should not be carried over |
| --- | --- | --- | --- |
| Skill-Integration | Absorb as engineering workflow | Agent operating loop, quality gate model, multi-agent task ownership, project pollution checks | Do not vendor all skill scripts into Aether unless they are maintained as first-class tooling |
| AI-Enhancement-Package | Absorb as operating policy | Token discipline, memory workflow, plugin verification, risk checklist | Do not keep duplicate AGENTS-style rules as another parallel policy source |
| Personal-Knowledge-Radar | Absorb as knowledge ingestion roadmap | Local-first capture, source quality diagnostics, conservative scraping policy, future local knowledge API/MCP bridge | Do not turn Aether into a scraping platform or commit local runtime databases |
| Lumina-AI | Absorb as learning-route roadmap | Knowledge integrity engine, fact/memory separation, route package model, training records | Do not keep the early single-page prototype as an Aether product surface yet |
| Screen-Translation-Assistant | Absorb as optional capture-source contract | OCR block contract, translation history/cache concepts, privacy blacklist, diagnostics event model | Do not move the Tauri desktop app into Aether unless a desktop capture product is explicitly planned |
| Aether-Radar | Keep | Main AI ecosystem radar, data model, risk-first selection, exports, API, MCP, commercial MVP path | Do not dilute it into a generic personal OS |

## Consolidated Product Direction

Aether-Radar should remain a platform-neutral AI ecosystem radar. The absorbed capabilities extend it in three directions:

1. Better agent execution: every Aether development task follows a repeatable agent loop and quality gate.
2. Better knowledge intake: Aether can eventually accept curated URLs, files, repos, and notes as sources for radar entries.
3. Better learning and reuse: Aether can eventually turn selected tools, scenarios, and concepts into verified learning routes.

## Capability Map

| Capability | Source | Aether target area | Priority |
| --- | --- | --- | --- |
| Agent operating loop | Skill-Integration / AI-Enhancement-Package | `docs/55_AGENT_QUALITY_AND_MEMORY_WORKFLOW.md` | P0 |
| Quality defense pipeline | Skill-Integration | `docs/55_AGENT_QUALITY_AND_MEMORY_WORKFLOW.md` | P0 |
| Local knowledge capture | Personal-Knowledge-Radar | `docs/56_KNOWLEDGE_CAPTURE_AND_LEARNING_ROADMAP.md` | P1 |
| Capture safety policy | Personal-Knowledge-Radar | data governance / security standards | P1 |
| Learning route packages | Lumina-AI | `data/schemas/learning_route.schema.json` | P2 |
| Knowledge integrity scoring | Lumina-AI | future entity quality scoring | P2 |
| OCR/translation capture contract | Screen-Translation-Assistant | `data/schemas/capture_event.schema.json` | P3 |

## Integration Rules

- Aether remains the source of truth for product, data, UI, API, and release standards.
- Imported ideas must be rewritten into Aether terms before implementation.
- Do not copy private runtime data, local databases, virtual environments, caches, or generated build artifacts.
- Do not import experimental code paths unless they pass Aether preflight and have a rollback path.
- Any new ingestion feature must preserve source URL, source type, quality score, risk level, and last verified date.
- Any learning-route feature must separate facts from memory encoding.

## Cleanup Sequence

1. Commit or otherwise preserve these integration docs inside Aether-Radar.
2. Confirm Aether preflight still passes.
3. Delete retired sibling repositories from the warehouse folder.
4. Keep only Aether-Radar as the active repository unless a retired project is intentionally revived.

## Recommended Retired Repositories

After this integration note is accepted, the following can be deleted from the warehouse folder:

- `AI-Enhancement-Package`
- `Lumina-AI`
- `Screen-Translation-Assistant`
- `Personal-Knowledge-Radar` if its standalone app is not needed
- `Skill-Integration` if the skills are not installed or maintained separately

If Codex skills from Skill-Integration are actively installed in a real Codex skills directory, keep that installed copy separately from Aether-Radar.
