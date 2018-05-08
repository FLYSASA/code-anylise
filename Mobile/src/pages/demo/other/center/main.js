// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/pages/demo/static/js/loadcss.js'
import 'vux/src/styles/center.less'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        items: ['vux-center-h', 'vux-center-v', 'vux-center']
    }
})
