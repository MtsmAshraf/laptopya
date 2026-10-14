export function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, JSX.Element> = {
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" strokeLinejoin="round" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeLinejoin="round" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[name] ?? null;
}