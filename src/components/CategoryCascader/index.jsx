import React from 'react';
import { Cascader, Spin, message } from "antd";
import ProductService from '../../service/ProductService';
import style from './index.less'

class CategoryCascader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            categoryList: [],
            firstCategoryId: 0,
            secondCategoryId: 0,
        };
    }

    componentWillReceiveProps(nextProps){
        let categoryIdChange = nextProps.categoryId !== this.props.categoryId
        let parentCategoryIdChange = nextProps.parentCategoryId !== this.props.parentCategoryId
        
        // 数据不变化不做处理
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        // 假如只有一级品类
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0,
            },() => {
                this.loadFirstCategory()
            })
        }
        // 有两级品类
        else{
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            },() => {
                this.loadFirstCategory().then(() => {
                    this.loadSecondCategoryTodo(nextProps.categoryId)
                })
            })
        }
    }
    
    // 加载一级品类
    async loadFirstCategory(){
        await ProductService.getCategoryList().then(res => {
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
    // 用于编辑商品传入id是显示二级品类
    loadSecondCategoryTodo(){
        let categoryId = this.state.firstCategoryId
        let index = this.state.categoryList.findIndex(item => item.value===categoryId)
        let firstCategoryList = this.state.categoryList[index]
        ProductService.getCategoryList(categoryId).then(res => {
            firstCategoryList.children = res.map((item, index) => ({
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

    handleChange(value, selectedOptions){
        this.props.onCategoryChange && this.props.onCategoryChange(value, selectedOptions)
    }

    componentWillUnmount(){
        // 重写setState， 防止异步请求导致报错
        this.setState = (state, callback) => {
          return;
        };
    }
    render() {
        return (
            <Cascader
                disabled={this.props.disabled ? true : false}
                value={[this.state.firstCategoryId, this.state.secondCategoryId]}
                popupClassName={style.cascader}
                loadData={(selectedOptions) => this.loadSecondCategory(selectedOptions)}
                options={this.state.categoryList}
                changeOnSelect={true}
                notFoundContent={this.state.categoryList.length > 0 ? <Spin size="small" /> : null}
                placeholder='请选择分类'
                onChange={(value, selectedOptions) => this.handleChange(value, selectedOptions)}
            />
        );
    }
}

export default CategoryCascader;