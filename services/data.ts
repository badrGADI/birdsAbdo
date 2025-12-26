
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

export const NEWS_DATA: NewsArticle[] = [
    {
        id: 'n1',
        title: 'Unexpected Migration Patterns Observed',
        summary: 'Experts are puzzled by early migration of several songbird species.',
        content: 'Recent data from bird observatories across North America indicates that several species of warblers and thrushes are migrating weeks earlier than usual. Climate scientists suggest this may be linked to unseasonably warm temperatures in their breeding grounds.',
        author: 'Dr. Evelyn Wing',
        date: 'October 15, 2025',
        imageUrl: '/images/news-andes.jpg'
    },
    {
        id: 'n2',
        title: 'New Sanctuary Opens in the Andes',
        summary: 'A protected area dedicated to the Andean Condor has been established.',
        content: 'The "Vuelo Alto" sanctuary aims to protect the habitat of the majestic Andean Condor. This initiative, a collaboration between local governments and international conservation groups, secures over 50,000 acres of pristine mountain terrain.',
        author: 'Carlos Pluma',
        date: 'November 2, 2025',
        imageUrl: '/images/news-woodpecker.jpg'
    },
    {
        id: 'n3',
        title: 'The Return of the Ivory-billed Woodpecker?',
        summary: 'Unconfirmed sightings spark hope for the "Lord God Bird".',
        content: 'A series of blurry photographs and audio recordings from the deep swamps of Arkansas have reignited the debate about the persistence of the Ivory-billed Woodpecker. Ornithologists are rushing to the site to verify the claims.',
        author: 'Sarah Beaks',
        date: 'December 10, 2025',
        imageUrl: '/images/news-migration.jpg'
    }
];

export const BOOKS_DATA: Book[] = [
  { 
      id: 'b1', 
      title: 'The Sibley Guide to Birds', 
      author: 'David Allen Sibley', 
      price: 45.00, 
      description: 'The definitive guide for bird identification in North America.', 
      imageUrl: '/images/bald-eagle.png' 
  },
  { 
      id: 'b2', 
      title: 'Birds of the World', 
      author: 'Ornithology Press', 
      price: 120.00, 
      description: 'A comprehensive encyclopedic collection of bird species globally.', 
      imageUrl: '/images/waterfowl.png' 
  },
  {
      id: 'b3',
      title: 'The Genius of Birds',
      author: 'Jennifer Ackerman',
      price: 18.99,
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
