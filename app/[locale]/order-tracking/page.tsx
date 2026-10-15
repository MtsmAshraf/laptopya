import AppLink from '@/components/ui/AppLink';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export default function OrderTrackingPage({ searchParams }: { searchParams: { ref?: string } }) {
  const ref = searchParams.ref ?? 'LP-2026-XXXX';
  const stages = [
    { label: 'Order placed', date: 'Oct 14, 2026 · 10:42', done: true },
    { label: 'Payment confirmed', date: 'Oct 14, 2026 · 10:43', done: true },
    { label: 'Packed', date: 'Oct 14, 2026 · 14:10', done: true },
    { label: 'Shipped', date: 'In progress', done: false },
    { label: 'Delivered', date: 'Est. Oct 16', done: false },
  ];
  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Order tracking' }]} />
      <h1 className="font-display text-display-lg mt-6">Order tracking</h1>
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7">
          <div className="border border-brand-line p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Order reference</div>
                <div className="font-display text-display-md mt-1">{ref}</div>
              </div>
              <div className="text-end">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">Status</div>
                <div className="font-display text-display-sm mt-1 text-brand-red">In transit</div>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              {stages.map((s, i) => (
                <div key={s.label} className="flex gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${s.done ? 'bg-brand-red' : 'bg-brand-line'}`} />
                  <div className="flex-1 pb-6 border-s border-brand-line ms-1">
                    <div className="font-display text-display-sm">{s.label}</div>
                    <div className="text-xs font-mono text-brand-muted mt-1">{s.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="col-span-12 lg:col-span-5">
          <div className="border border-brand-line p-6 space-y-4">
            <div className="font-display text-display-sm">Need help?</div>
            <p className="text-sm text-brand-muted">Our support team is available Mon–Sat, 09:00–20:00.</p>
            <div className="space-y-2 text-sm">
              <div>hello@laptopya.example</div>
              <div>+1 (555) 012-3456</div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" href="/contact">Contact support</Button>
              <Button href="/shop">Continue shopping</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}