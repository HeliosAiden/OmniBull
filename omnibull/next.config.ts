import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  darkMode: 'class', // Use class-based dark mode
  theme: {
    extend: {
      colors: {
        // DARK THEME COLORS
        dark: {
          bg: '#031A32',
          accent: '#00FFD1',
          highlight: '#F9F871',
          text: '#9A9A9A',
        },
        // LIGHT THEME COLORS
        light: {
          bg: '#F9FAFB',
          primary: '#005C73',
          success: '#16C784',
          highlight: '#FDC500',
        },
      },
    },
  },
  plugins: [],
};

export default nextConfig;
