const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function local (p) {
  return path.resolve(__dirname, './' + p)
}

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      'normalize.css',
      './src/style.css',
      './src/index.js',
    ],
  },

  devtool: 'sourcemap',

  plugins: [
    new HtmlWebpackPlugin(),
    new CopyWebpackPlugin([{from: local('api'), to: 'api'}]),
  ],

  output: {
    path: local('build'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    alias: {
      thedoc: local('src'),
    },
  },
}
