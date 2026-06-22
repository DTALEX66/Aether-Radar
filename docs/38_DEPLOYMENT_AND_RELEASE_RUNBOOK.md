# 38｜部署与发布 Runbook

## 目标

把 Aether Radar 从本地开发包推进到可演示、可交接、可部署的商用展示版。本文不替代生产运维手册，但规定 MVP 到 v1.0 的部署顺序。

## 部署路径

### 1. 静态 UI 预览

```bash
cd static-site
python -m http.server 4173
```

适合无 Node 环境快速检查 UI、信息架构和页面入口。

### 2. Next.js 本地开发

```bash
cd next-app
npm install
npm run dev
```

打开 `http://127.0.0.1:4173`。

### 3. Next.js 构建检查

```bash
cd next-app
npm run sync:data
npm run check:preflight
npm run typecheck
npm run build
```

### 4. Docker 演示部署

```bash
docker compose up --build
```

### 5. Vercel 部署

使用仓库根目录的 `vercel.json`。首次部署前先确认 `next-app/package.json`、`next-app/public/exports`、`data/seeds` 已同步。

## 发布前检查

- 编码与语法检查通过。
- 数据校验通过。
- 自检脚本通过。
- Next.js 构建通过。
- 首页、工具库、详情页、风险中心、场景方案、导出中心、API 文档、工具栈、报告、审核、部署页面可访问。
- `/api/status`、`/api/entities`、`/api/search`、`/api/export`、`/api/report`、`/api/openapi` 可访问。
- 下载文件能打开，中文不乱码。

## 回滚原则

每个版本保留 zip 包和 changelog。出现构建失败或页面中断时，先回退到上一个通过自检的版本，再逐项恢复变更。
