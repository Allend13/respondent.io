const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appPath = path.resolve(__dirname, '../src')
const antd = path.resolve(__dirname, '../node_modules/antd/dist')
const stylesPath = path.resolve(__dirname, '../src/less')
const loaderInclude = [antd, stylesPath, appPath]

module.exports.config = {
  context: appPath,
  entry: {
    app: './app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle-[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [appPath],
        loader: 'eslint-loader',
        options: {
          eslintPath: 'eslint',
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: loaderInclude
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before less-loader if necessary
          use: ['css-loader', {loader: 'postcss-loader'}, 'less-loader'],
        }),
        include: loaderInclude
      },
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new ExtractTextPlugin({
      filename: 'style-[contenthash].css'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
  ],
  resolve: {
    alias: {
      less: path.resolve(__dirname, '../src/less'),
      ui: path.resolve(__dirname, '../src/components/ui'),
    }
  }
}

module.exports.appPath = appPath
module.exports.loaderInclude = loaderInclude
module.exports.webpack = webpack