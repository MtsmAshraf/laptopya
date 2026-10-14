export function SpecsTable({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs);
  return (
    <div className="border border-brand-line">
      {entries.map(([k, v], i) => (
        <div
          key={k}
          className={`grid grid-cols-12 gap-4 px-5 py-4 ${i !== entries.length - 1 ? 'border-b border-brand-line' : ''}`}
        >
          <div className="col-span-4 md:col-span-3 text-xs font-mono uppercase tracking-widest text-brand-muted">
            {k}
          </div>
          <div className="col-span-8 md:col-span-9 text-sm">{v}</div>
        </div>
      ))}
    </div>
  );
}