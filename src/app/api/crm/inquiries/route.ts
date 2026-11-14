import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const inquiries = db.getInquiries();
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener consultas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.senderName || !body.senderEmail || !body.message) {
      return NextResponse.json({ success: false, error: 'Nombre, email y mensaje son obligatorios' }, { status: 400 });
    }

    const newInquiry = db.createInquiry({
      propertyId: body.propertyId || '',
      propertyTitle: body.propertyTitle || 'Consulta General',
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderPhone: body.senderPhone || '',
      message: body.message,
      type: body.type === 'schedule_tour' ? 'schedule_tour' : 'general',
      tourType: body.tourType || 'in_person',
      tourDate: body.tourDate,
      tourTime: body.tourTime,
      agentId: body.agentId || 'agent-1'
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Consulta enviada correctamente y registrada en el CRM', 
      data: newInquiry 
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al procesar consulta' }, { status: 500 });
  }
}
