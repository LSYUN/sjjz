import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { LocaleProvider } from 'antd';
// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <App />
    </LocaleProvider>,
    document.getElementById('root'));
// registerServiceWorker();