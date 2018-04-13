import React from 'react'
import { Avatar } from 'antd'
import style from './GlobalHeader.less'

class GlobalHeader extends React.Component{
    render(){
        return(
            <div className={style['global-header']}>
                <div className={style['header-right']}>
                    <span>
                        <Avatar className={style.avatar} size="small" icon="user" />
                        <span className={style.name}>坏人日记</span>
                    </span>
                </div>
            </div>
        )
    }
}

export default GlobalHeader