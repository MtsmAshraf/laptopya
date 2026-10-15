import AppLink from '@/components/ui/AppLink';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-mono uppercase tracking-widest text-brand-muted">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
        <li><AppLink href="/" className="link-underline">Home</AppLink></li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-x-2">
            <span aria-hidden>/</span>
            {c.href ? (
              <AppLink href={c.href} className="link-underline">{c.label}</AppLink>
            ) : (
              <span className="text-brand-ink">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}