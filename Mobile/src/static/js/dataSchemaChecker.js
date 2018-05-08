/**
 * 数据模型检查对象
 * @author zhangmq
 * @date 2017-07-17
 */
import utils from './utils.js'

const customDataType = {}
const baseDataType = ['Array', 'String', 'Boolean', 'Date', 'Number', 'Object']

/**
 * 实现要求：
 * 1. 根级模型指定有效的namespace，校验data[namespace]下数据
 * 2. 具体属性值为null或者undefined都视为无效，除非指定required为false
 * 2. 有指定default值而相应数据属性值为null或者undefined，则取default值
 * 3. 数据缺少required字段则发出警告，除非指定default值会自动补全
 * 4. 指定namespace可验证根数据相应命名空间下的数据
 * 5. properties用于type为Object的模式，用于指定对象属性，必须是键值对形式，值可为String/字符串的Array/Object
 * 6. items用于type为Array的模式，用于指定数组项类型
 * 7. 若效验失败，utils.warn输出效验失败信息
 * @expamle
 *  var data = {
 *      Code: 200,
 *      Data: [
 *          {
 *              Name: '张三',
 *              Mobile: 1512603921
 *          }
 *      ],
 *      Message: '获取成功'
 *  }
 *  var schema = {
 *      type: Object, // 可构造函数（Object)或者'Object'、'object'或者自定义的模型
 *      properties:{
 *          Code:Number,
 *          Data:Array,
 *          Message:String
 *      }
 *  }
 *
 *  dataSchemaChecker.check(data, schema) // 效验成功
 *
 *  // namespace
 *  var itemSchema = {
 *      type: Array,
 *      namespace: 'Data', // 验证指定命名空间下的数据
 *      items: {
 *          type: 'Object',
 *          properties:{
 *              Name:['String','Number'], // 满足其中一个
 *              Mobile: 'Number',
 *              Address: String,
 *              City:{
 *                  type:'String'
 *                  default: '深圳'
 *              }
 *          }
 *      }
 *  }
 *
 *  // 效验失败，data.Data数组项数据缺少Address、City字段
 *  // 同时，data.Data数组项数据会自动添加City字段且赋值为'深圳'
 *  dataSchemaChecker.check(data, itemSchema)
 *
 *  // 自定义schema
 *  var personSchema = {
 *      name: 'Person' // 需指定名称
 *      type: 'Object',
 *      properties: {
 *          Name: 'String',
 *          Mobile: 'Number'
 *      }
 *  }
 *  dataSchemaChecker.addSchema(personSchema) // 必须先添加才可在type中使用
 *
 *  var schema3 = {
 *      type: 'Person' // 指向personSchema
 *  }
 */
const dataSchemaChecker = {
    /**
     * @method check
     * @param data {object} 校验数据
     * @param dataSchema {object} 对应的数据模型
     * @return {boolean|object}
     */
    check: function (data, dataSchema) {
        if (utils.isNullOrUndefined(data) || !utils.isPlainObject(dataSchema)) {
            utils.warn('dataSchemaChecker.check参数data或dataSchema错误')
        }

        var checkData = this.checkNamespace(data, dataSchema)
        var hasNamespace = checkData !== data
        var currentProp
        var parentNamespace
        var parentData
        if (hasNamespace) {
            var index = dataSchema['namespace'].lastIndexOf('.')
            if (index > 0) {
                currentProp = dataSchema['namespace'].slice(index)
                parentNamespace = dataSchema['namespace'].slice(0, index)
                parentData = utils.namespace(parentNamespace, data)
            } else {
                currentProp = dataSchema['namespace']
                parentData = data
            }
        } else if (utils.isNullOrUndefined(checkData) && dataSchema.hasOwnProperty('default')) {
            checkData = dataSchema['default']
        }

        this.warnMsgs = []
        if (hasNamespace) {
            this.checkSchemaChain(currentProp, parentData, dataSchema)
        } else {
            this.checkDataSchemaType(dataSchema)
            this.checkDataDefinition(dataSchema['type'], checkData, dataSchema)
        }
        if (this.warnMsgs.length) {
            utils.warn('dataSchemaChecker.check校验异常', data, dataSchema, this.warnMsgs)
        }
        // 存在命名空间下则返回原data，否则返回根模型指定的默认值
        return hasNamespace ? data : checkData
    },
    checkNamespace: function (data, dataSchema) {
        if (utils.isEmpty(dataSchema['namespace'])) {
            return data
        }

        if (utils.isExistNamespace(dataSchema['namespace'], data)) {
            data = utils.namespace(dataSchema['namespace'], data)
        } else {
            utils.warn('schema.checkNamespace不存在指定命名空间对象')
        }

        return data
    },
    checkDataSchemaType: function (dataSchema, noWarn) {
        var type
        if (!dataSchema.hasOwnProperty('type')) {
            this.addWarnMsg('schema.checkDataSchemaType参数dataSchema未配置type属性', dataSchema)
            return
        }

        type = utils.capitalizeTypeName(dataSchema['type'])

        if (!type) {
            this.addWarnMsg('schema.checkDataSchemaType参数type属性值配置错误', dataSchema)
        } else {
            dataSchema['type'] = type
        }
    },
    checkSchemaChain: function (prop, data, dataSchema, noWarn) {
        if (!utils.isPlainObject(dataSchema)) {
            return true
        }
        this.checkDataSchemaType(dataSchema, noWarn)
        var type = dataSchema['type']
        var result = this.checkBaseData(type, prop, data, dataSchema, noWarn)
        if (result === 'next') {
            result = this.checkCustomData(type, prop, data, dataSchema, noWarn)
        }

        if (result === 'next') {
            result = false
            this.addWarnMsg(`schema.checkSchemaChain不存在“${type}”CustomDataSchema`, type, data, dataSchema)
        }

        return result
    },
    checkCustomData: function (type, prop, data, dataSchema, noWarn) {
        if (this.isCustomDataType(type)) {
            var customSchema = this.getCustomDataSchema(type)

            // 附加dataSchema到定义属性
            dataSchema = Object.assign({}, customSchema, dataSchema)
            dataSchema['type'] = customSchema['type']
            this.checkSchemaChain(prop, data, dataSchema, noWarn)
        } else {
            return 'next'
        }
    },
    checkBaseData: function (type, prop, data, dataSchema, noWarn) {
        if (this.isBaseDataType(type)) {
            var typeFun = 'is' + type
            if (utils.hasOwnProperty(typeFun)) {
                var isErrorVal = utils.isNullOrUndefined(data[prop])
                // required为false、data无效，仍返回true
                if (isErrorVal) {
                    if (dataSchema.hasOwnProperty('default')) {
                        if (utils.isNullOrUndefined(dataSchema['default'])) {
                            this.addWarnMsg(`schema.checkBaseData参数dataSchema默认值不能为undefined/null`)
                            return false
                        }

                        data[prop] = dataSchema['default']
                    }
                }

                if (this.isRequired(dataSchema)) {
                    if (!data.hasOwnProperty(prop)) {
                        !noWarn && this.addWarnMsg(`schema.checkBaseData验证失败: data不存在属性${prop}`, type, data, dataSchema)
                        return false
                    }

                    if (isErrorVal) {
                        !noWarn && this.addWarnMsg(`schema.checkBaseData验证失败: data属性${prop}值为undefined/null`, type, data, dataSchema)
                        return false
                    }
                } else if (isErrorVal) {
                    return true
                }

                if (!utils[typeFun](data[prop])) {
                    !noWarn && this.addWarnMsg(`schema.checkBaseData验证失败: data.${prop}属性不是${type}类型`, type, data, dataSchema, prop)
                    return false
                }

                // 验证子模式：properties/items等
                return this.checkDataDefinition(type, data[prop], dataSchema)
            } else {
                this.addWarnMsg(`schema.checkBaseData不存在${type}验证函数`, type, data, dataSchema)
                return false
            }
        } else {
            return 'next'
        }
    },
    checkDataDefinition: function (type, data, dataSchema, noWarn) {
        if (!utils.isPlainObject(dataSchema)) {
            return true
        }
        var result = true
        switch (type) {
            case 'Object':
                result = this.checkObjectProperties(type, data, dataSchema, noWarn)
                break
            case 'Array':
                result = this.checkArrayItems(type, data, dataSchema, noWarn)
        }

        return result
    },
    checkObjectProperties: function (type, data, dataSchema, noWarn) {
        var result = true
        var rst
        if (dataSchema.hasOwnProperty('properties')) {
            if (utils.isPlainObject(dataSchema['properties'])) {
                var properties = dataSchema['properties']
                for (var prop in properties) {
                    // s 可能为字符串、字符串数组、对象、基本数据类型
                    var s = properties[prop]

                    if (utils.isString(s) || utils.isFunction(s)) {
                        rst = this.checkSchemaChain(prop, data, { type: s }, noWarn)
                        if (result && !rst) {
                            result = false
                        }
                    } else if (utils.isArray(s)) {
                        rst = false
                        for (var i = 0, len = s.length; i < len; i++) {
                            if (utils.isString(s[i])) {
                                rst = this.checkSchemaChain(prop, data, { type: s[i] }, true)
                                if (rst) {
                                    // 满足一个类型即可
                                    rst = true
                                    break
                                }
                            } else if (utils.isPlainObject(s[i])) {
                                rst = this.checkSchemaChain(prop, data, s[i], true)
                                if (rst) {
                                    // 满足一个类型即可
                                    rst = true
                                    break
                                }
                            } else {
                                this.addWarnMsg(`schema.checkObjectProperties指定properties.${prop}
                                    属性${s[i]}不是字符串和对象`, type, data, dataSchema)
                            }
                        }

                        if (result && !rst) {
                            this.addWarnMsg(`schema.checkObjectProperties指定properties.${prop}
                                    属性值不是有效值`, s, prop, data, dataSchema)
                            result = rst
                        }
                    } else if (utils.isPlainObject(s)) {
                        rst = this.checkSchemaChain(prop, data, s, noWarn)
                        if (result && !rst) {
                            result = false
                        }
                    } else {
                        this.addWarnMsg(`schema.checkObjectProperties指定properties.${prop}
                                    属性值只能是字符串、数组、普通对象`, type, data, dataSchema)

                        if (result) {
                            result = false
                        }
                    }
                }
            } else {
                result = false
                this.addWarnMsg(`schema.checkObjectProperties指定properties不是普通对象`, type, data, dataSchema)
            }
        }

        return result
    },
    checkArrayItems: function (type, data, dataSchema, noWarn) {
        if (data.length === 0) {
            return true
        }
        var result = true
        var rst
        var i
        var len
        // items配置项可对象、可数组(满足一项即可)、可字符串（直接指定基础类型或者自定义类型）
        if (dataSchema.hasOwnProperty('items')) {
            // 普通对象表示子模型，数组每项都必须验证该模型
            if (utils.isPlainObject(dataSchema['items'])) {
                for (i = 0, len = data.length; i < len; i++) {
                    rst = this.checkSchemaChain(i, data, dataSchema['items'], noWarn)
                    if (result && !rst) {
                        result = false
                    }
                }
            } else if (utils.isString(dataSchema['items'])) {
                for (i = 0, len = data.length; i < len; i++) {
                    rst = this.checkSchemaChain(i, data, { type: dataSchema['items'] }, noWarn)
                    if (result && !rst) {
                        result = false
                    }
                }
            } else if (utils.isArray(dataSchema['items'])) { // 数组项为字符串或者对象
                var items = dataSchema['items']
                if (items.length === 0) {
                    this.addWarnMsg(`schema.checkArrayItems参数dataSchema的items数组为空`, type, data, dataSchema)
                    return false
                }

                var allTrue = true
                for (i = 0, len = data.length; i < len; i++) {
                    rst = false
                    for (var j = 0, jLen = items.length; j < jLen; j++) {
                        // 满足一项即可
                        if (utils.isPlainObject(items[j])) {
                            rst = this.checkSchemaChain(i, data, items[j], true)
                            if (rst) {
                                break
                            }
                        } else if (utils.isString(items[j])) {
                            rst = this.checkSchemaChain(i, data, { type: items[j] }, true)
                            if (rst) {
                                break
                            }
                        }
                    }

                    if (!rst && allTrue) {
                        allTrue = false
                    }
                }

                result = allTrue
            }
        }

        return result
    },
    isRequired: function (dataSchema) {
        if (utils.isBoolean(dataSchema['required'])) {
            return dataSchema['required']
        }

        return true
    },
    addWarnMsg: function (msg, ...args) {
        this.warnMsgs.push({ msg, args })
    },
    isBaseDataType: function (type) {
        return baseDataType.indexOf(type) !== -1
    },
    isCustomDataType: function (type) {
        return customDataType.hasOwnProperty(type)
    },
    getCustomDataSchema: function (type) {
        if (this.isCustomDataType(type)) {
            return customDataType[type]
        }
    },
    addCustomDataSchema: function (dataSchema, name) {
        name = name || dataSchema['name']
        if (utils.isEmpty(name)) {
            utils.warn('dataSchemaChecker.addCustomDataSchema未指定参数name', dataSchema, name)
            return false
        }

        if (this.isBaseDataType(name)) {
            utils.warn('dataSchemaChecker.addCustomDataSchema不能添加基本数据类型', dataSchema, name)
            return false
        }

        if (!utils.isPlainObject(dataSchema) || utils.isPlainObject(dataSchema) && utils.isEmpty(dataSchema['type'])) {
            utils.warn('dataSchemaChecker.addCustomDataSchema参数schema不是普通对象或者未指定type属性', dataSchema, name)
            return false
        }

        name = utils.capitalize(name)

        if (utils.hasOwn(customDataType, name)) {
            utils.warn(`dataSchemaChecker.addCustomDataSchema 重复添加自定义数据模型${name}`, dataSchema, name)
            return false
        }

        customDataType[name] = dataSchema
        return true
    }
}

export default {
    /**
     * @method check
     * @param data {object} 校验数据
     * @param dataSchema {object} 对应的数据模型
     * @return {boolean|object}
     */
    check (data, dataSchema) {
        return dataSchemaChecker.check(data, dataSchema)
    },
    /**
     * 添加自定义数据模型
     * @param {Object} dataSchema
     * @param {string} name 可选
     * @return {boolean} 表示是否添加成功
     */
    addSchema (dataSchema, name) {
        return dataSchemaChecker.addCustomDataSchema(dataSchema, name)
    },
    getWarnMsg () {
        return dataSchemaChecker.warnMsgs
    }
}

