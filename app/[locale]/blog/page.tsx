import AppLink from '@/components/ui/AppLink';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { getAllPosts } from '@/lib/api/blog';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;
  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-10">
        <Breadcrumbs items={[{ label: 'Buying guides' }]} />
        <h1 className="font-display text-display-lg mt-6">Buying guides</h1>
        <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">
          Read before you buy. Practical, opinionated, and updated for 2026.
        </p>
      </div>

      {featured && (
        <section className="container-page pb-12">
          <Reveal>
            <AppLink href={`/blog/${featured.slug}`} className="group grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-7 relative aspect-[16/10] bg-brand-line/30 overflow-hidden">
                <Image src={featured.cover} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 60vw" />
              </div>
              <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-red">Featured</div>
                <h2 className="font-display text-display-lg mt-3 group-hover:text-brand-red transition-colors">{featured.title}</h2>
                <p className="mt-4 text-body-lg text-brand-muted">{featured.excerpt}</p>
                <div className="mt-6 text-xs font-mono text-brand-muted">{featured.author} · {featured.readMinutes} min read</div>
                <div className="mt-4 link-underline">Read the guide</div>
              </div>
            </AppLink>
          </Reveal>
        </section>
      )}

      <section className="border-t border-brand-line py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <AppLink href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] bg-brand-line/30 overflow-hidden">
                    <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="mt-4">
                    <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">{p.category} · {p.readMinutes} min read</div>
                    <h3 className="font-display text-display-sm mt-2 group-hover:text-brand-red transition-colors">{p.title}</h3>
                    <p className="text-sm text-brand-muted mt-2">{p.excerpt}</p>
                    <div className="mt-4 link-underline text-sm">Read the guide</div>
                  </div>
                </AppLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}