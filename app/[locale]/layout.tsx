import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter_Tight, JetBrains_Mono, Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import './globals.css';
import { Providers } from '@/components/providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { siteConfig } from '@/lib/config';
import icon from './favicon.ico';

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Inter_Tight({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const arabic = Cairo({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t('title'), template: `%s · ${siteConfig.name}` },
    description: t('description'),
    icons: { icon: icon.src },
    openGraph: { type: 'website', locale: locale === 'ar' ? 'ar_EG' : 'en_US', url: siteConfig.url, siteName: siteConfig.name, title: siteConfig.name, description: t('description') },
  };
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };
export function generateStaticParams() { return [{ locale: 'en' }, { locale: 'ar' }]; }

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!['en', 'ar'].includes(locale)) notFound();

  // --- THE FIX: Import messages directly based on the URL locale ---
  const messages = (await import(`@/messages/${locale}.json`)).default;
  // ---------------------------------------------------------------

  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`}>
      <body className={isRtl ? 'font-arabic' : 'font-body'}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <AnnouncementBar />
            <Header />
            <main className="relative z-0">{children}</main>
            <Footer locale={locale} />
            <FloatingContact />
            <CookieConsent />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}