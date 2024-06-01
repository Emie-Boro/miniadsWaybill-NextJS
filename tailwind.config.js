/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: '#757AB1',
      semi: '#A4A7CB',
      light: '#D3D4E6',
      white: '#ffff',
      black: '#00000'
    },
    screens: {
      sm: {'max': '480px'},
      md: {'min': '481px', 'max': '768px'},
      lg: {'min': '769px'}
    },
    extend: {},
  },
  plugins: [],
};
