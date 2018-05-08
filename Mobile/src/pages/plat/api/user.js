import request from '@/static/js/request.js'

/**
 * 获取用户信息
 */
export function getUserInfo (userId) {
    return new Promise(function (resolve, reject) {
        request({
            data: {
                userId: userId
            }
        }, {
            url: '/api/plat/users/{userId}',
            type: 'GET',
            data: {
                userId: 'path|string'
            }
        }).then(function (data) {
            if (data.Code === 0) {
                resolve(data.Data)
            } else {
                reject(data.Message)
            }
        })
    })
}

/**
 * 获取用户简要信息
 */
export function getUserBrief () {
    return new Promise(function (resolve, reject) {
        request({}, {
            url: '/api/plat/users/brief',
            type: 'GET'
        }).then(function (data) {
            if (data.Code === 0) {
                resolve(data.Data)
            } else {
                reject(data.Message)
            }
        })
    })
}
