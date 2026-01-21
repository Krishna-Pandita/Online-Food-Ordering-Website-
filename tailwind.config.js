/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // all your React components
  ],
  theme: {
    extend: {},
  },
   colors: {
        cream: "#FFF8DC",        // soft cream
        softCream: "#FAF3E0",    // warm cream
        foodCream: "#FDF5E6",    // Swiggy-like
      },
  plugins: [],
};
