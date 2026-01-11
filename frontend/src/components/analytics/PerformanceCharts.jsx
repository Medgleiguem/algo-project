import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const PerformanceCharts = ({ performanceData }) => {
  return (
    <>
      {/* Execution Time Chart */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Execution Time Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="algorithm" stroke="#fff" />
            <YAxis stroke="#fff" label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', fill: '#fff' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Bar dataKey="time" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Comparisons and Swaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Comparisons</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="algorithm" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="comparisons" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Swaps/Merges</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="algorithm" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Bar dataKey="swaps" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};