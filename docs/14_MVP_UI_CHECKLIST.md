# 14. MVP UI Checklist

## 必须保留的页面

- 首页 `/`
- 工具库 `/tools`
- 工具详情 `/tools/[id]`
- 词汇百科 `/terms`
- GitHub 热榜 `/github`
- 风险中心 `/risks`
- 场景方案 `/scenarios`
- 工具对比 `/compare`
- 导出中心 `/exports`

## 首页

- 明确说明不是 Codex-only / Obsidian-only。
- 展示收录、分类、GitHub 项目、风险维度、导出方式。
- 展示高热工具和场景方案入口。

## 工具库

- 支持关键词搜索。
- 支持分类、热度、风险筛选。
- 支持只看开源、只看本地部署、精选推荐。
- 显示风险提示，不隐藏风险。

## 导出中心

- MVP 必须支持 JSON / CSV / Markdown。
- CSV 需要 UTF-8 BOM，避免 Excel 中文乱码。
- 必须提示用户复核官网、许可证、隐私、价格和商用条款。
