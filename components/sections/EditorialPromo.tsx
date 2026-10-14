import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export function EditorialPromo() {
  return (
    <section className="border-b border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page grid grid-cols-12 gap-6 py-20 md:py-28">
        <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-6">
              · Campaign · Fall 2026
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-display-lg">
              The creator
              <br />
              collection.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-body-lg text-brand-paper/70 max-w-md">
              Color-accurate OLED displays. Pro-grade GPUs. Machines built for the
              people who build everything else. Save up to $400 through October 31.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop/creator" className="btn btn-red">
                Shop creator laptops
              </Link>
              <Link href="/blog/creator-laptop-color-accuracy" className="btn btn-ghost !border-brand-paper/30 !text-brand-paper hover:!border-brand-paper">
                Read the guide
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 relative min-h-[320px] md:min-h-[520px]">
          <Reveal delay={0.1}>
            <div className="absolute inset-0 bg-brand-red/20" />
          </Reveal>
          <div className="absolute inset-8 md:inset-12 border border-brand-paper/20 flex items-end justify-between p-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                Featured
              </div>
              <div className="font-display text-display-md mt-2">
                MacBook Pro 16"
              </div>
              <div className="text-sm opacity-80 mt-1">
                M4 Max · From $3,499
              </div>
            </div>
            <div className="text-end">
              <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                Save
              </div>
              <div className="font-display text-display-md mt-2">
                $400
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}