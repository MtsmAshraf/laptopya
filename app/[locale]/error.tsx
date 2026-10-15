// app/error.tsx
'use client';
import AppLink from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-32 text-center">
      <div className="font-display text-display-xl text-brand-red">Error</div>
      <div className="font-display text-display-md mt-4">Something went wrong</div>
      <p className="mt-4 text-brand-muted max-w-md mx-auto">
        We could not load this page. Please try again, or contact support if the problem persists.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="ghost" href="/">Go home</Button>
      </div>
    </div>
  );
}