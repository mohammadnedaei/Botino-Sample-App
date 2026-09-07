import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav aria-label="مسیر صفحه" className="mb-6 text-sm text-slate-500">
        <Link href="/blog" className="hover:text-primary-700">مجله</Link>
        {' / '}
        <span className="text-slate-700">{post.title}</span>
      </nav>

      <article>
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-primary-700">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-2.5 py-1">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900">{post.title}</h1>

        <div className="mb-6 flex items-center gap-3 text-sm text-slate-400">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat('fa-IR').format(new Date(post.publishedAt))}
          </time>
        </div>

        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={post.coverImage}
            alt={`تصویر مقاله ${post.title}`}
            fill
            sizes="768px"
            className="object-cover"
            priority
          />
        </div>

        {post.sections.map((section) => (
          <section key={section.heading} className="mb-8">
            <h2 className="mb-3 text-xl font-bold text-slate-900">{section.heading}</h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-4 leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <Link
          href={`/blog/${post.slug}/related`}
          className="inline-block rounded-lg border border-primary-200 bg-primary-50 px-5 py-2.5 text-sm font-medium text-primary-700 hover:bg-primary-100"
        >
          مشاهده مقالات مرتبط
        </Link>
      </article>
    </main>
  );
}
