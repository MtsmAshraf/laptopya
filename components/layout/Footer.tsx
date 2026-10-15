import AppLink from '@/components/ui/AppLink'; // <-- CHANGED
import { Logo } from './Logo';
import { siteConfig } from '@/lib/config';
import { getTranslations } from 'next-intl/server';

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Footer' });
  const nav = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <footer className="border-t border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Logo className="text-3xl" />
            <p className="mt-6 text-sm text-brand-paper/70 max-w-sm">{t('tagline')}</p>
            <div className="mt-6 space-y-1 text-sm text-brand-paper/70">
              <div>{siteConfig.support.email}</div>
              <div>{siteConfig.support.phone}</div>
              <div>{siteConfig.support.hours}</div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">{t('shop')}</div>
            <ul className="space-y-2 text-sm">
              <li><AppLink href="/shop/gaming" className="link-underline">Gaming</AppLink></li>
              <li><AppLink href="/shop/business" className="link-underline">Business</AppLink></li>
              <li><AppLink href="/shop/student" className="link-underline">Student</AppLink></li>
              <li><AppLink href="/shop/creator" className="link-underline">Creator</AppLink></li>
              <li><AppLink href="/shop/workstation" className="link-underline">Workstation</AppLink></li>
              <li><AppLink href="/shop/accessories" className="link-underline">Accessories</AppLink></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">{t('support')}</div>
            <ul className="space-y-2 text-sm">
              <li><AppLink href="/contact" className="link-underline">{t('contact')}</AppLink></li>
              <li><AppLink href="/faq" className="link-underline">{t('faq')}</AppLink></li>
              <li><AppLink href="/shipping-returns" className="link-underline">{t('shipping')}</AppLink></li>
              <li><AppLink href="/warranty" className="link-underline">{t('warranty')}</AppLink></li>
              <li><AppLink href="/trade-in" className="link-underline">{t('tradeIn')}</AppLink></li>
              <li><AppLink href="/order-tracking" className="link-underline">Track order</AppLink></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">{t('company')}</div>
            <ul className="space-y-2 text-sm">
              <li><AppLink href="/about" className="link-underline">{nav('about')}</AppLink></li>
              <li><AppLink href="/blog" className="link-underline">{nav('guides')}</AppLink></li>
              <li><AppLink href="/careers" className="link-underline">{t('careers')}</AppLink></li>
              <li><AppLink href="/press" className="link-underline">{t('press')}</AppLink></li>
              <li><AppLink href="/privacy" className="link-underline">{t('privacy')}</AppLink></li>
              <li><AppLink href="/terms" className="link-underline">{t('terms')}</AppLink></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">{t('payment')}</div>
            <ul className="space-y-2 text-sm font-mono">
              <li>Visa</li><li>Mastercard</li><li>Amex</li><li>Apple Pay</li><li>Google Pay</li><li>Klarna</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-brand-paper/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-brand-paper/50">
          <div>© 2026 Laptopya. {t('rights')}</div>
          <div className="flex items-center gap-6">
            <span>{t('builtIn')}</span>
            <a href="#top" className="link-underline">{t('backToTop')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}