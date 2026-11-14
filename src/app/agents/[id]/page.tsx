import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import PropertyCard from '@/components/property/PropertyCard';
import ContactAgentCard from '@/components/property/ContactAgentCard';
import { 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  MessageCircle, 
  Building2, 
  MapPin, 
  Award, 
  CheckCircle2 
} from 'lucide-react';

interface AgentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentDetailPage({ params }: AgentDetailPageProps) {
  const { id } = await params;
  const agent = db.getAgentById(id);

  if (!agent) {
    notFound();
  }

  const agentProperties = db.getProperties({ agentId: agent.id });

  return (
    <div className="w-full bg-[#f8fafc] py-10 px-4 sm:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400">
          <Link href="/" className="hover:text-blue-600">Inicio</Link> / <Link href="/agents" className="hover:text-blue-600">Agentes</Link> / <span className="text-gray-700 font-semibold">{agent.name}</span>
        </div>

        {/* Agent Profile Hero Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-start gap-8">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md shrink-0">
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
                  {agent.agencyName}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {agent.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">{agent.title}</p>
              </div>

              <div className="flex items-center space-x-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span className="font-black text-sm">{agent.rating}</span>
                <span className="text-xs text-amber-600 font-medium">({agent.reviewCount} valoraciones)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
              {agent.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-600 border-t border-gray-100">
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Licencia: {agent.licenseNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Active Listings & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Listings by this Agent */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  Inmuebles en Gestión ({agentProperties.length})
                </h2>
                <p className="text-xs text-gray-500">Cartera inmobiliaria gestionada directamente por {agent.name}</p>
              </div>
            </div>

            {agentProperties.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
                <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Este agente no tiene inmuebles públicos asignados en este momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {agentProperties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} agent={agent} />
                ))}
              </div>
            )}
          </div>

          {/* Contact Agent Sidebar */}
          <div>
            <div className="sticky top-24">
              <ContactAgentCard agent={agent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
