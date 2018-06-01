import axios from 'axios';
let CancelToken = axios.CancelToken
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://baidu.com
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
*/

class BaseService {
    CANCELTOKEN = 'CANCELTOKEN' // 用于取消请求时的参数验证，防止取消请求的异常信息显示给用户
    axios(method, url, params, cancelTokenFn) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') {
                params = {};
            }
            let _option = {
                method,
                url,
                baseURL: '',
                timeout: 30000,
                params: null,
                data: null,
                headers: null,
                withCredentials: true, //是否携带cookies发起请求
                validateStatus: (status) => {
                    return status >= 200 && status < 300;
                },
                ...params
            }

            if(cancelTokenFn){
                _option.cancelToken = new CancelToken(cancelTokenFn)
            }
            
            axios
                .request(_option)
                .then(res => {
                    resolve(typeof res.data === 'object'
                        ? res.data
                        : JSON.parse(res.data)
                    )
                }, error => {
                    reject(error.response 
                        ? error.response.data
                        : error
                    )
                })
        })
    }
}

export default BaseService