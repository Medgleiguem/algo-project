import React from 'react';
import { ArrowDown } from 'lucide-react';
import { PackageCard } from '../package/PackageCard';

export const QueueDisplay = ({ queue }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
      <ArrowDown className="w-6 h-6" />
      Queue (FIFO) - {queue.length} packages
    </h2>
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {queue.length === 0 ? (
        <p className="text-purple-200 text-center py-8">Queue is empty</p>
      ) : (
        queue.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} type="queue" />)
      )}
    </div>
  </div>
);