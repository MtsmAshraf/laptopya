'use client';
import { useState } from 'react';
import AppLink from '@/components/ui/AppLink';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { useTranslations } from 'next-intl';

export function LaptopPicker() {
  const t = useTranslations('LaptopPicker');
  const [step, setStep] = useState(0);
  const [useCase, setUseCase] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);

  const reset = () => { setStep(0); setUseCase(null); setBudget(null); setSize(null); };

  const useCasesList = [
    { id: 'gaming', label: t('useCases.gaming') },
    { id: 'business', label: t('useCases.business') },
    { id: 'student', label: t('useCases.student') },
    { id: 'creator', label: t('useCases.creator') },
  ];
  const budgetsList = [
    { id: 'low', label: t('budgets.low'), min: 0, max: 1200 },
    { id: 'mid', label: t('budgets.mid'), min: 1200, max: 2500 },
    { id: 'high', label: t('budgets.high'), min: 2500, max: 99999 },
  ];
  const sizesList = [
    { id: '13', label: t('sizes.13'), min: 13, max: 14 },
    { id: '15', label: t('sizes.15'), min: 15, max: 16 },
    { id: '17', label: t('sizes.17'), min: 17, max: 20 },
  ];

  const matches = products.filter((p) => {
    if (useCase && p.category !== useCase) return false;
    if (budget) {
      const b = budgetsList.find((x) => x.id === budget)!;
      const price = Math.min(...p.variants.map((v) => v.price));
      if (price < b.min || price > b.max) return false;
    }
    return true;
  }).slice(0, 4);

  return (
    <section className="border-b border-brand-line py-20 md:py-28">
      <div className="container-page">
        <Reveal>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">{t('tagline')}</div>
          <h2 className="font-display text-display-lg max-w-3xl">{t('title')}</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="space-y-8">
              <Step n={1} label={t('step1')} active={step === 0} done={!!useCase} options={useCasesList} value={useCase} onChange={(v) => { setUseCase(v); setStep(1); }} />
              <Step n={2} label={t('step2')} active={step === 1} done={!!budget} options={budgetsList} value={budget} onChange={(v) => { setBudget(v); setStep(2); }} />
              <Step n={3} label={t('step3')} active={step === 2} done={!!size} options={sizesList} value={size} onChange={(v) => { setSize(v); setStep(3); }} />
              {(useCase || budget || size) && (
                <button onClick={reset} className="text-xs font-mono uppercase tracking-widest link-underline">{t('startOver')}</button>
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <AnimatePresence mode="wait">
              {step < 3 ? (
                <motion.div key="waiting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[400px] flex items-center justify-center border border-dashed border-brand-line">
                  <div className="text-center">
                    <div className="font-display text-display-md text-brand-muted">
                      {step === 0 ? t('step1') : step === 1 ? t('step2') : t('step3')}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-2">Step {step + 1} of 3</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-baseline justify-between mb-6">
                    <div className="font-display text-display-sm">
                      {matches.length} {matches.length === 1 ? t('match') : t('matches')}
                    </div>
                    <AppLink href="/shop" className="text-xs font-mono uppercase tracking-widest link-underline">{t('browseAll')}</AppLink>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
                    {matches.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
                  </div>
                  {matches.length === 0 && <div className="py-12 text-center text-brand-muted">{t('noMatches')}</div>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, label, active, done, options, value, onChange }: { n: number; label: string; active: boolean; done: boolean; options: { id: string; label: string }[]; value: string | null; onChange: (v: string) => void }) {
  return (
    <div className={active ? '' : done ? 'opacity-60' : 'opacity-40 pointer-events-none'}>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs text-brand-muted">0{n}</span>
        <span className="font-display text-display-sm">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.id} onClick={() => onChange(o.id)} className={`btn h-11 px-4 text-sm ${value === o.id ? 'btn-primary' : 'btn-ghost'}`}>{o.label}</button>
        ))}
      </div>
    </div>
  );
}