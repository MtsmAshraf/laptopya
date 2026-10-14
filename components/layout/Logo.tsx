export function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="Laptopya home"
      className={`inline-flex items-baseline select-none ${className}`}
    >
      <span className="font-display font-bold tracking-tight text-brand-charcoal dark:text-brand-ink">
        Lapto
      </span>
      <span className="font-display font-bold tracking-tight text-brand-red">pya</span>
      <span className="hidden sm:inline ms-1 font-mono text-[0.625rem] tracking-widest text-brand-muted align-middle">
        ®
      </span>
    </a>
  );
}