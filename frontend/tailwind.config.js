const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zilla: ['"Zilla Slab"', 'serif'],
        outfit: ['Outfit', 'sans-serif'], // Add Outfit font family
      },
    },
  },
  plugins: [],
});