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
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          900: "#0c4a6e",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          900: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
