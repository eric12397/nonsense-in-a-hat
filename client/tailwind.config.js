const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#fff',
      'fade': '#f1f2f80c',
      'silver': '#f3f3f3',
      'gray': colors.gray,
      'midnight': '#282c34',
      'salmon' : '#fe7470',
      'coral': '#fb8260',
      'green': colors.green
    },
  },
  plugins: [],
}
