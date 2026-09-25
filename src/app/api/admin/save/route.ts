import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_ADMIN_PANEL !== 'true') {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const data = await request.json();
    const dataPath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');
    
    // Validate data structure minimally or just save it
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
