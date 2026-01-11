import React from 'react';

export const StatsCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-purple-200 text-sm">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </div>
);
