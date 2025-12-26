'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
  <footer className="bg-slate-950 text-slate-400 py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
      <div className="col-span-2">
        <div className="flex items-center space-x-3 text-white mb-8">
          <i className="fas fa-kiwi-bird text-red-600 text-3xl"></i>
          <span className="text-2xl font-serif font-bold tracking-tighter lowercase">the world of <span className="text-red-600">birds</span></span>
        </div>
        <p className="max-w-md mb-8 leading-relaxed text-slate-500 font-light text-lg">
          Redefining our connection with the sky. We provide a red-tinted lens into the world of birds through science, art, and community.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
          <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
          <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Ecosystem</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><Link href="/all-types" className="hover:text-red-500 transition-colors">Bird Families</Link></li>
          <li><Link href="/explore" className="hover:text-red-500 transition-colors">Search Species</Link></li>
          <li><Link href="/news" className="hover:text-red-500 transition-colors">Sky Chronicle</Link></li>
          <li><Link href="/customizer" className="hover:text-red-500 transition-colors">Print Studio</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Inquiry</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><i className="fas fa-envelope mr-3 text-red-600"></i> sky@worldofbirds.com</li>
          <li><i className="fas fa-map-marker-alt mr-3 text-red-600"></i> The Great Cloud, Level 9</li>
          <li><i className="fas fa-paper-plane mr-3 text-red-600"></i> Bird Sanctuary</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">&copy; 2025 THE WORLD OF BIRDS SANCTUARY. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
);

export default Footer;
