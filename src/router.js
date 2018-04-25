import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Spin, Alert } from 'antd'
import BasicLayout from './layouts/BasicLayout'
import Login from './pages/Login/Login'
import Loadable from 'react-loadable'

// 异步按需加载模块
const dynamicLoad = (component) => {
    return Loadable({
        loader: component,
        loading: ({error, pastDelay}) => {
            if (error) {
              return <Alert message="Error" description='网络异常，请联系管理员！' type="error" />
            } else if (pastDelay) {
              return <Spin style={{width: '100%'}} size='large'/>
            } else {
              return ''
            }
        },
    })
}
// 异步模块
const Home = () => import(/* webpackChunkName: "Home" */ './pages/Home/Home')
const ProductList = () => import(/* webpackChunkName: "ProductList" */ './pages/Product/ProductList')
const UserList = () => import(/* webpackChunkName: "UserList" */ './pages/User/UserList')

class Router extends React.Component{
    LayoutRouter(props){
        return(
            <BasicLayout history={props.history}>
                <Switch>
                    <Route exact path="/" component={dynamicLoad(Home)}/>
                    <Route path='/product/list' component={dynamicLoad(ProductList)}/>
                    <Route path='/user/list' component={dynamicLoad(UserList)}/>

                    <Redirect exact from='/user' to='/user/list' />
                    <Redirect exact from='/product' to='/product/list' />
                </Switch>
            </BasicLayout>
        )
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={(props) => this.LayoutRouter(props)}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router