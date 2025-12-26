
import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <div className="space-y-24 pb-20">
      <section className="bg-red-950 text-white py-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
                <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight">Our Mission</h1>
                <p className="text-xl text-red-100/80 leading-relaxed font-light">
                    The World of Birds was founded in 2024 to unite birders, scientists, and designers. We believe knowledge is the first step toward conservation.
                </p>
            </div>
            <div className="md:w-1/2 relative">
                <img 
                    src="/images/bald-eagle.png" 
                    className="rounded-[3rem] shadow-2xl transition-transform duration-700 w-full h-auto"
                    alt="Avian Sanctuary"
                />
            </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-[100px]"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16">
        <div className="text-center group">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 transition-colors duration-500">
                <i className="fas fa-microscope text-3xl text-red-600 group-hover:text-white transition-colors duration-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Scientific Integrity</h3>
            <p className="text-slate-600 leading-relaxed">Every fact provided in our encyclopedia is verified by avian experts and researchers.</p>
        </div>
        <div className="text-center group">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 transition-colors duration-500">
                <i className="fas fa-leaf text-3xl text-red-600 group-hover:text-white transition-colors duration-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Eco-Conscious Apparel</h3>
            <p className="text-slate-600 leading-relaxed">Our custom shirts use 100% organic cotton and water-based inks to minimize environmental impact.</p>
        </div>
        <div className="text-center group">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 transition-colors duration-500">
                <i className="fas fa-heart text-3xl text-red-600 group-hover:text-white transition-colors duration-500"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Birding Community</h3>
            <p className="text-slate-600 leading-relaxed">Join thousands of members dedicated to preserving the heavens for future generations.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
