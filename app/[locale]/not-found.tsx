// app/not-found.tsx
import AppLink from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <div className="font-display text-display-xl text-brand-red">404</div>
      <div className="font-display text-display-md mt-4">Page not found</div>
      <p className="mt-4 text-brand-muted max-w-md mx-auto">
        The page you are looking for does not exist, or has been moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button href="/">Go home</Button>
        <Button variant="ghost" href="/shop">Browse shop</Button>
      </div>
    </div>
  );
}