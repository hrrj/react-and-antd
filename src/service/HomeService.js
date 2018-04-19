import BaseService from './BaseService'

/**
 * 首页相关接口
 */
class HomeService extends BaseService{
    /**
     * 获取首页展示数据
     */
    async getHomeCount(){
        let result
        try{
            result = await this.axios('POST', '/api/manage/statistic/base_count.do')
        }catch(err){
            throw new Error('接口异常!').toString()
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else{
            throw result.msg
        }
    }
}

export default new HomeService()