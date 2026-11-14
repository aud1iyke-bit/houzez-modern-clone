import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  MessageCircle, 
  Building2, 
  ArrowRight 
} from 'lucide-react';

export default function AgentsDirectoryPage() {
  const agents = db.getAgents();
  const allProperties = db.getProperties();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Directorio Oficial</span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Nuestros Agentes Inmobiliarios Certificados
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Profesionales colegiados con amplia experiencia en propiedades residenciales y comerciales de alto standing
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => {
          const propsCount = allProperties.filter(p => p.agentId === agent.id).length;

          return (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Agent Photo */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow text-blue-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0b132b]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow">
                    {propsCount} Inmuebles Activos
                  </div>
                </div>

                {/* Agent Details */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-600 font-bold tracking-wide uppercase text-[10px]">
                      {agent.agencyName}
                    </span>
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>

                  <Link href={`/agents/${agent.id}`}>
                    <h3 className="font-bold text-base text-gray-900 hover:text-blue-600 transition">
                      {agent.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-gray-500 font-medium">{agent.title}</p>
                  <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Contact Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                  <a
                    href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 transition"
                  >
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>Llamar</span>
                  </a>

                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-xs font-semibold text-emerald-800 transition"
                  >
                    <MessageCircle className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <Link
                  href={`/agents/${agent.id}`}
                  className="w-full bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold py-2 rounded-xl transition text-center block"
                >
                  Ver Perfil & Fichas
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
