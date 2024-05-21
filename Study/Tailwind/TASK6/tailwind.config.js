/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'teal-blue': '#287eb0'
      },
      spacing: {
        '21': '21px',
        '3': '3px',
      }
    },
  },
  plugins: [],
}

