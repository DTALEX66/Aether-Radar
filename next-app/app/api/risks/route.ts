import { NextResponse } from 'next/server';
import { getRiskHotspots, risks } from '../../../lib/data';
import { AETHER_VERSION, buildDisclaimer } from '../../../lib/version';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    meta: {
      name: 'Aether Radar Risk API',
      version: AETHER_VERSION,
      riskDimensions: risks.length,
      hotspots: getRiskHotspots().length,
      disclaimer: buildDisclaimer('风险等级'),
    },
    data: {
      taxonomy: risks,
      hotspots: getRiskHotspots().slice(0, 50),
    },
  });
}
