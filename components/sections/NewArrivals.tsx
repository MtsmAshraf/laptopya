import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from '@/components/product/ProductCard';
import { getNewArrivals } from '@/lib/api/products';

export async function NewArrivals() {
  const items = await getNewArrivals();
  const fallback = (await import('@/data/products')).products.slice(0, 4);
  const list = items.length ? items : fallback;

  return (
    <section className="border-b border-brand-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
                · New arrivals
              </div>
              <h2 className="font-display text-display-lg max-w-2xl">
                Just landed.
              </h2>
            </div>
            <Link href="/shop?sort=newest" className="btn btn-ghost hidden md:inline-flex">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {list.map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}