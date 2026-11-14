'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, Home, ExternalLink, X } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId?: string;
  onSelectProperty?: (id: string) => void;
  className?: string;
}

export default function InteractiveMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = "w-full h-full min-h-[450px]"
}: InteractiveMapProps) {
  const { formatPrice } = useApp();
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.find(p => p.id === selectedPropertyId) || properties[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');

  // Compute coordinate bounds
  const lats = properties.map(p => p.address.lat || 40.4168);
  const lngs = properties.map(p => p.address.lng || -3.7038);
  const minLat = Math.min(...lats, 36.0);
  const maxLat = Math.max(...lats, 42.0);
  const minLng = Math.min(...lngs, -5.5);
  const maxLng = Math.max(...lngs, 3.5);

  const getPositionPercent = (lat: number, lng: number) => {
    // Normalise to 10% - 90% coordinates inside the map canvas
    const y = 90 - ((lat - minLat) / (maxLat - minLat || 1)) * 75;
    const x = 12 + ((lng - minLng) / (maxLng - minLng || 1)) * 76;
    return { 
      top: `${Math.max(12, Math.min(88, y))}%`, 
      left: `${Math.max(10, Math.min(88, x))}%` 
    };
  };

  const handleMarkerClick = (property: Property) => {
    setActiveProperty(property);
    if (onSelectProperty) onSelectProperty(property.id);
  };

  return (
    <div className={`relative bg-[#e5ebf0] rounded-xl overflow-hidden border border-gray-200 select-none ${className}`}>
      {/* Simulated Map Canvas Texture & Grid */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          mapStyle === 'streets' 
            ? 'bg-[#e4ecef] opacity-100' 
            : 'bg-[#1a2e3b] opacity-95'
        }`}
        style={{
          backgroundImage: mapStyle === 'streets' 
            ? 'radial-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)'
            : 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Decorative Roads & Coastline curves */}
        <svg className="w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 1000 600">
          <path d="M 0,220 Q 300,180 500,280 T 1000,260" fill="none" stroke={mapStyle === 'streets' ? '#94a3b8' : '#334155'} strokeWidth="14" />
          <path d="M 200,0 Q 280,300 450,420 T 600,600" fill="none" stroke={mapStyle === 'streets' ? '#94a3b8' : '#334155'} strokeWidth="10" />
          <path d="M 0,480 Q 400,520 700,450 T 1000,520" fill="none" stroke={mapStyle === 'streets' ? '#38bdf8' : '#0284c7'} strokeWidth="26" />
          <path d="M 400,0 L 480,600" fill="none" stroke={mapStyle === 'streets' ? '#cbd5e1' : '#1e293b'} strokeWidth="6" />
          <path d="M 0,140 L 1000,140" fill="none" stroke={mapStyle === 'streets' ? '#cbd5e1' : '#1e293b'} strokeWidth="6" />
        </svg>
      </div>

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            title="Acercar mapa"
            className="p-2 hover:bg-gray-100 text-gray-700 border-b border-gray-200"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            title="Alejar mapa"
            className="p-2 hover:bg-gray-100 text-gray-700"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => setMapStyle(prev => prev === 'streets' ? 'satellite' : 'streets')}
          title="Cambiar capa de mapa"
          className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 text-gray-700"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Map Attribution Tag */}
      <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm text-[10px] text-gray-600 px-2 py-0.5 rounded shadow z-10">
        Houzez GeoMap Interactive • OpenStreetMap Engine
      </div>

      {/* Interactive Price Markers */}
      <div 
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        {properties.map((prop) => {
          const pos = getPositionPercent(prop.address.lat, prop.address.lng);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              {/* Houzez Signature Price Pill Marker */}
              <button
                type="button"
                onClick={() => handleMarkerClick(prop)}
                className={`relative px-2.5 py-1 rounded-full text-xs font-black shadow-lg transition-all duration-200 flex items-center space-x-1 border ${
                  isSelected
                    ? 'bg-[#ff5a5f] text-white border-white scale-110 ring-4 ring-rose-300/60 z-30'
                    : 'bg-[#0054a6] hover:bg-[#003b75] text-white border-white hover:scale-105'
                }`}
              >
                <span>{formatPrice(prop.price)}</span>
                {/* Pointer tip */}
                <div 
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border-r border-b ${
                    isSelected ? 'bg-[#ff5a5f] border-white' : 'bg-[#0054a6] border-white'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Property Popup Card */}
      {activeProperty && (
        <div className="absolute bottom-4 left-4 z-30 max-w-xs sm:max-w-sm w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          <div className="relative h-32 w-full overflow-hidden">
            <img 
              src={activeProperty.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'} 
              alt={activeProperty.title}
              className="w-full h-full object-cover" 
            />
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-2 left-2 bg-[#0054a6] text-white text-xs font-bold px-2 py-0.5 rounded shadow">
              {formatPrice(activeProperty.price, activeProperty.priceSuffix)}
            </div>
          </div>

          <div className="p-3">
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
              {activeProperty.type} • {activeProperty.address.city}
            </div>
            <h4 className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">
              {activeProperty.title}
            </h4>
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
              <span>{activeProperty.bedrooms} Hab • {activeProperty.bathrooms} Baños • {activeProperty.areaM2} m²</span>
              <Link 
                href={`/property/${activeProperty.id}`}
                className="text-blue-600 font-bold hover:underline flex items-center space-x-0.5"
              >
                <span>Ver Ficha</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
