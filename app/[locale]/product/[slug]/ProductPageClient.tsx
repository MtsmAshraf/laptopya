'use client';
import { useState } from 'react';
import AppLink from '@/components/ui/AppLink';
import type { Product, ProductVariant, Review } from '@/types';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { Tabs } from '@/components/ui/Tabs';
import { SpecsTable } from '@/components/product/SpecsTable';
import { Reviews } from '@/components/product/Reviews';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { useCompare } from '@/store/compare';
import { useRecentlyViewed } from '@/store/recently-viewed';
import { Reveal } from '@/components/ui/Reveal';
import { useEffect } from 'react';

export function ProductPageClient({
  product,
  brand,
  related,
  reviews,
}: {
  product: Product;
  brand: string;
  related: Product[];
  reviews: Review[];
}) {
  const [variant, setVariant] = useState<ProductVariant>(product.variants[0]);
  const [qty, setQty] = useState(1);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const addLine = useCart((s) => s.addLine);
  const wish = useWishlist((s) => s.slugs.includes(product.slug));
  const toggleWish = useWishlist((s) => s.toggle);
  const cmp = useCompare((s) => s.slugs.includes(product.slug));
  const toggleCmp = useCompare((s) => s.toggle);
  const pushRecent = useRecentlyViewed((s) => s.push);

  useEffect(() => {
    pushRecent(product.slug);
  }, [product.slug, pushRecent]);

  const outOfStock = variant.stock === 0;

  return (
    <div className="container-page pb-20">
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        <div className="col-span-12 lg:col-span-7">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-3">
              <Badge tone="muted">{brand}</Badge>
              {product.isNew && <Badge tone="red">New</Badge>}
              {product.isBestSeller && <Badge tone="ink">Best seller</Badge>}
              {product.condition === 'open-box' && <Badge tone="muted">Open box</Badge>}
            </div>
            <h1 className="font-display text-display-lg">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-xs font-mono text-brand-muted">
              <span>★ {product.rating.toFixed(1)}</span>
              <span>·</span>
              <span>{product.reviewCount} reviews</span>
              <span>·</span>
              <span>SKU {variant.sku}</span>
            </div>

            <p className="mt-6 text-body-lg text-brand-muted">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm">
                  <span className="text-brand-red font-mono">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-brand-line pt-8">
              <VariantSelector variants={product.variants} onChange={setVariant} />
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex items-center border border-brand-line">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-sm" aria-label="Decrease">—</button>
                <span className="w-10 text-center text-sm font-mono">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="h-11 w-11 text-sm" aria-label="Increase">+</button>
              </div>
              <Button
                variant="primary"
                className="flex-1"
                disabled={outOfStock}
                onClick={() => addLine(product.slug, variant.id, qty)}
              >
                {outOfStock ? 'Out of stock' : 'Add to cart'}
              </Button>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <button onClick={() => toggleWish(product.slug)} className="text-xs font-mono uppercase tracking-widest link-underline">
                {wish ? 'Remove from wishlist' : 'Add to wishlist'}
              </button>
              <button onClick={() => toggleCmp(product.slug)} className="text-xs font-mono uppercase tracking-widest link-underline">
                {cmp ? 'Remove from compare' : 'Add to compare'}
              </button>
            </div>

            <div className="mt-8 border-t border-brand-line pt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Stock</div>
                <div className="mt-1">
                  {outOfStock ? (
                    <button onClick={() => setNotifyOpen(true)} className="link-underline text-brand-red">Notify me</button>
                  ) : (
                    <span>In stock · {variant.stock} available</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Delivery</div>
                <div className="mt-1">{product.deliveryDays[0]}–{product.deliveryDays[1]} business days</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Warranty</div>
                <div className="mt-1">{product.warrantyMonths} months</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Pickup</div>
                <div className="mt-1">Available at 3 stores</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Tabs
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <div className="max-w-3xl">
                  <p className="text-body-lg">{product.description}</p>
                  <h3 className="font-display text-display-sm mt-10 mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm">
                        <span className="text-brand-red font-mono">—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: 'specs',
              label: 'Full specs',
              content: <SpecsTable specs={product.specs} />,
            },
            {
              id: 'reviews',
              label: `Reviews (${product.reviewCount})`,
              content: <Reviews reviews={reviews} rating={product.rating} reviewCount={product.reviewCount} />,
            },
            {
              id: 'qa',
              label: 'Q&A',
              content: (
                <div className="max-w-3xl">
                  <p className="text-brand-muted">Have a question? Our specialists answer within one business day.</p>
                  <form className="mt-6 space-y-3 max-w-md">
                    <input type="text" placeholder="Your name" className="w-full border border-brand-line bg-brand-paper px-3 py-2.5 text-sm" />
                    <input type="email" placeholder="Your email" className="w-full border border-brand-line bg-brand-paper px-3 py-2.5 text-sm" />
                    <textarea placeholder="Your question" className="w-full border border-brand-line bg-brand-paper px-3 py-2.5 text-sm min-h-28 resize-y" />
                    <Button type="submit">Submit question</Button>
                  </form>
                </div>
              ),
            },
          ]}
        />
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-display-md">Related products</h2>
              <AppLink href={`/shop/${product.category}`} className="text-xs font-mono uppercase tracking-widest link-underline">
                View all
              </AppLink>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile sticky buy bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-brand-line bg-brand-paper p-3 flex items-center gap-2">
        <div className="flex-1">
          <div className="font-mono text-sm">{variant.price}</div>
          <div className="text-xs text-brand-muted">{product.name}</div>
        </div>
        <Button variant="primary" disabled={outOfStock} onClick={() => addLine(product.slug, variant.id, 1)}>
          {outOfStock ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}