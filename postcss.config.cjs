const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecss({
      content: [
        './index.html',
        './src/**/*.{vue,js,ts}',
        './public/**/*.html',
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [],
        deep: [],
        greedy: [],
      },
    }),
  ],
};
