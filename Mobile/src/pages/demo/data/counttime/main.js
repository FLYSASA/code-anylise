// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Countup, Countdown, XButton, Group, Cell, XSwitch } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Countup, Countdown, XButton, Group, Cell, XSwitch },
    data: {
        doStart: false,
        show: true,
        time1: 15,
        time2: 15,
        value: '',
        start: false
    },
    methods: {
        finish (index) {
            this.show = false
            this.value = 'completed'
            console.log('current index', index)
        },
        finish2 (index) {
            this.start = false
            this.value = 20
        }
    }
})
