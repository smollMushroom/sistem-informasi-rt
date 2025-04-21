/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        base: '14px'
      },
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
      },
      backgroundColor:{
        primary: "#5DC37F"
      }
    },
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};
