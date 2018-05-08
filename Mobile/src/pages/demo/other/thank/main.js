// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, Cell } from 'vux'
import '../../static/css/demo-icon.css'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, Cell },
    data: {
        url1: require('../../static/images/thx-vue.png'),
        url2: require('../../static/images/thx-webpack.png'),
        url3: require('../../static/images/thx-iconfont.png')
    }
})
