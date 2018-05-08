import 'babel-polyfill'
import qs from 'qs'
import App from '@/static/js/app'
import { isApp } from '@/static/js/config'
import utils from '@/static/js/utils'
import crypt from '../static/js/crypt'
import Vue from 'vue'
import '../static/css/seedsui.min.css'
import './login.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
function signIn (uname, pwd) {
    var time = new Date().valueOf()
    var device = App.device.getEsn() || 'web'
    var clientid = App.app.getClientId() || ''
    var data = JSON.stringify({ user: crypt(JSON.stringify({ uname: uname, pwd: pwd, time: time })) })

    utils.http({
        type: 'POST',
        url: 'api/home/login',
        data: qs.stringify({ time: time, device: device, clientid: clientid, data: data }),
        // headers: { 'content-type': 'application/json' },
        success: function (data, response) {
            if (data.code === '0') {
                App.device.register({
                    name: uname,
                    company: 'sapi',
                    success: function (rsp) {
                        // alert(JSON.stringify(rsp))
                    },
                    error: function (msg) {
                        alert(msg)
                    }
                })
                // save user info
                App.cache.set('user', JSON.stringify(data.data))
                // save login info
                App.cache.set('login', JSON.stringify({ uname: uname, pwd: pwd }))
                if (isApp) {
                    App.execScript('login()')
                } else {
                    window.location = './home/index.html'
                }
            } else {
                alert(data.msg)
            }
        },
        error: function (error) {
            if (error.response) {
                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                alert(error.response.statusText)
                // console.log(error.response.status)
                // console.log(error.response.headers)
                // console.log(error.response.data)
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(error.message)
            }
            // console.log(error.config)
            alert(JSON.stringify(error))
        }
    })
}

App.execMethod(function () {
    var login = App.cache.get('login')
    if (login) {
        login = JSON.parse(login)
        signIn(login.uname, login.pwd)
    } else {
        new Vue({
            el: '#loginbox',
            data: {
                uname: 'admin',
                pwd: 'SapI2017SapI'
            },
            methods: {
                login () {
                    if (!this.uname) {
                        alert('用户名不能为空。')
                        this.$refs.uname.focus()
                        return false
                    }
                    signIn(this.uname, this.pwd)
                }
            }
        })
    }
}, isApp)
