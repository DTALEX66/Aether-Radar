# 验收测试清单

## P0.0 编码与语法护栏

- [ ] `python scripts/check_encoding_syntax.py` 通过
- [ ] `python scripts/validate_data.py` 通过
- [ ] 所有 JSON 可解析
- [ ] 所有 Python 脚本可编译
- [ ] 运行时页面无 TODO/FIXME 占位
- [ ] 中文内容无乱码、无 `U+FFFD` 替换字符

## 静态页面测试

- [ ] `static-site/index.html` 可打开
- [ ] 首页指标正确显示
- [ ] 搜索 ComfyUI 能跳转到工具库并显示结果
- [ ] 工具库筛选“高风险”能显示 Browser-use、Stagehand、Civitai 等
- [ ] 工具库筛选“开源”和“本地部署”可用
- [ ] GitHub热榜只显示有 githubRepo 的项目
- [ ] 风险中心显示 7 个风险维度
- [ ] 场景方案显示工具组合和风险
- [ ] 导出中心 JSON/CSV/Markdown 可下载

## Next.js 测试

- [ ] `npm install` 成功
- [ ] `npm run dev` 成功
- [ ] 首页能渲染 seed data
- [ ] `/tools` 能显示工具卡片
- [ ] `/github` 能显示GitHub项目
- [ ] `/risks` 能显示风险维度
- [ ] `/scenarios` 能显示场景方案
- [ ] `/exports` 能打开

## 数据测试

- [ ] `python scripts/validate_data.py` 通过
- [ ] entity id 无重复
- [ ] category id 都存在
- [ ] 风险等级不为空
- [ ] 高风险工具有风险备注
- [ ] 官网/来源链接不为空或标记待补充

## 产品测试

- [ ] 文案没有把项目局限在 Codex
- [ ] 文案没有把项目局限在 Obsidian
- [ ] 页面有“数量不等于质量”的提示
- [ ] 页面有“使用前自行核验”的提示


## UI 生成系统验收

- `/ui` 页面存在，能展示设计令牌、组件注册表、页面蓝图和提示词。
- `/ui-generator` 页面存在，能展示页面级和组件级 UI 生成提示词。
- `data/ui/*.json` 与 `next-app/data/ui/*.json` 存在且 UTF-8 / JSON 有效。
- 新 UI 不能删除热度、风险、来源可信度、商用判断、导出接入等核心信息。

## v0.9 API / MCP / Export 验收

必须检查：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

联网 Node 环境还需要：

```bash
cd next-app
npm install
npm run build
```

页面/API 验收：

- `/api-docs` 可打开。
- `/api/status` 返回 JSON。
- `/api/entities?q=dify` 返回实体结果。
- `/api/search?q=本地部署` 返回实体/词汇/场景结果。
- `/api/export?format=csv` 下载 CSV 且 Excel 打开中文不乱码。
- `/api/export?format=xlsx` 能下载 `aether-radar-export.xlsx`。
- `/exports` 页面出现 Excel/XLSX 和 API 端点列表。
- `mcp-server/aether-radar-mcp.mjs` 可通过 MCP stdio 协议响应 `tools/list` 与 `tools/call`。

安全验收：

- API 响应保留风险提示或数据快照说明。
- MCP 原型只读，不写文件、不调用外网、不执行系统命令。
- 不把 GitHub Stars、平台收录数量、热度等级描述为质量保证。


## v1.1 验收

```bash
python scripts/production_readiness_check.py
cd next-app
npm run typecheck
npm run lint
npm run build:ci
```

必须存在：`/pricing`、`/enterprise`、`/privacy`、`/terms-of-service` 页面；必须存在 `database/schema.sql` 和生产化文档 43-50。
