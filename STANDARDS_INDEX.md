# Aether Radar 标准规范总入口

这个文件是给 ChatGPT、Codex、Cursor、Claude Code、Cline、VS Code、GitHub Web、Figma AI、Lovart 等工具看的总入口。

接手项目前，先读：

1. `AGENTS.md`
2. `README.md`
3. `docs/23_MASTER_EXECUTION_SPEC_INDEX.md`
4. `docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md`
5. `docs/28_ENGINEERING_EXECUTION_STANDARD.md`
6. `docs/26_UI_DESIGN_EXECUTION_STANDARD.md`
7. `docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md`
8. `docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md`

## 顶层原则

- 不只服务 Codex。
- 不只服务 Obsidian。
- 不做普通 AI 工具导航站。
- 收录更多可以做，但必须提示风险。
- 全量收录与精选推荐分开。
- Stars 不是质量。
- 数据要有来源、风险、核验日期。
- 用户自己选择，平台提供透明信息。

## 必跑命令

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```


## v1.0 新增规范入口

- `docs/38_DEPLOYMENT_AND_RELEASE_RUNBOOK.md`：部署、发布和回滚流程。
- `docs/39_V1_0_COMMERCIAL_DEMO_CHECKLIST.md`：商用展示版验收清单。
- `docs/40_ENTERPRISE_AND_SAAS_ARCHITECTURE.md`：企业版与 SaaS 化架构规划。
- `docs/41_REPORT_AND_TOOL_STACK_SPEC.md`：报告生成器与个人工具栈规范。
- `docs/42_V1_0_CHANGELOG.md`：v1.0 变更记录。


## v1.1 生产化规范

- `docs/43_PRODUCTION_BUILD_VERIFICATION.md`：真实构建验证。
- `docs/44_AUTH_ROLES_AND_PERMISSION_SPEC.md`：账号、角色、权限。
- `docs/45_DATABASE_SCHEMA_AND_ADMIN_WORKFLOW.md`：数据库与后台审核。
- `docs/46_BILLING_API_KEY_AND_LIMITS_SPEC.md`：计费、API Key、限制。
- `docs/47_OBSERVABILITY_AND_INCIDENT_RESPONSE.md`：监控与事故响应。
- `docs/48_PRIVACY_TERMS_AND_COMPLIANCE_DRAFT.md`：隐私与条款草案。
- `docs/49_GITHUB_METRICS_UPDATE_RUNBOOK.md`：GitHub 指标更新。
- `docs/50_V1_1_CHANGELOG.md`：v1.1 变更。

## Warehouse consolidation addendum

The following documents preserve useful material absorbed from sibling warehouse projects before cleanup:

- `docs/54_WAREHOUSE_PROJECT_INTEGRATION.md`: keep/absorb/retire decisions and cleanup sequence.
- `docs/55_AGENT_QUALITY_AND_MEMORY_WORKFLOW.md`: agent loop, quality gate, memory workflow, and token discipline.
- `docs/56_KNOWLEDGE_CAPTURE_AND_LEARNING_ROADMAP.md`: future local capture, source diagnostics, learning route, and OCR/translation capture roadmap.
- `data/schemas/capture_event.schema.json`: optional future capture event contract.
- `data/schemas/learning_route.schema.json`: optional future learning route package contract.
- docs/57_PROJECT_ORIENTATION_AND_NEXT_ACTIONS.md: current project map, verification commands, known limitations, and next action order.
