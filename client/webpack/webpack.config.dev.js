const merge = require('webpack-merge');
const baseConfig = require('./base.config.js').config;
const loaderInclude = ('./base.config.js').loaderInclude;

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        include: loaderInclude,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
})