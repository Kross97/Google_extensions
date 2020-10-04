const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    content: './script.js',
    background: './background.js',
    popup: './popup.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './',
              useRelativePath: true,
            },
          },
        ],
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
        {
          from: './google.png',
          to: 'google.png',
        },
        {
          from: './popup.html',
          to: 'popup.html',
        },
      ],
    })
  ],
};
