'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { siteConfig } from '@/lib/config';
import { Reveal } from '@/components/ui/Reveal';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const faqs = [
  { id: '1', title: 'What are your working hours?', content: <p>We are open Monday through Saturday, 09:00 to 20:00. Online support is available 24/7 via email.</p> },
  { id: '2', title: 'Do you offer repairs?', content: <p>Yes. Our service center handles warranty repairs, out-of-warranty repairs, and upgrades. Turnaround is typically 3–5 business days.</p> },
  { id: '3', title: 'Can I return a laptop?', content: <p>Yes. You have 14 days from delivery to return a laptop in its original condition. See our shipping and returns page for details.</p> },
  { id: '4', title: 'Do you ship internationally?', content: <p>We currently ship within the country only. International shipping is planned for 2027.</p> },
];

export default function ContactPage() {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const onSubmit = form.handleSubmit(() => {
    setState('ok');
    form.reset();
  });

  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-10">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <h1 className="font-display text-display-lg mt-6">Contact</h1>
      </div>

      <section className="container-page pb-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Your name" {...form.register('name')} />
                  <Input type="email" placeholder="Email" {...form.register('email')} />
                </div>
                <Input placeholder="Subject" {...form.register('subject')} />
                <Textarea placeholder="Your message" {...form.register('message')} />
                {state === 'ok' && <div className="text-xs font-mono text-brand-red">Message sent. We will reply within one business day.</div>}
                {state === 'err' && <div className="text-xs font-mono text-brand-red">Something went wrong. Please try again.</div>}
                <Button type="submit">Send message</Button>
              </form>
            </Reveal>
          </div>
          <aside className="col-span-12 md:col-span-4 md:col-start-9 space-y-8">
            <Reveal delay={0.1}>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Email</div>
                <div className="font-display text-display-sm">{siteConfig.support.email}</div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Phone</div>
                <div className="font-display text-display-sm">{siteConfig.support.phone}</div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Hours</div>
                <div className="font-display text-display-sm">{siteConfig.support.hours}</div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-brand-line py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· Store locations</div>
            <h2 className="font-display text-display-lg max-w-2xl">Three stores. One standard.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-12 gap-6">
            {siteConfig.branches.map((b, i) => (
              <Reveal key={b.city} delay={i * 0.05} className="col-span-12 md:col-span-4">
                <div className="border border-brand-line">
                  <div className="aspect-[4/3] bg-brand-line/40" />
                  <div className="p-6">
                    <div className="font-display text-display-sm">{b.city}</div>
                    <div className="text-sm text-brand-muted mt-2">{b.address}</div>
                    <div className="text-sm mt-1">{b.phone}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">· Frequently asked</div>
            <h2 className="font-display text-display-lg mb-10">Questions, answered.</h2>
          </Reveal>
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}