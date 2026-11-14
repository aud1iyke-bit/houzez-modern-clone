import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = db.updateLead(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al actualizar lead' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = db.deleteLead(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Lead no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Lead eliminado correctamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al eliminar lead' }, { status: 500 });
  }
}
