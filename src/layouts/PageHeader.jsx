import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from "antd"
import style from  './PageHeader.less'

class PageHeader extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            breadcrumbList: this.props.breadcrumbList || [{
                path: '/',
                name: '首页'
            },{
                path: '/index',
                name: '当前页面'
            }]
        }
    }
    render(){
        const itemRender = (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.name}</span> : <Link to={route.path}>{route.name}</Link>;
        }
        return (
            <div className={style.pageHeader}>
                <Breadcrumb itemRender={itemRender} 
                    routes={this.state.breadcrumbList} 
                    className={style.breadcrumb} 
                    separator=">">
                </Breadcrumb>
            </div>
        )
    }
}

export default PageHeader