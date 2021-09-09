const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './projects/**/src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        zIndex: {
         '-10': '-10',
        }
      }
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
