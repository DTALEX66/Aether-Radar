import { NextResponse } from 'next/server';
import { categories, filterEntities, getCategoryName, type SortMode } from '../../../lib/data';
import { parseBool, parseNonNegativeInt, parsePositiveInt } from '../../../lib/api';
import { AETHER_DATA_SNAPSHOT_DATE, AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-dynamic';

const allowedSortModes = new Set(['heat', 'risk', 'name', 'verified']);
function parseSortMode(value: string | null): SortMode {
  return allowedSortModes.has(String(value)) ? (value as SortMode) : 'heat';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parsePositiveInt(searchParams.get('limit'), 100, 500);
  const offset = parseNonNegativeInt(searchParams.get('offset'), 0, 100000);
  const rows = filterEntities({
    query: searchParams.get('q') ?? '',
    category: searchParams.get('category') ?? 'all',
    heat: searchParams.get('heat') ?? 'all',
    risk: searchParams.get('risk') ?? 'all',
    sourceConfidence: searchParams.get('sourceConfidence') ?? 'all',
    openSourceOnly: parseBool(searchParams.get('openSource')),
    localDeployOnly: parseBool(searchParams.get('localDeploy')),
    curatedOnly: parseBool(searchParams.get('curated')),
    apiOnly: parseBool(searchParams.get('api')),
    mcpOnly: parseBool(searchParams.get('mcp')),
    sort: parseSortMode(searchParams.get('sort')),
  });

  const pageRows = rows.slice(offset, offset + limit).map((entity) => ({
    ...entity,
    categoryName: getCategoryName(entity.category),
  }));

  return NextResponse.json({
    meta: {
      name: 'Aether Radar Entities API',
      version: AETHER_VERSION,
      generatedAt: AETHER_DATA_SNAPSHOT_DATE,
      total: rows.length,
      offset,
      limit,
      hasMore: offset + pageRows.length < rows.length,
      availableCategories: categories.length,
      disclaimer: buildDisclaimer('API 数据'),
    },
    data: pageRows,
  });
}
