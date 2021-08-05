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
        chatelle: {
          100: '#f4f0f5',
          200: '#e8e1eb',
          300: '#ddd2e2',
          400: '#d1c3d8',
          500: '#c6b4ce',
          600: '#9e90a5',
          700: '#776c7c',
          800: '#4f4852',
          900: '#282429',
        },
        red: {
          100: '#f7d8dd',
          200: '#efb0bb',
          300: '#e8899a',
          400: '#e06178',
          500: '#d83a56',
          600: '#ad2e45',
          700: '#822334',
          800: '#561722',
          900: '#2b0c11',
        },
      },
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
        heading: ['Georama', 'serif'],
        display: ['WindSong', 'cursive'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
