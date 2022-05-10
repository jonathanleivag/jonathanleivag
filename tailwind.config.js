module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        /* --------------------------------- social --------------------------------- */
        facebook: '#3b5998',
        linkedin: '#0077B5',
        instagram: '#e1306c',
        twitter: '#1da1f2',
        youtube: '#ff0000',
        /* ---------------------------------- dark ---------------------------------- */
        dark: '#1a202c',
        'dark-text': '#ffffffeb',
        'dark-button': '#ffffff14',

        /* ---------------------------------- light --------------------------------- */
        'light-text': '#1a202c',
        'light-button': '#E2E8F0'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      screens: {
        '3xl': '2560px'
      }
    }
  },
  plugins: []
}
