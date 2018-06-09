import React from 'react'
import { Form, Input, InputNumber, message } from "antd"
import PageHeader from '../../../layouts/PageHeader'
import style from './Detail.less'
import ImageUpload from '../../../components/ImageUpload';
import CategoryCascader from '../../../components/CategoryCascader';
import ProductService from '../../../service/ProductService';
const FormItem = Form.Item

class Detail extends React.Component {
    constructor(params){
        super(params)
        this.state = {
            id: this.props.match.params.pid,
            name: '', // 商品名称
            subtitle: '', // 商品描述
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [], 
            price: '', // 价格
            stock: '', // 库存
            detail: '', //  详情
            status: 1, //商品状态1表示在售
            fileList: []
        }
    }
    componentWillMount() {
        this.loadProduct()
    }
    // 出入商品id时加载商品信息
    loadProduct(){
        this.state.id && ProductService.getProduct(this.state.id).then(res => {
            let images = res.subImages ? res.subImages.split(',') : []
            res.fileList = images.map((imgUri, index) => {
                return{
                    uid: index + 1,
                    name: imgUri,
                    status: 'done',
                    uri: imgUri,
                    url: res.imageHost + imgUri,
                }
            })
            res.defaultDetail = res.detail
            this.setState(res)
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
                path: '/product/product-detail',
                name: '商品详情'
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
        return (
            <div className={style.detail}>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
                <Form>
                    <FormItem {...formItemLayout} label='商品名称'>
                        <Input
                            name='name'
                            disabled={true}
                            value={this.state.name}
                            placeholder="请输入商品名称"
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品描述'>
                        <Input
                            name='subtitle'
                            disabled={true}
                            value={this.state.subtitle}
                            placeholder="请输入商品描述"
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品分类'>
                        <CategoryCascader 
                            disabled={true}
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品价格'>
                        <InputNumber 
                            disabled={true}
                            value={this.state.price}
                            placeholder='价格' 
                            style={{ width: '100px' }} 
                            min={0}
                        />
                        元
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品库存'>
                        <InputNumber
                            disabled={true}
                            value={this.state.stock}
                            placeholder='库存'
                            style={{ width: '100px' }}
                            min={0} 
                        />
                        件
                    </FormItem>
                    <FormItem 
                        {...formItemLayout}
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }} 
                        label='商品图片'>
                        <ImageUpload 
                            disabled={true}
                            fileList={this.state.fileList}
                        />
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label='商品详情'>
                        <div className={style.richEditor} dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Detail