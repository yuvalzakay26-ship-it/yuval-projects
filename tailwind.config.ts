import type { Config } from "tailwindcss";

// Colors are driven by CSS variables (RGB channel triplets) so the same
// utility classes work in both the dark and light themes, and Tailwind's
// opacity modifiers (e.g. text-fg/60) keep working via <alpha-value>.
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: withAlpha("--color-bg"),
        surface: withAlpha("--color-surface"),
        "surface-2": withAlpha("--color-surface-2"),
        border: withAlpha("--color-border"),
        accent: withAlpha("--color-accent"),
        "accent-soft": withAlpha("--color-accent-soft"),
        fg: withAlpha("--color-fg"),
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
