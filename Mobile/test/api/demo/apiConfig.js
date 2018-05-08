import * as constants from '../../../src/static/js/constants.js'

export const login = {
    url: '/Authorize',
    type: constants.POST,
    data: {
        model: 'body|object|stringify'
    },
    schema: {
        type: Object,
        properties: {
            access_token: String,
            expires_in: Number,
            token_type: String,
            userId: String
        }
    }
}

export const getClientList = {
    url: '/api/clients/{pageIndex}',
    type: constants.GET,
    data: {
        pageIndex: 'path',
        pageSize: 'query',
        keyword: 'query'
    },
    schema: {
        namespace: 'Data',
        type: Object,
        properties: {
            Rows: Array,
            FinalPageIndex: Number,
            Total: Number
        }
    }
}
