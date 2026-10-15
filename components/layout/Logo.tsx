import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="Laptopya home"
      dir="ltr"
      className={`inline-flex items-center select-none ${className}`}
    >
      <Image
        src="/images/logo.webp"
        alt="Laptopya"
        width={120}
        height={40}
        className="h-8 w-auto md:h-10"
        priority
      />
    </a>
  );
}