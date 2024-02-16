/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      maxHeight: {
        30: '120px'
      },
      colors: {
        bg_primary: '#f3f4f6'
      }
    }
  },
  plugins: [require('daisyui')]
}
