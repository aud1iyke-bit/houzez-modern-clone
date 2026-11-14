'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Tag, 
  Trash2, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle, 
  X,
  FileText
} from 'lucide-react';

export default function CrmLeadsPage() {
  const { formatPrice } = useApp();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states for new lead
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<LeadStatus>('new');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [preferredCity, setPreferredCity] = useState('');
  const [notes, setNotes] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/crm/leads');
      const data = await res.json();
      if (data.success) setLeads(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          status,
          budgetMin: budgetMin ? Number(budgetMin) : undefined,
          budgetMax: budgetMax ? Number(budgetMax) : undefined,
          preferredCity: preferredCity || undefined,
          notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setLeads([data.data, ...leads]);
        setIsAddModalOpen(false);
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setNotes('');
        alert('Lead creado con éxito.');
      }
    } catch (e) {
      alert('Error al crear el lead.');
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await fetch(`/api/crm/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('¿Eliminar definitivamente este prospecto?')) return;
    try {
      await fetch(`/api/crm/leads/${leadId}`, { method: 'DELETE' });
      setLeads(leads.filter(l => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConvertToDeal = async (lead: Lead) => {
    try {
      const res = await fetch('/api/crm/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Oportunidad: ${lead.name}`,
          clientName: lead.name,
          clientEmail: lead.email,
          clientPhone: lead.phone,
          leadId: lead.id,
          propertyTitle: lead.propertyTitle || 'Propiedad de Cartera',
          value: lead.budgetMax || 1500000,
          stage: 'contact_made'
        })
      });
      const data = await res.json();
      if (data.success) {
        handleUpdateStatus(lead.id, 'negotiation');
        alert('¡Lead convertido con éxito en un trato en el Pipeline Kanban!');
      }
    } catch (e) {
      alert('Error al convertir lead a trato.');
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.notes && lead.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Gestión de Leads & Prospectos
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Seguimiento de compradores y arrendatarios potenciales capturados desde el portal Houzez
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Lead</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Buscar por nombre, email o notas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'new', label: 'Nuevos' },
            { id: 'contacted', label: 'Contactados' },
            { id: 'qualified', label: 'Calificados' },
            { id: 'negotiation', label: 'En Negociación' },
            { id: 'won', label: 'Ganados' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Prospecto</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Presupuesto</th>
                <th className="p-4">Inmueble de Interés</th>
                <th className="p-4">Origen</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-blue-50/40 transition">
                  <td className="p-4 font-bold text-gray-900">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-left hover:text-blue-600 font-bold"
                    >
                      {lead.name}
                    </button>
                    <span className="text-[10px] text-gray-400 block font-normal">
                      Registrado: {new Date(lead.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </td>
                  <td className="p-4 space-y-1">
                    <div className="flex items-center space-x-1.5 text-gray-700">
                      <Mail className="w-3 h-3 text-blue-500" />
                      <span>{lead.email}</span>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center space-x-1.5 text-gray-500">
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {lead.budgetMax ? formatPrice(lead.budgetMax) : 'Sin especificar'}
                  </td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {lead.propertyTitle || 'Búsqueda general'}
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold capitalize">
                      {lead.source.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-md border appearance-none focus:outline-none ${
                        lead.status === 'qualified' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                        lead.status === 'negotiation' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                        lead.status === 'won' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <option value="new">Nuevo</option>
                      <option value="contacted">Contactado</option>
                      <option value="qualified">Calificado</option>
                      <option value="negotiation">En Negociación</option>
                      <option value="won">Ganado</option>
                      <option value="lost">Perdido</option>
                    </select>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleConvertToDeal(lead)}
                      title="Convertir a trato en Pipeline"
                      className="text-xs bg-blue-50 hover:bg-blue-100 text-[#0054a6] px-2.5 py-1 rounded font-bold transition"
                    >
                      + Trato
                    </button>
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1"
                    >
                      Ficha
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="text-xs text-gray-400 hover:text-rose-600 px-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                selectedLead.status === 'qualified' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedLead.status}
              </span>
              <h3 className="text-xl font-black text-gray-900 mt-1">{selectedLead.name}</h3>
              <p className="text-xs text-gray-400">Capturado el {new Date(selectedLead.createdAt).toLocaleString('es-ES')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-gray-50 rounded-xl">
              <div>
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Email</span>
                <p className="font-bold text-gray-800">{selectedLead.email}</p>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Teléfono</span>
                <p className="font-bold text-gray-800">{selectedLead.phone || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Presupuesto Máx</span>
                <p className="font-bold text-[#0054a6]">{selectedLead.budgetMax ? formatPrice(selectedLead.budgetMax) : 'N/D'}</p>
              </div>
              <div>
                <span className="text-gray-400 uppercase font-semibold text-[10px]">Ciudad Preferida</span>
                <p className="font-bold text-gray-800">{selectedLead.preferredCity || 'N/D'}</p>
              </div>
            </div>

            {selectedLead.notes && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
                <span className="font-bold text-blue-900 block mb-1">Notas Comerciales:</span>
                <p className="text-gray-700 leading-relaxed">{selectedLead.notes}</p>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleConvertToDeal(selectedLead)}
                className="bg-[#0054a6] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#003b75] transition"
              >
                Crear Trato en el Pipeline Kanban
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-gray-900 mb-1">Añadir Nuevo Lead Manualmente</h3>
            <p className="text-xs text-gray-500 mb-4">Registra un nuevo contacto en la base de datos CRM</p>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Morales"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    placeholder="+34 600..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Presupuesto Máximo</label>
                  <input
                    type="number"
                    placeholder="1800000"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ciudad Preferida</label>
                  <input
                    type="text"
                    placeholder="Madrid / Marbella"
                    value={preferredCity}
                    onChange={(e) => setPreferredCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Notas Comerciales</label>
                <textarea
                  rows={2}
                  placeholder="Requisitos de búsqueda, disponibilidad..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-5 py-2 rounded-lg transition"
                >
                  Guardar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
