# 实施任务清单

## P0.0 顶层优先：编码与语法护栏

- [ ] `python scripts/check_encoding_syntax.py` 通过
- [ ] `python scripts/validate_data.py` 通过
- [ ] 所有 JSON 可解析
- [ ] 所有 Python 脚本可编译
- [ ] 运行时页面无 TODO/FIXME 占位
- [ ] 中文内容无乱码、无 `U+FFFD` 替换字符

## P0 必做

- [ ] Next.js 项目可启动
- [ ] 全局布局、导航、首页 Hero、指标卡片
- [ ] 读取 `data/entities.json`、`categories.json`、`terms.json`
- [ ] 工具库页面：搜索、类别筛选、热度筛选、风险筛选、本地部署筛选、开源筛选
- [ ] 工具卡片：名称、直译、中文名、说明、热度、风险、标签、官网按钮
- [ ] 词汇百科页面：术语列表和搜索
- [ ] GitHub 热榜页面：只显示有 githubRepo 的实体；按热度等级+Stars占位排序
- [ ] 风险中心：展示风险分类和每类工具风险提示
- [ ] 场景方案库：展示推荐工具组合、难度、成本、风险、路线
- [ ] 导出中心：导出 JSON、CSV、Markdown
- [ ] 静态数据校验脚本通过

## P1 推荐

- [ ] 工具详情页 `/tools/[id]`
- [ ] 对比页：Dify vs n8n、ComfyUI vs LiblibAI 等
- [ ] 平台收录数量榜
- [ ] 全量收录/精选推荐切换
- [ ] 风险等级颜色标识
- [ ] 更新日志页面
- [ ] GitHub API fetch 脚本，写入 `data/generated/github_metrics.json`

## P2 后续

- [ ] Notion / 飞书导出模板
- [ ] PDF 报告生成
- [ ] 用户收藏/个人工具栈
- [ ] API
- [ ] MCP Server
- [ ] 浏览器插件
- [ ] 定时任务和后台管理
