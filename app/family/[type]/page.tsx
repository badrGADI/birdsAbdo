'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';

const FamilyGallery: React.FC = () => {
  const params = useParams();
  const type = params.type as string;
  const { birds } = useAppContext();
  const [loading, setLoading] = useState(true);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Filter birds by slugified category (matches how AllTypes generates links)
  const familyBirds = useMemo(() => {
    return birds.filter(bird => {
      const catName = bird.category || bird.family || 'Other';
      const catSlug = catName.toLowerCase().replace(/ /g, '-');
      return catSlug === type?.toLowerCase();
    });
  }, [birds, type]);

  const categoryDisplayName = familyBirds.length > 0 
    ? (familyBirds[0].category || familyBirds[0].family) 
    : type.replace(/-/g, ' ');

  useEffect(() => {
    // Once birds are loaded, we can stop the overall loading state
    if (birds.length > 0) {
      setLoading(false);
    } else {
        // Fallback for empty database cases after a short timeout
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }
  }, [birds]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [familyBirds, loading]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-20">
        <Link href="/all-types" className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em] flex items-center mb-8 hover:-translate-x-2 transition-transform">
          <i className="fas fa-chevron-left mr-2"></i> All Families
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="md:w-2/3">
            <h1 className="text-6xl md:text-8xl font-serif text-slate-900 capitalize tracking-tighter leading-none mb-6">
               <span className="italic text-red-600 capitalize">{categoryDisplayName}</span> Sanctuary
            </h1>
            <p className="text-xl text-slate-500 font-light max-w-xl leading-relaxed">
               Discover the specialized traits and behaviors of our {categoryDisplayName} collection. Each species in our database represents a unique scientific master of its domain.
            </p>
          </div>
          <div className="bg-red-50 text-red-600 px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest h-fit shadow-sm ring-1 ring-red-100">
            {familyBirds.length} Species Cataloged
          </div>
        </div>
        <div className="w-full h-px bg-slate-100 mt-12"></div>
      </div>

      {loading ? (
        <div className="py-40 text-center animate-pulse">
            <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Synchronizing Sanctuary Access...</p>
        </div>
      ) : familyBirds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {familyBirds.map((bird, idx) => (
            <Link 
              key={bird.id} 
              href={`/article/${encodeURIComponent(bird.name)}`}
              ref={el => { revealRefs.current[idx] = el; }}
              className="reveal-on-scroll group bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl border border-slate-100 transition-all p-5 hover:-translate-y-2"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-square bg-slate-50 rounded-[2.8rem] overflow-hidden mb-8 relative">
                  <img 
                      src={bird.imageUrl || `/images/default-bird.jpg`} 
                      alt={bird.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-red-950/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="px-6 pb-6 flex justify-between items-center">
                  <div>
                      <h3 className="text-3xl font-serif text-slate-900 group-hover:text-red-600 transition-colors leading-tight">{bird.name}</h3>
                      <p className="text-xs text-red-500 font-serif italic mb-2">{bird.scientificName}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">View Species Details</p>
                  </div>
                  <div className="w-14 h-14 bg-red-600 text-white rounded-[1.8rem] flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-500 shadow-xl shadow-red-600/30">
                      <i className="fas fa-arrow-right"></i>
                  </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center">
            <div className="relative inline-block mb-8">
                <i className="fas fa-feather-pointed text-8xl text-slate-50"></i>
                <i className="fas fa-search absolute bottom-0 right-0 text-red-100 text-4xl animate-pulse"></i>
            </div>
            <h3 className="text-4xl font-serif text-slate-300 mb-4">No active reports for this sanctuary.</h3>
            <p className="text-slate-500 max-w-md mx-auto font-light leading-relaxed">The avian curators are currently in the field. Check back soon for new species discoveries in this classification.</p>
            <Link href="/all-types" className="inline-block mt-12 px-10 py-4 border-2 border-slate-200 rounded-full text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:border-red-600 hover:text-red-600 transition-colors">
                Explore Other Families
            </Link>
        </div>
      )}
    </div>
  );
};

export default FamilyGallery;
