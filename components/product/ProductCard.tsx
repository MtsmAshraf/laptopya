'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { ProductImage } from './ProductImage';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { brands } from '@/data/brands';
import { useWishlist } from '@/store/wishlist';
import { useCompare } from '@/store/compare';
import { getProductPriceRange } from '@/lib/api/products';

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const wish = useWishlist((s) => s.slugs.includes(p.slug));
  const toggleWish = useWishlist((s) => s.toggle);
  const cmp = useCompare((s) => s.slugs.includes(p.slug));
  const toggleCmp = useCompare((s) => s.toggle);
  const range = getProductPriceRange(p);
  const brand = brands.find((b) => b.slug === p.brand)?.name ?? p.brand;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/product/${p.slug}`}
        className="relative block aspect-[4/3] bg-brand-line/30 overflow-hidden"
      >
        <ProductImage src={p.images[0]} alt={p.name} zoom />
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {p.isNew && <Badge tone="red">New</Badge>}
          {p.isBestSeller && <Badge tone="ink">Best seller</Badge>}
          {p.condition === 'open-box' && <Badge tone="muted">Open box</Badge>}
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-muted">
            {brand}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWish(p.slug)}
              className="text-xs font-mono uppercase tracking-widest link-underline"
              aria-pressed={wish}
            >
              {wish ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={() => toggleCmp(p.slug)}
              className="text-xs font-mono uppercase tracking-widest link-underline"
              aria-pressed={cmp}
            >
              Compare
            </button>
          </div>
        </div>
        <Link href={`/product/${p.slug}`}>
          <h3 className="font-display text-display-sm group-hover:text-brand-red transition-colors">
            {p.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm">
            {formatPrice(range.min)}
            {range.min !== range.max && <span className="text-brand-muted"> – {formatPrice(range.max)}</span>}
          </span>
          {range.compareAtMin && (
            <span className="font-mono text-xs text-brand-muted line-through">
              {formatPrice(range.compareAtMin)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-brand-muted">
          <span>★ {p.rating.toFixed(1)}</span>
          <span>·</span>
          <span>{p.reviewCount} reviews</span>
        </div>
      </div>
    </motion.article>
  );
}