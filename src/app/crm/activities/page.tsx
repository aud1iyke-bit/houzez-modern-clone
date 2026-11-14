'use client';

import React, { useState, useEffect } from 'react';
import { Activity } from '@/types';
import { 
  CalendarCheck2, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  Plus, 
  CheckCircle, 
  Trash2, 
  X,
  FileCheck2
} from 'lucide-react';

export default function CrmActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Activity['type']>('viewing');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('11:00 AM');
  const [priority, setPriority] = useState<Activity['priority']>('medium');
  const [clientName, setClientName] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [notes, setNotes] = useState('');

  const fetchActivities = async () => {
    try {
      const res = await fetch('/api/crm/activities');
      const data = await res.json();
      if (data.success) setActivities(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleToggleCompleted = async (act: Activity) => {
    const newStatus = act.status === 'completed' ? 'pending' : 'completed';
    try {
      await fetch(`/api/crm/activities/${act.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setActivities(activities.map(a => a.id === act.id ? { ...a, status: newStatus } : a));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta actividad?')) return;
    try {
      await fetch(`/api/crm/activities/${id}`, { method: 'DELETE' });
      setActivities(activities.filter(a => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/crm/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          dueDate,
          dueTime,
          priority,
          clientName,
          propertyTitle,
          notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setActivities([data.data, ...activities]);
        setIsModalOpen(false);
        setTitle('');
        setClientName('');
        setNotes('');
        alert('Actividad agendada con éxito.');
      }
    } catch (e) {
      alert('Error al crear actividad.');
    }
  };

  const filtered = activities.filter(a => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Agenda Comercial & Citas de Visita
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Calendario de visitas presenciales, llamadas de seguimiento y reuniones de firma
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0054a6] hover:bg-[#004080] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Nueva Cita</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
            filterStatus === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Todas ({activities.length})
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
            filterStatus === 'pending' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Pendientes ({activities.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
            filterStatus === 'completed' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Completadas ({activities.filter(a => a.status === 'completed').length})
        </button>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {filtered.map(act => (
          <div
            key={act.id}
            className={`bg-white rounded-2xl p-4 border transition-all shadow-sm flex items-start justify-between gap-4 ${
              act.status === 'completed' ? 'opacity-60 bg-gray-50/50' : ''
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <button
                onClick={() => handleToggleCompleted(act)}
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition ${
                  act.status === 'completed'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                {act.status === 'completed' && <CheckCircle className="w-4 h-4" />}
              </button>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    act.priority === 'high' ? 'bg-rose-100 text-rose-800' :
                    act.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                  }`}>
                    Prioridad {act.priority}
                  </span>

                  <span className="text-[10px] font-bold text-blue-600 uppercase">
                    {act.type}
                  </span>

                  <h4 className={`text-xs font-bold text-gray-900 ${act.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                    {act.title}
                  </h4>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    <span>{act.dueDate}</span>
                  </span>
                  {act.dueTime && (
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{act.dueTime}</span>
                    </span>
                  )}
                  {act.clientName && (
                    <span>• Cliente: <strong>{act.clientName}</strong></span>
                  )}
                  {act.propertyTitle && (
                    <span>• Inmueble: <strong>{act.propertyTitle}</strong></span>
                  )}
                </div>

                {act.notes && (
                  <p className="text-[11px] text-gray-600 italic bg-gray-50 p-2 rounded-lg mt-1">
                    {act.notes}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDelete(act.id)}
              className="text-gray-300 hover:text-rose-500 transition p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Activity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-gray-900 mb-1">Agendar Nueva Cita / Tarea</h3>
            <p className="text-xs text-gray-500 mb-4">Añade un compromiso a tu calendario de asesor</p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Título de la Cita</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Visita guiada con Alejandro Gómez"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Tipo de Actividad</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="viewing">Visita a Inmueble</option>
                    <option value="call">Llamada Telefónica</option>
                    <option value="meeting">Reunión Presencial</option>
                    <option value="email">Envío de Documentación</option>
                    <option value="contract">Firma de Arras / Contrato</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Prioridad</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="high">Alta (Urgente)</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Hora</label>
                  <input
                    type="text"
                    placeholder="11:30 AM"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre del Cliente</label>
                <input
                  type="text"
                  placeholder="Ej. Marta San Román"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Notas Adicionales</label>
                <textarea
                  rows={2}
                  placeholder="Recordatorios de llaves, documentación requerida..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-5 py-2 rounded-lg transition"
                >
                  Guardar Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
