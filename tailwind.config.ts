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
      modalBackground: "rgba(0, 0, 0, 0.8)",
<<<<<<< HEAD
      warning: "#ef4444"
=======
      whiteLight: "rgb(241 245 249)",
      black: "#000",
      favoriteGold: "#dd9933",
      loadingImg: "#f5f5f5",
>>>>>>> 4ae1c2bb30954cee91419cf77131f4781809f849
    },
  },
  plugins: [],
} satisfies Config;
