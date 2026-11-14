'use client';

import React, { useState, useEffect } from 'react';
import { Inquiry } from '@/types';
import { 
  Inbox, 
  Calendar, 
  Video, 
  Users, 
  Mail, 
  Phone, 
  Check, 
  MessageSquare, 
  UserPlus, 
  Search,
  ExternalLink
} from 'lucide-react';

export default function CrmInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'general' | 'schedule_tour'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/crm/inquiries');
      const data = await res.json();
      if (data.success) setInquiries(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await fetch(`/api/crm/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleConvertToLead = async (inq: Inquiry) => {
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inq.senderName,
          email: inq.senderEmail,
          phone: inq.senderPhone,
          propertyId: inq.propertyId,
          propertyTitle: inq.propertyTitle,
          notes: `Convertido desde consulta: ${inq.message}`,
          status: 'qualified',
          source: inq.type === 'schedule_tour' ? 'schedule_tour' : 'website_inquiry'
        })
      });
      const data = await res.json();
      if (data.success) {
        handleUpdateStatus(inq.id, 'converted_lead');
        alert('¡Consulta convertida con éxito en un nuevo Lead en el CRM!');
      }
    } catch (e) {
      alert('Error al convertir consulta a lead.');
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    if (filterType !== 'all' && i.type !== filterType) return false;
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Buzón de Consultas & Citas de Visita
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Mensajes recibidos desde las fichas de propiedades y solicitudes de visita guiada
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
            {inquiries.length} mensajes en total
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              filterType === 'all' ? 'bg-[#0054a6] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterType('schedule_tour')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              filterType === 'schedule_tour' ? 'bg-[#0054a6] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Citas de Visita ({inquiries.filter(i => i.type === 'schedule_tour').length})
          </button>
          <button
            onClick={() => setFilterType('general')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              filterType === 'general' ? 'bg-[#0054a6] text-white shadow-sm' : 'bg-gray-100 text-gray-600'
            }`}
          >
            Consultas Generales ({inquiries.filter(i => i.type === 'general').length})
          </button>
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-semibold text-gray-700 focus:outline-none"
        >
          <option value="all">Cualquier Estado</option>
          <option value="unread">No Leído</option>
          <option value="read">Leído</option>
          <option value="replied">Respondido</option>
          <option value="converted_lead">Convertido a Lead</option>
        </select>
      </div>

      {/* Inquiries List */}
      <div className="space-y-3">
        {filteredInquiries.map(inq => (
          <div
            key={inq.id}
            className={`bg-white rounded-2xl p-5 border transition-all shadow-sm hover:shadow-md space-y-3 ${
              inq.status === 'unread' ? 'border-l-4 border-l-blue-600 border-gray-200' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  inq.type === 'schedule_tour' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {inq.type === 'schedule_tour' ? 'Agendar Visita' : 'Consulta Ficha'}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  inq.status === 'unread' ? 'bg-rose-100 text-rose-800 font-black' :
                  inq.status === 'replied' ? 'bg-emerald-100 text-emerald-800' :
                  inq.status === 'converted_lead' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {inq.status}
                </span>

                <span className="text-xs font-bold text-gray-900">{inq.senderName}</span>
              </div>

              <span className="text-[11px] text-gray-400">
                {new Date(inq.createdAt).toLocaleString('es-ES')}
              </span>
            </div>

            {/* Tour info pill if applicable */}
            {inq.type === 'schedule_tour' && inq.tourDate && (
              <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-bold">
                  Fecha Solicitada: {inq.tourDate} a las {inq.tourTime}
                </span>
                <span>•</span>
                <span className="capitalize font-semibold">
                  Modalidad: {inq.tourType === 'video_call' ? 'Videollamada' : 'Presencial'}
                </span>
              </div>
            )}

            {/* Message Body */}
            <p className="text-xs text-gray-700 leading-relaxed bg-gray-50/70 p-3 rounded-xl border border-gray-100">
              "{inq.message}"
            </p>

            {/* Inquired Property */}
            <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 pt-1">
              <div className="flex items-center space-x-4">
                <span>Ref Inmueble: <strong className="text-gray-800">{inq.propertyTitle}</strong></span>
                <span>Email: <strong className="text-gray-800">{inq.senderEmail}</strong></span>
                {inq.senderPhone && <span>Tel: <strong className="text-gray-800">{inq.senderPhone}</strong></span>}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2 sm:pt-0">
                {inq.status !== 'converted_lead' && (
                  <button
                    onClick={() => handleConvertToLead(inq)}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg transition flex items-center space-x-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Convertir a Lead</span>
                  </button>
                )}

                <button
                  onClick={() => handleUpdateStatus(inq.id, inq.status === 'replied' ? 'read' : 'replied')}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  {inq.status === 'replied' ? 'Marcar como Leído' : 'Marcar como Respondido'}
                </button>

                <a
                  href={`mailto:${inq.senderEmail}?subject=Respuesta a consulta Houzez sobre ${encodeURIComponent(inq.propertyTitle)}`}
                  className="text-xs bg-[#0054a6] hover:bg-[#003b75] text-white font-bold px-3.5 py-1.5 rounded-lg transition"
                >
                  Responder por Email
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
