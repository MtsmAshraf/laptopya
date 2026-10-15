import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always' // Forces /en and /ar prefixes, fixing the root redirect issue
});

export const config = {
  // This matcher ensures the middleware runs on the root and all localized paths
  matcher: ['/', '/(ar|en)/:path*']
};