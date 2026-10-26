const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    // Adding custom colors for Hon. Dr. Ghali Panda's brand
    extend: {
      colors: {
        'hon-green': '#0B7A4B',
        'hon-gold': '#D4AF37',
        'hon-light': '#F7F8F5',
        'hon-dark': '#111827',
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        brand: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d4',
          300: '#86efb1',
          400: '#4ade87',
          500: '#22c564',
          600: '#16a34e',
          700: '#15803f',
          800: '#166536',
          900: '#14532e',
          950: '#052e16',
        },
        gold: {
          50: '#fdfbf6',
          100: '#f9f5e8',
          200: '#f1e8d0',
          300: '#e5d4ad',
          400: '#d4bc82',
          500: '#c5a358',
          600: '#b58a45',
          700: '#976c36',
          800: '#7e5831',
          900: '#68492c',
        },
        offwhite: '#fafaf9',
        charcoal: '#171717',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.05)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.15)',
        'glass-glow': '0 0 20px 0 rgba(22, 163, 78, 0.2)',
        'glow-gold': '0 0 25px 0 rgba(181, 138, 69, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Custom animations for admin login and sticker generator
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        revealUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        shake: 'shake 0.5s',
        float: 'float 3s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        revealUp: 'revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '24px',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
