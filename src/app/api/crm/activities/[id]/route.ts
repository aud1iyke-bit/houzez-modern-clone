import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = db.updateActivity(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Actividad no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al actualizar actividad' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = db.deleteActivity(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Actividad no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Actividad eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al eliminar actividad' }, { status: 500 });
  }
}
