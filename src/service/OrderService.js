import BaseService from './BaseService'
import qs from 'qs'

/**
 * 订单相关接口
 */
class UserService extends BaseService{
    /**
     * 获取订单列表数据
     * @param {*} params 
     */
    async getOrderList(params = {listType: 'list', pageNum: 10, pageSize: 1, orderNo: ''}){
        let result, url, data = {}
        if(params.listType === 'list'){
            url = '/api/manage/order/list.do'
            data.pageNum = params.pageNum
            data.pageSize = params.pageSize
        }else{
            url = '/api/manage/order/search.do'
            data.pageNum = params.pageNum
            data.pageSize = params.pageSize
            data.orderNo = params.orderNo
        }
        try{
            result = await this.axios('POST', url, {
                data: qs.stringify(data)
            }, (c) => {
                // 返回取消请求的函数
                this.cancelOrderListRequest = c
            })
        }catch(err){
            if(err.message === this.CANCELTOKEN) throw this.CANCELTOKEN
            throw new Error('接口请求异常!').toString() 
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            window.location.replace('/login')
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
    /**
     * 获取订单详情
     * @param {String} orderNo 订单号
     */
    async getOrderDetail(orderNo){
        let result
        try{
            result = await this.axios('POST', '/api/manage/order/detail.do', {
                data: qs.stringify({orderNo})
            }, (c) => {
                this.cancelOrderDetailRequest = c
            })
        }catch(err){
            throw new Error("ERROR!订单详情请求异常")
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            window.location.replace('/login')
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
    /**
     * 发货
     * @param {String} orderNo 
     */
    async sendGoods(orderNo){
        let result
        try{
            result = await this.axios('POST', '/api/manage/order/send_goods.do', {
                data: qs.stringify({orderNo})
            })
        }catch(err){
            throw new Error("ERROR!发货异常")
        }
        // 请求成功
        if(result && result.status === 0){
            return result.data
        }else if(result.status === 10){
            // 需要强制登录
            window.location.replace('/login')
            throw new Error("请登录管理员").toString()
        }else{
            throw result.msg
        }
    }
}

export default new UserService()