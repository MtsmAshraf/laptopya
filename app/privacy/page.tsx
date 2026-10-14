// app/privacy/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export default function PrivacyPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Privacy' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Privacy policy</h1>
        <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">Last updated October 14, 2026.</p>
      </Reveal>
      <div className="mt-10 max-w-3xl space-y-6 text-sm">
        <p>We collect only the data we need to serve you: your name, email, shipping address, and order history. We do not sell your data. We do not use your data for advertising.</p>
        <p>You can request a copy of your data, or ask us to delete it, at any time by emailing privacy@laptopya.example.</p>
        <p>We use cookies for essential functionality (cart, authentication) and for analytics. You can opt out of analytics at any time via the cookie banner.</p>
      </div>
    </div>
  );
}