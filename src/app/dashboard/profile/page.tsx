'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  Save, 
  CheckCircle,
  Globe,
  Camera
} from 'lucide-react';

export default function ProfileSettingsPage() {
  const { currentUser, setCurrentUser } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [title, setTitle] = useState('Director de Ventas & Luxury Broker');
  const [phone, setPhone] = useState('+34 912 345 678');
  const [mobile, setMobile] = useState('+34 600 111 222');
  const [whatsapp, setWhatsapp] = useState('34600111222');
  const [agencyName, setAgencyName] = useState('Houzez Prime Realty');
  const [licenseNumber, setLicenseNumber] = useState('API-MD-44829');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [bio, setBio] = useState('Más de 14 años liderando transacciones residenciales de lujo en Madrid y la Costa del Sol. Especialista en áticos exclusivos y villas de autor.');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      email,
      avatar
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Mi Perfil de Asesor Inmobiliario
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Configura tus datos de contacto público y credenciales profesionales
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>¡Perfil actualizado con éxito! Los cambios se reflejarán en todas tus fichas de propiedades.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Profile Picture & General */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <div className="relative group">
            <img 
              src={avatar} 
              alt={name} 
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white cursor-pointer">
              <Camera className="w-5 h-5" />
            </div>
          </div>

          <div className="flex-1 w-full space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase">URL de Fotografía de Perfil</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-[11px] text-gray-400">Recomendado: imagen cuadrada en alta resolución (Unsplash, Gravatar o servidor propio)</p>
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre Completo *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cargo / Especialidad</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Profesional *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp Directo (Con prefijo sin +)</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="34600111222"
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Teléfono Fijo Oficina</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Teléfono Móvil</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Agencia Afiliada</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nº Licencia de Agente Inmobiliario (API)</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Biografía Profesional</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 leading-relaxed text-gray-800"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#0054a6] hover:bg-[#003b75] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </form>
    </div>
  );
}
