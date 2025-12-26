'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Bird } from '../../types';

const CATEGORY_ICONS: Record<string, string> = {
  'Raptors': 'fa-feather-pointed',
  'Songbirds': 'fa-music',
  'Waterfowl': 'fa-water',
  'Tropical': 'fa-leaf',
  'Flightless': 'fa-walking',
  'Hummingbirds': 'fa-wind',
  'Owls': 'fa-eye',
};

const Explore: React.FC = () => {
  const { birds } = useAppContext();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Bird | null>(null);
  const [loading, setLoading] = useState(false);

  // Derive categories dynamically from Supabase birds
  const dynamicBirdTypes = useMemo(() => {
    const categoriesMap = new Map<string, string[]>();
    birds.forEach(bird => {
      const cat = bird.category || bird.family || 'Other';
      if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
      categoriesMap.get(cat)?.push(bird.name);
    });

    return Array.from(categoriesMap.entries()).map(([name, birdList]) => ({
      name,
      icon: CATEGORY_ICONS[name] || 'fa-kiwi-bird',
      birds: birdList
    }));
  }, [birds]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    
    // Simulate identification delay
    setTimeout(() => {
        const found = birds.find(b => 
          b.name.toLowerCase().includes(query.toLowerCase()) || 
          b.scientificName?.toLowerCase().includes(query.toLowerCase())
        );
        setResult(found || null);
        if (!found) alert(`Bird not found. Try searching for something else!`);
        setLoading(false);
    }, 600);
  };

  const handleCategoryClick = (birdName: string) => {
    setQuery(birdName);
    const found = birds.find(b => b.name === birdName);
    setResult(found || null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif mb-6 uppercase tracking-tight">World of Birds Encyclopedia</h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10">Explore the vast diversity of birds. Filter by type or search for a specific species below.</p>
        
        {/* Dynamic Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            {dynamicBirdTypes.map((type: any) => (
                <div key={type.name} className="flex flex-col items-center">
                    <button 
                        onClick={() => handleCategoryClick(type.birds[0])}
                        className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl hover:bg-red-600 hover:text-white transition-all mb-2"
                        title={`Explore ${type.name}`}
                    >
                        <i className={`fas ${type.icon}`}></i>
                    </button>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{type.name}</span>
                </div>
            ))}
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a bird (e.g. Cardinal)..." 
            className="w-full pl-14 pr-32 py-5 bg-white border-2 border-slate-200 rounded-2xl focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all shadow-sm group-focus-within:shadow-xl"
          />
          <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500"></i>
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? <i className="fas fa-circle-notch animate-spin"></i> : 'Discover'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Identifying species...</p>
        </div>
      )}

      {result && !loading && (
        <div className="grid lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-4xl font-serif text-slate-900 tracking-tight">{result.name}</h2>
                <span className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-widest">Species Card</span>
            </div>
            <p className="text-red-600 font-mono text-lg italic">{result.scientificName}</p>
            <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-red-600 mt-1 mr-4"></i>
                    <div>
                        <h4 className="font-bold text-slate-700 text-sm uppercase">Habitat Range</h4>
                        <p className="text-slate-600">{result.habitat}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <i className="fas fa-info-circle text-red-600 mt-1 mr-4"></i>
                    <div>
                        <h4 className="font-bold text-slate-700 text-sm uppercase">Summary</h4>
                        <p className="text-slate-600 leading-relaxed">{result.description}</p>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center">
                <i className="fas fa-lightbulb text-orange-400 mr-3"></i> Fascinating Facts
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {(result.facts || []).map((fact: string, i: number) => (
                    <div key={i} className="flex items-center bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-red-200 transition-colors">
                        <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-700 rounded-full text-xs font-bold mr-4">{i+1}</span>
                        <p className="text-slate-600 text-sm">{fact}</p>
                    </div>
                ))}
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex gap-4">
                <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors">
                    Save to Journal
                </button>
                <button className="flex-1 py-4 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors">
                    Share Insight
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
