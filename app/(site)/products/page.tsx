import type { Metadata } from 'next';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'همه محصولات',
  description:
    'فهرست کامل محصولات فروشگاه کالایاب شامل موبایل، لپ‌تاپ، لوازم خانگی، پوشاک، کتاب، ورزش، دکوراسیون و آرایشی که برای آزمایش خزنده و ویجت باتینو ساخته شده است.',
  alternates: { canonical: '/products' },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-3 text-3xl font-extrabold text-slate-900">همه محصولات کالایاب</h1>
      <p className="mb-8 max-w-3xl text-base leading-8 text-slate-600">
        در این صفحه می‌توانید تمام هشتاد محصول فروشگاه نمایشی کالایاب را در هشت دسته‌بندی مختلف
        مشاهده کنید. این فهرست به‌طور کامل با پاسخ سرویس <code>GET /api/products</code> همگام است
        و برای آزمایش سیستم ورود خودکار محصولات باتینو طراحی شده است.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm',
            !category
              ? 'border-primary-700 bg-primary-700 text-white'
              : 'border-slate-200 text-slate-600 hover:border-primary-300'
          )}
        >
          همه
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm',
              category === c.slug
                ? 'border-primary-700 bg-primary-700 text-white'
                : 'border-slate-200 text-slate-600 hover:border-primary-300'
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
