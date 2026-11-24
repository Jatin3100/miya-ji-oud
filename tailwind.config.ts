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
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        brand: {
          white: "#FFFFFF",
          cream: "#FBF9F5",
          ivory: "#F8F6F0",
          border: "#EAE5D9",
          gold: "#DCA52D",
          goldBright: "#FFB800",
          goldDark: "#B8861B",
          dark: "#1A1A1A",
          charcoal: "#333333",
          muted: "#666666",
          silver: "#B3B3B3",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-cinzel)", "serif"],
      },
      letterSpacing: {
        widest: ".25em",
        luxury: ".2em",
      },
    },
  },
  plugins: [],
};
export default config;
