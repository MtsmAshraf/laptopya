import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { ShopClient } from '../ShopClient';
import { Breadcrumbs, Crumb } from '@/components/layout/Breadcrumbs';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) return {};
  return { title: cat.name, description: cat.description };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();
  const crumbs: Crumb[] = [{ label: 'Shop', href: '/shop' }, { label: cat.name }];
  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-3">Category</div>
          <h1 className="font-display text-display-lg">{cat.name}</h1>
          <p className="mt-3 text-body-lg text-brand-muted max-w-2xl">{cat.description}</p>
        </div>
      </div>
      <ShopClient />
    </div>
  );
}