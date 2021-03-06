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
const ProductRouter = () => import(/* webpackChunkName: "ProductRouter" */ './pages/Product/router')
const OrderList = () => import(/* webpackChunkName: "OrderList" */ './pages/Order/OrderList')
const OrderDetail = () => import(/* webpackChunkName: "OrderDetail" */ './pages/Order/Detail')
const UserList = () => import(/* webpackChunkName: "UserList" */ './pages/User/UserList')

class Router extends React.Component{
    render(){
        const LayoutRouter = () => (
                <BasicLayout>
                    <Switch>
                        <Route exact path="/" component={dynamicLoad(Home)}/>
                        <Route path='/product' component={dynamicLoad(ProductRouter)}/>
                        <Route path='/order/order-list' component={dynamicLoad(OrderList)}/>
                        <Route path='/order/order-detail/:orderNo' component={dynamicLoad(OrderDetail)}/>
                        <Route path='/user/user-list' component={dynamicLoad(UserList)}/>
    
                        <Redirect exact from='/user' to='/user/user-list' />
                        <Redirect exact from='/order' to='/order/order-list' />
                    </Switch>
                </BasicLayout>
            )
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={() => LayoutRouter()}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router