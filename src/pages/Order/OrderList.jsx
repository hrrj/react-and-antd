import React from 'react'
import { Link } from 'react-router-dom'
import { message, Table, Button, Input, Select, Form } from 'antd'
import OrderService from '../../service/OrderService'
import PageHeader from '../../layouts/PageHeader'
import style from './OrderList.less'

const { Option } = Select

class OrderList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            listType: 'list',
            pageNum: 1,
            pageSize: 10,
            loading: false,
            searchType : 'productId',
            searchKeyword: '',
        }
    }
    componentWillMount(){
        this.loadOrderList()
    }
    // 搜索框类型变化事件
    onTypeChage(value){
        this.setState({
            searchType: value
        })
    }
    // 搜索框关键词变化事件
    onKeywordChage(e){
        this.setState({
            searchKeyword: e.target.value
        })
    }
    // 加载用户列表
    loadOrderList(){
        this.setState({loading: true}) // 显示loading图标
        let params = {
            listType: this.state.listType,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
        }
        if(this.state.listType === 'search'){
            params.searchType = this.state.searchType
            params.searchKeyword = this.state.searchKeyword
        }
        OrderService.getOrderList(params).then(res => {
            // 格式化列表数据
            res.list = res.list.map((order, index) => ({
                    key: index,
                    id: order.orderNo,
                    payment: order.payment,
                    receiverName: order.receiverName,
                    statusDesc: order.statusDesc,
                    createTime: order.createTime
               })
            )
            this.setState({
                loading: false,
                ...res
            })
        }).catch(errMsg => {
            if(errMsg === OrderService.CANCELTOKEN) return
            message.error(errMsg)
        })
    }
    // 搜索商品事件
    onSearch(){
        let listType = this.state.searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType,
            pageNum: 1,
        }, () => this.loadOrderList())
    }
    // 改变页码事件
    onChange(pageNum){
        this.setState({pageNum}, () => this.loadOrderList())
    }
    componentWillUnmount(){
      // 取消异步数据请求
      OrderService.cancelOrderListRequest(OrderService.CANCELTOKEN)
    }
    render(){
        // 表头
        let columns = [{
            title: '订单号',
            dataIndex: 'id',
        }, {
            title: '收件人',
            dataIndex: 'receiverName',
        }, {
            title: '订单状态',
            dataIndex: 'statusDesc',
        }, {
            title: '订单总价',
            dataIndex: 'payment',
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
        }, {
            title: '操作',
            dataIndex: 'opear',
            render: (text, record) => (
                <Link to={`/product/product-detail/${record.id}`}>详情</Link>
            )
        }]
        // 导航栏数据
        const breadcrumbList = [
            {
                path: '/',
                name: '首页'
            }, {
                path: '/order',
                name: '订单列表'
            }
        ];
        return(
            <div className={style.orderList}>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
                <Form className={style.search}>
                    <Select className={style.type} 
                        defaultValue="productId" 
                        name="searchType"
                        onChange={(e) => this.onTypeChage(e)}>
                        <Option value="productId">按商品ID查询</Option>
                        <Option value="productName">按商品名称查询</Option>
                    </Select>
                    <Input className={style.keyword} 
                        type='text'
                        name='searchKeyword'
                        value={this.state.searchKeyword}
                        onChange={(e) => this.onKeywordChage(e)}/>
                    <Button type='primary' htmlType="submit" onClick={() => this.onSearch()}>搜索</Button>
                </Form>
                <Table className={style.productTable}
                    loading={this.state.loading}
                    dataSource={this.state.list} 
                    columns={columns} 
                    pagination={{
                        defaultCurrent: this.state.pageNum,
                        total: this.state.total,
                        showQuickJumper: true,
                        onChange: (pageNum) => this.onChange(pageNum)
                    }}
                />
            </div>
        )
    }
}

export default OrderList