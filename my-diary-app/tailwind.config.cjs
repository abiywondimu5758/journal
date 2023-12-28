/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { typewindTransforms } = require("typewind/transform");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
    transform: typewindTransforms,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

