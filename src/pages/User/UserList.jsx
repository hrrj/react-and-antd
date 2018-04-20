import React from 'react'
import { message, Table } from 'antd'
import UserService from '../../service/UserService'

import style from './UserList.less'

class UserList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
        }
    }
    componentWillMount(){
        this.loadUserList()
    }
    loadUserList(){
        UserService.getUserList({pageNum: this.state.pageNum}).then(res => {
            // 格式化列表数据
            res.list = res.list.map(function(user, index){
                return {
                    key: index, //列表每个记录需要唯一的key
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    createTime: new Date(user.createTime).toLocaleString()
                }
            })
            this.setState(res)
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    onPageNumChange(pageNum){
        this.setState({pageNum}, () => this.loadUserList())
    }
    componentWillUnmount(){
      // 重写setState， 防止异步请求导致报错
      this.setState = (state, callback) => {
        return;
      };
    }
    render(){
        // 表头
        let columns = [{
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: '用户名',
            dataIndex: 'username',
        }, {
            title: '邮箱',
            dataIndex: 'email',
        }, {
            title: '电话',
            dataIndex: 'phone',
        }, {
            title: '注册时间',
            dataIndex: 'createTime',
        }]
        return(
            <div className={style.userList}>
                <Table className={style.userTable} 
                    title={() => '用户列表'} 
                    dataSource={this.state.list} 
                    columns={columns} 
                    pagination={{
                        defaultCurrent: this.state.pageNum,
                        total: this.state.total,
                        onChange: (pageNum) => this.onPageNumChange(pageNum)
                    }}
                    />
            </div>
        )
    }
}

export default UserList