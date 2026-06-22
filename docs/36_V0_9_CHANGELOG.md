# 36｜v0.9 更新日志

## 版本定位

v0.9 是“可接入能力增强版”。重点把项目从网页 MVP 推进到数据服务 MVP：API、Excel/XLSX、MCP、本地查询、导出规范和自检体系。

## 新增

- 新增 `/api/status`。
- 新增 `/api/entities`。
- 新增 `/api/search`。
- 新增 `/api/scenarios`。
- 新增 `/api/risks`。
- 新增 `/api/export`。
- 新增 `/api-docs` 页面。
- 新增真实预生成 `next-app/public/exports/aether-radar-export.xlsx`。
- 新增 `mcp-server/aether-radar-mcp.mjs`。
- 新增 `mcp-server/README.md`。
- 新增 `docs/35_API_MCP_AND_EXPORT_SPEC.md`。

## 优化

- 导出中心增加 Excel/XLSX 下载。
- 导出中心增加 API 接入端点列表。
- 首页增加 API/MCP 入口。
- 顶部导航增加 API 页面。
- 自检脚本增加 API/MCP/Export 检查。

## 仍待完成

- 真实 Node 依赖安装与 `npm run build`。
- API Key、限流、审计日志。
- 数据库化存储。
- GitHub 指标定时更新。
- Notion / 飞书同步。
- PDF 报告。
- 企业版权限。
