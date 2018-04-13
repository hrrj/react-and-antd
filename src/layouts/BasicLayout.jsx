import React from 'react'
import { Layout } from 'antd';
import SiderMenu from './SiderMenu'
import GlobalHeader from './GlobalHeader'

const { Header, Content } = Layout;

class BasicLayout extends React.Component{
    
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

export default BasicLayout