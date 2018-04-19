import BaseService from './BaseService'

/**
 * 用户相关接口
 */
class UserService extends BaseService{
    /**
     * 登录接口
     */
    async login(params = {}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/user/login.do', {
                params
            })
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

export default new UserService()