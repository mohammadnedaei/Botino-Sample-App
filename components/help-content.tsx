'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'چطور می‌توانم سفارش خود را پیگیری کنم؟',
    answer:
      'پس از ثبت سفارش، کد رهگیری از طریق پیامک برای شما ارسال می‌شود و می‌توانید وضعیت سفارش را از بخش «سفارش‌های من» در پروفایل کاربری خود مشاهده کنید.',
  },
  {
    question: 'سیاست مرجوعی کالا چگونه است؟',
    answer:
      'کالاهای خریداری‌شده تا هفت روز پس از تحویل، در صورت سالم بودن بسته‌بندی و عدم استفاده، قابل مرجوعی و بازگشت وجه هستند.',
  },
  {
    question: 'روش‌های پرداخت موجود کدامند؟',
    answer:
      'پرداخت آنلاین از طریق کارت‌های بانکی عضو شتاب و همچنین پرداخت در محل برای برخی مناطق تهران پشتیبانی می‌شود.',
  },
  {
    question: 'هزینه و زمان ارسال به چه صورت است؟',
    answer:
      'ارسال به سراسر کشور از طریق پست پیشتاز انجام می‌شود و زمان تحویل معمولا بین دو تا پنج روز کاری بسته به شهر مقصد متغیر است.',
  },
  {
    question: 'چگونه می‌توانم با پشتیبانی تماس بگیرم؟',
    answer:
      'می‌توانید از طریق ویجت گفتگوی هوشمند باتینو در پایین صفحه یا از طریق صفحه تماس با ما با تیم پشتیبانی در ارتباط باشید.',
  },
  {
    question: 'آیا امکان تغییر آدرس پس از ثبت سفارش وجود دارد؟',
    answer:
      'تا پیش از خروج سفارش از انبار امکان ویرایش آدرس گیرنده از طریق تماس با پشتیبانی وجود دارد، پس از این مرحله امکان تغییر آدرس میسر نیست.',
  },
];

export function HelpContent() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    return faqs.filter((faq) => faq.question.includes(query) || faq.answer.includes(query));
  }, [query]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-primary-700 hover:underline">
        <ArrowRight className="h-4 w-4" />
        بازگشت به کالایاب
      </Link>

      <h1 className="mb-3 text-3xl font-extrabold text-slate-900">مرکز راهنمایی کالایاب</h1>
      <p className="mb-8 leading-8 text-slate-600">
        این صفحه به‌طور اختصاصی برای استفاده به عنوان آدرس راهنمای باتینو طراحی شده و به همین
        دلیل بدون سربرگ و پاورقی سایت اصلی نمایش داده می‌شود. پاسخ پرسش‌های متداول خود را در
        فهرست زیر جست‌وجو کنید یا از ویجت هوشمند گفتگو استفاده کنید.
      </p>

      <div className="mb-8 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جست‌وجو در سوالات متداول..."
          className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none text-sm font-bold text-slate-800">
              {faq.question}
            </summary>
            <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
          </details>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-500">نتیجه‌ای برای جست‌وجوی شما یافت نشد.</p>
        )}
      </div>
    </div>
  );
}
