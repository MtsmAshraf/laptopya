import AppLink from '@/components/ui/AppLink';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getTranslations } from 'next-intl/server';

export async function CategoryGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Categories' });

  return (
    <section className="border-b border-brand-line py-12 md:py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
                {t('subtitle')}
              </div>
              <h2 className="font-display text-display-lg max-w-2xl">
                {t('title')}
              </h2>
            </div>
            <AppLink href="/shop" className="btn btn-ghost w-full md:w-auto text-center">
              {t('viewAll')}
            </AppLink>
          </div>
        </Reveal>

        {/* Added items-stretch to ensure uniform height if one card grows */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch">
          <Reveal className="col-span-12 md:col-span-8">
            <AppLink href="/shop/gaming" className="group relative block min-h-[280px] md:h-auto md:aspect-[16/10] overflow-hidden h-full">
              <Image src="/images/gaming-laptops.webp" alt="Gaming laptops" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 66vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/70 to-brand-ink/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2 md:mb-3">01 · {t('gaming')}</div>
                <div className="font-display text-lg md:text-display-lg leading-tight">{t('gamingTitle')}</div>
                <div className="text-xs md:text-sm mt-2 md:mt-3 opacity-90 max-w-md line-clamp-2 md:line-clamp-none">{t('gamingDesc')}</div>
                <div className="mt-3 md:mt-6 link-underline text-xs md:text-sm">{t('gamingLink')}</div>
              </div>
            </AppLink>
          </Reveal>

          <Reveal delay={0.05} className="col-span-12 md:col-span-4">
            <AppLink href="/shop/business" className="group relative block min-h-[280px] md:h-auto md:aspect-[4/5] overflow-hidden h-full">
              <Image src="/images/business-laptops.webp" alt="Business laptops" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/95 via-brand-red/70 to-brand-red/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2 md:mb-3">02 · {t('business')}</div>
                <div className="font-display text-lg md:text-display-md leading-tight">{t('businessTitle')}</div>
                <div className="mt-3 md:mt-4 link-underline text-xs md:text-sm">{t('businessLink')}</div>
              </div>
            </AppLink>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 md:col-span-6 lg:col-span-3">
            <AppLink href="/shop/student" className="group relative block min-h-[280px] md:h-auto md:aspect-square border border-brand-line overflow-hidden h-full">
              <Image src="/images/light-laptops.webp" alt="Student laptops" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/95 via-brand-paper/70 to-brand-paper/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-ink">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">03 · {t('student')}</div>
                <div className="font-display text-base md:text-display-sm leading-tight">{t('studentTitle')}</div>
                <div className="mt-3 link-underline text-xs">{t('studentLink')}</div>
              </div>
            </AppLink>
          </Reveal>

          <Reveal delay={0.15} className="col-span-12 md:col-span-6 lg:col-span-3">
            <AppLink href="/shop/creator" className="group relative block min-h-[280px] md:h-auto md:aspect-square overflow-hidden h-full">
              <Image src="/images/creator-laptops.webp" alt="Creator laptops" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/70 to-brand-charcoal/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2">04 · {t('creator')}</div>
                <div className="font-display text-base md:text-display-sm leading-tight">{t('creatorTitle')}</div>
                <div className="mt-3 link-underline text-xs">{t('creatorLink')}</div>
              </div>
            </AppLink>
          </Reveal>

          <Reveal delay={0.2} className="col-span-12 md:col-span-6 lg:col-span-3">
            <AppLink href="/shop/workstation" className="group relative block min-h-[280px] md:h-auto md:aspect-square border border-brand-line overflow-hidden h-full">
              <Image src="/images/Workstation-Laptops.webp" alt="Workstation laptops" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/95 via-brand-paper/70 to-brand-paper/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-ink">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">05 · {t('workstation')}</div>
                <div className="font-display text-base md:text-display-sm leading-tight">{t('workstationTitle')}</div>
                <div className="mt-3 link-underline text-xs">{t('workstationLink')}</div>
              </div>
            </AppLink>
          </Reveal>

          <Reveal delay={0.25} className="col-span-12 md:col-span-6 lg:col-span-3">
            <AppLink href="/shop/accessories" className="group relative block min-h-[280px] md:h-auto md:aspect-square overflow-hidden h-full">
              <Image src="/images/accessories.webp" alt="Tech accessories" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/95 via-brand-red/70 to-brand-red/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2">06 · {t('accessories')}</div>
                <div className="font-display text-base md:text-display-sm leading-tight">{t('accessoriesTitle')}</div>
                <div className="mt-3 link-underline text-xs">{t('accessoriesLink')}</div>
              </div>
            </AppLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}