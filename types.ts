
export interface Bird {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  category?: string; // Added category
  habitat: string;
  description: string;
  imageUrl: string;
  facts: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  gallery?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  price: number;
  description: string;
  synopsis?: string;
  category?: string; // e.g. 'raptors', 'songbirds', 'general'
  imageUrl: string;
  externalUrl?: string;
}

export interface Shirt {
  id: string;
  name: string;
  price: number;
  craftsmanship?: string;
  sizes?: string[];
  imageUrl: string;
  externalUrl?: string;
  category?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'book' | 'shirt' | 'custom';
  selectedSize?: string;
}
