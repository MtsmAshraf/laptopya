'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/store/cart';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const removeLine = useCart((s) => s.removeLine);

  const enriched = lines
    .map((l) => {
      const p = products.find((x) => x.slug === l.slug);
      if (!p) return null;
      const v = p.variants.find((x) => x.id === l.variantId) ?? p.variants[0];
      return { line: l, product: p, variant: v };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const subtotal = enriched.reduce((a, e) => a + e.variant.price * e.line.qty, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title={`Your cart · ${lines.reduce((a, l) => a + l.qty, 0)}`}
      footer={
        <div className="space-y-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-brand-muted">Subtotal</span>
            <span className="font-mono">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-brand-muted">Shipping</span>
            <span className="font-mono">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-3 border-t border-brand-line">
            <span className="font-display text-display-sm">Total</span>
            <span className="font-mono text-lg">{formatPrice(total)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost"  className="flex-1">
              <Link href="/cart">View cart</Link>
            </Button>
            <Button variant="primary"  className="flex-1">
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      }
    >
      {enriched.length === 0 ? (
        <div className="p-6 text-center">
          <div className="font-display text-display-md mb-2">Your cart is empty</div>
          <p className="text-sm text-brand-muted mb-6">
            Browse our collection and add something you love.
          </p>
          <Button >
            <Link href="/shop">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-brand-line">
          {enriched.map(({ line, product, variant }) => (
            <li key={`${line.slug}-${line.variantId}`} className="p-6 grid grid-cols-12 gap-4">
              <div className="col-span-4 relative aspect-square bg-brand-line/30">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="120px" />
              </div>
              <div className="col-span-8 flex flex-col">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">
                  {product.brand}
                </div>
                <Link href={`/product/${product.slug}`} onClick={onClose} className="font-display text-display-sm link-underline text-start">
                  {product.name}
                </Link>
                <div className="text-xs font-mono text-brand-muted mt-1">
                  {variant.ram}GB · {variant.storage >= 1000 ? `${variant.storage / 1000}TB` : `${variant.storage}GB`}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-brand-line">
                    <button
                      onClick={() => setQty(line.slug, line.variantId, line.qty - 1)}
                      className="h-9 w-9 text-sm"
                      aria-label="Decrease quantity"
                    >
                      —
                    </button>
                    <span className="w-8 text-center text-sm font-mono">{line.qty}</span>
                    <button
                      onClick={() => setQty(line.slug, line.variantId, line.qty + 1)}
                      className="h-9 w-9 text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm">{formatPrice(variant.price * line.qty)}</span>
                    <button
                      onClick={() => removeLine(line.slug, line.variantId)}
                      className="text-xs font-mono uppercase tracking-widest link-underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  );
}