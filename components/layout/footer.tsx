import Link from 'next/link';
import { categories } from '@/lib/categories';

export function Footer() {
  return (
    <footer dir="rtl" className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-lg font-extrabold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              ک
            </span>
            کالایاب
          </div>
          <p className="text-sm leading-7 text-slate-400">
            کالایاب یک فروشگاه اینترنتی نمایشی است که برای آزمایش خزنده هوشمند، سیستم ورود محصولات و
            ویجت گفتگوی باتینو ساخته شده است و هیچ تراکنش واقعی در آن انجام نمی‌شود.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">دسته‌بندی‌ها</h3>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link href={`/category/${category.slug}`} className="text-slate-400 hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">لینک‌های مفید</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog" className="text-slate-400 hover:text-white">مجله کالایاب</Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-400 hover:text-white">درباره ما</Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white">تماس با ما</Link>
            </li>
            <li>
              <Link href="/help" className="text-slate-400 hover:text-white">مرکز راهنمایی</Link>
            </li>
            <li>
              <Link href="/api/products/README" className="text-slate-400 hover:text-white">
                مستندات API محصولات
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">درباره این پروژه</h3>
          <p className="text-sm leading-7 text-slate-400">
            این سایت به عنوان محیط تست برای{' '}
            <a
              href="https://botinoai.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              باتینو
            </a>{' '}
            ساخته شده است.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} کالایاب — سایت نمایشی ساخته‌شده برای تست{' '}
        <a
          href="https://botinoai.ir"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-400 hover:text-primary-300"
        >
          botinoai.ir
        </a>
      </div>
    </footer>
  );
}
