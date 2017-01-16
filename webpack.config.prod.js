const webpack = require('webpack')

const baseConfig = require('./webpack.config.js')

let config = Object.assign({}, baseConfig)

// Enable React dev mode
config.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
  },
}))

// Put libraries in a separate bundle
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: module => /node_modules/.test(module.resource),
}))

// Include hashes in filenames
config.output.filename = '[name]-[hash].js'
// For github pages deployments. Can this be avoided?
config.output.publicPath = '/tenbyten/'

// no dev server
delete config.devServer

module.exports = config