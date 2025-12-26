'use client';

import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useAppContext();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <i className="fas fa-shopping-basket text-6xl text-slate-200 mb-6 animate-float"></i>
        <h2 className="text-3xl font-serif mb-4 text-slate-900">Your basket is empty</h2>
        <p className="text-slate-600 mb-8">Ready to fill it with some treasures from the world of birds?</p>
        <Link href="/explore" className="px-8 py-3 bg-red-600 text-white rounded-full font-bold shadow-lg hover:bg-red-700 transition-all">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif mb-12 uppercase tracking-tight">Checkout</h1>
      
      <div className="space-y-6 mb-12">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group hover:border-red-100 transition-all">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-bold text-lg group-hover:text-red-600 transition-colors">{item.name}</h3>
              <p className="text-xs text-slate-400 capitalize tracking-widest">{item.type}</p>
              <p className="text-red-700 font-bold mt-1">${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="text-slate-300 hover:text-red-500 transition-colors text-xl p-4"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg text-slate-600 uppercase font-bold tracking-widest">Order Total:</span>
          <span className="text-4xl font-serif font-bold text-red-600">${total.toFixed(2)}</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={clearCart}
            className="py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors uppercase text-sm tracking-widest"
          >
            Reset Cart
          </button>
          <button 
            onClick={() => alert("Simulation Complete! Your items are flying to your doorstep.")}
            className="py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-95 uppercase text-sm tracking-widest"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
