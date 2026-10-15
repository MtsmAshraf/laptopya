// app/faq/page.tsx
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';

const items = [
  { id: '1', title: 'How long does delivery take?', content: <p>Standard delivery is 1–3 business days. Express delivery is next business day for orders placed before 2pm.</p> },
  { id: '2', title: 'Do you offer student discounts?', content: <p>Yes. Use code CAMPUS26 at checkout for 10% off. Valid for students with a .edu email.</p> },
  { id: '3', title: 'Can I trade in my old laptop?', content: <p>Yes. Use our trade-in form to get an instant quote. We pick up your old laptop when we deliver the new one.</p> },
  { id: '4', title: 'Do you offer installment plans?', content: <p>Yes, through Klarna. Split any purchase over 4 interest-free payments, or finance over 12 or 24 months.</p> },
  { id: '5', title: 'What is your return policy?', content: <p>14 days from delivery for a full refund, provided the product is in its original condition.</p> },
  { id: '6', title: 'Do you ship internationally?', content: <p>Not yet. We currently ship within the country only. International shipping is planned for 2027.</p> },
];

export default function FaqPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <Reveal>
        <h1 className="font-display text-display-lg mt-6">Frequently asked questions</h1>
        <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">Everything you need to know, answered.</p>
      </Reveal>
      <div className="mt-12 max-w-3xl">
        <Accordion items={items} />
      </div>
    </div>
  );
}