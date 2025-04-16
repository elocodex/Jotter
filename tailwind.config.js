/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Anims
      animation: {
        'gradient-flow': 'gradient-flow 15s ease infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '25%': { 'background-position': '50% 100%' },
          '50%': { 'background-position': '100% 50%' },
          '75%': { 'background-position': '50% 0%' },
        },
      },
      backgroundSize: {
        'size-300': '300% 300%',
      },
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

