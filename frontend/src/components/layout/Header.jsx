import React from 'react';
import { Package } from 'lucide-react';

export const Header = () => (
  <div className="text-center mb-8">
    <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
      <Package className="w-12 h-12" />
      Package Sorting Center
    </h1>
    <p className="text-purple-200">Advanced Queue & Stack Management System</p>
  </div>
);