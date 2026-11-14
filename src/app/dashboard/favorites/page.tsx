'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Property, Agent } from '@/types';
import PropertyCard from '@/components/property/PropertyCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(d => {
        if (d.success) setProperties(d.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch('/api/agents')
      .then(res => res.json())
      .then(d => { if (d.success) setAgents(d.data); })
      .catch(() => {});
  }, []);

  const favoriteProps = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Mis Propiedades Favoritas
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Lista de inmuebles guardados para seguimiento y comparación
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-gray-500">Cargando favoritos...</p>
        </div>
      ) : favoriteProps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Aún no tienes favoritos</h3>
          <p className="text-xs text-gray-500 mb-4">
            Pulsa el icono de corazón en cualquier propiedad para guardarla y revisarla más tarde.
          </p>
          <Link
            href="/properties"
            className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition inline-flex items-center space-x-1"
          >
            <span>Ver Catálogo de Inmuebles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProps.map(prop => {
            const agent = agents.find(a => a.id === prop.agentId);
            return (
              <PropertyCard
                key={prop.id}
                property={prop}
                agent={agent}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
