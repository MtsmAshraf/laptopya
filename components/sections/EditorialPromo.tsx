import AppLink from '@/components/ui/AppLink';
import { Reveal } from '@/components/ui/Reveal';
import { getTranslations } from 'next-intl/server';

export async function EditorialPromo({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Editorial' });
  return (
    <section className="border-b border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page grid grid-cols-12 gap-6 py-20 md:py-28">
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-6">{t('tagline')}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-display-lg leading-tight">{t('title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-body-lg text-brand-paper/70 max-w-md">{t('desc')}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <AppLink href="/shop/creator" className="btn btn-red">{t('shopBtn')}</AppLink>
              <AppLink href="/blog/creator-laptop-color-accuracy" className="btn btn-ghost !border-brand-paper/30 !text-brand-paper hover:!border-brand-paper">{t('guideBtn')}</AppLink>
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 relative min-h-[320px] md:min-h-[520px]">
          <Reveal delay={0.1}><div className="absolute inset-0 bg-brand-red/20" /></Reveal>
          <div className="absolute inset-8 md:inset-12 border border-brand-paper/20 flex items-end justify-between p-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">{t('featured')}</div>
              <div className="font-display text-display-md mt-2">MacBook Pro 16"</div>
              <div className="text-sm opacity-80 mt-1">M4 Max · From $3,499</div>
            </div>
            <div className="text-end">
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">{t('save')}</div>
              <div className="font-display text-display-md mt-2">$400</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}