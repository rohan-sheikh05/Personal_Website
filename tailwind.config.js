/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
      fontFamily: {
        // You can name this whatever you want
        'future': ['Orbitron', 'sans-serif'], 
        'code': ['Fira Code', 'monospace'],
      },

    },
  },
  plugins: [],
};


