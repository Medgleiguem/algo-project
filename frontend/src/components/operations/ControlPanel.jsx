import React from 'react';
import { RefreshCw, Plus, Truck, Trash2, BarChart3 } from 'lucide-react';

export const ControlPanel = ({ onAction, sortMetrics }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <RefreshCw className="w-6 h-6" />
        Control Panel
      </h2>
      
      <div className="space-y-3">
        <button
          onClick={() => onAction('addOne')}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Random Package
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onAction('add10')}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
          >
            +10 Packages
          </button>
          <button
            onClick={() => onAction('add50')}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm"
          >
            +50 Packages
          </button>
        </div>

        <button
          onClick={() => onAction('process')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Truck className="w-5 h-5" />
          Load Package onto Truck
        </button>

        <button
          onClick={() => onAction('unload')}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Unload from Truck
        </button>

        <div className="border-t border-white/20 pt-3 mt-3">
          <p className="text-white font-semibold mb-2">Sort Queue by Priority:</p>
          <div className="grid grid-cols-2 gap-2">
            {['bubble', 'quick', 'merge', 'insertion'].map(algo => (
              <button 
                key={algo}
                onClick={() => onAction('sortQueue', algo)} 
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm capitalize"
              >
                {algo} Sort
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-3">
          <p className="text-white font-semibold mb-2">Sort Stack by Weight:</p>
          <div className="grid grid-cols-2 gap-2">
            {['bubble', 'quick', 'merge', 'insertion'].map(algo => (
              <button 
                key={algo}
                onClick={() => onAction('sortStack', algo)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm capitalize"
              >
                {algo} Sort
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onAction('compare')}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mt-3"
        >
          <BarChart3 className="w-5 h-5" />
          Compare All Algorithms
        </button>
      </div>

      {sortMetrics && (
        <div className="mt-4 bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-white font-semibold mb-2">Last Sort Performance</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-purple-200">Algorithm:</div>
            <div className="text-white font-semibold">{sortMetrics.algorithm}</div>
            <div className="text-purple-200">Time:</div>
            <div className="text-white font-semibold">{sortMetrics.time} ms</div>
            <div className="text-purple-200">Comparisons:</div>
            <div className="text-white font-semibold">{sortMetrics.comparisons}</div>
            <div className="text-purple-200">Swaps:</div>
            <div className="text-white font-semibold">{sortMetrics.swaps}</div>
          </div>
        </div>
      )}
    </div>
  );
};