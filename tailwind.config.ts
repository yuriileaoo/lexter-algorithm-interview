/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
      extend: {
        colors: {
          primary: { default: "#8cd5ad" },
          secondary: { default: "#95F3A0" },
          white: { default: "#FFFFFF" },
          background: { default: "#16232C" }
        },
      },
  },
  plugins: [],
}

