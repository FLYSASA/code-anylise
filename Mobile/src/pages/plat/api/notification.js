import request from '@/static/js/request.js'

/**
 * 根据userId获取账号的待办消息
 * @param {string} userId 登录用户id
 */
export function getDealMsgTypes (userId) {
    return new Promise(function (resolve, reject) {
        request({
            data: {
                userId: userId
            },
            mock: 'mock/json/plat/dealMsgTypes.json'
        }, {
            url: '/api/plat/notifications/{userId}/toDealMsgTypes',
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
 * 获取待办消息
 * @author zhangmq
 * @date 2018-05-02
 * @param {string} userId 登录用户id
 * @param {string} msgTypeId 消息类别id
 */
export function getDealMsgs (params) {
    return new Promise(function (resolve, reject) {
        request({
            data: {
                userId: params.userId,
                msgTypeId: params.msgTypeId,
                pageIndex: params.pageIndex,
                pageSize: params.pageSize,
                sortName: params.sortName,
                sortType: params.sortType,
                keyword: params.keyword
            }
        }, {
            url: '/api/plat/notifications/{userId}/{msgTypeId}/toDealMsgs',
            type: 'GET',
            data: {
                userId: 'path|string',
                msgTypeId: 'path|string',
                pageIndex: 'query|number',
                pageSize: 'query|number',
                sortName: 'query|string',
                sortType: 'query|string',
                keyword: 'query|string'
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
 * 根据userId获取账号的待阅读消息
 * @author zhangmq
 * @date 2018-05-02
 * @param {string} userId 登录用户id
 */
export function getReadMsgTypes (userId) {
    return new Promise(function (resolve, reject) {
        request({
            data: {
                userId: userId
            },
            mock: 'mock/json/plat/dealMsgTypes.json'
        }, {
            url: '/api/plat/notifications/{userId}/toReadMsgTypes',
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
