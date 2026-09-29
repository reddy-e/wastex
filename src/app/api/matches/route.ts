import { NextResponse } from 'next/server';
import { INITIAL_LISTINGS, INITIAL_USERS } from '@/lib/mock-data';
import { calculateSmartMatches } from '@/lib/match-engine';

export async function GET() {
  const matches = INITIAL_LISTINGS.flatMap((l) => calculateSmartMatches(l, INITIAL_USERS));

  return NextResponse.json({
    success: true,
    engine: 'Smart Match Engine Rule-Based v1.0',
    count: matches.length,
    matches,
  });
}
