import Image from 'next/image';
import AppLink from '@/components/ui/AppLink';
import { Reveal } from '@/components/ui/Reveal';
import { getTranslations } from 'next-intl/server';

export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Hero' });

  return (
    <section className="relative border-b border-brand-line overflow-hidden">
      <div className="container-page grid grid-cols-12 gap-6 py-12 md:py-20 lg:py-28">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center relative z-10">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-6">
              {t('tagline')}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-display-xl">
              {t('titleLine1')}
              <br />
              {t('titleLine2')}
              <br />
              <span className="italic text-brand-red">{t('titleLine3')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-body-lg text-brand-muted max-w-xl">
              {t('description')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <AppLink href="/product/asus-rog-strix-g16-2025" className="btn btn-primary">
                {t('shopNow')}
              </AppLink>
              <AppLink href="/shop/gaming" className="btn btn-ghost">
                {t('browseGaming')}
              </AppLink>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                ['240Hz', 'OLED refresh'],
                ['i9-14900HX', '24 cores'],
                ['RTX 4080', '12GB GDDR6'],
                ['$2,499', 'From'],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-display text-display-sm">{a}</dt>
                  <dd className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-1">
                    {b}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-5 relative h-[320px] md:h-[450px] lg:h-[600px]">
          <Reveal delay={0.1} className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full bg-brand-ink overflow-hidden">
              <Image
                src="/images/hero-laptop.webp"
                alt="ROG Strix G16 laptop"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/30 to-transparent" />
            </div>
          </Reveal>
          
          <div className="absolute bottom-6 start-6 end-6 flex items-end justify-between text-brand-paper z-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest opacity-80">
                {t('inStock')}
              </div>
              <div className="font-display text-display-md mt-1">
                {t('priceFrom')} $2,499
              </div>
            </div>
            <div className="text-end">
              <div className="text-xs font-mono uppercase tracking-widest opacity-80">
                {t('modelLabel')}
              </div>
              <div className="font-mono text-sm mt-1">G614JIR</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}