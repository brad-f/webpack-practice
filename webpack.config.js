const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;


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
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader'
      })
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor'
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new UglifyJsPlugin(),
  ]
};