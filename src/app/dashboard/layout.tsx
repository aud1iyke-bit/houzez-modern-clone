'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Home, 
  Heart, 
  CreditCard, 
  User, 
  Briefcase, 
  Building2, 
  ArrowLeft 
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currentUser, favorites } = useApp();

  const menuItems = [
    { name: 'Resumen Panel', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Publicar Propiedad', href: '/dashboard/add-property', icon: PlusCircle, highlight: true },
    { name: 'Mis Inmuebles', href: '/dashboard/my-properties', icon: Home },
    { name: 'Mis Favoritos', href: '/dashboard/favorites', icon: Heart, badge: favorites.length > 0 ? String(favorites.length) : undefined },
    { name: 'Membresías & Facturas', href: '/dashboard/invoices', icon: CreditCard },
    { name: 'Mi Perfil de Asesor', href: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="flex min-h-[calc(100vh-105px)] bg-[#f8fafc]">
      {/* Side Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200/80 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div className="space-y-6">
          {/* User Mini Profile */}
          <div className="flex items-center space-x-3 pb-5 border-b border-gray-100">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-gray-500 uppercase font-semibold">{currentUser.role} Houzez</p>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase px-3 mb-2 tracking-wider">
              Mi Espacio Inmobiliario
            </p>

            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#0054a6] text-white shadow-sm font-bold'
                      : item.highlight
                      ? 'text-[#0054a6] bg-blue-50/70 hover:bg-blue-100/60 font-bold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#0054a6]' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Shortcuts */}
        <div className="pt-6 border-t border-gray-100 space-y-2">
          <Link
            href="/crm"
            className="flex items-center space-x-2 text-xs font-bold text-[#0054a6] bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100 transition"
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Ir al CRM Inmobiliario</span>
          </Link>

          <Link
            href="/"
            className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-800 px-3 py-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Portada</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
