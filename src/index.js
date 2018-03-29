import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import registerServiceWorker from './registerServiceWorker';

import Home from './pages/Home/Home';
import BasicLayout from './layouts/BasicLayout'
import './index.less';

moment.locale('zh-cn');

class App extends React.Component{
    render(){
        return(
            <LocaleProvider locale={zhCN}>
                    <BasicLayout>
                        <Home />
                    </BasicLayout>
            </LocaleProvider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
