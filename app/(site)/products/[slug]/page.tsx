import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import { getCategoryBySlug } from '@/lib/categories';
import { ProductCard } from '@/components/product-card';
import { formatToman } from '@/lib/utils';

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
    title: product.title,
    description: `${product.description.slice(0, 140)}...`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product);
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      price: hasDiscount ? product.sale_price : product.price,
      priceCurrency: 'IRR',
      availability:
        product.stock_status === 'out_of_stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <nav aria-label="مسیر صفحه" className="mb-6 text-sm text-slate-500">
        <Link href="/products" className="hover:text-primary-700">محصولات</Link>
        {category && (
          <>
            {' / '}
            <Link href={`/category/${category.slug}`} className="hover:text-primary-700">
              {category.name}
            </Link>
          </>
        )}
        {' / '}
        <span className="text-slate-700">{product.title}</span>
      </nav>

      <article className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.images[0]}
            alt={`تصویر محصول ${product.title}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <span className="text-sm text-slate-400">{product.brand}</span>
          <h1 className="mb-3 mt-1 text-2xl font-extrabold text-slate-900">{product.title}</h1>

          <div className="mb-4 flex items-center gap-2 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-slate-400">از {product.reviewCount} نظر خریداران</span>
            <Link
              href={`/products/${product.slug}/reviews`}
              className="text-primary-700 hover:underline"
            >
              مشاهده نظرات
            </Link>
          </div>

          <p className="mb-6 leading-8 text-slate-600">{product.description}</p>

          <div className="mb-6 flex items-end gap-3">
            {hasDiscount ? (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatToman(product.price)} تومان
                </span>
                <span className="text-2xl font-extrabold text-primary-700">
                  {formatToman(product.sale_price as number)} تومان
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-primary-700">
                {formatToman(product.price)} تومان
              </span>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 p-4 text-sm">
            <div>
              <dt className="text-slate-400">کد محصول</dt>
              <dd className="font-medium text-slate-700">{product.sku}</dd>
            </div>
            <div>
              <dt className="text-slate-400">موجودی</dt>
              <dd className="font-medium text-slate-700">
                {product.stock_status === 'out_of_stock'
                  ? 'ناموجود'
                  : product.stock_status === 'low_stock'
                    ? `${product.stock} عدد (رو به اتمام)`
                    : `${product.stock} عدد`}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">برند</dt>
              <dd className="font-medium text-slate-700">{product.brand}</dd>
            </div>
            <div>
              <dt className="text-slate-400">دسته‌بندی</dt>
              <dd className="font-medium text-slate-700">{category?.name}</dd>
            </div>
          </dl>

          {Object.keys(product.specs).length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-lg font-bold text-slate-900">مشخصات فنی</h2>
              <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between px-4 py-2.5">
                    <dt className="text-slate-500">{key}</dt>
                    <dd className="font-medium text-slate-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-slate-900">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
