import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import UserList from './pages/User/UserList'

class Router extends React.Component{
    LayoutRouter(props){
        return(
            <BasicLayout history={props.history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path='/user' component={UserList}/>
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