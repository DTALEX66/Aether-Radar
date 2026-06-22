# 12. Agent Handoff Protocol

目标：让 ChatGPT Web、Codex Desktop、Cursor、Claude Code、Cline、VS Code 和 GitHub Web 之间切换时不丢上下文、不破坏编码、不重复设计。

## 每次交接前必须做

1. 从仓库根目录运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
```

2. 如果修改了前端：

```bash
cd next-app
npm run sync:data
npm run typecheck
npm run build
```

3. 记录本轮变更到 `docs/CHANGELOG` 或对应优化日志。

## 新 Agent 接手读取顺序

1. `README.md`
2. `AGENTS.md`
3. `codex/CODEX_START_HERE.md`
4. `docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md`
5. `docs/04_DATA_MODEL.md`
6. `docs/06_UI_UX_SPEC.md`
7. `tests/ACCEPTANCE_TESTS.md`

## 禁止事项

- 禁止从零重做 UI。
- 禁止删除风险提示。
- 禁止只面向 Codex 或 Obsidian。
- 禁止未说明原因就改数据字段。
- 禁止把 `data/raw` 的二进制包当作文本处理。
