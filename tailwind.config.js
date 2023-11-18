/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors:
      {
        'shark': '#1a1d22',
        'driftwood': '#aa7b47',
        'jellybean': '#2a75a0',
        'scooter': '#29aed8'
      }
    },
  },
  plugins: [],
}