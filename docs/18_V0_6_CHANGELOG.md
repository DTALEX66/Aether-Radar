# v0.6 更新日志

## 产品侧

- 增加平台收录数量与灵感榜页面 `/competitors`。
- 增加关于页 `/about`。
- 增加免责声明页 `/legal`。
- 增加数据状态页 `/status`。
- 首页重构为更接近商业化官网的结构：Hero、数据状态、核心入口、高热工具、场景方案、高风险关注、分类覆盖。
- 工具库增加来源可信度、排序、API 友好、MCP/Agent 相关筛选。
- 工具详情页补齐价格、许可证、商用判断、API/MCP、数据隐私、风险标签、最后核验日期。
- 导出中心增加完整 JSON bundle。

## 数据侧

- 实体数据从 65 条增加到 67 条。
- 补充 `OWASP LLM Top 10` 作为安全风险框架实体。
- 补充 `Notion API` 作为导出接入实体。
- 为所有实体补齐商用化字段：sourceType、sourceConfidence、reviewStatus、pricing、license、commercialUse、dataPrivacy、recommendedFor、riskTags、lastVerifiedAt。
- 清除未使用分类警告。

## 工程侧

- 新增 `robots.ts` 和 `sitemap.ts`。
- 增强 `validate_data.py`，校验商用化字段和来源可信度。
- 增强 `ten_round_self_check.py`，检查新增页面和商用化字段。
- 修复 CSV CRLF 警告，统一 LF。
- 保持 P0 编码与语法检查优先级。
