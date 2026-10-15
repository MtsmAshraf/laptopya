'use client';
import AppLink from '@/components/ui/AppLink'; // <-- CHANGED
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('Nav');
  const m = useTranslations('MobileMenu');

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[50] md:hidden">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-ink/40" onClick={onClose} />
          <motion.nav initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-y-0 start-0 w-[86%] max-w-sm bg-brand-paper border-e border-brand-line overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brand-line px-6 py-4">
              <span className="font-display font-bold text-2xl"><span className="text-brand-charcoal dark:text-brand-ink">Lapto</span><span className="text-brand-red">pya</span></span>
              <button onClick={onClose} className="flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] border border-brand-line bg-brand-paper text-brand-ink" aria-label="Close menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-8">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">{t('categories')}</div>
                <ul className="space-y-3">
                  <li><AppLink href="/shop" onClick={onClose} className="font-display text-display-sm link-underline block py-1">{t('allProducts')}</AppLink></li>
                  {categories.map((c) => (<li key={c.slug}><AppLink href={`/shop/${c.slug}`} onClick={onClose} className="font-display text-display-sm link-underline block py-1">{c.name}</AppLink></li>))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">{t('brands')}</div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {brands.map((b) => (<li key={b.slug}><AppLink href={`/brands/${b.slug}`} onClick={onClose} className="font-display text-display-sm link-underline block py-1">{b.name}</AppLink></li>))}
                </ul>
              </div>
              <div className="border-t border-brand-line pt-6">
                <div className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">{m('more')}</div>
                <ul className="space-y-3">
                  <li><AppLink href="/compare" onClick={onClose} className="font-display text-display-sm link-underline block py-1">{t('compare')}</AppLink></li>
                  <li><AppLink href="/wishlist" onClick={onClose} className="font-display text-display-sm link-underline block py-1">Wishlist</AppLink></li>
                  <li><AppLink href="/account" onClick={onClose} className="font-display text-display-sm link-underline block py-1">Account</AppLink></li>
                  <li><AppLink href="/blog" onClick={onClose} className="font-display text-display-sm link-underline block py-1">{m('buyingGuides')}</AppLink></li>
                  <li><AppLink href="/about" onClick={onClose} className="font-display text-display-sm link-underline block py-1">{t('about')}</AppLink></li>
                  <li><AppLink href="/contact" onClick={onClose} className="font-display text-display-sm link-underline block py-1">{t('contact')}</AppLink></li>
                </ul>
              </div>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}