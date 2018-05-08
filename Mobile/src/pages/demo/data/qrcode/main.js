// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Qrcode, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Qrcode, Divider },
    data: {
        value: 'http://m.so.com/',
        fgColor: '#000000'
    },
    mounted () {
        setInterval(() => {
            this.value = `http://m.so.com?t=${Math.random()}`
            this.fgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }, 1000)
    }
})
