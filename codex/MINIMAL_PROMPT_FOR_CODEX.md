请先阅读 `AGENTS.md`、`STANDARDS_INDEX.md`、`docs/23_MASTER_EXECUTION_SPEC_INDEX.md`、`docs/28_ENGINEERING_EXECUTION_STANDARD.md`、`docs/26_UI_DESIGN_EXECUTION_STANDARD.md`，然后基于 `next-app` 和 `static-site` 继续完成 Aether Radar MVP。

先运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

目标：实现一个 Next.js + Tailwind 的 AI 全链路生态选型平台，页面包括：首页、工具库、词汇百科、GitHub 热榜、风险中心、场景方案、工具对比、竞品收录榜、导出中心、UI 系统、规范中心、关于、法律、数据状态。

数据源：优先使用 `data/seeds/*.json`，不要重新设计字段；修改后运行 `cd next-app && npm run sync:data`。

要求：

1. 搜索与分类筛选可用。
2. 工具卡片显示：名称、直译、类别、热度、风险、是否开源、是否本地部署、国内可用性、来源可信度。
3. 支持全量收录/精选推荐两种视角。
4. 风险提示中心必须保留隐私、版权、商用、许可证、安全、维护、国内可用性等风险维度。
5. 导出中心至少支持 JSON/CSV/Markdown，下一步补 Excel/XLSX。
6. UI 参考 `static-site` 和 `data/ui/*` 的布局，不要从零设计。
7. 新页面必须遵守 `docs/26_UI_DESIGN_EXECUTION_STANDARD.md` 和 `docs/25_BRAND_EXECUTION_STANDARD.md`。
8. 完成后运行 `tests/ACCEPTANCE_TESTS.md` 的检查。
9. 不要把项目局限为 Codex 工具库或 Obsidian 知识库。
10. 不要移除风险、免责声明、来源和核验日期。
