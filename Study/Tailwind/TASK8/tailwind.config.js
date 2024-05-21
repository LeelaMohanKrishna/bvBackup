/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'pale-red': '#c44554'
      },
      spacing: {
        '19': '19px',
        '3': '3px',
      }
    },
  },
  plugins: [],
}

