'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { products } from '@/data/products';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import type { FilterState, Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Slider } from '@/components/ui/Slider';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Sheet } from '@/components/ui/Sheet';
import { formatPrice } from '@/lib/utils';

const defaultFilter: FilterState = {
  brands: [],
  categories: [],
  priceRange: [0, 6000],
  ram: [],
  storage: [],
  cpu: [],
  gpu: [],
  screenSize: [],
  condition: [],
  inStockOnly: false,
  q: '',
  sort: 'relevance',
};

function applyFilters(list: Product[], f: FilterState): Product[] {
  let r = [...list];
  if (f.q) {
    const q = f.q.toLowerCase();
    r = r.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  if (f.brands.length) r = r.filter((p) => f.brands.includes(p.brand));
  if (f.categories.length) r = r.filter((p) => f.categories.includes(p.category));
  if (f.condition.length) r = r.filter((p) => f.condition.includes(p.condition));
  if (f.inStockOnly) r = r.filter((p) => p.variants.some((v) => v.stock > 0));
  if (f.ram.length) r = r.filter((p) => p.variants.some((v) => f.ram.includes(v.ram)));
  if (f.storage.length) r = r.filter((p) => p.variants.some((v) => f.storage.includes(v.storage)));
  r = r.filter((p) => {
    const min = Math.min(...p.variants.map((v) => v.price));
    const max = Math.max(...p.variants.map((v) => v.price));
    return max >= f.priceRange[0] && min <= f.priceRange[1];
  });
  switch (f.sort) {
    case 'price-asc': r.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price))); break;
    case 'price-desc': r.sort((a, b) => Math.max(...b.variants.map((v) => v.price)) - Math.max(...a.variants.map((v) => v.price))); break;
    case 'rating': r.sort((a, b) => b.rating - a.rating); break;
    case 'newest': r.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
  }
  return r;
}

export function ShopClient() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopInner />
    </Suspense>
  );
}

function ShopInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<FilterState>(() => {
    const q = sp.get('q') ?? '';
    const sort = (sp.get('sort') as FilterState['sort']) ?? 'relevance';
    return { ...defaultFilter, q, sort };
  });
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.q) params.set('q', filter.q);
    if (filter.sort !== 'relevance') params.set('sort', filter.sort);
    if (filter.brands.length) params.set('brands', filter.brands.join(','));
    if (filter.categories.length) params.set('categories', filter.categories.join(','));
    const s = params.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  }, [filter, router, pathname]);

  const filtered = useMemo(() => applyFilters(products, filter), [filter]);
  const paged = filtered.slice(0, page * perPage);
  const hasMore = paged.length < filtered.length;

  const toggle = <K extends keyof FilterState>(key: K, value: FilterState[K] extends (infer U)[] ? U : never) => {
    setFilter((f) => {
      const arr = f[key] as string[] | number[];
      const has = arr.includes(value as never);
      return { ...f, [key]: (has ? arr.filter((x) => x !== value) : [...arr, value]) as FilterState[K] };
    });
  };

  const clearAll = () => setFilter({ ...defaultFilter, q: filter.q, sort: filter.sort });
  const activeCount =
    filter.brands.length +
    filter.categories.length +
    filter.condition.length +
    filter.ram.length +
    filter.storage.length +
    (filter.inStockOnly ? 1 : 0) +
    (filter.priceRange[0] > 0 || filter.priceRange[1] < 6000 ? 1 : 0);

  return (
    <div className="container-page py-10">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 hidden lg:block">
          <FilterPanel
            filter={filter}
            setFilter={setFilter}
            toggle={toggle}
            clearAll={clearAll}
            activeCount={activeCount}
          />
        </aside>

        {/* Main */}
        <div className="col-span-12 lg:col-span-9">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => setMobileOpen(true)} className="btn btn-ghost lg:hidden">
                Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <input
                type="search"
                value={filter.q}
                onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
                placeholder="Search within shop"
                className="border border-brand-line bg-brand-paper px-3 py-2.5 text-sm placeholder:text-brand-muted focus:border-brand-ink focus:outline-none w-full sm:w-64"
                aria-label="Search within shop"
              />
              <div className="text-xs font-mono text-brand-muted">
                {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-brand-line">
                <button onClick={() => setView('grid')} className={`h-9 px-3 text-xs ${view === 'grid' ? 'bg-brand-ink text-brand-paper' : ''}`}>Grid</button>
                <button onClick={() => setView('list')} className={`h-9 px-3 text-xs ${view === 'list' ? 'bg-brand-ink text-brand-paper' : ''}`}>List</button>
              </div>
              <div className="w-40">
                <Select
                  label="Sort"
                  value={filter.sort}
                  onChange={(v) => setFilter((f) => ({ ...f, sort: v as FilterState['sort'] }))}
                  options={[
                    { value: 'relevance', label: 'Relevance' },
                    { value: 'price-asc', label: 'Price: low to high' },
                    { value: 'price-desc', label: 'Price: high to low' },
                    { value: 'rating', label: 'Top rated' },
                    { value: 'newest', label: 'Newest' },
                  ]}
                />
              </div>
            </div>
          </div>

          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {filter.brands.map((b) => (
                <Chip key={b} label={brands.find((x) => x.slug === b)?.name ?? b} onRemove={() => toggle('brands', b)} />
              ))}
              {filter.categories.map((c) => (
                <Chip key={c} label={categories.find((x) => x.slug === c)?.name ?? c} onRemove={() => toggle('categories', c)} />
              ))}
              {filter.ram.map((r) => (
                <Chip key={r} label={`${r}GB RAM`} onRemove={() => toggle('ram', r)} />
              ))}
              {filter.storage.map((s) => (
                <Chip key={s} label={`${s >= 1000 ? `${s / 1000}TB` : `${s}GB`} storage`} onRemove={() => toggle('storage', s)} />
              ))}
              {filter.condition.map((c) => (
                <Chip key={c} label={c === 'new' ? 'New' : 'Open box'} onRemove={() => toggle('condition', c)} />
              ))}
              {filter.inStockOnly && (
                <Chip label="In stock only" onRemove={() => setFilter((f) => ({ ...f, inStockOnly: false }))} />
              )}
              {(filter.priceRange[0] > 0 || filter.priceRange[1] < 6000) && (
                <Chip label={`${formatPrice(filter.priceRange[0])} – ${formatPrice(filter.priceRange[1])}`} onRemove={() => setFilter((f) => ({ ...f, priceRange: [0, 6000] }))} />
              )}
              <button onClick={clearAll} className="text-xs font-mono uppercase tracking-widest link-underline">
                Clear all
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-brand-line">
              <div className="font-display text-display-md mb-2">No matches</div>
              <p className="text-sm text-brand-muted mb-6">Try removing some filters.</p>
              <Button variant="ghost" onClick={clearAll}>Clear filters</Button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {paged.map((p, i) => (
                <ProductCard key={p.slug} p={p} index={i} />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-brand-line border-y border-brand-line">
              {paged.map((p) => (
                <li key={p.slug} className="py-5 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 relative aspect-square bg-brand-line/30">
                    <a href={`/product/${p.slug}`}>
                      <img src={p.images[0]} alt={p.name} className="object-cover w-full h-full" />
                    </a>
                  </div>
                  <div className="col-span-9">
                    <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">{p.brand}</div>
                    <a href={`/product/${p.slug}`} className="font-display text-display-sm link-underline">{p.name}</a>
                    <p className="text-sm text-brand-muted mt-1 max-w-prose">{p.description}</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-mono text-sm">{formatPrice(Math.min(...p.variants.map((v) => v.price)))}</span>
                      <span className="text-xs font-mono text-brand-muted">★ {p.rating.toFixed(1)} · {p.reviewCount} reviews</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <Button variant="ghost" onClick={() => setPage((p) => p + 1)}>Load more</Button>
            </div>
          )}
        </div>
      </div>

      <Sheet open={mobileOpen} onClose={() => setMobileOpen(false)} title="Filters" side="left">
        <div className="p-6">
          <FilterPanel filter={filter} setFilter={setFilter} toggle={toggle} clearAll={clearAll} activeCount={activeCount} />
        </div>
      </Sheet>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="chip">
      {label}
      <button onClick={onRemove} className="link-underline text-xs">Remove</button>
    </span>
  );
}

function FilterPanel({
  filter,
  setFilter,
  toggle,
  clearAll,
  activeCount,
}: {
  filter: FilterState;
  setFilter: (f: FilterState | ((s: FilterState) => FilterState)) => void;
  toggle: <K extends keyof FilterState>(key: K, value: FilterState[K] extends (infer U)[] ? U : never) => void;
  clearAll: () => void;
  activeCount: number;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-baseline justify-between">
        <div className="font-display text-display-sm">Filters</div>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-mono uppercase tracking-widest link-underline">
            Clear all
          </button>
        )}
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Brand</div>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b.slug} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.brands.includes(b.slug)}
                onChange={() => toggle('brands', b.slug)}
                className="w-4 h-4 accent-brand-red"
              />
              <span className="text-sm">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Price</div>
        <Slider
          min={0}
          max={6000}
          step={50}
          value={filter.priceRange}
          onChange={(v) => setFilter((f: FilterState) => ({ ...f, priceRange: v }))}
          format={(n) => formatPrice(n)}
        />
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Memory</div>
        <div className="flex flex-wrap gap-2">
          {[8, 16, 24, 32, 64, 128].map((r) => (
            <button
              key={r}
              onClick={() => toggle('ram', r)}
              className={`btn h-10 px-3 text-xs font-mono ${filter.ram.includes(r) ? 'btn-primary' : 'btn-ghost'}`}
            >
              {r}GB
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Storage</div>
        <div className="flex flex-wrap gap-2">
          {[256, 512, 1000, 2000, 4000].map((s) => (
            <button
              key={s}
              onClick={() => toggle('storage', s)}
              className={`btn h-10 px-3 text-xs font-mono ${filter.storage.includes(s) ? 'btn-primary' : 'btn-ghost'}`}
            >
              {s >= 1000 ? `${s / 1000}TB` : `${s}GB`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">Condition</div>
        <div className="space-y-2">
          {(['new', 'open-box'] as const).map((c) => (
            <label key={c} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filter.condition.includes(c)}
                onChange={() => toggle('condition', c)}
                className="w-4 h-4 accent-brand-red"
              />
              <span className="text-sm">{c === 'new' ? 'New' : 'Open box'}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.inStockOnly}
            onChange={() => setFilter((f: FilterState) => ({ ...f, inStockOnly: !f.inStockOnly }))}
            className="w-4 h-4 accent-brand-red"
          />
          <span className="text-sm">In stock only</span>
        </label>
      </div>
    </div>
  );
}

function ShopSkeleton() {
  return (
    <div className="container-page py-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3 hidden lg:block space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/3]" />
              <Skeleton className="h-4 mt-4 w-1/3" />
              <Skeleton className="h-6 mt-2" />
              <Skeleton className="h-4 mt-2 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}