/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'teal-green': '#11ada8'
      },
      spacing: {
        '50': '50px',
        '13': '13px'
      }
    },
  },
  plugins: [],
}

