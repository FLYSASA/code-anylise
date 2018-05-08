// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Clocker, Cell, Group, FormatTimeFilter } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Clocker, Cell, Group },
    data: {
        time1: '2018-10-01 21:54'
    },
    computed: {
        time2 () {
            var time = new Date()
            time.setDate(time.getDate() + 3)
            return FormatTimeFilter(time, 'YYYY-MM-DD HH:mm')
        },
        time3 () {
            var time = new Date()
            time.setDate(time.getDate() + 15)
            return FormatTimeFilter(time, 'YYYY-MM-DD HH:mm')
        }
    },
    mounted () {
        setTimeout(() => {
            var time = new Date()
            time.setDate(time.getDate() + 1)
            this.time1 = FormatTimeFilter(time, 'YYYY-MM-DD HH:mm')
        }, 5000)
    }
})
