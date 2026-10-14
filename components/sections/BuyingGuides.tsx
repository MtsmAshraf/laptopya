import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getAllPosts } from '@/lib/api/blog';

export async function BuyingGuides() {
  const posts = await getAllPosts();
  return (
    <section className="border-b border-brand-line py-20 md:py-28 bg-brand-ink text-brand-paper">
      <div className="container-page">
        <Reveal>
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
                · Buying guides
              </div>
              <h2 className="font-display text-display-lg max-w-2xl">
                Read before you buy.
              </h2>
            </div>
            <Link href="/blog" className="btn btn-ghost !border-brand-paper/30 !text-brand-paper hover:!border-brand-paper hidden md:inline-flex">
              All guides
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-12 gap-6">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05} className="col-span-12 md:col-span-4">
              <Link href={`/blog/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-brand-paper/10 overflow-hidden">
                  <Image src={p.cover} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/60">
                    {p.category} · {p.readMinutes} min read
                  </div>
                  <h3 className="font-display text-display-sm mt-2 group-hover:text-brand-red transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-brand-paper/70 mt-2">{p.excerpt}</p>
                  <div className="mt-4 link-underline text-sm">Read the guide</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}