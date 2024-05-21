/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'serif'],
        'playFair': ['Playfair Display', 'serif']
      },
      colors: {
        'default-blue': '#355c9e',
        'default-black': '#3d3d3d',
        'border-gray': '#bebebe'
      },
      dropShadow: {
        '3xl': '47.543px 63.092px 45px rgba(0, 0, 0, 0.76)',
        '4xl': '15.358px 14.322px 16px rgba(0,0,0,0.41)',
        '5xl': '18.656px 24.758px 21.5px rgba(0,0,0,0.17)',
        'slick': '18.656px 24.758px 21.5px rgba(0,0,0,0.54)'
      },
      backgroundImage: {
        'next': "url('../../src/images/arrowRight.webp')",
        'prev': "url('../../src/images/arrowLeft.webp')",
        'header': "url('../../src/images/backGroundImageMain.webp')",
        'footer': "url('../../src/images/footer.webp')",
        'discover-menu': "url('../../src/images/discoverMenuBackground.webp')"
      },
      spacing: {
        'xxl': '90rem',
        '1328': '83rem',
        '1280': '80rem',
        '1046': '67.375rem',
        '1295': '80.938rem',
        '74': '4.625rem',
        '259': '16.118rem',
        '201': '12.563rem',
        '268': '16.75rem',
        '357': '22.313rem',
        '496': '31rem',
        '355': '22.118rem',
        '450': '28.125rem',
        '634': '39.625rem',
        '619': '38.688rem',
        '170': '10.625rem',
        '173': '10.813rem',
        '276': '17.25rem',
        '283': '17.688rem',
        '767': '47.938rem',
        '389': '24.313rem',
        '378': '23.625rem'
      },
      fontSize: {
        '64': '4rem',
        '89': '5.563rem',
      }
    },
  },
  plugins: [],
}