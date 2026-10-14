'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/store/cart';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const steps = ['Details', 'Delivery', 'Payment', 'Review'];

const detailsSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(6),
});
const deliverySchema = z.object({
  address: z.string().min(5),
  city: z.string().min(2),
  postal: z.string().min(3),
  country: z.string().min(2),
  method: z.enum(['standard', 'express', 'pickup']),
});
const paymentSchema = z.object({
  cardName: z.string().min(2),
  cardNumber: z.string().min(12),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().min(3),
});

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [step, setStep] = useState(0);

  const detailsForm = useForm<z.infer<typeof detailsSchema>>({ resolver: zodResolver(detailsSchema) });
  const deliveryForm = useForm<z.infer<typeof deliverySchema>>({ resolver: zodResolver(deliverySchema), defaultValues: { method: 'standard' } });
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({ resolver: zodResolver(paymentSchema) });

  const enriched = lines.map((l) => {
    const p = products.find((x) => x.slug === l.slug);
    if (!p) return null;
    const v = p.variants.find((x) => x.id === l.variantId) ?? p.variants[0];
    return { line: l, product: p, variant: v };
  }).filter((x): x is NonNullable<typeof x> => !!x);

  const subtotal = enriched.reduce((a, e) => a + e.variant.price * e.line.qty, 0);
  const shipping = deliveryForm.watch('method') === 'express' ? 29 : deliveryForm.watch('method') === 'pickup' ? 0 : subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const placeOrder = () => {
    clear();
    router.push('/order-tracking?ref=LP-2026-8421');
  };

  if (enriched.length === 0) {
    return (
      <div className="container-page py-20">
        <Breadcrumbs items={[{ label: 'Checkout' }]} />
        <div className="mt-12 text-center py-20 border border-dashed border-brand-line">
          <div className="font-display text-display-lg mb-3">Your cart is empty</div>
          <Button href="/shop">Start shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="font-display text-display-lg mt-6">Checkout</h1>

      <div className="mt-10 flex items-center gap-2 border-b border-brand-line pb-4 overflow-x-auto no-scrollbar">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 flex items-center justify-center text-xs font-mono ${i <= step ? 'bg-brand-ink text-brand-paper' : 'border border-brand-line text-brand-muted'}`}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <span className={`text-sm ${i <= step ? 'text-brand-ink' : 'text-brand-muted'}`}>{s}</span>
            {i < steps.length - 1 && <span className="mx-2 text-brand-line">—</span>}
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          {step === 0 && (
            <form onSubmit={detailsForm.handleSubmit(next)} className="space-y-4 max-w-md">
              <div className="font-display text-display-sm">Contact details</div>
              <Input placeholder="Email" {...detailsForm.register('email')} />
              {detailsForm.formState.errors.email && <div className="text-xs text-brand-red">Valid email required</div>}
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" {...detailsForm.register('firstName')} />
                <Input placeholder="Last name" {...detailsForm.register('lastName')} />
              </div>
              <Input placeholder="Phone" {...detailsForm.register('phone')} />
              <Button type="submit">Continue to delivery</Button>
            </form>
          )}
          {step === 1 && (
            <form onSubmit={deliveryForm.handleSubmit(next)} className="space-y-4 max-w-md">
              <div className="font-display text-display-sm">Delivery</div>
              <Input placeholder="Address" {...deliveryForm.register('address')} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="City" {...deliveryForm.register('city')} />
                <Input placeholder="Postal code" {...deliveryForm.register('postal')} />
              </div>
              <Input placeholder="Country" {...deliveryForm.register('country')} />
              <div className="space-y-2 pt-2">
                {(['standard', 'express', 'pickup'] as const).map((m) => (
                  <label key={m} className="flex items-center gap-3 cursor-pointer border border-brand-line p-3">
                    <input type="radio" value={m} {...deliveryForm.register('method')} className="accent-brand-red" />
                    <span className="flex-1 text-sm capitalize">{m === 'pickup' ? 'Store pickup · Free' : m === 'express' ? 'Express · $29' : 'Standard · Free over $150'}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={prev}>Back</Button>
                <Button type="submit">Continue to payment</Button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={paymentForm.handleSubmit(next)} className="space-y-4 max-w-md">
              <div className="font-display text-display-sm">Payment</div>
              <Input placeholder="Name on card" {...paymentForm.register('cardName')} />
              <Input placeholder="Card number" {...paymentForm.register('cardNumber')} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" {...paymentForm.register('expiry')} />
                <Input placeholder="CVV" {...paymentForm.register('cvv')} />
              </div>
              <div className="text-xs text-brand-muted">This is a demo. No real payment is processed.</div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={prev}>Back</Button>
                <Button type="submit">Review order</Button>
              </div>
            </form>
          )}
          {step === 3 && (
            <div className="space-y-6 max-w-md">
              <div className="font-display text-display-sm">Review your order</div>
              <div className="border border-brand-line p-4 text-sm space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Contact</div>
                <div>{detailsForm.getValues('email')}</div>
                <div>{detailsForm.getValues('firstName')} {detailsForm.getValues('lastName')}</div>
              </div>
              <div className="border border-brand-line p-4 text-sm space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Delivery</div>
                <div>{deliveryForm.getValues('address')}</div>
                <div>{deliveryForm.getValues('city')}, {deliveryForm.getValues('postal')}</div>
                <div className="capitalize">{deliveryForm.getValues('method')}</div>
              </div>
              <div className="border border-brand-line p-4 text-sm space-y-1">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Payment</div>
                <div>Card ending in {paymentForm.getValues('cardNumber').slice(-4)}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={prev}>Back</Button>
                <Button variant="red" onClick={placeOrder}>Place order</Button>
              </div>
            </div>
          )}
        </div>

        <aside className="col-span-12 lg:col-span-5">
          <div className="border border-brand-line p-6 sticky top-28">
            <div className="font-display text-display-sm mb-6">Your order</div>
            <ul className="divide-y divide-brand-line">
              {enriched.map(({ line, product, variant }) => (
                <li key={`${line.slug}-${line.variantId}`} className="py-3 flex items-center gap-3">
                  <div className="relative w-14 h-14 bg-brand-line/30 shrink-0">
                    <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{product.name}</div>
                    <div className="text-xs font-mono text-brand-muted">Qty {line.qty}</div>
                  </div>
                  <div className="font-mono text-sm">{formatPrice(variant.price * line.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-brand-line space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-muted">Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-brand-muted">Shipping</span><span className="font-mono">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between pt-2 border-t border-brand-line">
                <span className="font-display text-display-sm">Total</span>
                <span className="font-mono text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}