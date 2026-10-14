import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getReviewsForProduct } from '@/lib/api/products';
import { ProductPageClient } from './ProductPageClient';
import { Breadcrumbs, Crumb } from '@/components/layout/Breadcrumbs';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  if (!p) return {};
  const brand = brands.find((b) => b.slug === p.brand)?.name ?? p.brand;
  return {
    title: `${p.name} · ${brand}`,
    description: p.description,
    openGraph: {
      title: p.name,
      description: p.description,
      images: p.images.map((src) => ({ url: src })),
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();
  const related = await getRelatedProducts(p.slug);
  const reviews = await getReviewsForProduct(p.slug);
  const brand = brands.find((b) => b.slug === p.brand)?.name ?? p.brand;
  const category = categories.find((c) => c.slug === p.category)?.name ?? p.category;
  const crumbs: Crumb[] = [
    { label: 'Shop', href: '/shop' },
    { label: category, href: `/shop/${p.category}` },
    { label: p.name },
  ];

  return (
    <div className="border-b border-brand-line">
      <div className="container-page py-8">
        <Breadcrumbs items={crumbs} />
      </div>
      <ProductPageClient product={p} brand={brand} related={related} reviews={reviews} />
    </div>
  );
}