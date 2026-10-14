'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  side?: 'left' | 'right';
  footer?: ReactNode;
}

export function Sheet({ open, onClose, title, children, side = 'right', footer }: SheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const from = side === 'right' ? { x: '100%' } : { x: '-100%' };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[55]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={from}
            animate={{ x: 0 }}
            exit={from}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-y-0 ${side === 'right' ? 'end-0' : 'start-0'} w-full sm:w-[420px] bg-brand-paper border-s border-brand-line flex flex-col`}
          >
            <div className="flex items-center justify-between border-b border-brand-line px-6 py-4">
              <h2 className="font-display text-display-sm">{title}</h2>
              <button onClick={onClose} className="btn btn-ghost h-9 px-3 text-xs">
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
            {footer && <div className="border-t border-brand-line p-6">{footer}</div>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}