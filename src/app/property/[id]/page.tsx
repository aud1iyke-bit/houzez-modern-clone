import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import PropertyDetailClient from './PropertyDetailClient';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = db.getPropertyById(id);

  if (!property) {
    notFound();
  }

  const agent = db.getAgentById(property.agentId) || db.getAgents()[0];
  const reviews = db.getReviews(property.id);
  const similarProperties = db.getProperties({ type: property.type }).filter(p => p.id !== property.id).slice(0, 3);

  return (
    <PropertyDetailClient
      property={property}
      agent={agent}
      initialReviews={reviews}
      similarProperties={similarProperties}
    />
  );
}
