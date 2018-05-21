import React from 'react';
import { Cascader, Spin } from "react";
import { message } from "antd";
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

    render() {
        return (
            <Cascader
            popupClassName={style.cascader}
            className={style.cascader}
            loadData={(selectedOptions) => this.loadSecondCategory(selectedOptions)}
            options={this.state.categoryList}
            changeOnSelect
            notFoundContent={this.state.categoryList.length > 0 ? <Spin size="small" /> : null}
            placeholder='请选择分类'/>
        );
    }
}

export default CategoryCascader;