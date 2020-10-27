/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { appName } = require('./app-config');

const { NODE_ENV, BUILD_ENV } = process.env;

module.exports = {
  entry: path.resolve(__dirname, './src/App'),
  output: {
    filename: `${appName}.js`,
    chunkFilename: '[id].[name].bundle.js',
    // publicPath: '/', // publicPath 会在项目中动态生成，此处无需设置
    path: path.resolve(__dirname, 'dist'),
    library: appName,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  target: 'web',
  externals: {
    // 除了 react 和 react-router external 生效之外
    // 其他的模块都无法和主项目共享，目测可能是 webpack 版本不一致导致的问题
    // 经验证 webpack 版本一致的时候，external 都是可以共享的
    // 所以其他的都放进了 dll 文件夹
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV),
    }),
  ],
  optimization: {
    removeAvailableModules: false, // 官方建议，提升构建性能，v4 默认打开，v5 默认禁用，所以这里改为禁用
  },
  devServer: {
    // hot: true,
    disableHostCheck: true,
    contentBase: './dist',
  },
};
