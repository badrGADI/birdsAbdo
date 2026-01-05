'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

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
                    <div className="prose prose-slate lg:prose-xl max-w-none 
                        prose-headings:font-serif prose-headings:tracking-tighter prose-headings:font-bold prose-headings:text-slate-900
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-slate-600 prose-p:leading-loose
                        prose-a:text-red-600 prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                        prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-8
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                        prose-li:marker:text-red-600 prose-li:text-slate-600 prose-li:pl-2 prose-li:my-2
                        prose-strong:text-slate-900 prose-strong:font-black
                        
                        prose-table:width-full prose-table:shadow-sm prose-table:my-8
                        prose-thead:bg-slate-50 prose-thead:border-b-2 prose-thead:border-slate-100
                        prose-th:p-4 prose-th:text-slate-900 prose-th:font-black prose-th:uppercase prose-th:text-xs prose-th:tracking-widest
                        prose-td:p-4 prose-td:text-slate-600 prose-td:border-b prose-td:border-slate-50
                        prose-tr:hover:bg-slate-50/50 transition-colors">
                        {/* Markdown Rendering */}
                        {article.content ? (
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Custom renderer for paragraphs to detect standalone youtube links
                                    p: ({node, children}: any) => {
                                        if (node && node.children.length === 1 && node.children[0].type === 'text') {
                                            const text = node.children[0].value;
                                            const youtubeId = getYoutubeId(text);
                                            if (youtubeId) {
                                                return (
                                                    <span className="block my-8 rounded-3xl overflow-hidden shadow-xl aspect-video relative bg-slate-900 group">
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                                            className="w-full h-full absolute inset-0 group-hover:scale-[1.02] transition-transform duration-700"
                                                            title="YouTube video player"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </span>
                                                );
                                            }
                                        }
                                        return <p>{children}</p>;
                                    },
                                    a: ({href, children}: any) => {
                                        const youtubeId = getYoutubeId(href || '');
                                        if (youtubeId) {
                                            return (
                                                <span className="block my-8 rounded-3xl overflow-hidden shadow-xl aspect-video relative bg-slate-900 group">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${youtubeId}`}
                                                        className="w-full h-full absolute inset-0 group-hover:scale-[1.02] transition-transform duration-700"
                                                        title="YouTube video player"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </span>
                                            );
                                        }
                                        return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                                    },
                                    // Explicit list styling to ensure "puces" (bullets) are visible
                                    ul: ({children}) => <ul className="list-disc pl-6 space-y-2 my-6 text-slate-600 marker:text-red-600">{children}</ul>,
                                    ol: ({children}) => <ol className="list-decimal pl-6 space-y-2 my-6 text-slate-600 marker:text-slate-900 marker:font-bold">{children}</ol>,
                                    li: ({children}) => <li className="pl-2">{children}</li>,
                                    
                                    // Explicit Heading Styling
                                    h1: ({children}) => <h1 className="text-4xl font-serif font-bold text-slate-900 mt-12 mb-6 capitalize">{children}</h1>,
                                    h2: ({children}) => <h2 className="text-3xl font-serif font-bold text-slate-900 mt-12 mb-6 capitalize">{children}</h2>,
                                    h3: ({children}) => <h3 className="text-2xl font-serif font-bold text-slate-900 mt-8 mb-4 capitalize">{children}</h3>,
                                    h4: ({children}) => <h4 className="text-xl font-serif font-bold text-slate-900 mt-8 mb-4 capitalize">{children}</h4>,
                                    h5: ({children}) => <h5 className="text-lg font-serif font-bold text-slate-900 mt-6 mb-3 capitalize">{children}</h5>,
                                    h6: ({children}) => <h6 className="text-base font-serif font-bold text-slate-900 mt-6 mb-3 capitalize">{children}</h6>,
                                    strong: ({children}) => <strong className="font-black text-slate-900">{children}</strong>,
                                    blockquote: ({children}) => <blockquote className="border-l-4 border-red-600 pl-6 py-2 my-8 italic text-slate-700 bg-slate-50 rounded-r-xl">{children}</blockquote>,

                                    // Explicit Table Styling
                                    table: ({children}) => <div className="overflow-x-auto my-8 rounded-3xl border border-slate-100 shadow-sm"><table className="w-full text-left border-collapse">{children}</table></div>,
                                    thead: ({children}) => <thead className="bg-slate-50 border-b-2 border-slate-100">{children}</thead>,
                                    tbody: ({children}) => <tbody className="divide-y divide-slate-50">{children}</tbody>,
                                    tr: ({children}) => <tr className="hover:bg-slate-50/50 transition-colors">{children}</tr>,
                                    th: ({children}) => <th className="p-5 text-xs font-black uppercase tracking-widest text-slate-900">{children}</th>,
                                    td: ({children}) => <td className="p-5 text-sm font-medium text-slate-600 leading-relaxed max-w-xs">{children}</td>
                                }}
                            >
                                {article.content}
                            </ReactMarkdown>
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
