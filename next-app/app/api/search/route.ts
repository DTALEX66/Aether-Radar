import { NextResponse } from 'next/server';
import { filterEntities, scenarios, terms, type SortMode } from '../../../lib/data';
import { parsePositiveInt } from '../../../lib/api';
import { AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-dynamic';

const allowedSortModes = new Set(['heat', 'risk', 'name', 'verified']);
function parseSortMode(value: string | null): SortMode {
  return allowedSortModes.has(String(value)) ? (value as SortMode) : 'heat';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') ?? '').trim();
  const limit = parsePositiveInt(searchParams.get('limit'), 20, 100);
  const mode = parseSortMode(searchParams.get('sort'));

  const entities = filterEntities({ query: q, sort: mode, curatedOnly: q.length === 0 }).slice(0, limit);
  const normalized = q.toLowerCase();
  const termResults = normalized
    ? terms
        .filter((term) => [term.term, term.literal, term.cn, term.summary, term.category].join(' ').toLowerCase().includes(normalized))
        .slice(0, Math.min(limit, 20))
    : [];
  const scenarioResults = normalized
    ? scenarios
        .filter((scenario) => [scenario.name, scenario.path, scenario.stack.join(' '), scenario.risk].join(' ').toLowerCase().includes(normalized))
        .slice(0, Math.min(limit, 20))
    : scenarios.slice(0, Math.min(limit, 6));

  return NextResponse.json({
    meta: {
      name: 'Aether Radar Search API',
      version: AETHER_VERSION,
      query: q,
      limit,
      total: entities.length + termResults.length + scenarioResults.length,
      mode: q ? 'keyword' : 'curated-default',
      disclaimer: buildDisclaimer('搜索结果'),
    },
    data: {
      entities,
      terms: termResults,
      scenarios: scenarioResults,
    },
  });
}
