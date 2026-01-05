'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Shirts: React.FC = () => {
  const { shirts, birds, addToCart } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedFamily, setSelectedFamily] = useState('All');

  // Derive unique families from birds data
  const families = useMemo(() => {
    const uniqueFamilies = new Set(birds.map(b => b.category || b.family || 'Other'));
    return ['All', ...Array.from(uniqueFamilies).sort()];
  }, [birds]);

  // Filter and Sort Logic
  const filteredShirts = shirts
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFamily = true;
      if (selectedFamily !== 'All') {
          // Identify the bird on the shirt
          const birdOnShirt = birds.find(b => item.name.toLowerCase().includes(b.name.toLowerCase()));
          const shirtFamily = birdOnShirt ? (birdOnShirt.category || birdOnShirt.family || 'Other') : 'Other';
          
          // Match family (or if shirt name explicitly contains the family name, e.g. "Raptor Squad")
          matchesFamily = shirtFamily === selectedFamily || item.name.toLowerCase().includes(selectedFamily.toLowerCase().slice(0, -1));
      }

      return matchesSearch && matchesFamily;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default: // newest (using id as proxy/fallback)
          return 0;
      }
    });

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

      {/* Sticky Filter Bar */}
      <div className="sticky top-4 z-40 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-lg border border-red-100 mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-grow">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-red-300"></i>
                <input 
                    type="text" 
                    placeholder="Search shirts..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-3 bg-red-50/50 border-none rounded-2xl text-slate-800 placeholder-red-200 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none font-medium"
                />
            </div>
            
            <div className="relative w-full sm:w-64">
                <i className="fas fa-feather absolute left-4 top-1/2 -translate-y-1/2 text-red-300"></i>
                <select 
                    value={selectedFamily}
                    onChange={(e) => setSelectedFamily(e.target.value)}
                    className="w-full pl-12 pr-6 py-3 bg-red-50/50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none font-medium appearance-none cursor-pointer"
                >
                    {families.map(f => <option key={f} value={f}>{f === 'All' ? 'All Families' : f}</option>)}
                </select>
            </div>
        </div>
        
        <div className="relative w-full sm:w-48 flex-shrink-0">
            <i className="fas fa-sort absolute left-4 top-1/2 -translate-y-1/2 text-red-300"></i>
            <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-red-50/50 border-none rounded-2xl text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none font-medium appearance-none cursor-pointer"
            >
                <option value="newest">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
            </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredShirts.length > 0 ? (
            filteredShirts.map((item) => (
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
                {item.externalUrl ? (
                     <a 
                        href={item.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors shadow-lg"
                        title="Buy Product"
                     >
                        <i className="fas fa-external-link-alt text-xs"></i>
                     </a>
                ) : (
                    <button 
                        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price || 0, image: item.imageUrl, type: 'shirt' })}
                        className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                )}
                </div>
            </div>
            ))
        ) : (
            <div className="col-span-full text-center py-20 text-slate-400">
                <div className="text-6xl mb-4">👕</div>
                <p className="text-xl">No shirts found matching "{searchQuery}"</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Shirts;
