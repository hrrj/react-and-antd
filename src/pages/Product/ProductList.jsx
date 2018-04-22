import React from 'react'
import { Link } from 'react-router-dom'
import { message, Table, Divider, Button } from 'antd'
import ProductService from '../../service/ProductService'

import style from './ProductList.less'

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 6,
            loading: false,
        }
    }
    componentWillMount(){
        this.loadProductList()
    }
    // 加载用户列表
    loadProductList(){
        this.setState({
            loading: true
        })
        ProductService.getProductList({
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        }).then(res => {
            // 格式化列表数据
            res.list = res.list.map((product, index) => ({
                    key: index,
                    id: product.id,
                    info: {
                        name: product.name,
                        subtitle: product.subtitle
                    },
                    price: product.price,
                    status: product.status
               })
            )
            this.setState({
                loading: false,
                ...res
            })
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    // 改变页码事件
    onChange(pageNum){
        this.setState({pageNum}, () => this.loadProductList())
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
            title: '商品ID',
            dataIndex: 'id',
            width: '10%',
        }, {
            title: '商品信息',
            dataIndex: 'info',
            width: '40%',
            render: (text, record) => (
                <span>
                    <p>{record.info.name}</p>
                    <p>{record.info.subtitle}</p>
                </span>
            )
        }, {
            title: '价格',
            dataIndex: 'price',
            width: '10%',
        }, {
            title: '状态',
            dataIndex: 'status',
            width: '15%',
            render: (text, record) => (
                <Button type={record.status === 1 ? 'primary' : 'default'} size='small'>
                {
                    record.status === 1 ? '在售' : '已下架'
                }
                </Button>
            )
        }, {
            title: '操作',
            dataIndex: 'opear',
            width: '15%',
            render: (text, record) => (
                <span>
                    <Link to={`/product/detail/${record.id}`}>详情</Link>
                    <Divider type="vertical" />
                    <Link to={`/product/save/${record.id}`}>编辑</Link>
                </span>
            )
        }]
        return(
            <div className={style.productList}>
                <Table className={style.productTable} 
                    title={() => '商品列表'} 
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

export default ProductList