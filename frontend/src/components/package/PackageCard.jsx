import React from 'react';
import { Scale } from 'lucide-react';
import { getPriorityColor } from '../../utils/helpers';

export const PackageCard = ({ pkg, type = 'queue' }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-semibold">Package #{pkg.id}</span>
        {type === 'queue' ? (
          <span className={`${getPriorityColor(pkg.priority)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
            Priority {pkg.priority}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" />
            <span className="text-white font-semibold">{pkg.weight} kg</span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <span className="text-purple-200">Weight:</span>
          <span className="text-white ml-1">{pkg.weight} kg</span>
        </div>
        <div>
          <span className="text-purple-200">Order:</span>
          <span className="text-white ml-1">#{pkg.arrival_order}</span>
        </div>
        <div>
          <span className="text-purple-200">To:</span>
          <span className="text-white ml-1">{pkg.destination}</span>
        </div>
      </div>
    </div>
  );
};