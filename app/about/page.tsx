import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const timeline = [
  { year: '2018', text: 'Founded in a small downtown storefront with a simple promise: genuine products, honest pricing.' },
  { year: '2020', text: 'Launched our online store and expanded to three physical locations.' },
  { year: '2022', text: 'Became an authorized reseller for every major laptop brand.' },
  { year: '2024', text: 'Opened our service center and launched the trade-in program.' },
  { year: '2026', text: 'Serving over 40,000 customers a year across the country.' },
];

const team = [
  { name: 'Sara Idris', role: 'Founder & CEO' },
  { name: 'Marco Vega', role: 'Head of buying' },
  { name: 'Priya Shah', role: 'Head of support' },
  { name: 'Daniel Kim', role: 'Head of engineering' },
];

export default function AboutPage() {
  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-10">
        <Breadcrumbs items={[{ label: 'About' }]} />
      </div>

      <section className="container-page pb-20">
        <Reveal>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· About Laptopya</div>
              <h1 className="font-display text-display-xl">A store built by people who use the machines they sell.</h1>
              <p className="mt-8 text-body-lg text-brand-muted max-w-2xl">
                We started Laptopya because buying a laptop felt like a chore. Showrooms were impersonal,
                advice was generic, and the machines on the floor were not the ones we would actually buy.
                So we built the store we wanted to shop in.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 relative min-h-[320px]">
              <div className="absolute inset-0 bg-brand-ink" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-brand-line py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· Our numbers</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[['40k+', 'Customers a year'], ['3', 'Store locations'], ['98%', 'Would recommend'], ['4.9★', 'Average rating']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-display-lg">{n}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-2">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-brand-line py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· Timeline</div>
            <h2 className="font-display text-display-lg max-w-2xl">Eight years of building.</h2>
          </Reveal>
          <div className="mt-12 space-y-8 max-w-3xl">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.05}>
                <div className="flex gap-8">
                  <div className="font-display text-display-md w-24 shrink-0">{t.year}</div>
                  <div className="flex-1 border-s border-brand-line ps-8 pb-2">
                    <p className="text-body-lg">{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· Team</div>
            <h2 className="font-display text-display-lg max-w-2xl">The people behind the store.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <div>
                  <div className="aspect-square bg-brand-line/40 mb-4" />
                  <div className="font-display text-display-sm">{m.name}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-1">{m.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line bg-brand-ink text-brand-paper py-20">
        <div className="container-page grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2 className="font-display text-display-lg">Visit us, or say hello.</h2>
              <p className="mt-4 text-body-lg text-brand-paper/70 max-w-xl">
                Three stores, a service center, and a support team that actually answers the phone.
              </p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                <Button variant="red" href="/contact">Contact us</Button>
                <Button variant="ghost" className="!border-brand-paper/30 !text-brand-paper hover:!border-brand-paper" href="/shop">Shop now</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}