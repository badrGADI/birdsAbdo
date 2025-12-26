'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';
import ReactMarkdown from 'react-markdown';

const NewsArticleDetail: React.FC = () => {
    const params = useParams();
    const id = params.id as string;
    const { news } = useAppContext();
    const article = news.find(n => n.id === id);

    if (!article) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-serif text-slate-900 mb-8">Article Not Found</h1>
                <Link href="/news" className="text-red-600 font-bold hover:underline">Back to Chronicle</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen pb-24">
            {/* Hero Header */}
            <div className="relative h-[60vh] overflow-hidden">
                <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-12 lg:p-24">
                    <div className="max-w-4xl">
                        <span className="px-4 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 inline-block">
                            {article.author === 'Admin' ? 'Official Sanctuary Report' : 'Community Insight'}
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter leading-none mb-6 capitalize lowercase">
                            {article.title}
                        </h1>
                        <div className="flex items-center space-x-6 text-slate-300 font-medium text-sm">
                            <span><i className="far fa-calendar-alt mr-2 text-red-500"></i>{article.date}</span>
                            <span><i className="far fa-user mr-2 text-red-500"></i>By {article.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
                <div className="bg-white rounded-[3rem] shadow-2xl p-12 lg:p-20 border border-slate-100">
                    <div className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-serif prose-headings:tracking-tighter prose-a:text-red-600 prose-img:rounded-3xl">
                        {/* Simple Markdown Rendering or Fallback to Content */}
                        {article.content ? (
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        ) : (
                            <p className="text-slate-600 font-light leading-relaxed">
                                {article.summary}
                            </p>
                        )}
                    </div>

                    {/* Gallery Section if exists */}
                    {article.gallery && article.gallery.length > 0 && (
                        <div className="mt-20 pt-20 border-t border-slate-50">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Visual Documentation</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {article.gallery.map((img, i) => (
                                    <div key={i} className="rounded-3xl overflow-hidden shadow-lg aspect-video h-64 bg-slate-100">
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-20 pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
                        <Link href="/news" className="flex items-center text-slate-400 hover:text-red-600 font-bold transition-all group">
                            <i className="fas fa-arrow-left mr-3 group-hover:-translate-x-2 transition-transform"></i>
                            Return to Chronicle
                        </Link>
                        <div className="flex space-x-4">
                            <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticleDetail;
