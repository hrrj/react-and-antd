import BaseService from './BaseService'

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
                data: new URLSearchParams(data)
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
                data: new URLSearchParams(params)
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
}

export default new ProductService()