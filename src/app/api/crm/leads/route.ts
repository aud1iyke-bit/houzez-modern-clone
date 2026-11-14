import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const leads = db.getLeads();
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ success: false, error: 'Nombre y correo son requeridos' }, { status: 400 });
    }

    const newLead = db.createLead({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      status: body.status || 'new',
      source: body.source || 'website_inquiry',
      budgetMin: body.budgetMin ? Number(body.budgetMin) : undefined,
      budgetMax: body.budgetMax ? Number(body.budgetMax) : undefined,
      preferredType: body.preferredType,
      preferredCity: body.preferredCity,
      notes: body.notes || '',
      assignedAgentId: body.assignedAgentId || 'agent-1',
      propertyId: body.propertyId,
      propertyTitle: body.propertyTitle,
      lastContactDate: new Date().toISOString()
    });

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al crear lead' }, { status: 500 });
  }
}
