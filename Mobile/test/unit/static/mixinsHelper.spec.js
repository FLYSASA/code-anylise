import mixinsHelper from '../../../src/static/js/mixinsHelper.js'
import utils from '../../../src/static/js/utils.js'
import * as constants from '../../../src/static/js/constants.js'
import request from '../../../src/static/js/request.js'

const configMixins = mixinsHelper.configMixins
const getMixins = mixinsHelper.getMixins

describe('configMixins', () => {
    it('参数config为非普通对象，配置无效且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(configMixins()).toBeFalsy()
        expect(configMixins(undefined)).toBeFalsy()
        expect(configMixins(null)).toBeFalsy()
        expect(configMixins([])).toBeFalsy()
        expect(configMixins(5)).toBeFalsy()
        expect(configMixins('')).toBeFalsy()
        expect(configMixins('abc')).toBeFalsy()
        expect(configMixins(function () { })).toBeFalsy()
        expect(configMixins(true)).toBeFalsy()
        expect(configMixins(true)).toBeFalsy()
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数config为空对象，配置无效且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(configMixins({})).toBeFalsy()
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数config为有效非空对象', () => {
        const config = {
            getBOStates: {
                methods: function () {
                    return function () {
                        var that = this
                        setTimeout(function () {
                            that.boStateOptions = [1, 2, 3]
                        }, 1000)
                    }
                },
                data: function () {
                    return {
                        boStateOptions: []
                    }
                }
            }
        }
        spyOn(utils, 'warn')
        expect(configMixins(config)).toBeTruthy()
        expect(utils.warn).not.toHaveBeenCalled()
    })
    it('参数config包含已配置过的mixins，可配置成功但会抛出警告', () => {
        const config = {
            getUserData: {
                methods: function () {
                    return function () {
                        var that = this
                        setTimeout(function () {
                            that.userData = { 'userName': 'sapiadmin' }
                        }, 1000)
                    }
                },
                data: function () {
                    return {
                        userData: null
                    }
                }
            }
        }
        configMixins(config)
        spyOn(utils, 'warn')
        expect(configMixins(config)).toBeTruthy()
        expect(utils.warn).toHaveBeenCalled()
    })
})

describe('getMixins', () => {
    const config = {
        // 举例，添加区域城市的数据
        // 该方式配置支持别名（同个vue实例调用两次，取不同名称）、支持动态参数
        getRegionCity: {
            // options为getMixins通过对象方式获取时传入的对象
            // 为了vue实例对应，这里取了methods名称
            methods: function (options) {
                options = options || {}

                return function () {
                    // 当前的this是vue实例
                    var that = this

                    request({
                        url: '',
                        type: constants.GET,
                        data: utils.isFunction(options.params) ? options.params.call(this) : (options.params || {}),
                        success: function (res) {
                            if (res.Code === 0) {
                                utils.isFunction(options.success) ? options.success.call(that, res, options) : (that.regionCityOptions = res.Data)
                            } else {
                                utils.isFunction(options.fail) ? options.fail.call(that, res, options) : (that.regionCityOptions = [])
                            }
                        }
                    })
                }
            },
            data: function (options) {
                if (utils.isUndefined(options) || utils.isUndefined(options.data)) {
                    return {
                        regionCityOptions: []
                    }
                }

                // 普通的对象：可重写data的名称
                if (utils.isPlainObject(options.data)) {
                    return options.data
                }

                // 指定函数中重写data的名称，需返回对象
                if (utils.isFunction(options.data)) {
                    return options.data(options)
                }
            }
        },
        // 如果确定该mixins方法不会出现参数、不需要支持别名，可简化配置
        getBOState: {
            methods: function () {
                return function () {
                    var that = this
                    request({
                        url: '',
                        type: constants.GET,
                        success: function (res) {
                            if (res.Code === 0) {
                                that.boStateOptions = res.Data
                            } else {
                                that.boStateOptions = []
                            }
                        }
                    })
                }
            },
            data: function () {
                return {
                    boStateOptions: []
                }
            }
        }
    }

    configMixins(config)

    it('参数config为非数组或者空数组，返回null且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(getMixins()).toBeNull()
        expect(getMixins(null)).toBeNull()
        expect(getMixins([])).toBeNull()
        expect(getMixins(5)).toBeNull()
        expect(getMixins(true)).toBeNull()
        expect(getMixins(function () { })).toBeNull()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数config为字符串数组，但未配置，返回null且抛出警告', () => {
        spyOn(utils, 'warn')
        // 当前getUserName未通过configMixins配置
        expect(getMixins(['getUserName'])).toBeNull()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数config为有效的字符串数组配置', () => {
        // getRegionCity外部已注册
        const mixins = getMixins(['getRegionCity', 'getBOState'])
        // 返回的mixins是一个包含data、methods、created的对象
        expect(mixins.hasOwnProperty('data')).toBeTruthy()
        // data包含regionCityOptions属性
        // 初始值等于配置的默认值
        expect(mixins.data.regionCityOptions).toEqual([])
        expect(mixins.data.boStateOptions).toEqual([])
        expect(mixins.hasOwnProperty('methods')).toBeTruthy()
        // methods存在getRegionCity属性
        // mixins.methods.getRegionCity是一个函数
        expect(utils.isFunction(mixins.methods.getRegionCity)).toBeTruthy()
        expect(utils.isFunction(mixins.methods.getBOState)).toBeTruthy()
        // 默认存在created属性，并且getRegionCity方法会created时执行
        expect(mixins.hasOwnProperty('created')).toBeTruthy()
    })

    it('参数config为有效的对象数组配置，支持异步参数、取消created执行', () => {
        // getRegionCity外部已注册
        const mixins = getMixins([{
            methods: 'getRegionCity',
            params: function () {
                // 当前的this是vue实例，可取得vue的data数据
                return {
                    province: this.currentProvince
                }
            },
            // created时不执行该方法
            created: false
        }, 'getBOState'])

        expect(mixins.hasOwnProperty('data')).toBeTruthy()
        expect(mixins.data.regionCityOptions).toEqual([])
        expect(mixins.data.boStateOptions).toEqual([])
        expect(mixins.hasOwnProperty('methods')).toBeTruthy()
        expect(utils.isFunction(mixins.methods.getRegionCity)).toBeTruthy()
        expect(utils.isFunction(mixins.methods.getBOState)).toBeTruthy()
    })

    it('参数config为有效对象数组配置，支持别名', () => {
        // 注意，并非真实例子
        const mixins = getMixins([
            {
                methods: 'getRegionCity',
                // 获取西部省市城市
                alias: 'getWestRegionCity',
                params: function () {
                    return {
                        region: 'West'
                    }
                },
                data: {
                    // 初始值，可指定多个data
                    westRegionCityOptions: []
                },
                // 别名必须重写data.regionCityOptions
                success: function (res, options) {
                    // 赋值给配置属性
                    this.westRegionCityOptions = res.Data
                },
                // 别名必须重写data.regionCityOptions
                fail: function (res, options) {
                    this.westRegionCityOptions = []
                }

            }, {
                methods: 'getRegionCity',
                // 获取东部省市城市
                alias: 'getEastRegionCity',
                params: function () {
                    return {
                        region: 'East'
                    }
                },
                data: {
                    // 初始值，可指定多个data
                    eastRegionCityOptions: []
                },
                // 别名必须重写data.regionCityOptions
                success: function (res, options) {
                    // 赋值给配置属性
                    this.eastRegionCityOptions = res.Data
                },
                // 别名必须重写data.regionCityOptions
                fail: function (res, options) {
                    this.eastRegionCityOptions = []
                }

            }])

        expect(mixins.hasOwnProperty('data')).toBeTruthy()
        expect(mixins.data.westRegionCityOptions).toEqual([])
        expect(mixins.data.eastRegionCityOptions).toEqual([])
        expect(mixins.hasOwnProperty('methods')).toBeTruthy()
        expect(utils.isFunction(mixins.methods.getEastRegionCity)).toBeTruthy()
        expect(utils.isFunction(mixins.methods.getWestRegionCity)).toBeTruthy()
    })
})
