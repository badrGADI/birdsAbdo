'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Shirts: React.FC = () => {
  const { shirts, addToCart } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-red-950 rounded-[3rem] p-12 mb-16 relative overflow-hidden text-white flex flex-col md:flex-row items-center shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/images/scarlet-macaw.png"
            className="w-full h-full object-cover" 
            alt="Apparel Backdrop" 
          />
        </div>
        <div className="relative z-10 md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight lowercase tracking-tight">the world of <span className="text-red-600">birds</span> | apparel</h1>
          <p className="text-red-100 text-lg mb-8 max-w-xl">Wear your passion. Sustainable organic cotton with exclusive bird illustrations.</p>
          <div className="flex gap-4">
            <Link href="/customizer" className="inline-block px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-500 transition-all shadow-xl active:scale-95">
               Design Your Own <i className="fas fa-magic ml-2"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {shirts.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <Link href={`/shirt/${item.id}`} className="block aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4 relative shadow-sm border border-slate-100">
               <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white text-red-600 px-6 py-2 rounded-full font-bold shadow-lg">View Design</span>
               </div>
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-red-600 transition-colors">{item.name}</h3>
                <p className="text-red-700 font-bold">${(item.price || 0).toFixed(2)}</p>
              </div>
              <button 
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.price || 0, image: item.imageUrl, type: 'shirt' })}
                  className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
               >
                 <i className="fas fa-plus"></i>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shirts;
