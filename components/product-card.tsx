import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Product } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { formatToman } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.sale_price as number)) / product.price) * 100)
    : 0;

  return (
    <Link
      dir="rtl"
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={product.thumbnail}
          alt={`تصویر محصول ${product.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge variant="success" className="absolute right-3 top-3">
            {discountPercent}٪ تخفیف
          </Badge>
        )}
        {product.stock_status === 'out_of_stock' && (
          <Badge variant="muted" className="absolute left-3 top-3">
            ناموجود
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs text-slate-400">{product.brand}</span>
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">{product.title}</h3>

        <div className="flex items-center gap-1 text-xs text-amber-500">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400">({product.reviewCount} نظر)</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-slate-400 line-through">
                  {formatToman(product.price)} تومان
                </span>
                <span className="text-base font-bold text-primary-700">
                  {formatToman(product.sale_price as number)} تومان
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-primary-700">
                {formatToman(product.price)} تومان
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
