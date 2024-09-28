/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors
      colors:{
        primary: '#333333',
        secondary: '#666666',
        darkPrimary: '#141414'
      }
    },
  },
  plugins: [],
}

