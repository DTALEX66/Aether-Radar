# 设计令牌与组件规范

## 颜色

- 深色文本：#0B1220
- 主蓝：#2563EB
- 青色：#06B6D4
- 紫色：#7C3AED
- 风险红：#DC2626
- 警告橙：#F97316
- 安全绿：#16A34A
- 背景：#F8FAFC
- 卡片：#FFFFFF

## 组件

1. Brand Header：全站导航，保持品牌识别。
2. Radar Hero：用于首页、UI 系统页、生成器页。
3. Data Health Bar：展示数据可信度和核验状态。
4. Entity Card：工具/平台/项目通用卡片。
5. Risk Meter：风险维度可视化。
6. Scenario Flow：场景方案路径。
7. Comparison Table：工具对比页。
8. Export Hub：导出接入中心。
9. UI Prompt Card：AI UI 生成提示词。

## 编程要求

- 优先使用 Tailwind class 和全局 aether-* 辅助类。
- 页面不要重复写复杂 Hero，优先使用 `PageHero`。
- 分区标题优先使用 `SectionHeader`。
- 统计卡优先使用 `StatCard`。
- 品牌标识优先使用 `AetherLogo`。
