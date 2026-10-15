'use client';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { ComponentProps } from 'react';

export default function AppLink({ href, children, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  
  // Only modify internal absolute links (e.g., '/shop' -> '/ar/shop')
  // Leave external links (https://...) and anchors (#top) alone
  const localizedHref = typeof href === 'string' && href.startsWith('/') && !href.startsWith(`/${locale}`)
    ? `/${locale}${href}`
    : href;

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}