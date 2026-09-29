import { NextResponse } from 'next/server';
import { INITIAL_LISTINGS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: INITIAL_LISTINGS.length,
    listings: INITIAL_LISTINGS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Listing published successfully',
      listing: { id: `lst-${Date.now()}`, ...body, createdAt: new Date().toISOString() },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
