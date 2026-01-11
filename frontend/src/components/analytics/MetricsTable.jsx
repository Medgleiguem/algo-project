import React from 'react';

export const MetricsTable = ({ performanceData }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
    <h2 className="text-2xl font-bold text-white mb-4">Detailed Performance Metrics</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-purple-200 pb-3 px-4">Algorithm</th>
            <th className="text-purple-200 pb-3 px-4">Time (ms)</th>
            <th className="text-purple-200 pb-3 px-4">Comparisons</th>
            <th className="text-purple-200 pb-3 px-4">Swaps</th>
            <th className="text-purple-200 pb-3 px-4">Complexity</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((data, index) => (
            <tr key={index} className="border-b border-white/10">
              <td className="text-white font-semibold py-3 px-4">{data.algorithm}</td>
              <td className="text-white py-3 px-4">{data.time}</td>
              <td className="text-white py-3 px-4">{data.comparisons}</td>
              <td className="text-white py-3 px-4">{data.swaps}</td>
              <td className="text-purple-200 py-3 px-4 text-sm">{data.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);