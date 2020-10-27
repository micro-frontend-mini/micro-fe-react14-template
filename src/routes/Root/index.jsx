import React from 'react';
import {
  Button,
} from 'antd';
import moment from 'moment';
import classnames from 'classnames';

import './style.scss';

const App = () => (
  <div className="react14-root">
    我是
    <h1>Reactv14</h1>
    项目的
    <h1>根</h1>
    路由
    <br />
    <br />
    <br />
    <button type="button">10，我是 React14 跟路由</button>
    <Button className={classnames('btn')} type="primary">希特11</Button>
    时间：
    {moment().format('YYYY-MM-DD hh:mm:ss')}
  </div>
);

export default App;
