import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  tone = 'default',
  className,
}: {
  children: ReactNode;
  tone?: 'default' | 'red' | 'ink' | 'muted';
  className?: string;
}) {
  const tones = {
    default: 'bg-brand-paper border-brand-line text-brand-ink',
    red: 'bg-brand-red border-brand-red text-brand-paper',
    ink: 'bg-brand-ink border-brand-ink text-brand-paper',
    muted: 'bg-brand-paper border-brand-line text-brand-muted',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 text-[0.6875rem] uppercase tracking-[0.14em] font-mono',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}