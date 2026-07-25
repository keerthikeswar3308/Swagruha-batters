import { NextResponse } from 'next/server';
import { getDbData, saveDbData } from '@/lib/db';

export async function GET() {
  try {
    const data = getDbData();
    // Exclude password from public GET response
    const { adminCredentials, ...publicData } = data;
    return NextResponse.json(publicData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch database content' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentData = getDbData();

    // Preserve adminCredentials if not updated in body
    const updatedData = {
      ...currentData,
      ...body,
      adminCredentials: body.adminCredentials || currentData.adminCredentials,
    };

    saveDbData(updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update database content' },
      { status: 500 }
    );
  }
}
