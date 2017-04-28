const childProcess = require('child_process')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function local (p) {
  return path.resolve(__dirname, './' + p)
}

function getVersionInfo () {
  const hash = childProcess.execSync('git rev-parse HEAD').toString().trim()
  const description = childProcess.execSync('git describe --dirty --always')
        .toString().trim().replace("'", "\\'")
  return {
    __COMMIT_HASH__: `'${hash}'`,
    __COMMIT_DESCRIPTION__: `'${description}'`,
  }
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
    new webpack.DefinePlugin(getVersionInfo()),
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
      index: 'src/404.html',
    },
  },
}
