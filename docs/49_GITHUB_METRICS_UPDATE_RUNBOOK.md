# GitHub 指标自动更新 Runbook

## 目标

自动更新开源项目的：

- Stars
- Forks
- Open Issues
- Watchers
- License
- Archived
- Pushed At
- Default Branch

## 当前脚本

```bash
python scripts/github_metrics_fetcher.py
```

当前脚本是安全草案，正式接入前需要配置：

```bash
GITHUB_TOKEN=xxx
```

## 更新频率

| 数据 | 频率 |
|---|---|
| GitHub 指标 | 每日/每周 |
| 平台价格 | 每月 |
| 商用条款 | 每月/重大变更 |
| 隐私政策 | 每月 |
| 高风险工具 | 每周 |

## 不可只看 Stars

热度评分必须综合：

```text
Stars + Forks + 最近更新 + Issue 活跃 + Release + License + Archived + 风险扣分
```
