import React from 'react'
import { Form, Input, InputNumber, Upload, Icon } from "antd"
import PageHeader from '../../../layouts/PageHeader'
import style from './Save.less'
const FormItem = Form.Item

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
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
          };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className={style.save}>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
                <Form>
                    <FormItem {...formItemLayout} label='商品名称'>
                        <Input placeholder="请输入商品名称"/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品描述'>
                        <Input placeholder="请输入商品描述"/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品分类'>
                        <Input />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品价格'>
                        <InputNumber style={{width: '60%'}} formatter={value => `￥ ${value}`} min={0}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品库存'>
                        <InputNumber style={{width: '60%'}} formatter={value => `${value}件`} min={0}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品图片'>
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >{uploadButton}</Upload>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Save