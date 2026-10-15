import AppLink from '@/components/ui/AppLink';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getAllPosts } from '@/lib/api/blog';
import { getTranslations } from 'next-intl/server';

export async function BuyingGuides({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Guides' });
  const posts = await getAllPosts();
  
  return (
    <section className="border-b border-brand-line py-20 md:py-28 bg-brand-ink text-brand-paper">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">{t('tagline')}</div>
              <h2 className="font-display text-display-lg max-w-2xl">{t('title')}</h2>
            </div>
            <AppLink href="/blog" className="btn btn-ghost !border-brand-paper/30 !text-brand-paper hover:!border-brand-paper w-full md:w-auto text-center">{t('viewAll')}</AppLink>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-6">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="col-span-12 md:col-span-4">
              <AppLink href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-brand-paper/10 overflow-hidden">
                  <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/60">{p.category} · {p.readMinutes} min read</div>
                  <h3 className="font-display text-display-sm mt-2 group-hover:text-brand-red transition-colors leading-tight">{p.title}</h3>
                  <p className="text-sm text-brand-paper/70 mt-2 line-clamp-3">{p.excerpt}</p>
                  <div className="mt-4 link-underline text-sm">{t('read')}</div>
                </div>
              </AppLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}