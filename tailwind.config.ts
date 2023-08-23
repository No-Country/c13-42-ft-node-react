import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#",
      secondary: "#facc15",
      accent: "#06b6d4",
      text: "#211E1E",
      darkBackground: "#18181b",
      grayLight: "#d1d5db",
      white: "#ffffff"
    },
  },
  plugins: [],
} satisfies Config;
