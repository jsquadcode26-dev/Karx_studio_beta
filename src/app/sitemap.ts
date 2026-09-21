import type { MetadataRoute } from 'next';
import { NAV_LINKS, SITE } from '@/lib/site-data';

const CHANGE_FREQUENCY: Record<string, 'weekly' | 'monthly'> = {
  '/gallery': 'weekly',
  '/films': 'weekly',
  '/weddings': 'weekly',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return NAV_LINKS.map((link) => ({
    url: new URL(link.href, SITE.url).toString(),
    lastModified,
    changeFrequency: CHANGE_FREQUENCY[link.href] ?? 'monthly',
    priority: link.href === '/' ? 1 : 0.8,
  }));
}
