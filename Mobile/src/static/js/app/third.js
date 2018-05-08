/* eslint-disable */
import base from './base'
import device from './device'
import qs from 'qs'

/**
 * 交互集成操作
 */
var third = {
    /**
     * 调用系统浏览器打开指定url
     * @method App.thrid.browseUrl
     * @param {string} url 页面url地址
     */
    browseUrl (url) {
        base.isApp() && NativeUtil.browser(url)
    },

    /**
     * 用webview打开网络页面
     * @method App.thrid.openUrl
     * @param {json} options 选项参数
     * @param {string} options.url 需要打开的网络页面的url地址
     * @param {number} options.zoom 页面是否支持缩放（0:不支持缩放/1:支持缩放，默认0）
     * @param {number} options.showProgress url加载时顶部进度条是否显示（0:不显示进度条/1:显示进度条，默认1）
     * @param {number} options.showBack 标题栏是否显示返回按钮（0:不显示/1:显示，默认1）
     * @param {number} options.showClose 标题栏是否显示关闭按钮（0:不显示/1:显示，默认1）
     * @param {number} options.showMenu 标题栏右侧是否显示菜单按钮（0:不显示/1:显示，默认1）
     * @param {number} options.showImShare 分享菜单是否显示IM分享（0:不显示/1:显示，默认0）
     */
    openUrl (options) {
        if (options.url.substr(0, 7).toLowerCase() !== 'http://' && options.url.substr(0, 8).toLowerCase() !== 'https://') {
            base.openPage(url)
        }
        else if (base.isApp()) {
            var params = {
                url: options.url,
                isZoom: options.zoom === 1 ? 1 : 0,
                isShowProgress: options.showProgress === 0 ? 0 : 1,
                config: {
                    showBack: options.showBack === 0 ? 0 : 1,
                    showClose: options.showClose === 0 ? 0 : 1,
                    showMenu: options.showMenu === 0 ? 0 : 1,
                    showImShare: options.showImShare === 1 ? 1 : 0
                }
            }
            ClientUtil.openExMobiWebview(params)
        } else {
            window.location = url
        }
    },

    /**
     * 打开第三方App
     * @method App.thrid.openApp
     * @param {json} options 选项参数
     * @param {string} options.url 苹果App的注册名（快捷名称）
     * @param {string} options.package 安卓App的包名
     * @param {string} options.activity 安卓App的入口activity名
     * @param {json} options.data 传递的参数值，参数的key和value不能包含字符&=|:
     * @param {string} options.downloadUrl 第三方App的下载地址
     * @param {boolean} options.isExmobi 第三方App是否Exmobi应用
     */
    openApp (options) {
        if (base.isApp()) {
            var errorMsg = '您还未安装相关App，请先安装。'
            if (options.isExmobi === true) {
                for (var key in options.data) {
                    options.data[key] = options.data[key].toString('base64')
                }
            }
            switch (device.getOsName()) {
                case 'ios':
                    NativeUtil.openShareApp(options.url, options.data ? qs.stringify(options.data) : '', options.downloadurl, errorMsg)
                    break
                case 'android':
                    var data = ''
                    if (options.data) {
                        for (var key in options.data) {
                            data += `|${key}:${options.data[key]}`
                        }
                        if (data !== '') {
                            data = data.substr(1)
                        }
                    }
                    NativeUtil.startActivity(options.package, options.activity, data, '1', function (status) {
                        status = parseInt(status)
                        if (status === 0) {
                            alert(errorMsg)
                            if (options.downloadUrl) {
                                NativeUtil.browser(options.downloadUrl)
                            }
                        } else if (status === 1) {
                            alert('调用第三方App失败。')
                        }
                    })
                    break
            }
        }
    },

    /**
     * 获取第三方应用传递参数集合（json格式）
     * @method App.thrid.getThirdParams
     */
    getThirdParams () {
        var pararms = ExMobiWindow.getNativeParameters()
        if (params && pararms.length) {
            var data = {}
            for (var i in params) {
                data[params[i].key] = params[i].value
            }
            return data
        }
        return null
    },

    /**
     * 获取第三方应用传递参数指定key的value值
     * @method App.thrid.getThirdParam
     * @param {string} key 第三方native应用传递参数的key值
     */
    getThirdParam (key) {
        return ExMobiWindow.getNativeParameter(key)
    },

    /**
     * 一键分享，支持分享到：QQ好友、QQ空间、微信好友、微信朋友圈、新浪微博
     * @param {json} options 分享的内容
     * @param {string} options.type 分享类型（text:文本/image:图片/news:图文）
     * @param {string} options.title 分享标题（news）
     * @param {string} options.url 分享链接地址（news）
     * @param {string} options.text 分享的文本内容（text/news）
     * @param {string} options.imgPath 分享的图片路径（image/news）
     */
    openShare (options) {
        if (base.isApp()) {
            var data = {}
            var os = device.getOsName()
            switch (options.type) {
                case 'text':
                    data.type = options.type
                    data.text = options.text
                    break
                case 'image':
                    data.type = options.type
                    data.imgPath = base.getSysPath(options.imgPath)
                    break
                case 'news':
                    data.type = options.type
                    data.title = options.title
                    data.url = options.url
                    data.description = options.text
                    data.imgPath = base.getSysPath(options.imgPath)
                    break
            }

            base.execScript(`ClientUtil.oneKeyShare(${JSON.stringify(data)})`)

            /*
            ClientUtil.oneKeyShare(data, function (result) {
                var code = parseInt(result.code)
                if (code === 0) {
                    var toast = new Toast()
                    toast.setDuration(1000)
                    toast.setText("分享成功。")
                    toast.show()
                } else {
                    var msg = '分享失败'
                    switch (options.type) {
                        case 'text':
                            if (os === 'ios') {
                                msg += '（可能的原因：不支持分享纯文本到QQ空间）'
                            } else if (os === 'android') {
                                msg += '（可能的原因：不支持分享纯文本到QQ好友和QQ空间）'
                            }
                            break
                        case 'image':
                            if (os === 'ios') {
                                msg += '（可能的原因：不支持分享纯图片到QQ空间）'
                            }
                            break
                    }
                    msg += '。'
                    // alert(msg)
                }
            })
            */
        }
    }
}

export default third
