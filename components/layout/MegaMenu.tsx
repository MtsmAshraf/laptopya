'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

export function MegaMenu({ open, onMouseEnter }: { open: boolean; onMouseEnter: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onMouseEnter={onMouseEnter}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="border-b border-brand-line bg-brand-paper"
        >
          <div className="container-page grid grid-cols-12 gap-8 py-10">
            <div className="col-span-3">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">
                Categories
              </div>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/shop/${c.slug}`}
                      className="flex items-baseline justify-between group"
                    >
                      <span className="font-display text-display-sm group-hover:text-brand-red transition-colors">
                        {c.name}
                      </span>
                      <span className="font-mono text-xs text-brand-muted">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-3">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">
                Brands
              </div>
              <ul className="space-y-2">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/brands/${b.slug}`}
                      className="flex items-baseline justify-between group"
                    >
                      <span className="font-display text-display-sm group-hover:text-brand-red transition-colors">
                        {b.name}
                      </span>
                      <span className="font-mono text-xs text-brand-muted link-underline">View</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6">
              <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">
                Featured
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/product/asus-rog-strix-g16-2025"
                  className="group relative aspect-[4/3] bg-brand-ink overflow-hidden"
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                    <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                      Gaming
                    </div>
                    <div className="font-display text-display-md mt-1">ROG Strix G16</div>
                    <div className="text-sm mt-2 opacity-80">From $2,499</div>
                  </div>
                </Link>
                <Link
                  href="/product/apple-macbook-pro-16-m4-max"
                  className="group relative aspect-[4/3] bg-brand-red overflow-hidden"
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                    <div className="text-xs font-mono uppercase tracking-widest opacity-70">
                      Creator
                    </div>
                    <div className="font-display text-display-md mt-1">MacBook Pro 16"</div>
                    <div className="text-sm mt-2 opacity-80">From $3,499</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}