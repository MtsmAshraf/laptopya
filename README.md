# Laptopya

A premium laptop and tech retail demo, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn-style primitives (no icons — text and CSS only), Framer Motion, Zustand, React Hook Form + Zod.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/                  Next.js App Router pages
components/
  ui/                 Primitives (Button, Dialog, Sheet, Tabs, Accordion, Slider, Select, Input, Skeleton, Reveal, Badge)
  layout/             Header, Footer, AnnouncementBar, MegaMenu, MobileMenu, ThemeToggle, Breadcrumbs, CookieConsent, FloatingContact
  sections/           Homepage sections
  product/            ProductCard, ProductGallery, VariantSelector, SpecsTable, Reviews, ProductImage
  cart/               CartDrawer
data/                 products.ts, brands.ts, categories.ts, reviews.ts, blog.ts
lib/
  api/                Data access layer (swap mock for real API here)
  utils.ts, config.ts
store/                Zustand stores (cart, wishlist, compare, recently-viewed), persisted to localStorage
types/                TypeScript types
public/images/        Placeholder images (replace with real photography)
```

## Design system

Design tokens are defined as CSS variables in `app/globals.css`. The palette is built around two brand colors:
- Red `#cb0f0e`
- Charcoal `#313131`

Typography uses Space Grotesk (display), Inter Tight (body), and JetBrains Mono (specs/meta).

## Hard rules followed

1. **No icons anywhere.** Every action uses text labels. Navigation, buttons, chips, and links are all typographic.
2. **Fully responsive** from 320px to 2560px+. Fluid typography with `clamp()`, container queries, no horizontal overflow.
3. **Non-generic aesthetic.** Asymmetric editorial grids, hairline borders, restrained red accent, paper grain, deliberate whitespace.
4. **Dark mode** via `next-themes`, toggled in the header with a text label.
5. **Tasteful motion.** Scroll-reveal, staggered entrances, image zoom, underline slides, sticky header shrink. Respects `prefers-reduced-motion`.

## Routes

- `/` Home
- `/shop`, `/shop/[category]`, `/brands/[brand]`
- `/product/[slug]`
- `/cart`, `/checkout`, `/order-tracking`
- `/compare`, `/wishlist`
- `/about`, `/contact`, `/blog`, `/blog/[slug]`
- `/faq`, `/shipping-returns`, `/warranty`, `/privacy`, `/terms`
- `/account`, `/search`, `/trade-in`
- Custom 404 and error pages

## Replacing mock data with a real backend

All data access goes through `lib/api/products.ts` and `lib/api/blog.ts`. These are async functions returning typed data. To swap in a real backend:

1. Replace the body of each function with a `fetch` call to your API.
2. Keep the same return types.
3. Nothing else needs to change.

## Planned path to production

1. Replace mock data with a real API (REST, GraphQL, or CMS like Sanity/Contentful).
2. Add authentication (NextAuth or Clerk).
3. Integrate a real payment provider (Stripe).
4. Add real image hosting (Cloudinary, S3).
5. Add analytics (GA4, Plausible).
6. Add i18n (next-intl) and RTL support (already CSS-logical-property ready).
7. Add E2E tests (Playwright).
8. Deploy (Vercel recommended).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in values.

## Accessibility

- Semantic HTML throughout
- Visible focus states
- Keyboard navigation
- ARIA attributes on interactive components
- Color contrast meets WCAG 2.2 AA
- `prefers-reduced-motion` respected

## RTL and i18n ready

All layout uses logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `inset-inline-start`, etc.). Strings are centralized in components and data files, ready for `next-intl` integration.

## License

Private demo. Not for redistribution.