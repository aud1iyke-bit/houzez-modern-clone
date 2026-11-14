import React from 'react';
import { db } from '@/lib/db';
import KanbanBoard from '@/components/crm/KanbanBoard';

export default function CrmDealsPage() {
  const deals = db.getDeals();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <KanbanBoard initialDeals={deals} />
    </div>
  );
}
