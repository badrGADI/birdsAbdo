
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-serif mb-6 text-slate-900 uppercase tracking-tight">Join the Flight</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Questions about our species database? Custom order inquiries? Reach out and we'll reply within a hummingbird's heartbeat.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-red-200 transition-colors group">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Direct Email</p>
                <p className="text-lg font-bold text-slate-800">contact@worldofbirds.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-red-200 transition-colors group">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Call Center</p>
                <p className="text-lg font-bold text-slate-800">+1-800-BIRDS-HELP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Full Name</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none transition-colors" placeholder="Avi O'Logist" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Subject</label>
                <select className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none transition-colors bg-white">
                  <option>Store Inquiry</option>
                  <option>Species Data</option>
                  <option>Collaboration</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Message</label>
              <textarea className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none transition-colors min-h-[150px]" placeholder="Type your message..."></textarea>
            </div>
            <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95">
              Send Message <i className="fas fa-paper-plane ml-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
