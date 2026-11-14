import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviews = db.getReviews(id);
    return NextResponse.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al obtener reseñas' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.authorName || !body.comment || !body.rating) {
      return NextResponse.json({ success: false, error: 'Campos obligatorios incompletos' }, { status: 400 });
    }

    const review = db.createReview({
      propertyId: id,
      authorName: body.authorName,
      authorEmail: body.authorEmail || '',
      authorAvatar: body.authorAvatar || `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?auto=format&fit=crop&w=150&q=80`,
      rating: Number(body.rating),
      criteria: {
        location: Number(body.criteria?.location || body.rating),
        value: Number(body.criteria?.value || body.rating),
        amenities: Number(body.criteria?.amenities || body.rating),
        agent: Number(body.criteria?.agent || body.rating)
      },
      comment: body.comment
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al crear reseña' }, { status: 500 });
  }
}
