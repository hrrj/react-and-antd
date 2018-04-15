import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

class Router extends React.Component{
    LayoutRouter(props){
        return(
            <BasicLayout history={props.history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </BasicLayout>
        )
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={(props) => this.LayoutRouter(props)}></Route>
                    <Route path='/login' component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router