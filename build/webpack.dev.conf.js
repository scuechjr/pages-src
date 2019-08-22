'use strict';
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  devServer: {
    disableHostCheck: true,
    contentBase: utils.resolve('dist/pages'),
    hot: true,
    inline: true,
    port: 7001,
    host: 'localhost',
    clientLogLevel: 'info',
    open: true,
  },
  plugins: [
    ...baseWebpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static'),
        to: utils.resolve('dist/pages/static')
      }
    ]),
    new webpack.DefinePlugin({
      'MODE_ENV': '"development"'
    })
  ]
});
