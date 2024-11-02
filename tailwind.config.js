/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#007AFF',
        'icons-gray': '#959595',
        'cyan': '#5AC8FA',
        'gold': '#F1AA05',
        'purple': '#AF51DE',
        'green': '#35C759',
        'red': '#FF4747',
        'separator': '#3C3C435C',
        'label-secondary': '#8E8E93',
        'label-tabbar': '#545458A6',
        'label-date': '#6D6D71',
        'bg-secondary': '#EFEFF3',
        'bg-notification': '#2D2D2DCC',
        'bg-tabbar': '#F1F1F2BF',
        'bg-dark': '#1C1C1E',
        'bg-dark-placeholder': '#2C2C2E'
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)'
      }
    },
  },
  plugins: [],
}