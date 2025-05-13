/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        header: '26px',
        title: '30px',
        header2: '22px',
        header3: '20px',
        header4: '18px',
        normal: '16px'
      },
      borderColor:{
        primary: '#5DC37F',
        secondary: '#E9E9E9',
        // secondary: '#E9E9E9',
      },
      textColor: {
        primary: '#5DC37F',
        white: '#fff',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundColor:{
        primary: "#5DC37F",
        secondary: '#f5f5f5',
        white: '#fff',
      }
    },
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
};
