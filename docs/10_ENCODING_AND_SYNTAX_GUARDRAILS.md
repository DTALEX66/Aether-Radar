# 10 编码与语法护栏（顶层优先）

## 为什么这是 P0.0

本项目会在 ChatGPT 网页版、Codex 桌面版、Cursor、Claude Code、Cline、VS Code、GitHub Web、Windows PowerShell、macOS/Linux 终端之间频繁切换。跨工具切换最容易出现的问题不是产品设计，而是：

- UTF-8 编码被破坏；
- 中文字符变成乱码或 `U+FFFD`；
- Windows CRLF 与 LF 混用导致 diff 膨胀；
- JSON 少逗号、尾逗号或引号错误；
- Python 脚本出现字符串换行错误；
- Next.js 页面里残留 TODO，占位页被误认为已完成；
- 不同工具自动格式化导致隐藏语法错误。

所以所有 Coding Agent 的第一优先级是：**先跑编码与语法预检，再开发功能。**

## 每次交接前必须运行

在项目根目录运行：

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
```

如果在 `next-app` 目录：

```bash
npm run check:preflight
```

## 脚本检查范围

`check_encoding_syntax.py` 会检查：

- 文本文件是否为 UTF-8；
- 是否包含 NUL 字节；
- 是否包含替换字符 `U+FFFD`；
- JSON 是否可解析；
- Python 是否可编译；
- 运行时页面是否残留 TODO/FIXME；
- 是否存在 CRLF 行尾警告。

`validate_data.py` 会检查：

- `entities.json`、`categories.json`、`terms.json`、`scenarios.json`、`comparisons.json`、`risk_taxonomy.json` 是否可解析；
- entity id 是否重复；
- category 引用是否存在；
- 关键字段是否缺失；
- 风险等级和热度等级是否合法；
- 高风险工具是否有风险说明。

## 编码规范

- 所有文本文件使用 UTF-8，无 BOM。
- 建议统一 LF 行尾。
- JSON 必须标准 JSON，不使用注释或尾逗号。
- Markdown、TS/TSX、JS、CSS、HTML、Python 都必须可被预检脚本读取。
- 中文内容可以保留，但必须保证 UTF-8。

## Codex / Cursor / Claude Code 执行顺序

1. 运行 `python scripts/check_encoding_syntax.py`。
2. 运行 `python scripts/validate_data.py`。
3. 再运行 `npm install` / `npm run dev` / `npm run build`。
4. 每次大改后重复第 1 和第 2 步。
5. 交付前再次运行完整验收清单。

## 失败处理

- 预检失败时，不要继续加功能。
- 先修复编码、JSON、Python 语法、TODO 残留。
- 修复后重新运行预检，直到通过。
