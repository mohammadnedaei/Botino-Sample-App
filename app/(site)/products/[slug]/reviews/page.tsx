import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { getProductBySlug, products } from '@/lib/products';
import { generateReviews } from '@/lib/reviews';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `نظرات خریداران ${product.title}`,
    description: `مجموعه نظرات و امتیازهای ثبت‌شده توسط خریداران واقعی محصول ${product.title} در فروشگاه کالایاب را در این صفحه مطالعه کنید.`,
    alternates: { canonical: `/products/${product.slug}/reviews` },
  };
}

export default async function ProductReviewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = generateReviews(product);

  return (
    <main dir="rtl" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav aria-label="مسیر صفحه" className="mb-6 text-sm text-slate-500">
        <Link href="/products" className="hover:text-primary-700">محصولات</Link>
        {' / '}
        <Link href={`/products/${product.slug}`} className="hover:text-primary-700">
          {product.title}
        </Link>
        {' / '}
        <span className="text-slate-700">نظرات خریداران</span>
      </nav>

      <h1 className="mb-2 text-2xl font-extrabold text-slate-900">
        نظرات خریداران درباره {product.title}
      </h1>
      <p className="mb-8 leading-8 text-slate-600">
        این صفحه به‌طور اختصاصی نظرات ثبت‌شده توسط خریداران محصول {product.title} را نمایش می‌دهد
        و به عنوان یک صفحه تودرتوی نمونه برای آزمایش خزنده باتینو در نظر گرفته شده است. میانگین
        امتیاز این محصول از مجموع {product.reviewCount} نظر برابر با {product.rating} از پنج
        است.
      </p>

      <ul className="flex flex-col gap-5">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-800">{review.author}</span>
              <time dateTime={review.date} className="text-xs text-slate-400">
                {new Intl.DateTimeFormat('fa-IR').format(new Date(review.date))}
              </time>
            </div>
            <div className="mb-2 flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(review.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <h2 className="mb-1 text-sm font-bold text-slate-800">{review.title}</h2>
            <p className="leading-7 text-slate-600">{review.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
