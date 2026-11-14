import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = db.getPropertyById(id);
    if (!property) {
      return NextResponse.json({ success: false, error: 'Propiedad no encontrada' }, { status: 404 });
    }
    // Increment view count
    db.updateProperty(property.id, { viewsCount: (property.viewsCount || 0) + 1 });
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener propiedad' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = db.updateProperty(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Propiedad no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al actualizar propiedad' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = db.deleteProperty(id);
    if (!ok) {
      return NextResponse.json({ success: false, error: 'Propiedad no encontrada' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Propiedad eliminada correctamente' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al eliminar propiedad' }, { status: 500 });
  }
}
