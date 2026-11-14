import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilterBar from '@/components/property/PropertyFilterBar';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Briefcase, 
  Phone, 
  Mail, 
  Star 
} from 'lucide-react';

export default async function HomePage() {
  const properties = db.getProperties({ featured: true });
  const allProperties = db.getProperties();
  const agents = db.getAgents();

  const propertyTypes = [
    { type: 'villa', label: 'Villas de Lujo', count: allProperties.filter(p => p.type === 'villa').length, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
    { type: 'penthouse', label: 'Áticos Exclusivos', count: allProperties.filter(p => p.type === 'penthouse').length, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { type: 'apartment', label: 'Pisos Señoriales', count: allProperties.filter(p => p.type === 'apartment').length, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80' },
    { type: 'house', label: 'Casas Familiares', count: allProperties.filter(p => p.type === 'house').length, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80' },
    { type: 'office', label: 'Oficinas Prime', count: allProperties.filter(p => p.type === 'office').length, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center bg-gray-900 text-white overflow-hidden py-16 px-4">
        {/* Background photo with gradient overlays */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b132b]/85 via-[#0b132b]/75 to-[#0b132b]/95" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>La Réplica Moderna de Houzez sin WordPress</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl leading-tight mb-4 drop-shadow-sm">
            Encuentra la Propiedad de Tus Sueños con <span className="text-[#0084ff]">Houzez</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Plataforma inmobiliaria integral: catálogo de alta gama, búsqueda en mapa interactivo en tiempo real y CRM de ventas con embudo de tratos y gestión de prospectos.
          </p>

          {/* Integrated Search Filter Bar */}
          <div className="w-full max-w-4xl text-left">
            <PropertyFilterBar />
          </div>
        </div>
      </section>

      {/* Trust & Stats Counter Bar */}
      <section className="bg-white border-y border-gray-200/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#0054a6]">650+</p>
            <p className="text-xs text-gray-500 font-semibold uppercase mt-1">Propiedades Exclusivas</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">45+</p>
            <p className="text-xs text-gray-500 font-semibold uppercase mt-1">Agentes Certificados</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-[#0054a6]">98.7%</p>
            <p className="text-xs text-gray-500 font-semibold uppercase mt-1">Clientes Satisfechos</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-gray-900">185M €</p>
            <p className="text-xs text-gray-500 font-semibold uppercase mt-1">Volumen Transaccionado</p>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Selección Exclusiva</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Propiedades Destacadas
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Las mejores residencias y oportunidades de inversión en España
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0054a6] hover:text-[#003b75] bg-blue-50 px-4 py-2.5 rounded-lg transition"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid of properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((property) => {
            const agent = agents.find(a => a.id === property.agentId);
            return (
              <PropertyCard 
                key={property.id} 
                property={property} 
                agent={agent} 
              />
            );
          })}
        </div>
      </section>

      {/* Explore by Property Types */}
      <section className="bg-gray-100/70 py-16 px-4 sm:px-8 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Categorías</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Explora por Tipo de Propiedad
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Encuentra la tipología perfecta adaptada a tu estilo de vida
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {propertyTypes.map((cat) => (
              <Link
                key={cat.type}
                href={`/properties?type=${cat.type}`}
                className="group relative rounded-xl overflow-hidden h-44 shadow-sm hover:shadow-lg transition-all duration-300 block"
              >
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm drop-shadow">{cat.label}</h3>
                  <p className="text-[11px] text-gray-300">{cat.count} propiedades</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Split Half Map Promo Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="bg-[#0b132b] rounded-3xl overflow-hidden text-white shadow-xl flex flex-col lg:flex-row items-center justify-between">
          <div className="p-8 sm:p-12 lg:w-1/2 space-y-5">
            <div className="inline-flex items-center space-x-1.5 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Búsqueda Split Screen</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Explora Propiedades Directamente en el Mapa Interactivo
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              La funcionalidad emblemática de Houzez: visualiza los marcadores con precios en tiempo real sobre el mapa mientras navegas las fichas en paralelo con sincronización instantánea.
            </p>
            <div className="pt-2">
              <Link
                href="/map-search"
                className="bg-[#0054a6] hover:bg-[#004080] text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-lg inline-flex items-center space-x-2"
              >
                <span>Abrir Búsqueda Split en Mapa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full p-6 sm:p-10 flex justify-center">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
              <div className="relative h-64 rounded-xl overflow-hidden border border-white/20 bg-slate-800">
                <img 
                  src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=800&q=80" 
                  alt="Mapa Interactivo Houzez" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 left-6 bg-[#ff5a5f] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                  3.850.000 €
                </div>
                <div className="absolute top-16 right-10 bg-[#0054a6] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                  2.450.000 €
                </div>
                <div className="absolute bottom-6 left-12 bg-[#0054a6] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-lg">
                  1.980.000 €
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Agents Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-gray-200/80">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Equipo Profesional</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Nuestros Agentes Inmobiliarios Certificados
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Asesoría experta y discreción absoluta en cada transacción
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => {
            const agentPropsCount = allProperties.filter(p => p.agentId === agent.id).length;
            return (
              <div 
                key={agent.id}
                className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-sm hover:shadow-lg transition-all text-center flex flex-col justify-between group"
              >
                <div>
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img 
                      src={agent.avatar} 
                      alt={agent.name} 
                      className="w-full h-full rounded-full object-cover ring-4 ring-blue-50 group-hover:ring-blue-100 transition"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <Link href={`/agents/${agent.id}`}>
                    <h3 className="font-bold text-base text-gray-900 hover:text-blue-600 transition mb-0.5">
                      {agent.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-blue-600 font-semibold mb-2">{agent.title}</p>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">{agent.bio}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">{agentPropsCount} inmuebles</span>
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{agent.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CRM Platform Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
              <Briefcase className="w-3.5 h-3.5 text-blue-300" />
              <span>CRM Integrado Listo para Usar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              ¿Eres Agente o Agencia Inmobiliaria?
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Administra prospectos, traslada tratos en el embudo visual Kanban, agenda citas presenciales y virtuales, y publica propiedades en segundos sin necesitar WordPress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/crm"
              className="bg-white hover:bg-gray-100 text-[#0054a6] font-bold text-sm px-6 py-3 rounded-xl transition shadow text-center"
            >
              Acceder al CRM Inmobiliario
            </Link>
            <Link
              href="/dashboard/add-property"
              className="bg-[#ff5a5f] hover:bg-[#e0484d] text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow text-center"
            >
              Publicar Inmueble
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
