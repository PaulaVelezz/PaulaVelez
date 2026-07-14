/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        korium: ["T1Korium", "sans-serif"],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};
