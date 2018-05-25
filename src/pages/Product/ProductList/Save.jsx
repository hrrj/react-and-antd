import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, InputNumber, Button, message } from "antd"
import PageHeader from '../../../layouts/PageHeader'
import style from './Save.less'
import ImageUpload from '../../../components/ImageUpload';
import RichEditor from '../../../components/RichEditor';
import CategoryCascader from '../../../components/CategoryCascader';
import ProductService from '../../../service/ProductService';
const FormItem = Form.Item

class Save extends React.Component {
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
    // 简单字段改变，如商品名称，描述
    onValueChange(e){
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    // 数字组件变化，如价格，库存
    onInputNumberChange(value, name){
        this.setState({
            [name]: value
        })
    }
    // 品类选择器变化
    onCategoryChange(value){
        this.setState({
            categoryId: value[1],
            parentCategoryId: value[0]
        })
    }
    // 获取图片列表
    getImageList(file, fileList){
        if(file.status !== 'done'){
            return;
        }
        let subImages = fileList.map((item, index) => (
            item.response ? {...item.response.data} : item
        ))
        this.setState({
            subImages,
            fileList
        },() => {
            console.log(this.state.subImages)
        })
    }
    // 获取富文本编辑器内容
    getRechEditorValue(value){
        this.setState({
            detail: value
        })
    }
    subImagesArrayToString(){
        return this.state.subImages.map(img => img.uri).join(",")
    }
    // 提交表单
    onSubmit(){
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId, 10),
            subImages: this.subImagesArrayToString(),
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock, 10),
            status: this.state.status,
            detail: this.state.detail
        }
        let ProductCheckResult = ProductService.checkProduct(product)
        // 判断是否有id，有则为编辑修改商品
        if(this.state.id){
            product.id = this.state.id
        }
        if(ProductCheckResult.status){
            ProductService.saveProduct(product).then(res => {
                message.success(res)
                this.props.history.push('/product/product-list')
            }).catch(errMsg => {
                message.error(errMsg)
            })
        }else{
            message.error(ProductCheckResult.msg)
        }
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
        return (
            <div className={style.save}>
                <PageHeader breadcrumbList={breadcrumbList}></PageHeader>
                <Form>
                    <FormItem {...formItemLayout} label='商品名称'>
                        <Input
                            name='name'
                            value={this.state.name}
                            placeholder="请输入商品名称"
                            onChange={(e) => this.onValueChange(e)}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品描述'>
                        <Input
                            name='subtitle'
                            value={this.state.subtitle}
                            placeholder="请输入商品描述"
                            onChange={(e) => this.onValueChange(e)}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品分类'>
                        <CategoryCascader 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(value) => this.onCategoryChange(value)}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品价格'>
                        <InputNumber 
                            value={this.state.price}
                            placeholder='价格' 
                            style={{ width: '100px' }} 
                            min={0}
                            onChange={(value) => this.onInputNumberChange(value, 'price')}
                        />
                        元
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品库存'>
                        <InputNumber
                            value={this.state.stock}
                            placeholder='库存'
                            style={{ width: '100px' }}
                            min={0} 
                            onChange={(value) => this.onInputNumberChange(value, 'stock')}
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
                            fileList={this.state.fileList}
                            getImageList={(file, fileList) => this.getImageList(file, fileList)}
                        />
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label='商品详情'>
                        <RichEditor
                            defaultDetail={this.state.detail}
                            onValueChange={(value) => this.getRechEditorValue(value)}
                        />
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 8, offset: 6},
                        }}
                    >
                        <Button type='primary' onClick={() => this.onSubmit()}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default withRouter(Save)