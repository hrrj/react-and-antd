import React from 'react'
import { Avatar,Dropdown,Menu,Icon,message } from 'antd'
import style from './GlobalHeader.less'
import UserService from '../service/UserService';

class GlobalHeader extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false
        }
    }
    // 菜单点击事件
    onMenuClick(item){
        if(item.key === 'logout'){
            UserService.logout().then(() => {
                this.props.history.push('/login')
            }).catch(errMsg => {
                message.error(errMsg)
            })
        }
    }
    // 侧边栏状态切换
    toggleCollapsed(){
        this.setState({
            collapsed: !this.state.collapsed
        },() =>this.props.collapsed(this.state.collapsed))
    }
    render(){
        const userMenu = (
            <Menu className={style.userMenu} onClick={(item) => this.onMenuClick(item)}>
              <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );
        return(
            <div className={style.header}>
                <Icon className={style.siderTrigger} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} 
                    onClick={() => this.toggleCollapsed()}/>
                <div className={style.right}>
                    <Dropdown overlay={userMenu}>
                        <span className={style.rightItem}>
                            <Avatar className={style.avatar} size="small" icon="user" />
                            <span className={style.name}>坏人日记</span>
                        </span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default GlobalHeader