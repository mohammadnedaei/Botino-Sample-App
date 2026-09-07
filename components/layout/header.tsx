'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { categories } from '@/lib/categories';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/products', label: 'محصولات' },
  { href: '/blog', label: 'مجله' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header dir="rtl" className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-primary-700">
          کالایاب
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/products"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-700"
            aria-label="جستجوی محصولات"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-primary-300 hover:text-primary-700"
            aria-label="مشاهده سبد خرید"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          aria-label="باز و بسته کردن منو"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="hidden border-t border-slate-100 bg-slate-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-2 text-sm sm:px-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="whitespace-nowrap text-slate-500 transition-colors hover:text-primary-700"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'border-t border-slate-100 bg-white md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t border-slate-100" />
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
