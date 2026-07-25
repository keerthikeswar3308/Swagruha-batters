import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';
import { isSupabaseConfigured } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getDbData();
    // Exclude password from public GET response
    const { adminCredentials, ...publicData } = data;
    return NextResponse.json({
      ...publicData,
      supabaseConfigured: isSupabaseConfigured,
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('API GET /api/data error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch database content' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = await getDbData();

    // Preserve adminCredentials if not updated in request body
    const updatedData = {
      ...currentData,
      ...body,
      adminCredentials: body.adminCredentials || currentData.adminCredentials,
    };

    await saveDbData(updatedData);

    // Immediately purge Next.js server cache for live website & admin routes
    revalidatePath('/', 'layout');
    revalidatePath('/admin', 'layout');

    return NextResponse.json({
      success: true,
      data: updatedData,
      supabaseConfigured: isSupabaseConfigured,
    });
  } catch (error: any) {
    console.error('API POST /api/data error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update database content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

export async function DELETE(request: Request) {
  return POST(request);
}
