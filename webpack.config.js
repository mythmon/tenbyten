const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function local (p) {
  return path.resolve(__dirname, './' + p)
}

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      'normalize.css',
      'semantic-ui-css/semantic.css',
      './src/style.css',
      './src/index.js',
    ],
  },

  devtool: 'sourcemap',

  plugins: [
    new HtmlWebpackPlugin(),
    // Only include english locale in moment
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
  ],

  performance: {
    hints: false,
  },

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
        test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    alias: {
      tenbyten: local('src'),
    },
  },
}
