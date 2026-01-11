import React from 'react';
import { BarChart3 } from 'lucide-react';
import { PerformanceCharts } from './PerformanceCharts';
import { MetricsTable } from './MetricsTable';
import { ComplexityInfo } from './ComplexityInfo';

export const Analytics = ({ performanceData }) => {
  if (!performanceData || performanceData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-12 border border-white/20 text-center">
        <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">No Analytics Data Yet</h3>
        <p className="text-purple-200">
          Perform sorting operations to see performance analytics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PerformanceCharts performanceData={performanceData} />
      <MetricsTable performanceData={performanceData} />
      <ComplexityInfo />
    </div>
  );
};