module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
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
