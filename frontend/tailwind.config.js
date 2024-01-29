/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
