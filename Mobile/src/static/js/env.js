import config from '../../../config'
import utils from './utils.js'

var warn = function () {
}
var mock = warn
var port = config.dev.port
var mockApiUrl = config.build.mockApiUrl

if (process.env.NODE_ENV !== 'production' || process.env.BUILD_MOCK === 'true') {
    warn = function (msg, otherArgs) {
        !utils.isUndefined(console) && console.error(msg, otherArgs)
    }
    mock = function (defaultOptions, options) {
        if (defaultOptions.hasOwnProperty('baseURL') && (utils.isBoolean(options.mock) && options.mock ||
            utils.isString(options.mock) && options.mock !== '')) {
            if (process.env.BUILD_MOCK === 'true') {
                defaultOptions.baseURL = (mockApiUrl.lastIndexOf('/') === (mockApiUrl.length - 1) ? mockApiUrl : mockApiUrl + '/') + 'mock'
            } else {
                // 开发环境指向指向开发端口号和mock路由
                defaultOptions.baseURL = 'http://localhost:' + port + '/mock'
            }

            // 分页pageIndex处理
            if (options.data.hasOwnProperty('pageIndex') && !defaultOptions.params.hasOwnProperty('pageIndex')) {
                defaultOptions.params['pageIndex'] = options.data.pageIndex
            }

            // 字符串表示指向某个json/js资源
            if (utils.isString(options.mock)) {
                defaultOptions.params['mock'] = options.mock
            }
        }
    }
}

export { mock, warn }
