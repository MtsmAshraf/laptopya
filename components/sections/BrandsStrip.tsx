import { brands } from '@/data/brands';

export function BrandsStrip() {
  return (
    <section className="border-b border-brand-line py-8 overflow-hidden">
      <div className="container-page">
        <div className="flex items-center gap-12 overflow-x-auto no-scrollbar">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-muted shrink-0">
            Trusted brands
          </div>
          <div className="flex items-center gap-12 shrink-0">
            {brands.map((b) => (
              <a
                key={b.slug}
                href={`/brands/${b.slug}`}
                className="font-display text-display-md text-brand-ink/60 hover:text-brand-red transition-colors whitespace-nowrap"
              >
                {b.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}