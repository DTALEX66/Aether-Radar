# Aether Radar / AI 生态雷达

> 当前版本：**v3.0 稳定化商用 MVP / Codex-ready**  
> 日期：2026-06-22  
> v3.0 重点：确定性 Next 构建、API 参数鲁棒化、版本统一、MCP/OpenAPI 对齐、安全响应头、静态站检查、API 合约检查、HTTP 冒烟测试、发布清单与一键验证。

## v3.0 快速验证

```bash
python scripts/verify_v3_0.py
```

完整 Node/Next 验证：

```bash
cd next-app
npm ci --ignore-scripts --no-audit --no-fund
cd ..
bash scripts/verify_v3_0.sh
```

Windows PowerShell：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify_v3_0.ps1
```

详细版本递进见 `docs/51_V1_2_TO_V3_0_VERSION_LEDGER.md`，最终交接见 `docs/52_V3_0_FINAL_HANDOFF.md`。

---


> 版本：v0.8 规范体系强化包  
> 日期：2026-06-21  
> 目标：让 ChatGPT、Codex、Cursor、Claude Code、Cline、VS Code、GitHub Web、Figma AI、Lovart 等工具可以按统一产品、品牌、UI、工程、数据、安全和发布规范继续开发，减少反复解释和低级错误。


## v0.9 当前状态

本版本新增 API 路由、API 文档页、真实预生成 Excel/XLSX 工作簿、本地只读 MCP 原型和 API/MCP/导出执行规范。

新增接入能力：

- `/api/status`
- `/api/entities`
- `/api/search`
- `/api/scenarios`
- `/api/risks`
- `/api/export`
- `/api-docs`
- `next-app/public/exports/aether-radar-export.xlsx`
- `mcp-server/aether-radar-mcp.mjs`

仍需在真实 Node 环境执行 `npm install && npm run build` 后再部署。

## 1. 项目一句话

**AI 生态雷达 / Aether Radar** 是一个面向个人、团队、企业的全链路 AI 工具、平台、开源项目、模型、Agent、插件、工作流、知识库、风险与导出的索引筛选平台。

它不绑定 Codex，也不绑定 Obsidian。它的核心是：

- 发现 AI 工具与平台。
- 理解新兴 AI 词汇。
- 查看 GitHub / 平台热度。
- 查看风险与商用注意事项。
- 按场景生成工具组合。
- 支持 Excel、CSV、JSON、Markdown、Notion、飞书、PDF、API、MCP 等导出与接入方式。
- 持续更新数据。

## 2. 顶层原则

1. 不做单纯 AI 工具导航站。
2. 不只服务 Codex，不只服务 Obsidian。
3. 收录更多可以做，但必须提示风险，让用户自己选择。
4. 全量收录与精选推荐分开。
5. Stars 不是质量，热度必须结合维护、许可证、风险、可用性。
6. 重点做“选型”，不是只做“列表”。
7. 所有跨工具开发必须先检查编码、语法和数据一致性。
8. 新页面必须符合 UI 生成系统、品牌规范和风险提示规范。

## 3. 当前包内已完成

- 产品定位与边界。
- 竞品/灵感调研摘要。
- 全链路信息架构。
- 数据模型与种子数据。
- 风险与信任评分模型。
- 静态 UI 原型，纯 HTML/CSS/JS，可直接预览。
- Next.js + Tailwind MVP 骨架。
- Codex / Coding Agent 执行说明、任务清单、最小 Prompt、验收标准。
- 编码与语法护栏。
- 数据校验与自检脚本。
- 商用化推进清单。
- UI 生成系统：设计令牌、组件注册表、页面蓝图、AI UI 提示词。
- v0.8 规范体系：产品、品牌、UI、内容、工程、数据、安全、发布、未来规划。
- 参考 Excel / Obsidian 原始资料包。

## 4. 接手前必读

按顺序读：

1. `AGENTS.md`
2. `STANDARDS_INDEX.md`
3. `docs/23_MASTER_EXECUTION_SPEC_INDEX.md`
4. `docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md`
5. `docs/28_ENGINEERING_EXECUTION_STANDARD.md`
6. `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`
7. `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`
8. `docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md`

## 5. 必跑检查

从根目录运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

进入 Next.js 后运行：

```bash
cd next-app
npm install
npm run sync:data
npm run typecheck
npm run lint
npm run build
```

当前离线环境无法安装 Node 依赖时，至少必须通过 Python 预检和自检。

## 6. 快速预览静态页面

```bash
cd static-site
python -m http.server 4173
```

打开：

```text
http://127.0.0.1:4173/
```

## 7. 推荐给 Codex 的最小启动指令

复制 `codex/MINIMAL_PROMPT_FOR_CODEX.md` 给 Codex。

## 8. 项目结构

```text
Aether-Radar/
├─ README.md
├─ AGENTS.md
├─ STANDARDS_INDEX.md
├─ codex/                         # 给 Coding Agent 的执行文件
├─ docs/                          # 产品、竞品、数据、UI、风险、品牌、工程、发布规范
├─ static-site/                   # 可直接打开的静态 UI 原型
├─ next-app/                      # Next.js + Tailwind MVP 骨架
├─ data/
│  ├─ raw/                        # 原 Excel / Markdown 知识库包
│  ├─ seeds/                      # JSON/CSV 种子数据，主数据源
│  └─ ui/                         # UI 设计令牌、组件注册表、页面蓝图、提示词
├─ scripts/                       # 数据校验、编码检查、导出、指标更新、自检
├─ templates/                     # 词条/对比/场景/UI/工程任务模板
└─ tests/                         # 验收测试清单
```

## 9. 推荐技术路线

MVP：Next.js + Tailwind + JSON/SQLite 数据源 + 静态导出。  
二阶段：Supabase/Postgres + GitHub API 定时更新 + Meilisearch/Typesense。  
三阶段：Notion/飞书同步 + API + MCP Server + 浏览器插件 + 用户工具栈。  
四阶段：团队空间、企业白名单、权限、审计、付费专业包。

## 10. 当前状态

v0.8 是**规范体系完整、可继续开发、可交接给 Coding Agent 的商业化 MVP 骨架**。它还不是完整可收费 SaaS。正式商用前必须在真实 Node 环境运行 build/typecheck/lint，并接入真实 GitHub 指标更新、数据复核、价格/许可证/隐私政策核验流程。


## v1.0 商用展示版新增能力

v1.0 在 v0.9 的 API / MCP / 导出基础上，继续补齐商用展示版所需的执行能力：

- `/stack`：浏览器本地“我的 AI 工具栈”，支持组合工具、导出 JSON/Markdown、打印 PDF。
- `/report`：场景化选型报告生成器，支持 Markdown 下载和浏览器打印。
- `/admin`：只读数据审核与运营看板，用于字段完整性、低可信来源和高风险关注检查。
- `/deploy`：部署与商用展示路径，覆盖 Vercel、Docker、静态站和 MCP 原型。
- `/api/report`：按场景生成机器可读选型报告。
- `/api/openapi` 与 `/openapi.json`：机器可读 API 规范。
- Dockerfile、docker-compose.yml、vercel.json、GitHub Actions build workflow。

v1.0 仍然不是完整生产 SaaS。生产版还需要账号、权限、在线编辑后台、数据库、支付、审计日志、API Key、监控、隐私政策、服务条款和持续数据复核流程。


## v1.1 Production Hardening

本版本已实际执行并通过：

```bash
cd next-app
npm install --no-audit --no-fund
npm run typecheck
npm run lint
npm run build:ci
```

新增生产化规范：账号角色、数据库 schema、计费/API Key、监控事故响应、隐私条款草案、GitHub 指标更新 Runbook。

新增页面：`/pricing`、`/enterprise`、`/privacy`、`/terms-of-service`。

新增生产检查：

```bash
python scripts/production_readiness_check.py
```
