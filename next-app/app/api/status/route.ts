import { NextResponse } from 'next/server';
import { categories, comparisons, competitors, entities, getDataHealth, risks, scenarios, terms } from '../../../lib/data';
import { AETHER_BUILD_PROFILE, AETHER_DATA_SNAPSHOT_DATE, AETHER_RELEASE_DATE, AETHER_VERSION } from '../../../lib/version';

export const dynamic = 'force-static';

export async function GET() {
  const health = getDataHealth();
  const lastVerifiedDates = entities.map((entity) => entity.lastVerifiedAt).filter(Boolean).sort();
  return NextResponse.json({
    name: 'Aether Radar Data Status',
    version: AETHER_VERSION,
    releaseDate: AETHER_RELEASE_DATE,
    generatedAt: AETHER_DATA_SNAPSHOT_DATE,
    buildProfile: AETHER_BUILD_PROFILE,
    health,
    counts: {
      entities: entities.length,
      categories: categories.length,
      terms: terms.length,
      githubEntities: entities.filter((entity) => entity.githubRepo).length,
      scenarios: scenarios.length,
      comparisons: comparisons.length,
      risks: risks.length,
      competitors: competitors.length,
    },
    quality: {
      highConfidence: health.highConfidence,
      highRisk: health.highRisk,
      reviewed: health.reviewed,
      reviewCoverage: Number((health.reviewed / Math.max(health.total, 1)).toFixed(4)),
      lastVerifiedMin: lastVerifiedDates[0] ?? null,
      lastVerifiedMax: lastVerifiedDates[lastVerifiedDates.length - 1] ?? null,
    },
    warnings: [
      '当前数据为种子库快照，不代表实时市场数据。',
      'GitHub Stars/Forks 只代表关注度，不等于项目质量或安全性。',
      '商用前必须复核官网、许可证、隐私政策、价格、API 条款和当地法规。',
    ],
  });
}
