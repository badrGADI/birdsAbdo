
import { Bird, NewsArticle, Book, Shirt } from '../types';
import { supabase } from '../lib/supabase';

export const BIRDS_DATA: Bird[] = [
  { 
    id: 'bi1', 
    name: 'Bald Eagle', 
    scientificName: 'Haliaeetus leucocephalus', 
    family: 'raptors', 
    habitat: 'North America near large bodies of open water', 
    description: 'The national bird of the United States, known for its white head and tail feathers.', 
    imageUrl: '/images/bald-eagle.png', 
    facts: ['Build the largest nests of any North American bird.', 'They can see fish from a mile away.'] 
  },
  { 
    id: 'bi2', 
    name: 'Northern Cardinal', 
    scientificName: 'Cardinalis cardinalis', 
    family: 'songbirds', 
    habitat: 'Woodlands, gardens, shrublands, and wetlands', 
    description: 'A common songbird known for its bright red color and sweet whistle.', 
    imageUrl: '/images/northern-cardinal.png', 
    facts: ['Only few female North American songbirds sing, but the female Northern Cardinal does.'] 
  },
  {
      id: 'bi3',
      name: 'Peregrine Falcon',
      scientificName: 'Falco peregrinus',
      family: 'raptors',
      habitat: 'Wide variety including cities',
      description: 'The fastest animal on earth, capable of diving at speeds over 200 mph.',
      imageUrl: '/images/peregrine-falcon.png',
      facts: ['Found on every continent except Antarctica.', 'They mate for life.']
  },
  {
      id: 'bi4',
      name: 'Scarlet Macaw',
      scientificName: 'Ara macao',
      family: 'tropical',
      habitat: 'Humid evergreen forests',
      description: 'A large red, yellow, and blue South American parrot.',
      imageUrl: '/images/scarlet-macaw.png',
      facts: ['They can live up to 50 years or more.', 'They have powerful beaks that can crack nuts.']
  }
];

export const NEWS_DATA: NewsArticle[] = [];

export const BOOKS_DATA: Book[] = [
  { 
      id: 'b1', 
      title: 'The Sibley Guide to Birds', 
      author: 'David Allen Sibley', 
      price: 45.00, 
      category: 'raptors',
      description: 'The definitive guide for bird identification in North America.', 
      imageUrl: '/images/bald-eagle.png' 
  },
  { 
      id: 'b2', 
      title: 'Birds of the World', 
      author: 'Ornithology Press', 
      price: 120.00, 
      category: 'waterfowl',
      description: 'A comprehensive encyclopedic collection of bird species globally.', 
      imageUrl: '/images/waterfowl.png' 
  },
  {
      id: 'b3',
      title: 'The Genius of Birds',
      author: 'Jennifer Ackerman',
      price: 18.99,
      category: 'songbirds',
      description: 'An exploration of the intelligence of birds and their complex social behaviors.',
      imageUrl: '/images/hummingbird.png'
  }
];

export const SHIRTS_DATA: Shirt[] = [
  { 
      id: 's1', 
      name: 'Northern Cardinal Tee', 
      price: 28.00, 
      imageUrl: '/images/northern-cardinal.png' 
  },
  { 
      id: 's2', 
      name: 'Scarlet Macaw Sweatshirt', 
      price: 45.00, 
      imageUrl: '/images/scarlet-macaw.png' 
  },
  {
      id: 's3',
      name: 'Hawk Eye Hoodie',
      price: 55.00,
      imageUrl: '/images/peregrine-falcon.png'
  }
];
