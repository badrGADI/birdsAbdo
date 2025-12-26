'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import LoadingScreen from '../../../components/LoadingScreen';
import { useAppContext } from '../../../context/AppContext';
import { Bird } from '../../../types';

const BirdArticle: React.FC = () => {
  const params = useParams();
  const name = typeof params.name === 'string' ? decodeURIComponent(params.name) : '';
  const { birds } = useAppContext();
  
  const [bird, setBird] = useState<Bird | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (birds.length > 0) {
      const found = birds.find((b: Bird) => b.name.toLowerCase() === name.toLowerCase());
      setBird(found);
      setLoading(false);
    }
  }, [name, birds]);

  useEffect(() => {
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

    revealRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [loading, bird]);

  const setRevealRef = (el: HTMLElement | null, index: number) => {
      revealRefs.current[index] = el;
  };

  if (loading) return <LoadingScreen />;

  if (!bird) {
      return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-slate-50 px-6">
             <i className="fas fa-feather-pointed text-6xl text-slate-300 mb-6"></i>
             <h2 className="text-4xl font-serif text-slate-800 mb-4">Bird Not Found</h2>
             <p className="text-slate-500 mb-8">The species you are looking for has not been cataloged yet.</p>
             <Link href="/explore" className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow-xl shadow-red-600/20">Return to Explore</Link>
        </div>
      )
  }

  // Generate a mock article text since we don't have AI
  const mockArticle = `
The ${bird.name} (*${bird.scientificName}*) is a fascinating specimen of the **${bird.family}** family. Observers have long noted its distinctive behaviors and unique role in its ecosystem.

### Habitat & Environment

Native to ${bird.habitat}, this bird has adapted remarkably well to its environment. Its plumage is not just for show; it serves vital camouflage and signaling purposes within its social structure. The intricate balance of its ecosystem relies on the ${bird.name} as both a predator and a contributor to biodiversity.

### Conservation Status

Conservation efforts are currently underway to ensure future generations can witness the beauty of the ${bird.name}. Researchers are monitoring populations closely, noting that habitat preservation is key to their continued survival.
  `;

  return (
    <div className="bg-white min-h-screen">
      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img 
                src={bird.imageUrl} 
                className="w-full h-full object-cover animate-zoom-slow"
                alt={bird.name}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        {/* Floating Title Card */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 z-10 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000">
                <div className="mb-6">
                   <span className="bg-red-600/90 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full backdrop-blur-md shadow-lg shadow-red-900/20">
                      {bird.family} Family
                   </span>
                </div>
                <h1 className="text-6xl md:text-9xl font-serif text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
                    {bird.name}
                </h1>
                <p className="text-white/80 font-serif italic text-2xl md:text-3xl tracking-wide font-light">
                    {bird.scientificName}
                </p>
            </div>
             <div className="hidden md:block animate-in fade-in zoom-in duration-1000 delay-300 opacity-20">
                <i className="fas fa-dove text-white text-[12rem]"></i>
            </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Read Article</span>
           <i className="fas fa-chevron-down text-white text-xs"></i>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="max-w-4xl mx-auto px-6 py-24 -mt-20 relative z-20">
         <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-100">
             <Link href="/all-types" className="inline-flex items-center text-red-600 font-bold text-xs uppercase tracking-widest mb-12 hover:-translate-x-1 transition-transform group">
                 <i className="fas fa-arrow-left mr-3 group-hover:-translate-x-1 transition-transform"></i> Back to Catalog
             </Link>

             {/* Introduction Layout */}
             <div ref={(el) => setRevealRef(el, 1)} className="reveal-on-scroll flex flex-col md:flex-row gap-12 mb-16 border-b border-slate-100 pb-16">
                 <div className="md:w-1/3 flex-shrink-0">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>
                        Quick Facts
                    </h3>
                    <ul className="space-y-6">
                        {(bird.facts || []).map((fact, i) => (
                            <li key={i} className="flex gap-4 items-start group">
                                <span className="w-6 h-6 rounded-full bg-slate-50 text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-colors flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                                <span className="text-sm text-slate-600 font-medium leading-relaxed">{fact}</span>
                            </li>
                        ))}
                    </ul>
                 </div>
                 <div className="md:w-2/3">
                    <p className="text-3xl font-serif text-slate-800 leading-relaxed font-normal">
                        <span className="text-6xl float-left mr-3 mt-[-10px] text-red-600 font-black">"</span>
                        {bird.description || "No description available for this species yet."}
                    </p>
                 </div>
             </div>

             {/* Main Article Prose */}
            <div ref={(el) => setRevealRef(el, 2)} className="reveal-on-scroll prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-normal prose-h3:text-2xl prose-h3:text-slate-900 prose-p:text-slate-600 prose-p:font-light prose-p:leading-8 max-w-none">
                {mockArticle.trim().split('\n').map((para, i) => { 
                    const trimmed = para.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith('###')) { // Habitat & Environment etc
                         return <h3 key={i} className="mt-12 mb-6">{trimmed.replace(/###\s*/, '')}</h3>;
                    }
                    // Simple bold/italic parser
                    const content = trimmed.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, idx) => {
                        if (part.startsWith('**') && part.endsWith('**')) return <strong key={idx} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
                        if (part.startsWith('*') && part.endsWith('*')) return <em key={idx} className="font-serif italic text-slate-800">{part.slice(1, -1)}</em>;
                        return part;
                    });
                    
                    return <p key={i}>{content}</p>;
                })}
            </div>

            {/* Quote / Highlight */}
            <blockquote ref={(el) => setRevealRef(el, 3)} className="reveal-on-scroll mt-20 p-12 bg-slate-50 border-l-4 border-red-600 rounded-r-[2rem] relative overflow-hidden group hover:bg-red-50 transition-colors duration-500">
                <i className="fas fa-quote-right absolute top-6 right-8 text-6xl text-slate-200 opacity-50 group-hover:text-red-200 transition-colors"></i>
                <p className="text-xl font-serif text-slate-800 italic relative z-10 leading-relaxed">
                    "The {bird.name} is not merely a bird; it is a living testament to the evolutionary artistry of nature. Preserving its habitat is preserving a piece of our world's soul."
                </p>
                <footer>
                    <div className="w-8 h-px bg-red-600 mr-3"></div>
                    The World of Birds Field Notes
                </footer>
            </blockquote>

         </div>
      </section>

      {/* Suggested / Next Section */}
      <section className="bg-slate-950 py-32 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600 rounded-full blur-[150px]"></div>
          </div>
          
          <div ref={(el) => setRevealRef(el, 4)} className="reveal-on-scroll max-w-2xl mx-auto px-6 relative z-10">
              <i className="fas fa-binoculars text-4xl text-red-500 mb-8 animate-bounce"></i>
              <h2 className="text-4xl md:text-7xl font-serif mb-8 tracking-tight">Continue the Journey</h2>
              <p className="text-slate-400 mb-12 font-light text-xl leading-relaxed">There are over 10,000 species of birds in the world. Which one will you discover next?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link href="/explore" className="px-10 py-5 bg-red-600 rounded-full font-bold hover:bg-red-500 transition-all shadow-2xl shadow-red-900/30 hover:-translate-y-1">
                      Explore More
                  </Link>
                  <Link href="/all-types" className="px-10 py-5 border border-slate-700 rounded-full font-bold hover:bg-white hover:text-slate-950 transition-all hover:-translate-y-1">
                      View Families
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
};

export default BirdArticle;
