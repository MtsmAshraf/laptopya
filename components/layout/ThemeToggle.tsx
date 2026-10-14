'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const iconBtnGhost = "flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] border border-brand-line bg-brand-paper text-brand-ink hover:border-brand-ink transition-colors";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <span className={`${iconBtnGhost} opacity-0`} />;
  
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={iconBtnGhost}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 shrink-0">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}