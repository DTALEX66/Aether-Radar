# 验收标准

## P0 必须通过

- [ ] `python scripts/check_encoding_syntax.py` 通过。
- [ ] `python scripts/validate_data.py` 通过。
- [ ] `python scripts/ten_round_self_check.py` 通过。
- [ ] 真实 Node 环境中 `npm run typecheck` 通过。
- [ ] 真实 Node 环境中 `npm run lint` 通过。
- [ ] 真实 Node 环境中 `npm run build` 通过。

## 产品验收

- [ ] 不是普通 AI 工具导航站。
- [ ] 不只服务 Codex。
- [ ] 不只服务 Obsidian。
- [ ] 全量收录与精选推荐分开。
- [ ] Stars 不被写成质量保证。
- [ ] 风险提示在工具详情、风险中心、对比、导出、法律页可见。

## UI 验收

- [ ] 使用统一 Aether Radar 品牌语言。
- [ ] 使用 PageHero、SectionHeader、EntityCard、StatCard 等统一组件。
- [ ] 页面包含热度、风险、来源、导出/接入信息。
- [ ] 移动端可读。
- [ ] 没有普通 Logo 墙风格。
- [ ] UI 生成系统页面 `/ui` 和 `/ui-generator` 可访问。
- [ ] 规范中心 `/standards` 可访问。

## 数据验收

- [ ] 所有实体 id 唯一。
- [ ] GitHub repo 不重复且格式正确。
- [ ] 软件/平台/项目有 sourceUrl。
- [ ] 软件/平台/项目有 riskLevel、heatLevel、reviewStatus、lastVerifiedAt。
- [ ] data/seeds 与 next-app/data 同步。

## 导出验收

- [ ] JSON 可下载。
- [ ] CSV 可下载且 Excel 打开中文不乱码。
- [ ] Markdown 可下载。
- [ ] 完整 JSON Bundle 包含 entities、categories、terms、scenarios、comparisons、risks、competitors。

## 商用前验收

- [ ] 隐私政策、免责声明、服务条款有明确入口。
- [ ] 价格/许可证/商用字段经过复核。
- [ ] 高风险工具不被默认推荐。
- [ ] 数据状态页显示更新时间和数据覆盖情况。
- [ ] 发布版本有 changelog。
