'use client';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { useTranslations } from 'next-intl';

export function Newsletter() {
  const t = useTranslations('Newsletter');
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
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">{t('tagline')}</div>
              <h2 className="font-display text-display-lg max-w-2xl">
                {t('title')}
                <br />
                <span className="text-brand-muted">{t('subtitle')}</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5">
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 border border-brand-line bg-brand-paper px-4 py-3 text-sm placeholder:text-brand-muted focus:border-brand-ink focus:outline-none"
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary">{t('btn')}</button>
              </form>
              {state === 'ok' && <div className="mt-3 text-xs font-mono text-brand-red">{t('success')}</div>}
              {state === 'err' && <div className="mt-3 text-xs font-mono text-brand-red">{t('error')}</div>}
              <p className="mt-4 text-xs text-brand-muted">{t('privacy')}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}