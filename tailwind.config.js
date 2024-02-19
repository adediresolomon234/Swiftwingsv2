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
        swWine: "#9D005B",
        swDarkWine: "#7B0047",
        swDarkGray: "#5A5A5A",
        swLightGray: "#A4A4A4",
        swBgGray: "#F1F1F1",
        swLightBgGray: "#F6F6F6",
        swButter: "#FAF3DD"
      },
    },
  },
  plugins: [],
};
