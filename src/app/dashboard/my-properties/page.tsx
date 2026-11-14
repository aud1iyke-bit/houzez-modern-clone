'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  Sparkles, 
  Trash2, 
  Edit, 
  Eye, 
  ExternalLink,
  Flame
} from 'lucide-react';

export default function MyPropertiesPage() {
  const { formatPrice } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (data.success) setProperties(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleToggleFeatured = async (prop: Property) => {
    const updatedFeatured = !prop.featured;
    try {
      await fetch(`/api/properties/${prop.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: updatedFeatured })
      });
      setProperties(properties.map(p => p.id === prop.id ? { ...p, featured: updatedFeatured } : p));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este inmueble permanentemente?')) return;
    try {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      setProperties(properties.filter(p => p.id !== id));
      alert('Propiedad eliminada.');
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = properties.filter(p => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.address.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Mis Propiedades Publicadas
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Administra el estado, visibilidad y posicionamiento de tus anuncios en Houzez
          </p>
        </div>

        <Link
          href="/dashboard/add-property"
          className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Añadir Nueva Propiedad</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar en mis anuncios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <span className="text-xs font-bold text-gray-500">
          {filtered.length} inmuebles en cartera
        </span>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Propiedad</th>
                <th className="p-4">Tipo & Estado</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Vistas</th>
                <th className="p-4 text-center">Destacado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(prop => (
                <tr key={prop.id} className="hover:bg-blue-50/40 transition">
                  {/* Property Info */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title} 
                        className="w-16 h-12 rounded-lg object-cover border border-gray-200 shrink-0" 
                      />
                      <div className="min-w-0 max-w-xs">
                        <Link href={`/property/${prop.id}`} className="font-bold text-gray-900 hover:text-blue-600 truncate block">
                          {prop.title}
                        </Link>
                        <p className="text-[11px] text-gray-400 truncate">{prop.address.street}, {prop.address.city}</p>
                        <span className="font-mono text-[10px] text-gray-400 font-medium">Ref: {prop.propertyCode}</span>
                      </div>
                    </div>
                  </td>

                  {/* Type & Status */}
                  <td className="p-4 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded block w-max">
                      {prop.type}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded block w-max ${
                      prop.status === 'for-sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {prop.status === 'for-sale' ? 'En Venta' : 'En Renta'}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-black text-sm text-[#0054a6]">
                    {formatPrice(prop.price, prop.priceSuffix)}
                  </td>

                  {/* Views */}
                  <td className="p-4 text-gray-600 font-semibold">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      <span>{prop.viewsCount || 1}</span>
                    </div>
                  </td>

                  {/* Featured Toggle */}
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(prop)}
                      title={prop.featured ? 'Desactivar destacado' : 'Promocionar como destacado'}
                      className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center space-x-1 mx-auto ${
                        prop.featured
                          ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-xs'
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:text-gray-700'
                      }`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${prop.featured ? 'text-amber-500 fill-current' : ''}`} />
                      <span>{prop.featured ? 'Activo' : 'No'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/property/${prop.id}`}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg font-semibold transition inline-flex items-center space-x-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Ver</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 p-1.5"
                      title="Eliminar inmueble"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
