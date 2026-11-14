import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompareFloatingBar from '@/components/property/CompareFloatingBar';

export const metadata: Metadata = {
  title: 'Houzez - Plataforma Inmobiliaria Moderna & CRM',
  description: 'Copia moderna, rápida e independiente de Houzez no en WordPress: portal inmobiliario de alto standing, gestión avanzada de propiedades, búsqueda split en mapa y CRM de ventas integrado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-gray-900 antialiased selection:bg-blue-600 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CompareFloatingBar />
        </AppProvider>
      </body>
    </html>
  );
}
