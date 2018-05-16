import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { message, Table, Divider, Button, Input, Select, Form, Popconfirm, Icon } from 'antd'
import ProductService from '../../../service/ProductService'
import PageHeader from '../../../layouts/PageHeader'
import style from './index.less'

const { Option } = Select

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            listType: 'list',
            pageNum: 1,
            pageSize: 6,
            loading: false,
            searchType : 'productId',
            searchKeyword: '',
        }
    }
    componentWillMount(){
        this.loadProductList()
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
    loadProductList(){
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
        ProductService.getProductList(params).then(res => {
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
    // 搜索商品事件
    onSearch(){
        let listType = this.state.searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType,
            pageNum: 1,
        }, () => this.loadProductList())
    }
    // 改变页码事件
    onChange(pageNum){
        this.setState({pageNum}, () => this.loadProductList())
    }
    // 改变商品状态
    onSetProductStatus(record){
        ProductService.setSaleStatus({
            productId: record.id,
            status: record.status === 1 ? 2 : 1
        }).then(res => {
            message.success(res)
            this.loadProductList()
        }).catch(errMsg => {
            message.error(errMsg)
        })
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
                <Popconfirm 
                    title={record.status === 1 ? '确定要下架该商品？' : '确定要上架该商品？'} 
                    onConfirm={() => this.onSetProductStatus(record)}>
                    <Button type={record.status === 1 ? 'primary' : 'default'} size='small'>
                    {
                        record.status === 1 ? '在售' : '已下架'
                    }
                    </Button>
                </Popconfirm>
            )
        }, {
            title: '操作',
            dataIndex: 'opear',
            width: '15%',
            render: (text, record) => (
                <span>
                    <Link to={`/product/product-detail/${record.id}`}>详情</Link>
                    <Divider type="vertical" />
                    <Link to={`/product/product-save/${record.id}`}>编辑</Link>
                </span>
            )
        }]
        // 导航栏数据
        const breadcrumbList = [
            {
                path: '/',
                name: '首页'
            }, {
                path: '/product',
                name: '商品列表'
            }
        ];
        return(
            <div className={style.productList}>
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
                    <Button className={style.saveBtn} type='primary'>
                        <Link to={`/product/product-save`}>
                            <Icon type="plus" />添加商品
                        </Link>
                    </Button>
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

export default withRouter(ProductList)