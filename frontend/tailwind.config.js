/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "serif"],
        exo: ["Exo 2", "sans-serif"],
      },
      backgroundColor: {
        primary: "#002f5b",
        secondary: "#012c57",
      },
      colors: {
        primary: "#002f5b",
        secondary: "#012c57",
        gray: "#495057",
        textGray: "#4b4b4b",
        light: "#34536e",
        lighter: "#2f76b1",
        dark: "#012243",
        darker: "#00152a",
        // yellow: "#fcd315",
        borderColor: "#D0D5DD",
      },
      boxShadow: {
        custom: "0 0 10px #b3b3b3",
        custom0: "0px 4px 12px 0px #10182814",
        custom1: "0px 4px 16px 0px #0000001F",
        custom2: " 0px 1px 2px 0px #1018280D",
      },
    },
  },
  plugins: [],
};

