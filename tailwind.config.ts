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
        background: {
          dark: "#0A0A0A",
          light: "#FAFAF8",
        },
        text: {
          dark: "#F5F5F0",
          light: "#1A1A1A",
          muted: "#6B6B6B",
        },
        accent: {
          gold: {
            DEFAULT: "#C9A96E",
            light: "#D4B87A",
          },
          green: {
            DEFAULT: "#1A6B4F",
            light: "#2D8B6A",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.7s cubic-bezier(0.25, 0.1, 0, 1)",
        "slide-up": "slideUp 0.7s cubic-bezier(0.25, 0.1, 0, 1)",
        "bounce-slow": "bounce 2s infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
