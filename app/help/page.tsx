import type { Metadata } from 'next';
import { HelpContent } from '@/components/help-content';

export const metadata: Metadata = {
  title: 'مرکز راهنمایی | کالایاب',
  description:
    'مرکز راهنمایی کالایاب شامل پاسخ پرسش‌های متداول درباره سفارش، ارسال، پرداخت و مرجوعی کالا است و به عنوان آدرس صفحه راهنمای ویجت باتینو استفاده می‌شود.',
  alternates: { canonical: '/help' },
};

export default function HelpPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      <HelpContent />
    </main>
  );
}
