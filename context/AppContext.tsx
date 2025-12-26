'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Bird, NewsArticle, Book, Shirt, CartItem } from '../types';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, selectedSize?: string) => void;
  clearCart: () => void;
  
  // News
  news: NewsArticle[];
  addNews: (article: NewsArticle) => void;
  updateNews: (article: NewsArticle) => void;
  deleteNews: (id: string) => void;
  
  // Books
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  
  // Shirts
  shirts: Shirt[];
  addShirt: (shirt: Shirt) => void;
  updateShirt: (shirt: Shirt) => void;
  deleteShirt: (id: string) => void;
  
  // Birds
  birds: Bird[];
  addBird: (bird: Bird) => void;
  updateBird: (bird: Bird) => void;
  deleteBird: (id: string) => void;
}

import { supabase } from '../lib/supabase';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [shirts, setShirts] = useState<Shirt[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchData = async () => {
        // News
        const { data: newsData } = await supabase.from('news').select('*').order('date', { ascending: false });
        if (newsData) setNews(newsData.map((item: any) => ({ ...item, imageUrl: item.image_url || item.imageUrl })));
        
        // Books
        const { data: booksData } = await supabase.from('books').select('*');
        if (booksData) setBooks(booksData.map((item: any) => ({ ...item, imageUrl: item.image_url || item.imageUrl })));

        // Shirts
        const { data: shirtsData } = await supabase.from('shirts').select('*');
        if (shirtsData) setShirts(shirtsData.map((item: any) => ({ ...item, imageUrl: item.image_url || item.imageUrl })));

        // Birds
        const { data: birdsData } = await supabase.from('birds').select('*');
        if (birdsData) {
            setBirds(birdsData.map((item: any) => ({
                ...item,
                scientificName: item.scientific_name,
                imageUrl: item.image_url,
                // Keep category as is (already snake_case or standard)
            })));
        }
    };

    fetchData();
  }, []);

  const saveToStore = (key: string, data: any) => localStorage.setItem(`${key}_v1`, JSON.stringify(data));

  // Cart logic
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize);
      if (existing) {
        return prev.map((item) => (item.id === newItem.id && item.selectedSize === newItem.selectedSize) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };
  const removeFromCart = (id: string, selectedSize?: string) => setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === selectedSize)));
  const clearCart = () => setCart([]);

  // News CRUD
  const addNews = (article: NewsArticle) => {
    const updated = [article, ...news];
    setNews(updated);
    saveToStore('world_of_birds_news', updated);
  };
  const updateNews = (article: NewsArticle) => {
    const updated = news.map(n => n.id === article.id ? article : n);
    setNews(updated);
    saveToStore('world_of_birds_news', updated);
  };
  const deleteNews = (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    saveToStore('world_of_birds_news', updated);
  };

  // Books CRUD
  const addBook = (book: Book) => {
    const updated = [...books, book];
    setBooks(updated);
    saveToStore('world_of_birds_books', updated);
  };
  const updateBook = (book: Book) => {
    const updated = books.map(b => b.id === book.id ? book : b);
    setBooks(updated);
    saveToStore('world_of_birds_books', updated);
  };
  const deleteBook = (id: string) => {
    const updated = books.filter(b => b.id !== id);
    setBooks(updated);
    saveToStore('world_of_birds_books', updated);
  };

  // Shirts CRUD
  const addShirt = (shirt: Shirt) => {
    const updated = [...shirts, shirt];
    setShirts(updated);
    saveToStore('world_of_birds_shirts', updated);
  };
  const updateShirt = (shirt: Shirt) => {
    const updated = shirts.map(s => s.id === shirt.id ? shirt : s);
    setShirts(updated);
    saveToStore('world_of_birds_shirts', updated);
  };
  const deleteShirt = (id: string) => {
    const updated = shirts.filter(s => s.id !== id);
    setShirts(updated);
    saveToStore('world_of_birds_shirts', updated);
  };

  // Birds CRUD
  const addBird = (bird: Bird) => {
    const updated = [...birds, bird];
    setBirds(updated);
    saveToStore('world_of_birds_birds', updated);
  };
  const updateBird = (bird: Bird) => {
    const updated = birds.map(b => b.id === bird.id ? bird : b);
    setBirds(updated);
    saveToStore('world_of_birds_birds', updated);
  };
  const deleteBird = (id: string) => {
    const updated = birds.filter(b => b.id !== id);
    setBirds(updated);
    saveToStore('world_of_birds_birds', updated);
  };

  return (
    <AppContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart,
      news, addNews, updateNews, deleteNews,
      books, addBook, updateBook, deleteBook,
      shirts, addShirt, updateShirt, deleteShirt,
      birds, addBird, updateBird, deleteBird
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
