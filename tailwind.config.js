/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        brand: "#2B5FE0",
        branddark: "#1E3FA8",
        paper: "#F5F6FA",
        amber: "#F2A93B",
        green: "#1E9E6B",
        redx: "#E14B4B",
        line: "#E4E7EF",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
