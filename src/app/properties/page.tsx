'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Property, Agent } from '@/types';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilterBar from '@/components/property/PropertyFilterBar';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, Building2 } from 'lucide-react';

export default function PropertiesCatalogPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'recent'>('featured');

  const fetchProperties = async (customParams?: any) => {
    setLoading(true);
    try {
      const url = new URL('/api/properties', window.location.origin);
      if (customParams) {
        Object.entries(customParams).forEach(([k, v]) => {
          if (v !== undefined) url.searchParams.set(k, String(v));
        });
      } else {
        searchParams.forEach((v, k) => url.searchParams.set(k, v));
      }

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();

    fetch('/api/agents')
      .then(res => res.json())
      .then(d => { if (d.success) setAgents(d.data); })
      .catch(() => {});
  }, [searchParams]);

  // Sorting
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="w-full bg-[#f8fafc] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Inicio / Catálogo de Propiedades</div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Inmuebles en Venta y Renta
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              {properties.length} inmuebles encontrados
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <PropertyFilterBar onFilterChange={(f) => fetchProperties(f)} />

        {/* Toolbar: Sort & View Toggle */}
        <div className="bg-white rounded-xl p-3 border border-gray-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="font-semibold">Mostrando:</span>
            <span className="font-bold text-gray-900">{properties.length} resultados</span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="featured">Destacadas Primero</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="recent">Más Recientes</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                title="Vista Cuadrícula"
                className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white text-[#0054a6] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="Vista Lista"
                className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white text-[#0054a6] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Property Grid / List */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-semibold">Cargando catálogo inmobiliario...</p>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 mb-1">No se encontraron propiedades</h3>
            <p className="text-xs text-gray-500 mb-4">
              Prueba a cambiar los filtros de búsqueda, ampliar el rango de precio o seleccionar otra ciudad.
            </p>
            <button
              onClick={() => fetchProperties({})}
              className="bg-[#0054a6] text-white text-xs font-bold px-4 py-2 rounded-lg"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {sortedProperties.map((prop) => {
              const agent = agents.find(a => a.id === prop.agentId);
              return (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  agent={agent}
                  viewMode={viewMode}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
