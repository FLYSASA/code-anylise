import App from '@/static/js/app'
import { isApp } from '@/static/js/config'
import Vue from 'vue'
import '../../static/css/base.css'

Vue.config.productionTip = false

var vm

/* eslint-disable */
function loadData () {
    var userData = App.cache.get('user')
    var user = JSON.parse(userData)
    var ens = App.device.getEsn()
    var clientId = App.app.getClientId()

    vm = new Vue({
        el: "#app",
        data: {
            ens,
            clientId,
            user,
            status: '进入首页',
            urls: [
                'contact/contact.html',
                'position/position.html',
                'cache/cache.html',
                'file/file.html',
                'photo/photo.html',
                'path/path.html',
                'third/third.html',
                'message/message.html',
                'db/db.html',
                'media/media.html',
                'net/net.html',
                'about/about.html'
            ]
        },
        methods: {
            openMenu (idx) {
                var prefix = isApp ? 'demo_app/' : '../'
                App.openModule(prefix + this.urls[idx])
            }
        }
    })
}

// 消息推送事件
window.onpush = function (msg) {
    alert(msg + '--- from SAPI')
}

// 页面激活事件
window.onactive = function (type) {
    var status
    if (type === '0') {
        status = '从非激活转为激活'
    } else if (type === '1') {
        status = '从后台转为前台'
    }
    vm ? (vm.status = status) : toast(status)
}

App.execMethod(loadData, isApp)