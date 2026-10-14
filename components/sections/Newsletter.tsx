'use client';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return setState('err');
    setState('ok');
    setEmail('');
  };
  return (
    <section className="border-b border-brand-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
                · Newsletter
              </div>
              <h2 className="font-display text-display-lg max-w-2xl">
                Deals, launches, and guides.
                <br />
                <span className="text-brand-muted">Once a month. Never more.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5">
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 border border-brand-line bg-brand-paper px-4 py-3 text-sm placeholder:text-brand-muted focus:border-brand-ink focus:outline-none"
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
              {state === 'ok' && (
                <div className="mt-3 text-xs font-mono text-brand-red">Subscribed. Check your inbox.</div>
              )}
              {state === 'err' && (
                <div className="mt-3 text-xs font-mono text-brand-red">Please enter a valid email.</div>
              )}
              <p className="mt-4 text-xs text-brand-muted">
                By subscribing you agree to our privacy policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}