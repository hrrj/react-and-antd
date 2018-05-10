import React from 'react'
import { Link } from 'react-router-dom'
import {Layout, Menu, Icon } from 'antd';
import { getMenuData } from "../common/menu";
import style from "./SiderMenu.less";
const { SubMenu, Item } = Menu

class SiderMenu extends React.Component{
    render(){
        let subMenu = getMenuData().map((menu, index) => {
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