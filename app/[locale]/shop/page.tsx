import type { Metadata } from 'next';
import { ShopClient } from './ShopClient';
import { Breadcrumbs, Crumb } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse all laptops, workstations, and accessories at Laptopya.',
};

const crumbs: Crumb[] = [{ label: 'Shop' }];

export default function ShopPage() {
  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
          <h1 className="font-display text-display-lg">Shop</h1>
          <div className="text-sm text-brand-muted">
            Every laptop, workstation, and accessory we carry.
          </div>
        </div>
      </div>
      <ShopClient />
    </div>
  );
}