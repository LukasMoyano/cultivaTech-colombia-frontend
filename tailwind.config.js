/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cultiva-green-main': '#386640',
        'cultiva-green-secondary': '#5a994e',
        'cultiva-earth-main': '#a76b55',
        'cultiva-earth-accent-critical': '#bc4748',
        'cultiva-earth-accent-warning': '#f3a261',
        'cultiva-bg-light': '#f1e8cf',
        'cultiva-text-main': '#212528',
        'cultiva-text-secondary': '#5c757d',
        'cultiva-text-light': '#f1e8cf',
        'cultiva-text-white': '#ffffff',
      }
    },
  },
  plugins: [],
}