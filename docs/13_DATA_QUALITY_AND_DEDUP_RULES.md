# 13. Data Quality and Dedup Rules

## 数据源原则

- `data/seeds/*.json` 是源数据。
- `next-app/data/*.json` 是前端镜像，使用 `npm run sync:data` 更新。
- 新增工具必须有 source URL。
- 平台型工具没有 GitHub 仓库时，`githubRepo` 留空，不要伪造。

## 去重规则

同一个实体只保留一个主词条，允许多标签/多分类关系后续扩展。

优先级：

1. `id` 必须唯一。
2. `name` 必须唯一，除非是明确不同产品且有别名说明。
3. `githubRepo` 必须唯一。
4. 同一平台在多个场景中出现时，使用场景方案引用，不复制主词条。

## 热度规则

Stars 只代表关注度，不代表质量。推荐指数后续应结合：

- Stars / Forks
- 最近更新时间
- Release 频率
- Issue 关闭情况
- License
- 是否归档
- 风险等级
- 国内可用性

## 风险规则

每个软件、平台、开源项目都应逐步补齐：隐私、版权、商用、许可证、安全、维护、国内可用性。
