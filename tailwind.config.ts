import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fe5f32',
      },
      fontFamily: {
        damion: ['var(--font-damion)'],
      },
      boxShadow: {
        popular: '0px 0px 4px 0px #A2FF8640',
      },
    },
  },
  plugins: [],
};
export default config;
