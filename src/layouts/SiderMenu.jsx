import React from 'react'
import {Layout, Menu, Icon } from 'antd';
import style from "./SiderMenu.less";
const { Sider} = Layout;
const { SubMenu, Item } = Menu

// 菜单
const menuList = [
    {
        name: '商品',
        icon: 'appstore-o',
        subMenu: ['商品列表','品类列表']
    },
    {
        name: '订单',
        icon: 'file-text',
        subMenu: ['订单列表']
    },
    {
        name: '用户',
        icon: 'user',
        subMenu: ['用户管理']
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
        return(
            <Sider className={style['sider-menu']} width={256}>
                <div className={style.logo} style={{}}><b>HAPPY</b>MMALL</div>
                <div style={{overflowY: 'auto', height: 'calc(100vh - 64px)'}}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultOpenKeys={['sub1']}>
                        {
                            this.state.menuList.map((menu, index) => {
                                return(
                                    <SubMenu key={index} title={<span><Icon type={menu.icon}/>{menu.name}</span>}>
                                        {
                                            menu.subMenu.map((subItem, _index) => <Item key={index + '' + _index}>{subItem}</Item>)
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </Menu>
                </div>
            </Sider>
        )
    }
}

export default SiderMenu