/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // You can name this whatever you want
        'future': ['Orbitron', 'sans-serif'], 
        'code': ['Fira Code', 'monospace'],
      },

    },
  },
  plugins: [],
};


