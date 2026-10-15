'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    
    // If the path starts with the current locale (e.g., /ar/shop), replace it.
    // Otherwise, just prepend the new locale.
    let newPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`;
    }
    
    router.push(newPath || '/');
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] border border-brand-line bg-brand-paper text-brand-ink hover:border-brand-ink transition-colors"
      aria-label="Switch language"
    >
      <span className="text-xs font-bold font-display">
        {/* If currently English, show Arabic letter. If Arabic, show EN. */}
        {locale === 'en' ? 'ع' : 'EN'}
      </span>
    </button>
  );
}