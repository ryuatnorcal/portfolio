import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        'dark': '#0f0f0f',
        'bg-dark-500': '#0f0f0f',
        'bg-dark-700': '#000000'
      },
      spacing: {
        '10p': '10rem',
      },
      letterSpacing: {
        'sm': '0.2rem',
        'md': '0.5rem',
      }
    },
  },
};
export default config;
