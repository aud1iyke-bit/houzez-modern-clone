import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const agent = db.getAgentById(id);
      if (!agent) {
        return NextResponse.json({ success: false, error: 'Agente no encontrado' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: agent });
    }

    const agents = db.getAgents();
    return NextResponse.json({ success: true, count: agents.length, data: agents });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener agentes' }, { status: 500 });
  }
}
