import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/product-card';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `${category.description} تمامی محصولات دسته‌بندی ${category.name} در فروشگاه نمایشی کالایاب را در این صفحه مشاهده کنید.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);
  const otherCategories = categories.filter((c) => c.slug !== category.slug);

  return (
    <main dir="rtl" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
        <div className="relative h-40 w-full overflow-hidden rounded-xl sm:w-64">
          <Image
            src={category.image}
            alt={`تصویر دسته‌بندی ${category.name}`}
            fill
            sizes="256px"
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="mb-2 text-2xl font-extrabold text-slate-900">{category.name}</h1>
          <p className="leading-8 text-slate-600">{category.description}</p>
        </div>
      </div>

      <h2 className="mb-5 text-xl font-bold text-slate-900">
        محصولات دسته {category.name} ({categoryProducts.length} کالا)
      </h2>
      <div className="mb-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section>
        <h2 className="mb-5 text-xl font-bold text-slate-900">سایر دسته‌بندی‌ها</h2>
        <nav className="flex flex-wrap gap-2" aria-label="دسته‌بندی‌های دیگر">
          {otherCategories.map((c) => (
            <a
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 hover:border-primary-300 hover:text-primary-700"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
