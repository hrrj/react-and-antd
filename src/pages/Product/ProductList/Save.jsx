import React from 'react'
import PageHeader from '../../../layouts/PageHeader'

class Save extends React.Component {
    render() {
        // 导航栏数据
        const breadcrumbList = [
            {
                path: '/',
                name: '首页'
            }, {
                path: '/product',
                name: '商品列表'
            }, {
                path: '/product/product-save',
                name: '商品编辑'
            }
        ];
        return (
            <div>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
            </div>
        )
    }
}

export default Save