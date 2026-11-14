'use client';

import React, { useState, useEffect } from 'react';
import { Property, Agent } from '@/types';
import PropertyCard from '@/components/property/PropertyCard';
import InteractiveMap from '@/components/property/InteractiveMap';
import { Search, MapPin, SlidersHorizontal, Home, Tag } from 'lucide-react';

export default function HalfMapSearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(d => {
        if (d.success) setProperties(d.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/agents')
      .then(res => res.json())
      .then(d => { if (d.success) setAgents(d.data); })
      .catch(() => {});
  }, []);

  const filteredProperties = properties.filter(p => {
    if (typeFilter !== 'all' && p.type !== typeFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.address.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full h-[calc(100vh-105px)] flex flex-col overflow-hidden bg-white">
      {/* Top Compact Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 z-20 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Keyword Search */}
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Buscar ciudad, calle, título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-md transition ${statusFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('for-sale')}
              className={`px-2.5 py-1 rounded-md transition ${statusFilter === 'for-sale' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
            >
              Venta
            </button>
            <button
              onClick={() => setStatusFilter('for-rent')}
              className={`px-2.5 py-1 rounded-md transition ${statusFilter === 'for-rent' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
            >
              Renta
            </button>
          </div>

          {/* Type dropdown */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-semibold text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Cualquier Tipo</option>
            <option value="villa">Villa</option>
            <option value="penthouse">Ático</option>
            <option value="apartment">Apartamento</option>
            <option value="house">Casa</option>
            <option value="office">Oficina</option>
            <option value="studio">Estudio</option>
          </select>
        </div>

        <div className="text-xs font-bold text-gray-500">
          <span className="text-blue-600 font-black">{filteredProperties.length}</span> inmuebles en esta vista
        </div>
      </div>

      {/* Main Split Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Scrollable Properties List */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50 border-r border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
            <span>Haz clic en un marcador para centrar la propiedad</span>
            <span className="font-semibold text-gray-700">Orden: Destacadas</span>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500">Cargando mapa interactivo...</p>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
              <p className="text-sm font-bold text-gray-700">No hay inmuebles con estos criterios.</p>
              <button 
                onClick={() => { setStatusFilter('all'); setTypeFilter('all'); setSearchQuery(''); }}
                className="mt-2 text-xs text-blue-600 underline font-semibold"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProperties.map(prop => {
                const agent = agents.find(a => a.id === prop.agentId);
                const isSelected = selectedPropertyId === prop.id;

                return (
                  <div 
                    key={prop.id}
                    onMouseEnter={() => setSelectedPropertyId(prop.id)}
                    className={`transition-all duration-200 rounded-xl ${
                      isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                    }`}
                  >
                    <PropertyCard 
                      property={prop} 
                      agent={agent} 
                      viewMode="grid" 
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Interactive Map */}
        <div className="w-full lg:w-1/2 h-full relative">
          <InteractiveMap
            properties={filteredProperties}
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={(id) => setSelectedPropertyId(id)}
            className="w-full h-full rounded-none border-none"
          />
        </div>
      </div>
    </div>
  );
}
