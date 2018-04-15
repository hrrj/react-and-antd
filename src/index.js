import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import registerServiceWorker from './registerServiceWorker';

import store from './store'
import Router from './router'
import './index.less';

moment.locale('zh-cn');

class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <LocaleProvider locale={zhCN}>
                    <Router></Router>
                </LocaleProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
