const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './app/index.js'
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CommonsChunkPlugin({
      name: 'vendor'
    }),
    new UglifyJsPlugin(),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};