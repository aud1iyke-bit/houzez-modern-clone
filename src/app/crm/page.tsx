'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lead, Deal, Inquiry, Activity } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Kanban, 
  Inbox, 
  CalendarCheck2, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus 
} from 'lucide-react';

export default function CrmDashboardPage() {
  const { formatPrice } = useApp();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/crm/leads').then(r => r.json()),
      fetch('/api/crm/deals').then(r => r.json()),
      fetch('/api/crm/inquiries').then(r => r.json()),
      fetch('/api/crm/activities').then(r => r.json()),
    ])
      .then(([leadsRes, dealsRes, inqRes, actRes]) => {
        if (leadsRes.success) setLeads(leadsRes.data);
        if (dealsRes.success) setDeals(dealsRes.data);
        if (inqRes.success) setInquiries(inqRes.data);
        if (actRes.success) setActivities(actRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPipelineValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  const totalCommission = deals.reduce((sum, d) => sum + (d.commission || 0), 0);
  const pendingActivities = activities.filter(a => a.status === 'pending');
  const unreadInquiries = inquiries.filter(i => i.status === 'unread');

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Welcome & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Panel de Control CRM Inmobiliario
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Métricas comerciales, prospección de leads y seguimiento del embudo de ventas
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/crm/deals"
            className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
          >
            <Kanban className="w-4 h-4" />
            <span>Ver Pipeline Kanban</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pipeline Value */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Valor del Pipeline</p>
            <p className="text-2xl font-black text-gray-900 mt-1 text-[#0054a6]">
              {formatPrice(totalPipelineValue)}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center">
              <span>{formatPrice(totalCommission)} comisiones estimadas</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Leads Registrados</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{leads.length}</p>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">
              {leads.filter(l => l.status === 'qualified').length} calificados
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Inquiries */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Consultas Recibidas</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{inquiries.length}</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              {unreadInquiries.length} pendientes de respuesta
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Scheduled Tours & Activities */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Citas & Visitas</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{activities.length}</p>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">
              {pendingActivities.length} próximas en agenda
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <CalendarCheck2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2-Column Split: Recent Leads & Upcoming Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Prospectos Recientes (Leads)</h3>
              <p className="text-xs text-gray-500">Personas interesadas en compra o alquiler</p>
            </div>
            <Link href="/crm/leads" className="text-xs text-blue-600 font-bold hover:underline">
              Ver todos ({leads.length})
            </Link>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 5).map(lead => (
              <div key={lead.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-bold text-gray-900">{lead.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      lead.status === 'qualified' ? 'bg-indigo-100 text-indigo-800' :
                      lead.status === 'negotiation' ? 'bg-amber-100 text-amber-800' :
                      lead.status === 'won' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{lead.email} • {lead.phone}</p>
                  {lead.propertyTitle && (
                    <p className="text-[10px] text-blue-600 truncate max-w-xs mt-0.5">
                      Interesado en: {lead.propertyTitle}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">
                    {new Date(lead.createdAt).toLocaleDateString('es-ES')}
                  </span>
                  <Link
                    href="/crm/leads"
                    className="text-[11px] text-blue-600 font-bold hover:underline"
                  >
                    Detalles →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Activities & Scheduled Tours */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Agenda & Visitas Programadas</h3>
              <p className="text-xs text-gray-500">Recorridos a propiedades y tareas pendientes</p>
            </div>
            <Link href="/crm/activities" className="text-xs text-blue-600 font-bold hover:underline">
              Ver agenda ({activities.length})
            </Link>
          </div>

          <div className="space-y-3">
            {activities.slice(0, 5).map(act => (
              <div key={act.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    act.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <CalendarCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{act.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {act.dueDate} a las {act.dueTime} • Cliente: {act.clientName || 'General'}
                    </p>
                    {act.propertyTitle && (
                      <p className="text-[10px] text-gray-400 truncate max-w-xs">
                        Propiedad: {act.propertyTitle}
                      </p>
                    )}
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  act.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {act.status === 'completed' ? 'Completada' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
