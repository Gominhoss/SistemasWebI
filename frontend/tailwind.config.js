/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'icea-navy': '#001f3f', // Azul Marinho Institucional
        'icea-gray': '#dddddd', // Cinza Institucional
      },
    },
  },
  plugins: [],
}