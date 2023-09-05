/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      customRed: '#FF6961',
      customGreen: '#77DD77',
    }
  },
};
export const plugins = [];

