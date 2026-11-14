import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const activities = db.getActivities();
    return NextResponse.json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener actividades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.dueDate) {
      return NextResponse.json({ success: false, error: 'Título y fecha son obligatorios' }, { status: 400 });
    }

    const newActivity = db.createActivity({
      title: body.title,
      type: body.type || 'meeting',
      dueDate: body.dueDate,
      dueTime: body.dueTime || '10:00 AM',
      status: body.status || 'pending',
      priority: body.priority || 'medium',
      leadId: body.leadId,
      propertyId: body.propertyId,
      propertyTitle: body.propertyTitle,
      clientName: body.clientName,
      agentId: body.agentId || 'agent-1',
      notes: body.notes || ''
    });

    return NextResponse.json({ success: true, data: newActivity }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al crear actividad' }, { status: 500 });
  }
}
