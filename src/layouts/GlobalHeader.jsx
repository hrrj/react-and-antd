import React from 'react'
import { Avatar,Dropdown,Menu,Icon } from 'antd'
import style from './GlobalHeader.less'

class GlobalHeader extends React.Component{
    render(){
        const userMenu = (
            <Menu className={style.userMenu}>
              <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );
        return(
            <div className={style.header}>
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