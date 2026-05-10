/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17201b",
        moss: "#355f4f",
        mint: "#d8f3dc",
        coral: "#ef6f5e",
        amber: "#f0b44c",
        cloud: "#f7f8f5"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(23, 32, 27, 0.08)"
      }
    },
  },
  plugins: [],
};
