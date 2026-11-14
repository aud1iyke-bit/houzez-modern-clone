import fs from 'fs';
import path from 'path';
import { 
  Property, 
  Agent, 
  Agency, 
  Lead, 
  Deal, 
  Inquiry, 
  Activity, 
  Review, 
  Invoice 
} from '@/types';

interface DatabaseSchema {
  properties: Property[];
  agents: Agent[];
  agencies: Agency[];
  leads: Lead[];
  deals: Deal[];
  inquiries: Inquiry[];
  activities: Activity[];
  reviews: Review[];
  invoices: Invoice[];
}

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Initial realistic demo data matching Houzez theme standard
export const initialAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Carlos Mendoza',
    title: 'Director de Ventas & Luxury Broker',
    email: 'carlos.mendoza@houzez-realestate.com',
    phone: '+34 912 345 678',
    mobile: '+34 600 111 222',
    whatsapp: '34600111222',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Más de 14 años liderando transacciones residenciales de lujo en Madrid y la Costa del Sol. Especialista en áticos exclusivos y villas de autor.',
    agencyName: 'Houzez Prime Realty',
    licenseNumber: 'API-MD-44829',
    rating: 4.9,
    reviewCount: 38,
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'agent-2',
    name: 'Sofia Valenzuela',
    title: 'Especialista en Inversiones & Penthouse',
    email: 'sofia.valenzuela@houzez-realestate.com',
    phone: '+34 934 567 890',
    mobile: '+34 600 333 444',
    whatsapp: '34600333444',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Experta en propiedades contemporáneas en Barcelona y Baleares. Asesoría integral para compradores internacionales e inversores de alto patrimonio.',
    agencyName: 'Houzez Prime Realty',
    licenseNumber: 'API-BCN-19034',
    rating: 5.0,
    reviewCount: 42,
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'agent-3',
    name: 'Roberto Silva',
    title: 'Asesor Comercial & Residencial',
    email: 'roberto.silva@houzez-realestate.com',
    phone: '+34 952 111 222',
    mobile: '+34 600 555 666',
    whatsapp: '34600555666',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Especializado en villas frente al mar en Marbella y la Milla de Oro. Máxima discreción y servicio concierge 24/7.',
    agencyName: 'Marbella Luxury Living',
    licenseNumber: 'API-MA-88219',
    rating: 4.8,
    reviewCount: 29,
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'agent-4',
    name: 'Elena Delgado',
    title: 'Consultora de Alquileres de Alto Standing',
    email: 'elena.delgado@houzez-realestate.com',
    phone: '+34 963 888 999',
    mobile: '+34 600 777 888',
    whatsapp: '34600777888',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Gestión patrimonial y alquileres corporativos en Valencia y Madrid Centro. Experiencia en relocation y contratos diplomáticos.',
    agencyName: 'Houzez Prime Realty',
    licenseNumber: 'API-VLC-56211',
    rating: 4.9,
    reviewCount: 31,
    social: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

export const initialAgencies: Agency[] = [
  {
    id: 'agency-1',
    name: 'Houzez Prime Realty',
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80',
    address: 'Paseo de la Castellana 95, Madrid',
    phone: '+34 912 345 678',
    email: 'contacto@houzez-prime.com',
    agentsCount: 18,
    propertiesCount: 64
  },
  {
    id: 'agency-2',
    name: 'Marbella Luxury Living',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80',
    address: 'Avenida Bulevar Príncipe Alfonso de Hohenlohe, Marbella',
    phone: '+34 952 111 222',
    email: 'info@marbellaluxury.com',
    agentsCount: 12,
    propertiesCount: 42
  }
];

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Villa Moderna Panorámica con Piscina Infinity',
    slug: 'villa-moderna-panoramica-marbella',
    description: 'Impresionante villa de arquitectura contemporánea situada en una de las colinas más cotizadas de la Costa del Sol. Diseñada para fundir los espacios interiores con las terrazas exteriores, cuenta con techos de 4 metros de altura, ventanales de suelo a techo, cocina italiana de alta gama con electrodomésticos Gaggenau y una espectacular piscina climatizada con vistas abiertas al mar Mediterráneo y Gibraltar.',
    type: 'villa',
    status: 'for-sale',
    price: 3850000,
    featured: true,
    hotOffer: true,
    openHouse: false,
    bedrooms: 5,
    bathrooms: 6,
    garages: 3,
    areaM2: 680,
    lotSizeM2: 1450,
    yearBuilt: 2024,
    propertyCode: 'HZ-2026-001',
    address: {
      street: 'Calle Los Naranjos 42, La Zagaleta',
      city: 'Marbella',
      state: 'Málaga',
      zipCode: '29679',
      country: 'España',
      lat: 36.5167,
      lng: -4.9833
    },
    amenities: [
      'Piscina Infinity',
      'Aire Acondicionado Central',
      'Calefacción por Suelo Radiante',
      'Gimnasio Privado',
      'Spa & Sauna',
      'Bodega Climatizada',
      'Seguridad 24/7',
      'Domótica Smart Home',
      'Garaje Subterráneo',
      'Jardín Paisajístico',
      'Zona BBQ Exterior',
      'Vistas al Mar'
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      {
        id: 'fp-1',
        title: 'Planta Baja - Salón Principal y Suites',
        bedrooms: 3,
        bathrooms: 4,
        size: '380 m²',
        planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        description: 'Distribución abierta que conecta el gran salón con el comedor, cocina de chef y terraza de la piscina.'
      },
      {
        id: 'fp-2',
        title: 'Primera Planta - Master Suite Presidencial',
        bedrooms: 2,
        bathrooms: 2,
        size: '220 m²',
        planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        description: 'Master suite con doble vestidor, baño de mármol con jacuzzi suspendido y solárium privado.'
      }
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-virtual-tour',
    videoTourUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    energyRating: 'A+',
    hoaFee: 320,
    agentId: 'agent-3',
    viewsCount: 1420,
    favoritesCount: 89,
    createdAt: '2026-02-10T10:00:00Z',
    published: true
  },
  {
    id: 'prop-2',
    title: 'Ático Dúplex de Vanguardia en Paseo de Gracia',
    slug: 'atico-duplex-paseo-de-gracia-barcelona',
    description: 'Excepcional ático dúplex ubicado en una finca modernista catalogada, completamente rehabilitada por renombrado estudio de arquitectura. Dispone de terraza privada de 110 m² con vistas panorámicas de 360° a toda la ciudad y al mar, techos con molduras históricas restauradas combinados con diseño minimalista, ascensor de acceso directo al interior de la vivienda y conserjería.',
    type: 'penthouse',
    status: 'for-sale',
    price: 2450000,
    featured: true,
    hotOffer: false,
    openHouse: true,
    bedrooms: 3,
    bathrooms: 4,
    garages: 2,
    areaM2: 295,
    yearBuilt: 2023,
    propertyCode: 'HZ-2026-002',
    address: {
      street: 'Passeig de Gràcia 78, Eixample',
      city: 'Barcelona',
      state: 'Cataluña',
      zipCode: '08008',
      country: 'España',
      lat: 41.3935,
      lng: 2.1649
    },
    amenities: [
      'Terraza Panorámica 360°',
      'Ascensor Privado',
      'Jacuzzi Exterior',
      'Chimenea de Gas',
      'Aire Acondicionado Central',
      'Cocina con Isla de Cuarzo',
      'Doble Acristalamiento Acústico',
      'Conserjería',
      'Trastero',
      'Plaza de Garaje Incluida'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [
      {
        id: 'fp-3',
        title: 'Nivel Inferior & Suites',
        bedrooms: 3,
        bathrooms: 3,
        size: '185 m²',
        planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        description: 'Dormitorios en suite con baños de diseño y armarios empotrados a medida.'
      },
      {
        id: 'fp-4',
        title: 'Nivel Superior & Terraza Lounge',
        bedrooms: 0,
        bathrooms: 1,
        size: '110 m²',
        planImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
        description: 'Salón mirador con salida directa a la terraza privada con jacuzzi y cocina exterior.'
      }
    ],
    energyRating: 'A',
    hoaFee: 280,
    agentId: 'agent-2',
    viewsCount: 2150,
    favoritesCount: 145,
    createdAt: '2026-02-14T11:30:00Z',
    published: true
  },
  {
    id: 'prop-3',
    title: 'Elegante Piso Señorial en Barrio de Salamanca',
    slug: 'piso-senorial-barrio-salamanca-madrid',
    description: 'Ubicado en el prestigioso distrito de Salamanca, entre Serrano y Velázquez. Esta joya inmobiliaria de 240 m² ha sido reformada con calidades de museo por interioristas de primer nivel. Conserva molduras de escayola artesanales, suelos de tarima de roble francés en espiga y dispone de 3 amplias suites independientes, despacho privado y dos plazas de garaje de acceso directo.',
    type: 'apartment',
    status: 'for-sale',
    price: 1980000,
    featured: true,
    hotOffer: false,
    openHouse: false,
    bedrooms: 3,
    bathrooms: 3,
    garages: 2,
    areaM2: 240,
    yearBuilt: 2022,
    propertyCode: 'HZ-2026-003',
    address: {
      street: 'Calle Serrano 92, Salamanca',
      city: 'Madrid',
      state: 'Comunidad de Madrid',
      zipCode: '28006',
      country: 'España',
      lat: 40.4312,
      lng: -3.6874
    },
    amenities: [
      'Suelo de Roble en Espiga',
      'Despacho Privado',
      'Conserje Físico',
      'Aire Acondicionado por Conductos',
      'Calefacción Individual de Gas',
      'Cocina Equipada Santos',
      'Trastero de 15m²',
      '2 Plazas de Garaje'
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'B',
    hoaFee: 210,
    agentId: 'agent-1',
    viewsCount: 1840,
    favoritesCount: 78,
    createdAt: '2026-02-18T09:15:00Z',
    published: true
  },
  {
    id: 'prop-4',
    title: 'Apartamento de Lujo en Primera Línea con Vistas a la Marina',
    slug: 'apartamento-primera-linea-marina-valencia',
    description: 'Disponible para alquiler de temporada o larga duración. Exclusivo apartamento completamente amueblado con diseño náutico refinado frente a la Marina Real de Valencia. Dispone de terraza volada sobre el canal, plaza de aparcamiento subterráneo y acceso a club social y piscina comunitaria.',
    type: 'apartment',
    status: 'for-rent',
    price: 3600,
    priceSuffix: '/mes',
    featured: true,
    hotOffer: true,
    openHouse: false,
    bedrooms: 2,
    bathrooms: 2,
    garages: 1,
    areaM2: 135,
    yearBuilt: 2021,
    propertyCode: 'HZ-2026-004',
    address: {
      street: 'Avenida del Puerto 310, Poblats Marítims',
      city: 'Valencia',
      state: 'Comunidad Valenciana',
      zipCode: '46024',
      country: 'España',
      lat: 39.4628,
      lng: -0.3341
    },
    amenities: [
      'Vistas a la Marina',
      'Piscina Comunitaria',
      'Amueblado de Lujo',
      'Terraza Cubierta',
      'Gimnasio Comunitario',
      'Conserje',
      'Plaza de Garaje',
      'Wifi de Alta Velocidad Incluido'
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'A',
    hoaFee: 120,
    agentId: 'agent-4',
    viewsCount: 960,
    favoritesCount: 52,
    createdAt: '2026-02-20T16:45:00Z',
    published: true
  },
  {
    id: 'prop-5',
    title: 'Finca Rústica de Lujo con Olivos Centenarios y Viñedos',
    slug: 'finca-rustica-olivos-vinedos-mallorca',
    description: 'Majestuosa posesión mallorquina rehabilitada respetando la piedra tradicional autóctona combinada con los más altos estándares de confort contemporáneo. Cuenta con más de 30.000 m² de terreno llano plantado de olivos productivos y viñedos, casa de invitados independiente, bodega de degustación subterránea y pozo de agua propio.',
    type: 'villa',
    status: 'for-sale',
    price: 4950000,
    featured: false,
    hotOffer: false,
    openHouse: false,
    bedrooms: 6,
    bathrooms: 7,
    garages: 4,
    areaM2: 750,
    lotSizeM2: 32000,
    yearBuilt: 2020,
    propertyCode: 'HZ-2026-005',
    address: {
      street: 'Camí de Son Valls s/n',
      city: 'Santanyí',
      state: 'Islas Baleares',
      zipCode: '07650',
      country: 'España',
      lat: 39.3556,
      lng: 3.1294
    },
    amenities: [
      'Viñedos Privados',
      'Piscina de Agua Salada',
      'Casa de Invitados',
      'Bodega Subterránea',
      'Establo para Caballos',
      'Paneles Solares',
      'Pozo Propio',
      'Chimeneas de Leña',
      'Garaje para 4 Coches'
    ],
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'A+',
    agentId: 'agent-2',
    viewsCount: 1100,
    favoritesCount: 64,
    createdAt: '2026-02-22T14:00:00Z',
    published: true
  },
  {
    id: 'prop-6',
    title: 'Edificio Representativo de Oficinas Boutique en Azca',
    slug: 'oficinas-boutique-azca-madrid',
    description: 'Planta completa de oficinas premium en el centro financiero de Madrid. Espacios diáfanos flexibles con divisiones en vidrio acústico, salas de conferencias multimedia, office para empleados, certificación LEED Gold y control de accesos biométrico.',
    type: 'office',
    status: 'for-rent',
    price: 8500,
    priceSuffix: '/mes',
    featured: false,
    hotOffer: false,
    openHouse: false,
    bedrooms: 0,
    bathrooms: 4,
    garages: 5,
    areaM2: 450,
    yearBuilt: 2021,
    propertyCode: 'HZ-2026-006',
    address: {
      street: 'Plaza de Carlos Trías Bertrán 4, Tetuán',
      city: 'Madrid',
      state: 'Comunidad de Madrid',
      zipCode: '28020',
      country: 'España',
      lat: 40.4531,
      lng: -3.6942
    },
    amenities: [
      'Certificación LEED Gold',
      'Salas de Juntas Multimedia',
      'Control Biométrico',
      'Climatización VRV Independiente',
      'Fibra Óptica Redundante',
      'Office / Comedor',
      'Plazas de Parking para Clientes'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'A',
    agentId: 'agent-1',
    viewsCount: 780,
    favoritesCount: 22,
    createdAt: '2026-02-24T08:30:00Z',
    published: true
  },
  {
    id: 'prop-7',
    title: 'Casa Contemporánea Familiar con Jardín y Piscina',
    slug: 'casa-familiar-jardin-piscina-pozuelo',
    description: 'Maravillosa casa unifamiliar independiente en la exclusiva urbanización Somosaguas, Pozuelo de Alarcón. Amplios jardines consolidados, porches cubiertos para reuniones de verano, salón a doble altura con chimenea y suite principal en planta noble con salida directa a la pradera.',
    type: 'house',
    status: 'for-sale',
    price: 1650000,
    featured: true,
    hotOffer: false,
    openHouse: true,
    bedrooms: 4,
    bathrooms: 4,
    garages: 2,
    areaM2: 410,
    lotSizeM2: 980,
    yearBuilt: 2022,
    propertyCode: 'HZ-2026-007',
    address: {
      street: 'Avenida de Europa 18',
      city: 'Pozuelo de Alarcón',
      state: 'Madrid',
      zipCode: '28224',
      country: 'España',
      lat: 40.4419,
      lng: -3.8122
    },
    amenities: [
      'Piscina Privada',
      'Jardín con Riego Automático',
      'Salón con Doble Altura',
      'Cocina con Isla',
      'Dormitorio de Servicio con Baño',
      'Cargador de Coche Eléctrico',
      'Alarma Conectada a Central'
    ],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'A',
    agentId: 'agent-1',
    viewsCount: 1620,
    favoritesCount: 92,
    createdAt: '2026-02-25T12:00:00Z',
    published: true
  },
  {
    id: 'prop-8',
    title: 'Estudio de Diseño Minimalista en el Born',
    slug: 'estudio-diseno-born-barcelona',
    description: 'Encantador loft / estudio de diseño en el corazón bohemio del Born. Vigas de madera vistas tratadas, pared de ladrillo original restaurada, iluminación indirecta integrada y cocina oculta panelada. Ideal como pied-à-terre o inversión de alta rentabilidad.',
    type: 'studio',
    status: 'for-rent',
    price: 1850,
    priceSuffix: '/mes',
    featured: false,
    hotOffer: true,
    openHouse: false,
    bedrooms: 1,
    bathrooms: 1,
    garages: 0,
    areaM2: 65,
    yearBuilt: 2023,
    propertyCode: 'HZ-2026-008',
    address: {
      street: 'Carrer dels Mirallers 12, El Born',
      city: 'Barcelona',
      state: 'Cataluña',
      zipCode: '08003',
      country: 'España',
      lat: 41.3833,
      lng: 2.1819
    },
    amenities: [
      'Totalmente Amueblado',
      'Vigas de Madera Originales',
      'Aire Acondicionado Inverter',
      'Cocina Oculta Panelada',
      'Luz Natural Abundante',
      'Cerca de la Playa'
    ],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    floorPlans: [],
    energyRating: 'B',
    agentId: 'agent-2',
    viewsCount: 890,
    favoritesCount: 41,
    createdAt: '2026-02-26T15:20:00Z',
    published: true
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Javier Arriaga',
    email: 'j.arriaga@inversiones-tech.com',
    phone: '+34 611 223 344',
    status: 'qualified',
    source: 'schedule_tour',
    budgetMin: 3000000,
    budgetMax: 4500000,
    preferredType: 'villa',
    preferredCity: 'Marbella',
    notes: 'Busca villa de lujo para fijar residencia fiscal. Valora privacidad total, seguridad 24h y vistas al mar. Fondos aprobados.',
    assignedAgentId: 'agent-3',
    propertyId: 'prop-1',
    propertyTitle: 'Villa Moderna Panorámica con Piscina Infinity',
    createdAt: '2026-02-15T11:00:00Z',
    lastContactDate: '2026-02-25T14:30:00Z'
  },
  {
    id: 'lead-2',
    name: 'Marta San Román',
    email: 'marta.sanroman@corporacion.es',
    phone: '+34 622 334 455',
    status: 'negotiation',
    source: 'website_inquiry',
    budgetMin: 2200000,
    budgetMax: 2600000,
    preferredType: 'penthouse',
    preferredCity: 'Barcelona',
    notes: 'Ha realizado dos visitas al ático de Paseo de Gracia. Pendiente de cerrar oferta formal tras informe de tasación.',
    assignedAgentId: 'agent-2',
    propertyId: 'prop-2',
    propertyTitle: 'Ático Dúplex de Vanguardia en Paseo de Gracia',
    createdAt: '2026-02-18T16:20:00Z',
    lastContactDate: '2026-02-26T10:00:00Z'
  },
  {
    id: 'lead-3',
    name: 'David Von Berg',
    email: 'd.berg@munich-holdings.de',
    phone: '+49 171 889900',
    status: 'contacted',
    source: 'portal',
    budgetMin: 4000000,
    budgetMax: 5500000,
    preferredType: 'villa',
    preferredCity: 'Santanyí',
    notes: 'Comprador alemán interesado en finca rústica con viñedo en Mallorca. Solicita dossier técnico de producción de vino.',
    assignedAgentId: 'agent-2',
    propertyId: 'prop-5',
    propertyTitle: 'Finca Rústica de Lujo con Olivos Centenarios y Viñedos',
    createdAt: '2026-02-22T09:40:00Z',
    lastContactDate: '2026-02-24T18:15:00Z'
  },
  {
    id: 'lead-4',
    name: 'Lucía Fernández Morales',
    email: 'lucia.f@estudioabogados.com',
    phone: '+34 633 445 566',
    status: 'new',
    source: 'website_inquiry',
    budgetMin: 1800000,
    budgetMax: 2100000,
    preferredType: 'apartment',
    preferredCity: 'Madrid',
    notes: 'Consulta recibida ayer interesada en piso en Barrio de Salamanca con plazas de garaje.',
    assignedAgentId: 'agent-1',
    propertyId: 'prop-3',
    propertyTitle: 'Elegante Piso Señorial en Barrio de Salamanca',
    createdAt: '2026-02-26T18:05:00Z'
  },
  {
    id: 'lead-5',
    name: 'Alexander Novak',
    email: 'alex.novak@fintech-global.uk',
    phone: '+44 7911 123456',
    status: 'won',
    source: 'direct',
    budgetMin: 3500,
    budgetMax: 4000,
    preferredType: 'apartment',
    preferredCity: 'Valencia',
    notes: 'Contrato de alquiler anual formalizado para el apartamento de la Marina de Valencia. Primer año pagado por adelantado.',
    assignedAgentId: 'agent-4',
    propertyId: 'prop-4',
    propertyTitle: 'Apartamento de Lujo en Primera Línea con Vistas a la Marina',
    createdAt: '2026-02-10T14:00:00Z',
    lastContactDate: '2026-02-20T17:00:00Z'
  }
];

export const initialDeals: Deal[] = [
  {
    id: 'deal-1',
    title: 'Venta Villa La Zagaleta - J. Arriaga',
    stage: 'offer_submitted',
    value: 3850000,
    commission: 192500,
    probability: 75,
    leadId: 'lead-1',
    clientName: 'Javier Arriaga',
    clientEmail: 'j.arriaga@inversiones-tech.com',
    clientPhone: '+34 611 223 344',
    propertyId: 'prop-1',
    propertyTitle: 'Villa Moderna Panorámica con Piscina Infinity',
    assignedAgentId: 'agent-3',
    expectedCloseDate: '2026-03-31',
    createdAt: '2026-02-16T12:00:00Z'
  },
  {
    id: 'deal-2',
    title: 'Adquisición Ático Paseo de Gracia - M. San Román',
    stage: 'contract_sent',
    value: 2450000,
    commission: 122500,
    probability: 90,
    leadId: 'lead-2',
    clientName: 'Marta San Román',
    clientEmail: 'marta.sanroman@corporacion.es',
    clientPhone: '+34 622 334 455',
    propertyId: 'prop-2',
    propertyTitle: 'Ático Dúplex de Vanguardia en Paseo de Gracia',
    assignedAgentId: 'agent-2',
    expectedCloseDate: '2026-03-15',
    createdAt: '2026-02-19T10:00:00Z'
  },
  {
    id: 'deal-3',
    title: 'Interés Finca Rústica Mallorca - D. Von Berg',
    stage: 'viewing_scheduled',
    value: 4950000,
    commission: 247500,
    probability: 50,
    leadId: 'lead-3',
    clientName: 'David Von Berg',
    clientEmail: 'd.berg@munich-holdings.de',
    clientPhone: '+49 171 889900',
    propertyId: 'prop-5',
    propertyTitle: 'Finca Rústica de Lujo con Olivos Centenarios y Viñedos',
    assignedAgentId: 'agent-2',
    expectedCloseDate: '2026-05-15',
    createdAt: '2026-02-23T11:00:00Z'
  },
  {
    id: 'deal-4',
    title: 'Piso Salamanca Señorial - L. Fernández',
    stage: 'contact_made',
    value: 1980000,
    commission: 99000,
    probability: 30,
    leadId: 'lead-4',
    clientName: 'Lucía Fernández Morales',
    clientEmail: 'lucia.f@estudioabogados.com',
    clientPhone: '+34 633 445 566',
    propertyId: 'prop-3',
    propertyTitle: 'Elegante Piso Señorial en Barrio de Salamanca',
    assignedAgentId: 'agent-1',
    expectedCloseDate: '2026-04-30',
    createdAt: '2026-02-26T18:30:00Z'
  },
  {
    id: 'deal-5',
    title: 'Alquiler Anual Marina Valencia - A. Novak',
    stage: 'closed_won',
    value: 43200,
    commission: 4320,
    probability: 100,
    leadId: 'lead-5',
    clientName: 'Alexander Novak',
    clientEmail: 'alex.novak@fintech-global.uk',
    clientPhone: '+44 7911 123456',
    propertyId: 'prop-4',
    propertyTitle: 'Apartamento de Lujo en Primera Línea con Vistas a la Marina',
    assignedAgentId: 'agent-4',
    expectedCloseDate: '2026-02-20',
    createdAt: '2026-02-12T15:00:00Z'
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyTitle: 'Villa Moderna Panorámica con Piscina Infinity',
    senderName: 'Javier Arriaga',
    senderEmail: 'j.arriaga@inversiones-tech.com',
    senderPhone: '+34 611 223 344',
    message: 'Hola Carlos, me gustaría agendar una visita privada el próximo martes por la mañana para recorrer la propiedad y revisar el dossier de licencias.',
    type: 'schedule_tour',
    tourType: 'in_person',
    tourDate: '2026-03-03',
    tourTime: '11:00 AM',
    status: 'replied',
    createdAt: '2026-02-25T10:15:00Z',
    agentId: 'agent-3'
  },
  {
    id: 'inq-2',
    propertyId: 'prop-2',
    propertyTitle: 'Ático Dúplex de Vanguardia en Paseo de Gracia',
    senderName: 'Marta San Román',
    senderEmail: 'marta.sanroman@corporacion.es',
    senderPhone: '+34 622 334 455',
    message: 'Estimada Sofia, ¿sería posible agendar una videollamada para repasar los gastos de comunidad y el proyecto de la terraza?',
    type: 'schedule_tour',
    tourType: 'video_call',
    tourDate: '2026-03-02',
    tourTime: '16:30 PM',
    status: 'read',
    createdAt: '2026-02-26T14:00:00Z',
    agentId: 'agent-2'
  },
  {
    id: 'inq-3',
    propertyId: 'prop-7',
    propertyTitle: 'Casa Contemporánea Familiar con Jardín y Piscina',
    senderName: 'Gonzalo Ibáñez',
    senderEmail: 'gonzalo.ibanez@yahoo.es',
    senderPhone: '+34 655 889 900',
    message: 'Buenas tardes, estamos buscando casa cerca de colegios internacionales en Pozuelo. ¿Admite ofertas negociables de contado?',
    type: 'general',
    status: 'unread',
    createdAt: '2026-02-27T09:20:00Z',
    agentId: 'agent-1'
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act-1',
    title: 'Visita Presencial con Javier Arriaga',
    type: 'viewing',
    dueDate: '2026-03-03',
    dueTime: '11:00 AM',
    status: 'pending',
    priority: 'high',
    propertyId: 'prop-1',
    propertyTitle: 'Villa Moderna Panorámica',
    clientName: 'Javier Arriaga',
    agentId: 'agent-3',
    notes: 'Llevar llaves del garaje y copia del plano catastral.'
  },
  {
    id: 'act-2',
    title: 'Llamada de Seguimiento con Notaría',
    type: 'call',
    dueDate: '2026-03-02',
    dueTime: '10:00 AM',
    status: 'pending',
    priority: 'high',
    propertyId: 'prop-2',
    propertyTitle: 'Ático Paseo de Gracia',
    clientName: 'Marta San Román',
    agentId: 'agent-2',
    notes: 'Confirmar minuta de arras y certificados de estar al corriente con la comunidad.'
  },
  {
    id: 'act-3',
    title: 'Enviar Dossier Técnico a D. Von Berg',
    type: 'email',
    dueDate: '2026-03-01',
    dueTime: '15:00 PM',
    status: 'completed',
    priority: 'medium',
    propertyId: 'prop-5',
    propertyTitle: 'Finca Rústica Mallorca',
    clientName: 'David Von Berg',
    agentId: 'agent-2',
    notes: 'Enviado informe de denominación de origen y producción de aceite.'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    propertyId: 'prop-1',
    authorName: 'Enrique Cárdenas',
    authorEmail: 'enrique.cardenas@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5.0,
    criteria: {
      location: 5,
      value: 5,
      amenities: 5,
      agent: 5
    },
    comment: 'Una propiedad verdaderamente fuera de serie. Los acabados de la cocina y la piscina infinity superan las fotos. La atención de Roberto Silva fue impecable y transparente.',
    createdAt: '2026-02-18T14:20:00Z'
  },
  {
    id: 'rev-2',
    propertyId: 'prop-2',
    authorName: 'Beatrice Dupuis',
    authorEmail: 'beatrice.d@parislux.fr',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 4.8,
    criteria: {
      location: 5,
      value: 4.5,
      amenities: 5,
      agent: 5
    },
    comment: 'La terraza con vistas de 360 grados sobre Barcelona es simplemente un sueño. La combinación de elementos históricos y modernos está ejecutada con maestría.',
    createdAt: '2026-02-21T18:00:00Z'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'HZ-INV-2026-0042',
    date: '2026-02-01',
    dueDate: '2026-02-15',
    packageName: 'Houzez Pro Agent Package (Anual)',
    amount: 890,
    status: 'paid',
    paymentMethod: 'Tarjeta de Crédito (Visa •••• 4242)',
    clientName: 'Carlos Mendoza',
    clientEmail: 'carlos.mendoza@houzez-realestate.com'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'HZ-INV-2026-0038',
    date: '2026-01-15',
    dueDate: '2026-01-30',
    packageName: 'Promoción Destacada 5 Propiedades Top',
    amount: 350,
    status: 'paid',
    paymentMethod: 'Transferencia Bancaria SEPA',
    clientName: 'Sofia Valenzuela',
    clientEmail: 'sofia.valenzuela@houzez-realestate.com'
  }
];

function ensureDbExists(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      properties: initialProperties,
      agents: initialAgents,
      agencies: initialAgencies,
      leads: initialLeads,
      deals: initialDeals,
      inquiries: initialInquiries,
      activities: initialActivities,
      reviews: initialReviews,
      invoices: initialInvoices
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading database file, re-initializing:', error);
    const initialData: DatabaseSchema = {
      properties: initialProperties,
      agents: initialAgents,
      agencies: initialAgencies,
      leads: initialLeads,
      deals: initialDeals,
      inquiries: initialInquiries,
      activities: initialActivities,
      reviews: initialReviews,
      invoices: initialInvoices
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // Properties
  getProperties(filters?: {
    keyword?: string;
    type?: string;
    status?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    featured?: boolean;
    agentId?: string;
  }): Property[] {
    const data = ensureDbExists();
    let result = [...data.properties];

    if (!filters) return result;

    if (filters.keyword) {
      const q = filters.keyword.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.address.city.toLowerCase().includes(q) ||
        p.address.street.toLowerCase().includes(q) ||
        p.propertyCode.toLowerCase().includes(q)
      );
    }

    if (filters.type && filters.type !== 'all') {
      result = result.filter(p => p.type === filters.type);
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter(p => p.status === filters.status);
    }

    if (filters.city && filters.city !== 'all') {
      result = result.filter(p => p.address.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.bedrooms !== undefined && filters.bedrooms > 0) {
      result = result.filter(p => p.bedrooms >= filters.bedrooms!);
    }

    if (filters.bathrooms !== undefined && filters.bathrooms > 0) {
      result = result.filter(p => p.bathrooms >= filters.bathrooms!);
    }

    if (filters.featured !== undefined) {
      result = result.filter(p => p.featured === filters.featured);
    }

    if (filters.agentId) {
      result = result.filter(p => p.agentId === filters.agentId);
    }

    return result;
  },

  getPropertyById(id: string): Property | undefined {
    const data = ensureDbExists();
    return data.properties.find(p => p.id === id || p.slug === id);
  },

  createProperty(prop: Omit<Property, 'id' | 'createdAt' | 'viewsCount' | 'favoritesCount'>): Property {
    const data = ensureDbExists();
    const newProperty: Property = {
      ...prop,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      viewsCount: 1,
      favoritesCount: 0
    };
    data.properties.unshift(newProperty);
    saveDb(data);
    return newProperty;
  },

  updateProperty(id: string, updates: Partial<Property>): Property | undefined {
    const data = ensureDbExists();
    const index = data.properties.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    data.properties[index] = { ...data.properties[index], ...updates };
    saveDb(data);
    return data.properties[index];
  },

  deleteProperty(id: string): boolean {
    const data = ensureDbExists();
    const beforeLen = data.properties.length;
    data.properties = data.properties.filter(p => p.id !== id);
    if (data.properties.length !== beforeLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Agents
  getAgents(): Agent[] {
    const data = ensureDbExists();
    return data.agents;
  },

  getAgentById(id: string): Agent | undefined {
    const data = ensureDbExists();
    return data.agents.find(a => a.id === id);
  },

  // Leads (CRM)
  getLeads(): Lead[] {
    const data = ensureDbExists();
    return data.leads;
  },

  createLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
    const data = ensureDbExists();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    data.leads.unshift(newLead);
    saveDb(data);
    return newLead;
  },

  updateLead(id: string, updates: Partial<Lead>): Lead | undefined {
    const data = ensureDbExists();
    const index = data.leads.findIndex(l => l.id === id);
    if (index === -1) return undefined;
    data.leads[index] = { ...data.leads[index], ...updates };
    saveDb(data);
    return data.leads[index];
  },

  deleteLead(id: string): boolean {
    const data = ensureDbExists();
    const beforeLen = data.leads.length;
    data.leads = data.leads.filter(l => l.id !== id);
    if (data.leads.length !== beforeLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Deals (CRM Pipeline)
  getDeals(): Deal[] {
    const data = ensureDbExists();
    return data.deals;
  },

  createDeal(deal: Omit<Deal, 'id' | 'createdAt'>): Deal {
    const data = ensureDbExists();
    const newDeal: Deal = {
      ...deal,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    data.deals.unshift(newDeal);
    saveDb(data);
    return newDeal;
  },

  updateDeal(id: string, updates: Partial<Deal>): Deal | undefined {
    const data = ensureDbExists();
    const index = data.deals.findIndex(d => d.id === id);
    if (index === -1) return undefined;
    data.deals[index] = { ...data.deals[index], ...updates };
    saveDb(data);
    return data.deals[index];
  },

  deleteDeal(id: string): boolean {
    const data = ensureDbExists();
    const beforeLen = data.deals.length;
    data.deals = data.deals.filter(d => d.id !== id);
    if (data.deals.length !== beforeLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Inquiries
  getInquiries(): Inquiry[] {
    const data = ensureDbExists();
    return data.inquiries;
  },

  createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const data = ensureDbExists();
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    data.inquiries.unshift(newInq);

    // Auto-create or link Lead in CRM when someone inquires or books a tour!
    const existingLead = data.leads.find(l => l.email === inquiry.senderEmail);
    if (!existingLead) {
      const autoLead: Lead = {
        id: `lead-${Date.now()}`,
        name: inquiry.senderName,
        email: inquiry.senderEmail,
        phone: inquiry.senderPhone,
        status: inquiry.type === 'schedule_tour' ? 'qualified' : 'new',
        source: inquiry.type === 'schedule_tour' ? 'schedule_tour' : 'website_inquiry',
        notes: `Consulta generada automáticamente desde propiedad: ${inquiry.propertyTitle}. Mensaje: "${inquiry.message}"`,
        assignedAgentId: inquiry.agentId,
        propertyId: inquiry.propertyId,
        propertyTitle: inquiry.propertyTitle,
        createdAt: new Date().toISOString()
      };
      data.leads.unshift(autoLead);
    }

    // If it's a tour booking, also auto-schedule an Activity!
    if (inquiry.type === 'schedule_tour' && inquiry.tourDate) {
      const tourAct: Activity = {
        id: `act-${Date.now()}`,
        title: `Visita ${inquiry.tourType === 'video_call' ? 'Virtual' : 'Presencial'}: ${inquiry.senderName}`,
        type: 'viewing',
        dueDate: inquiry.tourDate,
        dueTime: inquiry.tourTime || '11:00 AM',
        status: 'pending',
        priority: 'high',
        propertyId: inquiry.propertyId,
        propertyTitle: inquiry.propertyTitle,
        clientName: inquiry.senderName,
        agentId: inquiry.agentId,
        notes: `Teléfono: ${inquiry.senderPhone}. Email: ${inquiry.senderEmail}`
      };
      data.activities.unshift(tourAct);
    }

    saveDb(data);
    return newInq;
  },

  updateInquiry(id: string, updates: Partial<Inquiry>): Inquiry | undefined {
    const data = ensureDbExists();
    const index = data.inquiries.findIndex(i => i.id === id);
    if (index === -1) return undefined;
    data.inquiries[index] = { ...data.inquiries[index], ...updates };
    saveDb(data);
    return data.inquiries[index];
  },

  // Activities
  getActivities(): Activity[] {
    const data = ensureDbExists();
    return data.activities;
  },

  createActivity(act: Omit<Activity, 'id'>): Activity {
    const data = ensureDbExists();
    const newAct: Activity = {
      ...act,
      id: `act-${Date.now()}`
    };
    data.activities.unshift(newAct);
    saveDb(data);
    return newAct;
  },

  updateActivity(id: string, updates: Partial<Activity>): Activity | undefined {
    const data = ensureDbExists();
    const index = data.activities.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    data.activities[index] = { ...data.activities[index], ...updates };
    saveDb(data);
    return data.activities[index];
  },

  deleteActivity(id: string): boolean {
    const data = ensureDbExists();
    const beforeLen = data.activities.length;
    data.activities = data.activities.filter(a => a.id !== id);
    if (data.activities.length !== beforeLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Reviews
  getReviews(propertyId?: string): Review[] {
    const data = ensureDbExists();
    if (propertyId) {
      return data.reviews.filter(r => r.propertyId === propertyId);
    }
    return data.reviews;
  },

  createReview(rev: Omit<Review, 'id' | 'createdAt'>): Review {
    const data = ensureDbExists();
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    data.reviews.unshift(newRev);
    saveDb(data);
    return newRev;
  },

  // Invoices
  getInvoices(): Invoice[] {
    const data = ensureDbExists();
    return data.invoices;
  },

  // Reset to initial demo data
  resetDemo(): void {
    const initialData: DatabaseSchema = {
      properties: initialProperties,
      agents: initialAgents,
      agencies: initialAgencies,
      leads: initialLeads,
      deals: initialDeals,
      inquiries: initialInquiries,
      activities: initialActivities,
      reviews: initialReviews,
      invoices: initialInvoices
    };
    saveDb(initialData);
  }
};
