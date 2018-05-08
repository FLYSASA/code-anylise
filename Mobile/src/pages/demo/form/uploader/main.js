// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Divider } from 'vux'
import 'vux/src/styles/weui/widget/weui-uploader/index.less'
import '@/pages/demo/static/js/loadcss.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Divider },
    data: {
        bgUrl: require('../../static/images/uploader_bg.png')
    }
})
