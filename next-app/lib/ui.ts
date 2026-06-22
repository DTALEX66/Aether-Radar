import designTokens from '../data/ui/design_tokens.json';
import componentRegistry from '../data/ui/component_registry.json';
import pageBlueprints from '../data/ui/page_blueprints.json';
import uiPromptBlocks from '../data/ui/ui_prompt_blocks.json';

export type DesignTokens = typeof designTokens;
export type UiComponentSpec = (typeof componentRegistry)[number];
export type PageBlueprint = (typeof pageBlueprints)[number];
export type UiPromptBlock = (typeof uiPromptBlocks)[number];

export { designTokens, componentRegistry, pageBlueprints, uiPromptBlocks };

export function getPageBlueprint(route: string) {
  return pageBlueprints.find((page) => page.route === route);
}

export function buildUiPrompt(route: string) {
  const blueprint = getPageBlueprint(route);
  const tokens = designTokens;
  if (!blueprint) return '';
  return [
    `请为 ${tokens.brandName} 生成 ${blueprint.name} 页面 UI。`,
    `产品定位：${tokens.designIntent}`,
    `页面目标：${blueprint.goal}`,
    `布局模块：${blueprint.layout.join(' / ')}`,
    `视觉重点：${blueprint.uiFocus}`,
    `关键词：${tokens.moodKeywords.join('、')}`,
    `主色：${tokens.colors.aetherBlue}，辅色：${tokens.colors.aetherCyan}、${tokens.colors.aetherViolet}，风险色：${tokens.colors.riskRed} / ${tokens.colors.warnOrange} / ${tokens.colors.safeGreen}`,
    '要求：不要做普通导航站；必须体现风险提示、来源可信度、热度、场景方案和多格式导出；中文界面；可交给 Next.js + Tailwind 实现。',
  ].join('\n');
}
