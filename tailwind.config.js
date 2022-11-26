/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontSize: {
        dynamic: "clamp(3rem, 1.2143rem + 3.5714vw, 5.5rem)",
      },
      screens: {
        'fullhd': '1920px',
        '2k': '2560px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
}
