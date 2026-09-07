import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog-card';

export const metadata: Metadata = {
  title: 'مجله کالایاب',
  description:
    'مجموعه‌ای از مقالات آموزشی و راهنمای خرید درباره تکنولوژی، لوازم خانگی، پوشاک، سلامت و دکوراسیون داخلی که برای آزمایش خزنده محتوایی باتینو منتشر شده است.',
  alternates: { canonical: '/blog' },
};

export default function BlogListPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-3 text-3xl font-extrabold text-slate-900">مجله کالایاب</h1>
      <p className="mb-10 max-w-3xl text-base leading-8 text-slate-600">
        در مجله کالایاب مقالاتی با محتوای واقعی و کامل درباره خرید هوشمندانه، مراقبت از پوست،
        دکوراسیون داخلی و تکنولوژی روز منتشر می‌شود که به عنوان محتوای نمونه برای آزمایش خزنده
        باتینو در نظر گرفته شده‌اند.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
