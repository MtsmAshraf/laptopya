export const siteConfig = {
  name: 'Laptopya',
  tagline: 'Premium laptops and tech.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://laptopya.example',
  currency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'USD',
  support: {
    email: 'hello@laptopya.example',
    phone: '+1 (555) 012-3456',
    whatsapp: '+15550123456',
    hours: 'Mon–Sat · 09:00 – 20:00',
  },
  branches: [
    { city: 'Downtown', address: '221 Market Street, Suite 400', phone: '+1 (555) 012-3401' },
    { city: 'Northgate', address: '88 Harbor Boulevard', phone: '+1 (555) 012-3402' },
    { city: 'Westfield', address: '1400 Ridge Avenue', phone: '+1 (555) 012-3403' },
  ],
};