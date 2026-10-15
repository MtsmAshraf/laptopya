'use client';
import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Reveal } from '@/components/ui/Reveal';
import { formatPrice } from '@/lib/utils';

const brandOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'lenovo', label: 'Lenovo' },
  { value: 'dell', label: 'Dell' },
  { value: 'hp', label: 'HP' },
  { value: 'asus', label: 'ASUS' },
  { value: 'other', label: 'Other' },
];
const conditionOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];
const ageOptions = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1–2 years' },
  { value: '2-3', label: '2–3 years' },
  { value: '3+', label: 'Over 3 years' },
];

export default function TradeInPage() {
  const [brand, setBrand] = useState('apple');
  const [condition, setCondition] = useState('good');
  const [age, setAge] = useState('1-2');

  const estimate = (() => {
    const base = brand === 'apple' ? 700 : brand === 'lenovo' ? 400 : 350;
    const condMult = condition === 'excellent' ? 1 : condition === 'good' ? 0.75 : condition === 'fair' ? 0.5 : 0.25;
    const ageMult = age === '0-1' ? 1 : age === '1-2' ? 0.8 : age === '2-3' ? 0.55 : 0.3;
    return Math.round(base * condMult * ageMult);
  })();

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Trade-in' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Trade in your old laptop</h1>
        <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">
          Get an instant quote. We pick up your old laptop when we deliver the new one.
        </p>
      </Reveal>
      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Brand</div>
            <Select value={brand} onChange={setBrand} options={brandOptions} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Condition</div>
            <Select value={condition} onChange={setCondition} options={conditionOptions} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Age</div>
            <Select value={age} onChange={setAge} options={ageOptions} />
          </div>
          <Button>Request pickup</Button>
        </div>
        <aside className="col-span-12 md:col-span-4 md:col-start-9">
          <div className="border border-brand-line p-6 sticky top-28">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Estimated value</div>
            <div className="font-display text-display-lg mt-2">{formatPrice(estimate)}</div>
            <p className="mt-4 text-sm text-brand-muted">
              Final value is confirmed after inspection. You can accept or decline the offer at no cost.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}