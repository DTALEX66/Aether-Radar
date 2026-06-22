# v0.6 商用化推进清单

> 目标：把 Aether Radar 从可演示 MVP 骨架推进到可公开上线、可持续更新、可收费导出的产品。

## 1. 当前已经具备

- 可搜索、可筛选的工具库。
- 工具详情页，包含热度、风险、来源、商用、价格、许可证、API/MCP、本地部署等字段。
- GitHub 开源热榜页面。
- 风险提示中心。
- 场景方案库。
- 工具对比页。
- 平台收录数量与灵感榜。
- JSON / CSV / Markdown 导出。
- 编码与语法 P0 检查。
- 数据校验、镜像一致性检查、交接协议、CI 预检。
- 免责声明、关于页、数据状态页、robots 和 sitemap。

## 2. 商用前必须继续完成

### P0：上线稳定性

- 在真实 Node 环境执行 `npm install`、`npm run typecheck`、`npm run lint`、`npm run build`。
- 修复所有构建错误和 ESLint 错误。
- 配置生产域名、`NEXT_PUBLIC_SITE_URL`、部署平台和 HTTPS。
- 增加基础错误页、空状态、加载状态和移动端细节测试。

### P1：数据可信度

- 接入 GitHub API 更新 Stars、Forks、Issues、License、Archived、Last Pushed。
- 对平台型工具增加“官网口径 / 第三方口径 / 人工核验”的来源类型。
- 每条数据加 `lastVerifiedAt`、`nextReviewAt`、`reviewStatus`。
- 建立“全量收录”和“精选推荐”两套状态。

### P2：风险与合规

- 许可证风险：MIT / Apache-2.0 / GPL / AGPL / Unknown / Platform Terms。
- 隐私风险：云端上传、本地处理、OAuth、账号权限、企业敏感数据。
- 版权风险：AIGC 图像/视频/声音/模型/LoRA/素材授权。
- Agent 风险：MCP 工具投毒、浏览器 Agent 误操作、自动化越权。
- 增加用户手动确认声明和“自行核验”提示。

### P3：商业闭环

- 付费下载：Excel 完整版、Obsidian/Markdown 包、Notion/飞书模板、PDF 报告。
- 订阅：每周新工具、新开源项目、风险变化、趋势榜。
- 企业版：内部白名单、团队工具栈、权限、审计、私有部署。

## 3. 不建议现在做

- 不要一开始做复杂社区评论。
- 不要马上接支付系统。
- 不要让 AI 自动生成未审核推荐结论。
- 不要把“收录数量”作为唯一卖点。
- 不要把 GitHub Stars 当作质量评级。

## 4. 商用判断

v0.6 可以作为：

- 产品演示 MVP。
- Codex / Claude Code / Cursor 继续开发基础。
- 内部工具选型库原型。
- 付费资料包的内容底座。

v0.6 还不应直接作为完整商用 SaaS 上线，原因：

- Node 构建尚未在当前环境实际执行。
- GitHub 指标仍是静态种子数据。
- 价格、许可证和隐私政策需要真实复核。
- 尚无用户系统、支付、审计和自动更新。
