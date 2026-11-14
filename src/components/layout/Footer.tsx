import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, ArrowRight, Heart } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-[#0b132b] text-gray-300 pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0054a6] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white">
                HOUZEZ<span className="text-[#ff5a5f]">.</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plataforma inmobiliaria moderna con CRM integrado, diseñada para agencias de alto rendimiento, agentes independientes y compradores exigentes.
            </p>
            <div className="pt-2 text-xs space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Paseo de la Castellana 95, Madrid, España</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+34 912 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>contacto@houzez-prime.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Navegación Rápida
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/properties?status=for-sale" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Propiedades en Venta</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?status=for-rent" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Propiedades en Renta</span>
                </Link>
              </li>
              <li>
                <Link href="/map-search" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Búsqueda Split en Mapa</span>
                </Link>
              </li>
              <li>
                <Link href="/crm" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>CRM Inmobiliario & Pipeline</span>
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Directorio de Agentes</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-property" className="hover:text-white transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Publicar mi Inmueble</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Tipos de Inmuebles
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/properties?type=villa" className="hover:text-white transition flex items-center justify-between">
                  <span>Villas de Lujo</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Exclusivo</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-white transition flex items-center justify-between">
                  <span>Áticos & Penthouses</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Vistas 360°</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=apartment" className="hover:text-white transition flex items-center justify-between">
                  <span>Pisos & Apartamentos</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Centro</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=house" className="hover:text-white transition flex items-center justify-between">
                  <span>Casas Familiares</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Con Jardín</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?type=office" className="hover:text-white transition flex items-center justify-between">
                  <span>Oficinas & Corporativo</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">Prime</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Direct CRM Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-blue-500">
              Boletín & Oportunidades
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Suscríbete para recibir alertas privadas de propiedades antes de su publicación general.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} HOUZEZ Replica Modern Stack. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-gray-400">Privacidad</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-400">Términos</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-gray-400">Mapa del sitio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
