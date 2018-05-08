import request from '@/static/js/request'
import { loginAuthorization } from '@/static/js/config.js'

/**
 * 登录方法
 * @param {object} params 登录参数 {grant_type, username, password}
 * @param {boolean} loading 是否显示加载状态，默认为false
 */
export function authorize (params, authorization = loginAuthorization, loading) {
    return new Promise(function (resolve, reject) {
        request({
            url: '/Authorize',
            type: 'POST',
            data: {
                model: params
            },
            loading: loading || false,
            headers: { 'authorization': `Basic ${authorization}` }
        }, { model: 'body|stringify' }).then(function (data) {
            if (data && data.hasOwnProperty('access_token')) {
                resolve(data)
            } else {
                reject(data)
            }
        })
    })
}
