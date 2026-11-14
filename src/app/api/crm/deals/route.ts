import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const deals = db.getDeals();
    return NextResponse.json({ success: true, count: deals.length, data: deals });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener tratos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.value || !body.clientName) {
      return NextResponse.json({ success: false, error: 'Título, valor y cliente son requeridos' }, { status: 400 });
    }

    const value = Number(body.value);
    const commission = body.commission ? Number(body.commission) : Math.round(value * 0.05);

    const newDeal = db.createDeal({
      title: body.title,
      stage: body.stage || 'lead_in',
      value: value,
      commission: commission,
      probability: body.probability ? Number(body.probability) : 50,
      leadId: body.leadId,
      clientName: body.clientName,
      clientEmail: body.clientEmail || '',
      clientPhone: body.clientPhone || '',
      propertyId: body.propertyId || '',
      propertyTitle: body.propertyTitle || 'Propiedad en cartera',
      assignedAgentId: body.assignedAgentId || 'agent-1',
      expectedCloseDate: body.expectedCloseDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    });

    return NextResponse.json({ success: true, data: newDeal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al crear trato' }, { status: 500 });
  }
}
