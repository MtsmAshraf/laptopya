import { cn } from '@/lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-brand-line/60 animate-pulse rounded-hair',
        className,
      )}
      aria-hidden
    />
  );
}