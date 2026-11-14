import { Suspense } from 'react';
import PropertiesCatalogClient from './PropertiesCatalogClient';

function CatalogFallback() {
  return (
    <div className="w-full bg-[#f8fafc] py-8 px-4 sm:px-8" aria-label="Cargando catálogo">
      <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-16 rounded-xl bg-white" />
        <div className="h-64 rounded-2xl bg-white" />
        <div className="h-80 rounded-2xl bg-white" />
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <PropertiesCatalogClient />
    </Suspense>
  );
}
