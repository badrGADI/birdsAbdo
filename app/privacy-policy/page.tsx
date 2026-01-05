'use client';

import React from 'react';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
            Legal & Compliance
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your personal data and ensuring transparency in how we operate.
          </p>
          <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/20">
            
            {/* Introduction */}
            <div className="mb-16">
                <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">1. Introduction</h2>
                <p className="text-slate-600 leading-looose font-light mb-4">
                    Welcome to <strong className="text-slate-900 font-medium">The World of Birds</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
            </div>

            {/* Data Collection */}
            <div className="mb-16">
                <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">2. The Data We Collect</h2>
                <p className="text-slate-600 leading-loose font-light mb-6">
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <i className="fas fa-id-card"></i>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Identity Data</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Includes first name, last name, username or similar identifier.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Contact Data</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Includes billing address, delivery address, email address and telephone numbers.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <i className="fas fa-desktop"></i>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Technical Data</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Includes internet protocol (IP) address, your login data, browser type and version.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100/50">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Transaction Data</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">Includes details about payments to and from you and other details of products you have purchased.</p>
                    </div>
                </div>
            </div>

            {/* How We Use Data */}
            <div className="mb-16">
                <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">3. How We Use Your Data</h2>
                <p className="text-slate-600 leading-loose font-light mb-4">
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="space-y-4 text-slate-600 font-light">
                    <li className="flex items-start gap-4">
                        <i className="fas fa-check text-green-500 mt-1.5"></i>
                        <span>Where we need to perform the contract we are about to enter into or have entered into with you.</span>
                    </li>
                    <li className="flex items-start gap-4">
                        <i className="fas fa-check text-green-500 mt-1.5"></i>
                        <span>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</span>
                    </li>
                    <li className="flex items-start gap-4">
                        <i className="fas fa-check text-green-500 mt-1.5"></i>
                        <span>Where we need to comply with a legal or regulatory obligation.</span>
                    </li>
                </ul>
            </div>

            {/* Data Security */}
            <div className="mb-16">
                <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">4. Data Security</h2>
                <p className="text-slate-600 leading-loose font-light mb-4">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
            </div>

             {/* Contact */}
             <div>
                <h2 className="text-2xl font-serif text-slate-900 mb-6 border-b border-slate-100 pb-4">5. Contact Us</h2>
                <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <p className="text-white/80 font-light mb-6 relative z-10">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                    </p>
                    <div className="space-y-2 relative z-10">
                        <div className="flex items-center gap-3 font-medium">
                            <i className="fas fa-envelope text-red-500"></i>
                            <span>privacy@worldofbirds.com</span>
                        </div>
                        <div className="flex items-center gap-3 font-medium">
                           <i className="fas fa-map-pin text-red-500"></i>
                           <span>The World of Birds Sanctuary, Cloud Level 9</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
