import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ADMIN_PANEL !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    let images: string[] = [];
    
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      images = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map(file => `/uploads/${file}`);
    }

    // Include some root public images
    const publicDir = path.join(process.cwd(), 'public');
    const publicFiles = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : [];
    const rootImages = publicFiles
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .map(file => `/${file}`);

    return NextResponse.json({ images: [...rootImages, ...images] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
