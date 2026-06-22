# 数据库与后台审核工作流规范

## 阶段策略

MVP 阶段使用 JSON/CSV/Excel 作为数据源；SaaS 阶段迁移到 Postgres/Supabase。

## 核心实体

- entities：工具、平台、开源项目、协议、术语型实体。
- categories：分类体系。
- entity_categories：多分类关系。
- risk_scores：风险评分。
- sources：来源与可信度。
- github_metrics：GitHub 指标快照。
- scenarios：场景方案。
- comparisons：工具对比。
- reviews：人工审核记录。
- audit_logs：审计日志。

## 后台审核流程

```text
新工具候选
→ 自动补齐来源/GitHub/官网
→ 数据校验
→ 风险初评
→ 人工复核
→ 精选推荐或全量收录
→ 定期复核
→ 过期/下架/高风险标记
```

## 审核状态

- candidate
- pending_review
- reviewed
- curated
- warning
- deprecated
- removed

## 关键规则

1. 工具可以全量收录，但精选推荐必须经过人工审核。
2. GitHub Stars 不能单独决定推荐指数。
3. 商用前必须检查许可证、隐私政策、价格和服务条款。
4. 国内可用性必须单独标注。
