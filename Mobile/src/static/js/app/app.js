/* eslint-disable */
import base from './base'
import device from './device'

/**
 * 应用操作
 */
var app = {
    /**
     * 获取当前页面所属App的ID
     * @method App.app.getAppId
     */
    getAppId () {
        return base.isApp() ? ClientUtil.getAppId() : ''
    },

    /**
     * 获取App的名称
     * @method App.app.getAppName
     * @param {string} appId App的ID（应用插件标识）
     */
    getAppName (appId) {
        var app = device.getApp(appId || this.getAppId())
        if (app) {
            return app.appname
        }
        return ''
    },

    /**
     * 获取App的版本号
     * @method App.app.getAppVersion
     * @param {string} appId App的ID（应用插件标识）
     */
    getAppVersion (appId) {
        var app = device.getApp(appId || this.getAppId())
        if (app) {
            return app.localVersion
        }
        return ''
        // return base.isApp() ? ClientUtil.getCustomVersion() : ''
    },

    /**
     * 获取App的服务器端版本
     * @method App.app.getAppServerVersion
     * @param {json} options 选项参数
     * @param {string} options.appId App的ID（应用插件标识）
     * @param {function} options.callback 获取App的服务器端版本的回调函数
     */
    getAppServerVersion (options) {
        var appId = options.appId || this.getAppId()
        var appManager = window.appManager
        if (!appManager) {
            appManager = new AppManager()
            appManager.isGetAppsShowProgress = false
            appManager.onGetAppsCallback = function () {
                var result = { code: '0' }
                if (appManager.isGetAppsSuccess()) {
                    var list = appManager.applicationInfos
                    for (var i = 0; i < list.length; i++) {
                        if (appId === list[i].appid) {
                            result.data = list[i].serverVersion
                            break
                        }
                    }
                    if (!result.data) {
                        result.code = '-1'
                        result.msg = 'App不存在。'
                    }
                } else {
                    result.code = '-1'
                    result.msg = '获取失败。'
                }
                if (options.callback) {
                    options.callback(result)
                }
            }
            window.appManager = appManager
        }
        appManager.startGetApps()
    },

    /**
     * 获取客户端引擎版本号
     * @method App.app.getExmobiVersion
     */
    getExmobiVersion () {
        return base.isApp() ? ClientUtil.getVersion() : ''
    },

    /**
     * 获取App的客户端ID
     * @method App.app.getClientId
     */
    getClientId () {
        return base.isApp() ? ClientUtil.getClientId() : ''
    },

    /**
     * 苹果版App获取桌面应用图标气泡数字
     * @method App.app.getBadge
     */
    getBadge () {
        return (base.isApp() && device.getOsName() === 'ios') ? ClientUtil.getBadgeNumber() : 0
    },

    /**
     * 设置苹果版桌面应用图标气泡数字
     * @method App.app.setBadge
     * @param {number} number 显示数字
     */
    setBadge (number) {
        base.isApp() && device.getOsName() === 'ios' && ClientUtil.setBadgeNumber(number)
    },

    /**
     * 更新App
     */
    updateApp () {
        if (base.isApp()) {
            ClientUtil.startAppUpdate(function (result) {
                var code = parseInt(result.code)
                switch (code) {
                    case 0:
                        // 需要升级，等待升级；下面ios升级完重启的处理（不会自动重启）
                        if (device.getOsName() === 'ios') {
                            var oldVersion = device.getApp(ClientUtil.getAppId()).localVersion
                            var timer
                            (function restartApp () {
                                var newVersion = device.getApp(ClientUtil.getAppId()).localVersion
                                if (newVersion > oldVersion) {
                                    if (timer) {
                                        clearTimeout(timer)
                                    }
                                    ClientUtil.execScript("script:reloadapp")
                                } else {
                                    timer = setTimeout(restartApp, 500)
                                }
                            })()
                        }
                        break
                    case 1:
                        alert('当前已经是最新版本。')
                        break
                    case 2:
                        alert('更新失败。')
                        break
                }

            })
        }
    },

    /**
     * 回退
     * @method App.app.back
     */
    back () {
        base.isApp() ? base.execScript('App.back()') : window.history.back()
    },

    /**
     * 退出登录
     * @method App.app.quit
     */
    quit () {
        base.isApp() && base.execScript('App.quit()')
    },

    /**
     * 关闭App
     * @method App.app.exit
     * @param {string} msg alert提示框内容
     */
    exit (msg) {
        if (base.isApp()) {
            if (msg && typeof (msg) === 'string') {
                ClientUtil.exit(msg)
            } else {
                ClientUtil.exitNoAsk()
            }
        }
    },

    /**
     * 重启App
     * @method App.app.restart
     */
    restart () {
        base.isApp() && ClientUtil.execScript("script:reloadapp")
    }
}

export default app
