# 34 v0.8 更新记录

## 核心目标

把 Aether Radar 从“UI 与数据可继续开发的 MVP 骨架”升级为“规范体系完整、跨工具可交接、可按统一标准继续开发”的项目包。

## 新增文件

- `STANDARDS_INDEX.md`
- `docs/23_MASTER_EXECUTION_SPEC_INDEX.md`
- `docs/24_PRODUCT_EXECUTION_STANDARD.md`
- `docs/25_BRAND_EXECUTION_STANDARD.md`
- `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`
- `docs/27_CONTENT_AND_COPYWRITING_STANDARD.md`
- `docs/28_ENGINEERING_EXECUTION_STANDARD.md`
- `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`
- `docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md`
- `docs/31_RELEASE_AND_COMMERCIAL_OPERATION_STANDARD.md`
- `docs/32_FUTURE_PRODUCT_ROADMAP_AND_EXPANSION_MAP.md`
- `docs/33_V0_8_STANDARDS_AUDIT_REPORT.md`
- `templates/BRAND_PAGE_BRIEF_TEMPLATE.md`
- `templates/ENGINEERING_TASK_SPEC_TEMPLATE.md`
- `next-app/app/standards/page.tsx`
- `static-site/standards.html`

## 更新文件

- `README.md`：更新为 v0.8 规范体系说明。
- `AGENTS.md`：加入 P0.1 规范索引与 v0.8 执行要求。
- `codex/CODEX_START_HERE.md`：加入规范接手顺序和下一阶段开发顺序。
- `codex/MINIMAL_PROMPT_FOR_CODEX.md`：加入规范中心、UI/品牌/数据/安全要求。
- `codex/ACCEPTANCE_CRITERIA.md`：加入规范中心、商用前验收、UI/数据/导出验收。
- `scripts/ten_round_self_check.py`：新增第 13 项规范体系完整性检查。
- `project_manifest.json`：更新为 v0.8。
- `next-app/app/layout.tsx`、`next-app/app/page.tsx`、`next-app/app/sitemap.ts`：加入规范中心入口。
- `static-site/*.html`：加入规范中心导航。

## 自检结果

已通过：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

自检新增第 13 项：`execution standards system exists`。

## 剩余商业化前关键任务

1. 真实 Node 环境运行 `npm install`、`npm run typecheck`、`npm run lint`、`npm run build`。
2. 完成 Excel/XLSX 导出。
3. 完成 API 路由。
4. 完成 MCP Server 原型。
5. 完成 GitHub 指标自动更新。
6. 补充真实数据复核流程和更多种子数据。
7. 法务/隐私/服务条款正式化。
