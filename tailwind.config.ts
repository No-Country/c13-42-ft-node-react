import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#",
      secondary: "#facc15",
      accent: "#06b6d4",
      accentTeal: "#14b8a6",
      accent2: "#E3E8D8",
      text: "#211E1E",
      darkBackground: "#18181b",
      grayLight: "#d1d5db",
      grayLightSoft: "#f9fafb",
      grayLightSoft_2:"#f3f4f6",
      gray: "#9ca3af",
      grayDark: "#374151",
      blackZinc: "#27272a",
      white: "#ffffff",
      modalBackground: "rgba(0, 0, 0, 0.8)"
    },
  },
  plugins: [],
} satisfies Config;
