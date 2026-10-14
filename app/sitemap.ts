import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { posts } from '@/data/blog';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPages = [
    '', '/shop', '/compare', '/wishlist', '/cart', '/checkout',
    '/about', '/contact', '/blog', '/faq', '/shipping-returns',
    '/warranty', '/privacy', '/terms', '/account', '/search', '/trade-in',
  ].map((p) => ({ url: base + p, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7 }));

  const productPages = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}