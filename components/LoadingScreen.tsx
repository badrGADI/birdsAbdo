
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
        <i className="fas fa-dove absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 text-3xl animate-pulse"></i>
      </div>
      <h2 className="text-2xl font-serif text-slate-800">Spreading our wings...</h2>
      <p className="text-slate-500 mt-2">Loading The World of Birds</p>
    </div>
  );
};

export default LoadingScreen;
