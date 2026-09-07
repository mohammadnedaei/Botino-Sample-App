export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  {
    slug: 'mobile-accessories',
    name: 'لوازم جانبی موبایل',
    description: 'بهترین لوازم جانبی برای گوشی‌های هوشمند شما، از کابل‌های شارژ تا کیف‌های محافظ.',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&q=80',
    count: 10,
  },
  {
    slug: 'laptops',
    name: 'لپ‌تاپ و کامپیوتر',
    description: 'انواع لپ‌تاپ، تبلت و تجهیزات کامپیوتری برای کار، بازی و خلاقیت.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    count: 10,
  },
  {
    slug: 'home-appliances',
    name: 'لوازم خانگی',
    description: 'لوازم خانگی برقی و غیربرقی برای آشپزخانه، اتاق خواب و پذیرایی.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    count: 10,
  },
  {
    slug: 'clothing',
    name: 'پوشاک',
    description: 'جدیدترین مد روز در پوشاک مردانه، زنانه و بچگانه از برندهای معتبر.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80',
    count: 10,
  },
  {
    slug: 'books',
    name: 'کتاب و آموزش',
    description: 'کتاب‌های علمی، ادبی، هنری و دوره‌های آموزشی آنلاین و آفلاین.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    count: 10,
  },
  {
    slug: 'sports',
    name: 'ورزش و سلامت',
    description: 'تجهیزات ورزشی، مکمل‌های غذایی و محصولات سلامت و تندرستی.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    count: 10,
  },
  {
    slug: 'home-decor',
    name: 'خانه و دکوراسیون',
    description: 'دکوراسیون داخلی، مبلمان، فرش و وسایل تزیینی برای خانه‌ای زیباتر.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    count: 10,
  },
  {
    slug: 'beauty',
    name: 'آرایشی و بهداشتی',
    description: 'محصولات آرایشی، بهداشتی و مراقبت از پوست و مو از برندهای اورجینال.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80',
    count: 10,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
