import { NextResponse } from 'next/server';
import { comparisons, entities, risks, scenarios } from '../../../lib/data';
import { normalizeFormat } from '../../../lib/api';
import { AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const scenarioId = searchParams.get('scenario') ?? scenarios[0]?.id;
  const format = normalizeFormat(searchParams.get('format'), ['json', 'markdown', 'md'], 'json');
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];
  const stackNames = new Set((scenario?.stack ?? []).map((item) => item.toLowerCase()));
  const tools = entities.filter((entity) => stackNames.has(entity.name.toLowerCase()) || stackNames.has(entity.cn.toLowerCase()));
  const payload = {
    generatedAt: new Date().toISOString(),
    version: AETHER_VERSION,
    scenario,
    tools,
    risks,
    comparisons,
    disclaimer: buildDisclaimer('本报告'),
  };

  if (format === 'markdown' || format === 'md') {
    const markdown = `# ${scenario?.name} 选型报告

${scenario?.path}

## 工具组合

${tools.map((tool, index) => `${index + 1}. **${tool.name}**｜热度 ${tool.heatLevel}｜风险 ${tool.riskLevel}\n   - ${tool.summary}\n   - 风险：${tool.riskNote}`).join('\n\n')}

> 使用前请核验官网、许可证、隐私政策、价格和商用条款。
`;
    return new Response(markdown, {
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'content-disposition': 'attachment; filename="aether-selection-report.md"',
      },
    });
  }

  return NextResponse.json(payload, { headers: { 'cache-control': 'public, max-age=300' } });
}
