import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brands } from '@/data/brands';
import { ShopClient } from '@/app/shop/ShopClient';
import { Breadcrumbs, Crumb } from '@/components/layout/Breadcrumbs';

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const b = brands.find((x) => x.slug === params.brand);
  if (!b) return {};
  return { title: b.name, description: b.tagline };
}

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const b = brands.find((x) => x.slug === params.brand);
  if (!b) notFound();
  const crumbs: Crumb[] = [{ label: 'Brands' }, { label: b.name }];
  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-3">Brand</div>
          <h1 className="font-display text-display-lg">{b.name}</h1>
          <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">{b.tagline}</p>
        </div>
      </div>
      <ShopClient />
    </div>
  );
}