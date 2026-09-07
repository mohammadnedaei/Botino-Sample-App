import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'تماس با ما',
  description:
    'راه‌های ارتباطی با تیم فروشگاه نمایشی کالایاب شامل آدرس، شماره تماس و ایمیل پشتیبانی برای پرسش‌های مرتبط با آزمایش خزنده و ویجت باتینو در این صفحه آمده است.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-3xl font-extrabold text-slate-900">تماس با ما</h1>
      <p className="mb-10 leading-8 text-slate-600">
        از آنجا که کالایاب یک فروشگاه نمایشی برای آزمایش قابلیت‌های باتینو است، اطلاعات تماس زیر
        صرفا جنبه نمادین دارند و برای بررسی عملکرد استخراج اطلاعات تماس توسط خزنده هوشمند در نظر
        گرفته شده‌اند.
      </p>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <Phone className="mx-auto mb-3 h-6 w-6 text-primary-700" />
          <h2 className="mb-1 text-sm font-bold text-slate-800">تلفن پشتیبانی</h2>
          <p className="text-sm text-slate-500" dir="ltr">021-91234567</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <Mail className="mx-auto mb-3 h-6 w-6 text-primary-700" />
          <h2 className="mb-1 text-sm font-bold text-slate-800">ایمیل</h2>
          <p className="text-sm text-slate-500" dir="ltr">support@kalatest.example</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
          <MapPin className="mx-auto mb-3 h-6 w-6 text-primary-700" />
          <h2 className="mb-1 text-sm font-bold text-slate-800">آدرس</h2>
          <p className="text-sm text-slate-500">تهران، خیابان نمایشی، پلاک صفر</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold text-slate-900">پشتیبانی از طریق ویجت باتینو</h2>
        <p className="leading-8 text-slate-600">
          برای تجربه واقعی از نحوه پاسخ‌گویی هوشمند به سوالات مشتریان، می‌توانید از دکمه گفتگوی
          باتینو در گوشه صفحه استفاده کنید یا برای مشاهده مرکز راهنمایی اختصاصی به صفحه{' '}
          <a href="/help" className="text-primary-700 hover:underline">راهنما</a> مراجعه کنید.
        </p>
      </section>
    </main>
  );
}
