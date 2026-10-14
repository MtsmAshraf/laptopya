'use client';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  return (
    <div>
      <div role="tablist" className="flex items-center gap-1 border-b border-brand-line overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              'relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              active === t.id ? 'text-brand-ink' : 'text-brand-muted hover:text-brand-ink',
            )}
          >
            {t.label}
            {active === t.id && (
              <span className="absolute inset-x-2 -bottom-px h-px bg-brand-ink" />
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="py-8">
        {current.content}
      </div>
    </div>
  );
}