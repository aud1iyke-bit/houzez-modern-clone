'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  Eye, 
  Heart, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Briefcase 
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { currentUser, favorites, formatPrice } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(d => {
        if (d.success) setProperties(d.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalViews = properties.reduce((sum, p) => sum + (p.viewsCount || 0), 0);
  const featuredCount = properties.filter(p => p.featured).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0054a6] to-[#003b75] text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Panel de Asesor Certificado</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            ¡Hola de nuevo, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Gestiona tus inmuebles publicados, revisa el rendimiento de visualizaciones y añade nuevas propiedades a la cartera.
          </p>
        </div>

        <Link
          href="/dashboard/add-property"
          className="bg-[#ff5a5f] hover:bg-[#e0484d] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition shadow-lg flex items-center space-x-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publicar Inmueble Nuevo</span>
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Inmuebles Activos</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{properties.length}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">Todos publicados online</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Visualizaciones Totales</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{totalViews.toLocaleString()}</p>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">+14% este mes</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Propiedades Destacadas</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{featuredCount}</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">Posicionamiento prioritario</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Favoritos Guardados</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{favorites.length}</p>
            <p className="text-[11px] text-rose-500 font-semibold mt-1">En tu lista personal</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/my-properties"
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0054a6] flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition">
              Administrar Inmuebles
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Edita precios, actualiza fotos, destaca propiedades o desactiva anuncios de tu cartera.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 flex items-center space-x-1">
            <span>Ver mis inmuebles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/crm"
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 group-hover:text-indigo-600 transition">
              CRM & Pipeline de Ventas
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Mueve tratos en el embudo comercial, consulta prospectos calificados y citas de visita.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 flex items-center space-x-1">
            <span>Abrir CRM Inmobiliario</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/invoices"
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-600 transition">
              Membresía & Facturación
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Plan activo: Houzez Pro Agent. Descarga tus facturas oficiales y renueva tus cupos destacados.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
            <span>Ver facturación</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Recent Properties Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Inmuebles Recientes en Cartera</h3>
            <p className="text-xs text-gray-500">Últimas propiedades incorporadas al catálogo</p>
          </div>
          <Link href="/dashboard/my-properties" className="text-xs font-bold text-blue-600 hover:underline">
            Ver todas ({properties.length})
          </Link>
        </div>

        <div className="space-y-3">
          {properties.slice(0, 4).map(p => (
            <div key={p.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100 gap-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={p.images[0]} 
                  alt={p.title} 
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" 
                />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{p.title}</h4>
                  <p className="text-[11px] text-gray-500">{p.address.city} • Ref: {p.propertyCode}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-black text-[#0054a6]">{formatPrice(p.price, p.priceSuffix)}</p>
                <span className="text-[10px] text-gray-400 block">{p.viewsCount} vistas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
