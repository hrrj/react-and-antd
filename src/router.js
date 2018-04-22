import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import UserList from './pages/User/UserList'
import ProductList from './pages/Product/ProductList'

class Router extends React.Component{
    LayoutRouter(props){
        return(
            <BasicLayout history={props.history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path='/product/list' component={ProductList}/>
                    <Route path='/user/list' component={UserList}/>

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