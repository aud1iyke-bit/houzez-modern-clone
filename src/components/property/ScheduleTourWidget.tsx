'use client';

import React, { useState } from 'react';
import { Property, Agent } from '@/types';
import { Calendar, Clock, Video, Users, CheckCircle, Send, Phone, Mail, User } from 'lucide-react';

interface ScheduleTourWidgetProps {
  property: Property;
  agent?: Agent;
}

export default function ScheduleTourWidget({ property, agent }: ScheduleTourWidgetProps) {
  const [tourType, setTourType] = useState<'in_person' | 'video_call'>('in_person');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = ['10:00 AM', '11:30 AM', '14:00 PM', '16:30 PM', '18:00 PM'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/crm/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: property.title,
          senderName: name,
          senderEmail: email,
          senderPhone: phone,
          message: notes || `Solicitud de visita ${tourType === 'video_call' ? 'virtual' : 'presencial'} para el ${selectedDate} a las ${selectedTime}`,
          type: 'schedule_tour',
          tourType: tourType,
          tourDate: selectedDate,
          tourTime: selectedTime,
          agentId: property.agentId || 'agent-1'
        })
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert('Hubo un error al agendar la visita. Inténtalo de nuevo.');
      }
    } catch (e) {
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-fade-in">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-emerald-900 mb-1">¡Visita Agendada con Éxito!</h4>
        <p className="text-xs text-emerald-700 mb-3">
          Hemos recibido tu solicitud para el <strong>{selectedDate}</strong> a las <strong>{selectedTime}</strong>. Nuestro asesor {agent?.name || 'inmobiliario'} se pondrá en contacto para confirmar los detalles.
        </p>
        <div className="text-[11px] text-gray-500 bg-white p-2.5 rounded-lg border border-emerald-100">
          La cita ha sido sincronizada automáticamente en el <strong>CRM Inmobiliario</strong> de la agencia.
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs text-emerald-800 font-semibold underline"
        >
          Agendar otra visita
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-1.5 bg-blue-50 text-[#0054a6] rounded-md">
          <Calendar className="w-4 h-4" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Agendar una Visita</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Toggle Tour Type */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTourType('in_person')}
            className={`py-2 rounded-md transition flex items-center justify-center space-x-1.5 ${
              tourType === 'in_person'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Presencial</span>
          </button>
          <button
            type="button"
            onClick={() => setTourType('video_call')}
            className={`py-2 rounded-md transition flex items-center justify-center space-x-1.5 ${
              tourType === 'video_call'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-500" />
            <span>Videollamada</span>
          </button>
        </div>

        {/* Date Selector */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Fecha</label>
          <input
            type="date"
            required
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Hora Disponible</label>
          <div className="grid grid-cols-3 gap-1.5">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`py-1.5 px-2 text-xs rounded border transition text-center ${
                  selectedTime === slot
                    ? 'bg-[#0054a6] text-white border-[#0054a6] font-bold shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-2 pt-1">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="Nombre y Apellidos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
            />
            <User className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="relative">
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
            />
            <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="relative">
            <input
              type="tel"
              required
              placeholder="Teléfono móvil"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
            />
            <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>

          <textarea
            rows={2}
            placeholder="Mensaje o notas adicionales (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold py-2.5 rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <span>Confirmando...</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Solicitar Cita de Visita</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
