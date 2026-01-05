'use client';

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Books: React.FC = () => {
  const { books, addToCart } = useAppContext();
  const [activeCategory, setActiveCategory] = React.useState('all');

  const categories = [
    { id: 'all', label: 'All Collection' },
    { id: 'raptors', label: 'Raptors' },
    { id: 'songbirds', label: 'Songbirds' },
    { id: 'waterfowl', label: 'Waterfowl' },
    { id: 'tropical', label: 'Tropical' },
  ];

  const filteredBooks = activeCategory === 'all' 
    ? books 
    : books.filter(book => book.category?.toLowerCase() === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-5xl font-serif mb-4 uppercase tracking-tight">The Library</h1>
          <p className="text-slate-600">Curated publications for every level of ornithological expertise.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeCategory === cat.id
                ? 'bg-red-600 text-white shadow-lg scale-105'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-red-600 hover:text-red-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div key={book.id} className="group">
            <Link href={`/book/${book.id}`} className="block aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-6 relative shadow-md">
              <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-red-600/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-6 py-2 bg-white text-red-600 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                  View Details
                </span>
              </div>
            </Link>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors leading-snug">{book.title}</h3>
            <p className="text-sm text-slate-500 mb-2">{book.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-red-700 font-bold text-lg">${book.price.toFixed(2)}</span>
              {book.externalUrl ? (
                   <a 
                      href={book.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800 font-bold text-sm uppercase tracking-widest flex items-center gap-2"
                   >
                      Buy <i className="fas fa-external-link-alt text-xs"></i>
                   </a>
              ) : (
                  <button 
                    onClick={() => addToCart({ id: book.id, name: book.title, price: book.price, image: book.imageUrl, type: 'book' })}
                    className="text-red-600 hover:text-red-800 font-bold text-sm uppercase tracking-widest"
                  >
                    Add to Cart
                  </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
