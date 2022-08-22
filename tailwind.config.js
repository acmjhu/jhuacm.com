let plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        frame_landing: 'calc(100vh - 48px)',
        frame: 'calc(100% - 49px)',
      },
      width: {
        frame: 'calc(100% - 5px)',
      },
    },
  },
  plugins: [require('tailwindcss-children')],
};
