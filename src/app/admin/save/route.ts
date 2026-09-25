import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    // Canlı ortam veya yetkisiz erişim kontrolü
    const isEnabled = process.env.ENABLE_ADMIN_PANEL === 'true' && process.env.NODE_ENV === 'development';
    if (!isEnabled) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    try {
        const updatedData = await request.json();
        const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

        // JSON dosyasını 2 boşluk girintili okunaklı formatta diske yaz
        await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Veriler başarıyla kaydedildi!' });
    } catch (error) {
        console.error('Kayıt hatası:', error);
        return NextResponse.json({ error: 'Dosya kaydedilemedi' }, { status: 500 });
    }
}