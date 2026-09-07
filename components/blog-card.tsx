import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      dir="rtl"
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <Image
          src={post.coverImage}
          alt={`تصویر مقاله ${post.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap gap-2 text-xs text-primary-700">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-primary-50 px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="line-clamp-2 text-base font-bold text-slate-800">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-6 text-slate-500">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-400">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat('fa-IR').format(new Date(post.publishedAt))}
          </time>
        </div>
      </div>
    </Link>
  );
}
