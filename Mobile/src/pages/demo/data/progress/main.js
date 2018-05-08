// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XProgress, Box } from 'vux'
import 'vux/src/styles/weui/icon/weui_icon_font.less'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XProgress, Box },
    data: {
        percent1: 30,
        percent2: 60
    }
})
