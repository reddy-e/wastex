import { NextResponse } from 'next/server';
import { INITIAL_PICKUPS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: INITIAL_PICKUPS.length,
    pickups: INITIAL_PICKUPS,
  });
}
