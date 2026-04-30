/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#101010',
        'brand-primary': '#B7EF02',
        'brand-light': '#ffffff',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        serif: ['Federo', 'serif'],
      }
    },
  },
  plugins: [],
}
