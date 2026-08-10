/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          500: '#172a52',
          600: '#0f1d3a',
          700: '#091225',
          gold: '#d4af37',
        },
      },
    },
  },
  plugins: [],
};
