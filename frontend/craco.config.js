const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@services': resolvePath('./src/services'),
    },
  },
};
