import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword') || undefined;
    const type = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;
    const city = searchParams.get('city') || undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const bedrooms = searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined;
    const bathrooms = searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined;
    const featured = searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined;
    const agentId = searchParams.get('agentId') || undefined;

    const properties = db.getProperties({
      keyword,
      type,
      status,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      featured,
      agentId
    });

    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener propiedades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.price || !body.type || !body.status) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const newProperty = db.createProperty({
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description: body.description || '',
      type: body.type,
      status: body.status,
      price: Number(body.price),
      pricePrefix: body.pricePrefix || '',
      priceSuffix: body.priceSuffix || '',
      featured: Boolean(body.featured),
      hotOffer: Boolean(body.hotOffer),
      openHouse: Boolean(body.openHouse),
      bedrooms: Number(body.bedrooms || 0),
      bathrooms: Number(body.bathrooms || 0),
      garages: Number(body.garages || 0),
      areaM2: Number(body.areaM2 || 0),
      lotSizeM2: body.lotSizeM2 ? Number(body.lotSizeM2) : undefined,
      yearBuilt: Number(body.yearBuilt || new Date().getFullYear()),
      propertyCode: body.propertyCode || `HZ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      address: {
        street: body.address?.street || '',
        city: body.address?.city || 'Madrid',
        state: body.address?.state || 'Madrid',
        zipCode: body.address?.zipCode || '',
        country: body.address?.country || 'España',
        lat: Number(body.address?.lat || 40.4168),
        lng: Number(body.address?.lng || -3.7038)
      },
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ],
      floorPlans: Array.isArray(body.floorPlans) ? body.floorPlans : [],
      virtualTourUrl: body.virtualTourUrl || '',
      videoTourUrl: body.videoTourUrl || '',
      energyRating: body.energyRating || 'A',
      hoaFee: body.hoaFee ? Number(body.hoaFee) : 0,
      agentId: body.agentId || 'agent-1',
      agencyId: body.agencyId || 'agency-1',
      published: true
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ success: false, error: 'Error al crear propiedad' }, { status: 500 });
  }
}
