import React from 'react';
import { RefreshCw, Plus, Truck, Trash2, BarChart3 } from 'lucide-react';

export const ControlPanel = ({ onAction, sortMetrics }) => {
  const [queueSortKey, setQueueSortKey] = React.useState('priority');
  const [stackSortKey, setStackSortKey] = React.useState('weight');
  const [showManualAdd, setShowManualAdd] = React.useState(false);
  const [manualData, setManualData] = React.useState({
    id: '',
    weight: '',
    priority: '1',
    destination: 'Paris'
  });

  const handleManualSubmit = (e) => {
    e.preventDefault();
    onAction('addManual', {
      id: parseInt(manualData.id),
      weight: parseFloat(manualData.weight),
      priority: parseInt(manualData.priority),
      destination: manualData.destination
    });
    setShowManualAdd(false);
    setManualData({ id: '', weight: '', priority: '1', destination: 'Paris' });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <RefreshCw className="w-6 h-6" />
        Control Panel
      </h2>
      
      <div className="space-y-3">
        <button
          onClick={() => setShowManualAdd(!showManualAdd)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          
          {showManualAdd ? 'Cancel Manual Add' : <><Plus className="w-5 h-5" /> Manual Add Package</>}
        </button>

        {showManualAdd && (
          <form onSubmit={handleManualSubmit} className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-3">
            <div>
              <label className="text-white text-sm block mb-1">ID</label>
              <input
                type="number"
                required
                value={manualData.id}
                onChange={e => setManualData({...manualData, id: e.target.value})}
                className="w-full bg-white/10 text-white rounded px-3 py-2 text-sm"
                placeholder="Unique ID"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={manualData.weight}
                onChange={e => setManualData({...manualData, weight: e.target.value})}
                className="w-full bg-white/10 text-white rounded px-3 py-2 text-sm"
                placeholder="Weight"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-1">Priority</label>
              <select
                value={manualData.priority}
                onChange={e => setManualData({...manualData, priority: e.target.value})}
                className="w-full bg-white/10 text-white rounded px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5].map(p => <option key={p} value={p} className="text-black">{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-white text-sm block mb-1">Destination</label>
              <select
                value={manualData.destination}
                onChange={e => setManualData({...manualData, destination: e.target.value})}
                className="w-full bg-white/10 text-white rounded px-3 py-2 text-sm"
              >
                {['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux', 'Strasbourg', 'Lille', 'Rennes'].map(d => (
                  <option key={d} value={d} className="text-black">{d}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold text-sm">
              Add Package
            </button>
          </form>
        )}

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
          onClick={() => onAction('clearQueue')}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          Clear Queue
        </button>

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
          <div className="flex justify-between items-center mb-2">
            <p className="text-white font-semibold">Sort Queue by:</p>
            <select 
              value={queueSortKey}
              onChange={(e) => setQueueSortKey(e.target.value)}
              className="bg-white/20 text-white text-sm rounded px-2 py-1 border border-white/30 focus:outline-none focus:border-white/50"
            >
              <option value="priority" className="text-black">Priority</option>
              <option value="weight" className="text-black">Weight</option>
              <option value="id" className="text-black">Order (ID)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['bubble', 'quick', 'merge', 'insertion'].map(algo => (
              <button 
                key={algo}
                onClick={() => onAction('sortQueue', { algorithm: algo, key: queueSortKey })} 
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm capitalize"
              >
                {algo} Sort
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/20 pt-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white font-semibold">Sort Stack by:</p>
            <select 
              value={stackSortKey}
              onChange={(e) => setStackSortKey(e.target.value)}
              className="bg-white/20 text-white text-sm rounded px-2 py-1 border border-white/30 focus:outline-none focus:border-white/50"
            >
              <option value="weight" className="text-black">Weight</option>
              <option value="priority" className="text-black">Priority</option>
              <option value="id" className="text-black">Order (ID)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['bubble', 'quick', 'merge', 'insertion'].map(algo => (
              <button 
                key={algo}
                onClick={() => onAction('sortStack', { algorithm: algo, key: stackSortKey })} 
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

        <button
          onClick={() => onAction('reset')}
          className="w-full bg-red-800 hover:bg-red-900 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mt-3"
        >
          <RefreshCw className="w-5 h-5" />
          Reset System
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