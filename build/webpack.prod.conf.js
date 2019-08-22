'use strict';
const utils = require('./utils');
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {VueLoaderPlugin} = require('vue-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  plugins: [
    ...baseWebpackConfig.plugins,
    // new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name]/index.[hash:6].js',
    //   chunkFilename: '[id].css',
    //   minimize: true
    // }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: utils.resolve('static'),
        to: utils.resolve('dist/pages/static')
      },
      // {
      //   from: utils.resolve('/src/images'),
      //   to: utils.resolve('/dist/pages/images')
      // }
    ]),
    new ExtractTextPlugin( {
      // 多入口时，需要使用name或hash值来确定打包出的css文件名，这样不会覆盖
      filename: '[name]/index[hash:6].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': '"production"'
    }),
  ]
});
