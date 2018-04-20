import BaseService from './BaseService'

/**
 * 用户相关接口
 */
class UserService extends BaseService{
    /**
     * 登录接口
     * @param {username: '', password: ''} [params={}]
     * @returns 
     * @memberof UserService
     */
    async login(params = {}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/user/login.do', {
                data: new URLSearchParams(params)
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
    
    /**
     * 
     * 
     * @param {pageNum: ''} [params={}] 
     * @returns 
     * @memberof UserService
     */
    async getUserList(params = {}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/user/list.do', {
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

export default new UserService()