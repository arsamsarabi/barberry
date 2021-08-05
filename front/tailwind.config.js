module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  purge: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        common: {
          black: '#15191d',
          white: '#fbfdfd',
        },
        fiord: '#082032',
      },
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
        heading: ['Georama', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
