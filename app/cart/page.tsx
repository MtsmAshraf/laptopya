'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/store/cart';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const removeLine = useCart((s) => s.removeLine);
  const promo = useCart((s) => s.promo);
  const setPromo = useCart((s) => s.setPromo);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const enriched = lines
    .map((l) => {
      const p = products.find((x) => x.slug === l.slug);
      if (!p) return null;
      const v = p.variants.find((x) => x.id === l.variantId) ?? p.variants[0];
      return { line: l, product: p, variant: v };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const subtotal = enriched.reduce((a, e) => a + e.variant.price * e.line.qty, 0);
  const discount = promo === 'CAMPUS26' ? subtotal * 0.1 : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoInput.toUpperCase() === 'CAMPUS26') {
      setPromo('CAMPUS26');
      setPromoError('');
    } else {
      setPromoError('Invalid code');
    }
  };

  if (enriched.length === 0) {
    return (
      <div className="container-page py-20">
        <Breadcrumbs items={[{ label: 'Cart' }]} />
        <div className="mt-12 text-center py-20 border border-dashed border-brand-line">
          <div className="font-display text-display-lg mb-3">Your cart is empty</div>
          <p className="text-brand-muted mb-8">Browse our collection and add something you love.</p>
          <Button href="/shop">Start shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Cart' }]} />
      <h1 className="font-display text-display-lg mt-6">Your cart</h1>
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <ul className="divide-y divide-brand-line border-y border-brand-line">
            {enriched.map(({ line, product, variant }) => (
              <li key={`${line.slug}-${line.variantId}`} className="py-6 grid grid-cols-12 gap-4">
                <div className="col-span-3 md:col-span-2 relative aspect-square bg-brand-line/30">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="160px" />
                </div>
                <div className="col-span-9 md:col-span-10 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">{product.brand}</div>
                      <Link href={`/product/${product.slug}`} className="font-display text-display-sm link-underline">{product.name}</Link>
                      <div className="text-xs font-mono text-brand-muted mt-1">
                        {variant.ram}GB · {variant.storage >= 1000 ? `${variant.storage / 1000}TB` : `${variant.storage}GB`} · SKU {variant.sku}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="font-mono text-sm">{formatPrice(variant.price * line.qty)}</div>
                      <button onClick={() => removeLine(line.slug, line.variantId)} className="text-xs font-mono uppercase tracking-widest link-underline mt-2">Remove</button>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-brand-line">
                      <button onClick={() => setQty(line.slug, line.variantId, line.qty - 1)} className="h-10 w-10 text-sm" aria-label="Decrease">—</button>
                      <span className="w-10 text-center text-sm font-mono">{line.qty}</span>
                      <button onClick={() => setQty(line.slug, line.variantId, line.qty + 1)} className="h-10 w-10 text-sm" aria-label="Increase">+</button>
                    </div>
                    <div className="text-xs text-brand-muted">Ships in {product.deliveryDays[0]}–{product.deliveryDays[1]} days</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 max-w-md">
            <Input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Promo code" />
            <Button variant="ghost" onClick={applyPromo}>Apply</Button>
          </div>
          {promoError && <div className="mt-2 text-xs text-brand-red">{promoError}</div>}
          {promo && <div className="mt-2 text-xs text-brand-red">Code {promo} applied · 10% off</div>}
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="border border-brand-line p-6 sticky top-28">
            <div className="font-display text-display-sm mb-6">Order summary</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-brand-muted">Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-brand-red"><span>Discount</span><span className="font-mono">-{formatPrice(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-brand-muted">Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between pt-4 border-t border-brand-line">
                <span className="font-display text-display-sm">Total</span>
                <span className="font-mono text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <Button href="/checkout" className="w-full mt-6">
              Proceed to checkout
            </Button>
            <div className="mt-4 text-xs text-brand-muted text-center">
              Secure checkout · SSL encrypted
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}