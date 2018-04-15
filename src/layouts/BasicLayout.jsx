import React from 'react'
import { Layout } from 'antd';
import { connect } from 'react-redux'
import SiderMenu from './SiderMenu'
import GlobalHeader from './GlobalHeader'

const { Header, Content } = Layout;

class BasicLayout extends React.Component{
    componentWillMount(){
        if(!this.props.authority){
            alert('请登录管理员!')
            this.props.history.push('/login')
        }
    }
    render(){
        return(
            <Layout style={{height: '100vh'}}>
                <SiderMenu/>
                <Layout>
                    <Header style={{padding: 0}}>
                        <GlobalHeader/>
                    </Header>
                    <Content style={{padding:'24px 24px 0px', overflowY: 'auto', height: 'calc(100vh - 64px)'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default connect(state => {
    // 从store中获取权限
    return {authority: state.userData.authority}
})(BasicLayout)