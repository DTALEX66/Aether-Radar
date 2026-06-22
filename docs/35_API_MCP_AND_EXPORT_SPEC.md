# 35｜API、MCP 与导出执行规范 v0.9

## 1. 目标

v0.9 的目标是把 Aether Radar 从“可浏览的 AI 工具选型站”推进到“可接入的数据服务”。

必须同时服务三类使用方式：

1. 人看：网页、表格、PDF、静态站。
2. 系统读：JSON、CSV、Excel、API。
3. Agent 调用：MCP、本地查询、企业内部知识库。

## 2. API 原则

- API 必须只读优先，避免无权限写入。
- API 响应必须包含 `meta` 或说明信息，让用户知道数据是否为快照。
- API 不得隐藏风险提示。
- API 不得把 Stars、收录数量、平台热度包装成质量保证。
- 后续商用必须加入认证、速率限制、版本号、审计日志和来源核验状态。

## 3. 已提供 API

| 端点 | 用途 |
|---|---|
| `/api/status` | 数据状态、数量、质量和警告。 |
| `/api/entities` | 工具/平台/项目实体列表，支持搜索、筛选、分页。 |
| `/api/search` | 跨实体、词汇、场景方案搜索。 |
| `/api/scenarios` | 场景方案库。 |
| `/api/risks` | 风险分类和中高风险实体。 |
| `/api/export?format=json` | 完整 JSON Bundle。 |
| `/api/export?format=csv` | CSV 导出，带 UTF-8 BOM。 |
| `/api/export?format=markdown` | Markdown 导出。 |
| `/api/export?format=xlsx` | Excel/XLSX 下载。 |

## 4. API 查询参数

`/api/entities` 支持：

```text
q=
category=
heat=
risk=
sourceConfidence=
openSource=true|false
localDeploy=true|false
curated=true|false
api=true|false
mcp=true|false
sort=heat|risk|name|verified
limit=
offset=
```

## 5. Excel/XLSX 导出规范

Excel 工作簿应包含：

- Dashboard：总览、风险提示、使用说明。
- Entities：实体总表。
- Categories：分类表。
- Risks：风险维度。
- Scenarios：场景方案。
- Comparisons：工具对比。
- Terms：词汇百科。
- Data Dictionary：字段解释。

Excel 文件必须：

- 保持 UTF-8 中文可读。
- 表头清晰。
- 风险和热度字段可筛选。
- 包含来源 URL 或来源说明。
- 明确提示“数据为快照，商用前需复核”。

## 6. MCP 原型规范

MCP Server 位于：

```text
mcp-server/aether-radar-mcp.mjs
```

当前暴露工具：

- `search_entities`
- `get_entity`
- `list_categories`
- `list_risks`
- `list_scenarios`
- `data_status`

当前安全边界：

- 只读。
- 不写文件。
- 不调用外网。
- 不执行第三方命令。
- 不读取用户隐私文件。

企业化前必须增加：

- 认证。
- 权限分级。
- 审计日志。
- 调用速率限制。
- 数据版本签名。
- MCP tool description 安全检查。

## 7. 后续 API / MCP 规划

| 阶段 | 目标 |
|---|---|
| v0.9 | 静态 API、Excel 导出、本地 MCP 只读原型。 |
| v1.0 | 接入真实数据库，支持 API 查询缓存。 |
| v1.1 | 加 API Key、团队空间、调用日志。 |
| v1.2 | MCP Server 标准化配置和发布包。 |
| v1.3 | 浏览器插件和企业内部工具库接入。 |

## 8. 禁止事项

- 不允许 API 省略免责声明。
- 不允许把风险字段删掉只做工具推荐。
- 不允许 MCP 默认拥有写权限。
- 不允许让 Agent 自动购买、登录、提交或部署工具。
- 不允许把未核验数据标成“安全可商用”。
