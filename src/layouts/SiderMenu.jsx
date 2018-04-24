import React from 'react'
import { Link } from 'react-router-dom'
import {Layout, Menu, Icon } from 'antd';
import style from "./SiderMenu.less";
const { SubMenu, Item } = Menu

// 菜单
const menuList = [
    {
        name: '首页',
        icon: 'medium',
        path: '/'
    },
    {
        name: '商品',
        icon: 'appstore-o',
        subMenu: [{
            name: '商品列表',
            path: '/product/list'
        },{
            name: '品类列表',
            path: '/product/category/list'
        }]
    },
    {
        name: '订单',
        icon: 'file-text',
        subMenu: [{
            name: '订单列表',
            path: '/order/list'
        }]
    },
    {
        name: '用户',
        icon: 'user',
        subMenu: [{
            name: '用户管理',
            path: '/user/list'
        }]
    },
]

class SiderMenu extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuList: menuList
        }
    }
    render(){
        let subMenu = this.state.menuList.map((menu, index) => {
            if(!menu.subMenu){
                return(
                    <Item key={index}>
                        <Link to={menu.path}>
                            <Icon type={menu.icon}/>
                            <span>{menu.name}</span>
                        </Link>
                    </Item>
                ) 
            }else{
                return (
                    <SubMenu key={index} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
                        {
                            menu.subMenu && menu.subMenu.map((subItem, _index) => (
                                    <Item key={index + '' + _index}>
                                        <Link to={subItem.path}>{subItem.name}</Link>
                                    </Item>
                                )
                            )
                        }
                    </SubMenu>
                )
            }
        })
        return(
            <Layout.Sider className={style.siderMenu} 
                width={256} 
                collapsed={this.props.collapsed}>
                <div className={style.logo}>
                    <Icon className={style.icon} type='codepen'/>
                    <span><b>HAPPY</b>MMALL</span>
                </div>
                <div style={{overflowY: 'auto', height: 'calc(100vh - 64px)'}}>
                    <Menu mode="inline" 
                        theme="dark" 
                        inlineCollapsed={this.props.collapsed}>
                        {subMenu}
                    </Menu>
                </div>
            </Layout.Sider>
        )
    }
}

export default SiderMenu