'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Kanban, 
  Inbox, 
  CalendarCheck2, 
  Building2, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function CrmSidebar() {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const crmLinks = [
    { name: 'Resumen CRM', href: '/crm', icon: LayoutDashboard },
    { name: 'Leads & Prospectos', href: '/crm/leads', icon: Users, badge: 'Nuevos' },
    { name: 'Pipeline de Ventas', href: '/crm/deals', icon: Kanban, badge: 'Deals' },
    { name: 'Buzón de Consultas', href: '/crm/inquiries', icon: Inbox },
    { name: 'Actividades & Citas', href: '/crm/activities', icon: CalendarCheck2 },
  ];

  return (
    <aside className="w-64 bg-[#0b132b] text-gray-300 flex-shrink-0 min-h-screen flex flex-col justify-between p-4 border-r border-gray-800">
      <div>
        {/* Brand & CRM Title */}
        <div className="pb-6 mb-6 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0054a6] flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-white tracking-tight">
                HOUZEZ <span className="text-[#ff5a5f]">CRM</span>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block -mt-1">
                Real Estate Pipeline
              </span>
            </div>
          </Link>

          {/* Current Agent Mini Profile */}
          <div className="mt-4 p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 flex items-center space-x-2.5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-blue-400 capitalize flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 inline" />
                <span>{currentUser.role} Houzez</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold text-gray-500 uppercase px-3 mb-2 tracking-wider">
            Gestión Comercial
          </p>

          {crmLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#0054a6] text-white shadow-md shadow-blue-900/30 font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-900/60 text-blue-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts */}
      <div className="pt-6 border-t border-gray-800 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800/60 transition"
        >
          <LayoutDashboard className="w-4 h-4 text-purple-400" />
          <span>Panel de Inmuebles</span>
        </Link>

        <Link
          href="/"
          className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800/60 transition"
        >
          <ArrowLeft className="w-4 h-4 text-blue-400" />
          <span>Volver al Portal Público</span>
        </Link>
      </div>
    </aside>
  );
}
