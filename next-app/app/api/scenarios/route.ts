import { NextResponse } from 'next/server';
import { scenarios } from '../../../lib/data';
import { AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    meta: {
      name: 'Aether Radar Scenario API',
      version: AETHER_VERSION,
      total: scenarios.length,
      disclaimer: buildDisclaimer('场景方案'),
    },
    data: scenarios,
  });
}
