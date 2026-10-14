'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RVState {
  slugs: string[];
  push: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewed = create<RVState>()(
  persist(
    (set) => ({
      slugs: [],
      push: (slug) =>
        set((s) => ({ slugs: [slug, ...s.slugs.filter((x) => x !== slug)].slice(0, 8) })),
      clear: () => set({ slugs: [] }),
    }),
    { name: 'laptopya-recent' },
  ),
);