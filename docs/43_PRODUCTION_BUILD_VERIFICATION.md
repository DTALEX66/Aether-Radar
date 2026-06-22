# v1.1 真实构建验证记录

> 版本：v1.1 production hardening
> 日期：2026-06-21

## 已实际执行

在联网 Node 环境中，已执行：

```bash
cd next-app
npm install --no-audit --no-fund
npm run typecheck
npm run lint
npm run build:ci
```

## 结果

- `npm run typecheck`：通过。
- `npm run lint`：通过。
- `npm run build`：通过，成功生成 95 个静态/动态路由。
- 已修复 v1.0 中发现的 TypeScript 字符串换行错误。
- 已修复 `app/api/search/route.ts` 中 terms/scenarios 字段引用错误。
- 已将 Next.js 升级到可在当前环境完成构建的版本组合，并补充 ESLint 9 flat config。

## 构建注意事项

如果 `next build` 在某些环境中卡在 page optimization / build traces，可优先使用：

```bash
npm run build:ci
```

Windows PowerShell 可使用：

```powershell
$env:NEXT_TELEMETRY_DISABLED="1"; $env:NEXT_PRIVATE_BUILD_WORKER="1"; npm run build
```

## 不要删除

- `next-app/package-lock.json`
- `next-app/eslint.config.mjs`
- `next-app/next.config.mjs`

这些文件用于跨 Codex / Cursor / VS Code / GitHub Actions 保持依赖和构建一致。
