/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0', // Sharp corners by default
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
    },
    extend: {
      colors: {
        // Using CSS variables for themeability
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'background': 'var(--color-background)',
        'background-card': 'var(--color-background-card)',
        'text-main': 'var(--color-text-main)',
        'text-accent': 'var(--color-text-accent)',
        'border': 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Audiowide', 'sans-serif'],
      },
    },
  },
  plugins: [],
}