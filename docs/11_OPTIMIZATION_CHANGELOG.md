# 11 优化变更记录 v0.4

## 本轮目标

让 Aether Radar 在交给 Codex / Cursor / Claude Code / Cline 等工具继续开发前，先消除低级阻塞：编码、语法、数据校验、运行时占位页面、导出功能缺口和工具库筛选缺口。

## 已修复

1. 修复 `scripts/validate_data.py` 的字符串换行语法错误。
2. 新增 `scripts/check_encoding_syntax.py`，作为 P0.0 顶层预检脚本。
3. 在 `README.md`、`codex/CODEX_START_HERE.md`、`codex/MINIMAL_PROMPT_FOR_CODEX.md`、`codex/IMPLEMENTATION_TASKS.md`、`codex/ACCEPTANCE_CRITERIA.md`、`tests/ACCEPTANCE_TESTS.md` 中加入编码与语法护栏。
4. 新增 `docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md`，明确跨 ChatGPT 网页版、Codex 桌面版、Cursor、Claude Code、Cline、VS Code、GitHub Web 的交接检查规则。
5. 修复 `next-app/package.json` 中不可用的 `validate:data` 脚本，新增 `check:encoding` 和 `check:preflight`。
6. 补齐 `next-app/data/terms.json`。
7. 扩展 `next-app/lib/data.ts`，加入分类名、热度排序、筛选、CSV/Markdown 导出工具函数。
8. 新增 `EntityExplorer` 客户端筛选组件，实现搜索、分类、热度、风险、开源、本地部署、精选推荐筛选。
9. 新增 `ExportCenter` 客户端导出组件，实现 JSON、CSV、Markdown 下载。
10. 新增 `/terms` AI 词汇百科页面。
11. 新增 `/compare` 工具对比页面。
12. 新增 `/tools/[id]` 工具详情页。
13. 移除运行时页面里的 TODO 占位文案。
14. 顶部导航补齐：工具库、词汇、GitHub 热榜、风险中心、场景方案、对比、导出。
15. 统一文本文件 LF 行尾，减少跨工具 diff 噪音。

## 已验证

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
```

结果：均通过。

## 未完成 / 留给 Coding Agent

1. 因当前容器无法联网安装 Node 依赖，未执行 `npm install` 和 `npm run build`。
2. GitHub Stars / Forks / Issues 仍是脚本草案，后续需接 GitHub API 并写入 `data/generated/github_metrics.json`。
3. Excel/XLSX、Notion、飞书、PDF、API、MCP、浏览器插件仍在规划中。
4. 工具详情页还可继续补截图、价格、许可证、替代品、国内可用性细节。
5. 后续建议引入数据库或搜索引擎前，继续保持 JSON 种子数据作为单一可信源。
