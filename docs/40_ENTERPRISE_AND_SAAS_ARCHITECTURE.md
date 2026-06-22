# 40｜企业版与 SaaS 化架构规划

## 当前 v1.0 架构

- Next.js App Router。
- JSON 种子数据。
- 静态导出文件。
- 只读 API。
- 本地 MCP 原型。
- 浏览器 localStorage 工具栈。

## SaaS 化目标架构

- 前端：Next.js + Tailwind + 组件系统。
- 数据库：Postgres / Supabase。
- 搜索：Meilisearch / Typesense / Postgres Full Text。
- 文件：对象存储用于 XLSX/PDF/Markdown 导出。
- 认证：邮箱、OAuth、企业 SSO。
- 权限：个人、团队、企业、管理员、审核员。
- API：API Key、速率限制、审计日志。
- MCP：只读查询优先，写操作必须人工确认。
- 采集：GitHub API、官方页面、人工审核队列。
- 监控：错误、接口延迟、导出失败、数据过期率。

## 企业版功能

- 企业内部 AI 工具白名单。
- 工具风险审批流。
- 团队工具栈。
- 私有化部署。
- 数据源自定义。
- API/MCP 内网接入。
- 审计日志和导出记录。

## 数据安全原则

- 默认只读。
- 最小权限。
- 敏感数据不进外部 AI 工具。
- MCP Server 默认不执行破坏性动作。
- 所有自动化更新保留来源、时间、版本和审计记录。
