import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('pageSize') || '20', 10) || 20)
  );
  const category = searchParams.get('category');

  const filtered = category ? products.filter((p) => p.category === category) : products;

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    products: paginated,
    total: filtered.length,
    page,
    pageSize,
  });
}
