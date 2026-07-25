import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function GET() {
  try {
    const data = await getDbData();
    // Exclude password from public GET response
    const { adminCredentials, ...publicData } = data;
    return NextResponse.json(publicData);
  } catch (error) {
    console.error('API GET /api/data error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch database content' },
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
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error('API POST /api/data error:', error);
    return NextResponse.json(
      { error: 'Failed to update database content' },
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
