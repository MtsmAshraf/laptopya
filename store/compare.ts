'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  slugs: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

export const useCompare = create<CompareState>()(
  persist(
    (set) => ({
      slugs: [],
      toggle: (slug) =>
        set((s) => {
          if (s.slugs.includes(slug)) return { slugs: s.slugs.filter((x) => x !== slug) };
          if (s.slugs.length >= 4) return s;
          return { slugs: [...s.slugs, slug] };
        }),
      remove: (slug) => set((s) => ({ slugs: s.slugs.filter((x) => x !== slug) })),
      clear: () => set({ slugs: [] }),
    }),
    { name: 'laptopya-compare' },
  ),
);