import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function CategoryGrid() {
  return (
    <section className="border-b border-brand-line py-12 md:py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-red mb-4">
                · Shop by category
              </div>
              <h2 className="font-display text-display-lg max-w-2xl">
                Built for the way you work, play, and create.
              </h2>
            </div>
            <Link href="/shop" className="btn btn-ghost w-full md:w-auto text-center">
              View all
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Gaming - Dark Ink Gradient */}
          <Reveal className="col-span-12 md:col-span-8">
            <Link
              href="/shop/gaming"
              className="group relative block h-[280px] md:h-auto md:aspect-[16/10] overflow-hidden"
            >
              <Image 
                src="/images/gaming-laptops.webp" 
                alt="Gaming laptops" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/95 via-brand-ink/70 to-brand-ink/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2 md:mb-3">
                  01 · Gaming
                </div>
                <div className="font-display text-lg md:text-display-lg leading-tight">
                  High-FPS, high-refresh.
                </div>
                <div className="text-xs md:text-sm mt-2 md:mt-3 opacity-90 max-w-md line-clamp-2 md:line-clamp-none">
                  OLED panels, discrete GPUs, tuned thermals. For the players who treat the game like a profession.
                </div>
                <div className="mt-3 md:mt-6 link-underline text-xs md:text-sm">Shop gaming laptops</div>
              </div>
            </Link>
          </Reveal>

          {/* Business - Brand Red Gradient */}
          <Reveal delay={0.05} className="col-span-12 md:col-span-4">
            <Link
              href="/shop/business"
              className="group relative block h-[280px] md:h-auto md:aspect-[4/5] overflow-hidden"
            >
              <Image 
                src="/images/business-laptops.webp" 
                alt="Business laptops" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/95 via-brand-red/70 to-brand-red/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2 md:mb-3">
                  02 · Business
                </div>
                <div className="font-display text-lg md:text-display-md leading-tight">
                  All-day battery. Enterprise-ready.
                </div>
                <div className="mt-3 md:mt-4 link-underline text-xs md:text-sm">Shop business laptops</div>
              </div>
            </Link>
          </Reveal>

          {/* Student - Light Paper Gradient (Dark Text) */}
          <Reveal delay={0.1} className="col-span-12 md:col-span-6 lg:col-span-3">
            <Link
              href="/shop/student"
              className="group relative block h-[280px] md:h-auto md:aspect-square border border-brand-line overflow-hidden"
            >
              <Image 
                src="/images/light-laptops.webp" 
                alt="Student laptops" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/95 via-brand-paper/70 to-brand-paper/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-ink">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">
                  03 · Student
                </div>
                <div className="font-display text-base md:text-display-sm leading-tight">
                  Light. Portable. Affordable.
                </div>
                <div className="mt-3 link-underline text-xs">Shop student laptops</div>
              </div>
            </Link>
          </Reveal>

          {/* Creator - Charcoal Gradient */}
          <Reveal delay={0.15} className="col-span-12 md:col-span-6 lg:col-span-3">
            <Link
              href="/shop/creator"
              className="group relative block h-[280px] md:h-auto md:aspect-square overflow-hidden"
            >
              <Image 
                src="/images/creator-laptops.webp" 
                alt="Creator laptops" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/70 to-brand-charcoal/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2">
                  04 · Creator
                </div>
                <div className="font-display text-base md:text-display-sm leading-tight">
                  Color-accurate displays for design, photo, and video.
                </div>
                <div className="mt-3 link-underline text-xs">Shop creator laptops</div>
              </div>
            </Link>
          </Reveal>

          {/* Workstation - Light Paper Gradient (Dark Text) */}
          <Reveal delay={0.2} className="col-span-12 md:col-span-6 lg:col-span-3">
            <Link
              href="/shop/workstation"
              className="group relative block h-[280px] md:h-auto md:aspect-square border border-brand-line overflow-hidden"
            >
              <Image 
                src="/images/Workstation-Laptops.png" 
                alt="Workstation laptops" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-paper/95 via-brand-paper/70 to-brand-paper/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-ink">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-brand-muted mb-2">
                  05 · Workstation
                </div>
                <div className="font-display text-base md:text-display-sm leading-tight">
                  ISV-certified for CAD, 3D, and data.
                </div>
                <div className="mt-3 link-underline text-xs">Shop workstations</div>
              </div>
            </Link>
          </Reveal>

          {/* Accessories - Brand Red Gradient */}
          <Reveal delay={0.25} className="col-span-12 md:col-span-6 lg:col-span-3">
            <Link
              href="/shop/accessories"
              className="group relative block h-[280px] md:h-auto md:aspect-square overflow-hidden"
            >
              <Image 
                src="/images/accessories.webp" 
                alt="Tech accessories" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-red/95 via-brand-red/70 to-brand-red/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-brand-paper">
                <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest opacity-80 mb-2">
                  06 · Accessories
                </div>
                <div className="font-display text-base md:text-display-sm leading-tight">
                  Docks, mice, bags, and essentials.
                </div>
                <div className="mt-3 link-underline text-xs">Shop accessories</div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}