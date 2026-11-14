import React from 'react';
import CrmSidebar from '@/components/crm/CrmSidebar';

export default function CrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-105px)] bg-[#f8fafc]">
      <CrmSidebar />
      <div className="flex-1 overflow-y-auto p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}
