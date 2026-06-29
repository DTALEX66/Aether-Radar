# Aether Agent Quality and Memory Workflow

Date: 2026-06-29
Status: imported operating policy
Sources consolidated: Skill-Integration, AI-Enhancement-Package

## Purpose

This document converts the useful agent and quality-control rules from the retired warehouse projects into Aether-Radar's own execution workflow.

## Agent Loop

Every meaningful Aether task should follow this loop:

```text
understand goal
-> define acceptance criteria
-> inspect current state
-> make the smallest coherent plan
-> change one scoped area
-> run the smallest useful verification
-> fix failures
-> record durable lessons in project docs
-> repeat until accepted or blocked
```

Stop when:

- acceptance criteria pass,
- human login/payment/secret access is required,
- continuing would risk data loss,
- the environment cannot support the task,
- the user asks to stop.

## Quality Gate

Use this six-layer gate for code and data changes:

| Layer | Check | Aether equivalent |
| --- | --- | --- |
| 0 | Error knowledge | read known issues, release notes, failed checks, and recent docs before editing |
| 1 | Standardize | formatting, lint, typecheck, and JSON/Python syntax checks |
| 2 | De-AI-ify | remove placeholder text, fake completion claims, over-generic names, and repetitive AI boilerplate |
| 3 | Constrain | enforce data schema, API contract, dependency, and architecture boundaries |
| 4 | Inspect | security, privacy, complexity, dead code, broken links, and stale references |
| 5 | Anti-stuck | reproduce failures, classify cause, retry minimally, then record blocked evidence |
| 6 | Project pollution guard | prevent unrelated docs, copied prototypes, generated artifacts, or obsolete project names from entering active scope |

## Required Verification By Change Type

| Change type | Minimum verification |
| --- | --- |
| Data seed or schema | `python scripts/validate_data.py` |
| Encoding-sensitive docs/scripts | `python scripts/check_encoding_syntax.py` |
| UI/page/component | `npm run typecheck`, `npm run lint`, and build when dependencies are available |
| API/export/MCP | API contract check, data validation, and route smoke test |
| Release or commercial readiness | `python scripts/verify_v3_1.py` or newer release verifier |

## Token Discipline

Compress or summarize:

- long install logs,
- repeated build output,
- unrelated diff sections,
- background already captured in docs,
- large generated files.

Do not compress away:

- user requirements,
- acceptance criteria,
- API contracts,
- database migrations,
- security/privacy rules,
- test failure cores,
- permission, secret, network, or dependency errors,
- rollback steps.

## Durable Memory Files

Aether should keep durable memory in project files, not only chat history.

Recommended files when needed:

- `docs/COMMANDS.md` for confirmed commands.
- `docs/ENV_KNOWN_ISSUES.md` for machine, path, runtime, network, and encoding issues.
- `docs/LESSONS_LEARNED.md` for repeated mistakes and fixes.
- `docs/DO_NOT_REPEAT.md` for banned approaches.
- `docs/USER_PREFERENCES.md` for stable user preferences.
- `docs/PLUGIN_KNOWN_ISSUES.md` for plugin and MCP findings.

Record template:

```text
Date | Problem | Cause | Solution | Verification | Avoid next time
```

## Multi-Agent Rules

Use multi-agent work only when tasks can be split by ownership.

- Each agent gets non-overlapping files or modules.
- Agents do not revert sibling changes.
- Merge results through project-level validation.
- Failed checks feed back into the next agent prompt.
- Large feature work is split into DAG tiers: independent tasks first, dependent tasks after.

## Imported Policy Boundary

This workflow replaces the duplicate operating rules from `Skill-Integration` and `AI-Enhancement-Package` for Aether-Radar. Those repositories may be deleted after this document is kept.
