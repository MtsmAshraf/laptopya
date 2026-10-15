'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Input } from '@/components/ui/Input';

function SearchInner() {
  const sp = useSearchParams();
  const initial = sp.get('q') ?? '';
  const [q, setQ] = useState(initial);
  const [suggestions, setSuggestions] = useState<typeof products>([]);

  useEffect(() => {
    if (!q.trim()) { setSuggestions([]); return; }
    const needle = q.toLowerCase();
    const matches = products.filter(
      (p) => p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle),
    ).slice(0, 6);
    setSuggestions(matches);
  }, [q]);

  const results = products.filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <h1 className="font-display text-display-lg mt-6">Search</h1>
      <div className="mt-6 max-w-2xl relative">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search laptops, brands, specs"
          autoFocus
        />
        {suggestions.length > 0 && q && (
          <div className="absolute inset-x-0 top-full mt-2 border border-brand-line bg-brand-paper shadow-soft z-10">
            {suggestions.map((p) => (
              <a key={p.slug} href={`/product/${p.slug}`} className="block px-4 py-3 text-sm hover:bg-brand-ink hover:text-brand-paper transition-colors">
                <div className="font-display">{p.name}</div>
                <div className="text-xs font-mono text-brand-muted">{p.brand}</div>
              </a>
            ))}
          </div>
        )}
      </div>
      {q && (
        <div className="mt-12">
          <div className="text-xs font-mono text-brand-muted mb-6">{results.length} results for "{q}"</div>
          {results.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-brand-line">
              <div className="font-display text-display-md mb-2">No matches</div>
              <p className="text-brand-muted">Try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {results.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}