/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['Dancing Script'],
        'oxygen': ['Oxygen']
      },
      colors: {
        'light-gray': '#c7c9c9',
        'dark-blue': '#12163d',
        'text-blue': '#3c4178',
      },
      spacing: {
        '3': '9px',
        '5': '15px',
      }
    },
  },
  plugins: [],
}

