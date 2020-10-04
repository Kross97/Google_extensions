const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './script.js',
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './manifest.json',
          to: 'manifest.json',
        },
      ],
    })
  ],
};
