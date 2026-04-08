/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cardiff: {
          red: '#D50032', // Cardiff University Red
          dark: '#231F20', // Cardiff University Black
          grey: '#A7A8AA', // Cardiff University Grey
          light: '#F5F5F5', // Cardiff University Light Gray
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'Arial', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
