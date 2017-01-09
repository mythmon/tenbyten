const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function local (p) {
  return path.resolve(__dirname, './' + p)
}

module.exports = {
  entry: {
    main: [
      './src/404.js',
      'babel-polyfill',
      'normalize.css',
      'semantic-ui-css/semantic.css',
      './src/style.css',
      './src/index.js',
    ],
  },

  devtool: 'sourcemap',

  plugins: [
    new HtmlWebpackPlugin({
      title: '10x10',
      template: 'src/index.ejs',
    }),
    new HtmlWebpackPlugin({
      title: '404',
      filename: '404.html',
      template: 'src/404.html',
    }),
    // Only include english locale in moment
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
  ],

  performance: {
    hints: false,
  },

  output: {
    path: local('build'),
    filename: '[name].js',
    publicPath: '/',
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

  devServer: {
    historyApiFallback: {
      index: 'build/index.html',
    },
  },
}
