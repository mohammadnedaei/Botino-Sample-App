import type { Metadata } from 'next';
import Script from 'next/script';
import { Vazirmatn } from 'next/font/google';
import { BotinoInit } from '@/components/botino-init';
import { computeUserHash } from '@/lib/botino-auth';
import './globals.css';

const vazirmatn = Vazirmatn({ subsets: ['arabic'], variable: '--font-vazirmatn' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'کالایاب — فروشگاه اینترنتی نمایشی برای تست باتینو',
    template: '%s | کالایاب',
  },
  description:
    'کالایاب یک فروشگاه اینترنتی نمایشی فارسی با صدها محصول و مقاله واقعی است که برای آزمایش خزنده هوشمند، سیستم ورود محصولات و ویجت گفتگوی باتینو طراحی شده است.',
  openGraph: {
    title: 'کالایاب — فروشگاه اینترنتی نمایشی برای تست باتینو',
    description:
      'فروشگاه اینترنتی نمایشی فارسی با محصولات، دسته‌بندی‌ها و مقالات واقعی برای آزمایش خزنده و ویجت باتینو.',
    url: siteUrl,
    siteName: 'کالایاب',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'کالایاب، فروشگاه اینترنتی نمایشی',
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const demoUserId = 'demo-user-001';
const demoName = 'سارا محمدی';
const demoEmail = 'sara.mohammadi@example.com';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteId = process.env.NEXT_PUBLIC_BOTINO_WEBSITE_ID || '';
  const widgetPublicKey = process.env.NEXT_PUBLIC_BOTINO_WIDGET_PUBLIC_KEY || '';
  const apiUrl = process.env.NEXT_PUBLIC_BOTINO_API_URL || 'https://api.botinoai.ir/api/v1';

  let demoUserHash: string | null = null;
  try {
    demoUserHash = computeUserHash(demoUserId);
  } catch {
    demoUserHash = null;
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'کالایاب',
    url: siteUrl,
    description: 'فروشگاه اینترنتی نمایشی فارسی برای آزمایش خزنده و ویجت باتینو.',
  };

  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <Script id="botino-config" strategy="beforeInteractive">
          {`window.__BOTINO_CFG = ${JSON.stringify({ websiteId, widgetPublicKey })};`}
        </Script>
        <Script src={`${apiUrl}/widget/loader.js`} strategy="afterInteractive" async />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <BotinoInit
          demoUserId={demoUserId}
          demoName={demoName}
          demoEmail={demoEmail}
          demoUserHash={demoUserHash}
        />
      </body>
    </html>
  );
}
