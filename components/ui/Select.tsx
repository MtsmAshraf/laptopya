'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  value: string;
  label: string;
}

export function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {label && <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">{label}</div>}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 border border-brand-line px-3 py-2.5 text-sm text-start bg-brand-paper hover:border-brand-ink transition-colors"
      >
        <span>{current.label}</span>
        <span className="font-mono text-xs text-brand-muted">{open ? '—' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 inset-x-0 top-full mt-1 border border-brand-line bg-brand-paper shadow-soft max-h-64 overflow-y-auto"
          >
            {options.map((o) => (
              <li key={o.value}>
                <button
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className="w-full text-start px-3 py-2.5 text-sm hover:bg-brand-ink hover:text-brand-paper transition-colors"
                >
                  {o.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}