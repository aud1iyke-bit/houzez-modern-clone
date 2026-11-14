'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Property } from '@/types';
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react';

export default function CompareFloatingBar() {
  const { comparedProperties, removeFromCompare, clearCompare, formatPrice } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (comparedProperties.length === 0) {
      setProperties([]);
      return;
    }

    // Fetch details of compared properties
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const matched = data.data.filter((p: Property) => comparedProperties.includes(p.id));
          setProperties(matched);
        }
      })
      .catch(() => {});
  }, [comparedProperties]);

  if (comparedProperties.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-fade-in">
      <div className="bg-[#0b132b] text-white rounded-2xl shadow-2xl border border-gray-700/80 p-3 sm:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 overflow-x-auto py-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-400 shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Comparar ({comparedProperties.length}/4):</span>
          </div>

          <div className="flex items-center space-x-2">
            {properties.map(p => (
              <div key={p.id} className="relative group shrink-0">
                <img
                  src={p.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80'}
                  alt={p.title}
                  title={p.title}
                  className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                />
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-0.5 hover:bg-rose-700 transition shadow"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded transition"
          >
            Limpiar
          </button>
          <Link
            href="/compare"
            className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center space-x-1 shadow"
          >
            <span>Ver Tabla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
