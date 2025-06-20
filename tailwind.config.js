/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        productsans: ['"Product Sans"', "sans-serif"],
        AlbertSans: ['"Albert Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
