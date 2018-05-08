import utils from './utils.js'
import qs from 'qs'
import dataChecker from './dataSchemaChecker'
import * as constants from './constants.js'
import Vue from 'vue'
import {loginPage} from './config.js'

/**
 * 异步请求
 * @param options {object}请求配置
 *  @param options.url {string} 请求url
 *  @param options.type {string} 请求类型：GET/POST/PUT/DELTE
 *  @param options.data {any} 请求数据，适用于options.type为'PUT', 'POST', 'PATCH', GET默认转成params
 *  @param options.params {object} url参数，键值对形式，{keyword:'test'} 转成 ?keyword=test
 *  @param options.loading {boolean|string} 登录状态，字符串为登录状态信息
 *  @param options.success {function} 请求成功回调
 *  @param options.error {function} 错误回调
 *  @param options.complete {function} 请求完成回调，不管成功还是失败都执行
 *  @param options.dataType {string} 请求返回数据类型，默认‘json'
 *  @param options.headers {object} 请求头信息
 *  @param options.mock {boolean|string} 指定mock数据
 *  @param options.schema {object} 返回数据模型定义
 *  @param options.requireAuth {boolean} 请求是否要权限，默认为true
 * @param apiConfig {object} api配置，可选
 *  @param apiConfig.url {string} 接口url
 *  @param apiConfig.type {string} 请求方式
 *  @param apiConfig.mock {boolean|string} 统一mock数据
 *  @param apiConfig.data {object} 接口参数定义
 *   @param apiConfig.schema {object} 返回数据模型定义
 * @param requestConfig {object} 请求配置项，实现对checkOptions（请求参数校验）、beforeSend（请求发送前处理）、beforeSuccess(请求成功处理)等
 * @return Promise对象
 */
export default function request (options, apiConfig, requestConfig) {
    apiConfig = apiConfig || {}
    if (arguments.length > 1) {
        if (!utils.isPlainObject(apiConfig)) {
            utils.warn('调用request 参数apiConfig非对象', arguments)
        }

        options = options || {}

        options.url = options.url || apiConfig.url
        options.type = options.type || apiConfig.type
        options.data = options.data || {}

        if (utils.hasOwn(apiConfig, 'mock') && !utils.hasOwn(options, 'mock')) {
            options.mock = apiConfig.mock
        }

        if (utils.hasOwn(options, 'schema') || utils.hasOwn(apiConfig, 'schema')) {
            options.schema = options.schema || apiConfig.schema
        }
        // 没有data和url表示只是做参数效验
        if (!utils.hasOwn(apiConfig, 'url') && !utils.hasOwn(apiConfig, 'data')) {
            let configData = apiConfig
            apiConfig = {}
            apiConfig.data = configData
        }
    }

    if (!utils.isPlainObject(options)) {
        utils.warn('调用request 参数options非对象', arguments)
    }

    if (!utils.hasOwn(options, 'type') || !utils.hasOwn(options, 'url')) {
        utils.warn('调用request 参数options缺少type或url属性', arguments)
    }

    const defaultConfig = request.getConfig(requestConfig)

    if (utils.isFunction(defaultConfig.checkOptions)) {
        defaultConfig.checkOptions(options, apiConfig)
    }

    // 效验data，有传configData不考虑params参数，只允许传data
    if (apiConfig && utils.isPlainObject(apiConfig.data)) {
        checkParams(options, apiConfig.data)
    } else if (options.type.toLowerCase() === 'get' && utils.isPlainObject(options.data)) {
        options.params = options.params || {}
        // get请求，data参数转成params，同属性不覆盖params
        utils.assign(options.params, options.data)
    }

    let hideLoading
    if (utils.isFunction(defaultConfig.showLoading)) {
        hideLoading = defaultConfig.showLoading(options)
    }

    if (utils.isFunction(defaultConfig.beforeSend)) {
        let isContinue = defaultConfig.beforeSend(options)
        if (utils.isBoolean(isContinue) && !isContinue) {
            if (utils.isFunction(hideLoading)) {
                hideLoading()
            }
            return
        }
    }

    var oldSuccess
    if (options.hasOwnProperty('success')) {
        oldSuccess = options.success
    }
    options.success = function (data, response) {
        if (utils.isPlainObject(options.schema)) {
            data = dataChecker.check(data, options['schema'])
        }

        if (utils.isFunction(defaultConfig.beforeSuccess)) {
            // 可在defaultConfig中对返回值进一步处理
            let resultData = defaultConfig.beforeSuccess(data, response, options)
            // 有返回值则替换data，该data会继续传入success方法中，
            // 注意：data为null，默认不会执行success方法;
            if (!utils.isUndefined(resultData)) {
                data = resultData
            }
        }

        if (!utils.isNull(data) && utils.isFunction(oldSuccess)) {
            oldSuccess.call(options.context || window, data, response)
        }
    }

    return utils.http(options).then(function (data) {
        if (utils.isFunction(hideLoading)) {
            hideLoading()
        }

        if (data instanceof Error) {
            throw data
        }

        return data
    }).catch(function (error) {
        if (!utils.isFunction(options.error) && utils.isFunction(defaultConfig.error)) {
            defaultConfig.error(error, options)
        }

        return error
    })
}

// 默认配置项：可根据系统需要通过request.config更改
const defaultConfig = {
    showLoading: function (options) {
        let isLoading = false
        if (options.hasOwnProperty('loading')) {
            if (utils.isBoolean(options.loading) && options.loading) {
                isLoading = true
                Vue.$vux.loading && Vue.$vux.loading.show('')
            } else if (utils.isString(options.loading)) {
                isLoading = true
                Vue.$vux.loading && Vue.$vux.loading.show(options.loading)
            }
        }

        if (isLoading) {
            return function () {
                Vue.$vux.loading && Vue.$vux.loading.hide()
            }
        }
    },
    /**
     * 用于统一设置请求参数，比如'token', 'time', 'device', 'clientid'
     */
    checkOptions: function (options) {
        if (options.headers && options.headers.hasOwnProperty('authorization')) {
            return
        }

        let authorization = utils.localStorage.get('loginInfo')
        if (!utils.isEmpty(authorization)) {
            authorization = JSON.parse(authorization)
            if (authorization['access_token']) {
                options.headers = options.headers || {}
                options.headers['authorization'] = authorization['token_type'] + ' ' + authorization['access_token']
            }
        }

        if (!options.headers || !options.headers['authorization']) {
            utils.warn(`调用request 缺少请求头信息authorization`, options)
        }
    },
    /**
     * 请求前处理，例如，token超时失效；返回false，将不会继续请求
     * @return {boolean|any}
     */
    beforeSend: null,
    /**
     * 请求成功后的数据预处理，可统一处理错误信息；返回null值，会跳过options.success方法
     */
    beforeSuccess: null,
    /**
     * 请求异常处理
     */
    error: function (data, options) {
        var hasRes = data.hasOwnProperty('response')
        if (hasRes && data.response) {
            if (data.response.status === 401) {
                utils.localStorage.remove('loginInfo')
                if (Vue.$vux.toast) {
                    Vue.$vux.toast.show({
                        text: '登录账号过期',
                        position: 'bottom',
                        onHide () {
                            window.location.href = utils.setQueryString({ redirect: window.location.href }, defaultConfig.loginPage)
                        }
                    })
                }
            } else if (data.response.data && data.response.data.error) {
                Vue.$vux.toast && Vue.$vux.toast.text(data.response.data.error_description, 'bottom')
            }
        } else {
            Vue.$vux.toast && Vue.$vux.toast.text(data.message || '请求异常', 'bottom')
        }
    },
    loginPage: loginPage
}

/**
 * 同时支持多个项目，解决不同后端服务接口问题
 * @param config {object} 更改配置项
 */
request.getConfig = function (config) {
    if (!utils.isPlainObject(config)) {
        return defaultConfig
    }

    if (utils.isEmpty(config.id)) {
        utils.warn('调用request 参数options非对象', arguments)
        return defaultConfig
    }

    request.configCache = request.configCache || {}
    if (!request.configCache[config.id]) {
        request.configCache[config.id] = utils.assign(utils.assign({}, defaultConfig), config, true)
    }

    return request.configCache[config.id]
}

/**
 * 单项目时重置请求配置项
 * @param config {object} 更改配置项
 */
request.config = function (config) {
    utils.assign(defaultConfig, config || {}, true)
}

/**
 * 效验参数
 * @param {object} options 请求参数
 * @param {object} dataModel 请求参数模型
 */
function checkParams (options, dataModel) {
    const data = options.data
    let msg = ''
    let bodyParams = null
    let queryParams = null
    let stringify = null
    // 数据格式验证：必需、数据类型、替换url参数
    if (utils.isPlainObject(dataModel)) {
        Object.keys(dataModel).forEach(function (paramName) {
            if (!utils.isString(dataModel[paramName])) {
                msg += `参数${paramName}配置属性必须是字符串;`
                return true
            }
            let paramAttrs = dataModel[paramName]
            let required = paramAttrs.match(/\brequired\b/i)
            let paramType = paramAttrs.match(/\b(query|path|body)\b/i)
            let dataType = paramAttrs.match(/\b(boolean|string|number|array|object)\b/i)
            let hasProp = utils.hasOwn(data, paramName)
            if (!stringify) {
                stringify = paramAttrs.match(/\bstringify\b/i)
            }

            if (required && !hasProp) {
                msg += `参数${paramName}缺失;`
                return true
            }

            if (dataType && hasProp &&
                !utils.isType(utils.capitalizeTypeName(dataType[0]))(data[paramName])) {
                msg += `参数${paramName}类型错误;`
            }

            if (!hasProp) {
                return true
            }

            // 参数替换
            if (utils.isNull(paramType)) {
                paramType = 'query'
            } else {
                paramType = paramType[0]
            }

            switch (paramType.toLowerCase()) {
                case constants.PATH:
                    options['url'] = options['url'].replace('{' + paramName + '}', data[paramName])
                    if (paramName === 'pageIndex') {
                        queryParams = queryParams || {}
                        queryParams[paramName] = utils.isUndefined(data[paramName]) ? '' : data[paramName]
                    }
                    delete data[paramName]
                    break
                case constants.QUERY:
                    queryParams = queryParams || {}
                    queryParams[paramName] = utils.isUndefined(data[paramName]) ? '' : data[paramName]
                    delete data[paramName]
                    break
                case constants.BODY:
                    // 保存body到bodyParams，等遍历完成后处理
                    bodyParams = data[paramName]
                    break
            }
        })

        if (queryParams) {
            if (utils.isPlainObject(options.params)) {
                queryParams = utils.assign(options.params, queryParams, true)
            }

            options.params = queryParams
        }

        if (bodyParams) {
            options.data = stringify ? qs.stringify(bodyParams) : bodyParams
        }

        if (msg) {
            utils.warn(`调用request异常${options.url}：${msg}`, arguments)
        }
    }
}
