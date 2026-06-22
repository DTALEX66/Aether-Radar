import openapi from '../../../public/openapi.json';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(openapi, { headers: { 'cache-control': 'public, max-age=3600' } });
}
