const { BUILD_ENV } = process.env;
const { appName, devServerPort } = require('./app-config');

let publicPath;
switch (BUILD_ENV) {
  case 'dev':
  case 'mock':
    // 本地开发（主项目 + 子项目联调模式）
    publicPath = `//localhost:${devServerPort}/`;
    break;
  case 'sit':
    // 线上：测试环境
    publicPath = `//teacher.test.mistong.com/bend/${appName}/`;
    break;
  case 'pre':
  case 'prod':
    // 线上：预发和生产环境
    publicPath = `//teacher.ewt360.com/bend/${appName}/`;
    break;
  default:
    // 默认值，主要应用于本地独立开发
    publicPath = '/';
}

// webpack 的自由变量，控制 publicPath，效果同 webpack 配置文件中的 publicPath
// eslint-disable-next-line camelcase
__webpack_public_path__ = publicPath;
