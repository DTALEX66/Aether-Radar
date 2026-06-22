# 监控、日志与事故响应规范

## 监控目标

Aether Radar 未来商业化需要监控：

- 页面可用性
- API 延迟
- API 错误率
- 导出失败率
- 数据更新时间
- GitHub 指标同步状态
- 高风险工具变更
- 登录/权限异常

## 建议工具

- Vercel Analytics / Cloudflare Analytics
- Sentry
- OpenTelemetry
- PostHog
- Supabase Logs
- GitHub Actions Status

## 事件等级

| 等级 | 示例 | 响应 |
|---|---|---|
| P0 | 数据泄露、权限绕过、恶意导出 | 立即下线相关功能，发公告。 |
| P1 | API 大面积失败、构建失败 | 24 小时内修复。 |
| P2 | 单页错误、部分导出失败 | 72 小时内修复。 |
| P3 | 内容过期、字段缺失 | 进入审核队列。 |

## 事故记录模板

- 发生时间
- 影响范围
- 用户影响
- 根因
- 修复动作
- 预防措施
- 负责人
