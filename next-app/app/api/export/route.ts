import { NextResponse } from 'next/server';
import { categories, comparisons, competitors, entities, risks, scenarios, terms, toCsv, toMarkdown } from '../../../lib/data';
import { normalizeFormat } from '../../../lib/api';
import { AETHER_DATA_SNAPSHOT_DATE, AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-dynamic';

function textResponse(content: string, contentType: string, filename: string) {
  return new Response(content, {
    headers: {
      'content-type': `${contentType}; charset=utf-8`,
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'public, max-age=300',
    },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = normalizeFormat(searchParams.get('format'), ['json', 'csv', 'markdown', 'md', 'xlsx', 'excel'], 'json');
  const bundle = { generatedAt: AETHER_DATA_SNAPSHOT_DATE, version: AETHER_VERSION, disclaimer: buildDisclaimer('导出数据'), entities, categories, terms, scenarios, comparisons, risks, competitors };

  if (format === 'csv') {
    return textResponse(`\ufeff${toCsv(entities)}`, 'text/csv', 'aether-radar-entities.csv');
  }

  if (format === 'markdown' || format === 'md') {
    return textResponse(toMarkdown(entities), 'text/markdown', 'aether-radar-entities.md');
  }

  if (format === 'xlsx' || format === 'excel') {
    return NextResponse.redirect(new URL('/exports/aether-radar-export.xlsx', request.url));
  }

  return NextResponse.json(bundle, {
    headers: {
      'content-disposition': 'attachment; filename="aether-radar-full-bundle.json"',
      'cache-control': 'public, max-age=300',
    },
  });
}
