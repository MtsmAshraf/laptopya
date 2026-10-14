import Link from 'next/link';
import { Logo } from './Logo';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page py-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <Logo className="text-3xl" />
            <p className="mt-6 text-sm text-brand-paper/70 max-w-sm">
              {siteConfig.tagline} A curated selection of laptops, workstations, and accessories —
              genuine products, transparent pricing, and expert support since 2018.
            </p>
            <div className="mt-6 space-y-1 text-sm text-brand-paper/70">
              <div>{siteConfig.support.email}</div>
              <div>{siteConfig.support.phone}</div>
              <div>{siteConfig.support.hours}</div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">
              Shop
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop/gaming" className="link-underline">Gaming</Link></li>
              <li><Link href="/shop/business" className="link-underline">Business</Link></li>
              <li><Link href="/shop/student" className="link-underline">Student</Link></li>
              <li><Link href="/shop/creator" className="link-underline">Creator</Link></li>
              <li><Link href="/shop/workstation" className="link-underline">Workstation</Link></li>
              <li><Link href="/shop/accessories" className="link-underline">Accessories</Link></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">
              Support
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="link-underline">Contact</Link></li>
              <li><Link href="/faq" className="link-underline">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="link-underline">Shipping & returns</Link></li>
              <li><Link href="/warranty" className="link-underline">Warranty</Link></li>
              <li><Link href="/trade-in" className="link-underline">Trade-in</Link></li>
              <li><Link href="/order-tracking" className="link-underline">Track order</Link></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">
              Company
            </div>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="link-underline">About</Link></li>
              <li><Link href="/blog" className="link-underline">Blog</Link></li>
              <li><Link href="/careers" className="link-underline">Careers</Link></li>
              <li><Link href="/press" className="link-underline">Press</Link></li>
              <li><Link href="/privacy" className="link-underline">Privacy</Link></li>
              <li><Link href="/terms" className="link-underline">Terms</Link></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-paper/50 mb-4">
              Payment
            </div>
            <ul className="space-y-2 text-sm font-mono">
              <li>Visa</li>
              <li>Mastercard</li>
              <li>Amex</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
              <li>Klarna</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-paper/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-brand-paper/50">
          <div>© 2026 Laptopya. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Built in 2026</span>
            <a href="#top" className="link-underline">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}