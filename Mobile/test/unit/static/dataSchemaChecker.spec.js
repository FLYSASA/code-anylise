import dataSchemaChecker from '../../../src/static/js/dataSchemaChecker.js'

describe('dataSchemaChecker.check', () => {
    it('一般的校验数据', () => {
        var data = {
            Code: 200,
            Data: [
                {
                    Name: '张三',
                    Mobile: 1512603921
                }
            ],
            Message: '获取成功'
        }
        var schema = {
            type: Object, // 可构造函数（Object)或者'Object'、'object'或者自定义的模型
            properties: {
                Code: Number,
                Data: {
                    type: Array,
                    items: {
                        type: Object,
                        properties: {
                            Name: String,
                            Mobile: Number
                        }
                    }
                },
                Message: String
            }
        }

        dataSchemaChecker.check(data, schema) // 校验成功
        // 没有异常信息
        expect(dataSchemaChecker.getWarnMsg().length).toEqual(0)

        var schema2 = {
            type: Object,
            properties: {
                Code: Number,
                Data: Object, // data.Data为数组，所以data校验会失败
                Message: String
            }
        }
        dataSchemaChecker.check(data, schema2) // 校验失败
        expect(dataSchemaChecker.getWarnMsg().length > 0).toBeTruthy()
    })

    it('指定命名空间校验', () => {
        var data = {
            Code: 200,
            Data: [
                {
                    Name: '张三',
                    Mobile: 1512603921
                }
            ],
            Message: '获取成功'
        }
        var schema = {
            type: Array,
            namespace: 'Data', // 验证data.Data
            items: {
                type: 'Object',
                properties: {
                    Name: ['String', 'Number'], // 满足其中一个
                    Mobile: 'Number'
                }
            }
        }

        dataSchemaChecker.check(data, schema) // 校验成功
        // 没有异常信息
        expect(dataSchemaChecker.getWarnMsg().length).toEqual(0)

        var schema2 = {
            type: Array,
            namespace: 'Data', // 验证data.Data
            items: {
                type: 'Object',
                properties: {
                    Name: ['String', 'Number'], // 满足其中一个
                    Mobile: 'Number',
                    Address: 'String' // data.Data数组项没有Address属性，所以校验发出警告
                }
            }
        }

        dataSchemaChecker.check(data, schema2)
        // 有异常信息
        expect(dataSchemaChecker.getWarnMsg().length > 0).toBeTruthy()
    })

    it('指定属性默认值', () => {
        var data = {
            Code: 200,
            Data: [
                {
                    Name: '张三',
                    Mobile: 1512603921
                }
            ],
            Message: '获取成功'
        }
        var schema = {
            type: Array,
            namespace: 'Data', // 验证data.Data
            items: {
                type: 'Object',
                properties: {
                    Name: ['String', 'Number'], // 满足其中一个
                    Mobile: 'Number',
                    Address: {
                        type: 'String',
                        default: '广东深圳'
                    }
                }
            }
        }

        var data2 = dataSchemaChecker.check(data, schema) // 校验会失败
        // 有命名空间的情况下，返回的是原数据
        expect(data2).toEqual(data)
        expect(dataSchemaChecker.getWarnMsg().length > 0).toBeTruthy()
        // 等于指定的默认值
        expect(data.Data[0].Address).toBe(schema.items.properties.Address.default)

        var data3 = {
            Code: 200,
            Data: null,
            Message: '获取成功'
        }
        var schema2 = {
            type: Array,
            namespace: 'Data', // 验证data.Data
            items: {
                type: 'Object',
                properties: {
                    Name: ['String', 'Number'], // 满足其中一个
                    Mobile: 'Number',
                    Address: {
                        type: 'String',
                        default: '广东深圳'
                    }
                }
            },
            default: []
        }

        dataSchemaChecker.check(data3, schema2)
        // 指定默认值
        expect(data3.Data).toEqual([])
        // 有警告消息
        expect(dataSchemaChecker.getWarnMsg().length > 0).toBeTruthy()
    })

    it('属性值默认是required为true，可设置required为false，避免警告', () => {
        var data = {
            Code: 200,
            Data: [{
                Name: '张三',
                Mobile: 1512603921
            }],
            Message: '获取成功'
        }
        var schema = {
            type: Array,
            namespace: 'Data', // 验证data.Data
            items: {
                type: 'Object',
                properties: {
                    Name: ['String', 'Number'], // 满足其中一个
                    Mobile: 'Number',
                    Address: {
                        type: 'String',
                        default: '广东深圳',
                        required: false
                    }
                }
            },
            default: []
        }

        dataSchemaChecker.check(data, schema)
        expect(dataSchemaChecker.getWarnMsg().length).toBe(0)
    })

    it('校验根数据（不指定命名空间），模型指定默认值，校验data为null或者undefined时，返回值是模型指定默认值', () => {
        var data = null
        var schema = {
            type: Object,
            properties: {
                Code: Number,
                Data: Array,
                Message: String
            },
            default: {
                Code: 200,
                Data: [],
                Message: '获取成功'
            }
        }

        var data2 = dataSchemaChecker.check(data, schema)
        expect(data2).toEqual(schema.default)
        expect(dataSchemaChecker.getWarnMsg().length).toBe(0)
    })
})

describe('dataSchemaChecker.addSchema', () => {
    it('Array/String/Boolean/Date/Number/Object基本类型不能加入自定义模型', () => {
        var personSchema = {
            name: 'Object',
            type: 'Object',
            properties: {
                Name: 'String',
                Mobile: 'Number'
            }
        }
        // 自定义模型对象必须要有type属性
        expect(dataSchemaChecker.addSchema({ name: 'Object' })).toBeFalsy()
        expect(dataSchemaChecker.addSchema(personSchema)).toBeFalsy()
    })

    it('添加自定义模型两种方式', () => {
        var schema = {
            name: 'Person', // name自动转换为首字母大写形式
            type: 'Object',
            properties: {
                Name: 'String',
                Mobile: 'Number'
            }
        }

        expect(dataSchemaChecker.addSchema(schema)).toBeTruthy()

        var schema2 = {
            type: 'Object',
            properties: {
                Name: 'String',
                Mobile: 'Number'
            }
        }

        expect(dataSchemaChecker.addSchema(schema2, 'Person2')).toBeTruthy()
    })

    it('已有的自定义模型不能重复添加', () => {
        var schema = {
            name: 'Person3',
            type: 'Object',
            properties: {
                Name: 'String',
                Mobile: 'Number'
            }
        }
        expect(dataSchemaChecker.addSchema(schema)).toBeTruthy()
        var schema2 = {
            name: 'person3',
            type: 'Object',
            properties: {
                Name: 'String',
                Mobile: 'Number'
            }
        }
        expect(dataSchemaChecker.addSchema(schema2)).toBeFalsy()
    })

    it('自定义模型校验', () => {
        var data = {
            Code: 200,
            Data: [
                {
                    Name: '张三',
                    Mobile: 1512603921
                }
            ],
            Message: '获取成功'
        }
        var personListSchema = {
            name: 'personList',
            type: Array,
            items: {
                type: Object,
                properties: {
                    Name: String,
                    Mobile: Number
                }
            }
        }
        var schema = {
            type: Object, // 可构造函数（Object)或者'Object'、'object'或者自定义的模型
            properties: {
                Code: Number,
                Data: 'personList',
                Message: String
            }
        }
        expect(dataSchemaChecker.addSchema(personListSchema)).toBeTruthy()
        dataSchemaChecker.check(data, schema) // 校验成功
        // 没有异常信息
        expect(dataSchemaChecker.getWarnMsg().length).toEqual(0)
    })
})
