const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zilla: ['"Zilla Slab"', 'serif'],
        bungee: ['"Bungee"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'], // Add Outfit font family
      },
      boxShadow: {
        'custom': '0 4px 8px rgba(0, 0, 0, 0.05), 0 -4px 8px rgba(0, 0, 0, 0.1), 4px 0 8px rgba(0, 0, 0, 0.1), -4px 0 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
});