import Image from 'next/image';

export function ProductImage({
  src,
  alt,
  className,
  zoom = false,
}: {
  src: string;
  alt: string;
  className?: string;
  zoom?: boolean;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={`object-cover transition-transform duration-700 ease-out ${
          zoom ? 'group-hover:scale-105' : ''
        }`}
      />
    </div>
  );
}