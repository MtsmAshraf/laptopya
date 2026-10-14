'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Dialog({ open, onClose, title, children, size = 'md' }: DialogProps) {
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

  const sizes = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${sizes[size]} bg-brand-paper border border-brand-line rounded-md shadow-lift`}
          >
            <div className="flex items-center justify-between border-b border-brand-line px-6 py-4">
              <h2 className="font-display text-display-sm">{title}</h2>
              <button
                onClick={onClose}
                className="btn btn-ghost h-9 px-3 text-xs"
                aria-label="Close dialog"
              >
                Close
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}