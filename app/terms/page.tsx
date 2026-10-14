// app/terms/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export default function TermsPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Terms' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Terms of service</h1>
        <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">Last updated October 14, 2026.</p>
      </Reveal>
      <div className="mt-10 max-w-3xl space-y-6 text-sm">
        <p>By using Laptopya you agree to these terms. If you do not agree, please do not use the site.</p>
        <p>Prices are listed in USD and include applicable taxes unless otherwise stated. We reserve the right to correct pricing errors.</p>
        <p>All products are subject to availability. We will notify you if an item you ordered is out of stock and offer a full refund.</p>
      </div>
    </div>
  );
}