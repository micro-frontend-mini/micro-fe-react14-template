/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const { appName } = require('./app-config');

const { NODE_ENV } = process.env;
const library = '[name]_lib';

module.exports = {
  mode: NODE_ENV,
  entry: {
    // 这里一个入口 vendor 就能识别，多个入口就无法识别了，(⊙o⊙)…
    vendor: [
      'redux',
      'react-redux',
      'react-deliverer',
      'classnames',
      'prop-types',
      'js-cookie',
      'axios',
      'lodash',
      'moment',
      'antd',
    ],
  },
  externals: {
    // 这里 external react 主要是为了让 react-dom 对 react 的依赖被拿出去
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: `${appName}-dll.[name].js`,
    library,
  },
  plugins: [
    new webpack.DllPlugin({
      name: library,
      path: path.join(__dirname, './dll/manifest.json'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: false, // 支持ie8
      }, // 混淆
      compress: {
        warnings: false, // 去除警告
        screw_ie8: false, // 支持ie8
        drop_debugger: true,
        // drop_console: true,
      }, // 压缩
      comments: false, // 去除注释
    }),
    new Es3ifyPlugin(),
  ],
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css!postcss-loader!sass-loader',
      },
      {
        include: /(node_modules)/,
        test: /\.(css)$/,
        loader: 'style-loader!css',
      },
      {
        exclude: /(node_modules)/,
        test: /\.(less)$/,
        loader: 'style-loader!css?modules&camelCase&localIdentName=[local]-[hash:base64:5]!postcss-loader!less-loader',
      },
      {
        test: /(fontawesome-webfont|glyphicons-halflings-regular)\.(woff|woff2|ttf|eot|svg)($|\?)/,
        loader: 'url?limit=1024&name=assets/[name].[hash:10].[ext]',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=10000&name=assets/[name].[hash:10].[ext]',
      },
    ],
  },
};
