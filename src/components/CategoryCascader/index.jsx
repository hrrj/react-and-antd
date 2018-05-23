import React from 'react';
import { Cascader, Spin, message } from "antd";
import ProductService from '../../service/ProductService';
import style from './index.less'

class CategoryCascader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            categoryList: [],
        };
    }
    componentWillMount() {
        console.log(this.props)
        this.loadFirstCategory()
    }
    
    // 加载一级品类
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
                value={[this.props.parentCategoryId, this.props.categoryId]}
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