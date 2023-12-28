const { typewindTransforms } = require("typewind/transform");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
    transform: typewindTransforms,
  },
  theme: {
    extend: {
      fontFamily: {
        custom: ['Bebas-Neue'],
      },
      colors:{
        colorCustom: "#ffffff",
        primaryPink: "#FF007A",
        primaryDarkBlue: "#006CEA",
        lightBlueS1: "#F4FAFF",
        lightBlueS2: "#E6F4FF",
        lightBlueS3: "#E2ECF4",
        white: "#FFFFFF",
        lightGray: "#F7F7F7",
        darkGray: "#A2A2A2",
        black: "#000000",
        blackS1:"#101010",
      },
      screens: {
        // Adjust this as per the design
        xs: { max: "319px" },
        mobile: { min: "320px", max: "639px" },
        tablet: { min: "640px", max: "1023px" },
        laptop: { min: "1024px", max: "1279px" },
        desktop: { min: "1280px", max: "1535px" },
        ultrawide: { min: "1536px" },
      },
    },
  },
  plugins: [],
};
