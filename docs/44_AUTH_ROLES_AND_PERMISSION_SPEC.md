# 账号、角色与权限规范

## 目标

Aether Radar 后续 SaaS / 企业版必须支持多角色、团队协作、API Key、审计日志和数据审核流程。

## 角色模型

| 角色 | 权限 |
|---|---|
| Visitor | 浏览公开工具、词汇、风险说明、部分榜单。 |
| Free User | 收藏工具、创建个人工具栈、导出基础 JSON/CSV/Markdown。 |
| Pro User | 高级筛选、Excel/PDF、完整场景方案、趋势榜、周报。 |
| Team Member | 加入团队工具库、提交评测、查看团队白名单。 |
| Team Admin | 管理成员、审批工具、配置团队风险策略。 |
| Data Reviewer | 审核工具来源、风险、许可证、价格、国内可用性。 |
| System Admin | 系统配置、数据导入、API Key、审计日志、计费配置。 |

## 权限原则

1. 默认最小权限。
2. API Key 只读优先，写入能力必须单独授权。
3. 企业敏感数据默认不进入公开模型。
4. 审核状态必须可追溯。
5. 所有高风险字段修改必须写入审计日志。

## 未来表设计

- users
- teams
- team_members
- roles
- permissions
- api_keys
- audit_logs
- user_stacks
- saved_entities
- review_tasks
