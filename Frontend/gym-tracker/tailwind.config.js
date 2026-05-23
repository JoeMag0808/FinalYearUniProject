/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        googleSans: ['Google Sans Flex', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

