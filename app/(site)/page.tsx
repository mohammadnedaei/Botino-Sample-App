import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { categories } from '@/lib/categories';
import { products } from '@/lib/products';
import { blogPosts } from '@/lib/blog';
import { ProductCard } from '@/components/product-card';
import { BlogCard } from '@/components/blog-card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'کالایاب — فروشگاه اینترنتی نمایشی برای تست باتینو',
  description:
    'در کالایاب می‌توانید صدها محصول واقعی از هشت دسته‌بندی مختلف را مرور کنید و ویجت هوشمند باتینو را با سه روش احراز هویت مختلف آزمایش کنید.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main>
      <section dir="rtl" className="border-b border-slate-200 bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold text-primary-700">
              سایت نمایشی برای تست باتینو
            </span>
            <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              کالایاب، فروشگاهی برای آزمایش خزنده و ویجت هوش مصنوعی باتینو
            </h1>
            <p className="mb-6 text-base leading-8 text-slate-600">
              این فروشگاه با صدها محصول، مقاله و صفحه واقعی طراحی شده تا تیم‌های فنی بتوانند خزنده
              هوشمند، سیستم ورود خودکار محصولات و ویجت گفتگوی باتینو را در یک محیط واقعی و کامل
              آزمایش کنند.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">مشاهده محصولات</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/blog">مطالعه مجله</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80"
              alt="ویترین محصولات فروشگاه اینترنتی کالایاب"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section dir="rtl" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">دسته‌بندی محصولات</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={category.image}
                  alt={`دسته‌بندی محصولات ${category.name}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center text-sm font-semibold text-slate-700">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section dir="rtl" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">محصولات پیشنهادی</h2>
            <Link href="/products" className="text-sm font-medium text-primary-700 hover:underline">
              مشاهده همه
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <aside className="botino mt-10 rounded-2xl border border-dashed border-primary-300 bg-primary-50 p-5 text-sm leading-7 text-primary-800">
            این بخش با کلاس <code>botino</code> علامت‌گذاری شده تا نشان دهد چگونه محتوای مفید
            بیرون از تگ اصلی <code>main</code> نیز می‌تواند به صورت دستی برای خزنده باتینو
            درج شود. برای مثال، کالایاب بیش از هزار سفارش موفق در محیط تست خود پردازش کرده است.
          </aside>
        </div>
      </section>

      <section dir="rtl" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">آخرین مقالات مجله</h2>
          <Link href="/blog" className="text-sm font-medium text-primary-700 hover:underline">
            مشاهده همه
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="botino-ignore mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-5 text-sm leading-7 text-slate-500">
          این بخش با کلاس <code>botino-ignore</code> علامت‌گذاری شده و باید حتی در داخل تگ
          <code> main </code>
          از فرآیند ایندکس‌گذاری خزنده باتینو حذف شود، مشابه بنرهای تبلیغاتی یا اعلان‌های موقتی که
          ارزش محتوایی برای پاسخ‌گویی ندارند.
        </div>
      </section>
    </main>
  );
}
