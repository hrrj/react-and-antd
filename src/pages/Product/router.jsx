import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProductList from './ProductList/index'
import Save from './ProductList/Save'
import Detail from './ProductList/Detail';
import CategoryList from './CategoryList';

class ProductRouter extends React.Component{
    render(){
        return (
            <Switch>
                <Route path='/product/product-list' component={ProductList}/>
                <Route path='/product/product-save/:pid?' component={Save}/>
                <Route path='/product/product-detail/:pid?' component={Detail}/>
                <Route path='/product/category-list' component={CategoryList}/>
                
                <Redirect exact from='/product' to='/product/product-list' />
            </Switch>
        )
    }
}

export default ProductRouter