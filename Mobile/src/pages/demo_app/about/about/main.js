import App from '@/static/js/app'
import { isApp } from '@/static/js/config'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
function showOsInfo () {
    var os = {
        name: App.device.getOsName(),
        version: App.device.getOsVersion(),
        appVersion: App.app.getAppVersion()
    }

    new Vue({
        el: '#app',
        data: {
            os
        },
        methods: {
            back () {
                App.app.back()
            },
            showOs () {
                alert(App.device.getOsName())
            },
            showOsVersion () {
                alert(App.device.getOsVersion())
            },
            showAppVersion () {
                alert(App.app.getAppVersion())
            },
            showAppServerVersion () {
                App.app.getAppServerVersion({
                    callback: function (result) {
                        if (result.code === '0') {
                            alert(result.data)
                        } else {
                            alert(result.msg)
                        }
                    }
                })
            },
            showAppId () {
                var appid = App.app.getAppId()
                alert(appid)
            },
            showAppInfo () {
                if (!this.appid) {
                    var appid = App.app.getAppId()
                    var appInfo = App.device.getApp(appid)
                    alert(JSON.stringify(appInfo))
                }
            },
            updateApp () {
                App.app.updateApp()
                this.appVersion = App.app.getAppVersion()
            },
            exitApp (msg) {
                App.app.exit(msg)
            },
            restartApp () {
                App.app.restart()
            },
            logoutApp () {
                App.cache.remove('login')
                App.app.quit()
            }
        }
    })
}

App.execMethod(showOsInfo, isApp)
