'use client';
import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Item {
  id: string;
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="divide-y divide-brand-line border-y border-brand-line">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id}>
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-start"
            >
              <span className="font-display text-display-sm">{it.title}</span>
              <span className="font-mono text-xs tracking-widest text-brand-muted">
                {isOpen ? '—' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-body-lg text-brand-muted max-w-prose">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}