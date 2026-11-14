'use client';

import React, { useState } from 'react';
import { Deal, DealStage } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  DollarSign, 
  Calendar, 
  User, 
  Home, 
  Trash2, 
  CheckCircle2, 
  Percent, 
  X 
} from 'lucide-react';

interface KanbanBoardProps {
  initialDeals: Deal[];
  onDealsUpdate?: () => void;
}

const STAGES: { id: DealStage; label: string; color: string; badgeBg: string }[] = [
  { id: 'lead_in', label: 'Contacto Inicial', color: 'border-blue-400', badgeBg: 'bg-blue-100 text-blue-800' },
  { id: 'contact_made', label: 'Calificación', color: 'border-indigo-400', badgeBg: 'bg-indigo-100 text-indigo-800' },
  { id: 'viewing_scheduled', label: 'Visita Agendada', color: 'border-purple-400', badgeBg: 'bg-purple-100 text-purple-800' },
  { id: 'offer_submitted', label: 'Oferta Presentada', color: 'border-amber-400', badgeBg: 'bg-amber-100 text-amber-800' },
  { id: 'contract_sent', label: 'En Contrato', color: 'border-orange-400', badgeBg: 'bg-orange-100 text-orange-800' },
  { id: 'closed_won', label: 'Cerrado Ganado', color: 'border-emerald-500', badgeBg: 'bg-emerald-100 text-emerald-800' }
];

export default function KanbanBoard({ initialDeals, onDealsUpdate }: KanbanBoardProps) {
  const { formatPrice } = useApp();
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealClient, setNewDealClient] = useState('');
  const [newDealValue, setNewDealValue] = useState('');
  const [newDealProperty, setNewDealProperty] = useState('');
  const [newDealStage, setNewDealStage] = useState<DealStage>('lead_in');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moveDeal = async (dealId: string, direction: 'prev' | 'next') => {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const currentIndex = STAGES.findIndex(s => s.id === deal.stage);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= STAGES.length) return;
    const newStage = STAGES[nextIndex].id;

    // Optimistic UI update
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d));

    try {
      await fetch(`/api/crm/deals/${dealId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage })
      });
      if (onDealsUpdate) onDealsUpdate();
    } catch (e) {
      console.error('Error updating stage:', e);
    }
  };

  const handleDelete = async (dealId: string) => {
    if (!confirm('¿Estás seguro de eliminar este trato del pipeline?')) return;
    setDeals(prev => prev.filter(d => d.id !== dealId));

    try {
      await fetch(`/api/crm/deals/${dealId}`, { method: 'DELETE' });
      if (onDealsUpdate) onDealsUpdate();
    } catch (e) {
      console.error('Error deleting deal:', e);
    }
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/crm/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newDealTitle,
          clientName: newDealClient,
          value: Number(newDealValue),
          propertyTitle: newDealProperty || 'Propiedad en Cartera',
          stage: newDealStage
        })
      });

      const json = await res.json();
      if (json.success) {
        setDeals(prev => [json.data, ...prev]);
        setIsModalOpen(false);
        setNewDealTitle('');
        setNewDealClient('');
        setNewDealValue('');
        setNewDealProperty('');
        if (onDealsUpdate) onDealsUpdate();
      }
    } catch (e) {
      alert('Error al crear el trato.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Pipeline de Ventas Inmobiliarias</h2>
          <p className="text-xs text-gray-500">Mueve los tratos a través de las etapas del embudo comercial</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Trato</span>
        </button>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
        {STAGES.map((stage, idx) => {
          const stageDeals = deals.filter(d => d.stage === stage.id);
          const totalValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);

          return (
            <div
              key={stage.id}
              className="w-72 flex-shrink-0 bg-gray-100/90 rounded-2xl p-3 border border-gray-200/80 flex flex-col max-h-[750px]"
            >
              {/* Column Header */}
              <div className="pb-3 mb-3 border-b border-gray-200/80">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${stage.badgeBg}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-gray-500">
                  Volumen: <span className="text-gray-900 font-bold">{formatPrice(totalValue)}</span>
                </div>
              </div>

              {/* Deal Cards Container */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {stageDeals.length === 0 ? (
                  <div className="text-center py-8 text-xs text-gray-400 italic bg-white/50 rounded-xl border border-dashed border-gray-200">
                    Sin tratos en esta etapa
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md border border-gray-200/70 transition space-y-2.5 group"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{deal.title}</h4>
                        <button
                          onClick={() => handleDelete(deal.id)}
                          title="Eliminar trato"
                          className="text-gray-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1 text-[11px] text-gray-500">
                        <div className="flex items-center space-x-1.5 truncate">
                          <User className="w-3 h-3 text-blue-500 shrink-0" />
                          <span className="font-medium text-gray-700">{deal.clientName}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 truncate">
                          <Home className="w-3 h-3 text-amber-500 shrink-0" />
                          <span className="truncate">{deal.propertyTitle}</span>
                        </div>
                      </div>

                      {/* Deal Value & Commission */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Valor</p>
                          <p className="font-black text-[#0054a6]">{formatPrice(deal.value)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-semibold">Comisión</p>
                          <p className="font-bold text-emerald-600">{formatPrice(deal.commission)}</p>
                        </div>
                      </div>

                      {/* Direction Navigation Buttons */}
                      <div className="pt-2 flex items-center justify-between border-t border-gray-50">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => moveDeal(deal.id, 'prev')}
                          title="Mover a etapa anterior"
                          className={`p-1 rounded text-xs flex items-center space-x-0.5 ${
                            idx === 0 
                              ? 'text-gray-200 cursor-not-allowed' 
                              : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                          }`}
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Atrás</span>
                        </button>

                        <button
                          type="button"
                          disabled={idx === STAGES.length - 1}
                          onClick={() => moveDeal(deal.id, 'next')}
                          title="Avanzar etapa"
                          className={`p-1 rounded text-xs flex items-center space-x-0.5 font-bold ${
                            idx === STAGES.length - 1 
                              ? 'text-gray-200 cursor-not-allowed' 
                              : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                          }`}
                        >
                          <span className="text-[10px]">Avanzar</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-fade-in relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-gray-900 mb-1">Añadir Nuevo Trato al Pipeline</h3>
            <p className="text-xs text-gray-500 mb-4">Registra una oportunidad comercial en el CRM</p>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Título del Trato</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Oferta Villa Marbella - J. Gómez"
                  value={newDealTitle}
                  onChange={(e) => setNewDealTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Alejandro Gómez"
                  value={newDealClient}
                  onChange={(e) => setNewDealClient(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Valor (€ / $)</label>
                  <input
                    type="number"
                    required
                    placeholder="2500000"
                    value={newDealValue}
                    onChange={(e) => setNewDealValue(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Etapa Inicial</label>
                  <select
                    value={newDealStage}
                    onChange={(e) => setNewDealStage(e.target.value as DealStage)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                  >
                    {STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Propiedad Asociada</label>
                <input
                  type="text"
                  placeholder="Ej. Villa Moderna Panorámica"
                  value={newDealProperty}
                  onChange={(e) => setNewDealProperty(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-5 py-2 rounded-lg transition"
                >
                  {isSubmitting ? 'Guardando...' : 'Crear Trato'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
