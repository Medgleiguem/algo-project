import React from 'react';
import { Truck } from 'lucide-react';
import { PackageCard } from '../package/PackageCard';

export const StackDisplay = ({ stack }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
      <Truck className="w-6 h-6" />
      Truck Stack (LIFO) - {stack.length} packages
    </h2>
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {stack.length === 0 ? (
        <p className="text-purple-200 text-center py-8">Truck is empty</p>
      ) : (
        stack.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} type="stack" />)
      )}
    </div>
  </div>
);