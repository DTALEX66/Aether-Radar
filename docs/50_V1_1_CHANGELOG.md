# v1.1 Changelog

## 版本定位

v1.1 是 production hardening 版本，重点从“商用展示”推进到“真实可构建、可部署、可继续生产化开发”。

## 关键变化

- 实际执行 `npm install`、`npm run typecheck`、`npm run lint`、`npm run build`。
- 修复 TypeScript 编译错误。
- 升级 Next.js/React 依赖组合，并固定精确版本。
- 增加 ESLint 9 flat config。
- 增加 package-lock，锁定依赖。
- 增加生产化文档：账号权限、数据库、计费、监控、隐私条款、GitHub 指标更新。
- 增加数据库 schema 草案。
- 增加生产就绪检查脚本。

## 仍需生产版继续完成

- 真实登录系统。
- Postgres/Supabase 数据库。
- 在线数据编辑后台。
- Stripe/国内支付。
- 企业权限和审计日志。
- 法律复核后的正式隐私政策与服务条款。
