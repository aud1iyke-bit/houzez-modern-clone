'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Agent, Property } from '@/types';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Star, 
  Send, 
  CheckCircle, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface ContactAgentCardProps {
  agent: Agent;
  property?: Property;
}

export default function ContactAgentCard({ agent, property }: ContactAgentCardProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [message, setMessage] = useState(
    property ? `Hola ${agent.name}, estoy interesado en "${property.title}" (Ref: ${property.propertyCode}). ¿Podrían facilitarme más información?` : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/crm/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property?.id || '',
          propertyTitle: property?.title || 'Consulta Directa de Agente',
          senderName,
          senderEmail,
          senderPhone,
          message,
          type: 'general',
          agentId: agent.id
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Error al enviar el mensaje.');
      }
    } catch (e) {
      alert('Error de conexión.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
      {/* Agent Info Header */}
      <div className="flex items-start space-x-3.5 pb-4 border-b border-gray-100">
        <Link href={`/agents/${agent.id}`}>
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="w-14 h-14 rounded-xl object-cover ring-2 ring-gray-100 hover:opacity-90 transition"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/agents/${agent.id}`}>
            <h4 className="text-sm font-bold text-gray-900 hover:text-blue-600 transition truncate">
              {agent.name}
            </h4>
          </Link>
          <p className="text-xs text-gray-500 truncate">{agent.title}</p>
          <div className="flex items-center space-x-1.5 mt-1 text-[11px] text-gray-500">
            <span className="flex items-center text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-current mr-0.5" />
              {agent.rating}
            </span>
            <span>({agent.reviewCount} reseñas)</span>
            <span>•</span>
            <span className="text-blue-600 font-semibold">{agent.agencyName}</span>
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons (Houzez Signature) */}
      <div className="grid grid-cols-2 gap-2">
        <a 
          href={`tel:${agent.phone.replace(/\s+/g, '')}`}
          className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-800 transition"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Llamar</span>
        </a>

        <a 
          href={`https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(`Hola ${agent.name}, le contacto desde Houzez por la propiedad ${property?.title || ''}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-800 transition"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Inquiry Form */}
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center animate-fade-in">
          <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
          <p className="text-xs font-bold text-emerald-900">Mensaje Enviado con Éxito</p>
          <p className="text-[11px] text-emerald-700 mt-1">
            El agente ha recibido tu solicitud directamente en su buzón de Houzez CRM.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[11px] text-emerald-800 font-semibold underline mt-2"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <p className="text-xs font-bold text-gray-700 uppercase">Contactar al Asesor</p>
          
          <input
            type="text"
            required
            placeholder="Tu nombre completo"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />

          <input
            type="email"
            required
            placeholder="Correo electrónico"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />

          <input
            type="tel"
            placeholder="Teléfono móvil"
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          />

          <textarea
            rows={3}
            required
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff5a5f] hover:bg-[#e0484d] text-white text-xs font-bold py-2.5 rounded-lg transition shadow-sm hover:shadow flex items-center justify-center space-x-1.5"
          >
            {isSubmitting ? (
              <span>Enviando...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Consulta Inmediata</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Trust & Verification badge */}
      <div className="pt-2 flex items-center justify-center space-x-1.5 text-[11px] text-gray-400 border-t border-gray-100">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
        <span>Agente Oficial Certificado • {agent.licenseNumber}</span>
      </div>
    </div>
  );
}
