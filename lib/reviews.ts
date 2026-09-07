import type { Product } from './products';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

const reviewerNames = [
  'علی رضایی',
  'زهرا کریمی',
  'محمد حسینی',
  'فاطمه احمدی',
  'حسین نوری',
  'مریم صادقی',
  'رضا مرادی',
  'سمیرا قاسمی',
];

const reviewTemplates = [
  {
    title: 'کاملا راضی هستم',
    body: 'کیفیت ساخت محصول از انتظارم بیشتر بود و بسته‌بندی هم بسیار مناسب و بدون آسیب به دستم رسید. حتما دوباره از این فروشگاه خرید می‌کنم.',
  },
  {
    title: 'ارزش خرید داره',
    body: 'با توجه به قیمتی که پرداخت کردم، کیفیت محصول عالی بود و دقیقا همان چیزی بود که در توضیحات محصول نوشته شده بود.',
  },
  {
    title: 'ارسال سریع و بدون مشکل',
    body: 'سفارش من زودتر از موعد اعلام‌شده به دستم رسید و محصول هم دقیقا مطابق تصاویر سایت بود، از تجربه خریدم راضی هستم.',
  },
  {
    title: 'نسبت به مدل قبلی بهتره',
    body: 'قبلا از یک محصول مشابه استفاده می‌کردم و این یکی از نظر کیفیت مواد اولیه و دوام به مراتب بهتر است.',
  },
  {
    title: 'قابل قبول ولی جای بهبود داره',
    body: 'کیفیت کلی خوب بود اما انتظار داشتم رنگ محصول کمی متفاوت‌تر از تصویر باشد، در کل از خرید ناراضی نیستم.',
  },
  {
    title: 'برای هدیه دادن عالیه',
    body: 'این محصول را برای هدیه خریدم و بسته‌بندی شیک آن باعث شد گیرنده هدیه هم بسیار خوشحال شود.',
  },
];

export function generateReviews(product: Product): Review[] {
  const count = 6;
  return Array.from({ length: count }).map((_, i) => {
    const template = reviewTemplates[i % reviewTemplates.length];
    const name = reviewerNames[(i * 3 + product.id.length) % reviewerNames.length];
    const ratingOffset = i % 3 === 0 ? -0.5 : i % 3 === 1 ? 0 : 0.3;
    const rating = Math.min(5, Math.max(2.5, Math.round((product.rating + ratingOffset) * 2) / 2));
    const day = 3 + ((i * 5) % 25);
    return {
      id: `${product.id}-review-${i + 1}`,
      author: name,
      rating,
      date: `2026-0${(i % 6) + 1}-${String(day).padStart(2, '0')}`,
      title: template.title,
      body: template.body,
    };
  });
}
