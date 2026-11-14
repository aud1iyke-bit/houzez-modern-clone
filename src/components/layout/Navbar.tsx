'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  Heart, 
  SlidersHorizontal, 
  PlusCircle, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  ChevronDown, 
  RefreshCw, 
  Briefcase, 
  LayoutDashboard,
  Check,
  Menu,
  X
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    currentUser, 
    setCurrentUser, 
    usersList, 
    favorites, 
    comparedProperties, 
    currency, 
    setCurrency 
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleResetData = async () => {
    if (!confirm('¿Deseas reiniciar los datos de prueba a los valores originales de Houzez?')) return;
    setIsResetting(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      if (res.ok) {
        alert('Datos demo de Houzez restablecidos correctamente.');
        window.location.reload();
      }
    } catch (e) {
      alert('Error al reiniciar los datos.');
    } finally {
      setIsResetting(false);
    }
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/properties' },
    { name: 'Mapa Split', href: '/map-search' },
    { name: 'CRM Inmobiliario', href: '/crm', badge: 'CRM' },
    { name: 'Agentes', href: '/agents' },
    { name: 'Panel Agente', href: '/dashboard' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-[#0b132b] text-gray-300 text-xs py-2 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left contact info */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+34 912 345 678</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5 hover:text-white transition">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>contacto@houzez-prime.com</span>
            </div>
            <div className="hidden md:inline-block text-gray-500">|</div>
            <div className="hidden md:flex items-center space-x-1 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span>CRM & API en Vivo Activos</span>
            </div>
          </div>

          {/* Right actions: Currency, Role switch, Reset DB */}
          <div className="flex items-center space-x-4">
            {/* Currency selector */}
            <div className="flex items-center space-x-1 bg-gray-800/80 rounded px-2 py-0.5 border border-gray-700">
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-1.5 py-0.5 rounded font-semibold transition ${currency === 'EUR' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                EUR (€)
              </button>
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 rounded font-semibold transition ${currency === 'USD' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                USD ($)
              </button>
            </div>

            {/* Reset Seed Demo */}
            <button 
              onClick={handleResetData}
              disabled={isResetting}
              title="Restablecer base de datos demo"
              className="hidden lg:flex items-center space-x-1 text-gray-400 hover:text-blue-300 transition"
            >
              <RefreshCw className={`w-3 h-3 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset Demo</span>
            </button>

            {/* User Profile Switcher */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-2.5 py-1 rounded transition border border-gray-700"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="max-w-[110px] truncate font-medium">{currentUser.name}</span>
                <span className="text-[10px] uppercase px-1.5 py-0.2 bg-blue-900/80 text-blue-300 rounded font-bold">
                  {currentUser.role}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase">Cambiar Usuario / Rol</p>
                    <p className="text-[11px] text-gray-400">Prueba la plataforma con diferentes privilegios</p>
                  </div>
                  <div className="py-1">
                    {usersList.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setCurrentUser(user);
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-blue-50 transition ${currentUser.id === user.id ? 'bg-blue-50/60 font-semibold text-blue-700' : ''}`}
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs text-gray-900">{user.name}</p>
                            <p className="text-[10px] text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'agent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {user.role}
                          </span>
                          {currentUser.id === user.id && <Check className="w-4 h-4 text-blue-600" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-1 pt-1 px-3">
                    <Link 
                      href="/crm" 
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 text-xs py-1.5 px-2 text-gray-700 hover:text-blue-600 rounded hover:bg-gray-50"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                      <span>Ir al CRM Inmobiliario</span>
                    </Link>
                    <Link 
                      href="/dashboard" 
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 text-xs py-1.5 px-2 text-gray-700 hover:text-blue-600 rounded hover:bg-gray-50"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-blue-500" />
                      <span>Panel de Control & Propiedades</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-lg bg-[#0054a6] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight text-[#0b132b] flex items-center">
              HOUZEZ<span className="text-[#ff5a5f] text-3xl leading-none">.</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block -mt-1">
              Plataforma & CRM
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-gray-700">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition hover:text-[#0054a6] flex items-center space-x-1.5 ${
                  isActive ? 'text-[#0054a6] font-semibold' : ''
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="bg-[#ff5a5f] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0054a6] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Submit Property */}
        <div className="hidden sm:flex items-center space-x-3">
          {/* Compare pill */}
          <Link
            href="/compare"
            title="Comparar propiedades seleccionadas"
            className="relative p-2 text-gray-600 hover:text-[#0054a6] hover:bg-blue-50 rounded-lg transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {comparedProperties.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0054a6] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {comparedProperties.length}
              </span>
            )}
          </Link>

          {/* Favorites pill */}
          <Link
            href="/dashboard/favorites"
            title="Mis Favoritos"
            className="relative p-2 text-gray-600 hover:text-[#ff5a5f] hover:bg-rose-50 rounded-lg transition"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff5a5f] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Submit Property Button */}
          <Link
            href="/dashboard/add-property"
            className="bg-[#0054a6] hover:bg-[#004080] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition shadow-sm hover:shadow flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Propiedad</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {link.name} {link.badge && `(${link.badge})`}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-1.5 text-xs text-gray-600"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Comparar ({comparedProperties.length})</span>
            </Link>

            <Link
              href="/dashboard/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-1.5 text-xs text-gray-600"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Favoritos ({favorites.length})</span>
            </Link>
          </div>

          <Link
            href="/dashboard/add-property"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full bg-[#0054a6] text-white py-2.5 rounded-lg text-sm font-semibold mt-2"
          >
            + Publicar Propiedad
          </Link>
        </div>
      )}
    </header>
  );
}
