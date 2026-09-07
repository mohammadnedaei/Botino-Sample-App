import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    description:
      'کالایاب Products API — a paginated JSON feed of demo products used to test the Botino product importer.',
    endpoints: {
      list: {
        method: 'GET',
        path: '/api/products',
        query: {
          page: 'Page number, starting at 1. Default: 1',
          pageSize: 'Items per page, max 100. Default: 20',
          category: 'Optional category slug filter',
        },
        response: {
          products: 'array of product objects, see schema below',
          total: 'total number of products matching the filter',
          page: 'current page number',
          pageSize: 'current page size',
        },
      },
      detail: {
        method: 'GET',
        path: '/api/products/{slug}',
        response: 'a single product object, see schema below',
      },
    },
    productSchema: {
      id: 'string — unique product id',
      slug: 'string — URL-friendly identifier, used at /products/{slug}',
      title: 'string — product title (Persian)',
      name: 'string — same as title, included for importer compatibility',
      description: 'string — full product description (Persian)',
      price: 'number — base price in IRR (Iranian Rial)',
      sale_price: 'number | null — discounted price in IRR, null if no discount',
      currency: 'string — always "IRR"',
      sku: 'string — stock keeping unit',
      brand: 'string — brand name',
      category: 'string — category slug',
      stock: 'number — units in stock',
      stock_status: '"in_stock" | "low_stock" | "out_of_stock"',
      images: 'string[] — array of image URLs',
      thumbnail: 'string — thumbnail image URL',
      rating: 'number — average rating out of 5',
      reviewCount: 'number — number of reviews',
      specs: 'object — key/value technical specification pairs, varies per product',
    },
    notes: [
      'All 80 products across 8 categories are served by this API.',
      'This route itself is intentionally excluded from typical crawl targets — it exists for developer reference.',
    ],
  });
}
