import React from 'react';
import moment from 'moment';

import './style.scss';

const Hello = () => (
  <div className="reactv14-hello">
    我是
    <h1>React14</h1>
    {' '}
    xixi
    项目的
    <h1>hello</h1>
    路由 雨之·希留
    {moment().format('YYYY-MM-DD hh:mm:ss')}
  </div>
);

export default Hello;
