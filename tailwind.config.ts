import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0f0f0f',
        'bg-dark-500': '#0f0f0f',
        'bg-dark-700': '#000000'
      },
      minHeight: {
        'screen-footer': 'calc(100vh - 9.85rem)',
      },
      spacing: {
        '5p': '5rem',
        '10p': '10rem',
      },
      letterSpacing: {
        'sm': '0.2rem',
        'md': '0.5rem',
      },
      inset: {
        '100': '-25%',
      }
    },
  },
  plugins: [],
};
export default config;
