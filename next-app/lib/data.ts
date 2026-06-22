import entities from '../data/entities.json';
import categories from '../data/categories.json';
import scenarios from '../data/scenarios.json';
import risks from '../data/risk_taxonomy.json';
import terms from '../data/terms.json';
import comparisons from '../data/comparisons.json';
import competitors from '../data/competitors.json';

export type Entity = (typeof entities)[number];
export type Category = (typeof categories)[number];
export type Scenario = (typeof scenarios)[number];
export type RiskTaxonomy = (typeof risks)[number];
export type Term = (typeof terms)[number];
export type Comparison = (typeof comparisons)[number];
export type Competitor = (typeof competitors)[number];
export type SortMode = 'heat' | 'risk' | 'name' | 'verified';

export { entities, categories, scenarios, risks, terms, comparisons, competitors };

const heatScore: Record<string, number> = {
  SSS: 6,
  SS: 5,
  S: 4,
  A: 3,
  B: 2,
  C: 1,
  待核验: 0,
  无需热度: 0,
};

const riskScore: Record<string, number> = {
  高: 3,
  中: 2,
  低: 1,
  未知: 0,
};

const sourceConfidenceScore: Record<string, number> = {
  高: 3,
  中: 2,
  低: 1,
  未知: 0,
};

export function getCategoryName(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId;
}

export function getCategoryDescription(categoryId: string) {
  return categories.find((category) => category.id === categoryId)?.description ?? '';
}

export function getHeatScore(level: string) {
  return heatScore[level] ?? 0;
}

export function getRiskScore(level: string) {
  return riskScore[level] ?? 0;
}

export function getSourceConfidenceScore(level: string) {
  return sourceConfidenceScore[level] ?? 0;
}

export function getHighHeatEntities() {
  return sortEntities(
    entities.filter((entity) => ['SSS', 'SS'].includes(entity.heatLevel)),
    'heat',
  );
}

export function getGithubEntities() {
  return sortEntities(
    entities.filter((entity) => entity.githubRepo),
    'heat',
  );
}

export function getCuratedEntities() {
  return sortEntities(
    entities.filter((entity) => ['SSS', 'SS', 'S', 'A'].includes(entity.heatLevel) && entity.reviewStatus !== '待复核'),
    'heat',
  );
}

export function getRiskHotspots() {
  return sortEntities(
    entities.filter((entity) => ['高', '中'].includes(entity.riskLevel)),
    'risk',
  );
}

export function sortEntities(rows: Entity[], mode: SortMode) {
  return [...rows].sort((a, b) => {
    if (mode === 'name') return a.name.localeCompare(b.name, 'zh-CN');
    if (mode === 'risk') return getRiskScore(b.riskLevel) - getRiskScore(a.riskLevel) || getHeatScore(b.heatLevel) - getHeatScore(a.heatLevel);
    if (mode === 'verified') {
      return (
        getSourceConfidenceScore(b.sourceConfidence) - getSourceConfidenceScore(a.sourceConfidence) ||
        getHeatScore(b.heatLevel) - getHeatScore(a.heatLevel)
      );
    }
    return getHeatScore(b.heatLevel) - getHeatScore(a.heatLevel) || getRiskScore(a.riskLevel) - getRiskScore(b.riskLevel);
  });
}

export function filterEntities(params: {
  query?: string;
  category?: string;
  heat?: string;
  risk?: string;
  sourceConfidence?: string;
  openSourceOnly?: boolean;
  localDeployOnly?: boolean;
  curatedOnly?: boolean;
  apiOnly?: boolean;
  mcpOnly?: boolean;
  sort?: SortMode;
}) {
  const query = (params.query ?? '').trim().toLowerCase();
  const rows = entities.filter((entity) => {
    const haystack = [
      entity.name,
      entity.literal,
      entity.cn,
      entity.summary,
      entity.value,
      entity.category,
      entity.type,
      entity.githubRepo,
      entity.recommendedFor,
      entity.riskTags?.join(' '),
      entity.pricing,
      entity.license,
      entity.apiSupport,
      entity.mcpSupport,
    ]
      .join(' ')
      .toLowerCase();

    if (query && !haystack.includes(query)) return false;
    if (params.category && params.category !== 'all' && entity.category !== params.category) return false;
    if (params.heat && params.heat !== 'all' && entity.heatLevel !== params.heat) return false;
    if (params.risk && params.risk !== 'all' && entity.riskLevel !== params.risk) return false;
    if (params.sourceConfidence && params.sourceConfidence !== 'all' && entity.sourceConfidence !== params.sourceConfidence) return false;
    if (params.openSourceOnly && !entity.openSource) return false;
    if (params.localDeployOnly && !entity.localDeploy) return false;
    if (params.curatedOnly && !['SSS', 'SS', 'S', 'A'].includes(entity.heatLevel)) return false;
    if (params.apiOnly && !String(entity.apiSupport).includes('是')) return false;
    if (params.mcpOnly && !String(entity.mcpSupport).includes('相关')) return false;
    return true;
  });
  return sortEntities(rows, params.sort ?? 'heat');
}

export function toCsv(rows: Entity[]) {
  const headers = [
    'id',
    'name',
    'literal',
    'cn',
    'category',
    'type',
    'summary',
    'url',
    'githubRepo',
    'heatLevel',
    'sourceConfidence',
    'reviewStatus',
    'pricing',
    'license',
    'commercialUse',
    'apiSupport',
    'mcpSupport',
    'openSource',
    'localDeploy',
    'chinaUsability',
    'riskLevel',
    'riskNote',
    'recommendedFor',
    'lastVerifiedAt',
  ];
  const escapeCell = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  return [headers.join(','), ...rows.map((row) => headers.map((key) => escapeCell(row[key as keyof Entity])).join(','))].join('\n');
}

export function toMarkdown(rows: Entity[]) {
  return rows
    .map(
      (entity) => `# ${entity.name}\n\n- 直译：${entity.literal}\n- 中文名：${entity.cn}\n- 类别：${getCategoryName(entity.category)}\n- 类型：${entity.type}\n- 解释：${entity.summary}\n- 价值：${entity.value}\n- 热度：${entity.heatLevel}｜${entity.heatNote}\n- 来源可信度：${entity.sourceConfidence}\n- 审核状态：${entity.reviewStatus}\n- 价格：${entity.pricing}\n- 许可证：${entity.license}\n- 商用判断：${entity.commercialUse}\n- API 支持：${entity.apiSupport}\n- MCP 支持：${entity.mcpSupport}\n- 开源：${entity.openSource ? '是' : '否'}\n- 本地部署：${entity.localDeploy ? '是' : '否'}\n- 国内可用性：${entity.chinaUsability}\n- 风险等级：${entity.riskLevel}\n- 风险备注：${entity.riskNote}\n- 推荐人群：${entity.recommendedFor}\n- 最后核验：${entity.lastVerifiedAt}\n- 来源：${entity.url}\n`,
    )
    .join('\n---\n\n');
}

export function getDataHealth() {
  const total = entities.length;
  const github = entities.filter((entity) => entity.githubRepo).length;
  const local = entities.filter((entity) => entity.localDeploy).length;
  const highConfidence = entities.filter((entity) => entity.sourceConfidence === '高').length;
  const highRisk = entities.filter((entity) => entity.riskLevel === '高').length;
  const reviewed = entities.filter((entity) => entity.reviewStatus !== '待复核').length;
  return { total, github, local, highConfidence, highRisk, reviewed };
}
