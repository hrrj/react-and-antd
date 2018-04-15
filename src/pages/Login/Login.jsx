import React from 'react'
import { connect } from 'react-redux'
import { changeAuthority } from '../../store/user/action'
// import style from './Login.less'

class Login extends React.Component{
    loginTo(){
        // 改变登录状态
        this.props.changeAuthority(true)
        // 跳转到首页
        this.props.history.push('/')
    }
    render(){
        return(
            <div className="login">
                <h2>登录页面</h2>
                <p>当前登录状态：{this.props.userData.athority}</p>
                <button onClick={(e) => {this.loginTo()}}>登录</button>
            </div>
        )
    }
}

export default connect(state => {
    return {
        userData: state.userData
    }
},{
    changeAuthority
})(Login)