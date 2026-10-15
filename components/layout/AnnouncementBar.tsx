'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function AnnouncementBar() {
  const t = useTranslations('Announcement');
  const [idx, setIdx] = useState(0);
  
  // We use an array of keys to map to translations
  const messageKeys = ['msg1', 'msg2', 'msg3'];

  useEffect(() => {
    const tInterval = setInterval(() => setIdx((i) => (i + 1) % messageKeys.length), 5000);
    return () => clearInterval(tInterval);
  }, []);

  return (
    <div className="border-b border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page flex items-center justify-between h-9 gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest overflow-hidden">
        <div className="flex-1 min-w-0 truncate">
          <span className="block truncate">{t(messageKeys[idx])}</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-brand-paper/70 shrink-0">
          <a href="/store-locator" className="link-underline">{t('storeLocator')}</a>
          <a href="/support" className="link-underline">{t('support')}</a>
          <a href="/trade-in" className="link-underline">{t('tradeIn')}</a>
        </div>
      </div>
    </div>
  );
}