import React from 'react'
import { Layout, message } from 'antd';
import SiderMenu from './SiderMenu'
import GlobalHeader from './GlobalHeader'
import UserService from '../service/UserService'

const { Header, Content } = Layout;

class BasicLayout extends React.Component{
    componentWillMount(){
        this.testAuthority()
    }
    // 权限验证
    testAuthority(){
        UserService.getUserList().catch(errMsg => {
            message.error(errMsg)
            this.props.history.push('/login')
        })
    }
    render(){
        return(
            <Layout style={{height: '100vh'}}>
                <SiderMenu/>
                <Layout>
                    <Header style={{padding: 0}}>
                        <GlobalHeader history={this.props.history}/>
                    </Header>
                    <Content style={{padding:'24px 24px 0px', overflowY: 'auto', height: 'calc(100vh - 64px)'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout