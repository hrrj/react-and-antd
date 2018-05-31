import React from 'react';
import { Table, Button, message } from "antd";
import style from './index.less'
import PageHeader from '../../../layouts/PageHeader';
import ProductService from '../../../service/ProductService';
import EditortableCell from '../../../components/EditorTableCell';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            categoryName: null,
            breadcrumbList: [ // 导航栏数据
                {
                    path: '/',
                    name: '首页'
                }, {
                    path: '/product/category-list',
                    name: '品类列表'
                }
            ],
            childBtnFlag: false
        }
    }
    componentWillMount(){
        this.loadCateogryList()
    }   
    // 加载品类列表
    loadCateogryList(categoryId = 0){
        ProductService.getCategoryList(categoryId).then(res => {
            this.setState({
                loading: false,
                list: res
            })
        }).catch(errMsg => {
            if(errMsg.message === ProductService.CANCELTOKEN) return
            message.error(errMsg)
        })
    }
    // 修改商品名称
    onUpdateName(categoryId, categoryName){
        ProductService.setCategoryName(categoryId, categoryName).then(res => {
            message.success(res)
            this.loadCateogryList()
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    // 查看子品类
    showChildPage(categoryId){
        var breadcrumbList = this.state.breadcrumbList;
        breadcrumbList[2] = {
            name: categoryId,
            path: `/product/category-child`,
        }
        this.setState({
            breadcrumbList,
            childBtnFlag: true
        })
        this.loadCateogryList(categoryId)
    }
    componentWillUnmount(){
      // 取消异步操作
      ProductService.cancelCategoryListRequest(ProductService.CANCELTOKEN)
    }
    render() {
        // 表头
        let columns = [{
            title: '品类ID',
            dataIndex: 'id',
            width: '35%',
        }, {
            title: '品类名称',
            dataIndex: 'name',
            width: '35%',
            render: (text, record) => (
                <EditortableCell
                    value={text}
                    onChange={(value) => this.onUpdateName(record.id, value)}
                />
            ),
        }, {
            title: '操作',
            dataIndex: 'opear',
            width: '30%',
            render: (text, record) => (
                <span>
                    <Button 
                        disabled={this.state.childBtnFlag} 
                        size='small' 
                        onClick={() => this.showChildPage(record.id)}
                    >查看子品类</Button>
                </span>
            )
        }]
        return (
            <div className={style.categoryList}>
                <PageHeader breadcrumbList={this.state.breadcrumbList}></PageHeader>
                <Table 
                    rowKey="id" 
                    bordered={true}
                    className={style.productTable}
                    loading={this.state.loading}
                    dataSource={this.state.list} 
                    columns={columns} 
                />
            </div>
        );
    }
}

export default CategoryList;