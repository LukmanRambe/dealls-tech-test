/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      '--primary': 'var(--primary)',
      '--primary-10': 'var(--primary-10)',
      '--primary-20': 'var(--primary-20)',
      '--primary-50': 'var(--primary-50)',
      '--primary-90': 'var(--primary-90)',
      '--black': 'var(--black)',
    },
  },
};
export const plugins = [
  plugin(function ({ matchVariant }) {
    matchVariant(
      'nth',
      (value) => {
        return `&>*:nth-child(${value})`;
      },
      {
        values: {
          1: '1',
          2: '2',
          3: '3',
        },
      }
    );
  }),
];
