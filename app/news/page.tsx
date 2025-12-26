'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { NEWS_DATA } from '../../services/data';
import { NewsArticle } from '../../types';
import LoadingScreen from '../../components/LoadingScreen';
import { useAppContext } from '../../context/AppContext';

const News: React.FC = () => {
  const { news } = useAppContext();
  const [dataNews, setDataNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
        setDataNews(NEWS_DATA);
        setLoading(false);
    }, 800);
  }, []);

  if (loading) return <LoadingScreen />;

  // Combine admin-published news with static data news
  const allNews = [...(news || []), ...dataNews];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif mb-4 lowercase tracking-tight">the world of <span className="text-red-600">birds</span> | chronicle</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Staying updated with the pulse of nature. Our articles cover conservation, scientific discoveries, and field reports from around the globe.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allNews.map((article) => (
          <Link key={article.id} href={`/news/${article.id}`} className="block">
            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group h-full">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={article.imageUrl || `https://picsum.photos/seed/${article.id}/800/450`} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                      {article.author === 'Admin' || !article.id.toString().startsWith('n') ? 'Official' : 'Discovery'}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-slate-400 mb-4 space-x-4">
                  <span className="flex items-center"><i className="far fa-calendar mr-2"></i>{article.date || 'Recently'}</span>
                  <span className="flex items-center font-bold text-red-600/60 uppercase text-[10px] tracking-widest">{article.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-red-600 transition-colors leading-tight">{article.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">{article.summary}</p>
                <div className="text-slate-900 font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Read Article <i className="fas fa-arrow-right ml-2 text-red-600"></i>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
