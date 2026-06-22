# v0.7 更新记录

## 核心变化

v0.7 加入 UI 生成系统，把专属 UI 设计、页面蓝图、组件规范和 AI 生成提示词纳入项目主链路。

## 新增内容

- `data/ui/design_tokens.json`
- `data/ui/component_registry.json`
- `data/ui/page_blueprints.json`
- `data/ui/ui_prompt_blocks.json`
- `next-app/app/ui/page.tsx`
- `next-app/app/ui-generator/page.tsx`
- `next-app/lib/ui.ts`
- `next-app/components/AetherLogo.tsx`
- `next-app/components/PageHero.tsx`
- `next-app/components/SectionHeader.tsx`
- `next-app/components/StatCard.tsx`
- `next-app/components/UiPromptCard.tsx`
- `static-site/ui-system.html`
- `templates/UI_GENERATION_MASTER_PROMPT.md`
- `templates/UI_PAGE_SPEC_TEMPLATE.md`
- `templates/UI_REVIEW_CHECKLIST.md`

## 目的

让后续 Codex 不再从零设计 UI，而是根据本项目的 UI 系统继续实现页面和组件。
