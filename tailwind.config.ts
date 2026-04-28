import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tz: {
          dark: "#0A0A0F",
          darker: "#060608",
          orange: "#FF6B1A",
          yellow: "#FFD600",
          blue: "#3B9EFF",
          red: "#FF2D55",
          card: "#12121A",
          border: "#1E1E2E",
          muted: "#6B7280",
          text: "#F0EFE8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
