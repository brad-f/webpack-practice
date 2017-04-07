const _ = require('lodash');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

const production = (value) => (
  process.env.NODE_ENV === 'production' ? value : undefined
);

const plugins = () => (
  _.compact([
    new CommonsChunkPlugin({
      name: 'vendor'
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
    production(
      new UglifyJsPlugin({ sourceMap: true })
    )
  ])
);

module.exports = {
  devtool: production('source-map'),
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
  plugins: plugins()
};