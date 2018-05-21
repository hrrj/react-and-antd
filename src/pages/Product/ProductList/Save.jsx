import React from 'react'
import { Form, Input, InputNumber, message } from "antd"
import PageHeader from '../../../layouts/PageHeader'
import style from './Save.less'
import ProductService from '../../../service/ProductService';
import ImageUpload from '../../../components/ImageUpload';
import RichEditor from '../../../components/RichEditor';
import CategoryCascader from '../../../components/CategoryCascader';
const FormItem = Form.Item

class Save extends React.Component {
    constructor(params){
        super(params)
        this.state = {
            categoryList: [],
            imageList: []
        }
    }
    componentWillMount(){
        this.loadFirstCategory()
    }
    // 加载一级父级品类
    loadFirstCategory(){
        ProductService.getCategoryList().then(res => {
            let formatter = res.map((item, index) => ({
                value: item.id,
                label: item.name,
                isLeaf: false
            }))
            this.setState({
                categoryList: formatter,
            })
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    // 加载二级品类
    loadSecondCategory(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        
        ProductService.getCategoryList(targetOption.value).then(res => {
            targetOption.loading = false
            targetOption.children =  res.map((item, index) => ({
                value: item.id,
                label: item.name
            }))
            this.setState({
                categoryList: [...this.state.categoryList]
            })
        }).catch(errMsg => {
            message.error(errMsg)
        })
    }
    // 获取图片列表
    getImageList(file, fileList){
        if(file.status !== 'done'){
            return;
        }
        let imageList = fileList.map((item, index) => ({
            ...item.response.data
        }))
        this.setState({
            imageList
        }, () => {
            console.log(this.state.imageList)
        })
    }
    // 获取富文本编辑器内容
    getRechEditorValue(value){
        console.log(value)
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
                        <Input placeholder="请输入商品名称"/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品描述'>
                        <Input placeholder="请输入商品描述"/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品分类'>
                        <CategoryCascader/>
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品价格'>
                        <InputNumber placeholder='价格' style={{width: '100px'}} min={0}/>
                        元
                    </FormItem>
                    <FormItem {...formItemLayout} label='商品库存'>
                        <InputNumber placeholder='库存' style={{width: '100px'}} min={0}/>
                        件
                    </FormItem>
                    <FormItem 
                        {...formItemLayout}
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }} 
                        label='商品图片'>
                        <ImageUpload getImageList={(file, fileList) => this.getImageList(file, fileList)}/>
                    </FormItem>
                    <FormItem 
                        {...formItemLayout} 
                        wrapperCol={ {
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label='商品详情'>
                        <RichEditor onValueChange={(value) => this.getRechEditorValue(value)}/>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Save