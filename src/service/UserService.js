import BaseService from './BaseService'
import qs from 'qs'

/**
 * 用户相关接口
 */
class UserService extends BaseService{
    /**
     * 登录接口
     * @param {*} params 
     */
    async login(params = {username: '', password: ''}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/user/login.do', {
                data: qs.stringify(params)
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
     * 退出登录
     */
    async logout(){
        let result
        try{
            result = await this.axios('POST', '/api/user/logout.do')
        }catch(err){
            throw new Error('接口异常!').toString()
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }
    }
    
    /**
     * 获取用户列表数据
     * @param {*} params 
     */
    async getUserList(params = {pageNum: ''}){
        let result
        try{
            result = await this.axios('POST', '/api/manage/user/list.do', {
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
}

export default new UserService()