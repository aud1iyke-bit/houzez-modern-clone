'use client';

import React, { useState, useEffect } from 'react';
import { Invoice } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  CreditCard, 
  CheckCircle, 
  Download, 
  FileText, 
  Check, 
  Sparkles, 
  Building2, 
  X,
  Printer
} from 'lucide-react';

export default function InvoicesAndMembershipPage() {
  const { formatPrice, currentUser } = useApp();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetch('/api/invoices')
      .then(res => res.json())
      .then(d => { if (d.success) setInvoices(d.data); })
      .catch(console.error);
  }, []);

  const packages = [
    {
      name: 'Plan Básico Asesor',
      price: 29,
      period: '/mes',
      features: ['Hasta 5 propiedades activas', '1 propiedad destacada', 'CRM básico (leads)', 'Soporte estándar'],
      isCurrent: false
    },
    {
      name: 'Houzez Pro Agent',
      price: 79,
      period: '/mes',
      features: ['Hasta 30 propiedades activas', '10 propiedades destacadas', 'CRM completo con Pipeline Kanban', 'Tours virtuales 360', 'Soporte prioritario 24/7'],
      isCurrent: true,
      popular: true
    },
    {
      name: 'Agencia Enterprise',
      price: 199,
      period: '/mes',
      features: ['Propiedades ilimitadas', 'Destacados ilimitados', 'Múltiples agentes en equipo', 'Acceso a API y webhooks', 'Gerente de cuenta dedicado'],
      isCurrent: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Membresías & Facturación Houzez
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Gestiona tu suscripción profesional de agente y revisa el historial de facturas
        </p>
      </div>

      {/* Membership Tiers Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-gray-900">Planes de Suscripción para Asesores</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                pkg.isCurrent
                  ? 'border-2 border-[#0054a6] shadow-md ring-4 ring-blue-50'
                  : 'border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff5a5f] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Plan Más Recomendado
                </span>
              )}

              <div>
                <h4 className="text-base font-bold text-gray-900 mb-1">{pkg.name}</h4>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-3xl font-black text-gray-900">{pkg.price} €</span>
                  <span className="text-xs text-gray-500 font-semibold">{pkg.period}</span>
                </div>

                <div className="space-y-2.5 border-t border-gray-100 pt-4 text-xs text-gray-600">
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-[#0054a6] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                {pkg.isCurrent ? (
                  <button
                    disabled
                    className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold py-2.5 rounded-xl cursor-default flex items-center justify-center space-x-1.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Plan Actualmente Activo</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Solicitud de cambio al ${pkg.name} enviada.`)}
                    className="w-full bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold py-2.5 rounded-xl transition"
                  >
                    Seleccionar Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-gray-900">Historial de Facturas</h3>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Nº Factura</th>
                <th className="p-4">Concepto / Paquete</th>
                <th className="p-4">Fecha Emisión</th>
                <th className="p-4">Método de Pago</th>
                <th className="p-4">Importe</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-blue-50/30 transition">
                  <td className="p-4 font-mono font-bold text-gray-900">{inv.invoiceNumber}</td>
                  <td className="p-4 font-semibold text-gray-800">{inv.packageName}</td>
                  <td className="p-4 text-gray-500">{inv.date}</td>
                  <td className="p-4 text-gray-600">{inv.paymentMethod}</td>
                  <td className="p-4 font-black text-gray-900">{formatPrice(inv.amount)}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg font-bold transition inline-flex items-center space-x-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ver Factura</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Invoice Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-[#0054a6] text-white rounded flex items-center justify-center font-black">
                    H
                  </div>
                  <span className="font-black text-lg text-gray-900">HOUZEZ REAL ESTATE</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Paseo de la Castellana 95, Madrid</p>
                <p className="text-[11px] text-gray-400">NIF: B-88492019</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase">Factura Oficial</span>
                <p className="text-base font-black text-gray-900 font-mono">{selectedInvoice.invoiceNumber}</p>
                <p className="text-xs text-gray-500">Fecha: {selectedInvoice.date}</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Facturado a:</span>
              <p className="font-bold text-gray-900">{selectedInvoice.clientName}</p>
              <p className="text-gray-500">{selectedInvoice.clientEmail}</p>
            </div>

            {/* Invoice Line Item */}
            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Descripción</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 font-semibold text-gray-800">{selectedInvoice.packageName}</td>
                    <td className="p-3 text-right font-black text-gray-900">{formatPrice(selectedInvoice.amount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-gray-500">Forma de pago: {selectedInvoice.paymentMethod}</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                Pagado
              </span>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Guardar PDF</span>
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
