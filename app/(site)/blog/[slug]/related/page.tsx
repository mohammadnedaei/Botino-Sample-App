import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog-card';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `مقالات مرتبط با ${post.title}`,
    description: `فهرست مقالات مرتبط با موضوع ${post.title} در مجله کالایاب که به عنوان صفحه تودرتوی نمونه برای آزمایش خزنده باتینو ارائه شده است.`,
    alternates: { canonical: `/blog/${post.slug}/related` },
  };
}

export default async function RelatedPostsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <main dir="rtl" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav aria-label="مسیر صفحه" className="mb-6 text-sm text-slate-500">
        <Link href="/blog" className="hover:text-primary-700">مجله</Link>
        {' / '}
        <Link href={`/blog/${post.slug}`} className="hover:text-primary-700">{post.title}</Link>
        {' / '}
        <span className="text-slate-700">مقالات مرتبط</span>
      </nav>

      <h1 className="mb-3 text-2xl font-extrabold text-slate-900">
        مقالات مرتبط با «{post.title}»
      </h1>
      <p className="mb-8 max-w-3xl leading-8 text-slate-600">
        بر اساس برچسب‌های موضوعی مقاله {post.title} مجموعه‌ای از مقالات مرتبط دیگر مجله کالایاب
        در این صفحه گردآوری شده‌اند تا خواننده بتواند مطالعه خود را در همان حوزه ادامه دهد.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((relatedPost) => (
          <BlogCard key={relatedPost.slug} post={relatedPost} />
        ))}
      </div>
    </main>
  );
}
