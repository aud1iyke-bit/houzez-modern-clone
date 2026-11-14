import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const invoices = db.getInvoices();
    return NextResponse.json({ success: true, count: invoices.length, data: invoices });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener facturas' }, { status: 500 });
  }
}
