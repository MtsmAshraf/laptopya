// app/shipping-returns/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

export default function ShippingReturnsPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Shipping & returns' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Shipping & returns</h1>
      </Reveal>
      <div className="mt-10 grid grid-cols-12 gap-8 max-w-5xl">
        <div className="col-span-12 md:col-span-6">
          <h2 className="font-display text-display-sm mb-4">Shipping</h2>
          <ul className="space-y-3 text-sm">
            <li>Standard delivery: 1–3 business days. Free on orders over $150.</li>
            <li>Express delivery: next business day. $29.</li>
            <li>Store pickup: same day, free.</li>
            <li>We ship Monday through Saturday. Orders placed after 2pm ship the next business day.</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6">
          <h2 className="font-display text-display-sm mb-4">Returns</h2>
          <ul className="space-y-3 text-sm">
            <li>14 days from delivery for a full refund.</li>
            <li>Product must be in its original condition with all packaging.</li>
            <li>Open-box items are final sale.</li>
            <li>Refunds are processed within 5 business days of receipt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}