# 23 总执行规范索引

> 目的：把 Aether Radar 后续所有产品、设计、品牌、内容、开发、数据、安全、发布、商业化规范统一到一个入口，避免 ChatGPT、Codex、Cursor、Claude Code、Cline、Figma AI、Lovart、GitHub Web、VS Code 等工具各自理解、各自发挥。

## 0. 顶层优先级

| 优先级 | 名称 | 必须遵守的文件 | 说明 |
|---|---|---|---|
| P0.0 | 编码与语法护栏 | `docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md` | 所有工具接手前先检查 UTF-8、LF、JSON、Python/TS 语法，避免跨工具损坏。 |
| P0.1 | Agent 交接协议 | `AGENTS.md`、`docs/12_AGENT_HANDOFF_PROTOCOL.md` | 任何 coding agent 不得跳过预检、不得重写产品方向。 |
| P0.2 | 产品定位 | `docs/00_PROJECT_BRIEF.md`、`docs/01_PRODUCT_REQUIREMENTS.md` | 这是全链路 AI 生态选型平台，不是普通导航站。 |
| P0.3 | 数据治理 | `docs/04_DATA_MODEL.md`、`docs/13_DATA_QUALITY_AND_DEDUP_RULES.md`、`docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md` | 数据结构、去重、来源、更新、风险评分必须一致。 |
| P0.4 | 风险与合规 | `docs/05_RISK_AND_TRUST_MODEL.md`、`docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md` | 必须提示风险，让用户自主选择。 |
| P1 | UI/品牌系统 | `docs/19_UI_GENERATION_SYSTEM.md`、`docs/21_DESIGN_TOKENS_AND_COMPONENTS.md`、`docs/25_BRAND_EXECUTION_STANDARD.md`、`docs/26_UI_DESIGN_EXECUTION_STANDARD.md` | UI 不得做成普通工具 Logo 墙。 |
| P1 | 工程规范 | `docs/28_ENGINEERING_EXECUTION_STANDARD.md` | Next.js、数据读取、导出、API、MCP、测试、CI 的落地规则。 |
| P1 | 内容规范 | `docs/27_CONTENT_AND_COPYWRITING_STANDARD.md` | 词条、风险说明、对比结论、免责声明的写法。 |
| P2 | 发布运营 | `docs/31_RELEASE_AND_COMMERCIAL_OPERATION_STANDARD.md` | 上线、版本、付费包、更新、企业版规划。 |
| P2 | 未来路线 | `docs/32_FUTURE_PRODUCT_ROADMAP_AND_EXPANSION_MAP.md` | SaaS、API、MCP、浏览器插件、团队空间、数据服务。 |

## 1. 项目不可偏离原则

1. 不只服务 Codex。
2. 不只服务 Obsidian。
3. 不只做 AI 工具导航。
4. 不只看谁收录更多。
5. Stars 不是质量，必须结合维护、许可证、风险、来源、更新时间。
6. 全量收录与精选推荐必须分开。
7. 风险提示必须前置，最终选择权交给用户。
8. 所有导出和接入能力都应平台中立：Excel、CSV、JSON、Markdown、Notion、飞书、PDF、API、MCP、浏览器插件都可成为出口。

## 2. 规范文件地图

| 领域 | 主文件 | 输出物 |
|---|---|---|
| 产品定位 | `00_PROJECT_BRIEF.md`、`01_PRODUCT_REQUIREMENTS.md`、`24_PRODUCT_EXECUTION_STANDARD.md` | 产品边界、核心用户、MVP、版本路线 |
| 竞品与灵感 | `02_COMPETITOR_RESEARCH.md` | 收录数量榜、竞品差异、参考模式 |
| 信息架构 | `03_INFORMATION_ARCHITECTURE.md` | 导航、页面结构、模块关系 |
| 数据模型 | `04_DATA_MODEL.md`、`29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md` | entity、category、scenario、comparison、risk、competitor 数据 |
| 风险可信 | `05_RISK_AND_TRUST_MODEL.md`、`30_SECURITY_PRIVACY_LEGAL_STANDARD.md` | 风险标签、风险等级、免责声明、商用提示 |
| UI/UX | `06_UI_UX_SPEC.md`、`19_UI_GENERATION_SYSTEM.md`、`20_UI_PAGE_BLUEPRINTS.md`、`21_DESIGN_TOKENS_AND_COMPONENTS.md`、`26_UI_DESIGN_EXECUTION_STANDARD.md` | 视觉语言、页面蓝图、组件、AI UI 提示词 |
| 品牌 | `25_BRAND_EXECUTION_STANDARD.md` | 命名、Logo、色彩、品牌语气、禁止事项 |
| 内容写作 | `27_CONTENT_AND_COPYWRITING_STANDARD.md` | 词条解释、工具评价、风险说明、对比结论 |
| 工程开发 | `28_ENGINEERING_EXECUTION_STANDARD.md` | 代码结构、API、导出、测试、CI、跨工具规则 |
| 发布商业 | `17_COMMERCIAL_READINESS_PLAN.md`、`31_RELEASE_AND_COMMERCIAL_OPERATION_STANDARD.md` | 上线清单、付费包、企业版、版本策略 |
| 未来规划 | `07_ROADMAP.md`、`32_FUTURE_PRODUCT_ROADMAP_AND_EXPANSION_MAP.md` | Phase 0-5、SaaS、数据服务、MCP、插件 |

## 3. 新增功能前必须回答的 8 个问题

1. 这个功能服务哪个用户：普通用户、设计师、开发者、项目经理、企业用户、AI Agent 用户？
2. 它属于哪条链路：发现、理解、筛选、对比、风险、方案、导出、接入、更新？
3. 是否会破坏平台中立？是否过度偏向 Codex、Obsidian 或某一平台？
4. 是否需要新增数据字段？如果需要，是否同步到 seeds、next-app/data、导出、校验脚本？
5. 是否需要风险提示、来源、更新时间、商用判断？
6. UI 是否符合雷达、信任、风险、场景、数据卡片语言？
7. 是否需要导出、API 或 MCP 可读？
8. 是否通过 `python scripts/ten_round_self_check.py`？

## 4. 版本判断标准

| 版本 | 标准 |
|---|---|
| v0.7 | 有 UI 生成系统和专属界面规范。 |
| v0.8 | 有完整执行规范体系，规范可自检。 |
| v0.9 | 有真实构建通过、API 路由、Excel 导出、MCP 草案可运行。 |
| v1.0 | 可公开演示，数据可持续更新，免责声明和风险体系完整。 |
| v1.5 | 有用户收藏、工具栈、周报、Notion/飞书/PDF 导出。 |
| v2.0 | 有 API/MCP 数据服务、企业内部工具库、付费包。 |
