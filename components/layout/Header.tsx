'use client';
import { useEffect, useState } from 'react';
import AppLink from '@/components/ui/AppLink'; // <-- CHANGED
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Logo } from './Logo';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { useCompare } from '@/store/compare';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';

const iconBtnGhost = "flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] border border-brand-line bg-brand-paper text-brand-ink hover:border-brand-ink transition-colors";
const iconBtnPrimary = "flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] bg-brand-ink text-brand-paper hover:bg-brand-red transition-colors";

export function Header() {
  const t = useTranslations('Common');
  const nav = useTranslations('Nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const cartCount = useCart((s) => s.lines.reduce((a, l) => a + l.qty, 0));
  const wishCount = useWishlist((s) => s.slugs.length);
  const cmpCount = useCompare((s) => s.slugs.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-brand-paper/85 backdrop-blur-md border-b border-brand-line transition-all ${scrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
        <div className="container-page flex items-center gap-3 lg:gap-6 min-w-0">
          <button className={`${iconBtnGhost} md:hidden`} onClick={() => setMenuOpen(true)} aria-label={t('menu')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>
          </button>

          <Logo className={`shrink-0 transition-all ${scrolled ? 'text-lg' : 'text-xl'}`} />

          <nav className="hidden lg:flex items-center gap-6 text-sm shrink-0">
            <AppLink href="/shop" className="link-underline">{nav('shop')}</AppLink>
            <button onMouseEnter={() => setMegaOpen(true)} className="link-underline" aria-haspopup="true">{nav('categories')}</button>
            <AppLink href="/brands/apple" className="link-underline">{nav('brands')}</AppLink>
            <AppLink href="/compare" className="link-underline">
              {nav('compare')} {cmpCount > 0 && <span className="ms-1 text-brand-red">({cmpCount})</span>}
            </AppLink>
            <AppLink href="/blog" className="link-underline">{nav('guides')}</AppLink>
            <AppLink href="/about" className="link-underline">{nav('about')}</AppLink>
          </nav>

          <div className="hidden lg:block absolute inset-x-0 top-full" onMouseLeave={() => setMegaOpen(false)}>
            <MegaMenu open={megaOpen} onMouseEnter={() => setMegaOpen(true)} />
          </div>

          <div className="ms-auto flex items-center gap-1 sm:gap-2 shrink-0">
            <AppLink href="/search" className={iconBtnGhost} aria-label={t('search')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" strokeLinecap="round" /></svg>
            </AppLink>
            <AppLink href="/wishlist" className={`${iconBtnGhost} hidden md:flex relative`} aria-label={t('wishlist')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" strokeLinejoin="round" /></svg>
              {wishCount > 0 && <span className="absolute -top-1 -right-1 font-mono text-[10px] bg-brand-red text-brand-paper rounded-full w-4 h-4 flex items-center justify-center">{wishCount}</span>}
            </AppLink>
            <AppLink href="/account" className={`${iconBtnGhost} hidden md:flex`} aria-label={t('account')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" /></svg>
            </AppLink>
            <ThemeToggle />
            <LangSwitcher />
            <button onClick={() => setCartOpen(true)} className={`${iconBtnPrimary} relative`} aria-label={t('cart')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinejoin="round" /></svg>
              {cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 font-mono text-[10px] bg-brand-red text-brand-paper rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</motion.span>}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}