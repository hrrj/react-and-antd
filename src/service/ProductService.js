import BaseService from './BaseService'
import qs from 'qs'

/**
 * 用户相关接口
 */
class ProductService extends BaseService{
    /**
     * 商品列表
     * @param {*} params 
     */
    async getProductList(params = {listType: 'list', pageNum: 10, pageSize: 1, searchType: '', searchKeyword: ''}){
        let result, url, data = {}
        if(params.listType === 'list'){
            url = '/api/manage/product/list.do'
            data.pageNum = params.pageNum
            data.pageSize = params.pageSize
        }else{
            url = '/api/manage/product/search.do'
            data.pageNum = params.pageNum
            data.pageSize = params.pageSize
            data[params.searchType] = params.searchKeyword
        }
        try{
            result = await this.axios('POST', url, {
                data: qs.stringify(data)
            })
        }catch(err){
            throw new Error('接口异常!').toString()
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
    /**
     * 商品上下架
     * @param {*} params 
     */
    async setSaleStatus(params = {productId: '', status: ''}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/product/set_sale_status.do', {
                data: qs.stringify(params)
            })
        }catch(err){
            throw new Error('接口异常!').toString()
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
    /**
     * 获取品类列表
     * @param {Number} categoryId 
     */
    async getCategoryList(categoryId = 0){
        let result
        try{
            result = await this.axios('POST', '/api/manage/category/get_category.do', {
                data: qs.stringify({categoryId})
            })
        }catch(err){
            throw new Error('接口异常!').toString() 
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
    //检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过！'
        }
        // 判断用户名不为空
        if(typeof product.name !== 'string' || product.name.length === 0){
            return{
                status: false,
                msg: '商品名称不能为空！',
            }
        }
        // 判断描述不为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
            return{
                status: false,
                msg: '商品描述不能为空！',
            }
        }
        // 品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return{
                status: false,
                msg: '请选择商品品类！',
            }
        }
        // 判断价格为数字且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return{
                status: false,
                msg: '请输入正确的商品价格！',
            }
        }
        // 判断库存为数字且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return{
                status: false,
                msg: '请输入正确的库存数量！',
            }
        }
        return result
    }
    /**
     * 保存商品
     * @param {*} product 
     */
    async saveProduct(product){
        let result
        try{
            result = await this.axios('POST', '/api/manage/product/save.do', {
                data: qs.stringify(product)
            })
        }catch(err){
            throw new Error("ERROR!用户数据请求异常").toString() 
        }
        if(result && result.status === 0){
            // 请求成功
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString() 
        }else{
            throw result.msg
        }
    }
    /**
     * 获取商品详情
     * @param {*} productId 
     */
    async getProduct(productId){
        let result
        try{
            result = await this.axios('POST', '/api/manage/product/detail.do', {
                data: qs.stringify({productId})
            })
        }catch(err){
            throw new Error("ERROR!获取商品详情异常").toString() 
        }
        if(result && result.status === 0){
            // 请求成功
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString() 
        }else{
            throw result.msg
        }
    }
    /**
     * 
     * @param {Number} categoryId 
     * @param {String} categoryName 
     */
    async setCategoryName(categoryId, categoryName){
        let result
        try{
            result = await this.axios('POST', '/api/manage/category/set_category_name.do', {
                data: qs.stringify({categoryId,categoryName})
            })
        }catch(err){
            throw new Error("ERROR!修改品类名称接口异常").toString() 
        }
        if(result && result.status === 0){
            // 请求成功
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            throw new Error("请登录管理员").toString() 
        }else{
            throw result.msg
        }
    }
}

export default new ProductService()