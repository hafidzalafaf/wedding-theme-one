
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'ucapan.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const ucapan = JSON.parse(data);
    return NextResponse.json(ucapan);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Nama dan pesan wajib diisi.' }, { status: 400 });
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const ucapan = JSON.parse(data);

    const newUcapan = { id: Date.now(), name,message };
    ucapan.push(newUcapan);

    fs.writeFileSync(filePath, JSON.stringify(ucapan, null, 2));
    return NextResponse.json({ message: 'Ucapan berhasil disimpan.' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

