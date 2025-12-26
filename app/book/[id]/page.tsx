'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';

const BookDetails: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { books, addToCart } = useAppContext();
  const book = books.find(b => b.id === id);

  if (!book) return <div className="p-20 text-center">Book not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Link href="/books" className="text-red-600 font-black text-xs uppercase tracking-widest mb-12 inline-block">
        <i className="fas fa-arrow-left mr-2"></i> Back to Library
      </Link>
      
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100">
          <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
            Sanctuary Press
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-4">{book.title}</h1>
          <p className="text-2xl text-red-600 font-serif italic mb-2">By {book.author}</p>
          <p className="text-sm text-slate-400 font-medium mb-8 uppercase tracking-widest">{book.publisher || "The World of Birds Press"}</p>
          
          <div className="space-y-6 mb-12">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-2">Synopsis</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              {book.synopsis || book.description || "No description provided for this scientific masterpiece."}
            </p>
          </div>
          
          <div className="flex items-center gap-8 border-t pt-12">
            <span className="text-5xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
            <button 
              onClick={() => addToCart({ id: book.id, name: book.title, price: book.price, image: book.imageUrl, type: 'book' })}
              className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95"
            >
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
