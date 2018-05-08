import request from 'supertest'
import qs from 'qs'
import utils from '../../src/static/js/utils.js'
import dataSchemaChecker from '../../src/static/js/dataSchemaChecker'
import { timeout, apiUrl } from '../../src/static/js/config'
import * as constants from '../../src/static/js/constants'

const agent = request.agent('http://172.56.10.62:8040' || apiUrl)

const helper = {
    /**
    * its 是键值对形式，key为api定义的接口名称；value调用接口传递相关数据对象或者数据对象数组（多个测试用例），value属性配置如下:
    * value.it {string} 必须，测试用例的描述
    * value.apiConfig {object} api配置对象
    * value.data {object|string} 请求相关的数据
    * value.headers {object} 请求头信息
    * value.timeout {number} 可设置当前请求的超时时间，可选，默认是系统配置的超时时间
    * value.schema {object} 返回数据模型，可选，优于api定义的schema
    * value.error {function(err, res) {}} 可选，已请求错误，包含超时及status不等于200
    * value.success {function(res) {}} 可选，请求成功调用
    * value.complete {function(err, res) {}) 可选请求完成
    * value.beforeSend {function (agent, options) { }} 可选，请求调用前可设置请求信息，函数必须返回agent对象，需熟悉supertest接口
    */
    test: function (its) {
        const _this = this
        describe(`开始api测试`, () => {
            if (utils.isArray(its)) {
                its.forEach(function (it) {
                    _this.generateIt(it)
                })
            } else if (utils.isPlainObject(its)) {
                _this.generateIt(its)
            }
        })
    },
    generateIt: function (itData) {
        const _this = this
        let time = itData.timeout || timeout
        if (utils.isEmpty(itData.it) || !utils.isPlainObject(itData.apiConfig) || !utils.hasOwns(itData.apiConfig, ['url', 'type'])) {
            it(`测试用例属性it或者属性apiConfig无效：${JSON.stringify(itData)}`, () => {
                expect(1).toBe(0)
            })
        } else {
            it(`${itData.it}`, (done) => {
                const options = this.getOptions(itData)
                const agent = this.getAgent(options)
                if (utils.isFunction(agent.end)) {
                    _this.getAgentSend(agent, options, done)
                } else {
                    expect(`${options.url}：${options.it} agent处理过程中错误`).toBe('')
                }
            }, time)
        }
    },
    getAgentSend: function (agent, options, done) {
        agent.end(function (err, res) {
            if (err) {
                if (err.timeout) {
                    expect(`${options.url}：${options.it}请求超时`).toBe('')
                }
                if (utils.isFunction(options.error)) {
                    options.error(err, res)
                }
            } else {
                const status = res.status
                if (status === 200) {
                    if (utils.isPlainObject(options.schema)) {
                        dataSchemaChecker.check(res.body, options.schema)
                        expect(dataSchemaChecker.getWarnMsg().length).toBe(0)
                    }
                    if (utils.isFunction(options.success)) {
                        options.success(res)
                    }
                } else {
                    switch (status) {
                        case 401:
                            expect('请求头未指定授权信息').toBe(res.text)
                            break
                        case 400:
                            expect(`请求语法错误`).toBe(res.text)
                            break
                        case 404:
                            expect('请求未找到').toBe(res.text)
                            break
                        case 403:
                            expect('请求被禁止').toBe(res.text)
                            break
                        default:
                            expect(`请求状态码为：${status}；msg:${res.text}`).toBe(res.text)
                    }

                    if (utils.isFunction(options.error)) {
                        options.error(null, res)
                    }
                }
            }

            if (utils.isFunction(options.complete)) {
                options.complete(err, res)
            }
            done(err)
        })
    },
    getOptions: function (itData) {
        const options = {}
        const apiConfig = itData['apiConfig']
        options.url = apiConfig['url']
        options.timeout = itData.timeout || timeout
        options.send = itData.data
        options.beforeSend = itData.beforeSend
        options.schema = itData['schema'] || apiConfig['schema']
        options.error = itData['error']
        options.success = itData['success']
        options.it = itData['it']
        options.complete = itData['complete']

        let hasType = itData.hasOwnProperty('type')
        let type = hasType ? itData['type'] : apiConfig['type']

        options.type = this.getType(type)

        this.parseData(apiConfig['data'], options)
        this.parseHeader(options, itData)

        return options
    },
    parseHeader: function (options, itData) {
        const headers = itData['headers']
        let set = options.set || {}
        const _this = this
        // 添加公共的header
        if (utils.isPlainObject(this.headers)) {
            Object.keys(this.headers).forEach(function (prop) {
                set[prop.toLowerCase()] = _this.headers[prop]
            })
        }
        if (utils.isPlainObject(headers)) {
            Object.keys(headers).forEach(function (prop) {
                set[prop.toLowerCase()] = headers[prop]
            })
        }
        options.set = set
    },
    setHeader: function (header) {
        const _this = this
        if (utils.isPlainObject(header)) {
            Object.keys(header).forEach(function (prop) {
                // 设置值为null等于删除
                if (utils.isNull(header[prop])) {
                    delete _this.headers[prop.toLowerCase()]
                } else {
                    _this.headers[prop.toLowerCase()] = header[prop]
                }
            })
        }
    },
    parseData: function (dataModel, options) {
        const data = options.send
        var msg = ''
        var bodyParams = null
        var queryParams = null
        var stringify = null
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
                options.query = queryParams
            }

            if (bodyParams) {
                options.send = stringify ? qs.stringify(bodyParams) : bodyParams
                options.set = options.set || {}
                options.set['Content-Type'] = 'application/json'
            }

            if (msg) {
                expect(msg).toBe('')
            }
        }
    },
    getType: function (type) {
        type = type.toLowerCase()
        if (type === 'delete') {
            type = 'del'
        }
        return type
    },
    getAgent: function (options) {
        /**
         * set: 设置表头信息
         * query: url传参
         * timeout: 设置超时时间
         * send: post body数据
         * beforeSend: 提供操作agent的方法，agent必须作为返回值
         */
        const list = ['timeout', 'set', 'query', 'send', 'beforeSend']
        return list.reduce(function (agent, prop) {
            if (options.hasOwnProperty(prop)) {
                if (prop === 'beforeSend') {
                    if (utils.isFunction(options[prop])) {
                        return options['beforeSend'](agent, options)
                    } else {
                        return agent
                    }
                }
                return agent[prop](options[prop])
            } else {
                return agent
            }
        }, agent[options.type](options.url))
    },
    headers: {}
}

export default {
    test (its) {
        helper.test(its)
    },
    setHeader (header) {
        helper.setHeader(header)
    }
}
