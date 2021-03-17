// 项目入口文件，渲染跟组件，导入组件库等
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 导图组件库样式
import 'antd-mobile/dist/antd-mobile.css';
// 导入字体图标库的样式文件
import './assest/fonts/iconfont.css'
import './index.css';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
