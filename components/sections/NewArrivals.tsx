import AppLink from '@/components/ui/AppLink';
import { Reveal } from '@/components/ui/Reveal';
import { ProductCard } from '@/components/product/ProductCard';
import { getNewArrivals } from '@/lib/api/products';
import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';

export async function NewArrivals({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'NewArrivals' });
  const items = await getNewArrivals();
  const fallback = products.slice(0, 4);
  const list = items.length ? items : fallback;

  return (
    <section className="border-b border-brand-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· {t('title')}</div>
            </div>
            <AppLink href="/shop?sort=newest" className="btn btn-ghost w-full md:w-auto text-center">{t('viewAll')}</AppLink>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}