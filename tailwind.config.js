/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#02AA69',
          'green-light': '#09A768',
          'green-dark': '#018350',
          'green-soft': '#E6F7F0',
          navy: '#001F37',
          'navy-dark': '#001322',
          'navy-light': '#002F54',
          lavender: '#F2EDFD',
          'lavender-soft': '#F8F5FE',
          charcoal: '#111827',
          surface: '#F6F6F6',
          'surface-light': '#FAFAFB',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '64': '64px',
      }
    },
  },
  plugins: [],
}
