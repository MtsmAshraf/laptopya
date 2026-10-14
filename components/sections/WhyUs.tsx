import { Reveal } from '@/components/ui/Reveal';

const items = [
  { n: '100%', l: 'Genuine products', d: 'Authorized reseller for every brand we carry.' },
  { n: '36 mo', l: 'Warranty', d: 'Extended warranty options on every purchase.' },
  { n: '24h', l: 'Fast dispatch', d: 'Orders placed before 2pm ship the same day.' },
  { n: '4.9★', l: 'After-sales', d: 'Real humans, real expertise, real support.' },
];

export function WhyUs() {
  return (
    <section className="border-b border-brand-line py-20 md:py-28 bg-brand-paper">
      <div className="container-page">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
            · Why Laptopya
          </div>
          <h2 className="font-display text-display-lg max-w-3xl">
            A store that acts like a specialist.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-12 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.l} delay={i * 0.05} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <div className="border-t border-brand-ink pt-6">
                <div className="font-display text-display-lg">{it.n}</div>
                <div className="font-display text-display-sm mt-4">{it.l}</div>
                <p className="text-sm text-brand-muted mt-2">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}