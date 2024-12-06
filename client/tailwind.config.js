/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: { dark: "linear-gradient(135deg, #152238, #251a34)" },
    },
  },
  plugins: [],
};
