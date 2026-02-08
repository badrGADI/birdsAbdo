import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { BIRDS_DATA, BOOKS_DATA, SHIRTS_DATA } from '@/services/data';

const BASE_URL = 'https://www.theworldofbirds.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const routes = [
    '',
    '/about',
    '/explore',
    '/all-types',
    '/news',
    '/books',
    '/shirts',
    '/customizer',
    '/contact',
    '/privacy-policy',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Routes: News
  const { data: news } = await supabase.from('news').select('id');
  const newsRoutes = (news || []).map((item) => ({
    url: `${BASE_URL}/news/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic Routes: Books (Fallback to static if DB empty/fails, though DB is source of truth)
  const { data: books } = await supabase.from('books').select('id');
  const bookRoutes = (books || BOOKS_DATA).map((item) => ({
    url: `${BASE_URL}/book/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Routes: Shirts
  const { data: shirts } = await supabase.from('shirts').select('id');
  const shirtRoutes = (shirts || SHIRTS_DATA).map((item) => ({
    url: `${BASE_URL}/shirt/${item.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic Routes: Birds (Articles)
  // Assuming 'article/[name]' maps to birds. Using name or ID?
  // Use 'article' directory analysis: it was 'article/[name]'.
  const { data: birds } = await supabase.from('birds').select('name');
  const birdRoutes = (birds || BIRDS_DATA).map((item) => ({
    url: `${BASE_URL}/article/${encodeURIComponent(item.name.toLowerCase().replace(/ /g, '-'))}`, // Approximate slug logic
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic Routes: Families
  const families = ['raptors', 'songbirds', 'waterfowl', 'tropical'];
  const familyRoutes = families.map((type) => ({
    url: `${BASE_URL}/family/${type}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...routes,
    ...newsRoutes,
    ...bookRoutes,
    ...shirtRoutes,
    ...birdRoutes,
    ...familyRoutes,
  ];
}
