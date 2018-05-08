import request from '../../../src/static/js/request.js'
import * as constants from '../../../src/static/js/constants.js'
import qs from 'qs'
import 'jasmine-ajax'
import { getAjaxRequest } from '../utils.js'

describe('request调用', () => {
    beforeEach(function () {
        jasmine.Ajax.install()
    })

    afterEach(function () {
        jasmine.Ajax.uninstall()
    })

    it('request调用', (done) => {
        var response
        var data = {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }
        }

        request({
            url: 'http://127.0.0.1:8040/Authorize',
            type: constants.POST,
            data: qs.stringify(data.model),
            headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
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

            // 传参为qs.stringify(data.model)
            expect(request.params).toBe(qs.stringify(data.model))
            expect(request.url).toBe('http://127.0.0.1:8040/Authorize')
            expect(request.method).toBe('POST')
            expect(request.requestHeaders['authorization']).toEqual('Basic V2ViQXBwOnNhcGlAMTIzNA==')

            setTimeout(function () {
                expect(response.data.access_token).toEqual('access_token')
                expect(response.status).toEqual(200)
                expect(response.statusText).toEqual('OK')
                expect(response.headers['content-type']).toEqual('application/json')
                done()
            }, 1000)
        })
    })

    it('request调用传入apiConfig', (done) => {
        var response
        var data = {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }
        }

        var config = {
            url: 'http://127.0.0.1:8040/Authorize',
            type: constants.POST,
            data: {
                model: 'body|stringify|object|required'
            }
        }

        request({
            data: data,
            headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
            success: function (data, res) { response = res }
        }, config)

        getAjaxRequest().then(function (request) {
            request.respondWith({
                status: 200,
                statusText: 'OK',
                responseText: '{"access_token": "access_token", "expires_in": 12342, "token_type": "password", "userId": "sapiadmin"}',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // 传参为qs.stringify(data.model)
            expect(request.params).toBe(qs.stringify(data.model))
            expect(request.url).toBe('http://127.0.0.1:8040/Authorize')
            expect(request.method).toBe('POST')
            expect(request.requestHeaders['authorization']).toEqual('Basic V2ViQXBwOnNhcGlAMTIzNA==')

            setTimeout(function () {
                expect(response.data.access_token).toEqual('access_token')
                expect(response.status).toEqual(200)
                expect(response.statusText).toEqual('OK')
                expect(response.headers['content-type']).toEqual('application/json')
                done()
            }, 1000)
        })
    })

    it('request调用传入apiConfig参数(只含data参数配置)', (done) => {
        var response
        var data = {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }
        }

        request({
            url: 'http://127.0.0.1:8040/Authorize',
            type: constants.POST,
            data: data,
            headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
            success: function (data, res) { response = res }
        }, { model: 'body|stringify' })

        getAjaxRequest().then(function (request) {
            request.respondWith({
                status: 200,
                statusText: 'OK',
                responseText: '{"access_token": "access_token", "expires_in": 12342, "token_type": "password", "userId": "sapiadmin"}',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // 传参为qs.stringify(data.model)
            expect(request.params).toBe(qs.stringify(data.model))
            expect(request.url).toBe('http://127.0.0.1:8040/Authorize')
            expect(request.method).toBe('POST')
            expect(request.requestHeaders['authorization']).toEqual('Basic V2ViQXBwOnNhcGlAMTIzNA==')

            setTimeout(function () {
                expect(response.data.access_token).toEqual('access_token')
                expect(response.status).toEqual(200)
                expect(response.statusText).toEqual('OK')
                expect(response.headers['content-type']).toEqual('application/json')
                done()
            }, 1000)
        })
    })
})
