'use client';
import { useState } from 'react';
import type { ProductVariant } from '@/types';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function VariantSelector({
  variants,
  onChange,
}: {
  variants: ProductVariant[];
  onChange: (v: ProductVariant) => void;
}) {
  const [active, setActive] = useState(variants[0]);
  const rams = Array.from(new Set(variants.map((v) => v.ram))).sort((a, b) => a - b);
  const storages = Array.from(new Set(variants.map((v) => v.storage))).sort((a, b) => a - b);
  const [ram, setRam] = useState(active.ram);
  const [storage, setStorage] = useState(active.storage);

  const pick = (r: number, s: number) => {
    const match = variants.find((v) => v.ram === r && v.storage === s) ??
      variants.find((v) => v.ram === r) ??
      variants[0];
    setActive(match);
    onChange(match);
    setRam(match.ram);
    setStorage(match.storage);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">
          Memory · {ram} GB
        </div>
        <div className="flex flex-wrap gap-2">
          {rams.map((r) => (
            <button
              key={r}
              onClick={() => pick(r, storage)}
              className={cn(
                'btn h-11 px-4 text-sm font-mono',
                ram === r ? 'btn-primary' : 'btn-ghost',
              )}
            >
              {r} GB
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-3">
          Storage · {storage >= 1000 ? `${storage / 1000} TB` : `${storage} GB`}
        </div>
        <div className="flex flex-wrap gap-2">
          {storages.map((s) => (
            <button
              key={s}
              onClick={() => pick(ram, s)}
              className={cn(
                'btn h-11 px-4 text-sm font-mono',
                storage === s ? 'btn-primary' : 'btn-ghost',
              )}
            >
              {s >= 1000 ? `${s / 1000} TB` : `${s} GB`}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-brand-line flex items-baseline gap-3">
        <span className="font-display text-display-md">{formatPrice(active.price)}</span>
        {active.compareAt && (
          <span className="font-mono text-sm text-brand-muted line-through">
            {formatPrice(active.compareAt)}
          </span>
        )}
        <span className="ms-auto text-xs font-mono text-brand-muted">
          SKU {active.sku}
        </span>
      </div>
    </div>
  );
}