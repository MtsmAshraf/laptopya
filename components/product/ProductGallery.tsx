'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-square w-20 shrink-0 border transition-colors ${
              active === i ? 'border-brand-ink' : 'border-brand-line'
            }`}
          >
            <Image src={src} alt={`${name} thumb ${i + 1}`} fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
      <div className="col-span-12 md:col-span-10 relative aspect-[4/3] md:aspect-[5/4] bg-brand-line/30 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} image ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-3 end-3 text-xs font-mono uppercase tracking-widest text-brand-paper bg-brand-ink/70 px-2 py-1">
          {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}