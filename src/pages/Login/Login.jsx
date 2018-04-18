import React from 'react'
import { connect } from 'react-redux'
import { changeAuthority } from '../../store/user/action'
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import style from './Login.less'
const FormItem = Form.Item;

class Login extends React.Component{
    loginTo(){
        // 改变登录状态
        this.props.changeAuthority(true)
        // 跳转到首页
        this.props.history.push('/')
    }
    render(){
        return(
            <Row className={style.login} type="flex" align="middle">
                <Col xs={24} sm={{span:12, offset:6}} md={{span:8, offset:8}} lg={{span:8, offset:8}} xl={{span:6, offset:9}}>
                    <Form className={style.form} onSubmit={this.handleSubmit}>
                        <FormItem className={style.logoBox}>
                            <Icon className={style.logo} type='api' />
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type="user"/>} placeholder="Username" />
                        </FormItem>
                        <FormItem>
                            <Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" />
                        </FormItem>
                        <Button className={style.submitBtn} type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form>
                </Col>
            </Row>
            
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