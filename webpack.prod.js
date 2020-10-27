/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackConfigCommon = require('./webpack.common');
const manifest = require('./dll/manifest.json');

module.exports = merge(
  webpackConfigCommon,
  {
    mode: 'production',
    devtool: 'none',
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest,
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, './dll'),
        to: path.resolve(__dirname, './dist'),
      }]),
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
      // new BundleAnalyzerPlugin({
      //   analyzerMode: process.env.ANALYSE ? 'server' : 'disabled',
      // }),
    ],
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
    devServer: {
      outputPath: path.resolve(__dirname, 'dist'),
      host: '172.16.58.54',
      port: 8081,
    },
  },
);
