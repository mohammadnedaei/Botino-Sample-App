# کالایاب (Kalayab) — Botino Test App

A standalone, fully-featured Persian (RTL) e-commerce demo site — think a small Digikala clone — built specifically to give [Botino](https://botinoai.ir) users a realistic environment for testing the **AI crawler**, the **products API importer**, and the **chat widget**, including all three identity/authentication methods.

This project shares no code with any other Botino repository. It is self-contained, has its own dependencies, and does not perform any real transactions — every product, review, and blog post is sample data generated to look realistic.

## Table of Contents

- [Prerequisites & Quick Start](#prerequisites--quick-start)
- [Environment Variables](#environment-variables)
- [Widget Embed](#widget-embed)
- [Authentication Methods](#authentication-methods)
- [Client Action Registration](#client-action-registration)
- [Help Page Rewrite](#help-page-rewrite)
- [Testing the Crawler](#testing-the-crawler)
- [Products API Reference](#products-api-reference)
- [HTML Conventions for the Crawler](#html-conventions-for-the-crawler)
- [Project Structure](#project-structure)
- [Credits](#credits)

## Prerequisites & Quick Start

- Node.js 18.18+ (Next.js 15 requirement)
- npm

```bash
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:3000`. Fill in `.env` with your Botino chatbot credentials (see below) to enable the widget and identity endpoints.

Build for production:

```bash
npm run build
npm run start
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BOTINO_WEBSITE_ID` | Yes, for the widget | The chatbot's website ID from the Botino panel. Injected into `window.__BOTINO_CFG`. |
| `NEXT_PUBLIC_BOTINO_WIDGET_PUBLIC_KEY` | Yes, for the widget | The widget's public key from the Botino panel. |
| `NEXT_PUBLIC_BOTINO_API_URL` | Yes | Base URL of the Botino API, e.g. `https://api.botinoai.ir/api/v1`. Used to load `widget/loader.js`. |
| `BOTINO_IDENTITY_SECRET` | Yes, for auth methods 2 & 3 | Server-only shared secret used to compute the HMAC user hash and to sign the JWT identity token. Must match the identity secret configured on your chatbot in the Botino panel. |
| `NEXT_PUBLIC_SITE_URL` | Yes | The full deployed URL of this site, used for `sitemap.xml`, `robots.txt`, and canonical/OG tags. |

All variables are documented in `.env.example`.

## Widget Embed

The widget is embedded once, in `app/layout.tsx`, and is present on every page (including `/help`):

```html
<script>
  window.__BOTINO_CFG = {
    websiteId: "<NEXT_PUBLIC_BOTINO_WEBSITE_ID>",
    widgetPublicKey: "<NEXT_PUBLIC_BOTINO_WIDGET_PUBLIC_KEY>",
  };
</script>
<script src="{NEXT_PUBLIC_BOTINO_API_URL}/widget/loader.js" async></script>
```

A floating **"Botino auth test panel"** button (bottom-left corner on every page) lets you trigger each of the three identification methods live, so you can verify your setup without writing any code — see `components/botino-init.tsx`.

## Authentication Methods

All three identity methods described in the Botino docs are implemented and testable from the floating panel.

### 1. Anonymous

```js
botino('identify', {
  userId: 'guest-' + sessionId,
  contact: { name: 'کاربر مهمان' },
});
```

No server involvement — a random guest ID is generated in the browser.

### 2. HMAC Hash

Computed **server-side** (never in the browser) using `BOTINO_IDENTITY_SECRET`, in `lib/botino-auth.ts`:

```ts
import { createHmac } from 'node:crypto';

const userHash = createHmac('sha256', process.env.BOTINO_IDENTITY_SECRET!)
  .update(userId)
  .digest('hex');
```

`app/layout.tsx` computes this hash for a demo user at render time and passes it as a prop to the client component, which then calls:

```js
botino('identify', { userId, userHash, contact: { name, email } });
```

### 3. JWT Token

`POST /api/auth/botino-token` signs an HS256 JWT server-side (`lib/botino-auth.ts`, using `node:crypto` — no external JWT library) with claims `{ user_id, name, email, iat, exp }` (1 hour expiry), signed with `BOTINO_IDENTITY_SECRET`.

Client-side:

```js
const { token } = await fetch('/api/auth/botino-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user_id, name, email }),
}).then((r) => r.json());

botino('identify', { token });
```

## Client Action Registration

On mount, `components/botino-init.tsx` registers three demo client actions the chatbot can invoke:

```js
botino('register', {
  name: 'get_cart_items',
  handler: () => ({ items: demoCart, count: demoCart.length }),
});

botino('register', {
  name: 'get_user_info',
  handler: () => ({ name, email, userId }),
});

botino('register', {
  name: 'open_help',
  handler: () => { window.location.href = '/help'; },
});
```

Ask the chatbot something like "what's in my cart?" to see `get_cart_items` invoked live.

## Help Page Rewrite

`/help` is a minimal page with **no header, no footer, no site navigation** — it's meant to be set as the chatbot's "Help Page URL" in the Botino panel, so the widget can deep-link users straight into a clean help center.

This is implemented with a route group: `app/(site)/layout.tsx` wraps every page with the header and footer, while `app/help/layout.tsx` sits outside that group and renders only `{children}`, so `/help` never gets the site chrome even though it shares the same root `app/layout.tsx` (which only owns `<html>`/`<head>`/fonts/widget scripts, not the header/footer).

## Testing the Crawler

1. Deploy this site (or run it locally and expose it, e.g. with a tunnel) and set `NEXT_PUBLIC_SITE_URL` to the public URL.
2. Point the Botino crawler at `https://your-domain/sitemap.xml` to test **Sitemap mode**, or at the homepage to test **Crawl mode** (the crawler will discover `/products`, `/blog`, `/category/*`, etc. by following links).
3. `robots.txt` (`app/robots.ts`) allows all crawlers and references the sitemap.
4. `sitemap.xml` (`app/sitemap.ts`) lists every static route plus all 80 product pages, all 80 product review pages, all 10 blog posts, all 10 blog "related" pages, and all 8 category pages — 202 URLs in total.
5. Product pages (`/products/[slug]`) include `<script type="application/ld+json">` with `@type: "Product"`, `name`, `image`, `offers.price`, and `aggregateRating.ratingValue` for structured-data extraction testing.
6. The homepage demonstrates both crawler override classes:
   - `.botino` on an `<aside>` **outside** `<main>`'s primary flow, to force-include a block that would otherwise be skipped.
   - `.botino-ignore` on a block **inside** `<main>`, to force-exclude content (e.g. a promotional banner) that has no real informational value.

## Products API Reference

### `GET /api/products`

Paginated product list matching Botino's auto-detected importer format.

**Query parameters**

| Param | Default | Description |
|---|---|---|
| `page` | `1` | Page number (1-indexed) |
| `pageSize` | `20` | Items per page, max `100` |
| `category` | — | Optional category slug filter (see `lib/categories.ts` for slugs) |

**Response**

```json
{
  "products": [ { "...": "see schema below" } ],
  "total": 80,
  "page": 1,
  "pageSize": 20
}
```

### `GET /api/products/{slug}`

Returns a single product object, or `404` if not found.

### `GET /api/products/README`

Returns this same schema as machine-readable JSON — useful for pointing the Botino importer's "explain the format" step at a live URL.

### Product Fields

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Unique product id |
| `slug` | `string` | Used at `/products/{slug}` |
| `title` / `name` | `string` | Both present for importer field-name compatibility |
| `description` | `string` | Full Persian description |
| `price` | `number` | Base price in IRR |
| `sale_price` | `number \| null` | Discounted price in IRR, `null` if none |
| `currency` | `"IRR"` | |
| `sku` | `string` | |
| `brand` | `string` | |
| `category` | `string` | Category slug |
| `stock` | `number` | |
| `stock_status` | `"in_stock" \| "low_stock" \| "out_of_stock"` | |
| `images` | `string[]` | |
| `thumbnail` | `string` | |
| `rating` | `number` | Out of 5 |
| `reviewCount` | `number` | |
| `specs` | `object` | Key/value technical specification pairs, varies per product |

80 products across 8 categories: mobile accessories, laptops & computers, home appliances, clothing, books, sports & health, home decor, and beauty.

## HTML Conventions for the Crawler

Every crawlable page in this project:

- Has a unique `<title>` and a `≥15`-word `<meta name="description">`.
- Has `og:title`, `og:image`, and a `<link rel="canonical">`.
- Wraps its primary content in `<main>` (product/blog detail pages use `<article>` inside `<main>`).
- Uses a real heading hierarchy (`h1` → `h2` → `h3`), never skipping levels.
- Has body paragraphs of at least 10 words each.
- Has descriptive `alt` text (3+ words) on every content image.
- Never sets `noindex`.

## Project Structure

```
botino-test/
├── app/
│   ├── layout.tsx              # Root layout: fonts, widget embed, JSON-LD
│   ├── (site)/                 # Route group with header + footer
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Homepage
│   │   ├── products/
│   │   ├── category/[slug]/
│   │   ├── blog/
│   │   ├── about/
│   │   └── contact/
│   ├── help/
│   │   ├── layout.tsx          # No header/footer — Botino help URL target
│   │   └── page.tsx
│   ├── api/
│   │   ├── products/
│   │   └── auth/botino-token/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                 # header.tsx, footer.tsx
│   ├── ui/                     # button.tsx, badge.tsx
│   ├── product-card.tsx
│   ├── blog-card.tsx
│   ├── botino-init.tsx         # Widget identify + client actions
│   └── help-content.tsx
├── lib/
│   ├── products.ts              # 80 products
│   ├── blog.ts                  # 10 blog posts
│   ├── categories.ts            # 8 categories
│   ├── reviews.ts                # Deterministic per-product reviews
│   └── botino-auth.ts            # HMAC + HS256 JWT signing
└── .env.example
```

## Credits

Built to test [Botino](https://botinoai.ir) — an AI chatbot platform that crawls your website, imports your product catalog, and answers customer questions through an embeddable widget.

Visit **[botinoai.ir](https://botinoai.ir)** to connect your own store.
