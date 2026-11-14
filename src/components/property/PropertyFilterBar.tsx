'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Home, 
  Tag, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Bed, 
  Bath, 
  Check 
} from 'lucide-react';

interface PropertyFilterBarProps {
  onFilterChange?: (filters: any) => void;
  compact?: boolean;
}

export default function PropertyFilterBar({ onFilterChange, compact = false }: PropertyFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string>(searchParams.get('status') || 'all');
  const [keyword, setKeyword] = useState<string>(searchParams.get('keyword') || '');
  const [type, setType] = useState<string>(searchParams.get('type') || 'all');
  const [city, setCity] = useState<string>(searchParams.get('city') || 'all');
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get('bedrooms') || '');
  const [bathrooms, setBathrooms] = useState<string>(searchParams.get('bathrooms') || '');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const availableAmenities = [
    'Piscina',
    'Aire Acondicionado',
    'Gimnasio',
    'Vistas al Mar',
    'Ascensor',
    'Terraza',
    'Garaje',
    'Domótica',
    'Calefacción',
    'Seguridad 24/7',
    'Jardín',
    'Jacuzzi'
  ];

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (keyword.trim()) params.set('keyword', keyword.trim());
    if (type !== 'all') params.set('type', type);
    if (city !== 'all') params.set('city', city);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (selectedAmenities.length > 0) params.set('amenities', selectedAmenities.join(','));

    if (onFilterChange) {
      onFilterChange({
        status: status !== 'all' ? status : undefined,
        keyword: keyword.trim() || undefined,
        type: type !== 'all' ? type : undefined,
        city: city !== 'all' ? city : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        bedrooms: bedrooms ? Number(bedrooms) : undefined,
        bathrooms: bathrooms ? Number(bathrooms) : undefined,
      });
    } else {
      router.push(`/properties?${params.toString()}`);
    }
  };

  const handleReset = () => {
    setStatus('all');
    setKeyword('');
    setType('all');
    setCity('all');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setBathrooms('');
    setSelectedAmenities([]);
    if (onFilterChange) {
      onFilterChange({});
    } else {
      router.push('/properties');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 w-full">
      {/* Top Tabs: Houzez Signature Status Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-100 pb-4 mb-4">
        <button
          type="button"
          onClick={() => { setStatus('all'); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
            status === 'all'
              ? 'bg-[#0054a6] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Todos los Inmuebles
        </button>
        <button
          type="button"
          onClick={() => { setStatus('for-sale'); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
            status === 'for-sale'
              ? 'bg-[#0054a6] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          En Venta
        </button>
        <button
          type="button"
          onClick={() => { setStatus('for-rent'); }}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
            status === 'for-rent'
              ? 'bg-[#0054a6] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          En Renta
        </button>
      </div>

      {/* Main Filter Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword search */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Palabra Clave</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Villa, Ático, Piscina..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Tipo de Propiedad</label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 appearance-none"
              >
                <option value="all">Todos los Tipos</option>
                <option value="villa">Villa de Lujo</option>
                <option value="penthouse">Ático / Penthouse</option>
                <option value="apartment">Piso / Apartamento</option>
                <option value="house">Casa Familiar</option>
                <option value="office">Oficina Corporativa</option>
                <option value="studio">Estudio / Loft</option>
              </select>
              <Home className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Location / City */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Ubicación / Ciudad</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 appearance-none"
              >
                <option value="all">Todas las Ciudades</option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Marbella">Marbella</option>
                <option value="Valencia">Valencia</option>
                <option value="Santanyí">Mallorca / Baleares</option>
                <option value="Pozuelo">Pozuelo de Alarcón</option>
              </select>
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Precio Máximo</label>
            <div className="relative">
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800 appearance-none"
              >
                <option value="">Sin Límite</option>
                <option value="5000">Hasta 5.000 €/mes</option>
                <option value="500000">Hasta 500.000 €</option>
                <option value="1000000">Hasta 1.000.000 €</option>
                <option value="2000000">Hasta 2.000.000 €</option>
                <option value="3500000">Hasta 3.500.000 €</option>
                <option value="5000000">Hasta 5.000.000 €</option>
              </select>
              <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Advanced Filters Accordion */}
        {isAdvancedOpen && (
          <div className="pt-4 border-t border-gray-100 space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Min Price */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Precio Mínimo</label>
                <input
                  type="number"
                  placeholder="Min €"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Habitaciones</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+ Habitaciones</option>
                  <option value="2">2+ Habitaciones</option>
                  <option value="3">3+ Habitaciones</option>
                  <option value="4">4+ Habitaciones</option>
                  <option value="5">5+ Habitaciones</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Baños</label>
                <select
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Cualquiera</option>
                  <option value="1">1+ Baños</option>
                  <option value="2">2+ Baños</option>
                  <option value="3">3+ Baños</option>
                  <option value="4">4+ Baños</option>
                </select>
              </div>

              {/* Reset shortcut */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2 px-3 text-xs text-gray-600 hover:text-rose-600 bg-gray-100 hover:bg-rose-50 rounded-lg transition flex items-center justify-center space-x-1 font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpiar Filtros</span>
                </button>
              </div>
            </div>

            {/* Amenities Checklist */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-2">Comodidades y Extras</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {availableAmenities.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() => handleToggleAmenity(amenity)}
                      className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between border transition ${
                        isChecked 
                          ? 'bg-blue-50 border-blue-400 text-blue-700 font-semibold' 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{amenity}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-between pt-2 gap-3">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-xs font-bold text-gray-600 hover:text-[#0054a6] flex items-center space-x-1.5 py-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0054a6]" />
            <span>{isAdvancedOpen ? 'Ocultar Filtros Avanzados' : 'Filtros Avanzados (Habitaciones, Baños, Amenidades)'}</span>
            {isAdvancedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-gray-800 font-semibold px-3 py-2.5"
            >
              Restablecer
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-initial bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Buscar Inmuebles</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
