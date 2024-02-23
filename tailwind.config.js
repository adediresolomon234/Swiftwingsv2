/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xxs: "270px", xs: "350px", ...defaultTheme.screens },
      colors: {
        swWine: "#5C0632",
        swDarkWine: "#54052e",
        swDarkGray: "#5A5A5A",
        swLightGray: "#A4A4A4",
        swLighterGray: "#E9EBF8",
        swBgGray: "#F1F1F1",
        swLightBgGray: "#F6F6F6",
        swLighterBgGray: "#F9F9F9",
        swButter: "#FAF3DD",
        swIndicatorRed: "#F04438",
        swIndicatorGreen: "#17B26A",
      },
    },
  },
  plugins: [],
};
