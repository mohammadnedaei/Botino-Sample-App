import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { blogPosts } from '@/lib/blog';
import { categories } from '@/lib/categories';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${siteUrl}/help`, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.flatMap((product) => [
    {
      url: `${siteUrl}/products/${product.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/products/${product.slug}/reviews`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.flatMap((post) => [
    {
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/${post.slug}/related`,
      lastModified: post.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]);

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
