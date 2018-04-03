import React from 'react'
import {Layout, Menu, Icon } from 'antd';
import "./SiderMenu.less";
const { Sider} = Layout;
const { SubMenu } = Menu

const menuList = [
    {
        name: 'subnav 1',
        icon: 'user',
        subMenu: ['option1','option2','option3','option4']
    },
    {
        name: 'subnav 2',
        icon: 'laptop',
        subMenu: ['option1','option2','option3','option4']
    },
    {
        name: 'subnav 3',
        icon: 'notification',
        subMenu: ['option1','option2','option3','option4']
    },
    {
        name: 'subnav 4',
        icon: 'user',
        subMenu: ['option1','option2','option3','option4']
    },
    {
        name: 'subnav 5',
        icon: 'laptop',
        subMenu: ['option1','option2','option3','option4']
    },
    {
        name: 'subnav 6',
        icon: 'notification',
        subMenu: ['option1','option2','option3','option4']
    }
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
            <Sider className='sider-menu' width={256}>
                <div style={{borderRight: 0, background: '#002140', width: '256px', height: '64px'}}></div>
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
                                            menu.subMenu.map((subItem, index) => <Menu.Item key={index}>{subItem}</Menu.Item>)
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