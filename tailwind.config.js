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
        css3: '#23A3D8',
        /* ---------------------------------- dark ---------------------------------- */
        dark: '#1a202c',
        'dark-text': '#ffffffeb',
        'dark-button': '#ffffff14',

        /* ---------------------------------- light --------------------------------- */
        'light-text': '#1a202c',
        'light-button': '#E2E8F0',
        /* -------------------------------- Knowledge ------------------------------- */
        react: '#61dafb',
        javascript: '#f8de7e',
        typescript: '#2b7489',
        vue: '#3EAF7C',
        next: '#1c1c1c',
        expo: '#BCC3CD',
        html: '#e34f26',
        node: '#72A962',
        graphql: '#DE33A6',
        apollo: '#490AC2',
        express: '#1c1c1c',
        mongo: '#1E8D4D',
        mysql: '#105E87',
        vscode: '#1676C6',
        postman: '#E66637',
        git: '#E44D2F',
        bootstrap: '#563D7C',
        taildwind: '#38BDF8',
        nativeBase: '#50BFC3'
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
