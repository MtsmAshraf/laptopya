'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from '@/types';

interface CartState {
  lines: CartLine[];
  promo: string | null;
  addLine: (slug: string, variantId: string, qty?: number) => void;
  removeLine: (slug: string, variantId: string) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  setPromo: (code: string | null) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      promo: null,
      addLine: (slug, variantId, qty = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => l.slug === slug && l.variantId === variantId);
          if (existing) {
            return { lines: s.lines.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l)) };
          }
          return { lines: [...s.lines, { slug, variantId, qty }] };
        }),
      removeLine: (slug, variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => !(l.slug === slug && l.variantId === variantId)) })),
      setQty: (slug, variantId, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !(l.slug === slug && l.variantId === variantId))
              : s.lines.map((l) => (l.slug === slug && l.variantId === variantId ? { ...l, qty } : l)),
        })),
      setPromo: (code) => set({ promo: code }),
      clear: () => set({ lines: [], promo: null }),
    }),
    { name: 'laptopya-cart' },
  ),
);