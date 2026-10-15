'use client';
import AppLink from '@/components/ui/AppLink';
import Image from 'next/image';
import { useCompare } from '@/store/compare';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatPrice } from '@/lib/utils';

export default function ComparePage() {
  const slugs = useCompare((s) => s.slugs);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);

  if (items.length === 0) {
    return (
      <div className="container-page py-20">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        <div className="mt-12 text-center py-20 border border-dashed border-brand-line">
          <div className="font-display text-display-lg mb-3">No products to compare</div>
          <p className="text-brand-muted mb-8">Add up to 4 products from any product page.</p>
          <Button href="/shop">Browse products</Button>
        </div>
      </div>
    );
  }

  const allSpecKeys = Array.from(new Set(items.flatMap((p) => Object.keys(p.specs))));

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Compare' }]} />
      <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
        <h1 className="font-display text-display-lg">Compare</h1>
        <button onClick={clear} className="text-xs font-mono uppercase tracking-widest link-underline">Clear all</button>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="text-start p-4 w-48" />
              {items.map((p) => (
                <th key={p.slug} className="p-4 text-start align-top w-1/4">
                  <div className="relative aspect-square bg-brand-line/30 mb-4">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="240px" />
                  </div>
                  <AppLink href={`/product/${p.slug}`} className="font-display text-display-sm link-underline">{p.name}</AppLink>
                  <div className="text-xs font-mono text-brand-muted mt-1">{p.brand}</div>
                  <div className="font-mono text-sm mt-2">{formatPrice(Math.min(...p.variants.map((v) => v.price)))}</div>
                  <div className="mt-3 flex gap-2">
                    <Button  size="sm"><AppLink href={`/product/${p.slug}`}>View</AppLink></Button>
                    <Button variant="ghost" size="sm" onClick={() => remove(p.slug)}>Remove</Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-brand-line">
              <td className="p-4 text-xs font-mono uppercase tracking-widest text-brand-muted">Rating</td>
              {items.map((p) => <td key={p.slug} className="p-4 text-sm">★ {p.rating.toFixed(1)} · {p.reviewCount}</td>)}
            </tr>
            {allSpecKeys.map((k) => (
              <tr key={k} className="border-t border-brand-line">
                <td className="p-4 text-xs font-mono uppercase tracking-widest text-brand-muted">{k}</td>
                {items.map((p) => <td key={p.slug} className="p-4 text-sm">{p.specs[k] ?? '—'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}