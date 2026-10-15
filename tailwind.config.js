
const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: 'rgb(var(--brand-red) / <alpha-value>)',
          charcoal: 'rgb(var(--brand-charcoal) / <alpha-value>)',
          ink: 'rgb(var(--brand-ink) / <alpha-value>)',
          paper: 'rgb(var(--brand-paper) / <alpha-value>)',
          muted: 'rgb(var(--brand-muted) / <alpha-value>)',
          line: 'rgb(var(--brand-line) / <alpha-value>)',
        },
      }, fontFamily: {
        display: ['var(--font-display)', 'var(--font-arabic)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'var(--font-arabic)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'var(--font-arabic)', 'ui-monospace', 'monospace'], // <-- ADDED ARABIC FALLBACK
        arabic: ['var(--font-arabic)', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 6vw + 1rem, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4vw + 0.75rem, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 2.5vw + 0.5rem, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-lg': ['clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', { lineHeight: '1.55' }],
        'body-md': ['clamp(0.9375rem, 0.25vw + 0.875rem, 1rem)', { lineHeight: '1.55' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', textTransform: 'uppercase' }],
      },
      borderRadius: {
        hair: '2px',
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        hair: '0 0 0 1px rgb(var(--brand-line))',
        soft: '0 1px 2px rgb(var(--brand-ink) / 0.04), 0 8px 24px rgb(var(--brand-ink) / 0.06)',
        lift: '0 24px 48px rgb(var(--brand-ink) / 0.12)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '30%': { transform: 'translate(1%, -3%)' },
          '50%': { transform: 'translate(-1%, 2%)' },
          '70%': { transform: 'translate(3%, 1%)' },
          '90%': { transform: 'translate(-2%, 3%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        grain: 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
};
export default config;