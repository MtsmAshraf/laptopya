'use client';
import AppLink from '@/components/ui/AppLink';
import { useWishlist } from '@/store/wishlist';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function WishlistPage() {
  const slugs = useWishlist((s) => s.slugs);
  const items = slugs.map((s) => products.find((p) => p.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Wishlist' }]} />
      <h1 className="font-display text-display-lg mt-6">Wishlist · {items.length}</h1>
      {items.length === 0 ? (
        <div className="mt-12 text-center py-20 border border-dashed border-brand-line">
          <div className="font-display text-display-lg mb-3">Your wishlist is empty</div>
          <p className="text-brand-muted mb-8">Save products you love for later.</p>
          <Button href="/shop">Browse products</Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </div>
      )}
    </div>
  );
}