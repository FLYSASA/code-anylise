// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { FormatTimeFilter, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    filters: {
        FormatTimeFilter
    },
    components: {
        Divider
    },
    data: {
        time1: new Date('2016/01/03 19:19:19'),
        time2: new Date('2016-01-03 09:09:09')
    }
})
