'use client';
import { useEffect, useState } from 'react';

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const messages = [
    'Free shipping on orders over $150',
    'Student discount: 10% off with code CAMPUS26',
    'Trade in your old laptop. Get a quote in 60 seconds.',
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 5000);
    return () => clearInterval(t);
  }, [messages.length]);
  return (
    <div className="border-b border-brand-line bg-brand-ink text-brand-paper">
      <div className="container-page flex items-center justify-between h-9 gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest overflow-hidden">
        <div className="flex-1 min-w-0 truncate">
          <span className="block truncate">{messages[idx]}</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-brand-paper/70 shrink-0">
          <a href="/store-locator" className="link-underline">Store locator</a>
          <a href="/support" className="link-underline">Support</a>
          <a href="/trade-in" className="link-underline">Trade-in</a>
        </div>
      </div>
    </div>
  );
}