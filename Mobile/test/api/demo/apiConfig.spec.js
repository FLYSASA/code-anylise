import helper from '../helper.js'
import { login, getClientList } from './apiConfig.js'

/**
 * its 是键值对形式，key为api定义的接口名称；value调用接口传递相关数据对象或者数据对象数组（多个测试用例），value属性配置如下:
 * value.it {string} 必须，测试用例的描述
 * value.data {object|string} 请求相关的数据
 * value.headers {object} 请求头信息
 * value.timeout {number} 可设置当前请求的超时时间，可选，默认是系统配置的超时时间
 * value.schema {object} 返回数据模型，可选，优于api定义的schema
 * value.error {function(err, res) {}} 可选，已请求错误，包含超时及status不等于200
 * value.success {function(res) {}} 可选，请求成功调用
 * value.beforeSend {function (agent, options) { }} 可选，请求调用前可设置请求信息，函数必须返回agent对象，需熟悉supertest接口
 */
export default [
    {
        it: '测试登录效果',
        data: {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '1234567'
            }
        },
        apiConfig: login,
        headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
        beforeSend: function (request) {
            return request
        },
        success: function (res) {
            // 保存登录信息，后面请求自动带上
            helper.setHeader({ 'authorization': res.body.token_type + ' ' + res.body.access_token })
        },
        error: function (err, res) {
            if (err) {
                return
            }
            console.log(res.text)
        },
        complete: function (err, res) {
            if (err) {
                return
            }
        }
    },
    {
        it: '获取列表页',
        data: {
            pageIndex: 1,
            pageSize: 10,
            keyword: ''
        },
        apiConfig: getClientList,
        success: function (res) {
            expect(res.body.Data.Rows.length < 10).toBeTruthy()
        }
    },
    {
        it: '关键字查询',
        apiConfig: getClientList,
        data: {
            pageIndex: 1,
            pageSize: 10,
            keyword: '客户'
        }
    }
]
