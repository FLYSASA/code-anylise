import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    methods: {
        back () {
            App.app.back()
        },
        isNetConnected () {
            if (App.net.isNetConnected()) {
                alert('有网络。')
            } else {
                alert('无网络。')
            }
        },

        getConnectionType () {
            var type = App.net.getConnectionType()
            var msg
            switch (type) {
                case 0:
                    msg = '无网络'
                    break
                case 1:
                    msg = 'WIFI无线网络'
                    break
                case 2:
                    msg = '移动网络'
                    break
                default:
                    msg = '其他'
                    break
            }
            alert(msg)
        },

        getNetIp () {
            if (App.net.isNetConnected()) {
                var ip = App.net.getNetIp()
                alert(ip)
            } else {
                alert('无网络。')
            }
        },

        openNetSetting () {
            App.net.openNetSetting()
        }
    }
})