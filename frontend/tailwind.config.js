const defaultTheme = require('tailwindcss/defaultTheme');

// Brand colours come from CSS variables (space-separated RGB channels) that the
// active palette sets on the app root, so every brand-* utility follows the theme.
const brand = (n) => `rgb(var(--c${n}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0b0b1a', soft: '#15152e' },
        brand: { 1: brand(1), 2: brand(2), 3: brand(3) },
      },
      fontFamily: {
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        content: '75rem',
      },
      borderRadius: {
        glass: '1.5rem',
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        glass:
          'inset 0 1px 0 0 rgb(255 255 255 / 0.14), 0 1px 2px 0 rgb(0 0 0 / 0.3), 0 16px 48px -16px rgb(0 0 0 / 0.65)',
        glow: 'inset 0 1px 0 0 rgb(255 255 255 / 0.18), 0 0 0 1px rgb(var(--c2) / 0.35), 0 24px 64px -16px rgb(var(--c2) / 0.5)',
        'glow-sm': '0 10px 32px -10px rgb(var(--c1) / 0.7)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(110deg, rgb(var(--c1)), rgb(var(--c2)), rgb(var(--c3)), rgb(var(--c1)))',
        // Outer stops only: keeps dark button text above AA contrast on every palette.
        'brand-button': 'linear-gradient(110deg, rgb(var(--c1)), rgb(var(--c3)), rgb(var(--c1)))',
        grid: 'linear-gradient(rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '56px 56px',
        pan: '200% auto',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(8%, -10%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-6%, 8%, 0) scale(0.94)' },
        },
        pan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 24s ease-in-out infinite',
        'float-slow': 'float 32s ease-in-out infinite',
        pan: 'pan 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
