import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
// import load from '~/utils/load';
// 动态控制 webpack 的 publicPath 变量，此文件为必须依赖
import '../publick-path';
// import Root from './routes/Root';
// import Hello from './routes/Hello';
// import AppRoute from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // provinces: [],
    };
  }

  componentDidMount() {
    // this.fetchProvince();
    // message.success('welcome');
  }

  render() {
    const {
      hello,
    } = this.props;
    return (
      <Provider store={{}}>
        <Router history={hashHistory}>
          <Route
            path="/react14/home"
            hello={hello}
            getComponent={(location, callback) => {
              require.ensure([], (require) => {
                callback(null, require('./routes/Root').default);
              });
            }}
          />
          <Route
            path="/react14/hello"
            getComponent={(location, callback) => {
              require.ensure([], (require) => {
                callback(null, require('./routes/Hello').default);
              });
            }}
          />
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  hello: PropTypes.string,
};

App.defaultProps = {
  hello: null,
};

export default App;
