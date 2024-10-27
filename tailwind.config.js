/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#007AFF',
        'icons-gray': '#959595'
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)'
      }
    },
  },
  plugins: [],
}