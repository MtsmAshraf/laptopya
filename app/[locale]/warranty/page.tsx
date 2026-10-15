// app/warranty/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export default function WarrantyPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Warranty' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Warranty</h1>
      </Reveal>
      <div className="mt-10 max-w-3xl space-y-8 text-sm">
        <p>Every product we sell comes with the manufacturer's warranty. Most laptops carry 12–36 months of coverage.</p>
        <div>
          <h2 className="font-display text-display-sm mb-3">Extended warranty</h2>
          <p>You can add up to 3 years of extended coverage at checkout. Extended warranty covers accidental damage, battery replacement, and priority support.</p>
        </div>
        <div>
          <h2 className="font-display text-display-sm mb-3">Register your warranty</h2>
          <p>Register within 30 days of purchase to activate your extended coverage. You will need your order reference and the product serial number.</p>
        </div>
      </div>
    </div>
  );
}