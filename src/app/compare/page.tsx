'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Property } from '@/types';
import { SlidersHorizontal, X, Plus, Check, ArrowRight, Home } from 'lucide-react';

export default function ComparePage() {
  const { comparedProperties, removeFromCompare, clearCompare, formatPrice } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          const matched = d.data.filter((p: Property) => comparedProperties.includes(p.id));
          setProperties(matched);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [comparedProperties]);

  const allAmenities = [
    'Piscina Infinity',
    'Aire Acondicionado Central',
    'Gimnasio Privado',
    'Vistas al Mar',
    'Ascensor Privado',
    'Terraza Panorámica 360°',
    'Garaje Subterráneo',
    'Domótica Smart Home',
    'Seguridad 24/7',
    'Calefacción por Suelo Radiante',
    'Jacuzzi',
    'Bodega'
  ];

  if (properties.length === 0 && !loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SlidersHorizontal className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">No has seleccionado propiedades para comparar</h2>
        <p className="text-sm text-gray-500 mb-6">
          Puedes comparar hasta 4 propiedades en paralelo. Explora nuestro catálogo y presiona el icono de balanza/comparación en cada ficha.
        </p>
        <Link
          href="/properties"
          className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-6 py-3 rounded-xl transition inline-flex items-center space-x-2"
        >
          <span>Explorar Catálogo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="text-xs text-gray-400 mb-1">Inicio / Comparar Propiedades</div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Tabla Comparativa de Inmuebles ({properties.length}/4)
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={clearCompare}
            className="text-xs text-gray-500 hover:text-rose-600 font-semibold px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Limpiar Comparación
          </button>
          <Link
            href="/properties"
            className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
          >
            + Añadir Más
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <tbody>
            {/* Header row: Photos & Titles */}
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <td className="p-4 font-bold text-gray-400 uppercase w-48 align-top">Inmueble</td>
              {properties.map(p => (
                <td key={p.id} className="p-4 w-72 align-top">
                  <div className="relative group mb-3">
                    <img 
                      src={p.images[0]} 
                      alt={p.title} 
                      className="w-full h-40 object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <Link href={`/property/${p.id}`} className="font-bold text-gray-900 hover:text-blue-600 text-sm line-clamp-2">
                    {p.title}
                  </Link>
                  <p className="text-[11px] text-gray-400 mt-1">{p.address.city}, {p.address.state}</p>
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Precio</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-black text-sm text-[#0054a6]">
                  {formatPrice(p.price, p.priceSuffix)}
                </td>
              ))}
            </tr>

            {/* Property Code */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Código Referencia</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-mono text-gray-600">
                  {p.propertyCode}
                </td>
              ))}
            </tr>

            {/* Type */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Tipo de Inmueble</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-semibold text-gray-800 capitalize">
                  {p.type}
                </td>
              ))}
            </tr>

            {/* Status */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Estado</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.status === 'for-sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.status === 'for-sale' ? 'En Venta' : 'En Renta'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Bedrooms */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Habitaciones</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-bold text-gray-900">
                  {p.bedrooms}
                </td>
              ))}
            </tr>

            {/* Bathrooms */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Baños</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-bold text-gray-900">
                  {p.bathrooms}
                </td>
              ))}
            </tr>

            {/* Area */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Superficie</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 font-bold text-gray-900">
                  {p.areaM2} m²
                </td>
              ))}
            </tr>

            {/* Garages */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Garajes</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 text-gray-700">
                  {p.garages} plazas
                </td>
              ))}
            </tr>

            {/* Year Built */}
            <tr className="border-b border-gray-100 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Año de Construcción</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5 text-gray-700">
                  {p.yearBuilt}
                </td>
              ))}
            </tr>

            {/* Energy Rating */}
            <tr className="border-b border-gray-200 hover:bg-blue-50/30">
              <td className="p-3.5 font-bold text-gray-500 bg-gray-50/30">Calificación Energética</td>
              {properties.map(p => (
                <td key={p.id} className="p-3.5">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                    {p.energyRating || 'A+'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Amenities Checklist Header */}
            <tr className="bg-gray-100 text-gray-700 font-bold uppercase text-[10px] tracking-wider">
              <td colSpan={properties.length + 1} className="p-3.5">
                Comparativa de Comodidades & Equipamiento
              </td>
            </tr>

            {/* Amenities rows */}
            {allAmenities.map(amenity => (
              <tr key={amenity} className="border-b border-gray-100 hover:bg-blue-50/30">
                <td className="p-3 font-semibold text-gray-600 bg-gray-50/20">{amenity}</td>
                {properties.map(p => {
                  const hasIt = p.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()));
                  return (
                    <td key={p.id} className="p-3">
                      {hasIt ? (
                        <div className="flex items-center text-emerald-600 font-bold space-x-1">
                          <Check className="w-4 h-4" />
                          <span>Incluido</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-300 space-x-1">
                          <X className="w-4 h-4" />
                          <span>No disponible</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
