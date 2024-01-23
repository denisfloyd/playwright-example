/** @type {import('tailwindcss').Config} */
import {colors} from './src/styles/theme';

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
