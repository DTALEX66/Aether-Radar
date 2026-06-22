# CODEX_START_HERE

你是本项目的执行型 Coding Agent。不要重新做产品调研，不要大幅改产品定位。请基于本包现有文档、数据、UI 系统和静态原型继续开发。

## 0. 接手顺序

先读：

1. `AGENTS.md`
2. `STANDARDS_INDEX.md`
3. `docs/23_MASTER_EXECUTION_SPEC_INDEX.md`
4. `docs/28_ENGINEERING_EXECUTION_STANDARD.md`
5. `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`
6. `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`

然后运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

## 1. 产品目标

把 `static-site` 和 `next-app` 继续推进成可维护的 Next.js MVP：

- 首页
- AI 工具库
- AI 词汇百科
- GitHub 热榜
- 风险提示中心
- 场景方案库
- 对比页
- 导出中心
- 竞品/收录榜
- UI 系统
- 规范中心
- 关于/法律/状态页

## 2. 优先原则

0. 顶层优先：编码、语法、数据、自检先过。
1. 不重新定义产品方向。
2. 不只围绕 Codex 或 Obsidian。
3. 不做普通 Logo 导航站。
4. 使用 `data/seeds/*.json` 作为初始数据源。
5. 不要重新定义字段，先遵守 `docs/04_DATA_MODEL.md` 和 `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`。
6. UI 必须遵守 `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`。
7. 所有风险提示必须保留。
8. 新功能必须考虑导出/API/MCP 的未来接入。

## 3. 下一阶段开发顺序

1. 在真实 Node 环境跑通：`npm install`、`npm run typecheck`、`npm run lint`、`npm run build`。
2. 修复 build/type/lint 问题，只修运行问题，不重构产品方向。
3. 增加 `/standards` 规范中心页面，展示 v0.8 规范体系。
4. 增加 API 路由：`/api/entities`、`/api/search`、`/api/export/json`。
5. 增加 Excel/XLSX 导出。
6. 增加 GitHub 指标更新脚本实跑和结果缓存。
7. 增加 MCP Server 原型。
8. 增加更多真实种子数据和来源复核。

## 4. 禁止事项

- 不要删除 seed data。
- 不要移除风险提示。
- 不要把所有工具硬编码在组件里。
- 不要只按 GitHub Stars 排名。
- 不要在运行时页面残留 TODO/FIXME。
- 不要提交无法 UTF-8 解码、JSON 无法解析或 Python 无法编译的文件。
- 不要用“绝对安全、一定可商用、最强”等绝对化文案。
