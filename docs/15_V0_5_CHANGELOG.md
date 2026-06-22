# 15. v0.5 Optimization Changelog

## 本轮重点

1. 加入跨工具编码规范：`.editorconfig`、`.gitattributes`、`.vscode/settings.json`。
2. 加入 `AGENTS.md`，让 Codex、Claude Code、Cursor、Cline 等统一执行规则。
3. 加入 GitHub Actions `preflight.yml`，未来 push/PR 自动检查编码、数据和构建。
4. 加入 `next-app/scripts/sync-seeds.mjs`，防止 `data/seeds` 与 `next-app/data` 漂移。
5. 加强 `validate_data.py`：校验 GitHub 仓库格式、URL、重复 name / repo。
6. 优化 CSV 导出，加入 UTF-8 BOM，降低中文乱码概率。
7. 优化 GitHub 热榜展示分类名和外链安全属性。
8. 增加 Agent 交接协议、数据质量去重规则、MVP UI 检查清单。

## 当前仍需本地/Agent 继续完成

- 真实 `npm install && npm run build`。
- GitHub API 指标自动更新。
- Excel/XLSX 导出。
- Notion/飞书/PDF/API/MCP 后续插件。
- 更完整的价格、License、维护状态和趋势数据。
