/** @type {import('tailwindcss').Config} */
const config: import('tailwindcss').Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // adjust for your file structure
  ],
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      colors: {
        background: {
          paper: "#000000",
          card: "#1A1F28",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#9A9A9A",
        },
        pallete: {
          primary: "#16C784",
          secondary: "#FF4D4D",
          hover: "#22D69F",
        },
        stroke: "#333333",
      },
    }
  },
  plugins: [],
};

export default config;
