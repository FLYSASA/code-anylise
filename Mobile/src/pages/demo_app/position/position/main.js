import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'
import './position.css'

/* eslint-disable */
new Vue({
    el: '#app',
    methods: {
        back () {
            App.app.back()
        },
        getPositionState () {
            var info = App.position.getPositionInfo()
            if (info) {
                alert(JSON.stringify(info))
            } else {
                alert('不支持定位。')
            }
        },
        startLocate () {
            App.position.startLocate(function (data) {
                if (data.code === "0") {
                    alert(JSON.stringify(data.data))
                } else {
                    alert(data.msg)
                }
            })
        }
    }
})
