import { Reveal } from '@/components/ui/Reveal';
import { getTranslations } from 'next-intl/server';

export async function WhyUs({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'WhyUs' });
  const items = [
    { n: t('w1n'), l: t('w1l'), d: t('w1d') },
    { n: t('w2n'), l: t('w2l'), d: t('w2d') },
    { n: t('w3n'), l: t('w3l'), d: t('w3d') },
    { n: t('w4n'), l: t('w4l'), d: t('w4d') },
  ];

  return (
    <section className="border-b border-brand-line py-20 md:py-28 bg-brand-paper">
      <div className="container-page">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">{t('tagline')}</div>
          <h2 className="font-display text-display-lg max-w-3xl leading-tight">{t('title')}</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-12 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.l} delay={i * 0.05} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="border-t border-brand-ink pt-6 h-full">
                <div className="font-display text-display-lg">{it.n}</div>
                <div className="font-display text-display-sm mt-4 leading-tight">{it.l}</div>
                <p className="text-sm text-brand-muted mt-2">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}