'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

// Standard metadata for known categories
const CATEGORY_META: Record<string, { desc: string, img: string }> = {
  'Raptors': { desc: 'Powerful birds of prey including eagles, hawks, and falcons.', img: '/images/peregrine-falcon.png' },
  'Songbirds': { desc: 'Small to medium birds known for their melodic vocalizations.', img: '/images/northern-cardinal.png' },
  'Waterfowl': { desc: 'Aquatic birds like birds like ducks, geese, and swans.', img: '/images/waterfowl.png' },
  'Hummingbirds': { desc: 'Tiny, fast-moving birds with iridescent plumage.', img: '/images/hummingbird.png' },
  'Owls': { desc: 'Mysterious nocturnal predators with exceptional hearing.', img: '/images/bald-eagle.png' },
  'Tropical': { desc: 'Vibrant parrots and exotic birds from the equator.', img: '/images/scarlet-macaw.png' },
  'Flightless': { desc: 'Unique birds that have adapted to life on the ground.', img: '/images/ostrich.png' },
};

const AllTypes: React.FC = () => {
  const { birds } = useAppContext();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Dynamically derive categories from birds fetched from Supabase
  const dynamicCategories = useMemo(() => {
    const categoriesMap = new Map<string, number>();
    
    birds.forEach(bird => {
      const cat = bird.category || bird.family || 'Other';
      categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
    });

    return Array.from(categoriesMap.entries()).map(([name, count]) => {
      const meta = CATEGORY_META[name] || {
        desc: `A fascinating collection of ${name.toLowerCase()} species from around the world of birds.`,
        img: '/images/placeholder-bird.png'
      };
      
      return {
        name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        count: `${count} Species`,
        ...meta
      };
    });
  }, [birds]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [dynamicCategories]); // Re-observe if categories change

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-24 text-center">
        <span className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Sanctuary Catalog</span>
        <h1 className="text-6xl md:text-8xl font-serif text-slate-900 tracking-tighter uppercase leading-none mb-6">Bird <br/><span className="italic text-red-600">Families</span></h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
          Traverse through our global database organized by family. Each category holds a treasure of scientific knowledge and stunning imagery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {dynamicCategories.map((cat: any, idx: number) => (
          <Link 
            key={cat.slug} 
            href={`/family/${cat.slug}`}
            ref={el => { revealRefs.current[idx] = el; }}
            className="reveal-on-scroll group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-all p-4 hover:-translate-y-2"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="aspect-[4/3] bg-slate-100 rounded-[2.2rem] overflow-hidden mb-8">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-serif text-slate-900">{cat.name}</h2>
                <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">{cat.count}</span>
              </div>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">{cat.desc}</p>
              <div className="flex items-center text-red-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                Explore Species <i className="fas fa-arrow-right ml-2 text-[8px]"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllTypes;
