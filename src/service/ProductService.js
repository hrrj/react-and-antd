import BaseService from './BaseService'

/**
 * 用户相关接口
 */
class ProductService extends BaseService{
    /**
     * 
     * 
     * @param {pageNum: ''} [params={}] 
     * @returns 
     * @memberof ProductService
     */
    async getProductList(params = {}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/product/list.do', {
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