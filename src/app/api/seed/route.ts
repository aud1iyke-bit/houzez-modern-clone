import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    db.resetDemo();
    return NextResponse.json({ success: true, message: 'Base de datos restablecida con datos demo de Houzez exitosamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al restablecer base de datos' }, { status: 500 });
  }
}
