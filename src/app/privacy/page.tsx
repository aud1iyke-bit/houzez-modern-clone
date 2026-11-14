import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Política de Privacidad & Cookies</h1>
        <p className="text-xs text-gray-400 mt-1">Reglamento General de Protección de Datos (RGPD)</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-base text-gray-900">1. Responsable del Tratamiento</h2>
        <p>
          Houzez Replica Platform, con domicilio social en Paseo de la Castellana 95, Madrid, España. Email de contacto para el ejercicio de derechos ARCO: privacidad@houzez-prime.com.
        </p>

        <h2 className="font-bold text-base text-gray-900 pt-3">2. Finalidad del Tratamiento</h2>
        <p>
          Sus datos de contacto son tratados con el fin de tramitar consultas sobre inmuebles específicos, gestionar citas de visita presencial o virtual, y coordinar el embudo de ventas en nuestro sistema CRM.
        </p>

        <h2 className="font-bold text-base text-gray-900 pt-3">3. Derechos del Usuario</h2>
        <p>
          Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, supresión, limitación y oposición remitiendo una solicitud fehaciente a nuestro canal de soporte.
        </p>
      </div>
    </div>
  );
}
