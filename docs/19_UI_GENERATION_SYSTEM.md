# UI 生成系统 v0.7

## 目标

Aether Radar 的 UI 不能像普通 AI 工具导航站。后续使用 Codex、Claude Code、Cursor、Lovart、Figma AI、v0 或其他生成式 UI 工具时，必须基于本项目的数据结构、风险模型和全链路目标生成专属界面。

## 产品视觉关键词

- 雷达：发现工具、扫描风险、追踪热度
- 星图：AI 生态节点和关系网络
- 指挥中心：筛选、对比、导出、接入
- 风险分层：隐私、版权、商用、许可证、安全、维护、国内可用性
- 知识库：词汇解释、场景方案、长期沉淀

## 必须保留的业务信息

1. 工具名称、直译、中文名、分类、类型。
2. 热度、来源可信度、审核状态、最后核验日期。
3. 风险等级、风险标签、风险备注。
4. 是否开源、是否本地部署、国内可用性、商用判断、价格、许可证。
5. API/MCP/导出接入能力。
6. 全量收录与精选推荐分开。
7. 数量不等于质量，用户自行核验。

## 不能做的 UI

- 不能只做 Logo 墙。
- 不能只服务 Codex 或 Obsidian。
- 不能只炫技，不展示风险和来源。
- 不能只追求大屏科技感，牺牲筛选效率。
- 不能让工具卡片变成不可扫读的长表格。

## 生成入口

- 数据令牌：`data/ui/design_tokens.json`
- 组件注册：`data/ui/component_registry.json`
- 页面蓝图：`data/ui/page_blueprints.json`
- 提示词库：`data/ui/ui_prompt_blocks.json`
- Next.js 页面：`/ui`、`/ui-generator`
- 静态页面：`static-site/ui-system.html`
