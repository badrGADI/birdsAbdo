'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';

const ShirtDetails: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { shirts, addToCart } = useAppContext();
  const shirt = shirts.find(s => s.id === id);

  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  
  if (!shirt) return <div className="p-20 text-center">Shirt not found</div>;

  const availableSizes = (shirt.sizes && Array.isArray(shirt.sizes) && shirt.sizes.length > 0) ? shirt.sizes : ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Link href="/shirts" className="text-red-600 font-black text-xs uppercase tracking-widest mb-12 inline-block">
        <i className="fas fa-arrow-left mr-2"></i> Back to Shop
      </Link>
      
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 aspect-square">
          <img src={shirt.imageUrl} alt={shirt.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
            Official Merch
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 tracking-tighter uppercase">{shirt.name}</h1>
          
          <div className="space-y-6 mb-12">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 border-b pb-2">Craftsmanship</h3>
            <p className="text-lg text-slate-600 leading-relaxed font-light">
              {shirt.craftsmanship || "This garment features a high-definition print of original bird artwork. Crafted from 100% sustainable organic cotton for maximum comfort and durability."}
            </p>
          </div>

          {!shirt.externalUrl && shirt.id !== 'f0658151-dbca-4c72-a367-482be406d38d' && (
            <div className="grid grid-cols-3 gap-4 mb-12">
                {availableSizes.map(size => (
                <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 border rounded-xl font-bold transition-all uppercase text-xs ${
                        selectedSize === size 
                        ? 'bg-red-600 text-white border-red-600 shadow-lg scale-105' 
                        : 'border-slate-200 hover:border-red-600 hover:text-red-600'
                    }`}
                >
                    Size {size}
                </button>
                ))}
            </div>
          )}
          
          <div className="flex items-center gap-8 border-t pt-12">
            <span className="text-5xl font-bold text-slate-900">${shirt.price.toFixed(2)}</span>
            {shirt.externalUrl || shirt.id === 'f0658151-dbca-4c72-a367-482be406d38d' ? (
                 <a 
                    href={shirt.externalUrl || 'https://teechip.com/eyessharpwingsstrong?name=apparel-classic-tshirt-lifestyle-front-85&retailProductCode=0062262901E4B7-3484F41C30A3-GS2-TC0-WHT'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95 text-center flex items-center justify-center gap-3"
                 >
                    Buy Product <i className="fas fa-external-link-alt"></i>
                 </a>
            ) : (
                <button 
                disabled={!selectedSize}
                onClick={() => selectedSize && addToCart({ id: shirt.id, name: shirt.name, price: shirt.price, image: shirt.imageUrl, type: 'shirt', selectedSize })}
                className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {selectedSize ? 'Add to Basket' : 'Select Size'}
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtDetails;
