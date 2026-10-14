import type { Review } from '@/types';
import { timeAgo } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export function Reviews({ reviews, rating, reviewCount }: { reviews: Review[]; rating: number; reviewCount: number }) {
  const breakdown = [5, 4, 3, 2, 1].map((n) => ({
    stars: n,
    count: reviews.filter((r) => r.rating === n).length,
  }));
  const max = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4">
        <div className="font-display text-display-md">{rating.toFixed(1)}</div>
        <div className="text-sm text-brand-muted mt-1">
          Based on {reviewCount} reviews
        </div>
        <div className="mt-6 space-y-2">
          {breakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-3 text-xs font-mono">
              <span className="w-6 text-end">{b.stars}★</span>
              <div className="flex-1 h-px bg-brand-line relative">
                <div
                  className="absolute inset-y-0 start-0 bg-brand-ink"
                  style={{ width: `${(b.count / max) * 100}%` }}
                />
              </div>
              <span className="w-8 text-end text-brand-muted">{b.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 space-y-6">
        {reviews.map((r) => (
          <article key={r.id} className="border-b border-brand-line pb-6 last:border-0">
            <header className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="font-display text-display-sm">{r.title}</div>
                <div className="text-xs font-mono text-brand-muted mt-1">
                  {r.author} · {timeAgo(r.date)} · {r.rating}★
                  {r.verified && <span className="ms-2 text-brand-red">Verified purchase</span>}
                </div>
              </div>
              {r.verified && <Badge tone="red">Verified</Badge>}
            </header>
            <p className="text-body-md text-brand-ink/80">{r.body}</p>
          </article>
        ))}
        {reviews.length === 0 && (
          <div className="text-sm text-brand-muted">No reviews yet. Be the first.</div>
        )}
      </div>
    </div>
  );
}