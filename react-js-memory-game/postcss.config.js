//postcss.config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    tailwindcss('./tailwindcss.config.js'),
    require('autoprefixer'),
  ],
}
