import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {
      colors: {
        primary: "#",
        secondary: "#facc15",
        accent: "#06b6d4",
        accentTeal: "#14b8a6",
        accent2: "#E3E8D8",
        accent3: "#9333ea",
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
        warning: "#ef4444",
        whiteLight: "rgb(241 245 249)",
        black: "#000",
        favoriteGold: "#dd9933",
        loadingImg: "#f5f5f5",
        tremor: {
          brand: {
            faint: "#eff6ff", // blue-50
            muted: "#bfdbfe", // blue-200
            subtle: "#60a5fa", // blue-400
            DEFAULT: "#3b82f6", // blue-500
            emphasis: "#1d4ed8", // blue-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
      },
    },
  },
    plugins:  [require("@headlessui/tailwindcss")],
} satisfies Config;
