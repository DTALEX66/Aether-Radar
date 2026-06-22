# AGENTS.md — Aether Radar Coding Agent Rules

This file is for Codex, Claude Code, Cursor Agent, Cline, Gemini CLI, VS Code agents, GitHub Web editors, and any other coding or UI agent.

## P0.0 — Encoding and syntax first

Before editing or implementing features, run from the repository root:

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

If working inside `next-app`, run:

```bash
npm run sync:data
npm run check:preflight
```

Do not start feature work until these checks pass.

## P0.1 — Read the standards map

Before meaningful changes, read:

1. `STANDARDS_INDEX.md`
2. `docs/23_MASTER_EXECUTION_SPEC_INDEX.md`
3. `docs/28_ENGINEERING_EXECUTION_STANDARD.md`
4. `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`
5. `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`
6. `docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md`

## Project intent

Aether Radar is not a Codex-only tool and not an Obsidian-only knowledge base. It is a platform-neutral, full-chain AI ecosystem radar for discovery, indexing, filtering, risk review, export, integration, and continuous updates.

## Data source priority

1. Use `data/seeds/*.json` as the source of truth.
2. Mirror JSON into `next-app/data/` using `npm run sync:data` from `next-app`.
3. Do not silently redesign fields. Extend fields only with documented migration notes.
4. Keep full collection and curated recommendation separate.
5. Do not add tools without source URLs and risk fields.

## Safety and trust rules

- Stars are popularity signals, not quality guarantees.
- Always keep user choice and risk warnings visible.
- Every software/platform/open-source entity should have source, risk, license/commercial note, China usability, and maintenance status.
- Do not mark unreviewed entities as curated recommendations.
- Do not remove disclaimers from details, risks, comparisons, exports, or legal pages.

## UI rules

- Use the existing static-site and Next.js layout as baseline; do not redesign from zero.
- Read `docs/19_UI_GENERATION_SYSTEM.md`, `docs/20_UI_PAGE_BLUEPRINTS.md`, `docs/21_DESIGN_TOKENS_AND_COMPONENTS.md`, `docs/25_BRAND_EXECUTION_STANDARD.md`, and `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`.
- Reuse `AetherLogo`, `PageHero`, `SectionHeader`, `StatCard`, `UiPromptCard`, `EntityCard`, and `DisclaimerBox` when possible.
- Keep pages readable for non-programmers.
- Keep export options platform-neutral: Excel, CSV, JSON, Markdown, Notion, Feishu, PDF, API, MCP.
- Do not turn the product into a plain logo directory.

## Engineering rules

- Prefer small, focused commits.
- Run preflight after every data, script, UI, or route change.
- Never commit generated `node_modules`, `.next`, or binary exports unless explicitly requested.
- Do not reintroduce `latest` dependencies.
- New pages must update navigation, sitemap if needed, tests, and relevant docs.
- Business logic should live in `next-app/lib`, not duplicated across pages.

## Content rules

- Use clear Chinese explanations with original English names preserved.
- Distinguish fact, platform claim, and manual judgment.
- Use cautious wording: “适合、建议、谨慎、需核验”.
- Never say “绝对安全、一定可商用、全网最强”.

## Release rule

A version is not commercial-ready until:

1. Python self-checks pass.
2. `npm run typecheck`, `npm run lint`, and `npm run build` pass in a real Node environment.
3. Risk and legal pages are accessible.
4. Data has source, review status, and last verified date.
5. Exported files open correctly.


## P0.6 API / MCP / Export Guardrails

任何 Agent 修改接入相关能力前，必须检查：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

新增或修改 API 时必须：

- 保留风险提示和数据快照说明。
- 不把 Stars、收录数量、热度包装成质量保证。
- 不引入写入能力，除非有权限、审计和回滚设计。
- 不让 MCP 默认拥有文件写入、外网调用、登录、购买、部署等高危权限。
- Excel/CSV/Markdown/JSON 导出必须保证中文编码可读。


## P0.6 v1.0 商用展示版接手规则

Coding Agent 接手 v1.0 时必须保持以下页面和能力存在：

- `/stack` 我的工具栈：本地收藏、导出 JSON/Markdown、打印 PDF。
- `/report` 选型报告：场景方案转报告，支持 Markdown 和打印。
- `/admin` 只读审核看板：字段完整性、风险实体、低可信来源。
- `/deploy` 部署说明：Vercel、Docker、静态站、MCP。
- `/api/report`、`/api/openapi`、`/openapi.json`。

禁止把本项目改回普通 AI 导航站。任何新增功能都必须保留风险提示、来源可信度、商用判断、国内可用性和用户自主选择原则。


## v1.1 生产硬化规则

Coding Agent 接手后必须先跑：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/commercial_smoke_test.py
python scripts/production_readiness_check.py
python scripts/ten_round_self_check.py
cd next-app
npm run typecheck
npm run lint
npm run build:ci
```

禁止删除 `package-lock.json`、`eslint.config.mjs`、`database/schema.sql`、`docs/43_PRODUCTION_BUILD_VERIFICATION.md`。
