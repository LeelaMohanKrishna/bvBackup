/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'pale-green': '#14c95d'
      },
      spacing: {
        '21': '21px',
        '3': '3px',
      }
    },
  },
  plugins: [],
}

