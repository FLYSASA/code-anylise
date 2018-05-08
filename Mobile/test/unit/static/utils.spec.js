import utils from '../../../src/static/js/utils.js'
import 'jasmine-ajax'
import { getAjaxRequest } from '../utils.js'

describe('utils.isType', () => {
    it('参数type为String', () => {
        const fun = utils.isType('String')
        expect(fun('1234323')).toBeTruthy()
        expect(fun(123432)).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(function () { return '' })).not.toBeTruthy()
        expect(fun({})).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Object', () => {
        const fun = utils.isType('Object')
        expect(fun({})).toBeTruthy()
        expect(fun(123432)).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(function () { return '' })).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Boolean', () => {
        const fun = utils.isType('Boolean')
        expect(fun(true)).toBeTruthy()
        expect(fun(false)).toBeTruthy()
        expect(fun(123432)).not.toBeTruthy()
        expect(fun(function () { return '' })).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Function', () => {
        const fun = utils.isType('Function')
        expect(fun(function () { })).toBeTruthy()
        expect(fun(123432)).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Date', () => {
        const fun = utils.isType('Date')
        expect(fun(new Date())).toBeTruthy()
        expect(fun(123432)).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Number', () => {
        const fun = utils.isType('Number')
        expect(fun(234124)).toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
    it('参数type为Array', () => {
        const fun = utils.isType('Array')
        expect(fun([])).toBeTruthy()
        expect(fun([1, 23, 3])).toBeTruthy()
        expect(fun(123)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun('123432')).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isArray', () => {
    it('参数obj为各种数据类型', () => {
        expect(utils.isArray([])).toBeTruthy()
        expect(utils.isArray([1, 23, 3])).toBeTruthy()
        expect(utils.isArray(123)).not.toBeTruthy()
        expect(utils.isArray(new Date())).not.toBeTruthy()
        expect(utils.isArray(true)).not.toBeTruthy()
        expect(utils.isArray('123432')).not.toBeTruthy()
        expect(utils.isArray(function () { })).not.toBeTruthy()
        expect(utils.isArray(null)).not.toBeTruthy()
        expect(utils.isArray(undefined)).not.toBeTruthy()
    })
})

describe('utils.isString', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isString
        expect(fun('123432')).toBeTruthy()
        expect(fun(123)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isBoolean', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isBoolean
        expect(fun(true)).toBeTruthy()
        expect(fun(false)).toBeTruthy()
        expect(fun(123)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun('1123')).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isFunction', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isFunction
        expect(fun(function () { })).toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(123)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun('1123')).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isDate', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isDate
        expect(fun(new Date())).toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(123)).not.toBeTruthy()
        expect(fun('1123')).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isNumber', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isNumber
        expect(fun(123)).toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun('1123')).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isInt', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isInt
        expect(fun(123)).toBeTruthy()
        expect(fun('123')).toBeTruthy()
        expect(fun(-123)).toBeTruthy()
        expect(fun('123.23')).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isNull', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isNull
        expect(fun(null)).toBeTruthy()
        expect(fun('123')).not.toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
    })
})

describe('utils.isUndefined', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isUndefined
        expect(fun(undefined)).toBeTruthy()
        expect(fun('123')).not.toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
    })
})

describe('utils.isNullOrUndefined', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isNullOrUndefined
        expect(fun(undefined)).toBeTruthy()
        expect(fun(null)).toBeTruthy()
        expect(fun('123')).not.toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
})

describe('utils.isNumeric', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isNumeric
        expect(fun('123')).toBeTruthy()
        expect(fun(-123)).toBeTruthy()
        expect(fun('123.23')).toBeTruthy()
        expect(fun(123.33)).toBeTruthy()
        expect(fun('123abd')).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
})

describe('utils.isPlainObject', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isPlainObject
        expect(fun({})).toBeTruthy()
        expect(fun({ a: 1 })).toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun('123abd')).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
})

describe('utils.isObject', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isObject
        expect(fun({})).toBeTruthy()
        expect(fun({ a: 1 })).toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun('123abd')).not.toBeTruthy()
        expect(fun(undefined)).not.toBeTruthy()
        expect(fun(null)).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
})

describe('utils.isEmpty', () => {
    it('参数obj为各种数据类型', () => {
        var fun = utils.isEmpty
        expect(fun('')).toBeTruthy()
        expect(fun(null)).toBeTruthy()
        expect(fun(undefined)).toBeTruthy()
        expect(fun({ a: 1 })).not.toBeTruthy()
        expect(fun(-123)).not.toBeTruthy()
        expect(fun('123abd')).not.toBeTruthy()
        expect(fun(function () { })).not.toBeTruthy()
        expect(fun(true)).not.toBeTruthy()
        expect(fun(false)).not.toBeTruthy()
        expect(fun(new Date())).not.toBeTruthy()
        expect(fun([])).not.toBeTruthy()
    })
})

describe('utils.capitalize', () => {
    it('参数letter为非字符串时发生异常', () => {
        var fun = function (letter) { return function () { utils.capitalize(letter) } }
        expect(fun(null)).toThrow()
        expect(fun(undefined)).toThrow()
        expect(fun({ a: 1 })).toThrow()
        expect(fun(-123)).toThrow()
        expect(fun(function () { })).toThrow()
        expect(fun(true)).toThrow()
        expect(fun(false)).toThrow()
        expect(fun(new Date())).toThrow()
        expect(fun([])).toThrow()
    })
    it('参数letter为空字符串', () => {
        expect(utils.capitalize('')).toBe('')
    })
    it('参数letter为非空字符串', () => {
        expect(utils.capitalize('abc')).toBe('Abc')
        expect(utils.capitalize('aBC')).toBe('Abc')
        expect(utils.capitalize('ABC')).toBe('Abc')
        expect(utils.capitalize('Abc')).toBe('Abc')
    })
})

describe('utils.capitalizeTypeName', () => {
    it('参数type为非字符串和非构造函数', () => {
        expect(utils.capitalizeTypeName(null)).toBe('')
        expect(utils.capitalizeTypeName(undefined)).toBe('')
        expect(utils.capitalizeTypeName(0)).toBe('')
        expect(utils.capitalizeTypeName(false)).toBe('')
        expect(utils.capitalizeTypeName(true)).toBe('')
        expect(utils.capitalizeTypeName(new Date())).toBe('')
        expect(utils.capitalizeTypeName({ a: 1 })).toBe('')
    })
    it('参数type为空字符串', () => {
        expect(utils.capitalizeTypeName('')).toBe('')
    })
    it('参数type为非空字符串', () => {
        expect(utils.capitalizeTypeName('object')).toBe('Object')
        expect(utils.capitalizeTypeName('oBject')).toBe('Object')
        expect(utils.capitalizeTypeName('OBJECT')).toBe('Object')
        expect(utils.capitalizeTypeName('Object')).toBe('Object')
    })
    it('参数type为构造函数', () => {
        expect(utils.capitalizeTypeName(Object)).toBe('Object')
        expect(utils.capitalizeTypeName(Number)).toBe('Number')
        expect(utils.capitalizeTypeName(Array)).toBe('Array')
        expect(utils.capitalizeTypeName(Boolean)).toBe('Boolean')
        expect(utils.capitalizeTypeName(String)).toBe('String')
    })
})

describe('utils.amountToChinese', () => {
    const fun = utils.amountToChinese
    it('参数amount为非数字格式', () => {
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun('')).toBe('')
        expect(fun(false)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(new Date())).toBe('')
        expect(fun({ a: 1 })).toBe('')
    })
    it('参数amount为Number类型', () => {
        expect(fun(100)).toBe('壹佰元整')
        expect(fun(0)).toBe('零元整')
    })
    it('参数amount为字符串数字格式', () => {
        expect(fun('100')).toBe('壹佰元整')
        expect(fun('111.11')).toBe('壹佰壹拾壹元壹角壹分')
        expect(fun('0')).toBe('零元整')
    })
})

describe('utils.parseInt', () => {
    const fun = utils.parseInt
    it('参数number不是有效数据格式', () => {
        spyOn(utils, 'warn')
        // 返回默认值0
        expect(fun(null)).toEqual(0)
        expect(fun(undefined)).toEqual(0)
        expect(fun(false)).toEqual(0)
        expect(fun(true)).toEqual(0)
        expect(fun(new Date())).toEqual(0)
        expect(fun({ a: 1 })).toEqual(0)
        expect(fun(function () { })).toEqual(0)
        // 且触发warn警告'
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数number为有效数据格式', () => {
        expect(fun(0)).toEqual(0)
        expect(fun('0')).toEqual(0)
        expect(fun(110)).toEqual(110)
        expect(fun('110')).toEqual(110)
        // 存在小数四舍五入
        expect(fun('110.55')).toEqual(111)
        expect(fun('110.45')).toEqual(110)
    })
    it('指定参数defaultValue', () => {
        spyOn(utils, 'warn')
        expect(fun(8, '')).toEqual(8)
        // number无效，返回指定默认值
        expect(fun('a', '')).toEqual('')
        expect(fun('a', '0')).toEqual('0')
        expect(fun(null, '空')).toEqual('空')
        expect(fun(undefined, '空')).toEqual('空')
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.parseDecimal', () => {
    const fun = utils.parseDecimal
    it('参数number不是有效数据格式', () => {
        spyOn(utils, 'warn')
        // 返回默认值'0.00'
        expect(fun(null)).toBe('0.00')
        expect(fun(undefined)).toBe('0.00')
        expect(fun(false)).toBe('0.00')
        expect(fun(true)).toBe('0.00')
        expect(fun(new Date())).toBe('0.00')
        expect(fun({ a: 1 })).toBe('0.00')
        expect(fun(function () { })).toBe('0.00')
        // 且触发warn警告'
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数number为有效数据格式', () => {
        expect(fun(0)).toBe('0.00')
        expect(fun('0')).toBe('0.00')
        expect(fun(110)).toBe('110.00')
        expect(fun('110')).toBe('110.00')
        expect(fun('110.55')).toBe('110.55')
        expect(fun('110.556')).toBe('110.56')
    })
    it('参数places为null、undefined、负数、0', () => {
        spyOn(utils, 'warn')
        // places取默认值2
        expect(fun(8, null)).toEqual('8.00')
        expect(fun(8, void 0)).toEqual('8.00')
        expect(fun(8, 0)).toEqual('8')
        expect(fun(8, -1)).toEqual('8.00')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数scale为有效正整数', () => {
        spyOn(utils, 'warn')
        expect(fun(8, 2)).toEqual('8.00')
        expect(fun(8, 4)).toEqual('8.0000')
        expect(fun(16, 0)).toEqual('16')
        expect(utils.warn).not.toHaveBeenCalled()
    })
    it('参数min、max为undefined、null', () => {
        spyOn(utils, 'warn')
        expect(fun(8, 2)).toEqual('8.00')
        expect(fun(8, 2, null, null)).toEqual('8.00')
        expect(fun(8, 2, null, undefined)).toEqual('8.00')
        expect(fun(8, 2, undefined)).toEqual('8.00')
        expect(fun(8, 2, undefined, undefined)).toEqual('8.00')
        // 不会抛出警告
        expect(utils.warn).not.toHaveBeenCalled()
    })
    it('参数min、max为非数字格式', () => {
        spyOn(utils, 'warn')
        expect(fun(8, undefined, '', '')).toEqual('8.00')
        expect(fun(8, undefined, true, true)).toEqual('8.00')
        expect(fun(8, undefined, false, true)).toEqual('8.00')
        expect(fun(8, 2, '', true)).toEqual('8.00')
        expect(fun(undefined, undefined, '', [])).toEqual('0.00')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数min、max为有效数字', () => {
        expect(fun(8, 2, 10)).toEqual('10.00')
        expect(fun(8, 2, 10, 12)).toEqual('10.00')
        expect(fun(14, 2, 10, 12)).toEqual('12.00')
        // 当最小值大于最大值时，最终返回最大值且会抛出警告
        expect(fun(13, 2, 14, 12)).toEqual('12.00')
    })
    it('指定参数defaultValue', () => {
        expect(fun(8, 2, undefined, undefined, '')).toEqual('8.00')
        expect(fun(null, 2, undefined, undefined)).toEqual('0.00')
        expect(fun(null, 2, undefined, undefined, '')).toEqual('')
        expect(fun(undefined, 2, undefined, undefined, '空')).toEqual('空')
        expect(fun(undefined, 2, undefined, undefined, '无')).toEqual('无')
    })
})

describe('utils.parsePercent', () => {
    const fun = utils.parsePercent
    it('参数number不是有效数据格式', () => {
        spyOn(utils, 'warn')
        // 返回默认值0
        expect(fun(null)).toEqual('')
        expect(fun(undefined)).toEqual('')
        expect(fun(false)).toEqual('')
        expect(fun(true)).toEqual('')
        expect(fun(new Date())).toEqual('')
        expect(fun({ a: 1 })).toEqual('')
        expect(fun(function () { })).toEqual('')
        // 且触发warn警告'
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数number为有效数据格式', () => {
        expect(fun(0)).toEqual('0%')
        expect(fun('0')).toEqual('0%')
        expect(fun('1')).toEqual('100%')
        expect(fun('0.9333')).toEqual('93%')
        expect(fun('0.9333', 2)).toEqual('93.33%')
        expect(fun('0.9333', 2, '0%')).toEqual('93.33%')
    })
    it('参数places为null、undefined、负数、0', () => {
        spyOn(utils, 'warn')
        expect(fun(0.5, null)).toEqual('50%')
        expect(fun(0.5, void 0)).toEqual('50%')
        expect(fun(0.5, 0)).toEqual('50%')
        expect(fun(0.5, -1)).toEqual('50%')
        // 且触发warn警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数places为有效正整数', () => {
        spyOn(utils, 'warn')
        expect(fun(0.5, 2)).toEqual('50.00%')
        expect(fun('0.5', 2)).toEqual('50.00%')
        expect(fun('0.5', 0)).toEqual('50%')
        expect(fun('1', 1)).toEqual('100.0%')
        expect(utils.warn).not.toHaveBeenCalled()
    })
    it('指定参数defaultValue', () => {
        spyOn(utils, 'warn')
        expect(fun(0.5, 2, '')).toEqual('50.00%')
        // number无效，返回指定默认值
        expect(fun('a', 2, '')).toEqual('')
        expect(fun('a', undefined, '0')).toEqual('0')
        expect(fun(null, undefined, '空')).toEqual('空')
        expect(fun(undefined, undefined, '无')).toEqual('无')
        // number无效不警告
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.toThousands', () => {
    const fun = utils.toThousands
    it('参数number不是有效数据格式', () => {
        spyOn(utils, 'warn')
        // 返回默认值0
        expect(fun(null)).toEqual('')
        expect(fun(undefined)).toEqual('')
        expect(fun(false)).toEqual('')
        expect(fun(true)).toEqual('')
        expect(fun(new Date())).toEqual('')
        expect(fun({ a: 1 })).toEqual('')
        expect(fun(function () { })).toEqual('')
        // 且触发warn警告'
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数number为有效数据格式', () => {
        expect(fun(100)).toEqual('100')
        expect(fun('100')).toEqual('100')
        expect(fun(1000)).toEqual('1,000')
        expect(fun('1000')).toEqual('1,000')
        expect(fun(1000.22)).toEqual('1,000')
        expect(fun('1000.22')).toEqual('1,000')
        // 保留小数位
        expect(fun(100, 1)).toEqual('100.0')
        expect(fun(100, 2)).toEqual('100.00')
        expect(fun('100', 2)).toEqual('100.00')
        expect(fun(1000, 2)).toEqual('1,000.00')
        expect(fun('1000', 2)).toEqual('1,000.00')
        expect(fun(1000.223, 2)).toEqual('1,000.22')
        expect(fun('1000.223', 2)).toEqual('1,000.22')
        expect(fun('1000.226', 2)).toEqual('1,000.23')
        expect(fun('1000.226', 2, '')).toEqual('1,000.23')
    })
    it('参数places为null、undefined、负数、0', () => {
        spyOn(utils, 'warn')
        expect(fun(100, null)).toEqual('100')
        expect(fun(1000, void 0)).toEqual('1,000')
        expect(fun(1000, 0)).toEqual('1,000')
        expect(fun(1000, -1)).toEqual('1,000')
        expect(fun('1000', -1)).toEqual('1,000')
        // 且触发warn警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数places为有效正整数', () => {
        spyOn(utils, 'warn')
        expect(fun(100, 2)).toEqual('100.00')
        expect(fun(1000, 2)).toEqual('1,000.00')
        expect(fun(1000, 0)).toEqual('1,000')
        expect(fun(1000, 1)).toEqual('1,000.0')
        expect(fun('1000.23', 1)).toEqual('1,000.2')
        expect(utils.warn).not.toHaveBeenCalled()
    })
    it('指定参数defaultValue', () => {
        spyOn(utils, 'warn')
        expect(fun(1000, 2, '')).toEqual('1,000.00')
        // number无效，返回指定默认值
        expect(fun('a', 2, '')).toEqual('')
        expect(fun('a', undefined, '0')).toEqual('0')
        expect(fun(null, undefined, '空')).toEqual('空')
        expect(fun(undefined, undefined, '无')).toEqual('无')
        // number无效不警告
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.unique', () => {
    it('参数arr为非数组', () => {
        spyOn(utils, 'warn')
        expect(utils.unique(null)).toEqual([])
        expect(utils.unique(undefined)).toEqual([])
        expect(utils.unique(0)).toEqual([])
        expect(utils.unique(false)).toEqual([])
        expect(utils.unique(true)).toEqual([])
        expect(utils.unique(new Date())).toEqual([])
        expect(utils.unique({ a: 1 })).toEqual([])
        expect(utils.unique(function () { })).toEqual([])
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数arr为数组类型', () => {
        expect(utils.unique([])).toEqual([])
        expect(utils.unique([1, 3, 4, 5, 4])).toEqual([1, 3, 4, 5])
        expect(utils.unique([1, 3, 4, 4])).toEqual([1, 3, 4])
        expect(utils.unique([1, 4, 3, 4, 4])).toEqual([1, 4, 3])
        expect(utils.unique(['1', 4, 1])).toEqual(['1', 4, 1])
        expect(utils.unique(['1', 4, '1', 1])).toEqual(['1', 4, 1])
    })
    it('参数arr为对象数组类型', () => {
        var obj = { a: 1 }
        expect(utils.unique([obj, { a: 1 }])).not.toEqual([{ a: 1 }])
        expect(utils.unique([obj, obj])).toEqual([obj])
    })
})

describe('utils.merge', () => {
    var fun = utils.merge
    it('参数为具体值', () => {
        var result = fun(null)
        expect(utils.isArray(result)).toBeTruthy()
        expect(result.length === 1).toBeTruthy()
        expect(result[0]).toBeNull()
        result = fun(null, undefined, 1, 'a')
        expect(result.length === 4).toBeTruthy()
        expect(result[1]).toBeUndefined()
        expect(result[2]).toBe(1)
        expect(result[3]).toBe('a')
    })
    it('参数为具体值，最后一个参数为Booelan类型', () => {
        var result = fun(1, 2, 3, 1, 2, true)
        expect(result.length).toEqual(3)
        expect(result).toEqual([1, 2, 3])
        // 过滤null、undefined，字符串'1'与数字1不重复
        result = fun('1', 1, null, null, undefined, undefined, true)
        expect(result.length).toEqual(4)
        expect(result[2]).toBeNull()
        expect(result[3]).toBeUndefined()

        result = fun(1, 2, 3, 1, 2, false)
        expect(result.length).toEqual(5)
        expect(result).toEqual([1, 2, 3, 1, 2])

        result = fun(true, true, true)
        expect(result.length).toEqual(1)
        expect(result).toEqual([true])

        result = fun(true, true, false)
        expect(result.length).toEqual(2)
        expect(result).toEqual([true, true])
    })
    it('参数为数组', () => {
        var result = fun([])
        expect(utils.isArray(result)).toBeTruthy()
        expect(result.length === 0).toBeTruthy()

        result = fun([1, 2])
        expect(result).toEqual([1, 2])

        var arr1 = [1, 2]
        result = fun(arr1)
        // 返回了一个新的数组
        expect(result === arr1).toBeFalsy()

        result = fun([1, 2], 2, 3)
        expect(result).toEqual([1, 2, 2, 3])

        result = fun([1, 2], [1, 2])
        expect(result.length === 4).toBeTruthy()
        expect(result).toEqual([1, 2, 1, 2])
    })

    it('参数为数组，最后一个参数为boolean类型', () => {
        var result = fun([1, 2, 1], true)
        expect(result).toEqual([1, 2])

        result = fun([1, 2], [1, 2], true)
        expect(result).toEqual([1, 2])

        result = fun([1, 2, 1], false)
        expect(result).toEqual([1, 2, 1])

        result = fun([1, 2], [1, 2], false)
        expect(result).toEqual([1, 2, 1, 2])
        // 返回结果同上
        var arr2 = fun([1, 2], [1, 2])
        expect(result).toEqual(arr2)
    })
})

describe('utils.transpose', () => {
    const fun = utils.transpose
    it('不传参数', () => {
        spyOn(utils, 'warn')
        fun()
        // 触发警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('缺少参数', () => {
        spyOn(utils, 'warn')
        var result = [1, 2]
        // 缺少索引/属性名称
        fun(result, 0)
        // 触发警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数错误，索引超出数组长度', () => {
        spyOn(utils, 'warn')
        var result = [1, 2]
        // 指定索引超过数组长度
        fun(result, 0, 2)
        // 触发警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数错误，对象不存在属性', () => {
        spyOn(utils, 'warn')
        var result = { a: 1 }
        // 不存在属性b
        fun(result, 'a', 'b')
        // 触发警告
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数为数组', () => {
        var arr = [1, 2]
        fun(arr, 0, 1)
        expect(arr[0]).toBe(2)
        expect(arr[1]).toBe(1)
    })
    it('参数为对象', () => {
        var obj = {
            a: 1,
            b: 2
        }
        fun(obj, 'a', 'b')
        expect(obj.a).toBe(2)
        expect(obj.b).toBe(1)
    })
})

describe('utils.namespace', () => {
    const fun = utils.namespace
    it('参数namespace不是字符串或者root为null/undefined，抛出异常', () => {
        var proxyFun = function (namespace, root) { return function () { fun(namespace, root) } }
        expect(proxyFun(null)).toThrow()
        expect(proxyFun(undefined)).toThrow()
        expect(proxyFun([])).toThrow()
        expect(proxyFun('a', undefined)).toThrow()
        expect(proxyFun('a', null)).toThrow()
    })
    it('参数namespace为空字符串，返回参数root', () => {
        var obj = {}
        var result = fun('', obj)
        expect(obj === result).toBeTruthy()
    })
    it('指定参数namespace在对象不存在相应属性，自动创建空对象', () => {
        var obj = {}
        var result = fun('a.b', obj)
        expect(result).toEqual({})
        expect(obj.a.b).toEqual({})
    })
    it('指定参数namespace在对象存在相应属性，返回该属性', () => {
        var obj = {
            a: {
                b: 1
            }
        }
        var result = fun('a.b', obj)
        expect(result).toEqual(1)
        expect(obj.a.b).toEqual(1)
    })
})

describe('utils.isExistNamespace', () => {
    const fun = utils.isExistNamespace
    it('参数namespace不是字符串或者root为null/undefined，抛出异常', () => {
        var proxyFun = function (namespace, root) { return function () { fun(namespace, root) } }
        expect(proxyFun(null)).toThrow()
        expect(proxyFun(undefined)).toThrow()
        expect(proxyFun([])).toThrow()
        expect(proxyFun('a', undefined)).toThrow()
        expect(proxyFun('a', null)).toThrow()
    })
    it('参数namespace为空字符串，抛出异常', () => {
        var proxyFun = function (namespace, root) { return function () { fun(namespace, root) } }
        expect(proxyFun('')).toThrow()
        expect(proxyFun('', undefined)).toThrow()
        expect(proxyFun('', null)).toThrow()
    })
    it('指定参数namespace在对象不存在相应属性，返回false', () => {
        var obj = {
            a: {
                b: 1
            }
        }
        expect(fun('a.c', obj)).toBeFalsy()
        expect(fun('a.b.c', obj)).toBeFalsy()
    })
    it('指定参数namespace在对象存在相应属性，返回true', () => {
        var obj = {
            a: {
                b: 1
            }
        }
        expect(fun('a', obj)).toBeTruthy()
        expect(fun('a.b', obj)).toBeTruthy()
    })
})

describe('utils.forEach', () => {
    const fun = utils.forEach
    it('参数data不是对象或者数组，触发警告', () => {
        spyOn(utils, 'warn')
        fun()
        fun(null)
        fun(undefined)
        fun(5)
        fun(true)
        fun(false)
        fun(function () { }, function () { })
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数callback不是函数，触发警告', () => {
        spyOn(utils, 'warn')
        var obj = { a: 1 }
        fun(obj)
        fun(obj, null)
        fun(obj, undefined)
        fun(obj, 5)
        fun(obj, true)
        fun(obj, false)
        fun(obj, obj)
        fun(obj, [])
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数data为数组，callback为处理函数', () => {
        var arr = [1, 2, 3]
        var newArr = []
        var valArr = []
        var keyArr = []
        var callback = function (value, key) {
            valArr.push(value)
            keyArr.push(key)
            newArr.push(value + 1)
        }
        fun(arr, callback)
        expect(newArr).toEqual([2, 3, 4])
        expect(valArr).toEqual([1, 2, 3])
        expect(keyArr).toEqual([0, 1, 2])
    })
    it('参数data为对象，callback为函数', () => {
        var obj = {
            a: 1,
            b: 2,
            c: 3
        }
        var valArr = []
        var keyArr = []
        var contextObj = null
        var callback = function (value, key) {
            valArr.push(value)
            keyArr.push(key)
            contextObj = this
        }
        fun(obj, callback)
        expect(valArr).toEqual([1, 2, 3])
        expect(keyArr).toEqual(['a', 'b', 'c'])
        // 函数上下文对象为obj
        expect(contextObj === obj).toBeTruthy()
    })
})

describe('utils.escapeHtml', () => {
    const fun = utils.escapeHtml
    it('参数target为非字符串，返回空字符串且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(fun()).toBe('')
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun(5)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(false)).toBe('')
        expect(fun({})).toBe('')
        expect(fun([])).toBe('')
        expect(fun(function () { })).toBe('')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数target为字符串，返回处理过字符串', () => {
        spyOn(utils, 'warn')
        expect(fun('abc')).toBe('abc')
        expect(fun('&')).toBe('&amp;')
        expect(fun('<')).toBe('&lt;')
        expect(fun('>')).toBe('&gt;')
        expect(fun('"')).toBe('&quot;')
        expect(fun('\'')).toBe('&#39;')
        expect(fun('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;')
        expect(fun('<h1>title</h1>')).toBe('&lt;h1&gt;title&lt;/h1&gt;')
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.unescapeHtml', () => {
    const fun = utils.unescapeHtml
    it('参数target为非字符串，返回空字符串且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(fun()).toBe('')
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun(5)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(false)).toBe('')
        expect(fun({})).toBe('')
        expect(fun([])).toBe('')
        expect(fun(function () { })).toBe('')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数target为字符串，返回处理过字符串', () => {
        spyOn(utils, 'warn')
        expect(fun('abc')).toBe('abc')
        expect(fun('&amp;')).toBe('&')
        expect(fun('&lt;')).toBe('<')
        expect(fun('&gt;')).toBe('>')
        expect(fun('&quot;')).toBe('"')
        expect(fun('&#39;')).toBe('\'')
        expect(fun('&amp;&lt;&gt;&quot;&#39;')).toBe('&<>"\'')
        expect(fun('&lt;h1&gt;title&lt;/h1&gt;')).toBe('<h1>title</h1>')
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.getQueryString', () => {
    const fun = utils.getQueryString
    it('参数name为空字符串，抛出警告', () => {
        spyOn(utils, 'warn')
        fun('')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('参数name为非字符串，抛出警告', () => {
        spyOn(utils, 'warn')
        expect(fun()).toBe('')
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun(5)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(false)).toBe('')
        expect(fun({})).toBe('')
        expect(fun([])).toBe('')
        expect(fun(function () { })).toBe('')
        expect(utils.warn).toHaveBeenCalled()
    })
    it('未指定url，默认取值当前url', () => { })
    it('指定可选参数url', () => {
        const url = 'http://localhost:8080/index?name=test'
        expect(fun('name', url)).toBe('test')
        expect(fun('keyword', url)).toBe('')
    })
})

describe('utils.setQueryString', () => {
    const fun = utils.setQueryString
    it('参数params为非普通对象，抛出警告', () => {
        spyOn(utils, 'warn')
        fun()
        fun(null)
        fun(undefined)
        fun(5)
        fun(true)
        fun(false)
        expect(utils.warn).toHaveBeenCalled()
    })
    it('未指定url，默认取值当前url', () => { })
    it('指定参数url为null/undefined/空字符串，抛出警告', () => {
        var params = { name: 'test' }
        spyOn(utils, 'warn')
        fun(params, null)
        fun(params, undefined)
        fun(params, 5)
        fun(params, true)
        fun(params, false)
        fun(params, [])
        fun(params, {})
        expect(utils.warn).toHaveBeenCalled()
    })
    it('指定可选参数url', () => {
        const url = 'http://localhost:8080/index'
        const url2 = 'http://localhost:8080/index?'
        const params = {
            name: 'test',
            keyword: 'testing'
        }
        expect(fun(params, url)).toBe('http://localhost:8080/index?name=test&keyword=testing')
        expect(fun(params, url2)).toBe('http://localhost:8080/index?name=test&keyword=testing')
        expect(fun(params, '')).toBe('name=test&keyword=testing')
    })
})

describe('utils.parseDate', () => {
    const fun = utils.parseDate

    it('参数strDate既不是字符串也不是日期， 默认返回null', () => {
        expect(fun(null)).toBeNull()
        expect(fun(undefined)).toBeNull()
        expect(fun(5)).toBeNull()
        expect(fun(true)).toBeNull()
        expect(fun(false)).toBeNull()
        expect(fun([])).toBeNull()
        expect(fun({})).toBeNull()
        expect(fun(function () { })).toBeNull()
    })

    it('参数strDate为空字符串，返回null', () => {
        expect(fun('')).toBeNull()
    })

    it('参数strDate不符合yyyy-MM-dd hh:mm格式，返回null', () => {
        expect(fun('abc')).toBeNull()
        expect(fun('2017_7_27')).toBeNull()
        expect(fun('20170727')).toBeNull()
        expect(fun('7/27/2017')).toBeNull()
    })

    it('参数strDate无效，指定defaultValue则返回defaultValue', () => {
        expect(fun(null, '')).toBe('')
        expect(fun(undefined, '')).toBe('')
        expect(fun(5, '')).toBe('')
        expect(fun(true, '')).toBe('')
        expect(fun(false, '无效日期')).toBe('无效日期')
        expect(fun([], '无效日期')).toBe('无效日期')
        expect(fun({}, '无效日期')).toBe('无效日期')
        expect(fun(function () { }, '无效日期')).toBe('无效日期')
        expect(fun('abc', '无效日期')).toBe('无效日期')
        expect(fun('2017_7_27', '无效日期')).toBe('无效日期')
        expect(fun('20170727', '无效日期')).toBe('无效日期')
        expect(fun('7/27/2017', '无效日期')).toBe('无效日期')
    })

    it('参数strDate为日期类型，返回strDate', () => {
        var date = new Date()
        expect(fun(date) === date).toBeTruthy()
    })

    it('参数strDate符合yyyy-MM-dd hh:mm格式，返回日期', () => {
        expect(fun('2017-07-27')).toEqual(new Date(2017, 6, 27, 0, 0, 0))
        expect(fun('2017/07/27')).toEqual(new Date(2017, 6, 27, 0, 0, 0))
        expect(fun('2017-07-27 14:10')).toEqual(new Date(2017, 6, 27, 14, 10))
        expect(fun('2017/07/27 14:10')).toEqual(new Date(2017, 6, 27, 14, 10))
        expect(fun('2017-07-27 14:10:33')).toEqual(new Date(2017, 6, 27, 14, 10, 33))
        expect(fun('2017/07/27 14:10:33')).toEqual(new Date(2017, 6, 27, 14, 10, 33))
    })
})

describe('utils.formatDate', () => {
    const fun = utils.formatDate
    it('参数date既不是字符串也不是日期， 返回空', () => {
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun(5)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(false)).toBe('')
        expect(fun([])).toBe('')
        expect(fun({})).toBe('')
        expect(fun(function () { })).toBe('')
    })

    it('参数date为空字符串，返回空字符串', () => {
        expect(fun('')).toBe('')
    })

    it('参数date为非日期格式字符串', () => {
        expect(fun('20170727')).toBe('')
        expect(fun('2017_7_27')).toBe('')
        expect(fun('7/27/2017')).toBe('')
    })

    it('参数date为日期格式字符串', () => {
        expect(fun('2017-07-27')).toBe('2017-07-27 00:00:00')
        expect(fun('2017-07-27', 'yyyy-MM-dd')).toBe('2017-07-27')
        expect(fun('2017-07-27 14:27', 'yyyy-MM-dd')).toBe('2017-07-27')
        expect(fun('2017-07-27 14:27', 'yyyy-MM-dd hh:mm')).toBe('2017-07-27 14:27')
    })

    it('参数date为日期数据类型', () => {
        var date = new Date(2017, 6, 27)
        expect(fun(date)).toBe('2017-07-27 00:00:00')
        expect(fun(date, 'yyyy-MM-dd hh:mm')).toBe('2017-07-27 00:00')
        expect(fun(date, 'yyyy-MM-dd')).toBe('2017-07-27')
        date = new Date(2017, 6, 27, 14, 27)
        expect(fun(date)).toBe('2017-07-27 14:27:00')
        expect(fun(date, 'yyyy-MM-dd hh:mm')).toBe('2017-07-27 14:27')
        expect(fun(date, 'yyyy-MM-dd')).toBe('2017-07-27')
    })
})

describe('utils.getDateInterval', () => {
    const fun = utils.getDateInterval
    it('参数start和参数end存在不是日期类型或者不是日期格式字符串，抛出警告且发生异常', () => {
        spyOn(utils, 'warn')
        expect(fun(null, null)).toBe(-1)
        expect(fun(null, null, 's')).toBe(-1)
        expect(fun(undefined, null)).toBe(-1)
        expect(fun(5, null)).toBe(-1)
        expect(fun(true, false)).toBe(-1)
        expect(fun(false, {})).toBe(-1)
        expect(fun([], '2017-07-27')).toBe(-1)
        expect(fun({})).toBe(-1)
        expect(fun(function () { })).toBe(-1)
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数unit不是有效参数，取默认值ms且抛出警告', () => {
        spyOn(utils, 'warn')
        expect(fun('2017-07-27', '2017-07-27', undefined)).toBe(0)
        expect(fun('2017-07-27', '2017-07-28', null)).toBe(1000 * 60 * 60 * 24)
        expect(fun('2017-07-27', '2017-07-28', 'y')).toBe(1000 * 60 * 60 * 24)
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数start、end、unit有效', () => {
        spyOn(utils, 'warn')
        expect(fun('2017-07-27', '2017-07-27', 'ms')).toBe(0)
        expect(fun('2017-07-27', '2017-07-28', 'ms')).toBe(1000 * 60 * 60 * 24)
        expect(fun('2017-07-27', '2017-07-28', 's')).toBe(60 * 60 * 24)
        expect(fun('2017-07-27', '2017-07-28', 'm')).toBe(60 * 24)
        expect(fun('2017-07-27', '2017-07-28', 'h')).toBe(24)
        expect(fun('2017-07-27', '2017-07-28', 'd')).toBe(1)
        var start = new Date(2017, 6, 27, 15)
        var end = new Date(2017, 6, 27, 16)
        expect(fun(start, start, 'ms')).toBe(0)
        expect(fun(start, end, 'ms')).toBe(1000 * 60 * 60)
        expect(fun(start, end, 's')).toBe(60 * 60)
        expect(fun(start, end, 'm')).toBe(60)
        expect(fun(start, end, 'h')).toBe(1)
        expect(fun(start, end, 'd')).toBe(1 / 24)
        expect(utils.warn).not.toHaveBeenCalled()
    })
})

describe('utils.getDateByDaysApart', () => {
    const fun = utils.getDateByDaysApart
    it('参数date不是日期类型或者不是日期格式字符串，抛出警告且发生异常', () => {
        spyOn(utils, 'warn')
        expect(fun(null)).toBeNull()
        expect(fun(undefined, 2, '')).toBe('')
        expect(fun(undefined, 2, '无效')).toBe('无效')
        expect(fun(5)).toBeNull()
        expect(fun(true)).toBeNull()
        expect(fun(false)).toBeNull()
        expect(fun([])).toBeNull()
        expect(fun({})).toBeNull()
        expect(fun(function () { })).toBeNull()
        expect(fun('')).toBeNull()
        expect(fun('20170727')).toBeNull()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数number不是有效数字，抛出警告', () => {
        spyOn(utils, 'warn')
        fun('2017-07-27', null)
        fun('2017-07-27', undefined)
        fun('2017-07-27', undefined)
        fun('2017-07-27', true)
        fun('2017-07-27', false)
        fun('2017-07-27', [])
        fun('2017-07-27', {})
        fun('2017-07-27', '')
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数date和参数number都有效，返回正确数据', () => {
        expect(fun('2017-07-27', 0)).toEqual(new Date(2017, 6, 27))
        expect(fun('2017-07-27', 3)).toEqual(new Date(2017, 6, 30))
        expect(fun('2017-07-27', -1)).toEqual(new Date(2017, 6, 26))
        expect(fun('2017-07-27 18:00', -0.5)).toEqual(new Date(2017, 6, 27, 6))
        expect(fun(new Date(2017, 6, 27), 0)).toEqual(new Date(2017, 6, 27))
        expect(fun(new Date(2017, 6, 27), 3)).toEqual(new Date(2017, 6, 30))
        expect(fun(new Date(2017, 6, 27), -1)).toEqual(new Date(2017, 6, 26))
        expect(fun(new Date(2017, 6, 27, 18), -0.5)).toEqual(new Date(2017, 6, 27, 6))
    })
})

describe('utils.setWorkDays', () => {
    const fun = utils.setWorkDays
    it('参数days不是数组，抛出警告', () => {
        spyOn(utils, 'warn')
        fun(null)
        fun(undefined)
        fun(5)
        fun(true)
        fun({})
        fun(function () { })
        fun('')
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数days数组项不属于0到6的整数，抛出警告', () => {
        spyOn(utils, 'warn')
        fun([1, 7])
        fun([1, null])
        fun([1, 'a'])
        fun([1, -1])
        fun([1, 0.5])
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数days为[]，星期一到星期日都不是工作日', () => {
        fun([])
        expect(utils.isWorkDay('2017-07-24')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-25')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-26')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-27')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-28')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-29')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-30')).toBeFalsy()
    })
    it('参数days为有效数组', () => {
        fun([1, 2, 3, 4, 5])
        expect(utils.isWorkDay('2017-07-24')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-25')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-26')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-27')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-28')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-29')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-30')).toBeFalsy()
    })
})

describe('utils.isWorkDay', () => {
    const fun = utils.isWorkDay
    it('参数date不是日期类型或者日期格式字符串，抛出警告且发生异常', () => {
        spyOn(utils, 'warn')
        var proxyFun = function (date) { return function () { fun(date) } }
        expect(proxyFun(null)).toThrow()
        expect(proxyFun(undefined)).toThrow()
        expect(proxyFun(5)).toThrow()
        expect(proxyFun(true)).toThrow()
        expect(proxyFun({})).toThrow()
        expect(proxyFun('')).toThrow()
        expect(proxyFun(function () { })).toThrow()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数days为有效数组', () => {
        utils.setWorkDays([1, 2, 3, 4, 5])
        expect(utils.isWorkDay('2017-07-24')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-25')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-26')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-27')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-28')).toBeTruthy()
        expect(utils.isWorkDay('2017-07-29')).toBeFalsy()
        expect(utils.isWorkDay('2017-07-30')).toBeFalsy()
    })
})

describe('utils.assign', () => {
    const fun = utils.assign
    it('参数target或者参数obj不是普通对象，抛出警告且返回target', () => {
        spyOn(utils, 'warn')
        var obj = {}
        expect(fun({}, null)).toEqual({})
        expect(fun(obj, null) === obj).toBeTruthy()
        expect(fun({}, 5)).toEqual({})
        expect(fun({}, true)).toEqual({})
        expect(fun({}, '')).toEqual({})
        expect(fun({}, function () { })).toEqual({})
        expect(fun(null, {})).toBeNull()
        expect(fun(undefined, {})).toBeUndefined()
        expect(fun(5, {})).toBe(5)
        expect(fun(true, {})).toEqual(true)
        expect(fun('', {})).toBe('')
        expect(typeof fun(function () { }, {}) === 'function').toBeTruthy()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数target和参数obj都为普通对象', () => {
        var target = {}
        fun(target, { a: 1 })
        expect(target.a).toBe(1)

        target = { a: 2 }
        fun(target, { a: 1 })
        // 默认不覆盖
        expect(target.a).toBe(2)
    })

    it('可选参数bCover，为false不覆盖已有属性，为true覆盖已有属性', () => {
        var target = { a: 2 }
        fun(target, { a: 1 }, false)
        expect(target.a).toBe(2)

        fun(target, { a: 1 }, true)
        expect(target.a).toBe(1)
    })

    it('可选参数bDepth，默认为false，为true表示深度覆盖属性', () => {
        var target = {
            a: 1
        }
        var obj = {
            b: {
                c: 4
            }
        }

        fun(target, obj)
        expect(target.b === obj.b).toBeTruthy()
        expect(target.b.c).toBe(4)

        target = {
            a: 1
        }
        fun(target, obj, false, true)
        expect(target.b !== obj.b).toBeTruthy()
        expect(target.b.c).toBe(4)
    })
})

describe('utils.http', () => {
    beforeEach(function () {
        jasmine.Ajax.install()
    })

    afterEach(function () {
        jasmine.Ajax.uninstall()
    })

    it('请求参数', (done) => {
        var response
        utils.http({
            url: 'http://172.56.10.62:8010/Authorize',
            data: JSON.stringify({
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }),
            headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
            type: 'POST',
            contentType: 'application/json',
            success: function (data, res) { response = res }
        })

        getAjaxRequest().then(function (request) {
            request.respondWith({
                status: 200,
                statusText: 'OK',
                responseText: '{"access_token": "access_token", "expires_in": 12342, "token_type": "password", "userId": "sapiadmin"}',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            expect(request.url).toBe('http://172.56.10.62:8010/Authorize')
            expect(request.method).toBe('POST')
            expect(request.requestHeaders['authorization']).toEqual('Basic V2ViQXBwOnNhcGlAMTIzNA==')

            setTimeout(function () {
                expect(response.data.access_token).toEqual('access_token')
                expect(response.status).toEqual(200)
                expect(response.statusText).toEqual('OK')
                expect(response.headers['content-type']).toEqual('application/json')
                done()
            }, 100)
        })
    })
})

describe('utils.getSingleton', () => {
    const fun = utils.getSingleton
    it('参数fn为非函数', () => {
        spyOn(utils, 'warn')
        expect(fun()).toBeNull()
        expect(fun({})).toBeNull()
        expect(fun(null)).toBeNull()
        expect(fun(5)).toBeNull()
        expect(fun(true)).toBeNull()
        expect(fun('')).toBeNull()
        expect(fun(undefined)).toBeNull()
        expect(fun([])).toBeNull()
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数fn为有效函数', () => {
        var fn = function () {
            return [] // 返回初始化的对象
        }
        var proxyFn = fun(fn)
        var arr = proxyFn()
        var arr2 = proxyFn()
        // arr与arr2为同一引用
        expect(arr === arr2).toBeTruthy()
        arr.push(4)
        var arr3 = proxyFn()
        expect(arr3[0]).toBe(4)
    })
})

describe('utils.hasOwn', () => {
    const fun = utils.hasOwn
    it('判断obj下是否存在属性prop', () => {
        var obj = {
            a: 1
        }
        expect(fun(obj, 'a')).toBeTruthy()
        expect(fun(obj, 'b')).toBeFalsy()
    })
})

describe('utils.hasOwns', () => {
    const fun = utils.hasOwns
    it('判断obj下是否存在一组属性props', () => {
        var obj = {
            a: 1,
            b: 2
        }
        expect(fun(obj, ['a', 'b'])).toBeTruthy()
        expect(fun(obj, ['a'])).toBeTruthy()
        expect(fun(obj, ['b'])).toBeTruthy()
        expect(fun(obj, ['a', 'b', 'c'])).toBeFalsy()
        expect(fun(obj, ['a', 'c'])).toBeFalsy()
        expect(fun(obj, ['c', 'd'])).toBeFalsy()
    })
})

describe('utils.localStorage', () => {
    var storage = utils.localStorage
    describe('utils.localStorage.set', () => {
        const fun = storage.set
        it('参数key为空字符串、非字符串；参数value为undefined/null，设置不成功且触发警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeFalsy()
            expect(fun({})).toBeFalsy()
            expect(fun(null)).toBeFalsy()
            expect(fun(5)).toBeFalsy()
            expect(fun(true)).toBeFalsy()
            expect(fun('')).toBeFalsy()
            expect(fun(undefined)).toBeFalsy()
            expect(fun([])).toBeFalsy()
            expect(fun('set', undefined)).toBeFalsy()
            expect(fun('set', null)).toBeFalsy()
            expect(utils.warn).toHaveBeenCalled()
        })

        it('参数key和参数value有效，设置成功', () => {
            spyOn(utils, 'warn')
            expect(fun('userName', 'zhangmq')).toBeTruthy()
            expect(window.localStorage.getItem('userName')).toBe('zhangmq')
            expect(utils.warn).not.toHaveBeenCalled()
            window.localStorage.clear()
        })
    })

    describe('utils.localStorage.get', () => {
        const fun = storage.get
        it('参数key为空字符串、非字符串， 返回null且抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeNull()
            expect(fun({})).toBeNull()
            expect(fun(null)).toBeNull()
            expect(fun(5)).toBeNull()
            expect(fun(true)).toBeNull()
            expect(fun('')).toBeNull()
            expect(fun(undefined)).toBeNull()
            expect(fun([])).toBeNull()
            expect(utils.warn).toHaveBeenCalled()
        })
        it('参数key为空字符串、非字符串，同时指定defaultValue， 返回defaultValue且不抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun({}, '')).toBe('')
            expect(fun(null, null)).toBeNull()
            expect(fun(5, 'key无效')).toBe('key无效')
            expect(fun('', '无')).toBe('无')
            expect(fun(undefined, '')).toBe('')
            expect(utils.warn).not.toHaveBeenCalled()
        })
        it('参数key有效', () => {
            spyOn(utils, 'warn')
            expect(fun('userName')).toBeNull()
            // 不存在指定返回默认值
            expect(fun('userName', '')).toBe('')
            window.localStorage.setItem('userName', 'zhangmq')
            expect(fun('userName')).toBe('zhangmq')
            expect(fun('userName', '')).toBe('zhangmq')
            window.localStorage.removeItem('userName')
            expect(fun('userName')).toBeNull()
            expect(utils.warn).not.toHaveBeenCalled()
        })
    })

    describe('utils.localStorage.remove', () => {
        const fun = storage.remove
        it('参数key为空字符串、非字符串， 返回false且抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeFalsy()
            expect(fun({})).toBeFalsy()
            expect(fun(null)).toBeFalsy()
            expect(fun(5)).toBeFalsy()
            expect(fun(true)).toBeFalsy()
            expect(fun('')).toBeFalsy()
            expect(fun(undefined)).toBeFalsy()
            expect(fun([])).toBeFalsy()
            expect(utils.warn).toHaveBeenCalled()
        })
        it('参数key为有效字符串， 返回true', () => {
            spyOn(utils, 'warn')
            expect(fun('userName')).toBeTruthy()
            window.localStorage.setItem('userName', 'zhangmq')
            expect(fun('userName')).toBeTruthy()
            expect(window.localStorage.getItem('userName')).toBeNull()
            expect(utils.warn).not.toHaveBeenCalled()
            window.localStorage.clear()
        })
    })

    it('utils.localStorage.clear', () => {
        const fun = storage.clear
        window.localStorage.setItem('userName', 'zhangmq')
        expect(window.localStorage.getItem('userName')).toBe('zhangmq')
        fun()
        expect(window.localStorage.getItem('userName')).toBeNull()
        expect(window.localStorage.length).toBe(0)
    })
})

describe('utils.cookie', () => {
    var cookie = utils.cookie
    describe('utils.cookie.set', () => {
        const fun = cookie.set
        it('参数key为空字符串、非字符串；参数value为undefined/null，设置不成功且触发警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeFalsy()
            expect(fun({})).toBeFalsy()
            expect(fun(null)).toBeFalsy()
            expect(fun(5)).toBeFalsy()
            expect(fun(true)).toBeFalsy()
            expect(fun('')).toBeFalsy()
            expect(fun(undefined)).toBeFalsy()
            expect(fun([])).toBeFalsy()
            expect(fun('set', undefined)).toBeFalsy()
            expect(fun('set', null)).toBeFalsy()
            expect(utils.warn).toHaveBeenCalled()
        })

        it('参数key和参数value有效，设置成功', () => {
            spyOn(utils, 'warn')
            expect(fun('userName', 'zhangmq')).toBeTruthy()
            expect(cookie.get('userName')).toBe('zhangmq')
            expect(utils.warn).not.toHaveBeenCalled()
            cookie.remove('userName')
        })
    })

    describe('utils.cookie.get', () => {
        const fun = cookie.get
        it('参数key为空字符串、非字符串， 返回null且抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeNull()
            expect(fun({})).toBeNull()
            expect(fun(null)).toBeNull()
            expect(fun(5)).toBeNull()
            expect(fun(true)).toBeNull()
            expect(fun('')).toBeNull()
            expect(fun(undefined)).toBeNull()
            expect(fun([])).toBeNull()
            expect(utils.warn).toHaveBeenCalled()
        })
        it('参数key为空字符串、非字符串，同时指定defaultValue， 返回defaultValue且不抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun({}, '')).toBe('')
            expect(fun(null, null)).toBeNull()
            expect(fun(5, 'key无效')).toBe('key无效')
            expect(fun('', '无')).toBe('无')
            expect(fun(undefined, '')).toBe('')
            expect(utils.warn).toHaveBeenCalled()
        })
        it('参数key有效', () => {
            spyOn(utils, 'warn')
            expect(fun('userName')).toBeNull()
            // 不存在指定返回默认值
            expect(fun('userName', '')).toBe('')
            cookie.set('userName', 'zhangmq')
            expect(fun('userName')).toBe('zhangmq')
            expect(fun('userName', '')).toBe('zhangmq')
            cookie.remove('userName')
            expect(fun('userName')).toBeNull()
            expect(utils.warn).not.toHaveBeenCalled()
        })
    })

    describe('utils.cookie.remove', () => {
        const fun = cookie.remove
        it('参数key为空字符串、非字符串， 返回false且抛出警告', () => {
            spyOn(utils, 'warn')
            expect(fun()).toBeFalsy()
            expect(fun({})).toBeFalsy()
            expect(fun(null)).toBeFalsy()
            expect(fun(5)).toBeFalsy()
            expect(fun(true)).toBeFalsy()
            expect(fun('')).toBeFalsy()
            expect(fun(undefined)).toBeFalsy()
            expect(fun([])).toBeFalsy()
            expect(utils.warn).toHaveBeenCalled()
        })
        it('参数key为有效字符串， 返回true', () => {
            spyOn(utils, 'warn')
            expect(fun('userName')).toBeTruthy()
            cookie.set('userName', 'zhangmq')
            expect(fun('userName')).toBeTruthy()
            expect(cookie.get('userName')).toBeNull()
            expect(utils.warn).not.toHaveBeenCalled()
            cookie.remove('userName')
        })
    })
})
