'use client';
import { useEffect, useRef, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  format?: (n: number) => string;
}

export function Slider({ min, max, step, value, onChange, format }: SliderProps) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  const trackRef = useRef<HTMLDivElement>(null);

  const pct = (n: number) => ((n - min) / (max - min)) * 100;

  const onPointerDown = (which: 0 | 1) => (e: React.PointerEvent) => {
    const track = trackRef.current!;
    track.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, ev.clientX - rect.left));
      const raw = (x / rect.width) * (max - min) + min;
      const snapped = Math.round(raw / step) * step;
      const next: [number, number] = [...local] as [number, number];
      next[which] = snapped;
      if (next[0] > next[1]) next[which === 0 ? 1 : 0] = next[which];
      setLocal(next);
    };
    const up = () => {
      onChange(local);
      track.releasePointerCapture(e.pointerId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const fmt = format ?? ((n) => String(n));

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-brand-muted">
        <span>{fmt(local[0])}</span>
        <span>{fmt(local[1])}</span>
      </div>
      <div
        ref={trackRef}
        className="relative h-8 select-none touch-none"
        aria-label="Range slider"
      >
        <div className="absolute inset-y-1/2 inset-x-0 h-px bg-brand-line -translate-y-1/2" />
        <div
          className="absolute inset-y-1/2 h-px bg-brand-ink -translate-y-1/2"
          style={{ insetInlineStart: `${pct(local[0])}%`, insetInlineEnd: `${100 - pct(local[1])}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={local[0]}
          onPointerDown={onPointerDown(0)}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-paper border border-brand-ink cursor-grab active:cursor-grabbing"
          style={{ insetInlineStart: `${pct(local[0])}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={local[1]}
          onPointerDown={onPointerDown(1)}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-paper border border-brand-ink cursor-grab active:cursor-grabbing"
          style={{ insetInlineStart: `${pct(local[1])}%` }}
        />
      </div>
    </div>
  );
}