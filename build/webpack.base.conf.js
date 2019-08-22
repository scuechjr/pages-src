'use strict';
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const pages = require('./page-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {};
const plugins = [];

Object.keys(pages).forEach(k => {
  const page = pages[k];
  entry[k] = page.entry;
  plugins.push(new HtmlWebpackPlugin({
    template: page.template,
    filename: k + '/index.html',
    chunks: [k]
  }));
});
plugins.push(new HtmlWebpackPlugin({
  template: pages.home.template,
  filename: 'index.html',
  chunks: ['home']
}));

module.exports = {
  entry,
  output: {
    path: utils.resolve('dist/pages'),
    filename: '[name]/index[hash:6].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    ...plugins
  ]
};
