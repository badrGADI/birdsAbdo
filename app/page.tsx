'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

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
  }, []);

  const setRevealRef = (el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  };

  return (
    <div className="space-y-0">
      {/* Immersive Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover animate-zoom-slow brightness-[0.45]"
          >
            <source src="/videos/hero-bird.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/30"></div>
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-6xl">
          <div className="mb-8 animate-in slide-in-from-top-4 duration-1000">
            <span className="px-6 py-2 bg-red-600/20 backdrop-blur-xl border border-red-500/30 rounded-full text-red-400 text-xs font-black uppercase tracking-[0.4em]">
              The Sanctuary of Birds
            </span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-serif mb-8 leading-[0.85] tracking-tighter animate-in fade-in zoom-in duration-1000">
            Beauty <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400 italic">in Flight</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-300">
            A red-tinted lens into the world of birds. Discover rare species, curate your style, and explore scientific horizons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Link href="/explore" className="px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-full font-extrabold transition-all shadow-2xl shadow-red-600/30 active:scale-95 group flex items-center">
              Explore Sanctuary
              <i className="fas fa-chevron-right ml-3 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <Link href="/all-types" className="px-10 py-5 bg-white/10 backdrop-blur-md hover:bg-white hover:text-red-600 text-white border border-white/20 rounded-full font-extrabold transition-all active:scale-95">
              Browse Categories
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-40">
           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Scroll</span>
           <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Smart Bento Grid Features */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div ref={(el) => setRevealRef(el, 0)} className="reveal-on-scroll text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 uppercase tracking-tight">Expertise & Style</h2>
          <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          {/* Main Hero Card */}
          <div ref={(el) => setRevealRef(el, 1)} className="reveal-on-scroll md:col-span-2 md:row-span-2 bento-card relative overflow-hidden rounded-[3rem] bg-red-600 text-white group shadow-2xl">
             <img src="/images/northern-cardinal.png" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Bird Art" />
             <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent"></div>
             <div className="relative z-10 h-full p-12 flex flex-col justify-end">
                <span className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-red-200">Our Pride</span>
                <h3 className="text-5xl font-serif mb-6 leading-none">The Red Wing <br/>Experience</h3>
                <p className="text-lg text-red-100 mb-8 max-w-sm">From deep-field scientific reports to the most vibrant custom apparel in the industry.</p>
                <Link href="/about" className="w-fit px-8 py-3 bg-white text-red-600 rounded-full font-bold shadow-lg hover:shadow-white/20 transition-all">
                  Our Story
                </Link>
             </div>
          </div>

          {/* Customizer Link */}
          <div ref={(el) => setRevealRef(el, 2)} className="reveal-on-scroll md:col-span-2 bento-card relative overflow-hidden rounded-[3rem] bg-slate-950 text-white group shadow-xl">
             <img src="/images/scarlet-macaw.png" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="Apparel" />
             <div className="relative z-10 h-full p-12 flex flex-col justify-center">
                <h3 className="text-4xl font-serif mb-4">Print Studio</h3>
                <p className="text-slate-400 mb-6 max-w-xs text-sm">Design your unique avian apparel with our creative engine.</p>
                <Link href="/customizer" className="text-red-500 font-black text-xs uppercase tracking-[0.3em] flex items-center">
                  Get Creative <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </Link>
             </div>
          </div>

          {/* Bookstore Link */}
          <div ref={(el) => setRevealRef(el, 3)} className="reveal-on-scroll bento-card relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 group shadow-xl">
             <div className="p-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 text-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <i className="fas fa-book-open"></i>
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Library</h3>
                   <p className="text-xs text-slate-500 mb-6">Expert field guides and art books.</p>
                   <Link href="/books" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all">
                      <i className="fas fa-shopping-cart text-xs"></i>
                   </Link>
                </div>
             </div>
          </div>

          {/* News Link */}
          <div ref={(el) => setRevealRef(el, 4)} className="reveal-on-scroll bento-card relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 group shadow-xl">
             <div className="p-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 text-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">Chronicle</h3>
                   <p className="text-xs text-slate-500 mb-6">AI field reports from the sky.</p>
                   <Link href="/news" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all">
                      <i className="fas fa-arrow-right text-xs"></i>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Dynamic Bird Types Preview */}
      <section className="bg-slate-950 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
           <i className="fas fa-feather-pointed text-[30rem] text-red-600 rotate-12"></i>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div ref={(el) => setRevealRef(el, 5)} className="reveal-on-scroll flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="md:w-1/2">
               <span className="text-red-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Categories</span>
               <h2 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-tight">The Families</h2>
            </div>
            <Link href="/all-types" className="text-white font-bold pb-2 border-b-2 border-red-600 hover:text-red-500 transition-colors uppercase tracking-[0.2em] text-sm">
               View All Types
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Raptors', slug: 'raptors', img: '/images/peregrine-falcon.png' },
              { name: 'Songbirds', slug: 'songbirds', img: '/images/northern-cardinal.png' },
              { name: 'Waterfowl', slug: 'waterfowl', img: '/images/waterfowl.png' },
              { name: 'Tropical', slug: 'tropical', img: '/images/scarlet-macaw.png' }
            ].map((type, idx) => (
              <Link 
                key={idx}
                href={`/family/${type.slug}`}
                // Fix: ref argument matches HTMLElement
                ref={(el) => setRevealRef(el as unknown as HTMLElement, idx + 6)}
                className="reveal-on-scroll group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <img src={type.img} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={type.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-transparent to-transparent flex flex-col justify-end p-8">
                   <h3 className="text-2xl font-serif text-white uppercase tracking-tighter">{type.name}</h3>
                   <div className="w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-500 mt-2"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bird Spotlight */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div ref={(el) => setRevealRef(el as HTMLDivElement, 10)} className="reveal-on-scroll lg:w-1/2 relative">
               <div className="absolute -top-10 -left-10 w-48 h-48 bg-red-50 rounded-full -z-10 animate-float"></div>
               <div className="relative group">
                 <img 
                    src="/images/scarlet-macaw.png" 
                    className="rounded-[4rem] shadow-2xl transition-all duration-700 group-hover:rotate-2 group-hover:scale-[1.02]" 
                    alt="Bird of the Month" 
                 />
                 <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-2xl max-w-xs transform group-hover:translate-x-4 transition-transform">
                   <p className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em] mb-3">Bird of the Month</p>
                   <h4 className="text-2xl font-serif text-slate-900 mb-2">The Red Quetzal</h4>
                   <p className="text-slate-600 text-xs leading-relaxed font-medium">Considered sacred in Mayan culture, this bird represents the soul of the forest.</p>
                 </div>
               </div>
            </div>
            
            <div ref={(el) => setRevealRef(el as HTMLDivElement, 11)} className="reveal-on-scroll lg:w-1/2 space-y-10">
              <h2 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] tracking-tighter">
                Discover <br/>
                <span className="italic text-red-600">The Rare</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-light max-w-xl">
                Our species database is constantly evolving with the help of researchers worldwide. Dive into the intricacies of migration, vocalizations, and behavior.
              </p>
              <Link href="/explore" className="inline-flex items-center px-10 py-5 bg-slate-900 text-white rounded-full font-extrabold hover:bg-red-600 transition-all hover:shadow-2xl shadow-red-600/10 hover:-translate-y-1 group">
                Browse Species
                <i className="fas fa-binoculars ml-3 text-red-500 group-hover:text-white transition-colors"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Community Section */}
      <section ref={(el) => setRevealRef(el, 12)} className="reveal-on-scroll max-w-7xl mx-auto px-6 py-24 mb-32">
        <div className="relative rounded-[5rem] bg-gradient-to-br from-red-600 to-rose-900 p-16 md:p-32 overflow-hidden text-center text-white shadow-2xl shadow-red-600/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <i className="fas fa-dove text-[30rem] absolute -top-40 -left-40"></i>
          </div>
          
          <h2 className="text-5xl md:text-8xl font-serif mb-8 relative z-10 leading-none">Join the Bird Sanctuary</h2>
          <p className="text-xl text-red-100 mb-12 max-w-2xl mx-auto relative z-10 opacity-90 font-light">
            An elite community of birders, conservationists, and designers unified by the beauty of nature.
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <Link href="/explore" className="px-12 py-5 bg-white text-red-800 rounded-full font-black hover:bg-red-50 transition-all shadow-2xl uppercase tracking-widest text-sm">
               Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
