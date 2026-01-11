import React from 'react';
import { getAlgorithmInfo } from '../../utils/helpers';

export const ComplexityInfo = () => {
  const algorithms = getAlgorithmInfo();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">Algorithm Complexity Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {algorithms.map((algo, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className={`text-${algo.color} font-semibold mb-2`}>{algo.name}</h3>
            <div className="space-y-1 text-sm">
              <p className="text-purple-200">Time Complexity: <span className="text-white">{algo.time}</span></p>
              <p className="text-purple-200">Space Complexity: <span className="text-white">{algo.space}</span></p>
              <p className="text-purple-200">Stable: <span className={algo.stable ? 'text-green-400' : 'text-red-400'}>{algo.stable ? 'Yes' : 'No'}</span></p>
              <p className="text-gray-300 mt-2 text-xs">{algo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};