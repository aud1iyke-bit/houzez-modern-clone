import React from 'react';
import Link from 'next/link';
import { initialAgencies } from '@/lib/db';
import { Building2, MapPin, Phone, Mail, Users, ArrowRight } from 'lucide-react';

export default function AgenciesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Red de Colaboradores</span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Agencias Inmobiliarias Afiliadas
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Oficinas y agencias asociadas que operan con la tecnología y CRM de Houzez
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initialAgencies.map((agency) => (
          <div
            key={agency.id}
            className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
          >
            <div className="flex items-start space-x-4">
              <img
                src={agency.logo}
                alt={agency.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100 shadow shrink-0"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                  {agency.name}
                </h3>
                <div className="flex items-center text-xs text-gray-500 space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{agency.address}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 text-xs">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="w-4 h-4 text-blue-600" />
                <span><strong>{agency.agentsCount}</strong> Asesores</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span><strong>{agency.propertiesCount}</strong> Propiedades</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{agency.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{agency.email}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/properties"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Ver cartera de la agencia</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
