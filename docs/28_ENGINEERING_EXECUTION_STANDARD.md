# 28 编程与工程执行规范

## 1. 工程目标

让项目在 ChatGPT Web、Codex Desktop、Cursor、Claude Code、Cline、VS Code、GitHub Actions、本地 Windows/macOS/Linux 环境之间稳定交接、稳定构建、稳定导出。

## 2. 顶层命令

每次接手先运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
```

进入 Next.js 后运行：

```bash
cd next-app
npm run sync:data
npm run typecheck
npm run lint
npm run build
```

如果 Node 依赖未安装，先运行：

```bash
npm install
```

## 3. 目录职责

| 目录 | 职责 |
|---|---|
| `data/seeds/` | 项目主数据源。 |
| `next-app/data/` | 前端数据镜像，必须由 `npm run sync:data` 同步。 |
| `data/ui/` | UI 设计令牌、组件注册、页面蓝图、提示词。 |
| `docs/` | 产品、UI、工程、风险、商业、未来规划规范。 |
| `codex/` | Coding Agent 执行入口。 |
| `scripts/` | Python 数据校验、编码检查、导出、指标更新。 |
| `next-app/` | Next.js MVP。 |
| `static-site/` | 静态 UI 原型。 |
| `templates/` | 新词条、场景、对比、UI 生成模板。 |
| `tests/` | 验收测试清单。 |

## 4. 编码规范

- 所有文本文件使用 UTF-8。
- 换行统一 LF。
- JSON 使用双引号，不允许注释。
- TypeScript 不使用 `any`，确需使用时写注释。
- React 组件优先小组件组合。
- 数据字段不得在组件里临时发明，应先更新数据模型。
- 不能把业务判断硬编码在多个页面，应该收敛到 `lib/data.ts`。

## 5. 前端规范

- Next.js App Router。
- 页面组件放在 `next-app/app/**/page.tsx`。
- 复用组件放在 `next-app/components/`。
- 数据读取和筛选放在 `next-app/lib/data.ts`。
- UI 令牌读取放在 `next-app/lib/ui.ts`。
- 新页面必须加入导航、sitemap、验收清单和 UI 蓝图。

## 6. 数据同步规范

修改 `data/seeds/*.json` 后必须运行：

```bash
cd next-app
npm run sync:data
```

并确认：

```bash
python ../scripts/ten_round_self_check.py
```

通过。

## 7. API 规划规范

后续 API 必须优先实现：

| API | 作用 |
|---|---|
| `/api/entities` | 返回工具/平台/项目列表。 |
| `/api/entities/[id]` | 返回单个实体详情。 |
| `/api/search` | 搜索工具、词汇、场景。 |
| `/api/export/json` | 下载完整 JSON Bundle。 |
| `/api/export/csv` | 下载 CSV。 |
| `/api/risk` | 返回风险分类和高风险实体。 |
| `/api/scenarios` | 返回场景方案。 |

API 输出必须机器可读、字段稳定、带版本号。

## 8. MCP 规划规范

MCP Server 不在 MVP 第一阶段强制完成，但数据结构必须为 MCP 准备。

优先工具：

- `search_ai_tools(query, filters)`
- `get_tool_detail(id)`
- `compare_tools(ids)`
- `get_scenario_plan(scenario)`
- `export_tool_stack(format)`
- `get_risk_guidance(tool_id)`

MCP 输出必须包含风险提示和免责声明，不能只返回推荐结论。

## 9. 测试规范

最低测试：

1. 编码语法检查。
2. 数据校验。
3. 种子数据镜像一致性。
4. TypeScript 类型检查。
5. ESLint。
6. Next build。
7. 导出文件可打开。
8. 页面路由可访问。
9. 搜索筛选可用。
10. 风险提示可见。

## 10. 禁止事项

- 禁止绕过预检直接改代码。
- 禁止把 `latest` 重新加回依赖。
- 禁止在 `next-app/data` 手改数据后忘记同步源数据。
- 禁止删除风险提示和免责声明。
- 禁止为炫酷效果牺牲可读性和筛选效率。
- 禁止把未审核工具标成推荐。
