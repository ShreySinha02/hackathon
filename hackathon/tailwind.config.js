/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgColor:'#003145',
        textColor:'#003145',
        promoDiv:'#002A3B',
        button:'#44924C'

      }
    },
  },
  plugins: [],
}