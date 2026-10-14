'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('laptopya-cookies')) setOpen(true);
  }, []);
  const accept = () => {
    localStorage.setItem('laptopya-cookies', 'accepted');
    setOpen(false);
  };
  const decline = () => {
    localStorage.setItem('laptopya-cookies', 'declined');
    setOpen(false);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:end-6 md:bottom-6 z-[70] max-w-md bg-brand-paper border border-brand-line shadow-lift p-6"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="text-sm text-brand-ink">
            <div className="font-display text-display-sm mb-2">Cookies</div>
            <p className="text-brand-muted">
              We use cookies to improve your experience and analyze traffic. You can accept all or
              only the essentials. Read our <a href="/privacy" className="link-underline">privacy policy</a>.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={accept} className="btn btn-primary flex-1">Accept all</button>
            <button onClick={decline} className="btn btn-ghost flex-1">Essentials only</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}