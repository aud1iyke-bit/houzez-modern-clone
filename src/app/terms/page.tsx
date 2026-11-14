import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Términos y Condiciones</h1>
        <p className="text-xs text-gray-400 mt-1">Última actualización: {new Date().getFullYear()}</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-base text-gray-900">1. Aceptación de los Términos</h2>
        <p>
          Al acceder y utilizar la plataforma Houzez Replica, usted acepta estar legalmente vinculado a las presentes condiciones de uso. Nuestra plataforma proporciona servicios de catálogo inmobiliario, herramientas de prospección CRM y cálculo financiero orientativo.
        </p>

        <h2 className="font-bold text-base text-gray-900 pt-3">2. Información de Propiedades</h2>
        <p>
          Toda la información relativa a características, superficies, metros cuadrados, precios y calificaciones energéticas es facilitada por los agentes autorizados y propietarios. Houzez no asume responsabilidad directa por inexactitudes o variaciones de mercado no comunicadas.
        </p>

        <h2 className="font-bold text-base text-gray-900 pt-3">3. Uso del CRM y Datos Comerciales</h2>
        <p>
          Los datos de contacto recabados en los formularios de consulta y citas de visita se procesan de conformidad con la normativa de protección de datos personales y se destinan exclusivamente al seguimiento de la intermediación solicitada.
        </p>
      </div>
    </div>
  );
}
