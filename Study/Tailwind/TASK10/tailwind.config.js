/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'dancing': ['Dancing Script'],
        'oxygen': ['Oxygen']
      },
      blur: {
        'one': '1px'
      },
      grayscale: {
        '50': '50%',
        '75': '75%'
      },
      invert: {
        '6': '60%',
        '8': '80%'
      },
      spacing: {
        '18': '1.125rem'
      }
    },
  },
  plugins: [],
}

