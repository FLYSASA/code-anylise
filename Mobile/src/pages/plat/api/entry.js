import request from '@/static/js/request.js'

// /api/entrys
export function getReadMsgTypes (params) {
    return new Promise(function (resolve, reject) {
        request({
            data: {
                entryId: params.entryId,
                stepId: params.stepId,
                templateType: params.templateType
            }
        }, {
            url: '/api/entrys',
            type: 'GET',
            data: {
                entryId: 'query|string',
                stepId: 'query|string',
                templateType: 'query|string'
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
