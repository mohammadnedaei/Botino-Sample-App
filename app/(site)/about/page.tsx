import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'درباره ما',
  description:
    'کالایاب یک فروشگاه اینترنتی نمایشی است که برای آزمایش خزنده هوشمند، سیستم ورود خودکار محصولات و ویجت گفتگوی باتینو طراحی و راه‌اندازی شده است.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main dir="rtl" className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-3xl font-extrabold text-slate-900">درباره کالایاب</h1>

      <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
          alt="تیم فروشگاه اینترنتی کالایاب در حال بررسی محصولات"
          fill
          sizes="768px"
          className="object-cover"
        />
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold text-slate-900">داستان کالایاب</h2>
        <p className="mb-4 leading-8 text-slate-600">
          کالایاب به عنوان یک فروشگاه اینترنتی کاملا نمایشی طراحی شده است تا محیطی واقعی و کامل
          برای آزمایش قابلیت‌های پلتفرم هوش مصنوعی باتینو فراهم کند. تمام محصولات، مقالات و
          اطلاعات موجود در این سایت صرفا برای اهداف تست و نمایش ساخته شده‌اند و هیچ تراکنش واقعی
          مالی در آن انجام نمی‌شود.
        </p>
        <p className="leading-8 text-slate-600">
          هدف اصلی از ساخت این پروژه، فراهم کردن یک نمونه واقعی برای تیم‌های فنی است تا بتوانند
          پیش از اتصال چت‌بات باتینو به فروشگاه واقعی خود، عملکرد خزنده هوشمند، دقت استخراج
          اطلاعات محصولات و رفتار ویجت گفتگو را به‌طور کامل بسنجند.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-bold text-slate-900">چه چیزی این سایت را متفاوت می‌کند</h2>
        <p className="mb-4 leading-8 text-slate-600">
          برخلاف بسیاری از سایت‌های نمایشی ساده، کالایاب دارای هشتاد محصول واقعی در هشت دسته‌بندی
          مختلف، ده مقاله کامل مجله و صفحات تودرتوی متعدد است تا سناریوهای واقعی خزیدن و پاسخ‌گویی
          هوش مصنوعی به بهترین شکل ممکن آزمایش شوند.
        </p>
        <p className="leading-8 text-slate-600">
          علاوه بر این، این سایت هر سه روش احراز هویت کاربر در ویجت باتینو شامل ورود ناشناس، ورود
          با هش HMAC و ورود با توکن JWT را به صورت زنده و قابل تست پیاده‌سازی کرده است.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-900">تماس با تیم فنی</h2>
        <p className="leading-8 text-slate-600">
          برای اطلاعات بیشتر درباره پلتفرم باتینو و نحوه اتصال چت‌بات هوش مصنوعی به فروشگاه خود
          می‌توانید از وب‌سایت رسمی{' '}
          <a
            href="https://botinoai.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-700 hover:underline"
          >
            botinoai.ir
          </a>{' '}
          دیدن کنید یا از طریق صفحه تماس با ما با تیم پشتیبانی در ارتباط باشید.
        </p>
      </section>
    </main>
  );
}
