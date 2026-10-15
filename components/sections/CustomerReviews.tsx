import { Reveal } from '@/components/ui/Reveal';
import { reviews } from '@/data/reviews';
import { products } from '@/data/products';
import { timeAgo } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export async function CustomerReviews({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Reviews' });
  const list = reviews.slice(0, 6);
  
  return (
    <section className="border-b border-brand-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">{t('tagline')}</div>
              <h2 className="font-display text-display-lg max-w-2xl leading-tight">{t('title')}</h2>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-6">
          {list.map((r, i) => {
            const p = products.find((x) => x.slug === r.productSlug);
            return (
              <Reveal key={r.id} delay={i * 0.05} className="col-span-12 md:col-span-6 lg:col-span-4">
                <figure className="border border-brand-line p-6 h-full flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-display-sm">{r.rating.toFixed(1)}★</span>
                    <span className="text-xs font-mono text-brand-muted">{timeAgo(r.date)}</span>
                  </div>
                  <blockquote className="mt-4 text-body-md flex-1 leading-relaxed">"{r.body}"</blockquote>
                  <figcaption className="mt-6 pt-4 border-t border-brand-line">
                    <div className="font-display text-display-sm leading-tight">{r.title}</div>
                    <div className="text-xs font-mono text-brand-muted mt-1">
                      {r.author} · {p?.name ?? 'Laptopya customer'}
                      {r.verified && <span className="ms-2 text-brand-red"> · {t('verified')}</span>}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}