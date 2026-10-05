/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#1a1714", soft: "#5c554d", faint: "#9a928a" },
        paper: { DEFAULT: "#faf8f5", dim: "#f1ede6", line: "#e4ded4" },
        accent: { DEFAULT: "#b4532a", dark: "#8f3f1e" },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "slide-in": { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        "fade-in": { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        shimmer: "shimmer 1.4s infinite",
        "slide-in": "slide-in 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};
