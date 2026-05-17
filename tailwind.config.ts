import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(217 20% 25%)",
        input: "hsl(217 20% 25%)",
        ring: "hsl(262 83% 58%)",
        background: "hsl(220 10% 3%)",
        foreground: "hsl(210 40% 98%)",
        primary: {
          DEFAULT: "hsl(262 83% 58%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(217 20% 15%)",
          foreground: "hsl(210 40% 98%)",
        },
        card: {
          DEFAULT: "hsl(220 10% 8%)",
          foreground: "hsl(210 40% 98%)",
        },
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, hsl(210 40% 98% / 0.08) 50%, transparent 100%)",
      },
      backgroundSize: {
        shimmer: "200% 100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;