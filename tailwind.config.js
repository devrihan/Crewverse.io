/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#39FF14',
      },
      animation: {
        'grid-flow': 'gridMove 20s linear infinite',
      },
    },
  },
  plugins: [],
};