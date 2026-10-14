import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { siteConfig } from '@/lib/config';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const body = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name + ' — Premium laptops and tech',
    template: `%s · ${siteConfig.name}`,
  },
  description:
    'Laptopya is a premium destination for laptops, workstations and tech accessories. Genuine products, transparent pricing, and expert support.',
  applicationName: siteConfig.name,
  keywords: ['laptop', 'gaming laptop', 'workstation', 'MacBook', 'ThinkPad', 'tech store'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: 'Premium laptops and tech. Genuine products, transparent pricing.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f2' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="relative min-h-screen">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="relative z-0">{children}</main>
          <Footer />
          <FloatingContact />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}