'use client';

import React from 'react';
import Link from 'next/link';
import { Property, Agent } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  MapPin, 
  Heart, 
  SlidersHorizontal, 
  Camera, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  agent?: Agent;
  viewMode?: 'grid' | 'list';
}

export default function PropertyCard({ property, agent, viewMode = 'grid' }: PropertyCardProps) {
  const { 
    formatPrice, 
    toggleFavorite, 
    isFavorite, 
    addToCompare, 
    removeFromCompare, 
    isInCompare 
  } = useApp();

  const fav = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row group">
        {/* Image Container */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
          <Link href={`/property/${property.id}`} className="block w-full h-full">
            <img 
              src={mainImage} 
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
            {property.featured && (
              <span className="bg-[#0054a6] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                DESTACADO
              </span>
            )}
            <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded shadow ${
              property.status === 'for-sale' ? 'bg-emerald-600' : 'bg-amber-600'
            }`}>
              {property.status === 'for-sale' ? 'EN VENTA' : 'EN RENTA'}
            </span>
            {property.hotOffer && (
              <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center space-x-1">
                <Flame className="w-3 h-3" />
                <span>OFERTA</span>
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
            <button
              onClick={() => toggleFavorite(property.id)}
              title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              className={`p-2 rounded-full transition shadow-md backdrop-blur-sm ${
                fav 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => compared ? removeFromCompare(property.id) : addToCompare(property.id)}
              title={compared ? 'Quitar de comparar' : 'Comparar propiedad'}
              className={`p-2 rounded-full transition shadow-md backdrop-blur-sm ${
                compared 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Photos count */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center space-x-1">
            <Camera className="w-3 h-3" />
            <span>{property.images.length} fotos</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 md:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {property.type}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {property.propertyCode}
              </span>
            </div>

            <Link href={`/property/${property.id}`} className="block">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0054a6] transition line-clamp-1 mb-1.5">
                {property.title}
              </h3>
            </Link>

            <div className="flex items-center text-xs text-gray-500 mb-3">
              <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
              <span className="truncate">{property.address.street}, {property.address.city}</span>
            </div>

            <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
              {property.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-4 gap-2 py-3 border-y border-gray-100 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4 text-blue-500" />
                <span>{property.bedrooms} Hab</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4 text-blue-500" />
                <span>{property.bathrooms} Baños</span>
              </div>
              <div className="flex items-center space-x-1">
                <Maximize2 className="w-4 h-4 text-blue-500" />
                <span>{property.areaM2} m²</span>
              </div>
              <div className="flex items-center space-x-1">
                <Car className="w-4 h-4 text-blue-500" />
                <span>{property.garages} Gar</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer: Price & Agent */}
          <div className="pt-4 flex items-center justify-between mt-2">
            <div>
              <p className="text-xs text-gray-400 uppercase font-medium">Precio</p>
              <div className="text-xl font-black text-gray-900">
                {formatPrice(property.price, property.priceSuffix)}
              </div>
            </div>

            <Link 
              href={`/property/${property.id}`}
              className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid View
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Link href={`/property/${property.id}`} className="block w-full h-full">
          <img 
            src={mainImage} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {property.featured && (
            <span className="bg-[#0054a6] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              DESTACADO
            </span>
          )}
          <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded shadow ${
            property.status === 'for-sale' ? 'bg-emerald-600' : 'bg-amber-600'
          }`}>
            {property.status === 'for-sale' ? 'EN VENTA' : 'EN RENTA'}
          </span>
          {property.hotOffer && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center space-x-0.5">
              <Flame className="w-3 h-3" />
              <span>OFERTA</span>
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 z-10">
          <button
            onClick={() => toggleFavorite(property.id)}
            title={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className={`p-2 rounded-full transition shadow-md backdrop-blur-sm ${
              fav 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => compared ? removeFromCompare(property.id) : addToCompare(property.id)}
            title={compared ? 'Quitar de comparar' : 'Comparar propiedad'}
            className={`p-2 rounded-full transition shadow-md backdrop-blur-sm ${
              compared 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Price Tag on Image */}
        <div className="absolute bottom-3 left-3 bg-[#0b132b]/85 backdrop-blur-md text-white text-sm font-black px-3 py-1 rounded-md shadow-lg border border-white/10">
          {formatPrice(property.price, property.priceSuffix)}
        </div>

        {/* Photos count */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded backdrop-blur-sm flex items-center space-x-1">
          <Camera className="w-3 h-3" />
          <span>{property.images.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="uppercase font-semibold tracking-wider text-blue-600">
              {property.type}
            </span>
            <span className="font-mono text-[11px]">{property.propertyCode}</span>
          </div>

          <Link href={`/property/${property.id}`} className="block">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0054a6] transition line-clamp-1 mb-1">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 shrink-0" />
            <span className="truncate">{property.address.street}, {property.address.city}</span>
          </div>
        </div>

        <div>
          {/* Specs */}
          <div className="grid grid-cols-4 gap-1 py-2.5 border-t border-gray-100 text-xs text-gray-600 font-medium">
            <div className="flex flex-col items-center justify-center p-1 bg-gray-50 rounded">
              <span className="flex items-center text-gray-700 font-bold">
                <Bed className="w-3.5 h-3.5 text-blue-500 mr-1" />
                {property.bedrooms}
              </span>
              <span className="text-[10px] text-gray-400">Hab</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 bg-gray-50 rounded">
              <span className="flex items-center text-gray-700 font-bold">
                <Bath className="w-3.5 h-3.5 text-blue-500 mr-1" />
                {property.bathrooms}
              </span>
              <span className="text-[10px] text-gray-400">Baños</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 bg-gray-50 rounded">
              <span className="flex items-center text-gray-700 font-bold">
                <Maximize2 className="w-3.5 h-3.5 text-blue-500 mr-1" />
                {property.areaM2}
              </span>
              <span className="text-[10px] text-gray-400">m²</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 bg-gray-50 rounded">
              <span className="flex items-center text-gray-700 font-bold">
                <Car className="w-3.5 h-3.5 text-blue-500 mr-1" />
                {property.garages}
              </span>
              <span className="text-[10px] text-gray-400">Gar</span>
            </div>
          </div>

          {/* Agent info & Action */}
          <div className="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <img 
                src={agent?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80'} 
                alt={agent?.name || 'Agente'} 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-gray-600 font-medium truncate max-w-[110px]">
                {agent?.name || 'Houzez Agent'}
              </span>
            </div>

            <Link
              href={`/property/${property.id}`}
              className="text-blue-600 font-semibold hover:text-blue-800 flex items-center space-x-0.5"
            >
              <span>Detalles</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
