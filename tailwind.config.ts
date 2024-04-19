import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/**/ui/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-black': '#0C0F16',
        'theme-white': '#fff',

        'theme-primary-100': '#8d8fdb',
        'theme-primary-200': '#494CAA',
        'theme-primary-300': '#292B74',
        'theme-primary-400': '#1a1b41',

        'theme-red-100': '#e718181a',
        'theme-red-200': '#e7181829',
        'theme-red-300': '#FFBBBB',
        'theme-red-400': '#e7181875',
        'theme-red-500': '#E71818',

        'theme-blue-400': '#292b7475',

        'theme-grey-100': '#f8f9fa',
        'theme-grey-200': '#e9ecef',
        'theme-grey-300': '#ced4da',
        'theme-grey-400': '#ADB5BD',
        'theme-grey-500': '#3c3c3cd1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
