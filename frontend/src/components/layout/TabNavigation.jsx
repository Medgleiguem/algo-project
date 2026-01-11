import React from 'react';

export const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-2 mb-6">
    <button
      onClick={() => setActiveTab('operations')}
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
        activeTab === 'operations' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-200 hover:bg-white/20'
      }`}
    >
      Operations
    </button>
    <button
      onClick={() => setActiveTab('analytics')}
      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
        activeTab === 'analytics' ? 'bg-purple-600 text-white' : 'bg-white/10 text-purple-200 hover:bg-white/20'
      }`}
    >
      Analytics
    </button>
  </div>
);
