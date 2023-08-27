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
      grayLightSoft: "#f9fafb",
      white: "#ffffff",
      modalBackground: "rgba(0, 0, 0, 0.8)",
      whiteLight: "rgb(241 245 249)",
      black: "#000",
    },
  },
  plugins: [],
} satisfies Config;
